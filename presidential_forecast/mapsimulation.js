



var width3 = 1020;
var height3 = 500;


var projection = d3.geoAlbersUsa()
  .translate([width3 / 2, height3 / 2])   
  .scale([900]);         


var path = d3.geoPath()             
  .projection(projection);  



var color = d3.scaleLinear()
  .domain([-100,-10, 0, 10,100])
  .range(["#0091FF","#0091FF", "white", "#FF6060","#FF6060"]);

var gopwincol = "#FF6060"
var demwincol = "#0091FF"

var svg = d3.select("#usmap")
  .append("svg")
  .attr("viewBox", '100 -50 820 950');

var tool_tip1 = d3.tip()
  .attr("class", "d3-tip")
  .offset([-75, -75])
  .html("<div id='tipDiv1'></div>");

svg.call(tool_tip1)

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
    d.height = d.absmargin>50?300:d.absmargin*6
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
        .domain([0,538])
        .range([0,750])

      svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("stroke","white")
      .attr("transform","translate(135,0)")
      .attr("y",d=>800-d.height)
      .attr("x",d=>x(d.indexev))
      .attr("rx",3)
      .attr("height",d=>d.height)
      .attr("width",d=>x(d.electoralvotes))
      .attr("fill",d=>color(d.margin))
      .on('mouseover', function (d) {
        tool_tip1.show();
        var tipSVG = d3.select("#tipDiv1")
          .append("svg")
          .attr("width", 150)
          .attr("height", 50);
  
  
  
        tipSVG.append("text")
          .text(d.state)
          .attr("y", 20)
          .attr("x", 75)
          .attr("fill", "#black")
          .attr("text-anchor", "middle")
          .style("font-weight", "600")
          .style("font-size", "20");
  
        tipSVG.append("text")
          .text(d.margin > 0?"R+"+formatValue(d.absmargin)+"%":"D+"+formatValue(d.absmargin)+"%")
          .attr("y", 40)
          .attr("x", 75)
          .attr("fill", "#black")
          .attr("text-anchor", "middle")
          .style("font-weight", "600")
          .style("font-size", "20");
  
  
  
  
      })
      .on('mouseout', tool_tip1.hide);
      
      svg.append("line")
      .attr("x1", 510)
      .attr("y1", 800)
      .attr("x2", 510)
      .attr("y2", 510)
      .attr("stroke", "black")
      .attr("stroke-width", "1");
  
    svg.append("text")
      .html("270")
      .attr("x", 510)
      .attr("y", 820)
      .attr("text-anchor", "middle")
      .style("font-weight", "600")
      .style("font-family", "brandon-grotesque");

    svg.append("text")
      .text("Which State tipped this election?")
      .attr("x", 510)
      .attr("y", 500)
      .attr("text-anchor", "middle")
      .style("font-weight", "600")
      .style("font-family", "brandon-grotesque");

    



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