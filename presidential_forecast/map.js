
var width3 = 1020;
var height3 = 500;

var projection = d3.geoAlbersUsa()
  .translate([width3 / 2, height3 / 2])    
  .scale([900]);          

var path = d3.geoPath()               
  .projection(projection);  


var color = d3.scaleLinear()
  .domain([0, 50, 100])
  .range(["#0091FF", "white", "#FF6060"]);



var svg = d3.select("#usmap")
  .append("svg")
  .attr("viewBox", '100 50 820 450');



var tool_tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-180, -90])
  .html("<div id='tipDiv'></div>");

svg.call(tool_tip);


d3.csv("US Map.csv", function (data) {


  d3.json("us-states.json", function (json) {

    for (var i = 0; i < data.length; i++) {

      var dataState = data[i].state;

      var gopwin = data[i].gopWin

      var demwin = data[i].demWin

      var label = data[i].label

      var xvalue = data[i].xValue

      var yvalue = data[i].yValue

      var tippingpoint = data[i].tippingPoint;

      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.name;

        if (dataState == jsonState) {

          json.features[j].properties.gopWin = gopwin
          json.features[j].properties.tippingPoint = tippingpoint
          json.features[j].properties.demWin = demwin
          json.features[j].properties.xValue = xvalue
          json.features[j].properties.yValue = yvalue
          json.features[j].properties.label = label
            ;


          break;
        }
      }
    }
    console.log(json.features)
    console.log(data)

    
    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("a")
      .attr("xlink:href", function (d) { return d.properties.name })
      .append("path")
      .attr("class", "states")
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", "1")
      .style("fill", d => color(d.properties.gopWin))
      .attr("text-anchor", "middle").on('mouseover', function (d) {


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
          .text(d.properties.name)
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
          .text(d.properties.gopWin + "%")
          .attr("y", 150)
          .attr("x", 131.25)
          .attr("fill", color(100))
          .style("font-weight", "600")
          .style("font-size", 20)
          .attr("text-anchor", "middle")

        tipSVG.append("text")
          .text(d.properties.demWin + "%")
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
            .style("fill", function (d) { return color(d.properties.gopWin); })

          tool_tip.hide()
        });


    svg.selectAll("path2")
      .data(json.features)
      .enter()
      .append("path")
      .attr("class", "states")
      .attr("d", path)
      .style("stroke", d => d.properties.tippingPoint >= 3 ? "black" : "none")
      .style("stroke-width", "1.5")
      .style("fill", "none")

    svg.append("rect")
      .attr("x", 850)
      .attr("y", 350)
      .attr("width", 20)
      .attr("height", 20)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .attr("ry", "6")
      .style("fill", "none");

    svg.append("text")
      .text("Tipping Points")
      .attr("x", 760)
      .attr("y", 365)
      .attr("fill", "black")
      .style("font-weight", "500")
      .style("font-size", "15");


    d3.csv("US Map.csv", function (error, data) {




      svg.selectAll("labels")
        .data(data)
        .enter()
        .append("text")
        .text(d => d.label)
        .attr("x", d => d.xValue)
        .attr("y", d => d.yValue)
        .attr("font-family", "brandon-grotesque")
        .attr("font-weight", "700")
        .attr("font-size", "10")
        .attr("fill", "black")
        .attr("text-anchor", "middle")


    });
  });
});