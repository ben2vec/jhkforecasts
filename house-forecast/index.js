
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
    .defer(d3.json, "test.json")
    .defer(d3.csv, "2020-house-input.csv")
    .await(ready);

function ready(error, us, congress, data) {
    if (error) throw error;
    console.log(congress)


    var districts = topojson.feature(congress, congress.objects.collection).features
    districts.forEach((d, i) => {
        var state = d.properties.state
        var districtID = d.properties.geoID.split("")
        var district = districtID[districtID.length - 2] + districtID[districtID.length - 1]
        d.districtID = state + district
        var districtID = d.districtID
        d.properties.win = data.filter(d => d.id == districtID).length == 0 ? 50 : +data.filter(d => d.id == districtID)[0].win
    })

    function compareStrings(a, b) {
        // Assuming you want case-insensitive comparison
        a = a.toLowerCase();
        b = b.toLowerCase();

        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }

    districts.sort(function (a, b) {
        return compareStrings(a.districtID, b.districtID
            );
    })
    console.log(districts)

    svg.append("g")
        .attr("class", "district-boundaries")
        .selectAll("path")
        .data(districts)
        .enter().append("path")
        .attr("d", path)
        .style("fill", (d, i) => color(d.properties.win))
        .append("title")
        .text(function (d) { return d.id; });

    svg.append("g")
        .attr("class", "state-boundaries")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .style("")



}
