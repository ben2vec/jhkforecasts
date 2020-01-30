
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
  .domain([-30, 0, 30])
  .range(["#0091FF", "white", "#FF6060"]);

var gopwincol = "#FF6060"
var demwincol = "#0091FF"
//Create SVG element and append map to the SVG
var svg = d3.select("#usmap")
  .append("svg")
  .attr("viewBox", '100 -50 820 950');

var formatValue = d3.format(".3");

simulation = Math.random()

norminv = jStat.normal.inv(.9, 0, 1)
console.log(formatValue(norminv))
// Load in my states data!
d3.csv("simulation.csv", function (data) {

  var data = data.map((d, i) => {
    return {
      state: d.state,
      electoralvotes: +d.electoralvotes,
      gopproj: +d.gopproj,
      demproj: +d.demproj,
      thirdproj: +d.thirdproj,
      stdev: +d.stdev,
      voteperc: +d.voteperc,
      margin: +d.margin,
    }
  })
  data.forEach(function (d) {
    d.gopvoteraw = jStat.normal.inv((simulation + Math.random()) / 2, d.gopproj, d.stdev);
    d.demvoteraw = jStat.normal.inv(((1 - simulation) + Math.random()) / 2, d.demproj, d.stdev);
    d.thirdvoteraw = jStat.normal.inv((Math.random()), d.thirdproj, d.thirdproj / 4);
    d.totalraw = d.gopvoteraw + d.demvoteraw + d.thirdvoteraw
    d.gopvote = d.gopvoteraw / ((d.totalraw / 100));
    d.demvote = d.demvoteraw / ((d.totalraw / 100));
    d.thirdvote = d.thirdvoteraw / ((d.totalraw / 100));
    d.margin = d.gopvote - d.demvote;
    d.gopev = d.margin >= 0 ? d.electoralvotes : 0;
    return d;
  })


  var gopev = d3.sum(data, d => d.gopev)
  var demev = 538 - gopev
    console.log(gopev)
  console.log(data)
  console.log(data[0].gopvote)
  console.log(data[0].demvote)
  console.log(data[0].thirdvote)
  console.log(data[0].margin)
  // Load GeoJSON data and merge with states data
  d3.json("us-states.json", function (json) {

    // Loop through each state data value in the .csv file
    for (var i = 0; i < data.length; i++) {

      // Grab State Name
      var dataState = data[i].state;

      // Grab data value 
      var margin = data[i].margin;
      // Find the corresponding state inside the GeoJSON
      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.name;

        if (dataState == jsonState) {

          // Copy the data value into the JSON
          json.features[j].properties.margin = margin

            ;


          // Stop looking through the JSON

          break;
        }
      }
    }
    console.log(json.features)
    console.log(data)
    // Bind the data to the SVG and create one path per GeoJSON feature
    svg.append("g")
      .attr("id", "margin")
      .selectAll("path2")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "BLACK")
      .style("stroke-width", "1")
      .style("fill", d=> color(d.properties.margin))
      .attr("text-anchor", "middle")

    svg.append("g")
      .attr("id", "winner")
      .selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "BLACK")
      .style("stroke-width", "1")
      .style("fill", d=> d.properties.margin>0? gopwincol:demwincol)
      .attr("text-anchor", "middle")

      


      

    



    d3.csv("US Map.csv", function (error, data) {




      svg.selectAll("labels")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "winner")
        .text(d => d.label)
        .attr("x", d => d.xValue)
        .attr("y", d => d.yValue)
        .attr("font-family", "brandon-grotesque")
        .attr("font-weight", "700")
        .attr("font-size", "10")
        .attr("fill", "black")
        .attr("text-anchor", "middle")

        svg.append("text")
        .attr("x", 780)
        .attr("y", 30)
        .style("fill", gopwincol)
        .style("font-size", 30)
        .attr("font-weight", 700)
        .text(gopev)
        .attr("text-anchor", "end")

        svg.append("text")
        .attr("x", 780)
        .attr("y", -10)
        .style("fill", gopwincol)
        .style("font-size", 30)
        .attr("font-weight", 700)
        .text("Trump")
        .attr("text-anchor", "end")

        svg.append("text")
        .attr("x", 140)
        .attr("y", 30)
        .style("fill", demwincol)
        .style("font-size", 30)
        .attr("font-weight", 700)
        .text(demev)
        .attr("text-anchor", "start")

        svg.append("text")
        .attr("x", 140)
        .attr("y", -10)
        .style("fill", demwincol)
        .style("font-size", 30)
        .attr("font-weight", 700)
        .text("Democrats")
        .attr("text-anchor", "start")

        svg.append("text")
        .attr("x", 500)
        .attr("y", -10)
        .style("fill", "black")
        .style("font-size", 15)
        .attr("font-weight", 700)
        .text("Reload Page to run new simulation.")
        .attr("text-anchor", "middle")
        



    });
  });
});