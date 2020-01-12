
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
             .translate([width3/2, height3/2])    // translate to center of screen
             .scale([900]);          // scale things down so see entire US
          
  // Define path generator
  var path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
           .projection(projection);  // tell path generator to use albersUsa projection
  
      
  // Define linear scale for output
  var color = d3.scaleLinear()
              .domain([0,50,100])
              .range(["#0091FF","white" ,"#FF6060"]);
  
  
  
  //Create SVG element and append map to the SVG
  var svg = d3.select("#usmap")
        .append("svg")
        .attr("viewBox",'100 50 820 450');
  
  
  
  var tool_tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-120,-30])
      .html("<div id='tipDiv'></div>");
    
    svg.call(tool_tip);       
  
  
  // Load in my states data!
  d3.csv("US Map.csv", function(data) {
    var res = data.map((d,i) => {
              
          })// setting the range of the input data
  
  // Load GeoJSON data and merge with states data
  d3.json("us-states.json", function(json) {
  
  // Loop through each state data value in the .csv file
  for (var i = 0; i < data.length; i++) {
  
    // Grab State Name
    var dataState = data[i].state;
  
    // Grab data value 
    var gopwin = data[i].gopWin
  
    var demwin = data[i].demWin
  
    var label = data[i].label
  
    var xvalue = data[i].xValue
  
    var yvalue = data[i].yValue
  
    var tippingpoint = data[i].tippingPoint;
  
    // Find the corresponding state inside the GeoJSON
    for (var j = 0; j < json.features.length; j++)  {
      var jsonState = json.features[j].properties.name;
  
      if (dataState == jsonState) {
  
      // Copy the data value into the JSON
      json.features[j].properties.gopWin = gopwin
      json.features[j].properties.tippingPoint = tippingpoint
      json.features[j].properties.demWin = demwin
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
    .attr("xlink:href", function(d) {return  d.properties.name})
    .append("path")
    .attr("class","states")
    .attr("d", path)
    .style("stroke", "#fff")
    .style("stroke-width", "1")
    .style("fill", function(d) {return color(d.properties.gopWin);})
    .attr("text-anchor","middle").on('mouseover', function(d) {

      d3.select(this)
      .style("opacity", .3)
      
  
        tool_tip.show();
        var tipSVG = d3.select("#tipDiv")
          .append("svg")
          .attr("width", 175)
      .attr("height", 120)
      ;
      
    
        tipSVG.append("rect")
          .attr("fill", "#FF6060")
          .attr("y", 50)
          .attr("x",5)
          .attr("width", 0)
          .attr("height", 20)
          .transition()
          .duration(300)
          .attr("width", d.properties.gopWin);
      
    tipSVG.append("text")
          .text("Gop Win" +"%")
      .attr("y", 45)
      .attr("x",5),
    
    tipSVG.append("text")
      .text(d.properties.name)
      .attr("y", 20)
      .attr("x",10)
      .attr("fill","#black")
      .style("font-weight","600")
      .style("font-size","20");
    
      tipSVG.append("text")
          .text("Dem Win" +"%")
          .attr("y", 105)
          .attr("x",5);
          
    
        tipSVG.append("text")
          .text(d.properties.gopWin +"%")
          .attr("y", 65)
          .attr("x",5)
          
      .attr("x", 110)
      .attr("fill","#FF6060")
      .style("font-weight","600")
      .style("font-size","15");
    
    tipSVG.append("rect")
          .attr("fill", "#0091FF")
          .attr("y", 70)
          .attr("x",5)
          .attr("width", 0)
          .attr("height", 20)
          .transition()
          .duration(300)
          .attr("width", d.properties.demWin);
    
        tipSVG.append("text")
          .text(d.properties.demWin +"%")
          .attr("y", 85)
          .attr("x",5)
      .attr("x", 110)
      .attr("fill","#0091FF")
      .style("font-weight","600")
      .style("font-size","15");
      })
      .on('mouseout', 
      function(d) {

        d3.select(this)
        .style("opacity",1)
        
    tool_tip.hide()});
  
    	
              svg.selectAll("path2")
    .data(json.features)
      .enter()
      .append("path")
      .attr("class","states")
    .attr("d", path)
    .style("stroke", d => d.properties.tippingPoint >= 3 ? "black": "none")
    .style("stroke-width", "1.5")
    .style("fill", "none")
    
    svg.append("rect")
              .attr("x", 850)
              .attr("y", 350)
              .attr("width", 20)
              .attr("height", 20)
              .style("stroke", "black")
        .style("stroke-width", 2)
        .attr("ry","6")
        .style("fill", "none");
  
    svg.append("text")
          .text("Tipping Points")
          .attr("x", 760)
      .attr("y", 365)
      .attr("fill","black")
      .style("font-weight","500")
      .style("font-size","15");

      
    d3.csv("US Map.csv", function(error, data){


   

      svg.selectAll("labels")
      .data(data)
      .enter()
      .append("text")
.text(d => d.label)
.attr("x",d=> d.xValue)
.attr("y",d=> d.yValue)
.attr("font-family","brandon-grotesque")
.attr("font-weight","700")
.attr("font-size","10")
.attr("fill","black")
.attr("text-anchor","middle")


    });	
  });
});