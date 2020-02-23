var parseTime = d3.timeParse("%Y-%m-%d");

d3.csv("https://raw.githubusercontent.com/jhkersting/jhkforecasts/master/democratic_primary/poll_accuracy.csv", function (data) {

  var data = data.filter(function (d) { return d.State == keyState; });
  var data = data.filter(function (d) { return d.type != "forecast"; });

  var data = data.map(d => {
    return {
      name: d.name,
      date: parseTime(d.Date),
      first: d.first,
      second: d.second,
      third: d.third,
      fourth: d.fourth,
      fifth: d.fifth,
      RMSE: d.RMSE,
    }
  })

  data.sort((a, b) => a.RMSE - b.RMSE)

  var topline = data.slice(0, 2)

  var height = data.length * 30 + 50

  var data = data.splice(2, data.length + 1)

  var z = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.RMSE)])
    .range(["white", "#FF6060"])

  var svg = d3.select("#pollsters").append("svg")
    .attr("viewBox", "0 0 1000 " + height)

  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("rect")
    .attr("fill", d => z(d.RMSE))
    .attr("x", 850)
    .attr("y", (d, i) => i * 30 + 80)
    .attr("width", 100)
    .attr("height", 30)


  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", 1000)
    .attr("x2", 000)
    .attr("y1", (d, i) => i * 30 + 110)
    .attr("y2", (d, i) => i * 30 + 110)
    .attr("stroke", "grey")

  svg.append("line")
    .attr("x1", 1000)
    .attr("x2", 000)
    .attr("y1", 80)
    .attr("y2", 80)
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)

  svg.selectAll("topline")
    .data(topline)
    .enter()
    .append("text")
    .text(d => d.first)
    .attr("x", 400)
    .attr("y", (d, i) => i * 30 + 40)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(topline)
    .enter()
    .append("text")
    .text(d => d.second)
    .attr("x", 475)
    .attr("y", (d, i) => i * 30 + 40)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(topline)
    .enter()
    .append("text")
    .text(d => d.third)
    .attr("x", 550)
    .attr("y", (d, i) => i * 30 + 40)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(topline)
    .enter()
    .append("text")
    .text(d => d.fourth)
    .attr("x", 625)
    .attr("y", (d, i) => i * 30 + 40)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(topline)
    .enter()
    .append("text")
    .text(d => d.fifth)
    .attr("x", 700)
    .attr("y", (d, i) => i * 30 + 40)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")


  svg.selectAll("topline")
    .data(topline)
    .enter()
    .append("text")
    .text(d => d.sixth)
    .attr("x", 775)
    .attr("y", (d, i) => i * 30 + 40)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.append("text")
    .text("RMSE")
    .attr("x", 900)
    .attr("y", 70)
    .attr("font-size", 20)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.append("text")
    .text("Pollster")
    .attr("x", 30)
    .attr("y", 70)
    .attr("font-size", 20)
    .attr("fill", "black")
    .attr("text-anchor", "start")

  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.name)
    .attr("x", 30)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")

  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.first)
    .attr("x", 400)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.second)
    .attr("x", 475)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.third)
    .attr("x", 550)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")


  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.fourth)
    .attr("x", 625)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.fifth)
    .attr("x", 700)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.sixth)
    .attr("x", 775)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.RMSE)
    .attr("x", 900)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
})

var forecasts = ["JHK Forecasts", "RealClearPolitics", "Lean Tossup", "#10at10", "FiveThirtyEight Polling Avg", "FiveThirtyEight Forecast"]
var forecastslinks = ["https://projects.jhkforecasts.com/democratic_primary/", "https://www.realclearpolitics.com/epolls/2020/president/us/2020_democratic_presidential_nomination-6730.html", "https://leantossup.ca/2020-democratic-presidential-primary/", "https://twitter.com/djjohnso", "https://projects.fivethirtyeight.com/polls/president-primary-d/national/", "https://projects.fivethirtyeight.com/2020-primary-forecast/"]

d3.csv("https://raw.githubusercontent.com/jhkersting/jhkforecasts/master/democratic_primary/poll_accuracy.csv", function (data) {

  var data = data.filter(function (d) { return d.State == keyState; });
  var data = data.filter(function (d) { return d.type != "pollster"; });

  var data = data.map(d => {
    return {
      name: d.name,
      date: parseTime(d.Date),
      first: d.first,
      second: d.second,
      third: d.third,
      fourth: d.fourth,
      fifth: d.fifth,
      RMSE: d.RMSE,
      link: forecastslinks[forecasts.indexOf(d.name)]
    }
  })
  console.log(data)
  data.sort((a, b) => a.RMSE - b.RMSE)

  var topline = data.slice(0, 2)

  var height = data.length * 30 + 50

  var data = data.splice(2, data.length + 1)

  var z = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.RMSE)])
    .range(["white", "#FF6060"])

  var svg = d3.select("#forecasters").append("svg")
    .attr("viewBox", "0 0 1000 " + height)

  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("rect")
    .attr("fill", d => z(d.RMSE))
    .attr("x", 850)
    .attr("y", (d, i) => i * 30 + 80)
    .attr("width", 100)
    .attr("height", 30)


  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", 1000)
    .attr("x2", 000)
    .attr("y1", (d, i) => i * 30 + 110)
    .attr("y2", (d, i) => i * 30 + 110)
    .attr("stroke", "grey")

  svg.append("line")
    .attr("x1", 1000)
    .attr("x2", 000)
    .attr("y1", 80)
    .attr("y2", 80)
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)

  svg.selectAll("topline")
    .data(topline)
    .enter()
    .append("text")
    .text(d => d.first)
    .attr("x", 400)
    .attr("y", (d, i) => i * 30 + 40)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(topline)
    .enter()
    .append("text")
    .text(d => d.second)
    .attr("x", 475)
    .attr("y", (d, i) => i * 30 + 40)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(topline)
    .enter()
    .append("text")
    .text(d => d.third)
    .attr("x", 550)
    .attr("y", (d, i) => i * 30 + 40)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(topline)
    .enter()
    .append("text")
    .text(d => d.fourth)
    .attr("x", 625)
    .attr("y", (d, i) => i * 30 + 40)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(topline)
    .enter()
    .append("text")
    .text(d => d.fifth)
    .attr("x", 700)
    .attr("y", (d, i) => i * 30 + 40)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
  svg.selectAll("topline")
    .data(topline)
    .enter()
    .append("text")
    .text(d => d.sixth)
    .attr("x", 775)
    .attr("y", (d, i) => i * 30 + 40)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.append("text")
    .text("RMSE")
    .attr("x", 900)
    .attr("y", 70)
    .attr("font-size", 20)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.append("text")
    .text("Pollster")
    .attr("x", 30)
    .attr("y", 70)
    .attr("font-size", 20)
    .attr("fill", "black")
    .attr("text-anchor", "start")

  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("a")
    .attr("href", d => d.link)
    .append("text")
    .text(d => d.name)
    .attr("x", 30)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")

  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.first)
    .attr("x", 400)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.second)
    .attr("x", 475)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.third)
    .attr("x", 550)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")


  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.fourth)
    .attr("x", 625)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.fifth)
    .attr("x", 700)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.sixth)
    .attr("x", 775)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")

  svg.selectAll("topline")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.RMSE)
    .attr("x", 900)
    .attr("y", (d, i) => i * 30 + 100)
    .attr("font-size", 15)
    .attr("fill", "black")
    .attr("text-anchor", "middle")









})