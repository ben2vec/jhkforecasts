var ratingscale = d3.scaleOrdinal()
  .domain(["Solid D", "Likely D", "Lean D", "Tilt D", "Tossup", "Tilt R", "Lean R", "Likely R", "Solid R"])
  .range(["#1079FE", "#56aefe","#88c8fe","#c3e4ff","#f1d5ff","#fed6d8","#feb0b1","#fd8a8d","fd464d"]);



d3.csv("experts.csv", function (error, data) {



  var data = data.filter(function (d) { return d.state == keyState; })


  var data = data.map((d, i) => {
    return {
      expert: d.expert,
      rating: d.rating,
      margin: +d.margin

    }
  })

  var svg = d3.select("#experts").append("svg")
    .attr("viewBox", "0 0 800 400")
    .append('g')




  var svgLegend = svg.append('g')
    .attr('class', 'gLegend')
    .attr("transform", "translate(" + 0 + "," + 90 + ")")



  var legend = svgLegend.selectAll('.legend')
    .data(data)
    .enter().append('g')
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(0," + i * 50 + ")" })



  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", d => d.expert == "Adjusted Margin" ? 500 : 50)
    .attr("y", 0)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 500)
    .text(d => d.expert)
    .attr("text-anchor", "start")

  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 700)
    .attr("y", 0)
    .style("fill", d => ratingscale(d.rating))
    .style("font-size", 15)
    .attr("font-weight", 700)
    .text(d => d.rating == 0 ? "" : d.rating)
    .attr("text-anchor", "middle")

    legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 700)
    .attr("y", 0)
    .style("fill", d=>d.margin>0?"#FF6060":"#0091FF")
    .style("font-size", 15)
    .attr("font-weight", 700)
    .text(d => d.expert == "Adjusted Margin" ? d.margin > 0 ? "R+ "+d.margin:"D+ "+Math.abs(d.margin):"")
    .attr("text-anchor", "middle")




  svg.append("text")
    .attr("x", 50)
    .attr("y", 50)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 500)
    .text("Expert")
    .attr("text-anchor", "start")

    svg.append("text")
    .attr("x", 700)
    .attr("y", 50)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 500)
    .text("Rating")
    .attr("text-anchor", "middle")


    svg.append("text")
    .attr("x", 630)
    .attr("y", 340)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight", 900)
    .text("-->")
    .attr("text-anchor", "middle")

  legend.append("line")
    .attr("x1", 0)
    .attr("x2", 950)
    .attr("y1", 20)
    .attr("y2", 20)
    .attr("stroke-width", 1)
    .attr("stroke", "#E2E2E2")

  svg.append("line")
    .attr("x1", 0)
    .attr("x2", 950)
    .attr("y1", 60)
    .attr("y2", 60)
    .attr("stroke-width", 2)
    .attr("stroke", "black")

});