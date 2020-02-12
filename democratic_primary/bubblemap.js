

var margin2 = { top: 0, right: 70, bottom: 0, left: 50 }
var width2 = 860 - margin2.left - margin2.right
var height2 = 445
var axisPad = 12
var R = 7



var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]
// since Category B and E are really close to each other, assign them diverging colors
var color = d3.scaleOrdinal()
  .domain(category)
  .range(["#00C181", "#FF6060", "#a4b1b5", "#FFE130", "#FF8D32", "#0091FF", "#FF2EF0", "#CD64FF", "#0070C0"])
var colortwo = d3.scaleOrdinal()
  .domain(category)
  .range(["black", "white", "white", "black", "white", "white", "black", "white", "white"])


var div = d3.select("#bubblemap").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

d3.csv("bubblemap.csv", function (error, data) {






  var x = d3.scaleLinear()
    .domain([0, 780])
    .range([0, width2])



  var y = d3.scaleLinear()
    .domain([0, 445])
    .range([0, height2]);



  var svg = d3.select("#bubblemap").append("svg")
    .attr("viewBox", '0 0 860 445')
    .append('g')
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

  var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-150, -30])
    .html("<div id='tipDiv'></div>");

  svg.call(tool_tip);

  var svgLegend = svg.append('g')
    .attr('class', 'gLegend')
    .attr("transform", "translate(" + 700 + "," + 30 + ")")

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



  svg.selectAll("states")
    .data(data)
    .enter()
    .append("a")
    .attr("xlink:href", d => d.state)
    .append("circle")
    .attr("cx", d => x(d.xValue))
    .attr("cy", d => y(d.yValue))
    .attr("r", d => d.radius)
    .attr("stroke-width", 2)
    .style("stroke", d => d.completed == 0 ? color(d.first) : "white")
    .style("fill", d => d.completed == 1 ? color(d.first) : "white")
    .on('mouseover', function (d) {
      tool_tip.show();
      var tipSVG = d3.select("#tipDiv")
        .append("svg")
        .attr("width", 200)
        .attr("height", 140);

      tipSVG.append("rect")
      .attr("x",0)
      .attr("y",0)
      .attr("width", 200)
      .attr("height", 140)
      .attr("fill","white")
      .attr("stroke","black")
      .attr("stroke-width",3)
      .attr("rx",10)



      tipSVG.append("text")
        .text(d.state)
        .attr("y", 20)
        .attr("x", 87.5)
        .attr("fill", "black")
        .style("font-weight", "600")
        .style("font-size", "20")
        .attr("text-anchor", "middle");

      tipSVG.append("text")
        .text("Candidate")
        .attr("y", 50)
        .attr("x", 5)
        .attr("fill", "black")
        .style("font-weight", "600")
        .style("font-size", "15");
      tipSVG.append("text")
        .text("Vote Share")
        .attr("y", 50)
        .attr("x", 150)
        .attr("fill", "black")
        .style("font-weight", "600")
        .style("font-size", "15")
        .attr("text-anchor", "middle")
        ;


      tipSVG.append("text")
        .text(d.first)
        .attr("y", 70)
        .attr("x", 5)
        .attr("fill", color(d.first))
        .style("font-weight", "600")
        .style("font-size", "15");


      tipSVG.append("text")
        .text(d.firstvote + "%")
        .attr("y", 70)
        .attr("x", 150)
        .attr("fill", color(d.first))
        .style("font-weight", "600")
        .style("font-size", "15")
        .attr("text-anchor", "middle")
        ;

      tipSVG.append("text")
        .text(d.second)
        .attr("y", 90)
        .attr("x", 5)
        .attr("fill", color(d.second))
        .style("font-weight", "600")
        .style("font-size", "15");

      tipSVG.append("text")
        .text(d.secondvote + "%")
        .attr("y", 90)
        .attr("x", 150)
        .attr("fill", color(d.second))
        .style("font-weight", "600")
        .style("font-size", "15")
        .attr("text-anchor", "middle")
        ;

      tipSVG.append("text")
        .text(d.third)
        .attr("y", 110)
        .attr("x", 5)
        .attr("fill", color(d.third))
        .style("font-weight", "600")
        .style("font-size", "15");

      tipSVG.append("text")
        .text(d.thirdvote + "%")
        .attr("y", 110)
        .attr("x", 150)
        .attr("fill", color(d.third))
        .style("font-weight", "600")
        .style("font-size", "15")
        .attr("text-anchor", "middle")
        ;

      tipSVG.append("text")
        .text(d.fourth)
        .attr("y", 130)
        .attr("x", 5)
        .attr("fill", color(d.fourth))
        .style("font-weight", "600")
        .style("font-size", "15")


      tipSVG.append("text")
        .text(d.forthvote + "%")
        .attr("y", 130)
        .attr("x", 150)
        .attr("fill", color(d.fourth))
        .style("font-weight", "600")
        .style("font-size", "15")
        .attr("text-anchor", "middle")
        ;



    })
    .on('mouseout', tool_tip.hide);


  svg.selectAll("label")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbrev)
    .attr("x", d => x(d.xValue))
    .attr("y", d => y(d.yValue) + 3)
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", 700)
    .attr("font-size", "8")
    .attr("fill", d => d.completed == 1 ? colortwo(d.first) : "black")
    .on('mouseover', function (d) {
      tool_tip.show();
      var tipSVG = d3.select("#tipDiv")
        .append("svg")
        .attr("width", 200)
        .attr("height", 140);

      tipSVG.append("rect")
      .attr("x",0)
      .attr("y",0)
      .attr("width", 200)
      .attr("height", 140)
      .attr("fill","white")
      .attr("stroke","black")
      .attr("stroke-width",3)
      .attr("rx",10)



      tipSVG.append("text")
        .text(d.state)
        .attr("y", 20)
        .attr("x", 87.5)
        .attr("fill", "black")
        .style("font-weight", "600")
        .style("font-size", "20")
        .attr("text-anchor", "middle");

      tipSVG.append("text")
        .text("Candidate")
        .attr("y", 50)
        .attr("x", 5)
        .attr("fill", "black")
        .style("font-weight", "600")
        .style("font-size", "15");
      tipSVG.append("text")
        .text("Vote Share")
        .attr("y", 50)
        .attr("x", 150)
        .attr("fill", "black")
        .style("font-weight", "600")
        .style("font-size", "15")
        .attr("text-anchor", "middle")
        ;


      tipSVG.append("text")
        .text(d.first)
        .attr("y", 70)
        .attr("x", 5)
        .attr("fill", color(d.first))
        .style("font-weight", "600")
        .style("font-size", "15");


      tipSVG.append("text")
        .text(d.firstvote + "%")
        .attr("y", 70)
        .attr("x", 150)
        .attr("fill", color(d.first))
        .style("font-weight", "600")
        .style("font-size", "15")
        .attr("text-anchor", "middle")
        ;

      tipSVG.append("text")
        .text(d.second)
        .attr("y", 90)
        .attr("x", 5)
        .attr("fill", color(d.second))
        .style("font-weight", "600")
        .style("font-size", "15");

      tipSVG.append("text")
        .text(d.secondvote + "%")
        .attr("y", 90)
        .attr("x", 150)
        .attr("fill", color(d.second))
        .style("font-weight", "600")
        .style("font-size", "15")
        .attr("text-anchor", "middle")
        ;

      tipSVG.append("text")
        .text(d.third)
        .attr("y", 110)
        .attr("x", 5)
        .attr("fill", color(d.third))
        .style("font-weight", "600")
        .style("font-size", "15");

      tipSVG.append("text")
        .text(d.thirdvote + "%")
        .attr("y", 110)
        .attr("x", 150)
        .attr("fill", color(d.third))
        .style("font-weight", "600")
        .style("font-size", "15")
        .attr("text-anchor", "middle")
        ;

      tipSVG.append("text")
        .text(d.fourth)
        .attr("y", 130)
        .attr("x", 5)
        .attr("fill", color(d.fourth))
        .style("font-weight", "600")
        .style("font-size", "15")


      tipSVG.append("text")
        .text(d.forthvote + "%")
        .attr("y", 130)
        .attr("x", 150)
        .attr("fill", color(d.fourth))
        .style("font-weight", "600")
        .style("font-size", "15")
        .attr("text-anchor", "middle")
        ;



    })
    .on('mouseout', tool_tip.hide);

  svg.append("text")
    .text("Press on State For Forecast")
    .attr("x", 200)
    .attr("y", 80)
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "500")
    .attr("font-size", "15")
    .attr("fill", "black")
  svg.append("text")
    .text("Democratic Primary")
    .attr("x", 200)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "700")
    .attr("font-size", "20")
    .attr("fill", "black")




  svg.append("circle")
    .attr("cx", 600)
    .attr("cy", 250)
    .attr("r", 10)
    .attr("stroke-width", 2)
    .style("stroke", "black")
    .style("fill", "white")


  svg.append("circle")
    .attr("cx", 600)
    .attr("cy", 275)
    .attr("r", 10)
    .attr("stroke-width", 2)
    .style("stroke", "black")
    .style("fill", "black")


  svg.append("text")
    .attr("x", 615)
    .attr("y", 280)
    .style("fill", "black")
    .text("Completed Primary/Caucus")

  svg.append("text")
    .attr("x", 615)
    .attr("y", 255)
    .style("fill", "black")
    .text("Upcoming Primary/Caucus")

  d3.csv("update.csv", function (error, data) {

    svg.selectAll("updated")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.updated)
      .attr("x", 200)
      .attr("y", 20)
      .attr("fill", "black")
      .attr("font-size", 10)
      .attr("fill", "grey")
      .attr("text-anchor", "middle")
      .attr("font-weight", 900)
      .attr("text-decoration", "underline")
  })
})