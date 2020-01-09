
/*  This visualization was made possible by modifying code provided by:
 
Scott Murray, Choropleth example from "Interactive Data Visualization for the Web" 
https://github.com/alignedleft/d3-book/blob/master/chapter_12/05_choropleth.html   
    
Malcolm Maclean, tooltips example tutorial
http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
 
Mike Bostock, Pie Chart Legend
http://bl.ocks.org/mbostock/3888852  */


//Width and height of map
var width3 = 1020;
var height3 = 500;

// D3 Projection
var projection = d3.geoAlbersUsa()
  .translate([width3 / 2, height3 / 2])    // translate to center of screen
  .scale([900]);          // scale things down so see entire US

// Define path generator
var path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
  .projection(projection);  // tell path generator to use albersUsa projection


// Define linear scale for output
var color = d3.scaleLinear()
  .domain([0, 15, 30, 45, 100])
  .range(["white", "#73b5f0", "#0077FF", "#002E66", "#011026"])



//Create SVG element and append map to the SVG
var svg = d3.select("#usmap")
  .append("svg")
  .attr("viewBox", '50 20 920 480');



var tool_tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-120, -30])
  .html("<div id='tipDiv'></div>");

svg.call(tool_tip);


// Load in my states data!
d3.csv("map.csv", function (data) {
  // setting the range of the input data
  var data = data.filter(function (d) { return d.cand == keycand; })
  // Load GeoJSON data and merge with states data
  d3.json("us-states.json", function (json) {

    // Loop through each state data value in the .csv file
    for (var i = 0; i < data.length; i++) {

      // Grab State Name
      var dataState = data[i].state;

      // Grab data value 
      var vote = data[i].vote

      var delegate = data[i].delegates

      var label = data[i].label

      var xvalue = data[i].xValue

      var yvalue = data[i].yValue

        ;

      // Find the corresponding state inside the GeoJSON
      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.name;

        if (dataState == jsonState) {

          // Copy the data value into the JSON
          json.features[j].properties.vote = vote

          json.features[j].properties.delegate = delegate
          json.features[j].properties.xValue = xvalue
          json.features[j].properties.yValue = yvalue
          json.features[j].properties.label = label
            ;

          // Stop looking through the JSON

          break;
        }
      }
    }
    console.log(json.features)
    // Bind the data to the SVG and create one path per GeoJSON feature
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
      .style("fill", function (d) { return color(d.properties.vote); })
      .attr("text-anchor", "middle").on('mouseover', function (d) {

        d3.select(this)
          .style("opacity", .3)


        tool_tip.show();
        var tipSVG = d3.select("#tipDiv")
          .append("svg")
          .attr("width", 170)
          .attr("height", 120)
          ;




        tipSVG.append("text")
          .text(d.properties.name)
          .attr("y", 20)
          .attr("x", 85)
          .attr("fill", "#black")
          .style("font-weight", "600")
          .style("font-size", "20")
          .style("text-anchor", "middle");

        tipSVG.append("text")
          .text(d.properties.vote+"%")
          .attr("y", 50)
          .attr("x", 150)
          .attr("fill", "#black")
          .style("font-weight", "600")
          .style("font-size", "15")
          .style("text-anchor", "end");

          tipSVG.append("text")
          .text(d.properties.delegate)
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

          tool_tip.hide()
        });




    svg.append("rect")
      .attr("x", 850)
      .attr("y", 250)
      .attr("width", 20)
      .attr("height", 20)
      .attr("ry", "6")
      .style("fill", color(10));
    svg.append("rect")
      .attr("x", 850)
      .attr("y", 270)
      .attr("width", 20)
      .attr("height", 20)
      .attr("ry", "6")
      .style("fill", color(20));
    svg.append("rect")
      .attr("x", 850)
      .attr("y", 290)
      .attr("width", 20)
      .attr("height", 20)
      .attr("ry", "6")
      .style("fill", color(30));
    svg.append("rect")
      .attr("x", 850)
      .attr("y", 310)
      .attr("width", 20)
      .attr("height", 20)
      .attr("ry", "6")
      .style("fill", color(40));
    svg.append("rect")
      .attr("x", 850)
      .attr("y", 330)
      .attr("width", 20)
      .attr("height", 20)
      .attr("ry", "6")
      .style("fill", color(50));


      svg.append("text")
      .text(keycand+"'s Vote Share")
      .attr("x", 600)
      .attr("y", 60)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "30")
      .attr("fill", "black")
      .attr("text-anchor", "middle")


    svg.append("text")
      .text("Vote Share")
      .attr("x", 860)
      .attr("y", 240)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "10")
      .attr("fill", "black")
      .attr("text-anchor", "middle")
    svg.append("text")
      .text("10%")
      .attr("x", 860)
      .attr("y", 263)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "10")
      .attr("fill", "black")
      .attr("text-anchor", "middle")
    svg.append("text")
      .text("20%")
      .attr("x", 860)
      .attr("y", 283)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "10")
      .attr("fill", "black")
      .attr("text-anchor", "middle")
    svg.append("text")
      .text("30%")
      .attr("x", 860)
      .attr("y", 303)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "10")
      .attr("fill", "black")
      .attr("text-anchor", "middle")
    svg.append("text")
      .text("40%")
      .attr("x", 860)
      .attr("y", 323)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "10")
      .attr("fill", "white")
      .attr("text-anchor", "middle")
    svg.append("text")
      .text("50+%")
      .attr("x", 860)
      .attr("y", 343)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "8")
      .attr("fill", "white")
      .attr("text-anchor", "middle")




    d3.csv("map.csv", function (error, data) {

      var data = data.filter(function (d) { return d.cand == keycand; })


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
        .attr("fill", d => d.vote > 35 ? "white" : "black")
        .attr("text-anchor", "middle")


    });
  });
});