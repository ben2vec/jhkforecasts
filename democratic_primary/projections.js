
var parseDate = d3.timeParse("%Y-%m-%d")



var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]

var color = d3.scaleOrdinal()
  .domain(category)
  .range(["#00C181", "#FF6060", "#a4b1b5", "#FFE130", "#FF8D32", "#0091FF", "#FF2EF0", "#CD64FF", "#a4b1b5"])

d3.csv("time.csv", function (error, data) {
  var keys = data.columns.slice(1);
  var data = data.filter(function (d) { return d.state == keyState; })


  data.forEach(function (d) {
    d.date = parseDate(d.forecastdate)
    return d;
  })
  var newest_day = d3.max(data, d => d.date)

  var newest_data = data.filter(d => d.date == newest_day)


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
  console.log(cand_vote)

  var data = cand_vote
  var data = data.filter(d => d.vote > 0)
  var max_vote = d3.max(data, d => d.vote)
  var total_delegates = d3.sum(data, d => d.delegates)
  var x = d3.scaleLinear()
    .range([100, 650])
    .domain([0, max_vote])

  var demScale = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["white", "#0091FF", "#0E2C7E"]);

var svg_height = data.length*60 +50
console.log(svg_height)
    
  var svg = d3.select("#topline").append("svg")
    .attr("viewBox", "0 20 1000 "+svg_height+"" )


  var svgLegend = svg.append('g')
    .attr('class', 'gLegend')
    .attr("transform", "translate(0,50)")

  var legend = svgLegend.selectAll('.legend')
    .data(data)
    .enter().append('g')
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(0," + i * 60 + ")" })

  legend.append("text")
    .attr("class", "legend-text")
    .attr("y", 30)
    .style("fill", d => color(d.candidate))
    .attr("text-anchor", "start")
    .attr("dominant-baseline", "middle")
    .style("font-size", 25)
    .style("font-weight", 700)
    .text(d => d.candidate)

  legend.append("image")
    .attr("xlink:href", d => "https://raw.githubusercontent.com/jhkersting/home/master/" + d.candidate + "-01.png")
    .attr("y", 0)
    .attr("x", 100)
    .attr("height", 60)
    .attr("width", 60)
    .transition()
    .duration(1000)
    .attr("x", d => x(d.vote))

  legend.append("text")
    .attr("class", "legend-text")
    .attr("y", 30)
    .attr("x", 150)
    .style("fill", d => color(d.candidate))
    .attr("text-anchor", "start")
    .attr("dominant-baseline", "middle")
    .style("font-size", 20)
    .style("font-weight", 700)
    .text(d => d.vote + "%")
    .transition()
    .duration(1000)
    .attr("x", d => x(d.vote) + 70)

  legend.append("rect")
    .attr("class", "lineHoverRect")
    .attr("y", 0)
    .attr("x", 810)
    .attr("width", 80)
    .attr("height", 50)
    .attr("rx", 10)
    .style("fill", d => demScale((d.delegates/total_delegates)*100))

    legend.append("rect")
    .attr("class", "lineHoverRect")
    .attr("y", 0)
    .attr("x", 910)
    .attr("width", 80)
    .attr("height", 50)
    .attr("rx", 10)
    .style("fill", d => demScale(d.win))

  legend.append("text")
    .attr("class", "legend-text")
    .attr("y", 30)
    .attr("x", 850)
    .style("fill", "black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", 20)
    .style("font-weight", 700)
    .text(d => +d.win + "%")


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
    .attr("x", 500)
    .style("fill", "Black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", 20)
    .style("font-weight", 700)
    .text("Projected Vote")

  svg.append("text")
    .attr("class", "legend-text")
    .attr("y", 30)
    .attr("x", 850)
    .style("fill", "Black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("font-size", 15)
    .style("font-weight", 700)
    .text("Win " + keyState)

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

  svg.append("line")
    .attr("x1", 0)
    .attr("x2", 1000)
    .attr("y1", 45)
    .attr("y2", 45)
    .attr("stroke", "grey")



})

