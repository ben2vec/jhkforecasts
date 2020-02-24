

var margin2 = { top: 0, right: 70, bottom: 0, left: 50 }
var width2 = 860 - margin2.left - margin2.right
var height2 = 445
var axisPad = 12
var color = d3.scaleLinear()
  .domain([0, 50, 100])
  .range(["#0091FF", "white", "#FF6060"])
var div = d3.select("#bubblemap").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

d3.csv("bubble map.csv", function (error, data) {






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


  d3.selection.prototype.moveToFront = function () {
    return this.each(function () {
      this.parentNode.appendChild(this);
    });
  };
  d3.selection.prototype.moveToBack = function () {
    return this.each(function () {
      var firstChild = this.parentNode.firstChild;
      if (firstChild) {
        this.parentNode.insertBefore(this, firstChild);
      }
    });
  };



  svg.selectAll("states")
    .data(data)
    .enter()
    .append("a")
    .attr("xlink:href", function (d) { return d.pageLink })
    .append("circle")
    .attr("class","states")
    .attr("cx", d => x(d.xValue))
    .attr("cy", d => y(d.yValue))
    .attr("r", d => d.radius)
    .style("fill", d => color(d.gopWin))
    .attr("stroke", d => d.tippingPoint >= 3 ? "black" : "none")
    .attr("stroke-width", "1")
    .on('mouseover', function (d) {
      
     
      d3.select(this)
        .attr("r", d => d.radius * 1.2)
        .style("stroke-width", "2")
        .style("stroke", "black")
        
      tool_tip.show();
      var tipSVG = d3.select("#tipDiv")
      .append("svg")
      .attr("width", 175)
      .attr("height", 175)
      ;
    tipSVG.append("rect")
      .attr("y", 1.5)
      .attr("x", 1.5)
      .attr("width", 172)
      .attr("height", 172)
      .attr("rx", 8)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("stroke-width", 2)



    tipSVG.append("text")
      .text(d.state)
      .attr("y", 20)
      .attr("x", 87.5)
      .attr("fill", "#black")
      .style("font-weight", "600")
      .style("font-size", "20")
      .attr("text-anchor", "middle")

    tipSVG.append("image")
      .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
      .attr("x", 90)
      .attr("y", 50)
      .attr("width", 82)
      .attr("height", 82)

    tipSVG.append("text")
      .text(d.gopWin + "%")
      .attr("y", 150)
      .attr("x", 131.25)
      .attr("fill", color(100))
      .style("font-weight", "600")
      .style("font-size", 20)
      .attr("text-anchor", "middle")

    tipSVG.append("text")
      .text(d.demWin + "%")
      .attr("y", 150)
      .attr("x", 43.75)
      .attr("fill", color(0))
      .style("font-weight", "600")
      .style("font-size", 20)
      .attr("text-anchor", "middle")

    tipSVG.append("text")
      .text("D")
      .attr("y", 100)
      .attr("x", 43.75)
      .attr("fill", color(0))
      .style("font-weight", "600")
      .style("font-size", 40)
      .attr("text-anchor", "middle")
    })
    .on('mouseout',
      function (d) {

        d3.select(this)
          .attr("r", d => d.radius)
          .style("stroke-width", "1")
          .style("stroke", d => d.tippingPoint >= 3 ? "black" : "none")

        tool_tip.hide()
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
    .attr("font-weight", "500")
    .attr("font-size", "8")

  svg.append("circle")
    .attr("cx", 620)
    .attr("cy", 425)
    .attr("r", 10)
    .attr("stroke", "black")
    .attr("stroke-width", "1.5")
    .attr("fill", "none");

  svg.append("text")
    .attr("x", 635)
    .attr("y", 430)
    .text("Tipping Points")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "500")
    .attr("font-size", "15");

  svg.append("text")
    .attr("x", 680)
    .attr("y", 270)
    .text("GOP")
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "500")
    .attr("font-size", "15");

  svg.append("text")
    .attr("x", 640)
    .attr("y", 270)
    .text("DEM")
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "500")
    .attr("font-size", "15");
  svg.append("text")
    .attr("x", 610)
    .attr("y", 295)
    .text("100%")
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "500")
    .attr("font-size", "12");

  svg.append("text")
    .attr("x", 610)
    .attr("y", 370)
    .text("70%")
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "500")
    .attr("font-size", "12");

  svg.append("text")
    .attr("x", 610)
    .attr("y", 320)
    .text("90%")
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "500")
    .attr("font-size", "12");
  svg.append("text")
    .attr("x", 610)
    .attr("y", 345)
    .text("80%")
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "500")
    .attr("font-size", "12");
  svg.append("text")
    .attr("x", 610)
    .attr("y", 395)
    .text("60%")
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "500")
    .attr("font-size", "12");

  //dem legend
  svg.append("circle")
    .attr("cx", 640)
    .attr("cy", 290)
    .attr("r", 10)
    .attr("fill", color(0));
  svg.append("circle")
    .attr("cx", 640)
    .attr("cy", 315)
    .attr("r", 10)
    .attr("fill", color(10));
  svg.append("circle")
    .attr("cx", 640)
    .attr("cy", 340)
    .attr("r", 10)
    .attr("fill", color(20));
  svg.append("circle")
    .attr("cx", 640)
    .attr("cy", 365)
    .attr("r", 10)
    .attr("fill", color(30));
  svg.append("circle")
    .attr("cx", 640)
    .attr("cy", 390)
    .attr("r", 10)
    .attr("fill", color(40));
  //gop legend
  svg.append("circle")
    .attr("cx", 680)
    .attr("cy", 290)
    .attr("r", 10)
    .attr("fill", color(100));
  svg.append("circle")
    .attr("cx", 680)
    .attr("cy", 315)
    .attr("r", 10)
    .attr("fill", color(90));
  svg.append("circle")
    .attr("cx", 680)
    .attr("cy", 340)
    .attr("r", 10)
    .attr("fill", color(80));
  svg.append("circle")
    .attr("cx", 680)
    .attr("cy", 365)
    .attr("r", 10)
    .attr("fill", color(70));
  svg.append("circle")
    .attr("cx", 680)
    .attr("cy", 390)
    .attr("r", 10)
    .attr("fill", color(60));

})