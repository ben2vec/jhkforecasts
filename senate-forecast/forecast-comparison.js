var map = d3.select("#usmap")
    .append("svg")
    .attr("viewBox", '60 -40 900 500')

d3.select('#congress').append("h1")
    .text("How they stack up")
    .style("font-weight", 700)
    .style("font-size", "3.5vw")

d3.select('#dataTable').append("h1")
    .text("Ratings Table")
    .style("font-weight", 700)
    .style("font-size", "3.5vw")
var congress = d3.select('#congress').append("svg")
    .attr("viewBox", "0 0 1200 700")
    .append("g")
    .attr("transform", "translate(" + 600 + "," + 350 + ")");
var forecasters = [
    {
        "forecaster": "JHK Forecasts",
        "type": "",
        "shorthand": "jhk",
        "link": "https://projects.jhkforecasts.com/senate-forecast/"
        
    },
    {
        "forecaster": "Bitecofer",
        "type": "newcomer",
        "shorthand": "bitecofer",
        "link": "https://www.niskanencenter.org/negative-partisanship-and-the-2020-congressional-elections/"
    },
    {
        "forecaster": "CNalysis",
        "type": "newcomer",
        "shorthand": "cnalysis",
        "link": "https://www.cnalysiscom.website/forecasts/2020-president-governor-senate-house-ratings"
    },
    {
        "forecaster": "Cook Political Report",
        "type": "expert",
        "shorthand": "cook",
        "link": "https://www.cookpolitical.com/index.php/ratings/senate-race-ratings"
    },
    {
        "forecaster": "Inside Elections",
        "type": "expert",
        "shorthand": "inside",
        "link": "https://insideelections.com/ratings/senate"
    },
    {
        "forecaster": "Politico",
        "type": "expert",
        "shorthand": "politico",
        "link": "https://www.politico.com/2020-election/race-forecasts-and-predictions/senate/"
    },
    {
        "forecaster": "Lean Tossup",
        "type": "newcomer",
        "shorthand": "leanTossup",
        "link": "https://leantossup.ca/us-house/"
    },
    {
        "forecaster": "Sabato's Crystal Ball",
        "type": "expert",
        "shorthand": "sabato",
        "link": "http://centerforpolitics.org/crystalball/2020-senate/"
    }
]
var tformat = d3.timeFormat("%m/%d/%Y")
var timeformat = d3.timeFormat("%m/%d/%y")
var dateparse = d3.timeParse("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
var nf = d3.format(".1f")
var wf = d3.format(".0f")
var updated_format = d3.timeFormat("%b. %d %Y %I:%M %p")
var widthmap = 1020
var heightmap = 500;
var bubble_info = [{ "state": "Alabama", "abbrev": "AL", "radius": 16.43, "x": 413, "y": 332 }, { "state": "Alaska", "abbrev": "AK", "radius": 9.49, "x": 41, "y": 19 }, { "state": "Arizona", "abbrev": "AZ", "radius": 18.17, "x": 172, "y": 282 }, { "state": "Arkansas", "abbrev": "AR", "radius": 13.42, "x": 325, "y": 290 }, { "state": "California", "abbrev": "CA", "radius": 40.62, "x": 103, "y": 237 }, { "state": "Colorado", "abbrev": "CO", "radius": 16.43, "x": 224, "y": 249 }, { "state": "Connecticut", "abbrev": "CT", "radius": 14.49, "x": 586, "y": 128 }, { "state": "Delaware", "abbrev": "DE", "radius": 9.49, "x": 557, "y": 183 }, { "state": "District of Columbia", "abbrev": "DC", "radius": 9.49, "x": 536, "y": 193 }, { "state": "Florida", "abbrev": "FL", "radius": 29.5, "x": 483, "y": 380 }, { "state": "Georgia", "abbrev": "GA", "radius": 21.91, "x": 443, "y": 298 }, { "state": "Hawaii", "abbrev": "HI", "radius": 10.95, "x": 88, "y": 372 }, { "state": "Idaho", "abbrev": "ID", "radius": 10.95, "x": 188, "y": 173 }, { "state": "Illinois", "abbrev": "IL", "radius": 24.49, "x": 359, "y": 207 }, { "state": "Indiana", "abbrev": "IN", "radius": 18.17, "x": 413, "y": 207 }, { "state": "Iowa", "abbrev": "IA", "radius": 13.42, "x": 306, "y": 195 }, { "state": "Kansas", "abbrev": "KS", "radius": 13.42, "x": 266, "y": 248 }, { "state": "Kentucky", "abbrev": "KY", "radius": 15.49, "x": 411, "y": 251 }, { "state": "Louisiana", "abbrev": "LA", "radius": 15.49, "x": 326, "y": 335 }, { "state": "Maine", "abbrev": "ME", "radius": 7.75, "x": 628, "y": 26 }, { "state": "Maryland", "abbrev": "MD", "radius": 17.32, "x": 505, "y": 185 }, { "state": "Massachusetts", "abbrev": "MA", "radius": 18.17, "x": 607, "y": 89 }, { "state": "Michigan", "abbrev": "MI", "radius": 21.91, "x": 418, "y": 149 }, { "state": "Minnesota", "abbrev": "MN", "radius": 17.32, "x": 304, "y": 142 }, { "state": "Mississippi", "abbrev": "MS", "radius": 13.42, "x": 373, "y": 324 }, { "state": "Missouri", "abbrev": "MO", "radius": 17.32, "x": 329, "y": 251 }, { "state": "Montana", "abbrev": "MT", "radius": 9.49, "x": 206, "y": 131 }, { "state": "Nebraska", "abbrev": "NE", "radius": 7.75, "x": 258, "y": 209 }, { "state": "Nevada", "abbrev": "NV", "radius": 13.42, "x": 167, "y": 220 }, { "state": "New Hampshire", "abbrev": "NH", "radius": 10.95, "x": 612, "y": 54 }, { "state": "New Jersey", "abbrev": "NJ", "radius": 20.49, "x": 551, "y": 147 }, { "state": "New Mexico", "abbrev": "NM", "radius": 12.25, "x": 215, "y": 303 }, { "state": "New York", "abbrev": "NY", "radius": 29.5, "x": 548, "y": 81 }, { "state": "North Carolina", "abbrev": "NC", "radius": 21.21, "x": 499, "y": 278 }, { "state": "North Dakota", "abbrev": "ND", "radius": 9.49, "x": 257, "y": 136 }, { "state": "Ohio", "abbrev": "OH", "radius": 23.24, "x": 459, "y": 191 }, { "state": "Oklahoma", "abbrev": "OK", "radius": 14.49, "x": 270, "y": 294 }, { "state": "Oregon", "abbrev": "OR", "radius": 14.49, "x": 124, "y": 176 }, { "state": "Pennsylvania", "abbrev": "PA", "radius": 24.49, "x": 498, "y": 132 }, { "state": "Rhode Island", "abbrev": "RI", "radius": 10.95, "x": 619, "y": 126 }, { "state": "South Carolina", "abbrev": "SC", "radius": 16.43, "x": 487, "y": 322 }, { "state": "South Dakota", "abbrev": "SD", "radius": 9.49, "x": 257, "y": 167 }, { "state": "Tennessee", "abbrev": "TN", "radius": 18.17, "x": 379, "y": 284 }, { "state": "Texas", "abbrev": "TX", "radius": 33.76, "x": 271, "y": 355 }, { "state": "Utah", "abbrev": "UT", "radius": 13.42, "x": 204, "y": 218 }, { "state": "Vermont", "abbrev": "VT", "radius": 9.49, "x": 585, "y": 47 }, { "state": "Virginia", "abbrev": "VA", "radius": 19.75, "x": 508, "y": 229 }, { "state": "Washington", "abbrev": "WA", "radius": 18.97, "x": 154, "y": 131 }, { "state": "West Virginia", "abbrev": "WV", "radius": 12.25, "x": 451, "y": 242 }, { "state": "Wisconsin", "abbrev": "WI", "radius": 17.32, "x": 359, "y": 146 }, { "state": "Wyoming", "abbrev": "WY", "radius": 9.49, "x": 214, "y": 177 }, { "state": "Maine-1", "abbrev": 1, "radius": 5.48, "x": 612, "y": 26 }, { "state": "Maine-2", "abbrev": 2, "radius": 5.48, "x": 644, "y": 26 }, { "state": "Nebraska-1", "abbrev": 1, "radius": 5.48, "x": 242, "y": 209 }, { "state": "Nebraska-2", "abbrev": 2, "radius": 5.48, "x": 258, "y": 193 }, { "state": "Nebraska-3", "abbrev": 3, "radius": 5.48, "x": 274, "y": 209 }]
var map_states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934 }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400 }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801 }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387 }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 253.9219, demseats: 2 }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 245.5645 }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000, demseats: 2 }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000, demseats: 2 }, { "state": "District of Columbia", "label": "DC", "xValue": -1000, "yValue": -1000 }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154, demseats: 0 }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354 }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465, demseats: 2 }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155 }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 231.2954 }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 228.4214, demseats: 0 }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 202.6782 }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 259.1592 }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 264.9658 }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135 }, { "state": "Maine", "label": "ME", "xValue": 810.3105, "yValue": 109.855 }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000, demseats: 2 }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000 }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647 }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874 }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514 }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 261.123, demseats: 0 }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705 }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527 }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957, demseats: 2 }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000 }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210 }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035 }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 163.2588, demseats: 2 }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 284.5029 }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 117.3823, demseats: 0 }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 219.4883, demseats: 1 }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418 }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654 }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 200.856, demseats: 1 }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000 }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 315.6387 }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 163.5166 }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 295.8193 }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 374.2861 }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 234.978, demseats: 0 }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000, demseats: 2 }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 252.7842 }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762, demseats: 2 }, { "state": "West Virginia", "label": "WV", "xValue": 703, "yValue": 243 }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588, demseats: 1 }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 179.6255 }]
var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"]);
var ratingScale = [
    { rating: "Solid D", color: color(-5), ratingNum: 0, opacity: 1 },
    { rating: "Likely D", color: color(15), ratingNum: 10, opacity: 1 },
    { rating: "Lean D", color: color(30), ratingNum: 25, opacity: 1 },
    { rating: "Tilt D", color: color(45), ratingNum: 40, opacity: 1 },
    { rating: "Tossup", color: "white", ratingNum: 50, opacity: 1 },
    { rating: "Tilt R", color: color(55), ratingNum: 60, opacity: 1 },
    { rating: "Lean R", color: color(70), ratingNum: 75, opacity: 3 },
    { rating: "Likely R", color: color(85), ratingNum: 90, opacity: 7 },
    { rating: "Solid R", color: color(105), ratingNum: 100, opacity: 1 },
]
var ratingTypes = ratingScale.map(d => { return d.rating })
var rVs = ratingScale.map(d => { return d.ratingNum })
var rCs = ratingScale.map(d => { return d.color })
d3.csv("https://data.jhkforecasts.com/2020-senate-input.csv", data => {
    var data = data.map((d, i) => {
        return {
            state: d.state,
            stateIndex: d.state_index,
            incumbentParty: d.inc_party,
            pvi: +d.pvi,
            bitecofer: d.bitecofer,
            cnalysis: d.cnalysis,
            cook: d.cook,
            inside: d.inside,
            politico: d.politico,
            sabato: d.sabato
        }
    })

    d3.csv("https://data.jhkforecasts.com/2020-senate.csv", jhk => {
        d3.csv("https://raw.githubusercontent.com/robby500/US_Model_Data/master/Sen_LT_Data.csv", leanTossup => {
            var lS = leanTossup.map(d => { return d.state })
            d3.csv("https://data.jhkforecasts.com/senate-candidates.csv", cands => {
                var today = jhk.slice(jhk.length - cands.length - 2, jhk.length)
                data.forEach((d, i) => {
                    var state = d.state
                    var stateIndex = d.stateIndex
                    var stateData = today.filter(d => d.state_index == stateIndex)
                    d.jhk = d3.sum(stateData.filter(d => d.party == "REP"), d => d.win)
                    d.leanTossup = +leanTossup[lS.indexOf(state)].gop_win
                })
                data[34].state = "Georgia Special"
                var states = data.map(d => {
                    return {
                        state: d.state,
                        state_index: d.state_index
                    }
                })
                var forecastRatings = []
                forecasters.forEach(id => {
                    var forecastID = id.shorthand
                    data.forEach((d, i) => {
                        var rating = d[forecastID]
                        var state = d.state
                        var stateIndex = d.stateIndex
                        var ratingValue = typeof rating == "number" ? rating : ratingScale[ratingTypes.indexOf(rating)].ratingNum
                        forecastRatings.push({ forecast: forecastID, state: state, stateData: stateIndex, rating: rating, ratingValue: ratingValue })
                    })

                })
                forecasters.forEach(d => {
                    var shorthand = d.shorthand
                    d.ratings = forecastRatings.filter(d => d.forecast == shorthand)
                })
                forecasters.forEach((d, i) => {
                    d.forecastIndex = i + 1
                    d.repSeats = d.ratings.filter(d => d.ratingValue > 55).length + 30
                    d.demSeats = d.ratings.filter(d => d.ratingValue < 45).length + 35
                })
                var selectBox1 = d3.select("#selectBox1")
                var widthmap = 1020
                var heightmap = 500;
                var projection = d3.geoAlbersUsa()
                    .translate([widthmap / 2, heightmap / 2])
                    .scale([900]);
                var path = d3.geoPath()
                    .projection(projection);
                var tool_tipPhone = d3.tip()
                    .attr("class", "d3-tip")
                    .offset([-200, -150])
                    .html("<div id='tipDiv'></div>");
                map.call(tool_tipPhone);
                d3.json("https://projects.jhkforecasts.com/presidential-forecast/us.json", json => {



                    update("jhk")
                    function update(forecaster) {
                        console.log(forecaster)
                        var forecastData = forecasters.filter(d => d.shorthand == forecaster)[0]
                        var mapData = topojson.feature(json, json.objects.states).features
                        console.log(forecastData)
                        mapData.forEach((d, i) => {
                            var state = d.properties.name
                            var stateData = forecastData.ratings.filter(d => d.state == state)
                            d.properties.ratingValue = stateData.length == 0 ? "n/a" : stateData[0].ratingValue
                            d.properties.election = stateData.length == 0 ? "no" : "yes"
                            d.properties.abbrev = map_labels.filter(d => d.state == state).length == 0 ? "" : map_labels.filter(d => d.state == state)[0].label
                            d.properties.cx = map_labels.filter(d => d.state == state).length == 0 ? "" : map_labels.filter(d => d.state == state)[0].xValue
                            d.properties.cy = map_labels.filter(d => d.state == state).length == 0 ? "" : map_labels.filter(d => d.state == state)[0].yValue
                            d.properties.rating = stateData.length == 0 ? "" : stateData[0].rating
                        })
                        console.log(mapData)

                        map.append("rect")
                            .attr("x", 75)
                            .attr("y", 0)
                            .attr("width", 900)
                            .attr("height", 450)
                            .attr("fill", "white")

                        map.append("image")
                            .attr("href", "https://jhkforecasts.com/elephant-01.png")
                            .attr("x", 870)
                            .attr("y", -30)
                            .attr("width", 80)
                            .attr("height", 80)

                        map.append("image")
                            .attr("href", "https://jhkforecasts.com/donkey-01.png")
                            .attr("x", 70)
                            .attr("y", -30)
                            .attr("width", 80)
                            .attr("height", 80)

                        map.append("text")
                            .text("Republicans")
                            .attr("x", 860)
                            .attr("y", -10)
                            .attr("text-anchor", "end")
                            .attr("font-size", 25)

                        map.append("text")
                            .text("Democrats")
                            .attr("x", 160)
                            .attr("y", -10)
                            .attr("text-anchor", "start")
                            .attr("font-size", 25)

                        map.append("text")
                            .text(forecastData.demSeats)
                            .attr("x", 160)
                            .attr("y", 20)
                            .attr("text-anchor", "start")
                            .attr("font-size", 25)
                            .attr("fill", color(0))

                        map.append("text")
                            .text(forecastData.repSeats)
                            .attr("x", 860)
                            .attr("y", 20)
                            .attr("text-anchor", "end")
                            .attr("font-size", 25)
                            .attr("fill", color(100))

                        map.append("text")
                            .text("Seats")
                            .attr("x", 510)
                            .attr("y", 20)
                            .attr("text-anchor", "middle")
                            .attr("font-size", 25)
                            .attr("fill", "Black")


                        map.selectAll("rt")
                            .data(mapData)
                            .enter()
                            .append("path")
                            .attr("class", "states")
                            .attr("d", path)
                            .style("stroke", "white")
                            .style("stroke-width", ".8")
                            .attr("fill", d => d.properties.election == "no" ? "lightgrey" : color(d.properties.ratingValue))


                        map.selectAll("s")
                            .data(mapData)
                            .enter()
                            .append("text")
                            .text(d => d.properties.abbrev)
                            .attr("x", d => d.properties.cx)
                            .attr("y", d => d.properties.cy - 5)
                            .style("font-family", "sf-mono")
                            .attr("dominant-baseline", "central")
                            .attr("text-anchor", "middle")
                            .attr("font-size", 10)
                            .attr("fill", d => d.properties.election == "no" ? "white" : "black")

                        map.selectAll("s")
                            .data(mapData)
                            .enter()
                            .append("path")
                            .attr("class", "statesover")
                            .attr("d", path)
                            .style("stroke", d => Math.abs(50 - d.properties.rating) < 10 ? "black" : "none")
                            .style("stroke-width", "1")
                            .style("fill", "none")
                            .on('mouseover', function (d) {


                                d.properties.rating == "" ? tool_tipPhone.hide() : tool_tipPhone.offset([-150, -75]).show()
                                var tipSVG = d3.select("#tipDiv")
                                    .append("svg")
                                    .attr("width", 150)
                                    .attr("height", 150)

                                tipSVG.append("rect")
                                    .attr("y", 1.5)
                                    .attr("x", 1.5)
                                    .attr("width", 147)
                                    .attr("height", 147)
                                    .attr("rx", 8)
                                    .attr("fill", "white")
                                    .attr("stroke", "black")
                                    .attr("stroke-width", 2)

                                tipSVG.append("text")
                                    .text(d.properties.name)
                                    .attr("y", 25)
                                    .attr("x", 75)
                                    .attr("fill", "black")
                                    .attr("font-weight", "700")
                                    .style("font-size", "20")
                                    .attr("text-anchor", "middle")


                                tipSVG.append("image")
                                    .attr("href", d.properties.ratingValue == 50 ? "https://jhkforecasts.com/No%20one-01.png" : d.properties.ratingValue > 50 ? "https://jhkforecasts.com/elephant-01.png" : "https://jhkforecasts.com/donkey-01.png")
                                    .attr("y", 35)
                                    .attr("x", 40)
                                    .attr("width", 70)
                                    .attr("height", 70)



                                tipSVG.append("text")
                                    .text(typeof d.properties.rating == "number" ? "Win" : "Rating")
                                    .attr("y", 115)
                                    .attr("x", 75)
                                    .attr("fill", "black")
                                    .attr("font-weight", "500")
                                    .style("font-size", "18")
                                    .attr("text-anchor", "middle")


                                tipSVG.append("text")
                                    .text(typeof d.properties.rating == "number" ? wf(d.properties.rating) : d.properties.rating)
                                    .attr("y", 140)
                                    .attr("x", 75)
                                    .attr("fill", d.properties.ratingValue == 50 ? "black" : d.properties.ratingValue > 50 ? color(100) : color(0))
                                    .attr("font-weight", "500")
                                    .style("font-size", "18")
                                    .attr("text-anchor", "middle")

                            })
                            .on('mouseout',
                                function (d) {


                                    tool_tipPhone.hide()
                                });

                    }

                    var selectbox1 = d3.select("#forecastSelect")
                        .on("change", function () {
                            update(this.value)
                        })


                    forecasters.sort((a, b) => a.repSeats - b.repSeats)
                    forecasters.sort((a, b) => b.demSeats - a.demSeats)

                    forecasters.forEach((id, jid) => {
                        var forecast = id.shorthand
                        var dem_seats = [{ state: "DEM", state_index: "", abbrev: "", win: 0, seats: 35 }]
                        var rep_seats = [{ state: "REP", state_index: "", abbrev: "", win: 100, seats: 30 }]
                        var seats = []
                        var elSeats = []
                        states.forEach((d, i) => {
                            var state = d.state
                            var abbrev = d.label
                            var state_index = d.state_index
                            var win = d3.sum(forecastRatings.filter(d => d.state == state && d.forecast == forecast), d => d.ratingValue)
                            var ps = {
                                state: state,
                                state_index: state_index,
                                abbrev: abbrev,
                                win: win,
                                seats: 1
                            }
                            elSeats.push(ps)
                        })
                        elSeats.sort((a, b) => a.win - b.win)
                        console.log(elSeats)
                        seats.push(dem_seats)
                        seats.push(elSeats)
                        seats.push(rep_seats)
                        var seats = seats.flat()

                        console.log(seats)

                        var arc = d3.arc()
                            .outerRadius(130 + jid * 30)
                            .innerRadius(100 + jid * 30)
                            ;

                        var pie = d3.pie()
                            .sort(null)
                            .value(function (d) {
                                return d.seats;
                            })
                            .startAngle(-Math.PI)


                        var arcTWO = d3.arc()
                            .outerRadius(130 + jid * 30)
                            .innerRadius(100 + jid * 30)
                            ;

                        var pieTWO = d3.pie()
                            .sort(null)
                            .value(1)
                            .startAngle(2.5)
                            .endAngle((Math.PI - 2.5) + Math.PI);



                        congress.selectAll(".arc")
                            .data(pie(seats))
                            .enter().append("path")
                            .attr("d", arc)
                            .style("fill", d => color(d.data.win))
                            .attr("stroke", "white");

                        congress.selectAll(".arc")
                            .data(pieTWO(tformat))
                            .enter().append("path")
                            .attr("d", arcTWO)
                            .style("fill", "white")
                            .attr("stroke", "black");

                       
                        
                    })

                    congress.selectAll("p")
                        .data(forecasters)
                        .enter()
                        .append("text")
                        .text(d => d.forecaster)
                        .attr("x", 0)
                        .attr("y", (d, i) => 110 + i * 30)
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "central")

                    congress.append("line")
                        .attr("x1", 0)
                        .attr("x2", 0)
                        .attr("y1", -20)
                        .attr("y2", -500)
                        .attr("stroke", "black")

                    congress.append("text")
                        .text("50-50 SPLIT")
                        .attr("y", 0)
                        .attr("x", 0)
                        .attr("fill", "black")
                        .attr("font-weight", "500")
                        .style("font-size", "18")
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "top")

                    congress.append("text")
                        .text("30 Repbulican Seats")
                        .attr("y", -120)
                        .attr("x", 400)
                        .attr("fill", "black")
                        .attr("font-weight", "500")
                        .style("font-size", "18")
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "top")
                    congress.append("text")
                        .text("not up for Re-election")
                        .attr("y", -120)
                        .attr("x", 400)
                        .attr("fill", "black")
                        .attr("font-weight", "500")
                        .style("font-size", "18")
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "top")
                        .attr("dy", "1em")

                    congress.append("text")
                        .text("35 Democrat Seats")
                        .attr("y", -120)
                        .attr("x", -400)
                        .attr("fill", "black")
                        .attr("font-weight", "500")
                        .style("font-size", "18")
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "top")
                    congress.append("text")
                        .text("not up for Re-election")
                        .attr("y", -120)
                        .attr("x", -400)
                        .attr("fill", "black")
                        .attr("font-weight", "500")
                        .style("font-size", "18")
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "top")
                        .attr("dy", "1em")

                    
                    var table = d3.select("#dataTable")
                        .append("table")
                        .style("width", "100%")
                        .append("tbody")

                    var tableHead = table.append("tr")
                        .style("border-bottom", "solid black 1px")


                    tableHead.append("th")
                        .style("width", "20%")
                        .append("h1")
                        .text("State")
                        .style("font-size", "2vw")
                        .style("padding-left", "-2vw")
                        .style("font-weight", 500)

                    table.selectAll("s")
                        .data(data)
                        .enter()
                        .append("tr")
                        .attr("id", (d, i) => "row" + i)

                    forecasters.sort((a, b) => a.forecastIndex - b.forecastIndex)
                    data.sort((a, b) => b.jhk - a.jhk)
                    data.forEach((d, i) => {
                        var rowID = "row" + i

                        d3.select("#" + rowID)
                            .append("td")
                            .append("h3")
                            .text(d.state)
                            .style("font-size", "1.7vw")
                            .style("padding-left", "3vw")
                            .style("font-weight", 500)


                    })
                    forecasters.forEach((d, i) => {
                        var forecastID = d.shorthand
                        tableHead.append("th")
                            .style("width", (80 / forecasters.length) + "%")
                            .append("a")
                            .attr("href", forecasters[i].link)
                            .attr("target", "_blank")
                            .append("h3")
                            .text(forecasters[i].forecaster)
                            .style("padding", "5px")
                            .style("font-size", "1.5vw")
                            .style("font-weight", 500)

                        data.forEach((d, i) => {
                            var rowID = "row" + i

                            d3.select("#" + rowID)
                                .append("td")
                                .style("background-color", typeof d[forecastID] == "number" ? color(d[forecastID]) : rCs[ratingTypes.indexOf(d[forecastID])])
                                .append("h3")
                                .text(typeof d[forecastID] == "number" ? wf(Math.abs(50-d[forecastID])+50) + "%" : d[forecastID].split(" ")[0])
                                .style("font-size", "1.7vw")
                                .style("text-align", "center")
                                .style("font-weight", 500)

                        })

                    })


                })
                //END JSON FUNCTION
            })
            //CSV FUCNTIONS 
        })
    })
})
