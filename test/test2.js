// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = innerWidth - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("test copy.csv", function(error, data){
      
    var data = data.filter(function(d){return d.state == 'Iowa';})

  var res = data.map((d,i) => {
    return {
      candidate : d.candidate,
      winPercentage : +d.winPercentage,
      votePercentage : +d.votePercentage,
      delegates : +d.delegates
    }
  })
console.log(data)
console.log(res)

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.candidate; }));
  y.domain([0, d3.max(data, function(d) { return d.winPercentage; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.candidate); })
      .attr("width", x.bandwidth())
      .attr("y", 0 )
      .attr("height", 100 );

      
  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

    var labelGroup = svg.selectAll("g-num")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "g-label-group")
      .attr("transform", function(d) {
        return "translate(0," + (d.candidate) + ")";
      });
    svg.labelGroup.append("text") 
      .text(function(d) {return  d.num;})
      .attr("x", function(d) { return xScale(d.winPercentage) - 20; })
      .attr("y", y0.rangeBand()/2.65 )
      .attr("class", "g-labels");
});