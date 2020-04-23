var map = d3.select("#usmap")
                    .append("svg")
                    .attr("viewBox", '75 50 970 450');
var forecasters = [
    {
        "forecast": "JHK Forecasts",
        "link": "https://projects.jhkforecasts.com/presidential-forecast/",
        "type": "",
        "shorthand": "jhk",
        "label": "JHK"
    },
    {
        "forecast": "Bitecofer/ Niskanen",
        "link": "https://www.niskanencenter.org/bitecofer-post-primary-update/",
        "type": "newcomer",
        "shorthand": "bitecofer",
        "label": "Bitecofer"
    },
    {
        "forecast": "Cook Political",
        "link": "https://cookpolitical.com/analysis/national/national-politics/introducing-cook-political-reports-2020-electoral-college",
        "type": "expert",
        "shorthand": "cook",
        "label": "Cook"
    },
    {
        "forecast": "Inside Elections",
        "link": "https://insideelections.com/ratings/president",
        "type": "expert",
        "shorthand": "inside",
        "label": "Inside"
    },
    {
        "forecast": "Politico",
        "link": "https://www.politico.com/2020-election/race-forecasts-and-predictions/president/",
        "type": "expert",
        "shorthand": "politico",
        "label": "Politico"
    },
    {
        "forecast": "Sabato's Crystal Ball",
        "link": "http://centerforpolitics.org/crystalball/2020-president/",
        "type": "expert",
        "shorthand": "sabato",
        "label": "Sabato"
    },
    {
        "forecast": "CNalysis",
        "link": "https://www.cnalysiscom.website/forecasts/2020-president-governor-senate-house-ratings",
        "type": "newcomer",
        "shorthand": "cnalysis",
        "label": "CNalysis"
    },
    {
        "forecast": "Lean Tossup",
        "link": "https://leantossup.ca/us-presidency/",
        "type": "newcomer",
        "shorthand": "leantoss",
        "label": "Lean Tossup"
    },
    {
        "forecast": "Plural Vote",
        "link": "http://www.pluralvote.com/article/2020-forecast/",
        "type": "newcomer",
        "shorthand": "pluralvote",
        "label": "Plural Vote"
    }
]
var expert = forecasters.filter(d => d.type == "expert")
expert.unshift(forecasters[0])
var newcomer = forecasters.filter(d => d.type == "newcomer")
newcomer.unshift(forecasters[0])
var timeparse = d3.timeParse("%m/%d/%y")
var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934 }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400 }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801 }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387 }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 253.9219 }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 245.5645 }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000 }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000 }, { "state": "District of Columbia", "label": "DC", "xValue": -1000, "yValue": -1000 }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154 }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354 }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465 }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155 }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 231.2954 }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 228.4214 }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 202.6782 }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 259.1592 }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 264.9658 }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135 }, { "state": "Maine", "label": "ME", "xValue": 807.3105, "yValue": 109.855 }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000 }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000 }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647 }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874 }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514 }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 261.123 }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705 }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527 }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957 }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000 }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210 }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035 }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 163.2588 }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 284.5029 }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 117.3823 }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 219.4883 }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418 }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654 }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 200.856 }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000 }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 315.6387 }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 163.5166 }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 294.8193 }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 374.2861 }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 234.978 }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000 }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 252.7842 }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762 }, { "state": "West Virginia", "label": "WV", "xValue": 701, "yValue": 243 }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588 }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 179.6255 }]
var timeformat = d3.timeFormat("%b. %d")
var wholeformat = d3.format(".0f")
var numberformat = d3.format(".1f")
var forecasts = forecasters.map(d => { return d.shorthand })
var color = d3.scaleLinear()
    .domain([0, 49.5, 50, 50.5, 100])
    .range(["#0091FF", "#EEF8FF", "white", "#FFF1F1", "#FF6060"]);
var gopscale = d3.scaleLinear()
    .domain([20, 80])
    .range(["white", "#FF6060"]);

var demscale = d3.scaleLinear()
    .domain([20, 80])
    .range(["white", "#0091FF"]);
var ratings_colors = [
    { rating: "Solid D", color: color(-5), rating_num: 0, opacity: 1 },
    { rating: "Likely D", color: color(15), rating_num: 10, opacity: 1 },
    { rating: "Lean D", color: color(30), rating_num: 25, opacity: 1 },
    { rating: "Tilt D", color: color(40), rating_num: 40, opacity: 1 },
    { rating: "Tossup", color: "white", rating_num: 50, opacity: 1 },
    { rating: "Tilt R", color: color(60), rating_num: 60, opacity: 1 },
    { rating: "Lean R", color: color(70), rating_num: 75, opacity: 3 },
    { rating: "Likely R", color: color(85), rating_num: 90, opacity: 7 },
    { rating: "Solid R", color: color(105), rating_num: 100, opacity: 1 },
]
var ratings = ratings_colors.map(d => {
    return d.rating
})

var colorsratings = ratings_colors.map(d => {
    return d.color
})
var rating_value = ratings_colors.map(d => {
    return d.rating_num
})

var rating_opacity = ratings_colors.map(d => {
    return d.opacity
})

var ratings_colors = d3.scaleOrdinal()
    .domain(ratings)
    .range(colorsratings)

var numberformat = d3.format(".1%");
var numberFormat = d3.format(".0%");

d3.csv("https://raw.githubusercontent.com/robby500/US_Model_Data/master/LT_Data.csv", leantoss => {
    leantoss.sort(function (a, b) {
        if (a.state < b.state) { return -1; }
        if (a.state > b.state) { return 1; }
        return 0;
    })

    var ltcds = [leantoss.splice(19, 2), leantoss.splice(27, 3)].flat()
    leantoss.push(ltcds)
    var leantoss = leantoss.flat()


    d3.csv("https://data.jhkforecasts.com/2020-presidential.csv", jhk => {
        jhk.forEach((d, i) => {
            d.win = +d.win
            return d
        })

        var newest_data = jhk.slice(jhk.length - 171, jhk.length).filter(d => d.party == "gop")

        var jhkforecasts = newest_data.map((d, i) => {
            return d.win
        })
        d3.csv("https://raw.githubusercontent.com/seanelevan/pluralvote/master/web/article/2020-forecast/statebystateprob.csv?token=AIYCOI3LWILZQWFAUIU33X26QKW26", pluralvote => {

            var pluralvote = pluralvote.map((d, i) => {
                return {
                    state: d.stateNames,
                    win: +d.statebystateprob
                }
            })
            pluralvote.sort(function (a, b) {
                if (a.state < b.state) { return -1; }
                if (a.state > b.state) { return 1; }
                return 0;
            })
            pluralvote.shift()
            var pvcds = [pluralvote.splice(20, 2), pluralvote.splice(28, 3)].flat()
            pluralvote.push(pvcds)
            var pluralvote = pluralvote.flat()

            d3.csv("https://data.jhkforecasts.com/2020-pres-input.csv", data => {

                var forecasts_rating = data.map((d, i) => {
                    return {
                        state: d.state,
                        ev: +d.ev,
                        pvi: +d.pvi,
                        jhk: jhkforecasts[i],
                        bitecofer: d.bitecofer,
                        cook: d.cook,
                        inside: d.inside,
                        politico: d.politico,
                        sabato: d.sabato,
                        cnalysis: d.cnanalysis,
                        leantoss: +leantoss[i].gop_win,
                        pluralvote: pluralvote[i].win
                    }
                })
                var sd2 = forecasts_rating
                var ratings_nested = []
                var forecasts_ev = []
                for (let j = 0; j < forecasts.length; j++) {
                    var datas = sd2.map((d, i) => {
                        return {
                            state: d.state,
                            expert: forecasts[j],
                            ev: d.ev,
                            pvi: d.pvi,
                            rating: d[forecasts[j]],
                            rating_value: typeof d[forecasts[j]] == "string" ? rating_value[ratings.indexOf(d[forecasts[j]])] : d[forecasts[j]],
                            opacity: rating_opacity[ratings.indexOf(d[forecasts[j]])],
                            full_forecast: forecasters[j].forecast

                        }
                    })

                    var expev = typeof datas[0].rating == "string" ? {
                        expert: forecasts[j],
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
                    } : {
                            expert: forecasts[j],
                            values:
                                [d3.sum(datas.filter(d => d.rating <= 5), d => d.ev),
                                d3.sum(datas.filter(d => d.rating <= 20 && d.rating > 5), d => d.ev),
                                d3.sum(datas.filter(d => d.rating <= 40 && d.rating > 20), d => d.ev),
                                d3.sum(datas.filter(d => d.rating <= 45 && d.rating > 40), d => d.ev),
                                d3.sum(datas.filter(d => d.rating <= 55 && d.rating > 45), d => d.ev),
                                d3.sum(datas.filter(d => d.rating <= 60 && d.rating > 55), d => d.ev),
                                d3.sum(datas.filter(d => d.rating <= 80 && d.rating > 60), d => d.ev),
                                d3.sum(datas.filter(d => d.rating <= 95 && d.rating > 75), d => d.ev),
                                d3.sum(datas.filter(d => d.rating > 95), d => d.ev)]
                        }
                    var aggregated = []


                    var dta = datas.slice(0, 51)
                    dta.forEach((d, i) => {
                        d.label = map_labels[i].label
                    })

                    forecasts_ev.push(expev)
                    ratings_nested.push(dta)
                }
                var bars = []
                forecasts_ev.forEach((d, i) => {
                    var forecast = d
                    var ev = forecast.values
                    var t = []
                    ev.forEach((d, i) => {
                        var rating = ratings[i]
                        var prev = ev.slice(0, i)
                        var prevSum = d3.sum(prev)
                        var en = d
                        t.push({ rating: rating, evs: en, prev: prevSum })
                    })
                    bars.push({ forecast: forecast.expert, values: t, })
                })
                console.log(bars)

                var x = d3.scaleLinear()
                    .domain([0, 538])
                    .range([0, 750])

                d3.select("#bars").append("h1")
                    .text("Race to 270")
                    .style("font-weight", 900)
                    .style("margin-left","2%")

                var svg = d3.select("#bars")
                    .append("svg")
                    .attr("viewBox", '-100 0 1200 ' + (forecasters.length * 100 + 100));

                svg.selectAll("bars")
                    .data(bars)
                    .enter()
                    .append("text")
                    .text(id => forecasters.filter(d => d.shorthand == id.forecast)[0].label)
                    .attr("x", 10)
                    .attr("y", (d, i) => i * 100 + 100)
                    .attr("dominant-baseline", "central")
                    .attr("text-anchor", "start")
                    .attr("font-size", 30);

                svg.append("text")
                    .text("Biden")
                    .attr("x", 200)
                    .attr("y", 30)
                    .attr("dominant-baseline", "bottom")
                    .attr("text-anchor", "start")
                    .style("font-weight", 400)
                    .attr('fill', "Black")
                    .attr("font-size", 30)

                svg.append("text")
                    .text("Trump")
                    .attr("x", 950)
                    .attr("y", 30)
                    .attr("dominant-baseline", "bottom")
                    .attr("text-anchor", "end")
                    .style("font-weight", 400)
                    .attr('fill', "Black")
                    .attr("font-size", 30)
                svg.append("text")
                    .text("270")
                    .attr("x", 200 + x(270))
                    .attr("y", 50)
                    .attr("dominant-baseline", "bottom")
                    .attr("text-anchor", "middle")
                    .style("font-weight", 500)
                    .attr('fill', "Black")
                    .attr("font-size", 15)

                svg.append("line")
                    .attr("x1", 200 + x(270))
                    .attr("x2", 200 + x(270))
                    .attr("y1", 60)
                    .attr("y2", forecasters.length * 100 + 100)
                    .attr("stroke", "grey")
                    .attr("opacity", .6)


                bars.forEach((a, b) => {
                    var values = a.values
                    console.log(values)

                    svg.selectAll("bars")
                        .data(values)
                        .enter()
                        .append("rect")
                        .attr("x", (d, i) => 200 + x(d.prev))
                        .attr("y", (d, i) => b * 100 + 70)
                        .attr("width", d => x(d.evs))
                        .attr("height", 60)
                        .attr("fill", d => ratings_colors(d.rating))

                    svg.selectAll("bars")
                        .data(values)
                        .enter()
                        .append("text")
                        .text(d => d.evs > 15 ? d.evs : "")
                        .attr("x", (d, i) => 200 + x(d.prev) + (x(d.evs) / 2))
                        .attr("y", (d, i) => b * 100 + 100)
                        .attr("dominant-baseline", "central")
                        .attr("text-anchor", "middle")
                        .style("font-weight", 500);

                    svg.selectAll("bars")
                        .data(values)
                        .enter()
                        .append("text")
                        .text(d3.sum(values.splice(5, 10), d => d.evs))
                        .attr("x", 950)
                        .attr("y", (d, i) => b * 100 + 65)
                        .attr("dominant-baseline", "bottom")
                        .attr("text-anchor", "end")
                        .style("font-weight", 500)
                        .attr('fill', color(100))
                        .attr("font-size", 20);

                    svg.selectAll("bars")
                        .data(values)
                        .enter()
                        .append("text")
                        .text(d3.sum(values.splice(0, 4), d => d.evs))
                        .attr("x", 200)
                        .attr("y", (d, i) => b * 100 + 65)
                        .attr("dominant-baseline", "bottom")
                        .attr("text-anchor", "start")
                        .style("font-weight", 500)
                        .attr('fill', color(00))
                        .attr("font-size", 20)


                })




                var state_cand = ratings_nested.flat()
                var national_cand = forecasts_ev.flat()
                

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


                    var boxstates = [state[29], state[45], state[21], state[39], state[6], state[7], state[20], state[8]]


                    var evcats = national[0].values
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
                        var mapdata = json.features

                        map.append("rect")
                            .attr("x", 100)
                            .attr("y", 50)
                            .attr("width", 1000)
                            .attr("height", 1000)
                            .attr("fill", "white")

                        map.selectAll()
                            .data(boxstates)
                            .enter()
                            .append("rect")
                            .attr("x", 775)
                            .attr("y", (d, i) => 130 + 17.5 * i)
                            .attr("width", 30)
                            .attr("height", 15)
                            .attr("stroke", d => typeof d.rating == "number" ? Math.abs(d.rating - 50) < 5 ? "black" : "white" : d.rating == "Tossup" ? "black" : "white")
                            .attr("fill", d => typeof d.rating == "number" ? color(d.rating) : ratings_colors(d.rating))

                        map.selectAll()
                            .data(boxstates)
                            .enter()
                            .append("text")
                            .text(d => d.label)
                            .attr("x", 790)
                            .attr("y", (d, i) => 137.5 + 17.5 * i)
                            .style("font-family", "source-code-pro")
                            .attr("font-size", "10")
                            .attr("fill", "black")
                            .attr("text-anchor", "middle")
                            .style("font-weight", "500")
                            .attr("dominant-baseline", "central")

                        map.selectAll()
                            .data(boxstates)
                            .enter()
                            .append("a")
                            .attr("href", "#state-search")
                            .append("rect")
                            .attr("class", "statesover")
                            .attr("x", 775)
                            .attr("y", (d, i) => 130 + 15 * i)
                            .attr("width", 30)
                            .attr("height", 15)
                            .attr("fill", "none")
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
                                    .text(d.state)
                                    .attr("y", 20)
                                    .attr("x", 87.5)
                                    .attr("fill", "#black")
                                    .attr("font-weight", "500")
                                    .style("font-size", "15")
                                    .attr("text-anchor", "middle")
                                    .style("font-family", "brandon-grotesque")

                                tipSVG.append("text")
                                    .text(d.ev + " ELECTORAL VOTES")
                                    .attr("y", 40)
                                    .attr("x", 87.5)
                                    .attr("fill", "#black")
                                    .style("font-weight", "500")
                                    .style("font-size", "14")
                                    .attr("text-anchor", "middle")
                                    .style("font-family", "brandon-grotesque")


                                tipSVG.append("text")
                                    .text(typeof d.rating == "number" ? d.rating > 50 ? "WIN: " + wholeformat(d.rating) + "%" : "WIN:" + wholeformat(100 - d.rating) + "%" : d.rating)
                                    .attr("y", 160)
                                    .attr("x", 87.5)
                                    .attr("fill", typeof d.rating == "number" ? d.rating > 50 ? color(100) : color(0) : d.rating_value == 0 ? "black" : d.rating_value > 0 ? color(100) : color(0))
                                    .style("font-weight", "500")
                                    .style("font-size", "15")
                                    .attr("text-anchor", "middle")
                                    .style("font-family", "brandon-grotesque")


                                tipSVG.append("image")
                                    .attr("xlink:href", typeof d.rating == "number" ? d.rating > 50 ? "https://jhkforecasts.com/Trump-01.png" : "https://jhkforecasts.com/Biden-01.png" : d.rating_value == 0 ? "https://jhkforecasts.com/No%20one-01.png" : d.rating_value > 0 ? "https://jhkforecasts.com/Trump-01.png" : "https://jhkforecasts.com/Biden-01.png")
                                    .attr("x", 45)
                                    .attr("y", 50)
                                    .attr("width", 90)
                                    .attr("height", 90)
                            })
                            .on('mouseout',
                                function (d) {
                                    tool_tip.hide()
                                })
                            .on("click", function (d) {
                                stateproj(d.properties.name);
                                document.getElementById("state-search").value = d.properties.name
                            })



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
                            .style("font-weight", "500")
                            .attr("dominant-baseline", "central")

                        map.append("text")
                            .attr("x", 885)
                            .text(d3.sum(dem_ev))
                            .attr("y", 150)
                            .style("font-family", "brandon-grotesque")
                            .attr("font-size", "20")
                            .attr("fill", color(0))
                            .attr("text-anchor", "middle")
                            .style("font-weight", "500")
                            .attr("dominant-baseline", "central")

                        map.selectAll("ratings")
                            .data(rating_opacity)
                            .enter()
                            .append("circle")
                            .attr("cx", 925)
                            .attr("cy", (d, i) => 200 + i * 30)
                            .attr("r", 10)
                            .attr("fill", (d, i) => colorsratings[i])
                            .attr("stroke", (d, i) => i == 4 ? "black" : "white")

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
                            .style("font-weight", "500")
                            .attr("dominant-baseline", "central")

                        var ratingspct = [">95%", ">80%", ">60%", ">55%", "<55%", ">55%", ">60%", ">80%", ">95%"]
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
                            .style("font-weight", "500")
                            .attr("dominant-baseline", "central")

                        map.selectAll("ratings")
                            .data(ratingspct)
                            .enter()
                            .append("text")
                            .attr("x", 1000)
                            .text(d => typeof json.features[0].properties.rating == "number" ? d : "")
                            .attr("y", (d, i) => 200 + i * 30)
                            .style("font-family", "brandon-grotesque")
                            .attr("font-size", "15")
                            .attr("fill", "black")
                            .attr("text-anchor", "start")
                            .style("font-weight", "500")
                            .attr("dominant-baseline", "central")

                        map.append("text")
                            .attr("x", 1000)
                            .text(typeof json.features[0].properties.rating == "number" ? "Win %" : "")
                            .attr("y", (d, i) => 170)
                            .style("font-family", "brandon-grotesque")
                            .attr("font-size", "15")
                            .attr("fill", "black")
                            .attr("text-anchor", "start")
                            .style("font-weight", "500")
                            .attr("dominant-baseline", "central")

                        map.append("g")
                            .selectAll("path2")
                            .data(mapdata)
                            .enter()
                            .append("path")
                            .attr("d", path)
                            .style("stroke", "white")
                            .style("stroke-width", 1)
                            .style("fill", d => typeof d.properties.rating == "number" ? color(d.properties.rating) : ratings_colors(d.properties.rating))
                            .style("opacity", d => d.properties.opacity)
                            .attr("transform", "translate(-50,0)")

                        map.selectAll("label")
                            .data(mapdata)
                            .enter()
                            .append("text")
                            .text(d => d.properties.label)
                            .attr("x", d => d.properties.xv)
                            .attr("y", d => d.properties.yv)
                            .style("font-family", "source-code-pro")
                            .attr("font-size", "10")
                            .attr("fill", "black")
                            .attr("text-anchor", "middle")
                            .style("font-weight", "500")
                            .attr("transform", "translate(-50,0)")


                        map.append("g")
                            .selectAll("path2")
                            .data(mapdata)
                            .enter()
                            .append("a")
                            .attr("href", "#state-search")
                            .append("path")
                            .attr("class", "statesover")
                            .attr("d", path)
                            .attr("stroke", d => typeof d.properties.rating == "number" ? d.properties.rating > 45 ? d.properties.rating < 55 ? "black" : "none" : "none" : d.properties.rating == "Tossup" ? "black" : "none")
                            .attr("stroke-width", d => 1.5)
                            .style("fill", "none")
                            .attr("transform", "translate(-50,0)")
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
                                    .attr("font-weight", "500")
                                    .style("font-size", "15")
                                    .attr("text-anchor", "middle")
                                    .style("font-family", "brandon-grotesque")

                                tipSVG.append("text")
                                    .text(d.properties.ev + " ELECTORAL VOTES")
                                    .attr("y", 40)
                                    .attr("x", 87.5)
                                    .attr("fill", "black")
                                    .style("font-weight", "500")
                                    .style("font-size", "14")
                                    .attr("text-anchor", "middle")
                                    .style("font-family", "brandon-grotesque")


                                tipSVG.append("text")
                                    .text(typeof d.properties.rating == "number" ? d.properties.rating > 50 ? "WIN:" + wholeformat(d.properties.rating) + "%" : "WIN:" + wholeformat(100 - d.properties.rating) + "%" : d.properties.rating)
                                    .attr("y", 160)
                                    .attr("x", 87.5)
                                    .attr("fill", "black")
                                    .style("font-weight", "500")
                                    .style("font-size", "15")
                                    .attr("text-anchor", "middle")
                                    .style("font-family", "brandon-grotesque")


                                tipSVG.append("image")
                                    .attr("xlink:href", typeof d.properties.rating == "number" ? d.properties.rating > 50 ? "https://jhkforecasts.com/Trump-01.png" : "https://jhkforecasts.com/Biden-01.png" : d.properties.rating_value == 0 ? "https://jhkforecasts.com/No%20one-01.png" : d.properties.rating_value > 0 ? "https://jhkforecasts.com/Trump-01.png" : "https://jhkforecasts.com/Biden-01.png")
                                    .attr("x", 45)
                                    .attr("y", 50)
                                    .attr("width", 90)
                                    .attr("height", 90)
                            })
                            .on('mouseout',
                                function (d) {
                                    tool_tip.hide()
                                })
                            .on("click", function (d) {
                                stateproj(d.properties.name);
                                document.getElementById("state-search").value = d.properties.name
                            })
                    })

                }
                var tabledata = forecasts_rating
                tabledata.sort((a, b) => b.pvi - a.pvi)
                tabledata.sort((a, b) => b.jhk - a.jhk)

                var all = [];
                var ex = []
                var New = []
                tabledata.forEach(function (d, i) {
                    all.push([d.state, d.ev, d.jhk, d.bitecofer, d.cook, d.inside, d.politico, d.sabato, d.cnalysis, d.leantoss, d.pluralvote]);
                    ex.push([d.state, d.ev, d.jhk, d.cook, d.inside, d.politico, d.sabato]);
                    New.push([d.state, d.ev, d.jhk, d.bitecofer, d.cnalysis, d.leantoss, d.pluralvote]);
                })
                var allnames = ["State", "Electoral Votes"]
                allnames.push(forecasters.map(d => { return d.forecast }))
                var allnames = allnames.flat()

                var allwidth = 75 / (allnames.length - 2)

                var exnames = ["State", "Electoral Votes"]
                exnames.push(expert.map(d => { return d.forecast }))
                var exnames = exnames.flat()

                var exwidth = 75 / (exnames.length - 2)

                var newnames = ["State", "Electoral Votes"]
                newnames.push(newcomer.map(d => { return d.forecast }))
                var newnames = newnames.flat()

                var newwidth = 75 / (newnames.length - 2)

                var alltable = d3.select("#all").append("table")
                var allheader = alltable.append("thead").append("tr")


                allheader
                    .selectAll("th")
                    .data(allnames)
                    .enter()
                    .append("th")
                    .style("width", (d, i) => i == 0 ? "20%" : i == 1 ? "5%" : allwidth + "%")
                    .append("a")
                    .attr("href", (d, i) => i > 1 ? forecasters.map(d => { return d.link })[i - 2] : "").text(function (d) {
                        return d
                    })

                var alltBody = alltable.append("tbody");

                var allrows = alltBody.selectAll("tr")
                    .data(all)
                    .enter()
                    .append("tr")

                allrows
                    .selectAll("td")
                    .data(function (d) {
                        return d;
                    })
                    .enter()
                    .append("td")
                    .style("background-color", (d, i) => typeof d == "number" ? i == 1 ? "white" : color(d) : i > 2 ? colorsratings[ratings.indexOf(d)] : "none")
                    .text((d, i) => typeof d == "number" ? i == 1 ? d : wholeformat(Math.abs(d - 50) + 50) + "%" : i > 2 ? d.split(" ")[0] : d)
                    .style("font-weight", 500)
                    .style("font-size", "1.5vw")

                //experts table
                var extable = d3.select("#ex").append("table")
                var exheader = extable.append("thead").append("tr")


                exheader
                    .selectAll("th")
                    .data(exnames)
                    .enter()
                    .append("th")
                    .style("width", (d, i) => i == 0 ? "20%" : i == 1 ? "5%" : exwidth + "%")
                    .append("a")
                    .attr("href", (d, i) => i > 1 ? expert.map(d => { return d.link })[i - 2] : "").text(function (d) {
                        return d
                    })

                var extBody = extable.append("tbody");

                var exrows = extBody.selectAll("tr")
                    .data(ex)
                    .enter()
                    .append("tr")

                exrows
                    .selectAll("td")
                    .data(function (d) {
                        return d;
                    })
                    .enter()
                    .append("td")
                    .style("background-color", (d, i) => typeof d == "number" ? i == 1 ? "white" : color(d) : i > 2 ? colorsratings[ratings.indexOf(d)] : "none")
                    .text((d, i) => typeof d == "number" ? i == 1 ? d : wholeformat(Math.abs(d - 50) + 50) + "%" : i > 2 ? d.split(" ")[0] : d)
                    .style("font-weight", 500)
                    .style("font-size", "1.5vw")


                //newcomer table
                var newtable = d3.select("#new").append("table")
                var newheader = newtable.append("thead").append("tr")


                newheader
                    .selectAll("th")
                    .data(newnames)
                    .enter()
                    .append("th")
                    .style("width", (d, i) => i == 0 ? "20%" : i == 1 ? "5%" : newwidth + "%")
                    .append("a")
                    .attr("href", (d, i) => i > 1 ? newcomer.map(d => { return d.link })[i - 2] : "").text(function (d) {
                        return d
                    })

                var newtBody = newtable.append("tbody");

                var newrows = newtBody.selectAll("tr")
                    .data(New)
                    .enter()
                    .append("tr")
                newrows
                    .selectAll("td")
                    .data(function (d) {
                        return d;
                    })
                    .enter()
                    .append("td")
                    .style("background-color", (d, i) => typeof d == "number" ? i == 1 ? "white" : color(d) : i > 2 ? colorsratings[ratings.indexOf(d)] : "none")
                    .text((d, i) => typeof d == "number" ? i == 1 ? d : wholeformat(Math.abs(d - 50) + 50) + "%" : i > 2 ? d.split(" ")[0] : d)
                    .style("font-weight", 500)
                    .style("font-size", "1.5vw")


                var projection2 = d3.geoAlbers();

                var path2 = d3.geoPath()
                    .projection(projection2);

                var svg = d3.select("#state").append("svg")

                var st = map_labels[Math.round(Math.random() * 50)].state

                document.getElementById("state-search").value = st

                stateproj(st)
                function stateproj(input) {
                    var stateData = state_cand.filter(d => d.state == input)
                    var state_proj = d3.mean(stateData, d => d.rating_value)
                    console.log(state_proj)
                    stateData.push({ rating: state_proj, full_forecast: "Aggregated Projection" })
                    svg.attr("viewBox", "0 0 1000 " + (stateData.length * 40 + 150))
                    var width = 500,
                        height = stateData.length * 40 + 50;
                    d3.json("us-states.json", us => {

                        var state = us.features.filter(d => d.properties.name == input)[0];

                        projection2
                            .scale(1)
                            .translate([0, 0]);

                        var b = path2.bounds(state),
                            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
                            t = [((width - s * (b[1][0] + b[0][0])) / 2), ((height - s * (b[1][1] + b[0][1])) / 2) + 50];

                        projection2
                            .scale(s)
                            .translate(t);
                        svg.append("rect")
                            .attr("y", (d, i) => 0)
                            .attr("x", 0)
                            .attr("height", stateData.length * 40 + 150)
                            .attr("width", 1000)
                            .attr("fill", "white")
                        svg.append("path")
                            .datum(state)
                            .attr("fill", color(state_proj))
                            .attr("d", path2)
                            .style("stroke", (d, i) => state_proj > 45 && state_proj < 55 ? "Black" : "white")



                        svg.append("text")
                            .text(input)
                            .attr("y", 50)
                            .attr("x", 250)
                            .attr("fill", "black")
                            .style("font-weight", "500")
                            .style("font-size", 40)
                            .attr("text-anchor", "middle")

                        svg.selectAll("states")
                            .data(stateData)
                            .enter()
                            .append("rect")
                            .attr("y", (d, i) => 80 + i * 40)
                            .attr("x", 850)
                            .attr("height", 40)
                            .attr("width", 100)
                            .style("fill", (d, i) => typeof d.rating == "number" ? color(d.rating) : colorsratings[ratings.indexOf(d.rating)])


                        svg.selectAll("states")
                            .data(stateData)
                            .enter()
                            .append("line")
                            .attr("y1", (d, i) => 80 + i * 40)
                            .attr("y2", (d, i) => 80 + i * 40)
                            .attr("x1", (d, i) => 600)
                            .attr("x2", (d, i) => 950)
                            .attr("stroke", (d, i) => i == stateData.length - 1 ? "black" : "#AFAFAF")
                            .attr("stroke-width", (d, i) => i == stateData.length - 1 ? "2" : "1")



                        svg.selectAll("states")
                            .data(stateData)
                            .enter()
                            .append("text")
                            .text(d => typeof d.rating == "number" ? wholeformat(Math.abs(d.rating - 50) + 50) + "%" : d.rating)
                            .attr("y", (d, i) => 100 + i * 40)
                            .attr("x", 900)
                            .attr("fill", "black")
                            .style("font-weight", "500")
                            .style("font-size", 20)
                            .attr("text-anchor", "middle")
                            .attr("dominant-baseline", "central")


                        svg.selectAll("states")
                            .data(stateData)
                            .enter()
                            .append("text")
                            .text(d => d.full_forecast)
                            .attr("y", (d, i) => 100 + i * 40)
                            .attr("x", 600)
                            .attr("fill", "black")
                            .style("font-weight", "500")
                            .style("font-size", 25)
                            .attr("text-anchor", "start")
                            .attr("dominant-baseline", "central")



                    })
                }

                var selectbox = d3.select("#selectbox")
                    .on("change", function () {
                        update(this.value)
                    })

                var selectbox3 = d3.select("#state-search")
                    .on("change", function () {
                        stateproj(this.value)
                    })

                var selectbox2 = d3.select("#selectbox2")
                    .on("change", function () {
                        this.value == "all" ? d3.select("#new").style("display", "none") && d3.select("#ex").style("display", "none") && d3.select("#all").style("display", "block") :
                            this.value == "new" ? d3.select("#new").style("display", "block") && d3.select("#ex").style("display", "none") && d3.select("#all").style("display", "none") :
                                d3.select("#new").style("display", "none") && d3.select("#ex").style("display", "block") && d3.select("#all").style("display", "none")

                    });

            })
        })
    })
})