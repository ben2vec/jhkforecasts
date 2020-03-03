
var parseDate = d3.timeParse("%Y-%m-%d")
var numberformat = d3.format(".1f")


var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]

var color = d3.scaleOrdinal()
  .domain(category)
  .range(["#00C181", "#FF6060", "#a4b1b5", "#FFE130", "#FF8D32", "#0091FF", "#FF2EF0", "#AF0BFF", "#a4b1b5"])

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
  var completed = primary_date >= newest_day  ? 0 : 1
  console.log(completed)
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


  cand_vote.sort((a, b) => b.win - a.win)
  cand_vote.sort((a, b) => b.delegates - a.delegates)
  console.log(cand_vote)

  var data = cand_vote
  var data = data.filter(d => d.vote > 0)
  var max_vote = completed == 1 ? d3.max(data, d => d.win) : 0
  var max_proj = d3.max(data, d => d.vote)
  var max = max_vote > max_proj ?max_vote:max_proj
  var total_delegates = d3.sum(data, d => d.delegates)
  var x = d3.scaleLinear()
    .range([100, 650])
    .domain([0, max])

  var demScale = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["white", "#0091FF", "#0E2C7E"]);

  var svg_height = data.length * 60 + 50
  console.log(svg_height)

  var svg = d3.select("#topline").append("svg")
    .attr("viewBox", "0 0 1000 " + svg_height + "")


  var svgLegend = svg.append('g')
    .attr('class', 'gLegend')
    .attr("transform", "translate(0,50)")

  var legend = svgLegend.selectAll('.legend')
    .data(data)
    .enter().append('g')
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(0," + i * 60 + ")" })

  legend.append("image")
    .attr("xlink:href", d => "https://raw.githubusercontent.com/jhkersting/home/master/" + d.candidate + "-01.png")
    .attr("y", 0)
    .attr("x", 30)
    .attr("height", 60)
    .attr("width", 60)

  legend.append("circle")
    .attr("cy", 30)
    .attr("cx", 100)
    .attr("fill", "white")
    .attr("stroke", d => color(d.candidate))
    .attr("stroke-width", 3)
    .attr("r", "5")
    .transition()
    .duration(1000)
    .attr("cx", d => x(d.vote))

  legend.append("circle")
    .attr("cy", 30)
    .attr("cx", 100)
    .attr("fill", d => completed==1?color(d.candidate):"none")
    .attr("r", "5")
    .transition()
    .duration(1000)
    .attr("cx", d => x(d.win))

  legend.append("rect")
    .attr("class", "lineHoverRect")
    .attr("y", 0)
    .attr("x", 810)
    .attr("width", 80)
    .attr("height", 50)
    .attr("rx", 10)
    .style("fill", d =>demScale(d.win))

  legend.append("rect")
    .attr("class", "lineHoverRect")
    .attr("y", 0)
    .attr("x", 910)
    .attr("width", 80)
    .attr("height", 50)
    .attr("rx", 10)
    .style("fill", d =>d.del==0?"white" :demScale((d.delegates / total_delegates) * 100))
  legend.append("rect")
    .attr("class", "lineHoverRect")
    .attr("y", 0)
    .attr("x", 710)
    .attr("width", 80)
    .attr("height", 50)
    .attr("rx", 10)
    .style("fill", d => demScale(d.vote))

  legend.append("text")
    .attr("class", "legend-text")
    .attr("y", 30)
    .attr("x", 850)
    .style("fill", "black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", 20)
    .style("font-weight", 700)
    .text(d => numberformat(d.win) + "%")

  legend.append("text")
    .attr("class", "legend-text")
    .attr("y", 30)
    .attr("x", 750)
    .style("fill", "black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", 20)
    .style("font-weight", 700)
    .text(d => numberformat(d.vote) + "%")


  legend.append("text")
    .attr("class", "legend-text")
    .attr("y", 30)
    .attr("x", 950)
    .style("fill", "Black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", 20)
    .style("font-weight", 700)
    .text(d => d.delegates)

  svg.append("text")
    .attr("class", "legend-text")
    .attr("y", 30)
    .attr("x", 750)
    .style("fill", "Black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", 15)
    .style("font-weight", 700)
    .text("Vote")
  svg.append("text")
    .attr("class", "legend-text")
    .attr("y", 10)
    .attr("x", 750)
    .style("fill", "Black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", 15)
    .style("font-weight", 700)
    .text("Projected")

  svg.append("text")
    .attr("class", "legend-text")
    .attr("y", 30)
    .attr("x", 850)
    .style("fill", "Black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", 15)
    .style("font-weight", 700)
    .text(completed == 1 ? "Vote" : keyState)
  svg.append("text")
    .attr("class", "legend-text")
    .attr("y", 10)
    .attr("x", 850)
    .style("fill", "Black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", 15)
    .style("font-weight", 700)
    .text(completed == 1 ? "Actual" : "Win")

  svg.append("text")
    .attr("class", "legend-text")
    .attr("y", 10)
    .attr("x", 950)
    .style("fill", "Black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", 15)
    .style("font-weight", 700)
    .text(completed == 1 ? "" : "Projected")

  svg.append("text")
    .attr("class", "legend-text")
    .attr("y", 30)
    .attr("x", 950)
    .style("fill", "Black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", 15)
    .style("font-weight", 700)
    .text("Delegates")

    svg.append("text")
    .attr("class", "legend-text")
    .attr("y", 30)
    .attr("x", 150)
    .style("fill", "Black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", 15)
    .style("font-weight", 700)
    .text("Projected Vote")

    svg.append("circle")
    .attr("cy", 27.5)
    .attr("cx", 220)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    .attr("r", "5")

    svg.append("text")
    .attr("class", "legend-text")
    .attr("y", 30)
    .attr("x", 350)
    .style("fill", "Black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", 15)
    .style("font-weight", 700)
    .text(completed==1?"Actual Vote":"")

    svg.append("circle")
    .attr("cy", 27.5)
    .attr("cx", 420)
    .attr("fill", completed==1?"black":"white")
  
    .attr("r", "5")

  svg.append("line")
    .attr("x1", 0)
    .attr("x2", 1000)
    .attr("y1", 45)
    .attr("y2", 45)
    .attr("stroke", "grey")



})

