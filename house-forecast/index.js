var map = d3.select("#usmap").append("svg")
    .attr("viewBox", "0 0 1000 600")


d3.select("#histogram").append("h1")
    .text("How congress could look in 2021")
    .style("font-size", "3vw")
    .style("font-weight", "700")

d3.select("#time").append("h1")
    .text("The Zigs and Zags of the Race")
    .style("font-size", "3vw")
    .style("font-weight", "700")

d3.select("#beeSwarm").append("h1")
    .text("How Many Competitive Races are There?")
    .style("font-size", "3vw")
    .style("font-weight", "700")




var hist = d3.select("#histogram").append("svg")
    .attr("viewBox", "0 -50 1000 350")


var mapWidth = 1000,
    MapHeight = 600;


var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"])

var colors = [color(100), color(0)]
var projection = d3.geoAlbersUsa()
    .scale(1000)
    .translate([mapWidth / 2, (MapHeight / 2 + 40)]);
var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
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
    today.forEach((d, i) => {
        var district = d.districtID
        d.incumbentParty = inputData.filter(d => d.id == district)
    })
    var updated = data[data.length - 1].seat
    document.getElementById("updated").innerText = "UPDATED:" + updated
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
        .style("font-size", "20")
        .style("font-weight", "100")

    map.append("text")
        .text("Republicans")
        .attr("y", 30)
        .attr("x", 885)
        .attr("text-anchor", "end")
        .style("font-size", "20")
        .style("font-weight", "100")

    map.append("text")
        .text("Seats")
        .attr("y", 70)
        .attr("x", 500)
        .attr("text-anchor", "middle")
        .style("font-size", "25")
        .style("font-weight", "100")

    map.append("text")
        .text(nf(today[435].demWin) + "%")
        .attr("y", 70)
        .attr("x", 115)
        .style("font-size", "30")
        .style("font-weight", "100")
        .style("fill", color(0))

    map.append("text")
        .text(nf(today[435].repWin) + "%")
        .attr("y", 70)
        .attr("x", 885)
        .attr("text-anchor", "end")
        .style("font-size", "30")
        .style("font-weight", "100")
        .style("fill", color(100))

    map.append("text")
        .text(nf(today[435].demVote))
        .attr("y", 70)
        .attr("x", 400)
        .style("font-size", "20")
        .style("font-weight", "100")
        .style("fill", color(0))
        .attr("text-anchor", "middle")


    map.append("text")
        .text(nf(today[435].repVote))
        .attr("y", 70)
        .attr("x", 600)
        .style("font-size", "20")
        .style("font-weight", "100")
        .style("fill", color(100))
        .attr("text-anchor", "middle")
    today.pop()
    var pct = [50, 60, 70, 80, 90, 100]


    map.selectAll("grid")
        .data(pct)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 20 + 800)
        .attr("y", (d, i) => 400)
        .attr("width", 20)
        .attr("height", 20)
        .attr("ry", 5)
        .attr("stroke", "white")
        .attr("fill", d => color(d))


    map.append("rect")
        .attr("x", 800)
        .attr("y", 470)
        .attr("width", 20)
        .attr("height", 20)
        .attr("ry", 5)
        .attr("stroke", "black")
        .attr("fill", "white")

    map.append("text")
        .text("Close Race")
        .attr("x", 800)
        .attr("y", 500)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "start")
        .attr("fill", "black")
        .style("font-family", "sf-mono")
        .attr("font-size", 15)

    map.selectAll("grid")
        .data(pct)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 20 + 800)
        .attr("y", (d, i) => 420)
        .attr("width", 20)
        .attr("height", 20)
        .attr("ry", 5)
        .attr("stroke", "white")
        .attr("fill", d => color(100 - d))

    map.selectAll("grid")
        .data(pct)
        .enter()
        .append("text")
        .text(d => d)
        .attr("x", (d, i) => i * 20 + 810)
        .attr("y", (d, i) => 390)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .style("font-family", "sf-mono")
        .attr("font-size", 12)

    map.append("text")
        .text("REP")
        .attr("x", (d, i) => 925)
        .attr("y", (d, i) => 410)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "start")
        .attr("fill", "black")
        .style("font-family", "sf-mono")
        .attr("font-size", 15)

    map.append("text")
        .text("DEM")
        .attr("x", (d, i) => 925)
        .attr("y", (d, i) => 430)
        .attr("dominant-baseline", "central")
        .attr("text-anchor", "start")
        .attr("fill", "black")
        .style("font-family", "sf-mono")
        .attr("font-size", 15)
 

    function regMap() {

        d3.select("#cartbutton")
            .style("font-weight", "100")
            .style("font-size", "15")

        d3.select("#mapbutton")
            .style("font-weight", "500")
            .style("font-size", "20")

        d3.selectAll(".boxMap").remove()

        map.append("g")
            .attr("class", "district-boundaries regMap")
            .selectAll("path")
            .data(districts)
            .enter().append("a").attr("href", d => "districts?district=" + d.districtID).append("path")
            .attr("d", path)
            .style("fill", (d, i) => color(d.properties.repWin))
            .style("stroke", "white")
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
                    .style("font-weight", "100")
                    .style("font-size", "20")
                    .attr("text-anchor", "middle")

                tipSVG.append("text")
                    .text(ordinal(d.properties.seat))
                    .attr("y", 40)
                    .attr("x", 87.5)
                    .attr("fill", "black")
                    .style("font-weight", "100")
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
                    .style("font-weight", "100")
                    .style("font-size", 20)
                    .attr("text-anchor", "middle")

                tipSVG.append("text")
                    .text(nf(d.properties.demWin) + "%")
                    .attr("y", 150)
                    .attr("x", 43.75)
                    .attr("fill", color(0))
                    .style("font-weight", "100")
                    .style("font-size", 20)
                    .attr("text-anchor", "middle")

                tipSVG.append("text")
                    .text(d.properties.margin > 0 ? "R+" + nf(d.properties.margin) : "D+" + nf(-d.properties.margin))
                    .attr("y", 185)
                    .attr("x", 87.5)
                    .attr("fill", d.properties.margin > 0 ? color(100) : color(0))
                    .style("font-weight", "100")
                    .style("font-size", 25)
                    .attr("text-anchor", "middle")
            })

            .on('mouseout',
                function (d) {


                    tool_tip.hide()
                });



        map.append("g")
            .attr("class", "state-boundaries regMap")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("d", path)

    }


    grid.forEach((d, i) => {
        var districtID = d.district
        d.repWin = today.filter(d => d.districtID == districtID).length == 0 ? 50 : +today.filter(d => d.districtID == districtID)[0].repWin
        d.demWin = today.filter(d => d.districtID == districtID).length == 0 ? 50 : +today.filter(d => d.districtID == districtID)[0].demWin
        d.state = today.filter(d => d.districtID == districtID).length == 0 ? "" : today.filter(d => d.districtID == districtID)[0].state
        d.seat = today.filter(d => d.districtID == districtID).length == 0 ? "" : today.filter(d => d.districtID == districtID)[0].seat
        d.margin = today.filter(d => d.districtID == districtID).length == 0 ? "" : today.filter(d => d.districtID == districtID)[0].margin
    })


    map.append("text")
        .attr("id", "cartbutton")
        .text("Cartogram")
        .attr("y", 340)
        .attr("x", 885)
        .attr("text-anchor", "end")
        .style("font-size", "15")
        .style("font-weight", "100")
        .on("mouseover", d => {
            d3.select("#cartbutton")
                .style("text-decoration", "solid underline")
        })
        .on("mouseout", d => {
            d3.select("#cartbutton")
                .style("text-decoration", "none")
                .attr("cursor", "pointer")
        })
        .on("click", d => {
            boxMap()
        })

    map.append("text")
        .attr("id", "mapbutton")
        .text("MAP")
        .attr("y", 365)
        .attr("x", 885)
        .attr("text-anchor", "end")
        .style("font-size", "15")
        .style("font-weight", "100")
        .on("mouseover", function (d) {
            d3.select("#mapbutton")
                .style("text-decoration", "solid underline")
                .attr("cursor", "pointer")

        })
        .on("mouseout", d => {
            d3.select("#mapbutton")
                .style("text-decoration", "none")
        })
        .on("click", d => {
            regMap()
        })

    function boxMap() {


        d3.select("#cartbutton")
            .style("font-weight", "500")
            .style("font-size", "20")

        d3.select("#mapbutton")
            .style("font-weight", "100")
            .style("font-size", "15")

        d3.selectAll(".regMap").remove()

        map.selectAll("grid")
            .data(grid)
            .enter()
            .append("rect")
            .attr("class", "gridDistricts boxMap")
            .attr("id", d => d.district + "grid")
            .attr("x", d => (+d.column) * 15 + 80)
            .attr("y", d => (+d.row) * 15 + 50)
            .attr("width", 15)
            .attr("height", 15)
            .attr("ry", 4)
            .attr("stroke", d => d.district == "" || d.district == undefined ? "none" : "white")
            .attr("fill", d => d.label == "" ? color(d.repWin) : "none")

        map.selectAll("grid")
            .data(grid)
            .enter()
            .append("text")
            .attr("class", "boxMap")
            .text(d => d.label)
            .attr("x", d => (+d.column) * 15 + 87.5)
            .attr("y", d => (+d.row) * 15 + 57.5)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .style("font-family", "sf-mono")
            .attr("font-size", 11)
            .style("font-weight",100)

        map.selectAll("grid")
            .data(grid)
            .enter()
            .append("a").attr("href", d => "districts?district=" + d.district)
            .append("rect")
            .attr("class", "statesover boxMap")
            .attr("x", d => (+d.column) * 15 + 80)
            .attr("y", d => (+d.row) * 15 + 50)
            .attr("width", 15)
            .attr("height", 15)
            .attr("ry", 7)
            .attr("stroke", d => d.label == "" ? Math.abs(d.repWin - 50) < 30 ? "black" : "none" : "none")
            .attr("stroke-width", .75)
            .on('mouseover', function (d) {







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
                    .style("font-weight", "100")
                    .style("font-size", "17")
                    .attr("text-anchor", "middle")

                tipSVG.append("text")
                    .text(ordinal(d.seat))
                    .attr("y", 40)
                    .attr("x", 87.5)
                    .attr("fill", "black")
                    .style("font-weight", "100")
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
                    .style("font-weight", "100")
                    .style("font-size", 20)
                    .attr("text-anchor", "middle")

                tipSVG.append("text")
                    .text(nf(d.demWin) + "%")
                    .attr("y", 150)
                    .attr("x", 43.75)
                    .attr("fill", color(0))
                    .style("font-weight", "100")
                    .style("font-size", 20)
                    .attr("text-anchor", "middle")

                tipSVG.append("text")
                    .text(d.margin > 0 ? "R+" + nf(d.margin) : "D+" + nf(-d.margin))
                    .attr("y", 185)
                    .attr("x", 87.5)
                    .attr("fill", d.margin > 0 ? color(100) : color(0))
                    .style("font-weight", "100")
                    .style("font-size", 25)
                    .attr("text-anchor", "middle")
            })

            .on('mouseout',
                function (d) {

                    tool_tip.hide()


                });
    }

    boxMap()

    //histogram
    var yHistogram = d3.scaleLinear()
        .domain([0, d3.max(histogram, d => d.occ)])
        .range([0, 200])

    var barWidth = 1000 / 75

    var histMarker = [180, 195, 210, 225]

    for (let a = 1; a < 5; a++) {

        hist.append("text")
            .attr("class", "histDisappear")
            .text(a == 4 ? a + "%" : a)
            .attr("y", 243 - yHistogram(a))
            .attr("x", 20)
            .style("fill", "grey")
            .style("font-weight", "100")
            .style("font-size", 15)
            .attr("text-anchor", "end")

        hist.append("line")
            .attr("class", "histDisappear")
            .attr("y1", 250 - yHistogram(a))
            .attr("y2", 250 - yHistogram(a))
            .attr("x1", 25)
            .attr("x2", 975)
            .style("stroke", "grey")
    }

    hist.selectAll("re")
        .data(histMarker)
        .enter()
        .append("text")
        .attr("class", "histDisappear")
        .text(d => "R " + d)
        .attr("x", (d, i) => (d - 165) * barWidth + barWidth / 2)
        .attr("y", 270)
        .attr("fill", color(100))
        .style("font-weight", "500")
        .style("font-size", 15)
        .attr("text-anchor", "middle")



    hist.selectAll("re")
        .data(histMarker)
        .enter()
        .append("text")
        .attr("class", "histDisappear")
        .text(d => "D " + (435 - d))
        .attr("x", (d, i) => (d - 165) * barWidth + barWidth / 2)
        .attr("y", 290)
        .attr("fill", color(0))
        .style("font-weight", "500")
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

    hist.append("rect")
        .attr("class", "histDisappear")
        .attr("x", (d, i) => (histogram[67].rep - 165) * barWidth)
        .attr("y", d => 250 - yHistogram(histogram[67].occ))
        .attr("width", barWidth)
        .attr("height", d => yHistogram(histogram[67].occ))
        .attr("stroke", "black")
        .attr("fill", "none")


    hist.append("text")
        .text("CURRENt")
        .attr("class", "histDisappear")
        .attr("x", (d, i) => (histogram[67].rep - 165) * barWidth + barWidth / 2)
        .attr("y", d => 270)
        .attr("width", barWidth)
        .attr("height", d => yHistogram(histogram[67].occ))
        .attr("text-anchor", "middle")
        .attr("font-size", 15)

    hist.selectAll("re")
        .data(histogram)
        .enter()
        .append("rect")
        .attr("x", (d, i) => (d.rep - 165) * barWidth)
        .attr("y", 0)
        .attr("width", barWidth)
        .attr("height", 250)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on('mouseover', function (d) {

            d3.selectAll(".histDisappear").style("opacity", .2);



            hist.append("text")
                .attr("class", "histData")
                .text(nf(d.occ) + "%")
                .attr("x", (d.rep - 165) * barWidth)
                .attr("y", 0)
                .style("font-weight", "100")
                .style("font-size", "20")
                .attr("text-anchor", "middle")
                .attr("fill", "black")

            hist.append("text")
                .attr("class", "histData")
                .text(d.rep)
                .attr("x", (d.rep - 165) * barWidth)
                .attr("y", d.rep > 217 ? 20 : 40)
                .style("font-weight", "100")
                .style("font-size", "20")
                .attr("text-anchor", "middle")
                .attr("fill", color(100))

            hist.append("text")
                .attr("class", "histData")
                .text(d.dem)
                .attr("x", (d.rep - 165) * barWidth)
                .attr("y", d.dem > 217 ? 20 : 40)
                .style("font-weight", "100")
                .style("font-size", "20")
                .attr("text-anchor", "middle")
                .attr("fill", color(0))




        })
        .on('mouseout',
            function (d) {
                d3.selectAll(".histDisappear").style("opacity", 1)
                d3.selectAll(".histData").remove()


                tool_tip.hide()
            });

    hist.append("line")
        .attr("class", "histDisappear")
        .attr("x1", (218 - 165) * barWidth)
        .attr("x2", (218 - 165) * barWidth)
        .attr("y1", 250 - yHistogram(4))
        .attr("y2", 260)
        .attr("stroke", "black")

    var time_data = data.filter(d => d.state == key_state)
    var line_data = time_data
    line_data.forEach((d, i) => {
        d.date = dp(d.forecastDate)
    })
    var max_date = d3.max(line_data, d => d.date)

    var margin = { top: 20, right: 40, bottom: 20, left: 40 }
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
        .domain([new Date(2020, 2, 1), new Date(2020, 10, 3)])

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
        .call(d3.axisBottom(x).tickSize(-520).ticks(5)
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
        .style("opacity", 1)
        .attr("y1", -height+20)
        .attr("y2", -20);

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

    function update(input, speed) {


        var copy = keys.filter(f => f.includes(input))
        var cities = copy.map(function (id) {
            return {
                id: id,
                values: line_data.map(d => { return { date: d.date, pct: +d[id] } })
            };
        });
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
                .style("stroke-width", 10)
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

                focus.select(".lineHover")
                    .attr("transform", "translate(" + x(d.date) + "," + height + ")");

                focus.select(".lineHoverDate")
                    .attr("x", x(d.date))
                    .attr("y", 5)
                    .attr("text-anchor", "middle")
                    .style("font-size", 20)
                    .style("font-weight", "100")
                    .text(formatDate(d.date).toUpperCase())
                    .style("font-family", "sf-mono");

                focus.selectAll(".hoverCircle")
                    .attr("cy", e => y(d[e]))
                    .attr("cx", x(d.date));

                focus.selectAll(".lineHoverText2")
                    .style("font-weight", "100")
                    .attr("x", x(d.date) + 10)
                    .text((e, i) => input == "margin" ? "D +" + onevalue(-d[e]) : i == 1 ? ("DEM " + onevalue(d[e])) : i == 0 ? "REP " + onevalue(d[e]) : "Third " + onevalue(d[e]))
                    .attr("y", e => d[e] == d["rep" + input] ? y(d["rep" + input]) > y(d["dem" + input]) ? y(d["rep" + input]) + 12 : y(d["rep" + input]) - 12 : d[e] == d["dem" + input] ? y(d["dem" + input]) > y(d["rep" + input]) ? y(d["dem" + input]) + 12 : y(d["dem" + input]) - 12 : y(d[e]) - 12)
                    .attr("text-anchor", (e, i) => i == 2 ? "end" : "start")
                    .attr("dominant-baseline", "middle")
                    .style("font-family", "sf-mono")


                focus.selectAll(".lineHoverText")
                    .style("font-weight", "100")
                    .attr("x", x(d.date) + 10)
                    .text((e, i) => input == "margin" ? "D +" + onevalue(-d[e]) : i == 1 ? ("DEM " + onevalue(d[e])) : i == 0 ? "REP " + onevalue(d[e]) : "Third " + onevalue(d[e]))
                    .attr("fill", (e, i) => input == "margin" ? color(0) : colors[i])
                    .attr("y", e => d[e] == d["rep" + input] ? y(d["rep" + input]) > y(d["dem" + input]) ? y(d["rep" + input]) + 12 : y(d["rep" + input]) - 12 : d[e] == d["dem" + input] ? y(d["dem" + input]) > y(d["rep" + input]) ? y(d["dem" + input]) + 12 : y(d["dem" + input]) - 12 : y(d[e]) - 12)
                    .attr("text-anchor", (e, i) => i == 2 ? "end" : "start")
                    .attr("dominant-baseline", "middle")
                    .style("font-family", "sf-mono")
            }
        }
    }







    var stateRaces = []

    states.forEach(d => {
        stateRaces.push({ state: d, newRow: 0 })
    })
    console.log(today)

    stateRaces.forEach((d, i) => {
        var state = d.state
    })
    console.log(stateRaces)
    var newTable = d3.select("#table").append("table").attr("width", "100%")

    var header = newTable.append("tr")

    var xTable = d3.scaleLinear()
        .range([50, 950])
        .domain([0, 100])

    header.append("td")
        .attr("width", "25%")
        .append("h1")
        .text("STATE")
        .style("font-family", "sf-mono")
        .style("font-weight", 100)
        .style("font-size", "2vw")

    header.append("td")
        .attr("width", "5%")

    header.append("td")
        .attr("width", "75%")
        .attr("id", "topPct")


    var topPCT = d3.select("#topPct")
        .append("svg")
        .attr("viewBox", "0 0 1000 100")

    var pct = [0, 25, 50, 75, 100]

    topPCT.append("text")
        .text("win")
        .attr("x", 500)
        .attr("y", 25)
        .attr("fill", "black")
        .style("font-weight", "100")
        .style("font-size", 25)
        .attr("text-anchor", "middle")

    topPCT.selectAll("asd")
        .data(pct)
        .enter()
        .append("text")
        .text(d => d + "%")
        .attr("x", d => xTable(d))
        .attr("y", 75)
        .attr("fill", "black")
        .style("font-weight", "100")
        .style("font-size", 22)
        .attr("text-anchor", "middle")

    stateRaces.forEach((d, i) => {
        var state = d.state
        var races = today.filter(d => d.state == state)
        newTable.append("tr")
            .style("border-bottom", "black solid 1px")
            .attr("id", d.state + "firstRow")
            .style("border-bottom", "black solid 1px")


        d3.select("#" + d.state + "firstRow")
            .append("td")
            .attr("width", "25%")
            .append("h1")
            .text(d.state.toUpperCase())
            .style("font-family", "sf-mono")
            .style("font-weight", 100)
            .style("font-size", "1.5vw")



        d3.select("#" + d.state + "firstRow")
            .append("td")
            .attr("width", "5%")
            .attr("id", d.state + "plusMinusSign")
            .append("img")
            .style("width", "50%")
            .style("padding", "15%")
            .attr("id", d.state + "plusSign")
            .attr("src", "https://jhkforecasts.com/plus-sign-01.svg")
            .attr("class", "pointer")
            .on("click", function (id) {

                appendNewRow(d.state)

            })


        d3.select("#" + d.state + "firstRow")
            .attr("width", "75%")
            .attr("id", d.state + "bubbles")


        var bubs = d3.select("#" + d.state + "bubbles")
            .append("svg")
            .attr("viewBox", "0 0 1000 50")

        bubs.selectAll("bubs")
            .data(races)
            .enter()
            .append("circle")
            .attr("cy", 25)
            .attr("r", 6)
            .attr("cx", d => xTable(+d.repWin))
            .attr("fill", d => color(d.repWin))
            .attr("opacity", .5)

        bubs.selectAll("bubs")
            .data(races)
            .enter()
            .append("circle")
            .attr("cy", 25)
            .attr("r", 6)
            .attr("cx", d => xTable(+d.repWin))
            .attr("fill", "none")
            .attr("stroke", d => d.incumbentParty[0].incumbentParty == "(R)" ? colors[0] : colors[1])

        newTable.append("tr")
            .attr("id", d.state + "secondRow")

    })

    function appendNewRow(state) {
        var newRow = d3.select("#" + state + "secondRow")

        var newTable = newRow.append("td")
            .attr("id", state + "secondRowTable")
            .attr("colspan", 3)
            .append("table")
            .attr("width", "100%")

        var races = today.filter(d => d.state == state)
        var newTableHeader = newTable.append("tr")
            .style("border-bottom", "1px solid lightgray")

        newTableHeader.append("td")
            .attr("width", "30%")
            .append("h1")
            .text("DISTRICT")
            .style("font-family", "sf-mono")
            .style("font-weight", 100)
            .style("font-size", "1.5vw")
            .style("padding-left", "15px")

        newTableHeader.append("td")
            .attr("width", "15%")
            .append("h1")
            .text("REP")
            .style("font-family", "sf-mono")
            .style("font-weight", 100)
            .style("font-size", "1.5vw")
            .style("text-align", "center")

        newTableHeader.append("td")
            .attr("width", "15%")
            .append("h1")
            .text("DEM")
            .style("font-family", "sf-mono")
            .style("font-weight", 100)
            .style("font-size", "1.5vw")
            .style("text-align", "center")

        newTableHeader.append("td")
            .attr("width", "20%")
            .append("h1")
            .text("MARGIN")
            .style("font-family", "sf-mono")
            .style("font-weight", 100)
            .style("font-size", "1.5vw")
            .style("text-align", "center")

        newTableHeader.append("td")
            .attr("width", "20%")
            .append("h1")
            .text("WIN")
            .style("font-family", "sf-mono")
            .style("font-weight", 100)
            .style("font-size", "1.5vw")
            .style("text-align", "center")


        races.forEach((d, i) => {

            var districtRow = newTable.append("tr")
                .style("border-bottom", "1px solid white")

            districtRow.append("td")
                .style("width", "40%")
                .append("a")
                .attr("href", "districts?district=" + d.districtID)
                .append("h1")
                .text(ordinal(d.seat).toUpperCase())
                .style("font-family", "sf-mono")
                .style("font-weight", 100)
                .style("font-size", "1.5vw")
                .style("padding-left", "15px")

            districtRow.append("td")
                .style("width", "15%")
                .append("h1")
                .text(nf(d.repVote))
                .style("font-family", "sf-mono")
                .style("font-weight", 100)
                .style("font-size", "1.5vw")
                .style("text-align", "center")

            districtRow.append("td")
                .style("width", "15%")
                .append("h1")
                .text(nf(d.demVote))
                .style("font-family", "sf-mono")
                .style("font-weight", 100)
                .style("font-size", "1.5vw")
                .style("text-align", "center")

            districtRow.append("td")
                .style("width", "20%")
                .append("h1")
                .text((d.repVote > d.demVote ? "R+" : "D+") + nf(Math.abs(d.repVote - d.demVote)))
                .style("font-family", "sf-mono")
                .style("font-weight", 100)
                .style("font-size", "1.5vw")
                .style("text-align", "center")

            districtRow.append("td")
                .style("background-color", color(d.repWin))
                .style("width", "12%")
                .append("h1")
                .text(nf((Math.abs(d.repWin - 50) + 50)) + "%")
                .style("font-family", "sf-mono")
                .style("font-weight", 100)
                .style("font-size", "1.5vw")
                .style("text-align", "center")


        })
        d3.select("#" + state + "plusSign").remove()
    }
}
