var map = d3.select("#usmap").append("svg")
    .attr("viewBox", "0 0 1000 600")

d3.select("#boxmap").append("h1")
    .text("A Better Way to  Look at It")
    .style("font-size", "3vw")
    .style("font-weight", "700")
d3.select("#histogram").append("h1")
    .text("How congress could look in 2021")
    .style("font-size", "3vw")
    .style("font-weight", "700")

var hist = d3.select("#histogram").append("svg")
    .attr("viewBox", "0 0 1000 300")

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
var nf = d3.format(".1f")

var tool_tip = d3.tip()
    .offset([-200, -87.5])
    .html("<div id='tipDiv'></div>");

map.call(tool_tip);
function ordinal(i) {

    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i == 00 ? "At-Large" : i + "th";
}
console.log("Alaska " + ordinal(00))
queue()
    .defer(d3.json, "us.json")
    .defer(d3.json, "test.json")
    .defer(d3.csv, "2020-house-input.csv")
    .defer(d3.csv, "grid-map.csv")
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-house.csv")
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-house-histogram.csv")
    .await(ready);

function ready(error, us, congress, inputData, grid, data, histogram) {
    if (error) throw error;

    var today = data.splice(data.length - 436, data.length)

    console.log(data)
    console.log(today)
    var districts = topojson.feature(congress, congress.objects.collection).features
    districts.forEach((d, i) => {
        var state = d.properties.state
        var districtID = d.properties.geoID.split("")
        var district = districtID[districtID.length - 2] + districtID[districtID.length - 1]
        d.districtID = state + district
        var districtID = d.districtID
        d.properties.repWin = today.filter(d => d.districtID == districtID).length == 0 ? 50 : +today.filter(d => d.districtID == districtID)[0].repWin
        d.properties.demWin = today.filter(d => d.districtID == districtID).length == 0 ? 50 : +today.filter(d => d.districtID == districtID)[0].demWin
        d.properties.state = today.filter(d => d.districtID == districtID).length == 0 ? "50" : today.filter(d => d.districtID == districtID)[0].state
        d.properties.margin = today.filter(d => d.districtID == districtID).length == 0 ? 50 : +today.filter(d => d.districtID == districtID)[0].margin
        d.properties.seat = today.filter(d => d.districtID == districtID).length == 0 ? "50" : today.filter(d => d.districtID == districtID)[0].seat
    })



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
        .text("Seats")
        .attr("y", 70)
        .attr("x", 500)
        .attr("text-anchor", "middle")
        .style("font-size", "25")
        .style("font-weight", "500")

    map.append("text")
        .text(nf(today[435].demWin) + "%")
        .attr("y", 70)
        .attr("x", 115)
        .style("font-size", "30")
        .style("font-weight", "500")
        .style("fill", color(0))

    map.append("text")
        .text(nf(today[435].repWin) + "%")
        .attr("y", 70)
        .attr("x", 885)
        .attr("text-anchor", "end")
        .style("font-size", "30")
        .style("font-weight", "500")
        .style("fill", color(100))

    map.append("text")
        .text(nf(today[435].demVote))
        .attr("y", 70)
        .attr("x", 400)
        .style("font-size", "20")
        .style("font-weight", "500")
        .style("fill", color(0))
        .attr("text-anchor", "middle")


    map.append("text")
        .text(nf(today[435].repVote))
        .attr("y", 70)
        .attr("x", 600)
        .style("font-size", "20")
        .style("font-weight", "500")
        .style("fill", color(100))
        .attr("text-anchor", "middle")


    map.append("g")
        .attr("class", "district-boundaries")
        .selectAll("path")
        .data(districts)
        .enter().append("path")
        .attr("d", path)
        .style("fill", (d, i) => color(d.properties.repWin))
        .on('mouseover', function (d) {


            tool_tip.show();
            var tipSVG = d3.select("#tipDiv")
                .append("svg")
                .attr("width", 175)
                .attr("height", 200)
                ;
            tipSVG.append("rect")
                .attr("y", 1.5)
                .attr("x", 1.5)
                .attr("width", 172)
                .attr("height", 197)
                .attr("rx", 8)
                .attr("fill", "white")
                .attr("stroke", "black")
                .attr("stroke-width", 2)



            tipSVG.append("text")
                .text(d.properties.state)
                .attr("y", 20)
                .attr("x", 87.5)
                .attr("fill", "#black")
                .attr("font-weight", "500")
                .style("font-size", "20")
                .attr("text-anchor", "middle")

            tipSVG.append("text")
                .text(ordinal(d.properties.seat))
                .attr("y", 40)
                .attr("x", 87.5)
                .attr("fill", "#black")
                .style("font-weight", "500")
                .style("font-size", "20")
                .attr("text-anchor", "middle")

            tipSVG.append("image")
                .attr("xlink:href", d => "https://jhkforecasts.com/elephant-01.png")
                .attr("x", 96.25)
                .attr("y", 50)
                .attr("width", 70)
                .attr("height", 70)

            tipSVG.append("image")
                .attr("xlink:href", d => "https://jhkforecasts.com/donkey-01.png")
                .attr("x", 8.75)
                .attr("y", 50)
                .attr("width", 70)
                .attr("height", 70)

            tipSVG.append("text")
                .text(nf(d.properties.repWin) + "%")
                .attr("y", 150)
                .attr("x", 131.25)
                .attr("fill", color(100))
                .attr("font-weight", "500")
                .style("font-size", 20)
                .attr("text-anchor", "middle")

            tipSVG.append("text")
                .text(nf(d.properties.demWin) + "%")
                .attr("y", 150)
                .attr("x", 43.75)
                .attr("fill", color(0))
                .attr("font-weight", "500")
                .style("font-size", 20)
                .attr("text-anchor", "middle")

            tipSVG.append("text")
                .text(d.properties.margin > 0 ? "R+" + nf(d.properties.margin) : "D+" + nf(-d.properties.margin))
                .attr("y", 185)
                .attr("x", 87.5)
                .attr("fill", d.properties.margin > 0 ? color(100) : color(0))
                .attr("font-weight", "500")
                .style("font-size", 25)
                .attr("text-anchor", "middle")
        })

        .on('mouseout',
            function (d) {


                tool_tip.hide()
            });


    map.append("g")
        .attr("class", "state-boundaries")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)

    grid.forEach((d, i) => {
        var districtID = d.district
        d.repWin = today.filter(d => d.districtID == districtID).length == 0 ? 50 : +today.filter(d => d.districtID == districtID)[0].repWin
        d.demWin = today.filter(d => d.districtID == districtID).length == 0 ? 50 : +today.filter(d => d.districtID == districtID)[0].demWin
        d.state = today.filter(d => d.districtID == districtID).length == 0 ? "" : today.filter(d => d.districtID == districtID)[0].state
        d.seat = today.filter(d => d.districtID == districtID).length == 0 ? "" : today.filter(d => d.districtID == districtID)[0].seat
        d.margin = today.filter(d => d.districtID == districtID).length == 0 ? "" : today.filter(d => d.districtID == districtID)[0].margin
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


    boxmap.append("rect")
        .attr("x", 900)
        .attr("y", 570)
        .attr("width", 20)
        .attr("height", 20)
        .attr("ry", 5)
        .attr("stroke", "black")
        .attr("fill", "white")

    boxmap.append("text")
        .text("Close Race")
        .attr("x", 900)
        .attr("y", 600)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "start")
        .attr("fill", "black")
        .style("font-family", "sf-mono")
        .attr("font-size", 15)

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
        .attr("fill", d => d.label == "" ? color(d.repWin) : "none")

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
        .attr("stroke", d => d.label == "" ? Math.abs(d.repWin - 50) < 25 ? "black" : "none" : "none")
        .attr("stroke-width", 1.5)
        .on('mouseover', function (d) {


            d.label == "" ? tool_tip.show() : tool_tip.hide();
            var tipSVG = d3.select("#tipDiv")
                .append("svg")
                .attr("width", 175)
                .attr("height", 200)
                ;
            tipSVG.append("rect")
                .attr("y", 1.5)
                .attr("x", 1.5)
                .attr("width", 172)
                .attr("height", 197)
                .attr("rx", 8)
                .attr("fill", "white")
                .attr("stroke", "black")
                .attr("stroke-width", 2)



            tipSVG.append("text")
                .text(d.state)
                .attr("y", 20)
                .attr("x", 87.5)
                .attr("fill", "#black")
                .attr("font-weight", "500")
                .style("font-size", "20")
                .attr("text-anchor", "middle")

            tipSVG.append("text")
                .text(ordinal(d.seat))
                .attr("y", 40)
                .attr("x", 87.5)
                .attr("fill", "#black")
                .style("font-weight", "500")
                .style("font-size", "15")
                .attr("text-anchor", "middle")
                .style("font-family", "sf-mono")

            tipSVG.append("image")
                .attr("xlink:href", d => "https://jhkforecasts.com/elephant-01.png")
                .attr("x", 96.25)
                .attr("y", 50)
                .attr("width", 70)
                .attr("height", 70)

            tipSVG.append("image")
                .attr("xlink:href", d => "https://jhkforecasts.com/donkey-01.png")
                .attr("x", 8.75)
                .attr("y", 50)
                .attr("width", 70)
                .attr("height", 70)

            tipSVG.append("text")
                .text(nf(d.repWin) + "%")
                .attr("y", 150)
                .attr("x", 131.25)
                .attr("fill", color(100))
                .attr("font-weight", "500")
                .style("font-size", 20)
                .attr("text-anchor", "middle")

            tipSVG.append("text")
                .text(nf(d.demWin) + "%")
                .attr("y", 150)
                .attr("x", 43.75)
                .attr("fill", color(0))
                .attr("font-weight", "500")
                .style("font-size", 20)
                .attr("text-anchor", "middle")

            tipSVG.append("text")
                .text(d.margin > 0 ? "R+" + nf(d.margin) : "D+" + nf(-d.margin))
                .attr("y", 185)
                .attr("x", 87.5)
                .attr("fill", d.margin > 0 ? color(100) : color(0))
                .attr("font-weight", "500")
                .style("font-size", 25)
                .attr("text-anchor", "middle")
        })

        .on('mouseout',
            function (d) {


                tool_tip.hide()
            });


    //histogram
    console.log(histogram)
    var yHistogram = d3.scaleLinear()
        .domain([0, d3.max(histogram, d => d.occ)])
        .range([0, 200])

    var barWidth = 1000 / 75

    var histMarker = [180, 195, 210, 225]

    hist.selectAll("re")
        .data(histMarker)
        .enter()
        .append("text")
        .attr("class", "hist-markers")
        .text(d => "R " + d)
        .attr("x", (d, i) => (d - 165) * barWidth)
        .attr("y", 270)
        .attr("fill", color(100))

    hist.selectAll("re")
        .data(histMarker)
        .enter()
        .append("text")
        .attr("class", "hist-markers")
        .text(d => "D " + (435 - d))
        .attr("x", (d, i) => (d - 165) * barWidth)
        .attr("y", 290)
        .attr("fill", color(0))

    hist.selectAll("re")
        .data(histogram)
        .enter()
        .append("rect")
        .attr("x", (d, i) => (d.rep - 165) * barWidth)
        .attr("y", d => 250 - yHistogram(d.occ))
        .attr("width", barWidth)
        .attr("height", d => yHistogram(d.occ))
        .attr("stroke", "white")
        .attr("fill", d => d.rep > 217 ? color(100) : color(0))

}
