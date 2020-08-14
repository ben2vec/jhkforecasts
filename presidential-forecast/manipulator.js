var widthmap = 1020
var heightmap = 500
var bubble_info = [{ "state": "Alabama", "label": "AL", "radius": 16.43, "x": 413, "y": 332 }, { "state": "Alaska", "label": "AK", "radius": 9.49, "x": 41, "y": 19 }, { "state": "Arizona", "label": "AZ", "radius": 18.17, "x": 172, "y": 282 }, { "state": "Arkansas", "label": "AR", "radius": 13.42, "x": 325, "y": 290 }, { "state": "California", "label": "CA", "radius": 40.62, "x": 103, "y": 237 }, { "state": "Colorado", "label": "CO", "radius": 16.43, "x": 224, "y": 249 }, { "state": "Connecticut", "label": "CT", "radius": 14.49, "x": 586, "y": 128 }, { "state": "Delaware", "label": "DE", "radius": 9.49, "x": 557, "y": 183 }, { "state": "District of Columbia", "label": "DC", "radius": 9.49, "x": 536, "y": 193 }, { "state": "Florida", "label": "FL", "radius": 29.5, "x": 483, "y": 380 }, { "state": "Georgia", "label": "GA", "radius": 21.91, "x": 443, "y": 298 }, { "state": "Hawaii", "label": "HI", "radius": 10.95, "x": 88, "y": 372 }, { "state": "Idaho", "label": "ID", "radius": 10.95, "x": 188, "y": 173 }, { "state": "Illinois", "label": "IL", "radius": 24.49, "x": 359, "y": 207 }, { "state": "Indiana", "label": "IN", "radius": 18.17, "x": 413, "y": 207 }, { "state": "Iowa", "label": "IA", "radius": 13.42, "x": 306, "y": 195 }, { "state": "Kansas", "label": "KS", "radius": 13.42, "x": 266, "y": 248 }, { "state": "Kentucky", "label": "KY", "radius": 15.49, "x": 411, "y": 251 }, { "state": "Louisiana", "label": "LA", "radius": 15.49, "x": 326, "y": 335 }, { "state": "Maine", "label": "ME", "radius": 7.75, "x": 628, "y": 26 }, { "state": "Maryland", "label": "MD", "radius": 17.32, "x": 505, "y": 185 }, { "state": "Massachusetts", "label": "MA", "radius": 18.17, "x": 607, "y": 89 }, { "state": "Michigan", "label": "MI", "radius": 21.91, "x": 418, "y": 149 }, { "state": "Minnesota", "label": "MN", "radius": 17.32, "x": 304, "y": 142 }, { "state": "Mississippi", "label": "MS", "radius": 13.42, "x": 373, "y": 324 }, { "state": "Missouri", "label": "MO", "radius": 17.32, "x": 329, "y": 251 }, { "state": "Montana", "label": "MT", "radius": 9.49, "x": 206, "y": 131 }, { "state": "Nebraska", "label": "NE", "radius": 7.75, "x": 258, "y": 209 }, { "state": "Nevada", "label": "NV", "radius": 13.42, "x": 167, "y": 220 }, { "state": "New Hampshire", "label": "NH", "radius": 10.95, "x": 612, "y": 54 }, { "state": "New Jersey", "label": "NJ", "radius": 20.49, "x": 551, "y": 147 }, { "state": "New Mexico", "label": "NM", "radius": 12.25, "x": 215, "y": 303 }, { "state": "New York", "label": "NY", "radius": 29.5, "x": 548, "y": 81 }, { "state": "North Carolina", "label": "NC", "radius": 21.21, "x": 499, "y": 278 }, { "state": "North Dakota", "label": "ND", "radius": 9.49, "x": 257, "y": 136 }, { "state": "Ohio", "label": "OH", "radius": 23.24, "x": 459, "y": 191 }, { "state": "Oklahoma", "label": "OK", "radius": 14.49, "x": 270, "y": 294 }, { "state": "Oregon", "label": "OR", "radius": 14.49, "x": 124, "y": 176 }, { "state": "Pennsylvania", "label": "PA", "radius": 24.49, "x": 498, "y": 132 }, { "state": "Rhode Island", "label": "RI", "radius": 10.95, "x": 619, "y": 126 }, { "state": "South Carolina", "label": "SC", "radius": 16.43, "x": 487, "y": 322 }, { "state": "South Dakota", "label": "SD", "radius": 9.49, "x": 257, "y": 167 }, { "state": "Tennessee", "label": "TN", "radius": 18.17, "x": 379, "y": 284 }, { "state": "Texas", "label": "TX", "radius": 33.76, "x": 271, "y": 355 }, { "state": "Utah", "label": "UT", "radius": 13.42, "x": 204, "y": 218 }, { "state": "Vermont", "label": "VT", "radius": 9.49, "x": 585, "y": 47 }, { "state": "Virginia", "label": "VA", "radius": 19.75, "x": 508, "y": 229 }, { "state": "Washington", "label": "WA", "radius": 18.97, "x": 154, "y": 131 }, { "state": "West Virginia", "label": "WV", "radius": 12.25, "x": 451, "y": 242 }, { "state": "Wisconsin", "label": "WI", "radius": 17.32, "x": 359, "y": 146 }, { "state": "Wyoming", "label": "WY", "radius": 9.49, "x": 214, "y": 177 }, { "state": "Maine-1", "label": "NE1", "radius": 5.48, "x": 612, "y": 26 }, { "state": "Maine-2", "label": "NE2", "radius": 5.48, "x": 644, "y": 26 }, { "state": "Nebraska-1", "label": "NE1", "radius": 5.48, "x": 242, "y": 209 }, { "state": "Nebraska-2", "label": "NE2", "radius": 5.48, "x": 258, "y": 193 }, { "state": "Nebraska-3", "label": "NE3", "radius": 5.48, "x": 274, "y": 209 }, { "state": "US", "label": "US", "radius": 5.48, "x": 274, "y": 209 }]
var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Maine-1", "Maine-2", "Nebraska-1", "Nebraska-2", "Nebraska-3", "US"]
var map_states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934 }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400 }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801 }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387 }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 245.9219 }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 240.5645 }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000 }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000 }, { "state": "District of Columbia", "label": "DC", "xValue": -1000, "yValue": -1000 }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154 }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354 }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465 }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155 }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 225.2954 }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 223.4214 }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 198.6782 }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 255.1592 }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 264.9658 }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135 }, { "state": "Maine", "label": "ME", "xValue": 807.3105, "yValue": 109.855 }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000 }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000 }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647 }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874 }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514 }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 255.123 }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705 }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527 }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957 }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000 }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210 }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035 }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 160.2588 }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 280.5029 }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 112.3823 }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 215.4883 }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418 }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654 }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 195.856 }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000 }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 310.6387 }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 158.5166 }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 290.8193 }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 368.2861 }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 230.978 }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000 }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 252.7842 }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762 }, { "state": "West Virginia", "label": "WV", "xValue": 701, "yValue": 243 }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588 }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 175.6255 }, { "state": "Maine-1", "label": "ME1", "xValue": -1000, "yValue": -1000 }, { "state": "Maine-2", "label": "ME2", "xValue": -1000, "yValue": -1000 }, { "state": "Nebraska-1", "label": "NE1", "xValue": -1000, "yValue": -1000 }, { "state": "Nebraska-2", "label": "NE2", "xValue": -1000, "yValue": -1000 }, { "state": "Nebraska-3", "label": "NE3", "xValue": -1000, "yValue": -1000 }, { "state": "US", "label": "US", "xValue": -1000, "yValue": -1000 }]
var nf = d3.format(".1f")
var wf = d3.format(".0f")
var colors = ["#FF6060", "#0091FF", "#FFE130"]

var category = ["gop", "DEM", "third"]

var cand_colors = d3.scaleOrdinal()
    .domain(category)
    .range(["#FF6060", "#0091FF", "#FFE130"])

var projection = d3.geoAlbersUsa()
    .translate([widthmap / 2, heightmap / 2])
    .scale([900]);

var path = d3.geoPath()
    .projection(projection);


var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"]);

var map = d3.select("#usmap")
    .append("svg")
    .attr("viewBox", '75 45 900 420');

var mapPhone = d3.select("#usmapPhone")
    .append("svg")
    .attr("viewBox", '150 45 720 420');

var overview = d3.select("#overview")
    .append("svg")
    .attr("viewBox", '75 -50 900 100');

var overviewPhone = d3.select("#overviewPhone")
    .append("svg")
    .attr("viewBox", '75 -50 900 200');
var sbs = d3.select("#states")
    .append("svg")
    .attr("viewBox", '0 0 250 2000');

var sbsPhone = d3.select("#statesPhone")
    .append("svg")
    .attr("viewBox", '0 0 1000 3420');

queue()
    .defer(d3.json, "https://projects.jhkforecasts.com/presidential-forecast/us-states.json")
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-presidential-output.csv")
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-pres-input.csv")
    .await(ready);

function ready(error, us, data, input) {
    if (error) throw error;
    var labels = bubble_info.map(d => {
        return d.label

    })

    var Stateslabels = bubble_info.map(d => {
        return d.state

    })
    var states = map_labels.map((d, i) => {
        return {
            state: d.state,
            change: "none",
            label: d.label,
            xv: d.xValue,
            yv: d.yValue,
            original: data.filter(d => d[map_labels[i].label] =="REP").length * 100 / 20000
        }
    })
    var simulationsPrev = 20000
    var simNum = []
    update(states, "yes")
    function update(input, hardReset) {
        var topBanner = d3.select("#topBanner")
        var dataNew = data
        hardReset == "yes" ? simNum = [] : ""
        var reset = simNum.length == 0 ? "yes" : "no"
        input.forEach(d => {
            var state = d.state
            var change = d.change
            var label = d.label
            dataNew = change == "none" ? dataNew : dataNew.filter(d => d[label] == change)
            d.changeValue = d.change != "none" ? 1 : 0
        })
        simNum.push([0])
        var simulations = dataNew.length
        states.forEach(d => {
            var label = d.label
            d.prev = d.win
            d.win = dataNew.filter(d => d[label] =="REP").length * 100 / simulations
        })
        var gopEvAvg = d3.mean(dataNew, d => d.gopEV)
        var json = us
        states.forEach(d => {
            var state = d.state
            d.geometry = json.features.filter(d => state == d.properties.name).length == 0 ? "" : json.features.filter(d => state == d.properties.name)[0].geometry
            d.type = json.features.filter(d => state == d.properties.name).length == 0 ? "" : json.features.filter(d => state == d.properties.name)[0].type
            d.id = json.features.filter(d => state == d.properties.name).length == 0 ? "" : json.features.filter(d => state == d.properties.name)[0].id

        })

        topBanner
            .style("background-color", reset == "yes" ? color(states[56].win) : color(states[56].prev))
            .transition()
            .duration(500)
            .style("background-color", simulations == 0 ? "white" : color(states[56].win))

        d3.selectAll(".changing").remove()
        d3.selectAll(".labels").remove()
        console.log(reset)
        console.log(states)
        map.selectAll("map2")
            .data(states)
            .enter()
            .append("path")
            .attr("class", "changing")
            .attr("d", path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", d => simulations == 0 ? "lightgray" : simulationsPrev == 0 ? "lightgray" : reset == "yes" ? color(d.win) : color(d.prev))
            .transition()
            .duration(500)
            .style("fill", d => simulations == 0 ? "lightgray" : color(d.win));

        mapPhone.selectAll("map2")
            .data(states)
            .enter()
            .append("path")
            .attr("class", "changing")
            .attr("d", path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", d => simulations == 0 ? "lightgray" : simulationsPrev == 0 ? "lightgray" : reset == "yes" ? color(d.win) : color(d.prev))
            .transition()
            .duration(500)
            .style("fill", d => simulations == 0 ? "lightgray" : color(d.win));

        map.selectAll("label")
            .data(states)
            .enter()
            .append("text")
            .attr("class", "labels")
            .text(d => d.label)
            .attr("x", d => d.xv)
            .attr("y", d => d.yv)
            .style("font-family", "sf-mono")
            .style("font-size", 9)
            .style("fill", d => Math.abs(50 - d.win) < 15 ? "black" : "white")
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")
            .style("font-weight", 500)


        mapPhone.selectAll("label")
            .data(states)
            .enter()
            .append("text")
            .attr("class", "labels")
            .text(d => d.label)
            .attr("x", d => d.xv)
            .attr("y", d => d.yv)
            .style("font-family", "sf-mono")
            .style("font-size", 15)
            .style("fill", d => Math.abs(50 - d.win) < 15 ? "black" : "white")
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")
            .style("font-weight", 500)

        map.selectAll("label")
            .data(states)
            .enter()
            .append("rect")
            .attr("class", "changing")
            .attr("x", d => d.xv - 8)
            .attr("y", d => d.yv - 8)
            .style("width", 16)
            .style("height", 16)
            .style("fill", "none")
            .attr("stroke", d => d.change == "none" ? "none" : "black")
            .attr("ry", 3)

        mapPhone.selectAll("label")
            .data(states)
            .enter()
            .append("rect")
            .attr("class", "changing")
            .attr("x", d => d.xv - 12.5)
            .attr("y", d => d.yv - 12.5)
            .style("width", 25)
            .style("height", 25)
            .style("fill", "none")
            .attr("stroke", d => d.change == "none" ? "none" : "black")
            .attr("ry", 3)

        map.selectAll("map2")
            .data(states)
            .enter()
            .append("path")
            .attr("class", "statesover changing")
            .attr("d", path)
            .style("stroke-width", "1")
            .style("fill", "none")
            .on("click", function (d, i) {
                d.change == "none" ?
                    (states[labels.indexOf(d.label)].change ="REP") &&
                    update(states) :
                    d.change =="REP" ?
                        (states[labels.indexOf(d.label)].change = "DEM") &&
                        update(states) :
                        d.change == "DEM" ?
                            (states[labels.indexOf(d.label)].change = "none") &&
                            update(states) : (states[labels.indexOf(d.label)].change = "none") &&
                            update(states)
            })
            .attr("cursor","pointer");

        mapPhone.selectAll("map2")
            .data(states)
            .enter()
            .append("path")
            .attr("class", "statesover changing")
            .attr("d", path)
            .style("stroke-width", "1")
            .style("fill", "none")
            .on("click", function (d, i) {
                d.change == "none" ?
                    (states[labels.indexOf(d.label)].change ="REP") &&
                    update(states) :
                    d.change =="REP" ?
                        (states[labels.indexOf(d.label)].change = "DEM") &&
                        update(states) :
                        d.change == "DEM" ?
                            (states[labels.indexOf(d.label)].change = "none") &&
                            update(states) : (states[labels.indexOf(d.label)].change = "none") &&
                            update(states)
            });


        overview.append("text")
            .attr("class", "changing")
            .text("Simulations where this occurs: " + nf(simulations / 200) + "%")
            .attr("y", -10)
            .attr("x", 525)
            .style("font-family", "sf-mono")
            .style("font-size", 15)
            .style("fill", "black")
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")
            .style("font-weight", 500)

        overviewPhone.append("text")
            .attr("class", "changing")
            .text("Simulations where this occurs: " + nf(simulations / 200) + "%")
            .attr("y", 30)
            .attr("x", 525)
            .style("font-family", "sf-mono")
            .style("font-size", 20)
            .style("fill", "black")
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")
            .style("font-weight", 500)

        overview.append("text")
            .attr("class", "changing")
            .text("(" + simulations + " out of " + 20000 + ")")
            .attr("y", 10)
            .attr("x", 525)
            .style("font-family", "sf-mono")
            .style("font-size", 15)
            .style("fill", "#AFAFAf")
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")
            .style("font-weight", 500)

        overviewPhone.append("text")
            .attr("class", "changing")
            .text("(" + simulations + " out of " + 20000 + ")")
            .attr("y", 60)
            .attr("x", 525)
            .style("font-family", "sf-mono")
            .style("font-size", 25)
            .style("fill", "#AFAFAf")
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")
            .style("font-weight", 500)

        overview.append("text").attr("class", "changing")
            .text("Donald Trump")
            .attr("x", 850)
            .attr("y", -30)
            .attr("font-family", "sf-mono")
            .style("font-weight", "100")
            .attr("font-size", "15")
            .attr("fill", "black")
            .attr("text-anchor", "end")


        overview.append("text").attr("class", "changing")
            .text(simulations == 0 ? 'ツ' : nf(states[states.length - 1].win) + "%")
            .attr("x", 850)
            .attr("y", 00)
            .attr("font-family", "sf-mono")
            .style("font-weight", "100")
            .attr("font-size", "25")
            .attr("fill", colors[0])
            .attr("text-anchor", "end")


        overviewPhone.append("text").attr("class", "changing")
            .text("Donald Trump")
            .attr("x", 790)
            .attr("y", -30)
            .attr("font-family", "sf-mono")
            .style("font-weight", "100")
            .attr("font-size", "20")
            .attr("fill", "black")
            .attr("text-anchor", "end")


        overviewPhone.append("text").attr("class", "changing")
            .text(simulations == 0 ? 'ツ' : nf(states[states.length - 1].win) + "%")
            .attr("x", 790)
            .attr("y", 00)
            .attr("font-family", "sf-mono")
            .style("font-weight", "100")
            .attr("font-size", "30")
            .attr("fill", colors[0])
            .attr("text-anchor", "end")

        overview.append("text")
            .attr("class", "changing")
            .text("Avg. Electoral Votes")
            .attr("y", 45)
            .attr("x", 525)
            .style("font-family", "sf-mono")
            .style("font-size", 12)
            .style("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", 500)

        overview.append("text").attr("class", "changing")
            .text(simulations == 0 ? '' : nf(gopEvAvg))
            .attr("x", 620)
            .attr("y", 45)
            .attr("font-family", "sf-mono")
            .style("font-weight", "500")
            .attr("font-size", "15")
            .attr("fill", colors[0])
            .attr("text-anchor", "start")


        overview.append("text").attr("class", "changing")
            .text(simulations == 0 ? '' : nf(538 - gopEvAvg))
            .attr("x", 430)
            .attr("y", 45)
            .attr("font-family", "sf-mono")
            .style("font-weight", "500")
            .attr("font-size", "15")
            .attr("fill", colors[1])
            .attr("text-anchor", "end")


        overviewPhone.append("text")
            .attr("class", "changing")
            .text("Avg. Electoral Votes")
            .attr("y", 125)
            .attr("x", 525)
            .style("font-family", "sf-mono")
            .style("font-size", 25)
            .style("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", 500)

        overviewPhone.append("text").attr("class", "changing")
            .text(simulations == 0 ? '' : nf(gopEvAvg))
            .attr("x", 700)
            .attr("y", 125)
            .attr("font-family", "sf-mono")
            .style("font-weight", "500")
            .attr("font-size", "25")
            .attr("fill", colors[0])
            .attr("text-anchor", "start")


        overviewPhone.append("text").attr("class", "changing")
            .text(simulations == 0 ? '' : nf(538 - gopEvAvg))
            .attr("x", 350)
            .attr("y", 125)
            .attr("font-family", "sf-mono")
            .style("font-weight", "500")
            .attr("font-size", "25")
            .attr("fill", colors[1])
            .attr("text-anchor", "end")


        overview.append("text").attr("class", "changing")
            .text(simulations == 0 ? 'ツ' : nf(100 - states[states.length - 1].win) + "%")
            .attr("x", 200)
            .attr("y", 0)
            .attr("font-family", "sf-mono")
            .style("font-weight", "100")
            .attr("font-size", "25")
            .attr("fill", colors[1])
            .attr("text-anchor", "start")

        overviewPhone.append("text").attr("class", "changing")
            .text(simulations == 0 ? 'ツ' : nf(100 - states[states.length - 1].win) + "%")
            .attr("x", 255)
            .attr("y", 0)
            .attr("font-family", "sf-mono")
            .style("font-weight", "100")
            .attr("font-size", "30")
            .attr("fill", colors[1])
            .attr("text-anchor", "start")

        overview.append("text").attr("class", "changing")
            .text("Joseph Biden")
            .attr("x", 200)
            .attr("y", -30)
            .style("font-family", "sf-mono")
            .style("font-weight", "100")
            .attr("font-size", "15")
            .attr("fill", "black")
            .attr("text-anchor", "start")

        overviewPhone.append("text").attr("class", "changing")
            .text("Joseph Biden")
            .attr("x", 255)
            .attr("y", -30)
            .style("font-family", "sf-mono")
            .style("font-weight", "100")
            .attr("font-size", "20")
            .attr("fill", "black")
            .attr("text-anchor", "start")

        overview.append("image").attr("class", "changing")
            .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
            .attr("x", 875)
            .attr("y", -40)
            .attr("width", 75)
            .attr("height", 75)

        overviewPhone.append("image").attr("class", "changing")
            .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
            .attr("x", 800)
            .attr("y", -40)
            .attr("width", 150)
            .attr("height", 150)

        overview.append("image").attr("class", "changing")
            .attr("xlink:href", d => "https://jhkforecasts.com/Biden-01.png")
            .attr("x", 100)
            .attr("y", -40)
            .attr("width", 75)
            .attr("height", 75)

        overviewPhone.append("image").attr("class", "changing")
            .attr("xlink:href", d => "https://jhkforecasts.com/Biden-01.png")
            .attr("x", 100)
            .attr("y", -40)
            .attr("width", 150)
            .attr("height", 150)

        overview.append("text")
            .attr("class", "changing")
            .text("Click Here to restart")
            .attr("y", -39)
            .attr("x", 525)
            .style("font-family", "sf-mono")
            .style("font-size", 15)
            .style("fill", "dodgerblue")
            .style("text-decoration", "underline")
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")
            .style("font-weight", 500)
            .attr("cursor", "pointer")
            .on("click", d => {
                states = map_labels.map((d, i) => {
                    return {
                        state: d.state,
                        change: "none",
                        label: d.label,
                        xv: d.xValue,
                        yv: d.yValue,
                        original: data.filter(d => d[map_labels[i].label] =="REP").length * 100 / 20000
                    }
                })
                update(states, "yes")
            })

        overviewPhone.append("text")
            .attr("class", "changing")
            .text("Click Here to restart")
            .attr("y", -10)
            .attr("x", 525)
            .style("font-family", "sf-mono")
            .style("font-size", 20)
            .style("fill", "dodgerblue")
            .style("text-decoration", "underline")
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")
            .style("font-weight", 500)
            .attr("cursor", "pointer")
            .on("click", d => {
                states = map_labels.map((d, i) => {
                    return {
                        state: d.state,
                        change: "none",
                        label: d.label,
                        xv: d.xValue,
                        yv: d.yValue,
                        original: data.filter(d => d[map_labels[i].label] =="REP").length * 100 / 20000
                    }
                })
                update(states, "yes")
            })

        var pct = [60, 70, 80, 90, 100]

        var bubblemap = map.append("g")
            .attr("transform", "translate(230,-50)")

        bubblemap.selectAll("key")
            .data(pct)
            .enter()
            .append("circle").attr("class", "mapLegend changing")
            .attr("r", 20)
            .attr("cy", (d, i) => 300)
            .attr("cx", (d, i) => 610 + i * 20)
            .attr("fill", d => color(d))

        bubblemap
            .append("rect").attr("class", "mapLegend changing")
            .attr("stroke", "black")
            .attr("ry", 3)
            .attr("y", (d, i) => 247)
            .attr("x", (d, i) => 602 + i * 20)
            .attr("width", 16)
            .attr("height", 16)
            .attr("fill", "none")

        bubblemap
            .append("text")
            .text("Changed").attr("class", "mapLegend changing")
            .attr("y", 255)
            .attr("x", (d, i) => 625)
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .attr("font-size", 10)
            .style("font-weight", "100")
            .style("dominant-baseline", "central")


        bubblemap.selectAll("key")
            .data(pct)
            .enter()
            .append("circle").attr("class", "mapLegend changing")
            .attr("r", 20)
            .attr("cy", (d, i) => 350)
            .attr("cx", (d, i) => 610 + i * 20)
            .attr("fill", d => color(100 - d))

        bubblemap.selectAll("key")
            .data(pct)
            .enter()
            .append("text").attr("class", "mapLegend changing")
            .text(d => d)
            .attr("y", 300)
            .attr("x", (d, i) => 592 + i * 20)
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .attr("font-size", 10)
            .style("font-weight", "100")
            .style("dominant-baseline", "central")


        bubblemap
            .append("text").attr("class", "mapLegend changing")
            .text("Trump")
            .attr("y", 300)
            .attr("x", (d, i) => 585 + i * 20)
            .attr("fill", "black")
            .attr("text-anchor", "end")
            .attr("font-size", 10)
            .style("font-weight", "100")
            .style("dominant-baseline", "central")

        bubblemap
            .append("text").attr("class", "mapLegend changing")
            .text("Biden")
            .attr("y", 350)
            .attr("x", (d, i) => 585 + i * 20)
            .attr("fill", "black")
            .attr("text-anchor", "end")
            .attr("font-size", 10)
            .style("font-weight", "100")
            .style("dominant-baseline", "central")


        bubblemap.selectAll("key")
            .data(pct)
            .enter()
            .append("text").attr("class", "mapLegend changing")
            .text(d => d)
            .attr("y", 350)
            .attr("x", (d, i) => 590 + i * 20)
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .attr("font-size", 10)
            .style("font-weight", "100")
            .style("dominant-baseline", "central")


        bubblemap.append("text").attr("class", "mapLegend changing")
            .text("Win State")
            .attr("y", 230)
            .attr("x", 650)
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("font-size", 15)
            .style("font-weight", "100")


        var statebars = states.slice(0, states.length - 1)
        console.log(statebars)
        statebars.sort((a, b) => Math.abs(50 - a.win) - Math.abs(50 - b.win))
        statebars.sort((a, b) => b.changeValue - a.changeValue)
        sbs.selectAll("at")
            .data(statebars)
            .enter()
            .append("text").attr("class", "changing")
            .text(d => d.label)
            .attr("x", (d, i) => 20)
            .attr("y", (d, i) => i * 40 + 60)
            .style("font-weight", d => d.change == "none" ? 100 : 500)
            .attr("font-size", "20")
            .attr("fill", d => d.change =="REP" ? colors[0] : d.change == "DEM" ? colors[1] : "black")
            .attr("text-anchor", "middle")
            .attr("cursor", "pointer")
            .attr("dominant-baseline", "central")
            .on("click", function (d, i) {
                d.change == "none" ?
                    (states[Stateslabels.indexOf(d.state)].change ="REP") &&
                    (update(states)) :
                    d.change =="REP" ?
                        (states[Stateslabels.indexOf(d.state)].change = "DEM") &&
                        update(states) :
                        d.change == "DEM" ?
                            (states[Stateslabels.indexOf(d.state)].change = "none") &&
                            update(states) : (states[Stateslabels.indexOf(d.state)].change = "none") &&
                            update(states)
            });

        sbsPhone.selectAll("at")
            .data(statebars)
            .enter()
            .append("text").attr("class", "changing")
            .text(d => d.state == "District of Columbia" ? "DC" : d.state)
            .attr("x", (d, i) => 20)
            .attr("y", (d, i) => i * 60 + 80)
            .style("font-weight", d => d.change == "none" ? 100 : 500)
            .attr("font-size", "30")
            .attr("fill", d => d.change =="REP" ? colors[0] : d.change == "DEM" ? colors[1] : "black")
            .attr("text-anchor", "start")
            .attr("cursor", "pointer")
            .attr("dominant-baseline", "central")
            .on("click", function (d, i) {
                d.change == "none" ?
                    (states[Stateslabels.indexOf(d.state)].change ="REP") &&
                    (update(states)) :
                    d.change =="REP" ?
                        (states[Stateslabels.indexOf(d.state)].change = "DEM") &&
                        update(states) :
                        d.change == "DEM" ?
                            (states[Stateslabels.indexOf(d.state)].change = "none") &&
                            update(states) : (states[Stateslabels.indexOf(d.state)].change = "none") &&
                            update(states)
            });

        sbs.selectAll("at")
            .data(statebars)
            .enter()
            .append("rect").attr("class", "changing")
            .attr("x", (d, i) => 60)
            .attr("y", (d, i) => i * 40 + 45)
            .attr("height", "30")
            .attr("width", "80")
            .attr("fill", d => color(d.original))

        sbsPhone.selectAll("at")
            .data(statebars)
            .enter()
            .append("rect").attr("class", "changing")
            .attr("x", (d, i) => 400)
            .attr("y", (d, i) => i * 60 + 55)
            .attr("height", "50")
            .attr("width", "200")
            .attr("fill", d => color(d.original))


        sbsPhone.selectAll("at")
            .data(statebars)
            .enter()
            .append("rect").attr("class", "changing")
            .attr("x", (d, i) => 710)
            .attr("y", (d, i) => i * 60 + 55)
            .attr("height", "50")
            .attr("width", "200")
            .style("fill", d => reset == "yes" ? "none" : simNum == 1 ? "white" : simulationsPrev == 0 ? "white" : color(d.prev))
            .transition()
            .duration(500)
            .style("fill", d => reset == "yes" ? "none" : simulations == 0 ? "none" : color(d.win))

        sbs.selectAll("at")
            .data(statebars)
            .enter()
            .append("rect").attr("class", "changing")
            .attr("x", (d, i) => 160)
            .attr("y", (d, i) => i * 40 + 45)
            .attr("height", "30")
            .attr("width", "80")
            .style("fill", d => reset == "yes" ? "none" : simNum == 1 ? "white" : simulationsPrev == 0 ? "white" : color(d.prev))
            .transition()
            .duration(500)
            .style("fill", d => reset == "yes" ? "none" : simulations == 0 ? "none" : color(d.win))

        sbs.selectAll("at")
            .data(statebars)
            .enter()
            .append("text").attr("class", "changing")
            .text(d => (d.original > 50 ? wf(d.original) : wf(100 - d.original)) + "%")
            .attr("x", (d, i) => 100)
            .attr("y", (d, i) => i * 40 + 60)
            .style("font-weight", 500)
            .attr("font-size", "15")
            .attr("fill", d => Math.abs(50 - d.original) > 20 ? "white" : 'Black')
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")


        sbsPhone.selectAll("at")
            .data(statebars)
            .enter()
            .append("text").attr("class", "changing")
            .text(d => (d.original > 50 ? wf(d.original) : wf(100 - d.original)) + "%")
            .attr("x", (d, i) => 500)
            .attr("y", (d, i) => i * 60 + 80)
            .style("font-weight", 500)
            .attr("font-size", "25")
            .attr("fill", d => Math.abs(50 - d.original) > 20 ? "white" : 'Black')
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            

            sbsPhone.selectAll("at")
            .data(statebars)
            .enter()
            .append("text").attr("class", "changing")
            .text(d => reset == "yes" ? "" : simulations == 0 ? "" : (d.win > 50 ? wf(d.win) : wf(100 - d.win)) + "%")
            .attr("x", (d, i) => 810)
            .attr("y", (d, i) => i * 60 + 80)
            .style("font-weight", 500)
            .attr("font-size", "25")
            .attr("fill", d => Math.abs(50 - d.win) > 20 ? "white" : 'Black')
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")

        sbs.selectAll("at")
            .data(statebars)
            .enter()
            .append("text").attr("class", "changing")
            .text(d => reset == "yes" ? "" : simulations == 0 ? "" : (d.win > 50 ? wf(d.win) : wf(100 - d.win)) + "%")
            .attr("x", (d, i) => 200)
            .attr("y", (d, i) => i * 40 + 60)
            .style("font-weight", 500)
            .attr("font-size", "15")
            .attr("fill", d => Math.abs(50 - d.win) > 20 ? "white" : 'Black')
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")

        sbs.append("text").attr("class", "changing")
            .text("Updated")
            .attr("x", (d, i) => 200)
            .attr("y", (d, i) => i * 40 + 20)
            .style("font-weight", 500)
            .attr("font-size", "15")
            .attr("fill", 'Black')
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")

        sbs.append("text").attr("class", "changing")
            .text("Forecasted")
            .attr("x", (d, i) => 100)
            .attr("y", (d, i) => i * 40 + 20)
            .style("font-weight", 500)
            .attr("font-size", "15")
            .attr("fill", 'Black')
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")


            sbsPhone.append("text").attr("class", "changing")
            .text("Updated")
            .attr("x", (d, i) => 810)
            .attr("y", (d, i) => i * 40 + 20)
            .style("font-weight", 500)
            .attr("font-size", "25")
            .attr("fill", 'Black')
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")

        sbsPhone.append("text").attr("class", "changing")
            .text("Forecasted")
            .attr("x", (d, i) => 500)
            .attr("y", (d, i) => i * 40 + 20)
            .style("font-weight", 500)
            .attr("font-size", "25")
            .attr("fill", 'Black')
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")

        simulations < 20 ?
            d3.selectAll(".mapLegend").remove() &&
            map.append("text")
                .attr("class", "changing")
                .text("Oops, This happens less than")
                .attr("y", 330)
                .attr("x", 960)
                .style("font-family", "sf-mono")
                .style("font-size", 13)
                .style("fill", "black")
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "end")
                .style("font-weight", 500)
            &&
            map.append("text")
                .attr("class", "changing")
                .text(".1% of the time")
                .attr("y", 350)
                .attr("x", 960)
                .style("font-family", "sf-mono")
                .style("font-size", 13)
                .style("fill", "black")
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "end")
                .style("font-weight", 500)
            &&
            map.append("text")
                .attr("class", "changing")
                .text("Click Here to restart")
                .attr("y", 370)
                .attr("x", 960)
                .style("font-family", "sf-mono")
                .style("font-size", 15)
                .style("fill", "dodgerblue")
                .style("text-decoration", "underline")
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "end")
                .style("font-weight", 500)
                .attr("cursor", "pointer")
                .on("click", d => {
                    states = map_labels.map((d, i) => {
                        return {
                            state: d.state,
                            change: "none",
                            label: d.label,
                            xv: d.xValue,
                            yv: d.yValue,
                            original: data.filter(d => d[map_labels[i].label] =="REP").length * 100 / 20000
                        }
                    })
                    update(states, "yes")
                })
            : "";

        simulationsPrev = simulations


    }
    var testButton = d3.select("#testbutton")
        .on("click", d => {
        })
}