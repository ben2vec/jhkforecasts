



var width3 = 1020;
var height3 = 500;


var projection = d3.geoAlbersUsa()
  .translate([width3 / 2, height3 / 2])   
  .scale([900]);         


var path = d3.geoPath()             
  .projection(projection);  



var color = d3.scaleLinear()
  .domain([-30, 0, 30])
  .range(["#0091FF", "white", "#FF6060"]);

var gopwincol = "#FF6060"
var demwincol = "#0091FF"

var svg = d3.select("#usmap")
  .append("svg")
  .attr("viewBox", '100 -50 820 950');

var formatValue = d3.format(".3");

simulation = Math.random()

norminv = jStat.normal.inv(.9, 0, 1)
console.log(formatValue(norminv))

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
    d.absmargin = Math.abs(d.margin);
    return d;
  })
  
  var data = data.sort((a, b) => a.margin-b.margin)
  
  

  data.forEach(function (d,i) {
    d.index = i+1;
    d.indexev = d.index==1?0:data[i-1].indexev+data[i-1].electoralvotes;
    return d;
  })

  
  console.log(data)
  
  var gopev = d3.sum(data, d => d.gopev)
  var demev = 538 - gopev
    
  console.log(gopev)
  console.log(data)
  console.log(data[0].gopvote)
  console.log(data[0].demvote)
  console.log(data[0].thirdvote)
  console.log(data[0].margin)
 
  d3.json("us-states.json", function (json) {

    
    for (var i = 0; i < data.length; i++) {

      
      var dataState = data[i].state;

       
      var margin = data[i].margin;
      
      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.name;

        if (dataState == jsonState) {

          
          json.features[j].properties.margin = margin

            ;


         

          break;
        }
      }
    }
    console.log(json.features)
    console.log(data)
    
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


      var x = d3.scaleLinear()
        .range([0,538])
        .domain([120,880])

      svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y",900)
      .attr("x",)
      


      

    



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