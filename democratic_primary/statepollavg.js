var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]
var parseDate = d3.timeParse("%Y-%m-%d")
var numberformat = d3.format(".1f")
var color = d3.scaleOrdinal()
  .domain(category)
  .range(["#00C181", "#a4b1b5", "#a4b1b5", "#a4b1b5", "#a4b1b5", "#3E5AA9", "#a4b1b5", "#a4b1b5", "#a4b1b5"])

d3.csv("simulator.csv", data => {
  var data = data.filter(d => d.state == keyState)
  var cands = [
    { Candidate: "Biden", Vote: +data[0].Bidenproj },
    { Candidate: "Bloomberg", Vote: +data[0].Bloombergproj },
    { Candidate: "Buttigieg", Vote: +data[0].Buttigiegproj },
    { Candidate: "Klobuchar", Vote: +data[0].Klobucharproj },
    { Candidate: "Sanders", Vote: +data[0].Sandersproj },
    { Candidate: "Steyer", Vote: +data[0].Steyerproj },
    { Candidate: "Warren", Vote: +data[0].Warrenproj },
  ]
  console.log(cands)
  cands.sort((a, b) => b.Vote - a.Vote)

  var rankings = cands.map((d, i) => {
    return d.Candidate
  })

  console.log(rankings)
  d3.csv("time.csv", function (error, data) {
    var keys = data.columns.slice(1);
    var data = data.filter(function (d) { return d.state == keyState; })


    data.forEach(function (d) {
      d.date = parseDate(d.forecastdate)
      d.primarydate = parseDate(d.primarydate)
      return d;
    })
    var newest_day = d3.max(data, d => d.date)
    var primary_date = data[0].primarydate
    var newest_data = data.filter(d => d.date == newest_day)
    var completed = primary_date <= newest_day ? 1 : 0
   
    var vote = keys.filter(f => f.includes("vote"))
    var win = keys.filter(f => f.includes("win"))
    var del = keys.filter(f => f.includes("del"))
    var cand_vote = vote.map(function (d) {
      return {
        candidate: d,
        vote: newest_data.map((i) => +i[d]),
      };
    });
    var cand_win = win.map(function (d) {
      return {
        win: newest_data.map((i) => +i[d]),
      };
    });

    var cand_del = del.map(function (d) {
      return {
        del: newest_data.map((i) => +i[d]),
      };
    });


    cand_vote.forEach(function (d, i) {
      d.candidate = d.candidate.slice(0, -4)
      d.candidate = d.candidate[0].toUpperCase() + d.candidate.substring(1)
      d.vote = d.vote[0]
      d.win = cand_win[i].win[0]
      d.delegates = cand_del[i].del[0]
      return d;
    })


    cand_vote.sort((a, b) => b.vote - a.vote)
    cand_vote.slice(0, 7)
    console.log(cand_vote)



    d3.csv("polls.csv", polls => {

      var polls = polls.filter(d => d.State == keyState)

      var pollss = []
      for (let z = 0; z < rankings.length; z++) {

        var cands = polls.map((d, i) => {
          return {
            state: d.State,
            pollster: d.Pollster,
            grade: d.Grade,
            sample: d.Sample,
            date: d.Date,
            weight: +d.weight,
            candidate: rankings[z],
            pct: +d[rankings[z]],
            rank: z + 1,
            pctweight: (+d[rankings[z]] * +d.weight)/100
          }
        })

        var cands = cands.filter(d=>d.pct>0)
        pollss.push(cands)
      }



      var polls = pollss[0]
      var polls = polls.concat(pollss[1])
      var polls = polls.concat(pollss[2])
      var polls = polls.concat(pollss[3])
      var polls = polls.concat(pollss[4])
      var polls = polls.concat(pollss[5])
      var polls = polls.concat(pollss[6])

      var polls = polls.filter(d => d.weight > 2)
      console.log(polls)
      var candmax = []
      for (let z = 0; z < rankings.length; z++) {
        var max = {
          candidate: rankings[z],
          max: d3.max(polls.filter(d => d.candidate == rankings[z]), d => d.pct),
          rank: polls.filter(d => d.candidate == rankings[z])[0].rank,
          avg: (d3.sum(polls.filter(d => d.candidate == rankings[z]), d => d.pctweight)) / d3.sum(polls.filter(d => d.candidate == rankings[z]), d => d.weight)*100,
        }
        candmax.push(max)
      }
      console.log(candmax)

      var x = d3.scaleLinear()
        .domain([0, d3.max(polls, d => d.pct)]).nice()
        .range([80, 920])

      var opacity = d3.scaleLinear()
        .domain([0, 50])
        .range([.2, .8])

      var svg = d3.select("#pollavg").append("svg")
        .attr("viewBox", "0 0 1000 600")
        .append('g')

      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (550) + ")")
        .call(d3.axisBottom(x).tickSize(-520).ticks(4))
        .call(g => {

          g.selectAll("text")
            .style("text-anchor", "right")
            .attr("y", 10)
            .attr('fill', 'black')
            .attr('font-size', 15)
            .attr('font-weight', 800)
          g.selectAll("line")
            .attr("opacity", .5)
            .attr("stroke", "grey")


          g.select(".domain")
            .remove()


        })

      svg.selectAll()
        .data(candmax)
        .enter()
        .append("text")
        .text(d => d.candidate)
        .attr("x", d => x(d.max)+10)
        .attr("y", d => d.rank * 75+2)
        .attr("fill", "Black")
        .attr('font-size', 20)
        .attr('font-weight', 800)
        .style("text-anchor", "start")
        .attr("dominant-baseline","middle")


        svg.selectAll()
        .data(candmax)
        .enter()
        .append("line")
        .attr("x1", d => x(d.avg)-1)
        .attr("x2", d => x(d.avg)-1)
        .attr("y1", d => d.rank * 75-10)
        .attr("y2", d => d.rank * 75+10)
        .attr("stroke","black")
        .attr("stroke-width",2)


        svg.append("text")
        .text("Polling avg.")
        .attr("x",x(candmax[0].avg))
        .attr("y",20 )
        .attr("fill", "Black")
        .attr('font-size', 15)
        .attr('font-weight', 800)
        .style("text-anchor", "middle")
        .attr("dominant-baseline","middle")


        svg.append("text")
        .text("*The darker the circle, the more weight they hold.*")
        .attr("x",20)
        .attr("y",20 )
        .attr("fill", "Black")
        .attr('font-size', 20)
        .attr('font-weight', 500)
        .style("text-anchor", "start")
        .attr("dominant-baseline","middle")

      svg.selectAll()
        .data(candmax)
        .enter()
        .append("text")
        .text(d => numberformat(d.avg))
        .attr("x", d => x(d.avg))
        .attr("y", d => d.rank * 75 -20)
        .attr("fill", "Black")
        .attr('font-size', 20)
        .attr('font-weight', 800)
        .style("text-anchor", "middle")



      svg.selectAll()
        .data(polls)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.pct))
        .attr("cy", d => d.rank * 75)
        .attr("fill", d => color(d.candidate))
        .attr("r", 6)
        .attr("opacity", d => opacity(d.weight))
        svg.selectAll()
        .data(candmax)
        .enter()
        .append("line")
        .attr("x1", d => x(d.avg)-1)
        .attr("x2", d => x(d.avg)-1)
        .attr("y1", d => d.rank * 75-10)
        .attr("y2", d => d.rank * 75+10)
        .attr("stroke","black")
        .attr("stroke-width",2)
    })
  })
})