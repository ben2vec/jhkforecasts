var candidates = ["Trump", "Biden", "Bloomberg", "Buttigeig", "Klobuchar", "Sanders", "Steyer", "Warren"]
var timeparse = d3.timeParse("%m/%d/%y")
var time_scale = 86400000
var national_third_party = .03
d3.csv("https://projects.jhkforecasts.com/presidential_forecast/pollster-ratings.csv", pollster_ratings => {

    var pollster_names = pollster_ratings.map((d, i) => {
        return d.Pollster
    })

    var pollster_grade = pollster_ratings.map((d, i) => {
        return d["538Grade"]
    })
    var pollster_bias = pollster_ratings.map((d, i) => {
        return +d.MeanRevertedBias
    })
    var grade_scale = [
        { Grade: "A+", Value: 1.5 },
        { Grade: "A", Value: 1.35 },
        { Grade: "A-", Value: 1.2 },
        { Grade: "A/B", Value: 1.1 },
        { Grade: "B+", Value: 1 },
        { Grade: "B", Value: .925 },
        { Grade: "B-", Value: .85 },
        { Grade: "B/C", Value: .8 },
        { Grade: "C+", Value: .7 },
        { Grade: "C", Value: .65 },
        { Grade: "C-", Value: .55 },
        { Grade: "C/D", Value: .5 },
        { Grade: "D+", Value: .4 },
        { Grade: "D", Value: .3 },
        { Grade: "D-", Value: .2 },
        { Grade: "", Value: .7 },
    ]
    var pollster_grade_letter = grade_scale.map((d) => {
        return d.Grade
    })

    var pollster_grade_value = grade_scale.map((d) => {
        return d.Value
    })

    d3.csv("https://projects.jhkforecasts.com/presidential_forecast/partisanlean.csv", pvi => {
        var pvi = pvi.map((d, i) => {
            return {
                state: d.state,
                pvi: d.pvi,
                thirdparty: +d.thirdparty
            }
        })
        pvi[38].thirdparty = 1
        var us = {
            state: "US",
            pvi: 0,
            thirdparty: 1

        }
        pvi.push(us)
        console.log(pvi)
        d3.csv("https://projects.fivethirtyeight.com/polls-page/president_polls.csv", data => {
            var data = data.filter(d => d.answer != "Schultz")
            var data = data.filter(d => d.candidate_party != "LIB")

            data.forEach((d, i) => {
                d.party_id = d.candidate_party == "DEM" ? 0 : 1
                return d;
            })
            data.sort((a, b) => a.party_id - b.party_id)

            console.log(data[0])
            var datanew = d3.nest()
                .key(d => d.question_id)
                .entries(data)

            var datanew = datanew.map((d, i) => {
                return d.values
            })

            var data_new = datanew.map((d, i) => {
                return {
                    question_id: +datanew[i][0].question_id,
                    poll_id: +datanew[i][0].poll_id,
                    state: datanew[i][0].state == "" ? "US" : datanew[i][0].state,
                    pollster: datanew[i][0].pollster,
                    id: +datanew[i][0].pollster_id,
                    sponsors: datanew[i][0].sponsors,
                    n: datanew[i][0].sample_size,
                    date: timeparse(datanew[i][0].end_date),
                    population: datanew[i][0].population,
                    grade: pollster_grade[pollster_names.indexOf(datanew[i][0].pollster)] == undefined ? "C+" : pollster_grade[pollster_names.indexOf(datanew[i][0].pollster)],
                    bias: pollster_bias[pollster_names.indexOf(datanew[i][0].pollster)] == undefined ? "C+" : pollster_bias[pollster_names.indexOf(datanew[i][0].pollster)],
                    dem: datanew[i][0].answer,
                    gop: datanew[i][1].answer,
                    dem_pct: +datanew[i][0].pct,
                    gop_pct: +datanew[i][1].pct,
                    poll_index: datanew[i][0].state == "" ? "US" + datanew[i][0].pollster : datanew[i][0].state + datanew[i][0].pollster,
                }
            })
            var data_new = data_new.filter(d => d.gop == "Trump")

            update(d3.select('#selectbox').property('value'));
            function update(input) {
                var data_filtered = data_new.filter(d => d.dem == input)

                data_filtered.forEach((d, i) => {
                    d.grade_value = pollster_grade_value[pollster_grade_letter.indexOf(d.grade)]
                    d.population_adj = d.population == "lv" ? 1.33 : d.population == "rv" ? 1 : .7
                    d.n_adjusted = d.n > 4000 ? Math.pow((d.n - 4000), .2) + 27 : Math.pow(d.n, .4)
                    d.weight = d.n_adjusted * d.population_adj
                    d.sum = (d.dem_pct + d.gop_pct)
                    d.weight = Math.pow(d.weight, d.grade_value) * ((d.dem_pct + d.gop_pct) / 100)
                    d.time_weight = d.weight / (1 + (((new Date() - d.date) / time_scale) / 20))
                    d.dem_adj = (d.dem_pct - (d.bias / 2))
                    d.gop_adj = (d.gop_pct + (d.bias / 2))
                    d.margin = d.dem_adj - d.gop_adj
                    return d;
                })


                var data_filtered = d3.nest()
                    .key(d => d.poll_id)
                    .entries(data_filtered)

                var best_poll = []
                for (var i = 0; i < data_filtered.length; i++) {
                    var polls = data_filtered[i].values
                    polls.sort((a, b) => b.weight - a.weight)
                    var poll = polls[0]
                    best_poll.push(poll)
                }
                var data_filtered = d3.nest()
                    .key(d => d.poll_index)
                    .entries(best_poll)
                var weighted_polls = []
                for (var i = 0; i < data_filtered.length; i++) {
                    var polls = data_filtered[i].values
                    polls.sort((a, b) => b.date - a.date)
                    polls.forEach((d, j) => {
                        d.weight = d.time_weight / Math.pow(j + 1, 2)
                        return d;
                    })
                    polls.sort((a, b) => b.weight - a.weight)
                    var poll = polls[0]
                    weighted_polls.push(poll)
                }
                var data_filtered = weighted_polls

                console.log(data_filtered)

                data_filtered.forEach((d, i) => {
                    d.margin_weight = (d.margin / 100) * d.weight
                    return d;
                })
                var polling_avg = []
                for (var i = 0; i < pvi.length; i++) {
                    var polls = data_filtered.filter(d => d.state == pvi[i].state)
                    var margin_sum = d3.sum(polls, d => d.margin_weight)
                    var weight_sum = d3.sum(polls, d => d.weight)
                    var polling_margin = weight_sum == 0 ? 0 : margin_sum / weight_sum
                    var avg = {
                        state: pvi[i].state,
                        polling_margin: polling_margin,
                        polling_weight: weight_sum,
                        pvi: +pvi[i].pvi,
                        stdev: .15/(Math.pow(weight_sum+20,.3))
                    }
                    polling_avg.push(avg)


                }
                console.log(polling_avg)

                var us_polling_avg = polling_avg[56].polling_margin

                var state_proj = []

                for (var i = 0; i < polling_avg.length - 1; i++) {

                    var fundamental_margin = (-polling_avg[i].pvi / 100) + us_polling_avg
                    var fund_margin_weight = fundamental_margin * 20
                    var polling_margin_weight = polling_avg[i].polling_margin * polling_avg[i].polling_weight
                    var margin = (polling_margin_weight + fund_margin_weight) / (polling_avg[i].polling_weight + 20)
                    
                    var third_party = pvi[i].thirdparty * national_third_party
                    var gop = ((1-third_party)/2)-(margin/2)
                    var dem = 1-third_party-gop
                    var proj = {
                        state: polling_avg[i].state,
                        margin: margin,
                        stdev: polling_avg[i].stdev,
                        sim_stdev: Math.sqrt((Math.pow(polling_avg[i].stdev,2)*2)),
                        gop: gop,
                        dem: dem,
                        third_party: third_party,

                    }
                    state_proj.push(proj)
                }
                console.log(state_proj)
            }

            
            var selectbox = d3.select("#selectbox")
                .on("change", function () {
                    update(this.value);
                })



        })
    })
})