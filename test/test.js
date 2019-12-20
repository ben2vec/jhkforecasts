var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = innerWidth - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

d3.csv("test copy.csv", function(error, data){
      
    var data = data.filter(function(d){return d.state == 'Iowa';})

  var res = data.map((d,i) => {
    return {
      candidate : +d.candidate,
      winPercentage : +d.winPercentage,
      color : +d.color,
      cx : +d.cx,
      cy : +d.cy,
    }
  })

//Create the SVG Viewport
var svgContainer = d3.select("body").append("svg")
                                     .attr("width","width")
                                     .attr("height",400);
   
//Add circles to the svgContainer
   var circles = svgContainer.selectAll("circle")
                              .data(data)
                              .enter()
                              .append("circle");

var text = svgContainer.selectAll("text")
                       .data(data)
                       .enter()
                        .append("text")
                        .attr("text-anchor","middle");

var textTwo = svgContainer.selectAll("textTwo")
                       .data(data)
                       .enter()
                        .append("text")
                        .attr("text-anchor","middle");

   //Add the circle attributes
   var circleAttributes = circles
                          .attr("cx", function (d) { return d.cx; })
                          .attr("cy", function (d) { return d.cy; })
                         .attr("r", 50)
                       .style("fill", function (d) { return d.color; });
    
    var textLabels = text
                 .attr("x", function(d) { return d.cx; })
                .attr("y", 125)
                .text( function (d) { return d.winPercentage; })
                 .attr("font-family", "sans-serif")
                .attr("font-size", "20px")
                 .attr("fill", "black")
                 ;

var textLabelsTwo = textTwo
                 .attr("x", function(d) { return d.cx; })
                .attr("y", function(d) { return  d.cy; })
                .text( function (d) { return d.candidate; })
                 .attr("font-family", "sans-serif")
                .attr("font-size", "20px")
                 .attr("fill", "black")
                 ;
})