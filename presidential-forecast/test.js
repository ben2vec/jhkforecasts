
var forecasters = [
    {
        "forecast": "JHK Forecasts",
        "link": "https://projects.jhkforecasts.com/presidential-forecast/",
        "type": "",
        "shorthand": "jhk"
    },
    {
        "forecast": "Bitecofer/ Niskanen",
        "link": "https://www.niskanencenter.org/bitecofer-post-primary-update/",
        "type": "newcomer",
        "shorthand": "bitecofer"
    },
    {
        "forecast": "Cook Political",
        "link": "https://cookpolitical.com/analysis/national/national-politics/introducing-cook-political-reports-2020-electoral-college",
        "type": "expert",
        "shorthand": "cook"
    },
    {
        "forecast": "Inside Elections",
        "link": "https://insideelections.com/ratings/president",
        "type": "expert",
        "shorthand": "inside"
    },
    {
        "forecast": "Politico",
        "link": "https://www.politico.com/2020-election/race-forecasts-and-predictions/president/",
        "type": "expert",
        "shorthand": "politico"
    },
    {
        "forecast": "Sabato's Crystal Ball",
        "link": "http://centerforpolitics.org/crystalball/2020-president/",
        "type": "expert",
        "shorthand": "sabato"
    },
    {
        "forecast": "CNalysis",
        "link": "https://www.cnalysiscom.website/forecasts/2020-president-governor-senate-house-ratings",
        "type": "newcomer",
        "shorthand": "cnalysis"
    },
    {
        "forecast": "Lean Tossup",
        "link": "https://leantossup.ca/us-presidency/",
        "type": "newcomer",
        "shorthand": "leantoss"
    },
    {
        "forecast": "Plural Vote",
        "link": "http://www.pluralvote.com/article/2020-forecast/",
        "type": "newcomer",
        "shorthand": "pluralvote"
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
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"]);
var gopscale = d3.scaleLinear()
    .domain([20, 80])
    .range(["white", "#FF6060"]);

var demscale = d3.scaleLinear()
    .domain([20, 80])
    .range(["white", "#0091FF"]);
var ratings_colors = [
    { rating: "Solid D", color: color(-5), rating_num: -3, opacity: 1 },
    { rating: "Likely D", color: color(15), rating_num: -2, opacity: 1 },
    { rating: "Lean D", color: color(30), rating_num: -1, opacity: 1 },
    { rating: "Tilt D", color: color(40), rating_num: -.5, opacity: 1 },
    { rating: "Tossup", color: "white", rating_num: 0, opacity: 1 },
    { rating: "Tilt R", color: color(60), rating_num: .5, opacity: 1 },
    { rating: "Lean R", color: color(70), rating_num: 1, opacity: 3 },
    { rating: "Likely R", color: color(85), rating_num: 2, opacity: 7 },
    { rating: "Solid R", color: color(105), rating_num: 3, opacity: 1 },
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

d3.csv("https://data.jhkforecasts.com/2020-LT-pres.csv", leantoss => {
    var leantoss = leantoss.map((d, i) => {
        return +d.gop_win
    })

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
            pluralvote.shift()
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
            var cds = [pluralvote.splice(20, 2), pluralvote.splice(28, 3)].flat()
            pluralvote.push(cds)
            var pluralvote = pluralvote.flat()
            console.log(pluralvote)

            d3.csv("https://data.jhkforecasts.com/2020-pres-input.csv", data => {

                var forecasts_rating = data.map((d, i) => {
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
                        cnalysis: d.cnanalysis,
                        leantoss: leantoss[i],
                        pluralvote: pluralvote[i].win
                    }
                })
                console.log(forecasts_rating)
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
                            rating_value: rating_value[ratings.indexOf(d[forecasts[j]])],
                            opacity: rating_opacity[ratings.indexOf(d[forecasts[j]])]

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
                                [d3.sum(datas.filter(d => d.rating <= 10), d => d.ev),
                                d3.sum(datas.filter(d => d.rating <= 25 && d.rating > 10), d => d.ev),
                                d3.sum(datas.filter(d => d.rating <= 40 && d.rating > 25), d => d.ev),
                                d3.sum(datas.filter(d => d.rating <= 45 && d.rating > 40), d => d.ev),
                                d3.sum(datas.filter(d => d.rating <= 55 && d.rating > 45), d => d.ev),
                                d3.sum(datas.filter(d => d.rating <= 60 && d.rating > 55), d => d.ev),
                                d3.sum(datas.filter(d => d.rating <= 75 && d.rating > 60), d => d.ev),
                                d3.sum(datas.filter(d => d.rating <= 90 && d.rating > 75), d => d.ev),
                                d3.sum(datas.filter(d => d.rating > 90), d => d.ev)]
                        }

                    var dta = datas.slice(0, 51)
                    dta.forEach((d, i) => {
                        d.label = map_labels[i].label
                    })

                    forecasts_ev.push(expev)
                    ratings_nested.push(dta)
                }
                var state_cand = ratings_nested.flat()
                var national_cand = forecasts_ev.flat()
                console.log(national_cand)
                var map = d3.select("#usmap")
                    .append("svg")
                    .attr("viewBox", '0 0 1000 500');

                var width = 1020;
                var height = 500;
                var projection = d3.geoAlbersUsa()
                    


                var path = d3.geoPath()
                    .projection(projection);
                var tool_tip = d3.tip()
                    .attr("class", "d3-tip")
                    .offset([-180, -90])
                    .html("<div id='tipDiv'></div>");

                map.call(tool_tip);

                var state_data = state_cand
                update("jhk");
                function update(input) {
                    

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
                        var states = topojson.feature(us, us.objects.states),
                        state = states.features.filter(function(d) { return d.id === 34; })[0];



                        projection
                            .scale(1)
                            .translate([0, 0]);

                        var b = path.bounds(state),
                            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
                            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

                        projection
                            .scale(s)
                            .translate(t)


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

                        
                    })

                }

            })
        })
    })
})