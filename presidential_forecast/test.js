var candidates = ["Trump", "Biden", "Bloomberg", "Buttigeig", "Klobuchar", "Sanders", "Steyer", "Warren"]
var timeparse = d3.timeParse("%m/%d/%y")

d3.csv("pollster-ratings.csv", pollster_ratings => {

    var pollster_names = pollster_ratings.map((d, i) => {
        return d.Pollster
    })

    var pollster_grade = pollster_ratings.map((d, i) => {
        return d["538Grade"]
    })
    var pollster_bias = pollster_ratings.map((d, i) => {
        return d.MeanRevertedBias
    })
    d3.csv("partisanlean.csv", pvi => {
        var pvi = pvi.map((d, i) => {
            return {
                state: d.state,
                pvi: d.pvi
            }
        })
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
                    bias: pollster_bias[pollster_names.indexOf(datanew[i][0].pollster)] == undefined ? "C+" : pollster_grade[pollster_names.indexOf(datanew[i][0].pollster)],
                    dem: datanew[i][0].answer,
                    gop: datanew[i][1].answer,
                    dem_pct: +datanew[i][0].pct,
                    gop_pct: +datanew[i][1].pct,
                    poll_index: datanew[i][0].state == "" ? "US" : datanew[i][0].state+ datanew[i][0].pollster,
                }
            })
            var data_new = data_new.filter(d=>d.gop =="Trump")
            
     
            
            console.log(data_new)

        })
    })
})