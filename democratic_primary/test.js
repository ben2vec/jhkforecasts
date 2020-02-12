var glines
var mouseG
var tooltip
var parseDate = d3.timeParse("%Y-%m-%d")
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

var margin = { top: 80, right: 100, bottom: 40, left: 40 }
var width = 1000 - margin.left - margin.right
var height = 400 - margin.top - margin.bottom

var lineOpacity = .8
var lineStroke = "4px"

var axisPad = 12 // axis formatting
var R = 7 //legend marker

var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]
// since Category B and E are really close to each other, assign them diverging colors
var color = d3.scaleOrdinal()
  .domain(category)
  .range(["#00C181", "#FF6060", "#a4b1b5", "#FFE130", "#FF8D32", "#0091FF", "#FF2EF0", "#CD64FF", "#a4b1b5"])


  var mindate = new Date(2019, 5, 1),
  maxdate = new Date(2020, 5, 1),
  demadjust =new Date(2020 , 0, 4);


  

d3.csv("https://projects.fivethirtyeight.com/polls-page/president_primary_polls.csv", function (error, data) {

    var data = data.filter(function (d) { return d.state == keyState; })
    var data = data.filter(function (d) { return d.party == "DEM"; })

    var data = data.filter(function (d) { return d.answer == "Biden"; })

    var parseDatetwo = d3.timeParse("%m/%d/%y")
    var data = data.map((d, i) => {
      return {
        end_date: parseDatetwo(d.end_date),
        answer: d.answer,
        pct: +d.pct
      }
    })
    var svg = d3.select("#pollchart").append("svg")
    .attr("viewBox", "0 0 1000 500")
    .append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var xScale = d3.scaleTime()
    .domain([mindate, maxdate])
    .range([0, width])



  var yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.pct))
    .range([height, 0]);

  

  // CREATE AXES // 
  // render axis first before lines so that lines will overlay the horizontal ticks
  var xAxis = d3.axisBottom(xScale)
  var yAxis = svg.append("g")
    .attr("class", "myYaxis")
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis.ticks(8)
      .tickFormat(d3.timeFormat("%b")))
    .call(g => {
      var years = xScale.ticks(d3.timeYear.every(1))
      var xshift = 0
      g.selectAll("text")
        .style("text-anchor", "middle")
        .attr("y", axisPad)
        .attr('fill', 'black')
        .attr('font-size', '20')
        .attr('font-weight', 700)
      g.selectAll("line").remove()


      g.select(".domain")
        .remove()

    })
    svg.selectAll("dots")
    .data(data)
    .enter()
    .append("circle")
    .attr("cy",d=>yScale(d.pct))
    .attr("cx",d=>xScale(d.end_date))
    .attr("r",3)
    .attr("fill",d=>color(d.answer))
    .attr("opacity",.6)


    

    
  })
