var glines
var mouseG
var tooltip
var parseDate = d3.timeParse("%Y-%m-%d")
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

var margin = {top: 20, right: 100, bottom: 40, left: 40}
var width = innerWidth - margin.left - margin.right
var height = innerHeight/2 - margin.top - margin.bottom

var lineOpacity = .8
var lineStroke = "3px"

var axisPad = 12 // axis formatting
var R = 7 //legend marker

var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar","Sanders","Steyer","Warren","Yang"]
// since Category B and E are really close to each other, assign them diverging colors
var color = d3.scaleOrdinal()
  .domain(category)
  .range(["#00FF90", "#00B050", "#006541", "#36AEFF","#0077FF","002E66","E7B5FF","B722FF","purple"])

d3.csv("states.csv", data => {

  var res = data.map((d,i) => {
    return {
      date : parseDate(d.date),
      dataPoint : +d.dataPoint,
      candidate : d.candidate,
      percentage : +d.percentage
    }
  })


  var mindate = new Date(2019,5,1),
    maxdate = new Date(2020,6,1);

  var xScale = d3.scaleTime()
    .domain([mindate,maxdate])
    .range([0, width])

  

  var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

  var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // CREATE AXES // 
  // render axis first before lines so that lines will overlay the horizontal ticks
  var xAxis = d3.axisBottom(xScale)
  var yAxis = d3.axisLeft(yScale)
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis
      .tickFormat(d3.timeFormat("%m|%y")))
    .call(g => {
      var years = xScale.ticks(d3.timeYear.every(1))
      var xshift = 0 
      g.selectAll("text")
        .style("text-anchor", "right")
        .attr("y", axisPad)
        .attr('fill', 'black')
          .attr('font-size','12')
          .attr('font-weight',500)
      g.selectAll("line")
        .attr('stroke', '#A9A9A9')

      g.select(".domain")
        .attr('stroke', '#A9A9A9')

    })

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .call(g => {
      g.selectAll("text")
      .style("text-anchor", "middle")
      .attr('fill', 'black')
      .attr('font-size', '12px')
      

      g.selectAll("line")
        .attr('stroke', '#A9A9A9')
        .attr('stroke-width', 0.7) // make horizontal tick thinner and lighter so that line paths can stand out
        .attr('opacity', 0.3)

      g.select(".domain").remove()

     })
    .append('text')
      .attr('x',15)
      .attr("y", 6)
      .attr('fill', 'black')
      .attr('font-size', '15px')
      .text("%")


  // CREATE LEGEND // 
  var svgLegend = svg.append('g')
      .attr('class', 'gLegend')
      .attr("transform", "translate(" + (width + 20) + "," + 0 + ")")

  var legend = svgLegend.selectAll('.legend')
    .data(category)
    .enter().append('g')
      .attr("class", "legend")
      .attr("transform", function (d, i) {return "translate(0," + i * 20 + ")"})

  legend.append("circle")
      .attr("class", "legend-node")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", R)
      .style("fill", d=>color(d))

  legend.append("text")
      .attr("class", "legend-text")
      .attr("x", R*2)
      .attr("y", R/2)
      .style("fill",d=>color(d) )
      .style("font-size", 12)
      .style("font-weight", 500)
      .text(d=>d)

  // line generator
   
  var line = d3.line()
  .curve(d3.curveCatmullRom)
    .x(d => xScale(d.date))
    .y(d => yScale(d.percentage))

  renderChart(-1) // inital chart render (set default to Bidding Exercise 1 data)

  // Update chart when radio button is selected
  d3.selectAll(("input[name='dataPoint']")).on('change', function(){
    updateChart(this.value)
  })

  function updateChart(dataPoint) {

    var resNew = res.filter(d=>d.dataPoint == parseInt(dataPoint))

    var res_nested = d3.nest()
      .key(d=>d.candidate)
      .entries(resNew)

    glines.select('.line') //select line path within line-group (which represents a vehicle category), then bind new data 
      .data(res_nested)
      .transition().duration(1000)
      .attr('d', function(d) {
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

    var resNew = res.filter(d=>d.dataPoint == parseInt(dataPoint))

    var res_nested = d3.nest() // necessary to nest data so that keys represent each vehicle category
      .key(d=>d.candidate)
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
        .style('opacity', lineOpacity)
        .style('stroke-width', lineStroke)


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
      .style("fill", "none")
      .style('padding', 6)
      .style('display', 'none')

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
      .attr("r", 4)
      .style("stroke", "white"
      )
      .style("fill", function (d) {
          return color(d.key)})
      .style("stroke-width", 3)
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
          .style('display', 'block')
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
    sortingObj.push({key: d.values[idx].candidate, percentage: d.values[idx].percentage, dataPoint: d.values[idx].dataPoint, year: d.values[idx].date.getFullYear(), month: monthNames[d.values[idx].date.getMonth()]})
  })

  sortingObj.sort(function(x, y){
     return d3.descending(x.percentage, y.percentage);
  })

  var sortingArr = sortingObj.map(d=> d.key)

  var res_nested1 = res_nested.slice().sort(function(a, b){
    return sortingArr.indexOf(a.key) - sortingArr.indexOf(b.key) // rank vehicle category based on price of percentage
  })

  tooltip.html( "")
    .style('display', 'block')
    .style('left', d3.event.pageX + 20)
    .style('top', d3.event.pageY - 20)
    .style('font-size', 11.5)
    .style('font-family', 'brandon-grotesque')
    .style('font-weight', 500)
    .selectAll()
    .data(res_nested1).enter() // for each vehicle category, list out name and price of percentage
    .append('div')
    .style('color', d => {
      return color(d.key)
    })
    .style('font-size', 12)
    .html(d => {
      var xDate = xScale.invert(mouse[0])
      var bisect = d3.bisector(function (d) { return d.date; }).left
      var idx = bisect(d.values, xDate)
      return d.key +  " - " + d.values[idx].percentage.toString()  + "%" 
    })
}

})
