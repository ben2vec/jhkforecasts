
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
var color3 = d3.scaleLinear()
  .domain([0, 50, 100])
  .range(["#FFC000", "white", "#00C181"])



//Create SVG element and append map to the SVG
var svg = d3.select("#statesim")
  .append("svg")
  .attr("viewBox", '0 20 1020 480');



var tool_tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-120, -30])
  .html("<div id='tipDiv'></div>");

svg.call(tool_tip);


// Load in my states data!
d3.csv("statemaps.csv", function (data) {
  // setting the range of the input data
  var data = data.filter(function (d) { return d.statecat == keyState; })
  // Load GeoJSON data and merge with states data
  d3.json("us-states.json", function (json) {

    // Loop through each state data value in the .csv file
    for (var i = 0; i < data.length; i++) {

      // Grab State Name
      var dataState = data[i].state;

      // Grab data value 
      var value = data[i].value

      var label = data[i].label

      var xvalue = data[i].xValue

      var yvalue = data[i].yValue
      
      var rank = data[i].rank
        ;

      // Find the corresponding state inside the GeoJSON
      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.name;

        if (dataState == jsonState) {

          // Copy the data value into the JSON
          json.features[j].properties.value = value
          json.features[j].properties.xValue = xvalue
          json.features[j].properties.yValue = yvalue
          json.features[j].properties.label = label
          json.features[j].properties.rank = rank
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
      .attr("transform", "translate(120,0)" )
      .append("path")
      .attr("class", "states")
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", "1")
      .style("fill", function (d) { return color3(d.properties.value); })
      .attr("text-anchor", "middle")
      .on('mouseover', function (d) {

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
          .text("State Sim Score -> "+d.properties.value)
          .attr("y", 60)
          .attr("x", 85)
          .attr("fill", "#black")
          .style("font-weight", "600")
          .style("font-size", "15")
          .style("text-anchor", "middle");

          

    
      })
      .on('mouseout',
        function (d) {

          d3.select(this)
            .style("opacity", 1)

          tool_tip.hide()
        });




    d3.csv("statemaps.csv", function (error, data) {

      var data = data.filter(function (d) { return d.statecat == keyState; })


      svg.selectAll("labels")
        .data(data)
        .enter()
        .append("text")
        .attr("transform", "translate(120,0)" )
        .text(d => d.label)
        .attr("x", d => d.xValue)
        .attr("y", d => d.yValue)
        .attr("font-family", "brandon-grotesque")
        .attr("font-weight", "700")
        .attr("font-size", "10")
        .attr("fill", "black")
        .attr("text-anchor", "middle")


    });
    d3.csv("statesim.csv", function (error, data) {

      var data = data.filter(function (d) { return d.state == keyState; })

      var svgrepeat = svg.append('g')
      .attr('class', 'grepeat')
      .attr("transform", "translate(" + 0 + "," + 90 + ")")
  
  
  
    var repeat = svgrepeat.selectAll('.repeat')
      .data(data)
      .enter().append('g')
      .attr("class", "repeat")
      .attr("transform", function (d, i) { return "translate(0," + i * 30 + ")" })

      repeat.append("text")
      .attr("class", "repeat-text")
      .attr("x", 10)
      .attr("y", 50)
      .style("fill", "Black")
      .style("font-size", 15)
      .attr("font-weight", 500)
      .text(d => d.state2)
      .attr("text-anchor", "start")


      repeat.append("rect")
      .attr("x", 200)
      .attr("y", 30)
      .attr("width",50)
      .attr("height",30)
      .style("fill", d=> color3(d.value))


      repeat.append("text")
      .attr("class", "repeat-text")
      .attr("x", 245)
      .attr("y", 50)
      .style("fill", "black")
      .style("font-size", 15)
      .attr("font-weight", 900)
      .text(d => d.value)
      .attr("text-anchor", "end")

      repeat.append("rectangle")
      .attr("x", 250)
      .attr("y", 50)
      .style("fill", d=> color3(d.value))
      

      svg.append("text")
      .attr("class", "repeat-text")
      .attr("x", 10)
      .attr("y", 115)
      .style("fill", "Black")
      .style("font-size", 15)
      .attr("font-weight", 900)
      .text("State")
      .attr("text-anchor", "start")


      svg.append("text")
      .attr("class", "repeat-text")
      .attr("x", 250)
      .attr("y", 115)
      .style("fill", "black")
      .style("font-size", 15)
      .attr("font-weight", 900)
      .text("Score")
      .attr("text-anchor", "end")

      svg.append("line")
    .attr("x1",10)
    .attr("x2",250)
    .attr("y1",120)
    .attr("y2",120)
    .attr("stroke","black")
    .attr("stroke-width",1)

  });
});
});