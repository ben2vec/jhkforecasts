var map = d3.select("#usmap").append("svg")
    .attr("viewBox", "0 0 1000 600")

d3.select("#boxmap").append("h1")
    .text("A Better Way to  Look at It")
    .style("font-size", "3vw")
    .style("font-weight", "700")

var boxmap = d3.select("#boxmap").append("svg")
    .attr("viewBox", "00 0 1310 650")
    .append("g")
    .attr("transform", "translate(100,-50)")
var mapWidth = 1000,
    MapHeight = 600;
var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"])
var projection = d3.geoAlbersUsa()
    .scale(1000)
    .translate([mapWidth / 2, (MapHeight / 2 + 40)]);

var path = d3.geoPath()
    .projection(projection);



queue()
    .defer(d3.json, "us.json")
    .defer(d3.json, "test.json")
    .defer(d3.csv, "2020-house-input.csv")
    .defer(d3.csv, "grid-map.csv")
    .await(ready);

function ready(error, us, congress, data, grid) {
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

    map.append("image")
        .attr("href", "https://jhkforecasts.com/donkey-01.png")
        .attr("y", 0)
        .attr("x", 10)
        .attr("height", 100)
        .attr("width", 100)

    map.append("image")
        .attr("href", "https://jhkforecasts.com/elephant-01.png")
        .attr("y", 0)
        .attr("x", 890)
        .attr("height", 100)
        .attr("width", 100)

    map.append("text")
        .text("Democrats")
        .attr("y", 30)
        .attr("x", 115)
        .style("font-size", "30")
        .style("font-weight", "500")

    map.append("text")
        .text("Republicans")
        .attr("y", 30)
        .attr("x", 885)
        .attr("text-anchor", "end")
        .style("font-size", "30")
        .style("font-weight", "500")

    map.append("text")
        .text("00.0%")
        .attr("y", 70)
        .attr("x", 115)
        .style("font-size", "30")
        .style("font-weight", "500")
        .style("fill", color(0))

    map.append("text")
        .text("00.0%")
        .attr("y", 70)
        .attr("x", 885)
        .attr("text-anchor", "end")
        .style("font-size", "30")
        .style("font-weight", "500")
        .style("fill", color(100))

    map.append("g")
        .attr("class", "district-boundaries")
        .selectAll("path")
        .data(districts)
        .enter().append("path")
        .attr("d", path)
        .style("fill", (d, i) => color(d.properties.win))
        .append("title")
        .text(function (d) { return d.id; });

    map.append("g")
        .attr("class", "state-boundaries")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .style("")

    grid.forEach((d, i) => {
        var district = d.district
        d.win = data.filter(d => d.id == district).length == 0 ? 0 : +data.filter(d => d.id == district)[0].win
    })



    var pct = [50, 60, 70, 80, 90, 100]


    boxmap.selectAll("grid")
        .data(pct)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 20 + 900)
        .attr("y", (d, i) => 500)
        .attr("width", 20)
        .attr("height", 20)
        .attr("ry", 5)
        .attr("stroke", "white")
        .attr("fill", d => color(d))

    boxmap.selectAll("grid")
        .data(pct)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 20 + 900)
        .attr("y", (d, i) => 520)
        .attr("width", 20)
        .attr("height", 20)
        .attr("ry", 5)
        .attr("stroke", "white")
        .attr("fill", d => color(100 - d))

    boxmap.selectAll("grid")
        .data(pct)
        .enter()
        .append("text")
        .text(d => d)
        .attr("x", (d, i) => i * 20 + 910)
        .attr("y", (d, i) => 490)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .style("font-family", "sf-mono")
        .attr("font-size", 12)

    boxmap.append("text")
        .text("REP")
        .attr("x", (d, i) => 1025)
        .attr("y", (d, i) => 510)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "start")
        .attr("fill", "black")
        .style("font-family", "sf-mono")
        .attr("font-size", 15)

    boxmap.append("text")
        .text("DEM")
        .attr("x", (d, i) => 1025)
        .attr("y", (d, i) => 530)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "start")
        .attr("fill", "black")
        .style("font-family", "sf-mono")
        .attr("font-size", 15)

    boxmap.selectAll("grid")
        .data(grid)
        .enter()
        .append("rect")
        .attr("x", d => (+d.column) * 20)
        .attr("y", d => (+d.row) * 20)
        .attr("width", 20)
        .attr("height", 20)
        .attr("ry", 5)
        .attr("stroke", d => d.district == "" || d.district == undefined ? "none" : "white")
        .attr("fill", d => d.label == "" ? color(d.win) : "none")

    boxmap.selectAll("grid")
        .data(grid)
        .enter()
        .append("text")
        .text(d => d.label)
        .attr("x", d => (+d.column) * 20 + 10)
        .attr("y", d => (+d.row) * 20 + 10)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .style("font-family", "sf-mono")
        .attr("font-size", 15)

    boxmap.selectAll("grid")
        .data(grid)
        .enter()
        .append("rect")
        .attr("class", "statesover")
        .attr("x", d => (+d.column) * 20)
        .attr("y", d => (+d.row) * 20)
        .attr("width", 20)
        .attr("height", 20)
        .attr("ry", 5)
        .attr("stroke", d => Math.abs(d.win - 50) < 25 ? "black" : "none")
        .attr("stroke-width", 1.5)

}
