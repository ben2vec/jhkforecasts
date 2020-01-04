
// since Category B and E are really close to each other, assign them diverging colors
var gopScale = d3.scaleLinear()
  .domain([20, 80])
  .range(["white", "#FF6060"]);

var demScale = d3.scaleLinear()
  .domain([20, 80])
  .range(["white", "#0091FF"]);

d3.csv("votecalcs.csv", function (error, data) {

  var data = data.filter(function (d) { return d.state == keyState; })




  var svg = d3.select("#votecalcs").append("svg")
    .attr("viewBox", '0 0  1000 450')
    .append('g')




  var svgLegend = svg.append('g')
    .attr('class', 'gLegend')
    .attr("transform", "translate(" + 0 + "," + 50 + ")")



  var legend = svgLegend.selectAll('.legend')
    .data(data)
    .enter().append('g')
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(0," + i * 100 + ")" })

  legend.append("text")
    .text(d => d.index)
    .attr("x", 100)
    .attr("y", 50)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 700)
    .attr("text-anchor", "middle")

  legend.append("text")
    .text(d => d.margin == 0 ? "-": d.margin >0 ? "R+" + d.margin + "%" : "D+" + Math.abs(d.margin) + "%")
    .attr("x", 400)
    .attr("y", 50)
    .style("fill", d => d.margin == 0 ? "black": d.margin >0 ? "#FF6060" : "#0091FF")
    .style("font-size", 20)
    .attr("font-weight", 700)
    .attr("text-anchor", "middle")

  legend.append("circle")
    .attr("cx", 250)
    .attr("cy", 50)
    .attr("r", d => d.weight / 1.5)
    .style("fill", d => d.margin > 0 ? "#FF6060" : "#0091FF")

  d3.csv("Sheet2.csv", function (error, data) {

    var data = data.filter(function (d) { return d.state == keyState; })

    svg.selectAll("margin")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.actmargin > 0 ? "R+" + d.actmargin + "%" : "D+" + Math.abs(d.actmargin) + "%")
      .attr("x", 800)
      .attr("y", 300)
      .style("fill", d => d.margin > 0 ? "#FF6060" : "#0091FF")
      .style("font-size", 40)
      .attr("font-weight", 700)
      .attr("text-anchor", "middle")

    svg.append("text")
      .text("Projected Margin")
      .attr("x", 800)
      .attr("y", 200)
      .attr("fill", "black")
      .attr("font-size", 40)
      .attr("font-weight", 700)
      .attr("text-anchor", "middle")

    svg.append("text")
      .text("Index")
      .attr("x", 100)
      .attr("y", 50)
      .attr("fill", "black")
      .attr("font-size", 15)
      .attr("font-weight", 700)
      .attr("text-anchor", "middle")
      .attr("text-decoration", "underline")

    svg.append("text")
      .text("Weight")
      .attr("x", 250)
      .attr("y", 50)
      .attr("fill", "black")
      .attr("font-size", 15)
      .attr("font-weight", 700)
      .attr("text-anchor", "middle")
      .attr("text-decoration", "underline")
    svg.append("text")
      .text("Margin")
      .attr("x", 400)
      .attr("y", 50)
      .attr("fill", "black")
      .attr("font-size", 15)
      .attr("font-weight", 700)
      .attr("text-anchor", "middle")
      .attr("text-decoration", "underline")
  });
});