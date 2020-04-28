var colors = ["#FF6060", "#0091FF", "#FFE130"]

var category = ["gop", "dem", "third"]

var cand_colors = d3.scaleOrdinal()
    .domain(category)
    .range(["#FF6060", "#0091FF", "#FFE130"])

var tformat = d3.timeFormat("%m/%d/%Y")
var dateparse = d3.timeParse("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
var nf = d3.format(".1f")
var updated_format = d3.timeFormat("%b. %d %Y %I:%M %p")
var widthmap = 1020
var heightmap = 500;
var bubble_info = [{ "state": "Alabama", "abbrev": "AL", "radius": 16.43, "x": 413, "y": 332 }, { "state": "Alaska", "abbrev": "AK", "radius": 9.49, "x": 41, "y": 19 }, { "state": "Arizona", "abbrev": "AZ", "radius": 18.17, "x": 172, "y": 282 }, { "state": "Arkansas", "abbrev": "AR", "radius": 13.42, "x": 325, "y": 290 }, { "state": "California", "abbrev": "CA", "radius": 40.62, "x": 103, "y": 237 }, { "state": "Colorado", "abbrev": "CO", "radius": 16.43, "x": 224, "y": 249 }, { "state": "Connecticut", "abbrev": "CT", "radius": 14.49, "x": 586, "y": 128 }, { "state": "Delaware", "abbrev": "DE", "radius": 9.49, "x": 557, "y": 183 }, { "state": "District of Columbia", "abbrev": "DC", "radius": 9.49, "x": 536, "y": 193 }, { "state": "Florida", "abbrev": "FL", "radius": 29.5, "x": 483, "y": 380 }, { "state": "Georgia", "abbrev": "GA", "radius": 21.91, "x": 443, "y": 298 }, { "state": "Hawaii", "abbrev": "HI", "radius": 10.95, "x": 88, "y": 372 }, { "state": "Idaho", "abbrev": "ID", "radius": 10.95, "x": 188, "y": 173 }, { "state": "Illinois", "abbrev": "IL", "radius": 24.49, "x": 359, "y": 207 }, { "state": "Indiana", "abbrev": "IN", "radius": 18.17, "x": 413, "y": 207 }, { "state": "Iowa", "abbrev": "IA", "radius": 13.42, "x": 306, "y": 195 }, { "state": "Kansas", "abbrev": "KS", "radius": 13.42, "x": 266, "y": 248 }, { "state": "Kentucky", "abbrev": "KY", "radius": 15.49, "x": 411, "y": 251 }, { "state": "Louisiana", "abbrev": "LA", "radius": 15.49, "x": 326, "y": 335 }, { "state": "Maine", "abbrev": "ME", "radius": 7.75, "x": 628, "y": 26 }, { "state": "Maryland", "abbrev": "MD", "radius": 17.32, "x": 505, "y": 185 }, { "state": "Massachusetts", "abbrev": "MA", "radius": 18.17, "x": 607, "y": 89 }, { "state": "Michigan", "abbrev": "MI", "radius": 21.91, "x": 418, "y": 149 }, { "state": "Minnesota", "abbrev": "MN", "radius": 17.32, "x": 304, "y": 142 }, { "state": "Mississippi", "abbrev": "MS", "radius": 13.42, "x": 373, "y": 324 }, { "state": "Missouri", "abbrev": "MO", "radius": 17.32, "x": 329, "y": 251 }, { "state": "Montana", "abbrev": "MT", "radius": 9.49, "x": 206, "y": 131 }, { "state": "Nebraska", "abbrev": "NE", "radius": 7.75, "x": 258, "y": 209 }, { "state": "Nevada", "abbrev": "NV", "radius": 13.42, "x": 167, "y": 220 }, { "state": "New Hampshire", "abbrev": "NH", "radius": 10.95, "x": 612, "y": 54 }, { "state": "New Jersey", "abbrev": "NJ", "radius": 20.49, "x": 551, "y": 147 }, { "state": "New Mexico", "abbrev": "NM", "radius": 12.25, "x": 215, "y": 303 }, { "state": "New York", "abbrev": "NY", "radius": 29.5, "x": 548, "y": 81 }, { "state": "North Carolina", "abbrev": "NC", "radius": 21.21, "x": 499, "y": 278 }, { "state": "North Dakota", "abbrev": "ND", "radius": 9.49, "x": 257, "y": 136 }, { "state": "Ohio", "abbrev": "OH", "radius": 23.24, "x": 459, "y": 191 }, { "state": "Oklahoma", "abbrev": "OK", "radius": 14.49, "x": 270, "y": 294 }, { "state": "Oregon", "abbrev": "OR", "radius": 14.49, "x": 124, "y": 176 }, { "state": "Pennsylvania", "abbrev": "PA", "radius": 24.49, "x": 498, "y": 132 }, { "state": "Rhode Island", "abbrev": "RI", "radius": 10.95, "x": 619, "y": 126 }, { "state": "South Carolina", "abbrev": "SC", "radius": 16.43, "x": 487, "y": 322 }, { "state": "South Dakota", "abbrev": "SD", "radius": 9.49, "x": 257, "y": 167 }, { "state": "Tennessee", "abbrev": "TN", "radius": 18.17, "x": 379, "y": 284 }, { "state": "Texas", "abbrev": "TX", "radius": 33.76, "x": 271, "y": 355 }, { "state": "Utah", "abbrev": "UT", "radius": 13.42, "x": 204, "y": 218 }, { "state": "Vermont", "abbrev": "VT", "radius": 9.49, "x": 585, "y": 47 }, { "state": "Virginia", "abbrev": "VA", "radius": 19.75, "x": 508, "y": 229 }, { "state": "Washington", "abbrev": "WA", "radius": 18.97, "x": 154, "y": 131 }, { "state": "West Virginia", "abbrev": "WV", "radius": 12.25, "x": 451, "y": 242 }, { "state": "Wisconsin", "abbrev": "WI", "radius": 17.32, "x": 359, "y": 146 }, { "state": "Wyoming", "abbrev": "WY", "radius": 9.49, "x": 214, "y": 177 }, { "state": "Maine-1", "abbrev": 1, "radius": 5.48, "x": 612, "y": 26 }, { "state": "Maine-2", "abbrev": 2, "radius": 5.48, "x": 644, "y": 26 }, { "state": "Nebraska-1", "abbrev": 1, "radius": 5.48, "x": 242, "y": 209 }, { "state": "Nebraska-2", "abbrev": 2, "radius": 5.48, "x": 258, "y": 193 }, { "state": "Nebraska-3", "abbrev": 3, "radius": 5.48, "x": 274, "y": 209 }]
var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Maine-1", "Maine-2", "Nebraska-1", "Nebraska-2", "Nebraska-3"]
var map_states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934 }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400 }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801 }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387 }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 253.9219 }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 245.5645 }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000 }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000 }, { "state": "District of Columbia", "label": "DC", "xValue": -1000, "yValue": -1000 }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154 }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354 }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465 }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155 }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 231.2954 }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 228.4214 }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 202.6782 }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 259.1592 }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 264.9658 }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135 }, { "state": "Maine", "label": "ME", "xValue": 807.3105, "yValue": 109.855 }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000 }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000 }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647 }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874 }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514 }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 261.123 }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705 }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527 }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957 }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000 }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210 }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035 }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 163.2588 }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 284.5029 }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 117.3823 }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 219.4883 }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418 }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654 }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 200.856 }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000 }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 315.6387 }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 163.5166 }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 290.8193 }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 374.2861 }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 234.978 }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000 }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 252.7842 }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762 }, { "state": "West Virginia", "label": "WV", "xValue": 701, "yValue": 243 }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588 }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 179.6255 }]
var projection = d3.geoAlbersUsa()
    .translate([widthmap / 2, heightmap / 2])
    .scale([900]);
var path = d3.geoPath()
    .projection(projection);


var color = d3.scaleLinear()
    .domain([-20, 0, 20])
    .range(["#0091FF", "white", "#FF6060"]);

var map = d3.select("#usmap")
    .append("svg")
    .attr("viewBox", '75 -50 900 550');


d3.csv("2016-polling-averages.csv", sixteen => {
    d3.csv("https://data.jhkforecasts.com/2020-presidential.csv", twenty => {

        var economic_index = 0
        var incumbency_adv = 2
        var national_third_party = 4.3
        var election_date = new Date(2020, 10, 3)
        var time_scale = 86400000
        var simulations = 100000
        var timeformat = d3.timeFormat("%m/%d/%y")
        var updateformat = d3.timeFormat("%b. %d %Y %I:%M %p")
        var df = d3.format(".3f")
        var fund_weight = 75
        var experts_weight = 40
        var polls_weight
        var ss_weight = 15

        var today = new Date()
        var tformat = d3.timeFormat("%m/%d/%Y")
        var dateparse = d3.timeParse("%m/%d/%y")
        var timeparse = d3.timeParse("%m/%d/%y %H:%M")
        var newestDate = twenty[twenty.length - 1].forecast_date
        var sim_date = dateparse(newestDate)

        d3.csv("https://data.jhkforecasts.com/pollster-ratings.csv", pollster_ratings => {

            var pollster_names = pollster_ratings.map((d, i) => {
                return d.Pollster
            })

            var pollster_grade = pollster_ratings.map((d, i) => {
                return d["538Grade"]
            })
            var pollster_bias = pollster_ratings.map((d, i) => {
                return d.HouseEffect == NaN ? 0 : d.HouseEffect
            })
            var grade_scale = [
                { Grade: "A+", Value: 1.2 },
                { Grade: "A", Value: 1.15 },
                { Grade: "A-", Value: 1.1 },
                { Grade: "A/B", Value: 1.05 },
                { Grade: "B+", Value: 1 },
                { Grade: "B", Value: .95 },
                { Grade: "B-", Value: .9 },
                { Grade: "B/C", Value: .875 },
                { Grade: "C+", Value: .85 },
                { Grade: "C", Value: .8 },
                { Grade: "C-", Value: .7 },
                { Grade: "C/D", Value: .75 },
                { Grade: "D+", Value: .5 },
                { Grade: "D", Value: .3 },
                { Grade: "D-", Value: .2 },
                { Grade: "-", Value: .7 },
            ]
            var pollster_grade_letter = grade_scale.map((d) => {
                return d.Grade
            })

            var pollster_grade_value = grade_scale.map((d) => {
                return d.Value
            })



            d3.csv("https://projects.fivethirtyeight.com/polls-page/president_polls.csv", polls => {
                var polls = polls.filter(d => d.answer != "Schultz")
                var polls = polls.filter(d => d.candidate_party != "LIB")

                polls.forEach((d, i) => {
                    d.party_id = d.candidate_party == "DEM" ? 0 : 1
                    return d;
                })
                polls.sort((a, b) => a.party_id - b.party_id)


                var pollsnew = d3.nest()
                    .key(d => d.question_id)
                    .entries(polls)

                var pollsnew = pollsnew.map((d, i) => {
                    return d.values
                })

                var polls_new = pollsnew.map((d, i) => {
                    return {
                        question_id: +pollsnew[i][0].question_id,
                        poll_id: +pollsnew[i][0].poll_id,
                        state: pollsnew[i][0].state == "" ? "US" : pollsnew[i][0].state,
                        pollster: pollsnew[i][0].pollster,
                        pollster_id: +pollsnew[i][0].pollster_id,
                        url: pollsnew[i][0].url,
                        sponsors: pollsnew[i][0].sponsors,
                        n: pollsnew[i][0].sample_size,
                        partisan: pollsnew[i][0].partisan == "REP" ? -3 : pollsnew[i][0].partisan == "DEM" ? 3 : 0,
                        date_raw: timeformat(dateparse(pollsnew[i][0].end_date)),
                        date: dateparse(pollsnew[i][0].end_date),
                        created: timeparse(pollsnew[i][0].created_at),
                        population: pollsnew[i][0].population,
                        grade: pollster_grade[pollster_names.indexOf(pollsnew[i][0].pollster)] == undefined ? "-" : pollster_grade[pollster_names.indexOf(pollsnew[i][0].pollster)],
                        bias: pollster_bias[pollster_names.indexOf(pollsnew[i][0].pollster)] == undefined ? 0 : pollster_bias[pollster_names.indexOf(pollsnew[i][0].pollster)],
                        dem: pollsnew[i][0].answer,
                        gop: pollsnew[i][1].answer,
                        dem_pct: +pollsnew[i][0].pct,
                        gop_pct: +pollsnew[i][1].pct,
                        poll_index: pollsnew[i][0].state == "" ? "US" + pollsnew[i][0].pollster : pollsnew[i][0].state + pollsnew[i][0].pollster,
                        margin: +pollsnew[i][0].pct - +pollsnew[i][1].pct
                    }
                })
                var polls_new = polls_new.filter(d => d.dem == "Biden")
                var polls_new = polls_new.filter(d => d.gop == "Trump")
                var us_polls = polls_new.filter(d => d.state == "US")
                var polls_new = polls_new.filter(d => d.date > new Date(2019, 6, 1))
                var polls_new = polls_new.filter(d => d.date <= sim_date)


                var length_from_july_2019 = (sim_date - new Date(2020, 2, 1)) / time_scale
                //us trendline
                var us_trendline = []
                for (var b = 0; b < length_from_july_2019 + 1; b++) {

                    var run_date = new Date(2020, 2, 1)
                    run_date.setDate(run_date.getDate() + b);
                    var polls = us_polls.filter(d => d.created <= run_date)
                    polls.forEach((d, i) => {
                        d.days_old = (sim_date - d.date) / time_scale
                        d.grade_value = pollster_grade_value[pollster_grade_letter.indexOf(d.grade)]
                        d.population_adj = d.population == "lv" ? 1.33 : d.population == "rv" ? 1 : .7
                        d.n_adjusted = d.n > 4000 ? Math.pow((d.n - 4000), .2) + 41 : Math.pow(d.n, .45)
                        d.weight = d.n_adjusted * d.population_adj
                        d.sum = (d.dem_pct + d.gop_pct)
                        d.weight = Math.pow(d.weight, d.grade_value)
                        d.weight = d.days_old > 85 ? .02 : (0.0000021 * Math.pow(d.days_old, 3) - 0.0003 * Math.pow(d.days_old, 2) - 0.0012 * d.days_old + 1) * d.weight
                        d.dem_adj = (d.dem_pct - (d.bias / 2)) + (d.population == "lv" ? 0 : -0) - (d.partisan / 2)
                        d.gop_adj = (d.gop_pct + (d.bias / 2)) + (d.population == "lv" ? 0 : 0) + (d.partisan / 2)
                        d.margin = d.gop_adj - d.dem_adj
                        return d;
                    })
                    var poll_filtered = d3.nest()
                        .key(d => d.pollster_id)
                        .entries(polls)
                    var poll_filtered = poll_filtered.map(d => {
                        return d.values
                    })
                    var ps = []
                    for (c = 0; c < poll_filtered.length; c++) {
                        var f = poll_filtered[c]
                        f.sort((a, b) => b.weight - a.weight)
                        f.forEach((d, i) => {
                            d.weight = d.weight / Math.pow(i + 1, 3)
                            d.margin_weight = d.margin * d.weight
                        })
                        ps.push(f)
                    }
                    var psflat = ps.flat()

                    var us_avg = d3.sum(psflat, d => d.margin_weight) / d3.sum(psflat, d => d.weight)
                    var ts = {
                        date: timeformat(run_date),
                        margin: us_avg
                    }
                    us_trendline.push(ts)
                }
                var usflat = us_trendline.flat()

                var us_index_date = usflat.map(d => {
                    return d.date
                })
                var us_index_2 = usflat.map(d => {
                    return d.margin
                })

                var currentUsMargin = us_index_2[us_index_2.length - 1]
                console.log(currentUsMargin)


                twenty.forEach((d, i) => {
                    d.avg = d.party == "gop" ? ((+d.poll_avg * +d.poll_weight) + (((+d.pvi / 2) + 50 + currentUsMargin) * 2)) / (2 + +d.poll_weight) : ((+d.poll_avg * +d.poll_weight) + ((50 - (+d.pvi / 2) + currentUsMargin) * 2)) / (2 + +d.poll_weight)
                })

                var dates = twenty.map((d, i) => {
                    return d.forecast_date
                })
                var dates = new Set(dates)
                var dates = [...dates]
                var newDate = dates[dates.length - 1]
                var newestData = twenty.splice(twenty.length - 171, twenty.length)
                var today = []
                states.forEach((d, i) => {
                    var state = d
                    var gop = newestData.filter(d => d.state == state && d.party == "gop")[0].avg
                    var dem = newestData.filter(d => d.state == state && d.party == "dem")[0].avg
                    var margin = gop - dem
                    today.push({ state: d, margin: margin })
                })
                var today2016 = sixteen.filter(d => d.date == newDate)
                console.log(today2016)
                var todayComp = today.map((d, i) => {
                    return {
                        state: d.state,
                        sixteen: +today2016[i].margin,
                        twenty: d.margin,
                        margin: d.margin - +today2016[i].margin
                    }
                })
                todayComp.push({ state: "US", margin: currentUsMargin - +today2016[56].margin })

                console.log(todayComp)
                d3.json("us.json", topography => {

                    console.log(topography)
                    var stateData = topojson.feature(topography, topography.objects.states).features

                    stateData.forEach((d, i) => {
                        var state = d.properties.name
                        d.properties.twenty = todayComp.filter(d => d.state == state).length == 0 ? 0 : todayComp.filter(d => d.state == state)[0].twenty
                        d.properties.sixteen = todayComp.filter(d => d.state == state).length == 0 ? 0 : todayComp.filter(d => d.state == state)[0].sixteen
                        d.properties.margin = todayComp.filter(d => d.state == state).length == 0 ? 0 : todayComp.filter(d => d.state == state)[0].margin
                        d.properties.xValue = map_labels.filter(d => d.state == state).length == 0 ? 0 : map_labels.filter(d => d.state == state)[0].xValue
                        d.properties.yValue = map_labels.filter(d => d.state == state).length == 0 ? 0 : map_labels.filter(d => d.state == state)[0].yValue
                    })
                    console.log(stateData)

                    map.selectAll("path")
                        .data(stateData)
                        .enter().append("path")
                        .attr("d", path)
                        .attr("fill", d => color(d.properties.margin))
                        .attr("stroke", "white")
                        .attr("stroke-width", .5)

                    map.selectAll("label")
                        .data(map_labels)
                        .enter()
                        .append("text")
                        .text(d => d.label)
                        .attr("x", d => d.xValue)
                        .attr("y", d => d.yValue - 5)
                        .attr("dominiant-baseline", "central")
                        .attr("text-anchor", "middle")
                        .attr("font-size", 10)
                        .style("font-family", "sf-mono")

                    map.selectAll("label")
                        .data(stateData)
                        .enter()
                        .append("text")
                        .text(d => nf(d.properties.margin))
                        .attr("x", d => d.properties.xValue)
                        .attr("y", d => d.properties.yValue + 5)
                        .attr("dominiant-baseline", "central")
                        .attr("text-anchor", "middle")
                        .attr("font-size", 10)
                        .style("font-family", "sf-mono")



                })
            })
        })
    })
})