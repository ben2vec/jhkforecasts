var candidates = ["Biden", "Sanders"]
var timeparse = d3.timeParse("%m/%d/%y")
var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934 }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400 }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801 }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387 }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 253.9219 }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 245.5645 }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000 }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000 }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154 }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354 }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465 }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155 }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 231.2954 }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 228.4214 }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 202.6782 }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 259.1592 }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 264.9658 }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135 }, { "state": "Maine", "label": "ME", "xValue": 807.3105, "yValue": 109.855 }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000 }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000 }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647 }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874 }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514 }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 261.123 }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705 }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527 }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957 }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000 }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210 }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035 }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 163.2588 }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 284.5029 }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 117.3823 }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 219.4883 }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418 }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654 }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 200.856 }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000 }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 315.6387 }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 163.5166 }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 294.8193 }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 374.2861 }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 234.978 }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000 }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 252.7842 }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762 }, { "state": "West Virginia", "label": "WV", "xValue": 701, "yValue": 243 }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588 }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 179.6255 }, { "state": "District of Columbia", "label": "DC", "xValue": -1000, "yValue": -1000 }]
var timeformat = d3.timeFormat("%b. %d")
var wholeformat = d3.format(".0f")
var numberformat = d3.format(".1f")
var experts = ["cook", "bitecofer", "inside", "politico", "sabato", "jhk","cnanalysis"]
var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"]);
var gopscale = d3.scaleLinear()
    .domain([20, 80])
    .range(["white", "#FF6060"]);

var demscale = d3.scaleLinear()
    .domain([20, 80])
    .range(["white", "#0091FF"]);
var experts_colors = [
    { rating: "Solid D", color: color(0), rating_num: -3, opacity: 1 },
    { rating: "Likely D", color: color(0), rating_num: -2, opacity: .8 },
    { rating: "Lean D", color: color(0), rating_num: -1, opacity: .3 },
    { rating: "Tilt D", color: color(0), rating_num: -.5, opacity: .1 },
    { rating: "Tossup", color: "white", rating_num: 0, opacity: 1 },
    { rating: "Tilt R", color: color(100), rating_num: .5, opacity: .1 },
    { rating: "Lean R", color: color(100), rating_num: 1, opacity: .3 },
    { rating: "Likely R", color: color(100), rating_num: 2, opacity: .8 },
    { rating: "Solid R", color: color(100), rating_num: 3, opacity: 1 },
]
var ratings = experts_colors.map(d => {
    return d.rating
})

var colorsratings = experts_colors.map(d => {
    return d.color
})
var rating_value = experts_colors.map(d => {
    return d.rating_num
})

var rating_opacity = experts_colors.map(d => {
    return d.opacity
})

var ratings_colors = d3.scaleOrdinal()
    .domain(ratings)
    .range(colorsratings)

var numberformat = d3.format(".1%");
var numberFormat = d3.format(".0%");
d3.csv("data.csv", jhk => {

    jhk.forEach((d, i) => {
        d.forecast_date = timeparse(d.forecast_date)
        d.win = +d.win
        return d
    })

    var newest_data = jhk.slice(jhk.length - 171, jhk.length).filter(d => d.party == "gop")

    var jhkforecasts = newest_data.map((d, i) => {
        return d.win
    })


    d3.csv("simdata.csv", data => {

        var experts_rating = data.map((d, i) => {
            return {
                state: d.state,
                ev: +d.ev,
                pvi: +d.pvi,
                sabato: d.sabato,
                cook: d.cook,
                inside: d.inside,
                bitecofer: d.bitecofer,
                politico: d.politico,
                jhk: jhkforecasts[i],
                cnanalysis: d.cnanalysis,
            }
        })

        var sd2 = experts_rating
        var ratings_nested = []
        var experts_ev = []
        for (let j = 0; j < experts.length; j++) {
            var datas = sd2.map((d, i) => {
                return {
                    state: d.state,
                    expert: experts[j],
                    ev: d.ev,
                    pvi: d.pvi,
                    rating: d[experts[j]],
                    rating_value: rating_value[ratings.indexOf(d[experts[j]])],
                    opacity: rating_opacity[ratings.indexOf(d[experts[j]])]
                }
            })

            var expev = {
                expert: experts[j],
                values:
                    [d3.sum(datas.filter(d => d.rating == "Solid D"), d => d.ev),
                    d3.sum(datas.filter(d => d.rating == "Likely D"), d => d.ev),
                    d3.sum(datas.filter(d => d.rating == "Lean D"), d => d.ev),
                    d3.sum(datas.filter(d => d.rating == "Tilt D"), d => d.ev),
                    d3.sum(datas.filter(d => d.rating == "Tossup"), d => d.ev),
                    d3.sum(datas.filter(d => d.rating == "Tilt R"), d => d.ev),
                    d3.sum(datas.filter(d => d.rating == "Lean R"), d => d.ev),
                    d3.sum(datas.filter(d => d.rating == "Likely R"), d => d.ev),
                    d3.sum(datas.filter(d => d.rating == "Solid R"), d => d.ev)]
            }
            var dta = datas.slice(0,50)
            experts_ev.push(expev)
            ratings_nested.push(dta)
        }
        var state_cand = ratings_nested.flat()
        var national_cand = experts_ev.flat()
        var map = d3.select("#usmap")
            .append("svg")
            .attr("viewBox", '75 50 970 450');

        var width3 = 1020;
        var height3 = 500;

        var projection = d3.geoAlbersUsa()
            .translate([width3 / 2, height3 / 2])
            .scale([900]);


        var path = d3.geoPath()
            .projection(projection);

        var tool_tip = d3.tip()
            .attr("class", "d3-tip")
            .offset([-180, -90])
            .html("<div id='tipDiv'></div>");

        map.call(tool_tip);

        var state_data = state_cand
        update(d3.select('#selectbox').property('value'));
        function update(input) {
            var state = state_data.filter(d => d.expert == input)
            var national = national_cand.filter(d => d.expert == input)
            var jhkdata = experts_rating.map((d, i) => {
                return {
                    ev: d.ev,
                    rating: d.jhk
                }
            })

            var jhkev = [
                d3.sum(jhkdata.filter(d => d.rating <= 5), d => d.ev),
                d3.sum(jhkdata.filter(d => d.rating <= 15 && d.rating > 5), d => d.ev),
                d3.sum(jhkdata.filter(d => d.rating <= 35 && d.rating > 15), d => d.ev),
                d3.sum(jhkdata.filter(d => d.rating <= 45 && d.rating > 35), d => d.ev),
                d3.sum(jhkdata.filter(d => d.rating <= 55 && d.rating > 45), d => d.ev),
                d3.sum(jhkdata.filter(d => d.rating <= 65 && d.rating > 55), d => d.ev),
                d3.sum(jhkdata.filter(d => d.rating <= 85 && d.rating > 65), d => d.ev),
                d3.sum(jhkdata.filter(d => d.rating <= 95 && d.rating > 85), d => d.ev),
                d3.sum(jhkdata.filter(d => d.rating > 95), d => d.ev),
            ]

            var evcats = input == "jhk" ? jhkev : national[0].values
            var dem_ev = evcats.slice(0, 4)
            var gop_ev = evcats.slice(5, 10)

            d3.json("https://projects.jhkforecasts.com/presidential_forecast/us-states.json", function (json) {

                for (var i = 0; i < state.length; i++) {

                    var dataState = state[i].state;
                    var rating = state[i].rating;
                    var ev = state[i].ev;
                    var opacity = state[i].opacity;
                    var rating_value = state[i].rating_value;
                    var xv = map_labels[i].xValue
                    var yv = map_labels[i].yValue
                    var label = map_labels[i].label


                    for (var j = 0; j < json.features.length; j++) {
                        var jsonState = json.features[j].properties.name;

                        if (dataState == jsonState) {
                            json.features[j].properties.rating = rating
                            json.features[j].properties.ev = ev
                            json.features[j].properties.opacity = opacity
                            json.features[j].properties.label = label
                            json.features[j].properties.yv = yv
                            json.features[j].properties.xv = xv
                            json.features[j].properties.rating_value = rating_value


                            break;
                        }
                    }
                }

                map.append("rect")
                    .attr("x", 100)
                    .attr("y", 50)
                    .attr("width", 1000)
                    .attr("height", 1000)
                    .attr("fill", "white")

                map.append("image")
                    .attr("xlink:href", "https://jhkforecasts.com/Biden-01.png")
                    .attr("x", 850)
                    .attr("y", 50)
                    .attr("width", 70)
                    .attr("height", 70)
                map.append("image")
                    .attr("xlink:href", "https://jhkforecasts.com/Trump-01.png")
                    .attr("x", 930)
                    .attr("y", 50)
                    .attr("width", 70)
                    .attr("height", 70)


                map.append("text")
                    .attr("x", 965)
                    .text(d3.sum(gop_ev))
                    .attr("y", 150)
                    .style("font-family", "brandon-grotesque")
                    .attr("font-size", "20")
                    .attr("fill", color(100))
                    .attr("text-anchor", "middle")
                    .style("font-weight", "700")
                    .attr("dominant-baseline", "central")

                map.append("text")
                    .attr("x", 885)
                    .text(d3.sum(dem_ev))
                    .attr("y", 150)
                    .style("font-family", "brandon-grotesque")
                    .attr("font-size", "20")
                    .attr("fill", color(0))
                    .attr("text-anchor", "middle")
                    .style("font-weight", "700")
                    .attr("dominant-baseline", "central")

                map.selectAll("ratings")
                    .data(rating_opacity)
                    .enter()
                    .append("circle")
                    .attr("cx", 925)
                    .attr("cy", (d, i) => 200 + i * 30)
                    .attr("r", 10)
                    .attr("fill", (d, i) => i < 4 ? color(0) : i == 4 ? "white" : color(100))
                    .attr("opacity", d => d)

                map.selectAll("ratings")
                    .data(ratings)
                    .enter()
                    .append("text")
                    .attr("x", 900)
                    .text(d => d)
                    .attr("y", (d, i) => 200 + i * 30)
                    .style("font-family", "brandon-grotesque")
                    .attr("font-size", "15")
                    .attr("fill", "black")
                    .attr("text-anchor", "end")
                    .style("font-weight", "700")
                    .attr("dominant-baseline", "central")

                map.selectAll("ratings")
                    .data(evcats)
                    .enter()
                    .append("text")
                    .attr("x", 950)
                    .text(d => d)
                    .attr("y", (d, i) => 200 + i * 30)
                    .style("font-family", "brandon-grotesque")
                    .attr("font-size", "15")
                    .attr("fill", "black")
                    .attr("text-anchor", "start")
                    .style("font-weight", "700")
                    .attr("dominant-baseline", "central")

                map.append("g")
                    .selectAll("path2")
                    .data(json.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .style("stroke", "white")
                    .style("stroke-width", 1)
                    .style("fill", d => input == "jhk" ? color(d.properties.rating) : ratings_colors(d.properties.rating))
                    .style("opacity", d => d.properties.opacity)

                map.selectAll("label")
                    .data(json.features)
                    .enter()
                    .append("text")
                    .text(d => d.properties.label)
                    .attr("x", d => d.properties.xv)
                    .attr("y", d => d.properties.yv)
                    .style("font-family", "source-code-pro")
                    .attr("font-size", "10")
                    .attr("fill", "black")
                    .attr("text-anchor", "middle")
                    .style("font-weight", "400")

                map.append("g")
                    .selectAll("path2")
                    .data(json.features)
                    .enter()
                    .append("path")
                    .attr("class", "statesover")
                    .attr("d", path)
                    .attr("stroke", d => d.properties.rating == "Tossup" ? "black" : "none")
                    .attr("stroke-width", d => d.properties.rating == "Tossup" ? "1.5" : "0")
                    .style("fill", "none")
                    .on("mouseover", function (d) {

                        tool_tip.show();
                        var tipSVG = d3.select("#tipDiv")
                            .append("svg")
                            .attr("width", 175)
                            .attr("height", 175)
                            ;
                        tipSVG.append("rect")
                            .attr("y", 1.5)
                            .attr("x", 1.5)
                            .attr("width", 172)
                            .attr("height", 172)
                            .attr("rx", 8)
                            .attr("fill", "white")
                            .attr("stroke", "black")
                            .attr("stroke-width", 2)
                        tipSVG.append("text")
                            .text(d.properties.name)
                            .attr("y", 20)
                            .attr("x", 87.5)
                            .attr("fill", "#black")
                            .style("font-weight", "600")
                            .style("font-size", "15")
                            .attr("text-anchor", "middle")
                            .style("font-family", "brandon-grotesque")

                        tipSVG.append("text")
                            .text(d.properties.ev + " ELECTORAL VOTES")
                            .attr("y", 40)
                            .attr("x", 87.5)
                            .attr("fill", "#black")
                            .style("font-weight", "500")
                            .style("font-size", "14")
                            .attr("text-anchor", "middle")
                            .style("font-family", "brandon-grotesque")


                        tipSVG.append("text")
                            .text(input == "jhk" ? d.properties.rating > 50 ? "WIN:" + wholeformat(d.properties.rating) + "%" : "WIN:" + wholeformat(100 - d.properties.rating) + "%" : d.properties.rating)
                            .attr("y", 160)
                            .attr("x", 87.5)
                            .attr("fill", "#black")
                            .style("font-weight", "500")
                            .style("font-size", "15")
                            .attr("text-anchor", "middle")
                            .style("font-family", "brandon-grotesque")


                        tipSVG.append("image")
                            .attr("xlink:href", input == "jhk" ? d.properties.rating > 50 ? "https://jhkforecasts.com/Trump-01.png" : "https://jhkforecasts.com/Biden-01.png" : d.properties.rating_value == 0 ? "https://jhkforecasts.com/No%20one-01.png" : d.properties.rating_value > 0 ? "https://jhkforecasts.com/Trump-01.png" : "https://jhkforecasts.com/Biden-01.png")
                            .attr("x", 45)
                            .attr("y", 50)
                            .attr("width", 90)
                            .attr("height", 90)
                    })
                    .on('mouseout',
                        function (d) {
                            tool_tip.hide()
                        })
            })





        }
        var tabledata = experts_rating
        tabledata.sort((a, b) => b.jhk - a.jhk)


        var svg = d3.select("#tableratings")
            .append("svg")
            .attr("viewBox", '0 20 1000 1800')

        svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("text")
            .text(d => d.state)
            .attr("y", (d, i) => 100 + i * 30)
            .attr("x", 10)
            .style("font-family", "brandon-grotesque")
            .attr("font-size", "15")
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .style("font-weight", "700")
            .attr("dominant-baseline", "central")

        svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("text")
            .text(d => d.ev)
            .attr("y", (d, i) => 100 + i * 30)
            .attr("x", 200)
            .style("font-family", "brandon-grotesque")
            .attr("font-size", "15")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", "700")
            .attr("dominant-baseline", "central")

        svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("rect")
            .attr("y", (d, i) => 85 + i * 30)
            .attr("x", 250)
            .attr("width", 100)
            .attr("height", 30)
            .attr("fill", d => color(d.jhk))
            .attr("stroke", "white")

        svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("rect")
            .attr("y", (d, i) => 85 + i * 30)
            .attr("x", 350)
            .attr("width", 100)
            .attr("height", 30)
            .attr("fill", d => colorsratings[ratings.indexOf(d.bitecofer)])
            .attr("opacity", d => rating_opacity[ratings.indexOf(d.bitecofer)])
            .attr("stroke", "white")

        svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("rect")
            .attr("y", (d, i) => 85 + i * 30)
            .attr("x", 450)
            .attr("width", 100)
            .attr("height", 30)
            .attr("fill", d => colorsratings[ratings.indexOf(d.cook)])
            .attr("opacity", d => rating_opacity[ratings.indexOf(d.cook)]).attr("stroke", "white")

        svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("rect")
            .attr("y", (d, i) => 85 + i * 30)
            .attr("x", 550)
            .attr("width", 100)
            .attr("height", 30)
            .attr("fill", d => d.inside == "" ? "white" : colorsratings[ratings.indexOf(d.inside)])
            .attr("opacity", d => rating_opacity[ratings.indexOf(d.inside)])
            .attr("stroke", "white")
        svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("rect")
            .attr("y", (d, i) => 85 + i * 30)
            .attr("x", 650)
            .attr("width", 100)
            .attr("height", 30)
            .attr("fill", d => colorsratings[ratings.indexOf(d.politico)])
            .attr("opacity", d => rating_opacity[ratings.indexOf(d.politico)])
            .attr("stroke", "white")
        svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("rect")
            .attr("y", (d, i) => 85 + i * 30)
            .attr("x", 750)
            .attr("width", 100)
            .attr("height", 30)
            .attr("fill", d => colorsratings[ratings.indexOf(d.sabato)])
            .attr("opacity", d => rating_opacity[ratings.indexOf(d.sabato)])
            .attr("stroke", "white")

            svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("rect")
            .attr("y", (d, i) => 85 + i * 30)
            .attr("x", 850)
            .attr("width", 100)
            .attr("height", 30)
            .attr("fill", d =>d.cnanalysis ==""?"white": colorsratings[ratings.indexOf(d.cnanalysis)])
            .attr("opacity", d => rating_opacity[ratings.indexOf(d.cnanalysis)])
            .attr("stroke", "white")

        svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("text")
            .text(d => d.jhk > 50 ? wholeformat(d.jhk) + "%" : wholeformat(100 - d.jhk) + "%")
            .attr("y", (d, i) => 100 + i * 30)
            .attr("x", 300)
            .style("font-family", "brandon-grotesque")
            .attr("font-size", "15")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", "700")
            .attr("dominant-baseline", "central")

        svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("text")
            .text(d => d.bitecofer.split(" ")[0])
            .attr("y", (d, i) => 100 + i * 30)
            .attr("x", 400)
            .style("font-family", "brandon-grotesque")
            .attr("font-size", "15")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", "700")
            .attr("dominant-baseline", "central")

        svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("text")
            .text(d => d.cook.split(" ")[0])
            .attr("y", (d, i) => 100 + i * 30)
            .attr("x", 500)
            .style("font-family", "brandon-grotesque")
            .attr("font-size", "15")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", "700")
            .attr("dominant-baseline", "central")

        svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("text")
            .text(d => d.inside.split(" ")[0])
            .attr("y", (d, i) => 100 + i * 30)
            .attr("x", 600)
            .style("font-family", "brandon-grotesque")
            .attr("font-size", "15")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", "700")
            .attr("dominant-baseline", "central")


        svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("text")
            .text(d => d.politico.split(" ")[0])
            .attr("y", (d, i) => 100 + i * 30)
            .attr("x", 700)
            .style("font-family", "brandon-grotesque")
            .attr("font-size", "15")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", "700")
            .attr("dominant-baseline", "central")



        svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("text")
            .text(d => d.sabato.split(" ")[0])
            .attr("y", (d, i) => 100 + i * 30)
            .attr("x", 800)
            .style("font-family", "brandon-grotesque")
            .attr("font-size", "15")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", "700")
            .attr("dominant-baseline", "central")

            svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("text")
            .text(d => d.cnanalysis.split(" ")[0])
            .attr("y", (d, i) => 100 + i * 30)
            .attr("x", 900)
            .style("font-family", "brandon-grotesque")
            .attr("font-size", "15")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", "700")
            .attr("dominant-baseline", "central")

        svg.selectAll("states")
            .data(tabledata)
            .enter()
            .append("line")
            .attr("y1", (d, i) => 85 + i * 30)
            .attr("x1", 0)
            .attr("y2", (d, i) => 85 + i * 30)
            .attr("x2", 1000)
            .attr("stroke", "lightgrey")

        var exname = ["JHK Forecasts", "Bitecofer", "Cook Political", "Inside Elections", "Politico", "Sabato's Crystal Ball","CNALYSIS"]
        var exlinks = ["https://projects.jhkforecasts.com/presidential-forecast/", "http://cnu.edu/wasoncenter/2019/07/01-2020-election-forecast/", "https://cookpolitical.com/analysis/national/national-politics/introducing-cook-political-reports-2020-electoral-college", "https://insideelections.com/ratings/president", "https://www.politico.com/2020-election/race-forecasts-and-predictions/president/", "http://centerforpolitics.org/crystalball/2020-president/","https://www.cnalysiscom.website/forecasts/2020-president-governor-senate-house-ratings"]

        svg.selectAll("states")
            .data(exname)
            .enter()
            .append("a")
            .attr("href",(d,i)=>exlinks[i])
            .attr("target","_blank")
            .append("text")
            .text(d => d)
            .attr("x", (d, i) => 300 + i * 100)
            .attr("y", 50)
            .style("font-family", "brandon-grotesque")
            .attr("font-size", "15")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", "700")
            .attr("dominant-baseline", "central")
            .on("mouseover", function (d) {
                d3.select(this)
                  .attr("text-decoration", "underline")
              })
              .on("mouseout", function (d) {
                d3.select(this)
                  .attr("text-decoration", "none")
              })
            .call(wrap, 100)

            svg.selectAll("states")
            .data(exname)
            .enter()
            .append("a")
            .attr("href",(d,i)=>exlinks[i])
            .attr("target","_blank")
            .append("text")
            .text(d => d)
            .attr("x", (d, i) => 300 + i * 100)
            .attr("y", 1780)
            .style("font-family", "brandon-grotesque")
            .attr("font-size", "15")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", "700")
            .attr("dominant-baseline", "central")
            .on("mouseover", function (d) {
                d3.select(this)
                  .attr("text-decoration", "underline")
              })
              .on("mouseout", function (d) {
                d3.select(this)
                  .attr("text-decoration", "none")
              })
            .call(wrap, 100)


        

        function wrap(text, width) {
            text.each(function () {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1, // ems
                    x = text.attr("x"),
                    y = text.attr("y"),
                    dy = 0, //parseFloat(text.attr("dy")),
                    tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
                    }
                }
            });
        }
        var selectbox = d3.select("#selectbox")
            .on("change", function () {
                update(this.value);
            })

    })
})