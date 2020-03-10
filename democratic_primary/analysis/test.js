var fname = ["JHK Forecasts", "Lean Tossup", "#10at10", "FiveThirtyEight Forecast", "theHOX", "DDHQ/0ptimus/Ozy"]
var flinks = ["https://projects.jhkforecasts.com/democratic_primary/", "https://leantossup.ca/2020-democratic-presidential-primary/", "https://twitter.com/djjohnso", "https://projects.fivethirtyeight.com/2020-primary-forecast/", "https://twitter.com/irihox", "https://www.ozy.com/topic/2020-election/"]
var forecasters = [
    {
        "forecaster": "#10at10",
        "fill": "#17B76D",
        "stroke": "#17B76D"
    },
    {
        "forecaster": "DDHQ/0ptimus/Ozy",
        "fill": "#0C5AB2",
        "stroke": "#FC464E"
    },
    {
        "forecaster": "FiveThirtyEight Forecast",
        "fill": "#E5592C",
        "stroke": "#E5592C"
    },

    {
        "forecaster": "JHK Forecasts",
        "fill": "#60C7FE",
        "stroke": "#60C7FE"
    },
    {
        "forecaster": "Lean Tossup",
        "fill": "#FB0006",
        "stroke": "#04376D"
    },

    {
        "forecaster": "theHOX",
        "fill": "#FDDE25",
        "stroke": "#FDDE25"
    }
]
var parsedate = d3.timeParse("%Y-%m-%d %I:%M:%S")
var parseDate = d3.timeParse("%m/%d/%y")
var time_scale = 86400000
var num_qual_polls = 5
var numberformat = d3.format(".2f")
var numberformat = d3.format(".2f")

d3.csv("results.csv", results => {
    results.forEach((d, i) => {
        d.raw_date = d.election_date
        d.election_date = parseDate(d.election_date)

        return d;
    })

    d3.csv("https://projects.jhkforecasts.com/democratic_primary/polls.csv", polls => {

        var states = results.map(d => {
            return d.state
        })
        var pd = []
        for (let a = 0; a < states.length; a++) {
            var states_polls = polls.filter(d => d.State == states[a])

            var polls_by_pollster = d3.nest()
                .key(d => d.Pollster)
                .entries(states_polls)

            var polls_by_pollster = polls_by_pollster.map((d, i) => {
                return d.values
            })

            var newest_poll = []
            for (let b = 0; b < polls_by_pollster.length; b++) {
                var pollls = polls_by_pollster[b]
                pollls.sort((a, b) => b.weight - a.weight)
                newest_poll.push(pollls[0])
            }

            newest_poll.forEach((d, i) => {
                d.Date = parsedate(d.Date)
                d.recency = (results[a].election_date - d.Date) / time_scale
                return d;
            })

            var newest_poll = newest_poll.filter(d => d.recency < 20)


            var accuracy = newest_poll.map((d, i) => {
                return {
                    state: d.State,
                    pollster: d.Pollster,
                    Date: d.Date,
                    biden: +d.Biden,
                    bloomberg: +d.Bloomberg,
                    buttigeig: +d.Buttigieg,
                    klobuchar: +d.Klobuchar,
                    sanders: +d.Sanders,
                    steyer: +d.Steyer,
                    warren: +d.Warren,
                    biden_res: +results[a].biden,
                    bloomberg_res: +results[a].bloomberg,
                    buttigeig_res: +results[a].buttigeig,
                    klobuchar_res: +results[a].klobuchar,
                    sanders_res: +results[a].sanders,
                    steyer_res: +results[a].steyer,
                    warren_res: +results[a].warren,
                }
            })
            accuracy.forEach((d, i) => {
                d.biden_error = +results[a].bidencalc == 0 ? 0 : Math.pow(Math.abs(d.biden - d.biden_res), 2)
                d.bloomberg_error = +results[a].bloombergcalc == 0 ? 0 : Math.pow(Math.abs(d.bloomberg - d.bloomberg_res), 2)
                d.buttigeig_error = +results[a].buttigeigcalc == 0 ? 0 : Math.pow(Math.abs(d.buttigeig - d.buttigeig_res), 2)
                d.klobuchar_error = +results[a].klobucharcalc == 0 ? 0 : Math.pow(Math.abs(d.klobuchar - d.klobuchar_res), 2)
                d.sanders_error = +results[a].sanderscalc == 0 ? 0 : Math.pow(Math.abs(d.sanders - d.sanders_res), 2)
                d.steyer_error = +results[a].steyercalc == 0 ? 0 : Math.pow(Math.abs(d.steyer - d.steyer_res), 2)
                d.warren_error = +results[a].warrencalc == 0 ? 0 : Math.pow(Math.abs(d.warren - d.warren_res), 2)
                d.sumsq = d.biden_error + d.bloomberg_error + d.buttigeig_error + d.klobuchar_error + d.sanders_error + d.steyer_error + d.warren_error
                d.rmse = Math.sqrt(d.sumsq / results[a].num_cands)
                return d;
            })
            var avg_error = d3.mean(accuracy, d => d.rmse)

            accuracy.forEach((d, i) => {
                d.mean_reverted_error = d.rmse - avg_error
                return d;
            })
            accuracy.sort((a, b) => a.rmse - b.rmse)
            pd.push(accuracy)
        }


        d3.csv("forecasts.csv", forecasts => {
            var fd = []
            for (let a = 0; a < states.length; a++) {
                var fs = forecasts.filter(d => d.state == states[a])
                var accuracy = fs.map((d, i) => {
                    return {
                        state: d.state,
                        forecaster: d.forecaster,
                        biden: +d.biden,
                        bloomberg: +d.bloomberg,
                        buttigeig: +d.buttigeig,
                        klobuchar: +d.klobuchar,
                        sanders: +d.sanders,
                        steyer: +d.steyer,
                        warren: +d.warren,
                        biden_res: +results[a].biden,
                        bloomberg_res: +results[a].bloomberg,
                        buttigeig_res: +results[a].buttigeig,
                        klobuchar_res: +results[a].klobuchar,
                        sanders_res: +results[a].sanders,
                        steyer_res: +results[a].steyer,
                        warren_res: +results[a].warren,
                    }
                })

                accuracy.forEach((d, i) => {
                    d.biden_error = +results[a].bidencalc == 0 ? 0 : Math.pow(Math.abs(d.biden - d.biden_res), 2)
                    d.bloomberg_error = +results[a].bloombergcalc == 0 ? 0 : Math.pow(Math.abs(d.bloomberg - d.bloomberg_res), 2)
                    d.buttigeig_error = +results[a].buttigeigcalc == 0 ? 0 : Math.pow(Math.abs(d.buttigeig - d.buttigeig_res), 2)
                    d.klobuchar_error = +results[a].klobucharcalc == 0 ? 0 : Math.pow(Math.abs(d.klobuchar - d.klobuchar_res), 2)
                    d.sanders_error = +results[a].sanderscalc == 0 ? 0 : Math.pow(Math.abs(d.sanders - d.sanders_res), 2)
                    d.steyer_error = +results[a].steyercalc == 0 ? 0 : Math.pow(Math.abs(d.steyer - d.steyer_res), 2)
                    d.warren_error = +results[a].warrencalc == 0 ? 0 : Math.pow(Math.abs(d.warren - d.warren_res), 2)
                    d.sumsq = d.biden_error + d.bloomberg_error + d.buttigeig_error + d.klobuchar_error + d.sanders_error + d.steyer_error + d.warren_error
                    d.rmse = Math.sqrt(d.sumsq / results[a].num_cands)
                    return d;
                })
                var avg_error = d3.mean(accuracy, d => d.rmse)

                accuracy.forEach((d, i) => {
                    d.mean_reverted_error = d.rmse - avg_error
                    return d;
                })
                accuracy.sort((a, b) => a.rmse - b.rmse)
                fd.push(accuracy)
            }

            var polls_data = pd.flat()
            var forecasts_data = fd.flat()

            var states_results = []
            for (let a = 0; a < states.length; a++) {
                var polls = polls_data.filter(d => d.state == states[a])
                polls.sort((a, b) => a.rmse - b.rmse)
                var forecasts = forecasts_data.filter(d => d.state == states[a])
                forecasts.sort((a, b) => a.rmse - b.rmse)

                var f = {
                    state: states[a],
                    date: results[a].raw_date,
                    pollster: polls[0].pollster,
                    forecast: forecasts[0].forecaster
                }

                states_results.push(f)
            }


            var pollsters = polls_data.map((d, i) => {
                return d.pollster
            })

            var ps = d3.set(pollsters).values()



            var pollsters_avg_rmse = ps.map((d, i) => {
                return {
                    pollster: d,
                    mr_error: d3.mean(polls_data.filter(j => j.pollster == d), d => d.mean_reverted_error),
                    polls: d3.sum(polls_data.filter(j => j.pollster == d), d => d.rmse) / d3.mean(polls_data.filter(j => j.pollster == d), d => d.rmse),
                }
            })
            pollsters_avg_rmse.forEach((d, i) => {
                d.rmse = Math.sqrt(d3.sum(polls_data.filter(j => j.pollster == d.pollster), d => Math.pow(d.rmse, 2)) / d.polls)
                return d;
            })
            var flength = forecasters.map(d=>{
                return forecasts_data.filter(j => j.forecaster == d.forecaster).length
            })
            var forecasts_avg_rmse = forecasters.map((d, i) => {
                return {
                    forecast: d.forecaster,
                    rmse: Math.sqrt(d3.sum(forecasts_data.filter(j => j.forecaster == d.forecaster), d => Math.pow(d.rmse, 2)) / flength[i]),
                }
            })

            pollsters_avg_rmse.sort((a, b) => a.mr_error - b.mr_error)
            forecasts_avg_rmse.sort((a, b) => a.rmse - b.rmse)

            var qual_polls = pollsters_avg_rmse.filter(d => d.polls >= num_qual_polls)


            pollsters_avg_rmse.forEach((d, i) => {
                d.rank = i + 1
                return d;
            })

            pollsters_avg_rmse.sort(function (a, b) {
                a = a.pollster.toLowerCase();
                b = b.pollster.toLowerCase();

                return a < b ? -1 : a > b ? 1 : 0;
            });



            forecasts_avg_rmse.forEach((d, i) => {
                d.rank = i + 1
                return d;
            })


            qual_polls.forEach((d, i) => {
                d.rank = i + 1
                return d;
            })


            var z = d3.scaleLinear()
                .domain([0, d3.max(pollsters_avg_rmse, d => d.rmse)])
                .range(["white", "#FD363F"])

            var f = d3.scaleLinear()
                .domain([3, d3.max(forecasts_avg_rmse, d => d.rmse)])
                .range(["white", "#FD363F"])

            var mr = d3.scaleLinear()
                .domain(d3.extent(pollsters_avg_rmse, d => d.mr_error))
                .range(["white", "#FD363F"])

            var height = qual_polls.length * 50 + 30

            var qual = d3.select("#qualpollsters").append("svg")
                .attr("viewBox", "0 0 800 " + height)

            qual.selectAll("rect")
                .data(qual_polls)
                .enter()
                .append("rect")
                .attr("fill", d => z(d.rmse))
                .attr("x", 550)
                .attr("y", (d, i) => i * 50 + 30)
                .attr("width", 100)
                .attr("height", 50);

            qual.selectAll("d")
                .data(qual_polls)
                .enter()
                .append("rect")
                .attr("fill", d => mr(d.mr_error))
                .attr("x", 450)
                .attr("y", (d, i) => i * 50 + 30)
                .attr("width", 100)
                .attr("height", 50)

            qual.selectAll("topline")
                .data(qual_polls)
                .enter()
                .append("text")
                .text(d => numberformat(d.rmse))
                .attr("x", 600)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 25)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            qual.selectAll("topline")
                .data(qual_polls)
                .enter()
                .append("text")
                .text(d => numberformat(d.mr_error))
                .attr("x", 500)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 25)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            qual.selectAll("topline")
                .data(qual_polls)
                .enter()
                .append("text")
                .text(d => d.pollster)
                .attr("x", 100)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            qual.selectAll("topline")
                .data(qual_polls)
                .enter()
                .append("text")
                .text(d => d.rank)
                .attr("x", 50)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            qual.selectAll("topline")
                .data(qual_polls)
                .enter()
                .append("line")
                .attr("x1", 1000)
                .attr("x2", 000)
                .attr("y1", (d, i) => i * 50 + 30)
                .attr("y2", (d, i) => i * 50 + 30)
                .attr("stroke", "grey")
                .attr("stroke-width", 1)

            qual.selectAll("topline")
                .data(qual_polls)
                .enter()
                .append("text")
                .text(d => d.polls)
                .attr("x", 720)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            qual.append("text")
                .text("Rank")
                .attr("x", 50)
                .attr("y", 15)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            qual.append("text")
                .text("Pollster")
                .attr("x", 100)
                .attr("y", 15)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            qual.append("text")
                .text("Mean Reverted")
                .attr("x", 500)
                .attr("y", 10)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            qual.append("text")
                .text("Error")
                .attr("x", 500)
                .attr("y", 24)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            qual.append("text")
                .text("RMSE")
                .attr("x", 600)
                .attr("y", 15)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            qual.append("text")
                .text("# of Polls")
                .attr("x", 720)
                .attr("y", 15)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            qual.append("line")
                .attr("x1", 1000)
                .attr("x2", 000)
                .attr("y1", 30)
                .attr("y2", 30)
                .attr("stroke", "black")
                .attr("stroke-width", 1.5)


            var fore = d3.select("#nationalforecasts").append("svg")
                .attr("viewBox", "0 0 800 350")

            fore.selectAll("rect")
                .data(forecasts_avg_rmse)
                .enter()
                .append("rect")
                .attr("fill", d => f(d.rmse))
                .attr("x", 650)
                .attr("y", (d, i) => i * 50 + 30)
                .attr("width", 100)
                .attr("height", 50);



            fore.selectAll("topline")
                .data(forecasts_avg_rmse)
                .enter()
                .append("text")
                .text(d => numberformat(d.rmse))
                .attr("x", 700)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 25)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")




            fore.selectAll("topline")
                .data(forecasts_avg_rmse)
                .enter()
                .append("a")
                .attr("href", d => flinks[fname.indexOf(d.forecast)])
                .append("text")
                .text(d => d.forecast)
                .attr("x", 100)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")
                .attr("text-decoration", "underline")

            fore.selectAll("topline")
                .data(forecasts_avg_rmse)
                .enter()
                .append("text")
                .text(d => d.rank)
                .attr("x", 50)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            fore.selectAll("topline")
                .data(forecasts_avg_rmse)
                .enter()
                .append("line")
                .attr("x1", 1000)
                .attr("x2", 000)
                .attr("y1", (d, i) => i * 50 + 30)
                .attr("y2", (d, i) => i * 50 + 30)
                .attr("stroke", "grey")
                .attr("stroke-width", 1)
            fore.append("text")
                .text("Rank")
                .attr("x", 50)
                .attr("y", 15)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            fore.append("text")
                .text("Pollster")
                .attr("x", 100)
                .attr("y", 15)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")




            fore.append("text")
                .text("RMSE")
                .attr("x", 700)
                .attr("y", 15)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")



            fore.append("line")
                .attr("x1", 1000)
                .attr("x2", 000)
                .attr("y1", 30)
                .attr("y2", 30)
                .attr("stroke", "black")
                .attr("stroke-width", 1.5)

            var height2 = pollsters_avg_rmse.length * 50 + 30



            var all = d3.select("#allpollsters").append("svg")
                .attr("viewBox", "0 0 800 " + height2)

            all.selectAll("rect")
                .data(pollsters_avg_rmse)
                .enter()
                .append("rect")
                .attr("fill", d => z(d.rmse))
                .attr("x", 550)
                .attr("y", (d, i) => i * 50 + 30)
                .attr("width", 100)
                .attr("height", 50);

            all.selectAll("d")
                .data(pollsters_avg_rmse)
                .enter()
                .append("rect")
                .attr("fill", d => mr(d.mr_error))
                .attr("x", 450)
                .attr("y", (d, i) => i * 50 + 30)
                .attr("width", 100)
                .attr("height", 50)

            all.selectAll("topline")
                .data(pollsters_avg_rmse)
                .enter()
                .append("text")
                .text(d => numberformat(d.rmse))
                .attr("x", 600)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 25)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            all.selectAll("topline")
                .data(pollsters_avg_rmse)
                .enter()
                .append("text")
                .text(d => numberformat(d.mr_error))
                .attr("x", 500)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 25)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            all.selectAll("topline")
                .data(pollsters_avg_rmse)
                .enter()
                .append("text")
                .text(d => d.pollster)
                .attr("x", 100)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            all.selectAll("topline")
                .data(pollsters_avg_rmse)
                .enter()
                .append("text")
                .text(d => d.rank)
                .attr("x", 50)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            all.selectAll("topline")
                .data(pollsters_avg_rmse)
                .enter()
                .append("line")
                .attr("x1", 1000)
                .attr("x2", 000)
                .attr("y1", (d, i) => i * 50 + 30)
                .attr("y2", (d, i) => i * 50 + 30)
                .attr("stroke", "grey")
                .attr("stroke-width", 1)

            all.selectAll("topline")
                .data(pollsters_avg_rmse)
                .enter()
                .append("text")
                .text(d => d.polls)
                .attr("x", 720)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            all.append("text")
                .text("Rank")
                .attr("x", 50)
                .attr("y", 15)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            all.append("text")
                .text("Pollster")
                .attr("x", 100)
                .attr("y", 15)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            all.append("text")
                .text("Mean Reverted")
                .attr("x", 500)
                .attr("y", 10)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            all.append("text")
                .text("Error")
                .attr("x", 500)
                .attr("y", 24)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            all.append("text")
                .text("RMSE")
                .attr("x", 600)
                .attr("y", 15)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            all.append("text")
                .text("# of Polls")
                .attr("x", 720)
                .attr("y", 15)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            all.append("line")
                .attr("x1", 1000)
                .attr("x2", 000)
                .attr("y1", 30)
                .attr("y2", 30)
                .attr("stroke", "black")
                .attr("stroke-width", 1.5)

            var statepolls = polls_data.filter(d => d.state == key_state)
            var stateforecasts = forecasts_data.filter(d => d.state == key_state)
            var height5 = statepolls.length * 50 + 30

            var stp = d3.select("#pollsters").append("svg")
                .attr("viewBox", "100 0 800 " + height5)

            stp.selectAll("rect")
                .data(statepolls)
                .enter()
                .append("rect")
                .attr("fill", d => z(d.rmse))
                .attr("x", 800)
                .attr("y", (d, i) => i * 50 + 30)
                .attr("width", 100)
                .attr("height", 50);

            stp.selectAll("d")
                .data(statepolls)
                .enter()
                .append("rect")
                .attr("fill", d => mr(d.mean_reverted_error))
                .attr("x", 700)
                .attr("y", (d, i) => i * 50 + 30)
                .attr("width", 100)
                .attr("height", 50)

            stp.selectAll("topline")
                .data(statepolls)
                .enter()
                .append("text")
                .text(d => numberformat(d.rmse))
                .attr("x", 850)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 25)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            stp.selectAll("topline")
                .data(statepolls)
                .enter()
                .append("text")
                .text(d => numberformat(d.mean_reverted_error))
                .attr("x", 750)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 25)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            stp.selectAll("topline")
                .data(statepolls)
                .enter()
                .append("text")
                .text(d => d.pollster)
                .attr("x", 100)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            stp.selectAll("topline")
                .data(statepolls)
                .enter()
                .append("line")
                .attr("x1", 1000)
                .attr("x2", 000)
                .attr("y1", (d, i) => i * 50 + 30)
                .attr("y2", (d, i) => i * 50 + 30)
                .attr("stroke", "grey")
                .attr("stroke-width", 1)


            stp.append("text")
                .text("Pollster")
                .attr("x", 100)
                .attr("y", 15)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            stp.append("text")
                .text("Mean Reverted")
                .attr("x", 750)
                .attr("y", 10)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            stp.append("text")
                .text("Error")
                .attr("x", 750)
                .attr("y", 24)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            stp.append("text")
                .text("RMSE")
                .attr("x", 850)
                .attr("y", 15)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            stp.append("line")
                .attr("x1", 900)
                .attr("x2", 000)
                .attr("y1", 30)
                .attr("y2", 30)
                .attr("stroke", "black")
                .attr("stroke-width", 1.5)

            var stf = d3.select("#forecasts").append("svg")
                .attr("viewBox", "100 0 800 350")

            stf.selectAll("rect")
                .data(stateforecasts)
                .enter()
                .append("rect")
                .attr("fill", d => z(d.rmse))
                .attr("x", 800)
                .attr("y", (d, i) => i * 50 + 30)
                .attr("width", 100)
                .attr("height", 50);

            stf.selectAll("d")
                .data(stateforecasts)
                .enter()
                .append("rect")
                .attr("fill", d => mr(d.mean_reverted_error))
                .attr("x", 700)
                .attr("y", (d, i) => i * 50 + 30)
                .attr("width", 100)
                .attr("height", 50)

            stf.selectAll("topline")
                .data(stateforecasts)
                .enter()
                .append("text")
                .text(d => numberformat(d.rmse))
                .attr("x", 850)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 25)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            stf.selectAll("topline")
                .data(stateforecasts)
                .enter()
                .append("text")
                .text(d => numberformat(d.mean_reverted_error))
                .attr("x", 750)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 25)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            stf.selectAll("topline")
                .data(stateforecasts)
                .enter()
                .append("a")
                .attr("href", d => flinks[fname.indexOf(d.forecaster)])
                .append("text")
                .text(d => d.forecaster)
                .attr("x", 100)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")
                .attr("text-decoration", "underline")


            stf.selectAll("topline")
                .data(stateforecasts)
                .enter()
                .append("line")
                .attr("x1", 1000)
                .attr("x2", 000)
                .attr("y1", (d, i) => i * 50 + 30)
                .attr("y2", (d, i) => i * 50 + 30)
                .attr("stroke", "grey")
                .attr("stroke-width", 1)


            stf.append("text")
                .text("Pollster")
                .attr("x", 100)
                .attr("y", 15)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            stf.append("text")
                .text("Mean Reverted")
                .attr("x", 750)
                .attr("y", 10)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            stf.append("text")
                .text("Error")
                .attr("x", 750)
                .attr("y", 24)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            stf.append("text")
                .text("RMSE")
                .attr("x", 850)
                .attr("y", 15)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            stf.append("line")
                .attr("x1", 900)
                .attr("x2", 000)
                .attr("y1", 30)
                .attr("y2", 30)
                .attr("stroke", "black")
                .attr("stroke-width", 1.5)


            var height3 = states.length * 50 + 30
            var st = d3.select("#state").append("svg")
                .attr("viewBox", "0 0 800 " + height3)

            st.selectAll("rect")
                .data(states)
                .enter()
                .append("a")
                .attr("href", (d) => d.state)
                .append("text")
                .text((d) => d.state)
                .attr("x", 50)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")
                .on('mouseover', function (d) {

                    d3.select(this)
                        .attr("text-decoration", "underline")
                })
                .on('mouseout',
                    function (d) {
                        d3.select(this)
                            .attr("text-decoration", "none")

                    });


            st.selectAll("rect")
                .data(states_results)
                .enter()
                .append("a")
                .attr("href", (d) => d.state)
                .append("text")
                .text((d) => d.state)
                .attr("x", 50)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            st.selectAll("rect")
                .data(states_results)
                .enter()
                .append("text")
                .text((d) => d.pollster)
                .attr("x", 400)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            st.selectAll("rect")
                .data(states_results)
                .enter()
                .append("text")
                .text((d) => d.forecast)
                .attr("x", 600)
                .attr("y", (d, i) => i * 50 + 60)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")


            st.append("text")
                .text("Best Poll")
                .attr("x", 400)
                .attr("y", 15)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            st.append("text")
                .text("Best Forecast")
                .attr("x", 600)
                .attr("y", 15)
                .attr("font-size", 15)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")

            st.append("text")
                .text("State")
                .attr("x", 50)
                .attr("y", 15)
                .attr("font-size", 20)
                .attr("fill", "black")
                .attr("text-anchor", "start")
                .attr("font-weight", 700)
                .attr("dominant-baseline", "middle")
            st.append("line")
                .attr("x1", 1000)
                .attr("x2", 000)
                .attr("y1", 30)
                .attr("y2", 30)
                .attr("stroke", "black")
                .attr("stroke-width", 1.5)
        })
    })
})




