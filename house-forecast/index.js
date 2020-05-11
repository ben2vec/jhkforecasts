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

d3.select("#time").append("h1")
    .text("The Zigs and Zags of the Race")
    .style("font-size", "3vw")
    .style("font-weight", "700")

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const district = urlParams.get("district")

var hist = d3.select("#histogram").append("svg")
    .attr("viewBox", "0 0 1000 300")

var boxmap = d3.select("#boxmap").append("svg")
    .attr("viewBox", "50 0 1210 650")
    .append("g")
    .attr("transform", "translate(100,-50)")
var mapWidth = 1000,
    MapHeight = 600;


var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"])

var colors = [color(100), color(0)]
var projection = d3.geoAlbersUsa()
    .scale(1000)
    .translate([mapWidth / 2, (MapHeight / 2 + 40)]);

var path = d3.geoPath()
    .projection(projection);
var nf = d3.format(".1f")
var dp = d3.timeParse("%m/%d/%y")
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
queue()
    .defer(d3.json, "us.json")
    .defer(d3.json, "test.json")
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-house-input.csv")
    .defer(d3.csv, "grid-map.csv")
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-house.csv")
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-house-histogram.csv")
    .await(ready);

function ready(error, us, congress, inputData, grid, data, histogram) {
    if (error) throw error;

    var today = data.slice(data.length - 436, data.length)

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
        .enter().append("a").attr("href",d=>"#district"+d.districtID).append("path")
        .attr("d", path)
        .style("fill", (d, i) => color(d.properties.repWin))
        .on('mouseover', function (d) {


            tool_tip.show().offset([-200, -87.5]);
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
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "20")
                .attr("text-anchor", "middle")

            tipSVG.append("text")
                .text(ordinal(d.properties.seat))
                .attr("y", 40)
                .attr("x", 87.5)
                .attr("fill", "black")
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
        .attr("class", "gridDistricts")
        .attr("id", d => d.district + "grid")
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
        .append("a").attr("href",d=>"#district"+d.district)
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


            d3.selectAll(".gridDistricts")
                .attr("opacity", .5)

            d3.selectAll(".statesover")
                .attr("opacity", ".5")

            d3.select("#" + d.district + "grid")
                .attr("opacity", 1)

            d3.select(this)
                .attr("stroke", d.label == "" ? "black" : "none")
                .attr("opacity", 1)




            d.label == "" ? tool_tip.show().offset([-210, -87.5]) : tool_tip.hide();
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
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "20")
                .attr("text-anchor", "middle")

            tipSVG.append("text")
                .text(ordinal(d.seat))
                .attr("y", 40)
                .attr("x", 87.5)
                .attr("fill", "black")
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

                d3.select(this)
                    .attr("stroke", d.label == "" ? Math.abs(d.repWin - 50) < 25 ? "black" : "none" : "none")
                tool_tip.hide()

                d3.selectAll(".gridDistricts")
                    .attr("opacity", 1)

                d3.selectAll(".statesover")
                    .attr("opacity", "1")

                d3.select("#" + d.district + "grid")
                    .attr("opacity", 1)
            });


    //histogram
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
        .attr("x", (d, i) => (d - 165) * barWidth + barWidth / 2)
        .attr("y", 270)
        .attr("fill", color(100))
        .attr("font-weight", "500")
        .style("font-size", 15)
        .attr("text-anchor", "middle")



    hist.selectAll("re")
        .data(histMarker)
        .enter()
        .append("text")
        .attr("class", "hist-markers")
        .text(d => "D " + (435 - d))
        .attr("x", (d, i) => (d - 165) * barWidth + barWidth / 2)
        .attr("y", 290)
        .attr("fill", color(0))
        .attr("font-weight", "500")
        .style("font-size", 15)
        .attr("text-anchor", "middle")

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
        .on('mouseover', function (d) {

            d3.selectAll(".hist-markers").style("display", "none");
            d3.selectAll(".line218").attr("display", "none")

            tool_tip.show()
                .offset([-100, -50]);
            var tipSVG = d3.select("#tipDiv")
                .append("svg")
                .attr("width", 100)
                .attr("height", 100)
                ;

            tipSVG.append("text")
                .text(nf(d.occ) + "%")
                .attr("y", 20)
                .attr("x", 50)
                .attr("font-weight", "500")
                .style("font-size", "1.3vw")
                .attr("text-anchor", "middle")
                .attr("fill", "black")

            tipSVG.append("text")
                .text("R " + d.rep)
                .attr("y", 40)
                .attr("x", 50)
                .attr("font-weight", "500")
                .style("font-size", "1.3vw")
                .attr("text-anchor", "middle")
                .attr("fill", color(100))

            tipSVG.append("text")
                .text("D " + d.dem)
                .attr("y", 60)
                .attr("x", 50)
                .attr("font-weight", "500")
                .style("font-size", "1.3vw")
                .attr("text-anchor", "middle")
                .attr("fill", color(0))


        })
        .on('mouseout',
            function (d) {
                d3.selectAll(".hist-markers").style("display", "block")


                tool_tip.hide()
            });

    hist.append("line")
        .attr("class", "line218")
        .attr("x1", (218 - 165) * barWidth)
        .attr("x2", (218 - 165) * barWidth)
        .attr("y1", 40)
        .attr("y2", 260)
        .attr("stroke", "black")

    var time_data = data.filter(d => d.state == key_state)
    var line_data = time_data
    line_data.forEach((d, i) => {
        d.date = dp(d.forecastDate)
    })
    var max_date = d3.max(line_data, d => d.date)

    var margin = { top: 70, right: 40, bottom: 20, left: 40 }
    var width = 1400 - margin.left - margin.right
    var height = 600 - margin.top - margin.bottom
    var axisPad = 12
    var formatDate = d3.timeFormat("%b - %d"),
        bisectDate = d3.bisector(d => d.date).left,
        onevalue = d3.format(".1f")

    var time = d3.select("#time").append("svg")
        .attr("viewBox", "0 0 1400 650")
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var x = d3.scaleTime()
        .rangeRound([margin.left, width - margin.right])
        .domain([new Date(2020, 4, 8), new Date(2020, 10, 3)])

    var y = d3.scaleLinear()
        .rangeRound([height - margin.bottom, margin.top]);


    var z = d3.scaleOrdinal()
        .range(colors)
        ;

    var line = d3.line()
        .curve(d3.curveLinear)
        .x(d => x(d.date))
        .y(d => y(d.pct));

    time.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(x).tickSize(-420).ticks(5)
            .tickFormat(d3.timeFormat("%b")))
        .call(g => {
            var years = x.ticks(d3.timeYear.every(1))
            var xshift = 0
            g.selectAll("text")
                .style("text-anchor", "right")
                .attr("y", 15)
                .attr('fill', 'black')
                .attr('font-size', 20)
                .attr('font-weight', 800)
                .style("text-transform", "uppercase")
                .style("font-family", "sf-mono")
            g.selectAll("line")
                .attr("opacity", .2)
                .attr("stroke", "grey")


            g.select(".domain")
                .attr("opacity", 0)


        })

    time.append("line")
        .attr("x1", x(new Date(2020, 10, 3)))
        .attr("x2", x(new Date(2020, 10, 3)))
        .attr("y1", 70)
        .attr("y2", (height - margin.bottom))
        .attr("stroke", "black")
        .attr("stroke-width", 3)

    time.append("text")
        .text("NOV. 3RD")
        .attr("x", x(new Date(2020, 10, 3)) + 3)
        .attr("y", 80)
        .attr("font-weight", "500")
        .attr("font-size", 12)
        .style("font-family", "sf-mono")



    time.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + margin.left + ",0)");

    var focus = time.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("line").attr("class", "lineHover")
        .style("stroke", "#999")
        .attr("stroke-width", 1)
        .style("shape-rendering", "crispEdges")
        .style("opacity", 0)
        .attr("y1", -height)
        .attr("y2", -40);

    focus.append("text").attr("class", "lineHoverDate")
        .attr("text-anchor", "middle")
        .attr("font-size", 12);

    var overlay = time.append("rect")
        .attr("class", "overlay")
        .attr("x", margin.left)
        .attr("width", x(max_date) - margin.left)
        .attr("height", height)
    var demScale = "D+"
    var keys = ["repWin", "demWin", "margin", "repVote", "demVote"]
    update("Win", 0);
    console.log(line_data)

    function update(input, speed) {


        var copy = keys.filter(f => f.includes(input))
        var cities = copy.map(function (id) {
            return {
                id: id,
                values: line_data.map(d => { return { date: d.date, pct: +d[id] } })
            };
        });
        console.log(cities)
        y.domain([
            input == "margin" ? -10 : input == "Vote" ? 150 : 0,
            input == "margin" ? 0 : input == "Vote" ? 300 : 100
        ]).nice();

        time.selectAll(".y-axis").transition()
            .duration(speed)
            .call(d3.axisLeft(y).tickSize(-width + margin.right + margin.left).ticks(5)).call(g => {
                var xshift = 0
                g.selectAll("text")
                    .text(d => input == "margin" ? "D+" + Math.abs(d) : d)
                    .style("text-anchor", "right")
                    .attr("y", 0)
                    .attr('fill', 'black')
                    .attr('font-size', 20)
                    .attr('font-weight', 500)
                g.selectAll("line")
                    .attr("opacity", .2)
                    .attr("stroke", "grey")


                g.select(".domain")
                    .attr("opacity", 0)


            })

        var city = time.selectAll(".cities")
            .data(cities);

        city.exit().remove();

        city.enter().insert("g", ".focus").append("path")
            .attr("class", "line cities")
            .style("stroke", (d, i) => input == "margin" ? color(0) : colors[i])
            .style("stroke-width", 4)
            .style("opacity", .7)
            .style("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .merge(city)
            .transition().duration(speed)
            .attr("d", d => line(d.values))
            .style("stroke", (d, i) => input == "margin" ? color(0) : colors[i])





        tooltip(copy);

        function tooltip(copy) {
            var rect = focus.selectAll(".lineHoverRect")
                .data(copy)

            var labels2 = focus.selectAll(".lineHoverText2")
                .data(copy)

            labels2.enter().append("text")
                .attr("class", "lineHoverText2")
                .attr("font-size", 25)
                .style("fill", "white")
                .style("stroke", "white")
                .style("stroke-width", 5)
                .merge(labels2)

            var labels = focus.selectAll(".lineHoverText")
                .data(copy)

            labels.enter().append("text")
                .attr("class", "lineHoverText")
                .attr("text-anchor", "middle")
                .attr("font-size", 25)
                .merge(labels)

            var circles = focus.selectAll(".hoverCircle")
                .data(copy)

            circles.enter().append("circle")
                .attr("class", "hoverCircle")
                .style("stroke", d => input == "margin" ? color(100) : z(d))
                .style("stroke-width", 3)
                .style("fill", "white")
                .attr("r", 3)
                .merge(circles)
                .transition().duration(speed)
                .style("stroke", (d, i) => input == "margin" ? color(0) : colors[i]);

            time.selectAll(".overlay")
                .on("mouseover", () => focus.style("display", null))
                .on("mouseout", () => focus.style("display", "none"))
                .on("mousemove", mousemove);

            function mousemove() {

                var x0 = x.invert(d3.mouse(this)[0]),
                    i = bisectDate(line_data, x0, 1),
                    d0 = line_data[i - 1],
                    d1 = line_data[i],
                    d = x0 - d0.date > d1.date - x0 ? d1 : d0;

                focus.select(".lineHoverDate")
                    .attr("x", x(d.date))
                    .attr("y", 50)
                    .attr("text-anchor", "middle")
                    .style("font-size", 20)
                    .attr("font-weight", "500")
                    .text(formatDate(d.date).toUpperCase())
                    .style("font-family", "sf-mono");

                focus.selectAll(".hoverCircle")
                    .attr("cy", e => y(d[e]))
                    .attr("cx", x(d.date));

                focus.selectAll(".lineHoverText2")
                    .attr("font-weight", "500")
                    .attr("x", x(d.date) + 10)
                    .text((e, i) => input == "margin" ? "D +" + onevalue(-d[e]) : i == 1 ? ("DEM " + onevalue(d[e])) : i == 0 ? "REP " + onevalue(d[e]) : "Third " + onevalue(d[e]))
                    .attr("y", e => d[e] == d["rep" + input] ? y(d["rep" + input]) > y(d["dem" + input]) ? y(d["rep" + input]) + 15 : y(d["rep" + input]) - 15 : d[e] == d["dem" + input] ? y(d["dem" + input]) > y(d["rep" + input]) ? y(d["dem" + input]) + 15 : y(d["dem" + input]) - 15 : y(d[e]) - 15)
                    .attr("text-anchor", (e, i) => i == 2 ? "end" : "start")
                    .attr("dominant-baseline", "middle")
                    .style("font-family", "sf-mono")


                focus.selectAll(".lineHoverText")
                    .attr("font-weight", "500")
                    .attr("x", x(d.date) + 10)
                    .text((e, i) => input == "margin" ? "D +" + onevalue(-d[e]) : i == 1 ? ("DEM " + onevalue(d[e])) : i == 0 ? "REP " + onevalue(d[e]) : "Third " + onevalue(d[e]))
                    .attr("fill", (e, i) => input == "margin" ? color(0) : colors[i])
                    .attr("y", e => d[e] == d["rep" + input] ? y(d["rep" + input]) > y(d["dem" + input]) ? y(d["rep" + input]) + 15 : y(d["rep" + input]) - 15 : d[e] == d["dem" + input] ? y(d["dem" + input]) > y(d["rep" + input]) ? y(d["dem" + input]) + 15 : y(d["dem" + input]) - 15 : y(d[e]) - 15)
                    .attr("text-anchor", (e, i) => i == 2 ? "end" : "start")
                    .attr("dominant-baseline", "middle")
                    .style("font-family", "sf-mono")
            }
        }

        time.append("text")
            .text("General Ballot")
            .attr("x", 1000)
            .attr("y", 25)
            .attr("font-weight", "500")
            .attr("font-size", 25)
            .attr("fill", input == "margin" ? "black" : "lightgray")
            .on("mouseover", function (d) {
                d3.select(this)
                    .attr("text-decoration", "underline")
                    .style("cursor", "pointer")
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .attr("text-decoration", "none")
            })
            .on("click", d => { update("margin", 500) })
            .transition()
            .duration(speed)
            .attr("fill", input == "margin" ? "black" : "lightgray")

        time.append("text")
            .text("Win Majority")
            .attr("x", 350)
            .attr("y", 25)
            .attr("font-weight", "500")
            .attr("font-size", 25)
            .attr("fill", input == "Win" ? "black" : "lightgray")
            .on("mouseover", function (d) {
                d3.select(this)
                    .attr("text-decoration", "underline")
                    .style("cursor", "pointer")
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .attr("text-decoration", "none")
            })
            .on("click", d => { update("Win", 500) })
            .transition()
            .duration(speed)
            .attr("fill", input == "Win" ? "black" : "lightgray")


        time.append("text")
            .text("Avg. Seats")
            .attr("x", 700)
            .attr("y", 25)
            .attr("font-weight", "500")
            .attr("font-size", 25)
            .attr("fill", input == "Vote" ? "black" : "lightgray")
            .on("mouseover", function (d) {
                d3.select(this)
                    .attr("text-decoration", "underline")
                    .style("cursor", "pointer")
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .attr("text-decoration", "none")
            })
            .on("click", d => { update("Vote", 500) })
            .transition()
            .duration(speed)
            .attr("fill", input == "Vote" ? "black" : "lightgray")
    }

    console.log(today)
    var districtData = today.slice(0, today.length - 1)



    var table = d3.select("#dataTable")
        .append("table")
        .style("width", "100%")
        .append("tbody")


    var headData = ["State", "Seat", "Win", "Dem Vote", "Rep Vote"]

    var header = table.append("tr")
    
    var demScale = d3.scaleLinear()
        .domain([0, 100])
        .range(["white", color(0)])

    var repScale = d3.scaleLinear()
        .domain([0, 100])
        .range(["white", color(100)])

    header.append("th")
        .style("text-align", "left")
        .style("width", "30%")
        .append("h1")
        .text("STATE")
        .style("font-size", "1.5vw")
        .style("font-weight", 100)
        .style("font-family", "sf-mono")

    header.append("th")
        .style("text-align", "center")
        .style("width", "10%")
        .append("h1")
        .text("SEAT")
        .style("font-size", "1.5vw")
        .style("font-weight", 100)
        .style("font-family", "sf-mono")

    header.append("th")
        .style("text-align", "center")
        .style("width", "5%")
        .append("h1")
        .text("(I)")
        .style("font-size", "1.5vw")
        .style("font-weight", 100)
        .style("font-family", "sf-mono")
    header.append("th")
        .style("text-align", "center")
        .style("width", "10%")
        .append("h1")
        .text("WIN")
        .style("font-size", "1.5vw")
        .style("font-weight", 100)
        .style("font-family", "sf-mono")


    header.append("th")
        .style("text-align", "center")
        .style("width", "10%")
        .append("h1")
        .text("REP VOTE")
        .style("font-size", "1.5vw")
        .style("font-weight", 100)
        .style("font-family", "sf-mono")


    header.append("th")
        .style("text-align", "center")
        .style("width", "10%")
        .append("h1")
        .text("DEM VOTE")
        .style("font-size", "1.5vw")
        .style("font-weight", 100)
        .style("font-family", "sf-mono")

    header.append("th")
        .style("text-align", "center")
        .style("width", "10%")
        .append("h1")
        .text("MARGIN")
        .style("font-size", "1.5vw")
        .style("font-weight", 100)
        .style("font-family", "sf-mono")


    districtData.forEach((d, i) => {
        var district = d.districtID
        var incumbent = inputData.filter(d => d.id == district)[0].incumbentParty
        d.margin = d.repVote-d.demVote
        table.append("tr")
            .attr("id", "district" + district)

        d3.select("#" + "district" + district)
            .append("td")
            .style("text-align", "left")
            .style("width", "30%")
            .append("h1")
            .text(d.state.toUpperCase() +"  "+ ordinal(d.seat).toUpperCase())
            .style("font-size", "1.5vw")
            .style("font-weight", 100)
            .style("font-family", "sf-mono")


        d3.select("#" + "district" + district)
            .append("td")
            .style("text-align", "center")
            .style("width", "10%")
            .append("h1")
            .text(d.seat == 0 ? "AL" : d.seat)
            .style("font-size", "1.5vw")
            .style("font-weight", 100)
            .style("font-family", "sf-mono")


        d3.select("#" + "district" + district)
            .append("td")
            .style("text-align", "center")
            .style("width", "5%")
            .append("h1")
            .text(incumbent)
            .style("color", incumbent == "(R)" ? color(100) : color(0))
            .style("font-size", "1.5vw")
            .style("font-weight", 100)
            .style("font-family", "sf-mono")



        d3.select("#" + "district" + district)
            .append("td")
            .style("text-align", "center")
            .style("width", "10%")
            .style("background-color", color(d.repWin))
            .append("h1")
            .text(d.repWin > 50 ? nf(d.repWin) : nf(d.demWin))
            .style("font-size", "1.5vw")
            .style("font-weight", 100)
            .style("font-family", "sf-mono")


        d3.select("#" + "district" + district)
            .append("td")
            .style("text-align", "center")
            .style("width", "10%")
            .append("h1")
            .text(nf(d.repVote))
            .style("font-size", "1.5vw")
            .style("font-weight", 100)
            .style("font-family", "sf-mono")


        d3.select("#" + "district" + district)
            .append("td")
            .style("text-align", "center")
            .style("width", "10%")
            .append("h1")
            .text(nf(d.demVote))
            .style("font-size", "1.5vw")
            .style("font-weight", 100)
            .style("font-family", "sf-mono")

        d3.select("#" + "district" + district)
            .append("td")
            .style("text-align", "center")
            .style("width", "10%")
            .style("background-color", color(50+d.margin))
            .append("h1")
            .text(d.repWin > 50 ? "R+"+nf(d.margin) : "D+"+nf(-d.margin))
            .style("font-size", "1.5vw")
            .style("font-weight", 100)
            .style("font-family", "sf-mono")

    })

    var searchBar = d3.select("#searchBar")
    .on("change",d=>{
        var inputvalue = d3.select("#searchBar").property("value").toUpperCase()
        console.log(inputvalue)
        window.location.replace("#district"+inputvalue)
        window.scrollBy(0,-100)
        
    })

}
