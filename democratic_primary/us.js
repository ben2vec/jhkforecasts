var glines
var mouseG
var tooltip
var parseDate = d3.timeParse("%Y-%m-%d")
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

var margin = { top: 80, right: 100, bottom: 40, left: 40 }
var width = 1000 - margin.left - margin.right
var height = 400 - margin.top - margin.bottom

var lineOpacity = .9
var lineStroke = "2px"

var axisPad = 12 // axis formatting
var R = 7 //legend marker

var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]
// since Category B and E are really close to each other, assign them diverging colors
var color = d3.scaleOrdinal()
  .domain(category)
  .range(["#00FF90", "#FF6060", "#a4b1b5", "#FFC000", "#99D3FF", "#0091FF", "#EBBFFF", "#AF0BFF", "#00C181"])

d3.csv("states.csv", function (error, data) {

  var data = data.filter(function (d) { return d.state == 'US'; })

  var res = data.map((d, i) => {
    return {
      date: parseDate(d.date),
      dataPoint: +d.dataPoint,
      candidate: d.candidate,
      percentage: +d.percentage
    }
  })
  console.log(data)


  var mindate = new Date(2019, 5, 1),
    maxdate = new Date(2020, 6, 1);

  var xScale = d3.scaleTime()
    .domain([mindate, maxdate])
    .range([0, width])



  var yScale = d3.scaleLinear()
    .domain(d3.extent(res, d => d.percentage))
    .range([height, 0]);

  var svg = d3.select("#chart").append("svg")
    .attr("viewBox", "0 0 1000 400")
    .append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // CREATE AXES // 
  // render axis first before lines so that lines will overlay the horizontal ticks
  var xAxis = d3.axisBottom(xScale)
  var yAxis = svg.append("g")
    .attr("class", "myYaxis")
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis.ticks(4)
      .tickFormat(d3.timeFormat("%b")))
    .call(g => {
      var years = xScale.ticks(d3.timeYear.every(1))
      var xshift = 0
      g.selectAll("text")
        .style("text-anchor", "right")
        .attr("y", axisPad)
        .attr('fill', 'black')
        .attr('font-size', '20')
        .attr('font-weight', 700)
      g.selectAll("line").remove()


      g.select(".domain")
        .remove()

    })

  svg.append("line")
    .attr("x1", "468")
    .attr("x2", "468")
    .attr("y1", "0")
    .attr("y2", "300")
    .attr("stroke", "grey")


  svg.append("text")
    .attr("x", "465")
    .attr("y", "20")
    .attr('fill', 'grey')
    .attr('font-size', '15')
    .attr('font-weight', 500)
    .attr("text-anchor", "end")
    .text("Demographic Calculation Adjusted >")

  // CREATE LEGEND 
  var svgLegend = svg.append('g')
    .attr('class', 'gLegend')
    .attr("transform", "translate(" + (width + 20) + "," + 0 + ")")

  var legend = svgLegend.selectAll('.legend')
    .data(category)
    .enter().append('g')
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")" })

  legend.append("circle")
    .attr("class", "legend-node")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", R)
    .style("fill", d => color(d))

  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", R * 2)
    .attr("y", R / 2)
    .style("fill", d => color(d))
    .style("font-size", 12)
    .style("font-weight", 500)
    .text(d => d)



  // line generator

  var line = d3.line()
    .curve(d3.curveCatmullRom)
    .x(d => xScale(d.date))
    .y(d => yScale(d.percentage))

  renderChart(1) // inital chart render (set default to Bidding Exercise 1 data)

  // Update chart when radio button is selected
  d3.selectAll(("input[name='dataPoint']")).on('change', function () {
    updateChart(this.value)
  })

  function updateChart(dataPoint) {

    var resNew = res.filter(d => d.dataPoint == parseInt(dataPoint))

    var maxYVal = Math.round(d3.max(resNew, d => d.percentage));

    var test = 100
    console.log(maxYVal);

    var maxYValu = Math.round(maxYVal / 10) * 10 + 10

    yScale.domain([0, maxYValu])
    yAxis.transition().duration(1000).call(d3.axisLeft(yScale).ticks(5)).call(g => {
      g.selectAll("text")
        .style("text-anchor", "end")
        .attr('fill', 'black')
        .attr('font-size', '20')
        .attr('font-weight', 700)

      g.selectAll("line")
        .attr('stroke', '#A9A9A9')
        .attr('stroke-width', 0.7) // make horizontal tick thinner and lighter so that line paths can stand out
        .attr('opacity', 0)

      g.select(".domain")
        .attr('stroke', '#A9A9A9')
        .attr('stroke-width', 0.7) // make horizontal tick thinner and lighter so that line paths can stand out
        .attr('opacity', 0)
    })
    var res_nested = d3.nest()
      .key(d => d.candidate)
      .entries(resNew)

    glines.select('.line') //select line path within line-group (which represents a vehicle category), then bind new data 
      .data(res_nested)
      .transition().duration(1000)
      .attr('d', function (d) {
        return line(d.values)
      })

    mouseG.selectAll('.mouse-per-line')
      .data(res_nested)

    mouseG.on('mousemove', function () {
      var mouse = d3.mouse(this)
      updateTooltipContent(mouse, res_nested)
    })
  }

  function renderChart(dataPoint) {

    var resNew = res.filter(d => d.dataPoint == parseInt(dataPoint))
    var maxYVal = Math.round(d3.max(resNew, d => d.percentage));

    var test = 100
    console.log(maxYVal);

    var maxYValu = Math.round(maxYVal / 10) * 10 + 10

    yScale.domain([0, maxYValu])
    yAxis.transition().duration(1000).call(d3.axisLeft(yScale).ticks(5)).call(g => {
      g.selectAll("text")
        .style("text-anchor", "end")
        .attr('fill', 'black')
        .attr('font-size', '20')
        .attr('font-weight', 700)

      g.selectAll("line")
        .attr('stroke', '#A9A9A9')
        .attr('stroke-width', 0.7) // make horizontal tick thinner and lighter so that line paths can stand out
        .attr('opacity', 0)

      g.select(".domain")
        .attr('stroke', '#A9A9A9')
        .attr('stroke-width', 0.7) // make horizontal tick thinner and lighter so that line paths can stand out
        .attr('opacity', 0)
    })
    var res_nested = d3.nest() // necessary to nest data so that keys represent each vehicle category
      .key(d => d.candidate)
      .entries(resNew)

    // APPEND MULTIPLE LINES //
    var lines = svg.append('g')
      .attr('class', 'lines')

    glines = lines.selectAll('.line-group')
      .data(res_nested).enter()
      .append('g')
      .attr('class', 'line-group')

    glines
      .append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.values))
      .style('stroke', (d, i) => color(i))
      .style('fill', 'none')
      .style('opacity', .9)
      .style('stroke-width', "4px")


    // APPEND CIRCLE MARKERS //
    //var gcircle = lines.selectAll("circle-group")
    //.data(res_nested).enter()
    //.append("g")
    //.attr('class', 'circle-group')

    //gcircle.selectAll("circle")
    //.data(d => d.values).enter()
    //.append("g")
    //.attr("class", "circle")  
    //.append("circle")
    //.attr("cx", d => xScale(d.date))
    //.attr("cy", d => yScale(d.percentage))
    //.attr("r", 2)

    // CREATE HOVER TOOLTIP WITH VERTICAL LINE //
    tooltip = d3.select("#chart").append("div")
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style("background-color", "white")
      .style('fill', 'white')
      .style('padding', 6)
      .attr("display", "inline")
      .style("opacity",.9)


    mouseG = svg.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // create vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "#A9A9A9")
      .style("stroke-width", 0)
      .style("opacity", "0");

    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(res_nested)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

      mousePerLine.append("circle")
      .attr("r", 3)
      .style("stroke", d=>color(d.key)
      )
      .style("fill", "white")
      
      .style("stroke-width", 2)
      .style("opacity", "0");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function () { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "0");
        d3.selectAll("#tooltip")
          .style('display', 'none')

      })
      .on('mouseover', function () { // on mouse in show line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "1");
        d3.selectAll("#tooltip")
          .style('display', 'inline')
      })
      .on('mousemove', function () { // update tooltip content, line, circles and text when mouse moves
        var mouse = d3.mouse(this)

        d3.selectAll(".mouse-per-line")
          .attr("transform", function (d, i) {
            var xDate = xScale.invert(mouse[0]) // use 'invert' to get date corresponding to distance from mouse position relative to svg
            var bisect = d3.bisector(function (d) { return d.date; }).left // retrieve row index of date on parsed csv
            var idx = bisect(d.values, xDate);

            d3.select(".mouse-line")
              .attr("d", function () {
                var data = "M" + xScale(d.values[idx].date) + "," + (height);
                data += " " + xScale(d.values[idx].date) + "," + 0;
                return data;
              });
            return "translate(" + xScale(d.values[idx].date) + "," + yScale(d.values[idx].percentage) + ")";

          });

        updateTooltipContent(mouse, res_nested)

      })

  }

  function updateTooltipContent(mouse, res_nested) {

    sortingObj = []
    res_nested.map(d => {
      var xDate = xScale.invert(mouse[0])
      var bisect = d3.bisector(function (d) { return d.date; }).left
      var idx = bisect(d.values, xDate)
      sortingObj.push({ key: d.values[idx].candidate, percentage: d.values[idx].percentage, dataPoint: d.values[idx].dataPoint, day: d.values[idx].date.getDate(), month: monthNames[d.values[idx].date.getMonth()] })
    })

    sortingObj.sort(function (x, y) {
      return d3.descending(x.percentage, y.percentage);
    })

    var sortingArr = sortingObj.map(d => d.key)

    var res_nested1 = res_nested.slice().sort(function (a, b) {
      return sortingArr.indexOf(a.key) - sortingArr.indexOf(b.key) // rank vehicle category based on price of percentage
    })


    tooltip.html(sortingObj[0].month + "-" + sortingObj[0].day)
      .style('display', 'inline')
      .style('left', d3.event.pageX + 40)
      .style('top', d3.event.pageY)
      .style('font-size', 18)
      .style('font-family', 'brandon-grotesque')
      .style('font-weight', 700)
      .style('fill', 'white')
      .selectAll()
      .data(res_nested1).enter() // for each vehicle category, list out name and price of percentage
      .append('div')
      .style('color', d => {
        return color(d.key)
      })
      .style('font-size', 18)
      .html(d => {
        var xDate = xScale.invert(mouse[0])
        var bisect = d3.bisector(function (d) { return d.date; }).left
        var idx = bisect(d.values, xDate)
        return d.key + " - " + d.values[idx].percentage.toString() + "%"
      })
  }

})