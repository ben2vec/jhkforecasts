

var parse_date = d3.timeParse("%m/%d/%y")
        var parse_date_time = d3.timeParse("%m/%d/%y %H:%M")
        var candidates = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Gabbard", "Harris", "Klobuchar", "O_Rourke", "Sanders", "Steyer", "Warren", "Yang"]
        var drop_out = ["", "", new Date(2020, 0, 13), "", new Date(2019, 11, 3), "", new Date(2019, 10, 1), "", "", "", ""]
        var entrance = [new Date(2019, 0, 11), new Date(2020, 10, 0), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11),]

        var candidate_campaign_dates = candidates.map(function (d, i) {
            return {
                candidate: d,
                date: drop_out[i],
                entrance: entrance[i]
            };
        });

        candidate_campaign_dates.join()

        d3.csv("pollingtest.csv", function (data) {

            var data_nested = d3.nest()
                .key(d => d.question_id)
                .entries(data)

            var polls_raw = []

            for (let i = 0; i < data_nested.length; i++) {
                var poll_response = []
                for (let j = 0; j < candidates.length; j++) {

                    var poll_candidate = data_nested[i].values.filter(d => d.answer == candidates[j])

                    var poll_answer = poll_candidate.map((d) => {
                        return +d.pct
                    })

                    poll_response.push(poll_answer)
                }

                var new_poll = {
                    question_id: +data_nested[i].values[0].question_id,
                    poll_id: +data_nested[i].values[0].poll_id,
                    state: data_nested[i].values[0].state == "" ? "US" : data_nested[i].values[0].state,
                    pollster_id: +data_nested[i].values[0].pollster_id.replace(","),
                    pollster: data_nested[i].values[0].pollster,
                    sponsor_ids: +data_nested[i].values[0].sponsor_ids,
                    sponsors: data_nested[i].values[0].sponsors,
                    display_name: data_nested[i].values[0].display_name,
                    pollster_rating_id: +data_nested[i].values[0].pollster_rating_id,
                    pollster_rating_name: data_nested[i].values[0].pollster_rating_name,
                    grade: data_nested[i].values[0].fte_grade,
                    n: +data_nested[i].values[0].sample_size,
                    population: data_nested[i].values[0].population,
                    start_date: parse_date(data_nested[i].values[0].start_date),
                    end_date: parse_date(data_nested[i].values[0].start_date),
                    created_at: parse_date_time(data_nested[i].values[0].created_at),
                    url: data_nested[i].values[0].url,
                    Biden: +poll_response[0],
                    Bloomberg: +poll_response[1],
                    Booker: +poll_response[2],
                    Buttigieg: +poll_response[3],
                    Gabbard: +poll_response[4],
                    Harris: +poll_response[5],
                    Klobuchar: +poll_response[6],
                    O_Rourke: +poll_response[7],
                    Sanders: +poll_response[8],
                    Steyer: +poll_response[9],
                    Warren: +poll_response[10],
                    Yang: +poll_response[11],
                    total: d3.sum(data_nested[i].values, d => d.pct)
                }
                polls_raw.push(new_poll)
            }

            polls_raw.forEach(function (d) {
                d.n_adjusted = d.n > 4000 ? Math.pow((d.n - 4000), .2) + 27 : Math.pow(d.n, .4);
                return d;
            })
            console.log(polls_raw)


window.webkitRequestFileSystem(window.PERSISTENT , 1024*1024, SaveDatFileBro);      
navigator.webkitPersistentStorage.requestQuota(1024*1024, function() {
    window.webkitRequestFileSystem(window.PERSISTENT , 1024*1024, SaveDatFileBro);
  })

  function SaveDatFileBro(localstorage) {
    localstorage.root.getFile("info.txt", {create: true}, function(DatFile) {
      DatFile.createWriter(function(DatContent) {
        var blob = new Blob(["Lorem Ipsum"], {type: "text/plain"});
        DatContent.write(blob);
      });
    });
  }
  SaveDatFileBro("info.txt")
 





            //dont go past here
        })