var width = 960,
    height = 500;

var projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2])
    .scale([900]);

var path = d3.geoPath()
    .projection(projection)

var svg = d3.select("body").append("svg")
    .attr("viewBox", "0 0 " + width + " " + height)

d3.json("https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/us.json", function (error, topology) {
    if (error) throw error;
    console.log(topology)
    
    var county_data = topojson.feature(topology, topology.objects.counties).features

    svg.selectAll("path")
        .data(county_data)
        .enter().append("path")
        .attr("d", path);
});