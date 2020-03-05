

var margin2 = { top: 0, right: 70, bottom: 0, left: 50 }
var width2 = 860 - margin2.left - margin2.right
var height2 = 445
var axisPad = 12




var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]

var color = d3.scaleOrdinal()
  .domain(category)
  .range(["#00C181", "#a4b1b5", "#a4b1b5", "#a4b1b5", "#a4b1b5", "#0077FF", "#a4b1b5", "#a4b1b5", "#a4b1b5"])


var candidate_color = color(keycand)

var color = d3.scaleLinear()
  .domain([0,30])
  .range(["white", candidate_color ])

var div = d3.select("#bubblemap").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

d3.csv("candbubblemaps.csv", function (error, data) {

  var data = data.filter(function (d) { return d.cand == keycand; })




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

  var tool_tip1 = d3.tip()
    .attr("class", "d3-tip")
    .offset([0,100])
    .html("<div id='tipDiv1'></div>");

  svg.call(tool_tip1);

  var svgLegend = svg.append('g')
    .attr('class', 'gLegend')
    .attr("transform", "translate(" + 700 + "," + 30 + ")")

  



  svg.selectAll("states")
    .data(data)
    .enter()
    .append("a")
    .attr("xlink:href", d => d.state )
    .append("circle")
    .attr("cx", d => x(d.xValue))
    .attr("cy", d => y(d.yValue))
    .attr("r", d => d.radius)
    .style("fill", d => color(d.delegates))
    .on('mouseover', function (d) {

      d3.select(this)
        .style("opacity", .3)


      tool_tip1.show();
      var tipSVG = d3.select("#tipDiv1")
        .append("svg")
        .attr("width", 170)
        .attr("height", 120)
        ;




      tipSVG.append("text")
        .text(d.state)
        .attr("y", 20)
        .attr("x", 85)
        .attr("fill", "#black")
        .style("font-weight", "600")
        .style("font-size", "20")
        .style("text-anchor", "middle");

      tipSVG.append("text")
        .text(d.vote+"%")
        .attr("y", 50)
        .attr("x", 150)
        .attr("fill", "#black")
        .style("font-weight", "600")
        .style("font-size", "15")
        .style("text-anchor", "end");

        tipSVG.append("text")
        .text(d.delegates)
        .attr("y", 80)
        .attr("x", 150)
        .attr("fill", "#black")
        .style("font-weight", "600")
        .style("font-size", "15")
        .style("text-anchor", "end");

        tipSVG.append("text")
        .text("Vote Share -->")
        .attr("y", 50)
        .attr("x", 20)
        .attr("fill", "#black")
        .style("font-weight", "600")
        .style("font-size", "15")
        .style("text-anchor", "start");

        tipSVG.append("text")
        .text("Delegates -->")
        .attr("y", 80)
        .attr("x", 20)
        .attr("fill", "#black")
        .style("font-weight", "600")
        .style("font-size", "15")
        .style("text-anchor", "start");


    })
    .on('mouseout',
      function (d) {

        d3.select(this)
          .style("opacity", 1)

        tool_tip1.hide()
      });


  svg.selectAll("label")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbrev)
    .attr("x", d => x(d.xValue))
    .attr("y", d => y(d.yValue) + 3)
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "700")
    .attr("font-size", "8")
    .attr("fill", d => d.delegates > 35 ? "white" : "black")
    .on('mouseover', function (d) {

      


      tool_tip1.show();
      var tipSVG = d3.select("#tipDiv1")
        .append("svg")
        .attr("width", 170)
        .attr("height", 120)
        ;




      tipSVG.append("text")
        .text(d.state)
        .attr("y", 20)
        .attr("x", 85)
        .attr("fill", "#black")
        .style("font-weight", "600")
        .style("font-size", "20")
        .style("text-anchor", "middle");

      tipSVG.append("text")
        .text(d.vote+"%")
        .attr("y", 50)
        .attr("x", 150)
        .attr("fill", "#black")
        .style("font-weight", "600")
        .style("font-size", "15")
        .style("text-anchor", "end");

        tipSVG.append("text")
        .text(d.delegates)
        .attr("y", 80)
        .attr("x", 150)
        .attr("fill", "#black")
        .style("font-weight", "600")
        .style("font-size", "15")
        .style("text-anchor", "end");

        tipSVG.append("text")
        .text("Vote Share -->")
        .attr("y", 50)
        .attr("x", 20)
        .attr("fill", "#black")
        .style("font-weight", "600")
        .style("font-size", "15")
        .style("text-anchor", "start");

        tipSVG.append("text")
        .text("Delegates -->")
        .attr("y", 80)
        .attr("x", 20)
        .attr("fill", "#black")
        .style("font-weight", "600")
        .style("font-size", "15")
        .style("text-anchor", "start");


    })
    .on('mouseout',tool_tip1.hide
      );

  
  svg.append("text")
    .text(keycand+"'s Delegates")
    .attr("x", 200)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "700")
    .attr("font-size", "20")
    .attr("fill", "black")
 
  svg.append("circle")
  .attr("cx", 550)
  .attr("cy", 300)
  .attr("r", 4.781)
  .style("fill", color(5))

  svg.append("circle")
  .attr("cx", 573)
  .attr("cy", 300)
  .attr("r", 6.761)
  .style("fill", color(10))

  svg.append("circle")
  .attr("cx", 600)
  .attr("cy", 300)
  .attr("r", 9.561)
  .style("fill", color(20))


  svg.append("circle")
  .attr("cx", 638)
  .attr("cy", 300)
  .attr("r", 15.21)
  .style("fill", color(50))

  svg.append("circle")
  .attr("cx", 690)
  .attr("cy", 300)
  .attr("r", 21.38)
  .style("fill", color(100))

  svg.append("text")
  .text("5")
    .attr("x", 550)
    .attr("y", 265)
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "700")
    .attr("font-size", "10")
    .attr("fill", "black")

    svg.append("text")
  .text("10")
    .attr("x", 573)
    .attr("y", 265)
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "700")
    .attr("font-size", "10")
    .attr("fill", "black")


    svg.append("text")
  .text("20")
    .attr("x", 600)
    .attr("y", 265)
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "700")
    .attr("font-size", "10")
    .attr("fill", "black")

    svg.append("text")
  .text("50")
    .attr("x", 638)
    .attr("y", 265)
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "700")
    .attr("font-size", "10")
    .attr("fill", "black")
    
    svg.append("text")
    .text("100")
      .attr("x", 690)
      .attr("y", 265)
      .attr("text-anchor", "middle")
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "10")
      .attr("fill", "black")

      svg.append("text")
    .text("Projected Delegates")
      .attr("x", 620)
      .attr("y", 240)
      .attr("text-anchor", "middle")
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "15")
      .attr("fill", "black")

    

})