
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
  cands.sort((a, b) => b.Vote - a.Vote)

  var rankings = cands.map((d, i) => {
    return d.Candidate
  })

  console.log(rankings)

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
          rank: z+1
        }
      })
      pollss.push(cands)
    }
    var polls = pollss[0]
    var polls = polls.concat(pollss[1])
    var polls = polls.concat(pollss[2])
    var polls = polls.concat(pollss[3])
    var polls = polls.concat(pollss[4])
    var polls = polls.concat(pollss[5])
    var polls = polls.concat(pollss[6])
    console.log(polls)
    var polls = polls.filter(d => d.weight > 2)
    console.log(polls)
    var x = d3.scaleLinear()
      .domain([0, d3.max(polls, d => d.pct)])
      .range([50, 950])
    
      var svg = d3.select("#pollspread").append("svg")
    .attr("viewBox", "0 0 1000 600")
    .append('g')

      svg.selectAll()
      .data(polls)
      .enter()
      .append("circle")
      .attr("cx",d=>x(d.pct))
      .attr("cy",d=>d.rank*75+50)
      .attr("fill","black")
      .attr("r",4)
  })
})