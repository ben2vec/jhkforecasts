
var mapWidth = 1000,
    MapHeight = 600;
var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"])
var projection = d3.geoAlbersUsa()
    .scale(1000)
    .translate([mapWidth / 2, (MapHeight / 2)]);

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select("#usmap").append("svg")
    .attr("viewBox", "0 0 1000 600")

queue()
    .defer(d3.json, "us.json")
    .defer(d3.json, "house.json")
    .defer(d3.csv, "2020-house-input.csv")
    .await(ready);

function ready(error, us, congress, data) {
    if (error) throw error;
    console.log(data)

    congress.objects.districts.geometries.forEach((d, i) => {
        var district_id = d.properties.office_id
        d.properties.win = +data.filter(d => d.id == district_id).length == 0 ?0: (+data.filter(d => d.id == district_id)[0].win)
    });
    console.log(topojson.feature(congress, congress.objects.districts).features)

    svg.append("defs").append("path")
        .attr("id", "land")
        .datum(topojson.feature(us, us.objects.land))
        .attr("d", path);

    svg.append("clipPath")
        .attr("id", "clip-land")
        .append("use")
        .attr("xlink:href", "#land");

    svg.append("g")
        .attr("class", "districts")
        .attr("clip-path", "url(#clip-land)")
        .selectAll("path")
        .data(topojson.feature(congress, congress.objects.districts).features)
        .enter().append("path")
        .attr("d", path)
        .style("fill", (d, i) => color(d.properties.win))
        .append("title")
        .text(function (d) { return d.id; });

    svg.append("path")
        .attr("class", "district-boundaries")
        .datum(topojson.mesh(congress, congress.objects.districts, function (a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); }))
        .attr("d", path)
        ;

    svg.append("path")
        .attr("class", "state-boundaries")
        .datum(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; }))
        .attr("d", path);
}
