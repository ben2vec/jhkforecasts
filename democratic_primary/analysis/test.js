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
        "forecaster": "FiveThirtyEight Polling Avg",
        "fill": "#E5592C",
        "stroke": "#000000"
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
        "forecaster": "RealClearPolitics",
        "fill": "#E20C08",
        "stroke": "#E20C08"
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
var num_qual_polls = 2

console.log(forecasters)

d3.csv("results.csv", results => {
    results.forEach((d, i) => {
        d.election_date = parseDate(d.election_date)
        return d;
    })
    console.log(results)

    d3.csv("https://projects.jhkforecasts.com/democratic_primary/polls.csv", polls => {
        console.log(polls)

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

            var newest_poll = newest_poll.filter(d => d.recency < 35)


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

                accuracy.sort((a, b) => a.rmse - b.rmse)
                fd.push(accuracy)
            }

            var polls_data = pd.flat()
            var forecasts_data = fd.flat()
         

            var pollsters = polls_data.map((d, i) => {
                return d.pollster
            })
            console.log(polls_data)

            var ps = d3.set(pollsters).values()
          

            var avg_rmse = ps.map((d,i)=>{
                return{
                pollster : d,
                rmse: d3.mean(polls_data.filter(j=>j.pollster == d),d=>d.rmse),
                polls :d3.sum(polls_data.filter(j=>j.pollster == d),d=>d.rmse)/d3.mean(polls_data.filter(j=>j.pollster == d),d=>d.rmse),
                }
            })

            avg_rmse.sort((a,b)=>a.rmse-b.rmse)
            console.log(avg_rmse)
            var qual_polls = avg_rmse.filter(d=>d.polls>=2)
            console.log(qual_polls)
        })
    })
})
