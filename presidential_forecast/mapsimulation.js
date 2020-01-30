



var width3 = 1020;
var height3 = 500;


var projection = d3.geoAlbersUsa()
  .translate([width3 / 2, height3 / 2])
  .scale([900]);


var path = d3.geoPath()
  .projection(projection);

var colormargin = d3.scaleLinear()
  .domain([100, -30, 0, 30, 100])
  .range(["#0091FF", "#0091FF", "white", "#FF6060", "#FF6060"]);

var color = d3.scaleLinear()
  .domain([-100, -10, 0, 10, 100])
  .range(["#0091FF", "#0091FF", "white", "#FF6060", "#FF6060"]);

var gopwincol = "#FF6060"
var demwincol = "#0091FF"
var thirdwincol = "#FFE130"

var svg = d3.select("#usmap")
  .append("svg")
  .attr("viewBox", '100 -50 820 2800');

var tool_tip1 = d3.tip()
  .attr("class", "d3-tip")
  .offset([-75, -75])
  .html("<div id='tipDiv1'></div>");

var tool_tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-150, -30])
  .html("<div id='tipDiv'></div>");

svg.call(tool_tip);

svg.call(tool_tip1)

var formatValue = d3.format(".2");
var formatvalue = d3.format(".3");

simulation = Math.random()



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
      pollclose: +d.pollclose,
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
    d.height = d.absmargin > 50 ? 300 : d.absmargin * 6
    d.gopvoteperc = d.gopvote * d.voteperc
    d.demvoteperc = d.demvote * d.voteperc
    d.thirdvoteperc = d.thirdvote * d.voteperc
    return d;
  })

  var data = data.sort((a, b) => a.margin - b.margin)
  var dataabs = data




  data.forEach(function (d, i) {
    d.index = i + 1;
    d.indexev = d.index == 1 ? 0 : data[i - 1].indexev + data[i - 1].electoralvotes;
    d.tippingpoint = d.indexev<270?d.indexev+d.electoralvotes>=270?1:0:0
    return d;
  })



  var gopev = d3.sum(data, d => d.gopev)
  var demev = 538 - gopev
  var goppopvote = d3.sum(data, d => d.gopvoteperc)
  var dempopvote = d3.sum(data, d => d.demvoteperc)
  var thirdpopvote = d3.sum(data, d => d.thirdvoteperc)



  d3.json("us-states.json", function (json) {


    for (var i = 0; i < data.length; i++) {


      var dataState = data[i].state;
      var margin = data[i].margin;
      var gopvote = data[i].gopvote;
      var demvote = data[i].demvote;
      var thirdvote = data[i].thirdvote;
      var tippingpoint = data[i].tippingpoint;
      var absmargin = data[i].absmargin;
      var pollclose = data[i].pollclose;
      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.name;

        if (dataState == jsonState) {
          json.features[j].properties.margin = margin
          json.features[j].properties.gopvote = gopvote
          json.features[j].properties.demvote = demvote
          json.features[j].properties.thirdvote = thirdvote
          json.features[j].properties.tippingpoint = tippingpoint
          json.features[j].properties.pollclose = pollclose
            ;




          break;
        }
      }
    }
    json.features.sort((a, b) => a.properties.pollclose - b.properties.pollclose)
    console.log(data)
    console.log(dataabs)
    console.log(gopev)
    console.log(json.features)


    svg.append("g")
      .attr("id", "margin")
      .selectAll("path2")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "BLACK")
      .style("stroke-width", "1")
      .style("fill", d => colormargin(d.properties.margin))
      .on("mouseover", function (d) {

        tool_tip.show();
        var tipSVG = d3.select("#tipDiv")
          .append("svg")
          .attr("width", 175)
          .attr("height", 150)
          ;
        tipSVG.append("rect")
          .attr("y1", 0)
          .attr("x1", 0)
          .attr("width", 175)
          .attr("height", 150)
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
          .attr("text-anchor", "middle");



        tipSVG.append("line")
          .attr("y1", 30)
          .attr("x1", 0)
          .attr("y2", 30)
          .attr("x2", 200)
          .attr("stroke", "black")
          .attr("stroke-width", 1)


        tipSVG.append("text")
          .text(d.properties.gopvote > d.properties.demvote ? "Trump" : "Democrats")
          .attr("y", 50)
          .attr("x", 10)
          .attr("fill", d.properties.gopvote > d.properties.demvote ? gopwincol : demwincol)
          .style("font-weight", "600")
          .style("font-size", "20")
          .attr("text-anchor", "start");

        tipSVG.append("text")
          .text(d.properties.gopvote > d.properties.demvote ? formatvalue(d.properties.gopvote) + "%" : formatvalue(d.properties.demvote) + "%")
          .attr("y", 50)
          .attr("x", 160)
          .attr("fill", d.properties.gopvote > d.properties.demvote ? gopwincol : demwincol)
          .style("font-weight", "600")
          .style("font-size", "20")
          .attr("text-anchor", "end");

        tipSVG.append("text")
          .text(d.properties.gopvote < d.properties.demvote ? "Trump" : "Democrats")
          .attr("y", 80)
          .attr("x", 10)
          .attr("fill", d.properties.gopvote < d.properties.demvote ? gopwincol : demwincol)
          .style("font-weight", "600")
          .style("font-size", "20")
          .attr("text-anchor", "start");

        tipSVG.append("text")
          .text(d.properties.gopvote < d.properties.demvote ? formatvalue(d.properties.gopvote) + "%" : formatvalue(d.properties.demvote) + "%")
          .attr("y", 80)
          .attr("x", 160)
          .attr("fill", d.properties.gopvote < d.properties.demvote ? gopwincol : demwincol)
          .style("font-weight", "600")
          .style("font-size", "20")
          .attr("text-anchor", "end");

        tipSVG.append("text")
          .text("3rd Party")
          .attr("y", 110)
          .attr("x", 10)
          .attr("fill", thirdwincol)
          .style("font-weight", "600")
          .style("font-size", "20")
          .attr("text-anchor", "start");

        tipSVG.append("text")
          .text(formatValue(d.properties.thirdvote) + "%")
          .attr("y", 110)
          .attr("x", 160)
          .attr("fill", thirdwincol)
          .style("font-weight", "600")
          .style("font-size", "20")
          .attr("text-anchor", "end");


        tipSVG.append("text")
          .text(d.properties.gopvote > d.properties.demvote ? "Trump +" + formatValue(Math.abs(d.properties.margin)) + " %" : "Democrats +" + formatValue(Math.abs(d.properties.margin)) + " %")
          .attr("y", 140)
          .attr("x", 87.5)
          .attr("fill", d.properties.gopvote > d.properties.demvote ? gopwincol : demwincol)
          .style("font-weight", "600")
          .style("font-size", "20")
          .attr("text-anchor", "middle");

      })
      .on('mouseout',
        function (d) {
          tool_tip.hide()
        })

    svg.append("g")
      .attr("id", "winner")
      .selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "BLACK")
      .style("stroke-width", "1")
      .style("fill", "white")
      .on("mouseover", function (d) {

        tool_tip.show();
        var tipSVG = d3.select("#tipDiv")
          .append("svg")
          .attr("width", 175)
          .attr("height", 150)
          ;
        tipSVG.append("rect")
          .attr("y1", 0)
          .attr("x1", 0)
          .attr("width", 175)
          .attr("height", 150)
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
          .attr("text-anchor", "middle");



        tipSVG.append("line")
          .attr("y1", 30)
          .attr("x1", 0)
          .attr("y2", 30)
          .attr("x2", 200)
          .attr("stroke", "black")
          .attr("stroke-width", 1)


        tipSVG.append("text")
          .text(d.properties.gopvote > d.properties.demvote ? "Trump" : "Democrats")
          .attr("y", 50)
          .attr("x", 10)
          .attr("fill", d.properties.gopvote > d.properties.demvote ? gopwincol : demwincol)
          .style("font-weight", "600")
          .style("font-size", "20")
          .attr("text-anchor", "start");

        tipSVG.append("text")
          .text(d.properties.gopvote > d.properties.demvote ? formatvalue(d.properties.gopvote) + "%" : formatvalue(d.properties.demvote) + "%")
          .attr("y", 50)
          .attr("x", 160)
          .attr("fill", d.properties.gopvote > d.properties.demvote ? gopwincol : demwincol)
          .style("font-weight", "600")
          .style("font-size", "20")
          .attr("text-anchor", "end");

        tipSVG.append("text")
          .text(d.properties.gopvote < d.properties.demvote ? "Trump" : "Democrats")
          .attr("y", 80)
          .attr("x", 10)
          .attr("fill", d.properties.gopvote < d.properties.demvote ? gopwincol : demwincol)
          .style("font-weight", "600")
          .style("font-size", "20")
          .attr("text-anchor", "start");

        tipSVG.append("text")
          .text(d.properties.gopvote < d.properties.demvote ? formatvalue(d.properties.gopvote) + "%" : formatvalue(d.properties.demvote) + "%")
          .attr("y", 80)
          .attr("x", 160)
          .attr("fill", d.properties.gopvote < d.properties.demvote ? gopwincol : demwincol)
          .style("font-weight", "600")
          .style("font-size", "20")
          .attr("text-anchor", "end");

        tipSVG.append("text")
          .text("3rd Party")
          .attr("y", 110)
          .attr("x", 10)
          .attr("fill", thirdwincol)
          .style("font-weight", "600")
          .style("font-size", "20")
          .attr("text-anchor", "start");

        tipSVG.append("text")
          .text(formatValue(d.properties.thirdvote) + "%")
          .attr("y", 110)
          .attr("x", 160)
          .attr("fill", thirdwincol)
          .style("font-weight", "600")
          .style("font-size", "20")
          .attr("text-anchor", "end");


        tipSVG.append("text")
          .text(d.properties.gopvote > d.properties.demvote ? "Trump +" + formatValue(Math.abs(d.properties.margin)) + " %" : "Democrats +" + formatValue(Math.abs(d.properties.margin)) + " %")
          .attr("y", 140)
          .attr("x", 87.5)
          .attr("fill", d.properties.gopvote > d.properties.demvote ? gopwincol : demwincol)
          .style("font-weight", "600")
          .style("font-size", "20")
          .attr("text-anchor", "middle");

      })
      .on('mouseout',
        function (d) {
          tool_tip.hide()
        })
      .transition()
        .delay( function(d,i){return 100*i})
        .style("fill", d => d.properties.margin >= 0 ? gopwincol : demwincol)
      
      ;
      svg.selectAll("path2")
      .data(json.features)
        .enter()
        .append("path")
        .attr("class","states")
      .attr("d", path)
      .style("stroke", d => d.properties.tippingpoint ==1 ? "black": "none")
      .style("stroke-width", "2")
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
  .text("Tipping Point")
  .attr("x", 760)
.attr("y", 365)
.attr("fill","black")
.style("font-weight","500")
.style("font-size","15");

    var x = d3.scaleLinear()
      .domain([0, 538])
      .range([0, 750])

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("stroke", "white")
      .attr("transform", "translate(135,0)")
      .attr("y", d => 1000 - d.height)
      .attr("x", d => x(d.indexev))
      .attr("rx", 3)
      .attr("height", d => d.height)
      .attr("width", d => x(d.electoralvotes))
      .attr("fill", d => color(d.margin))
      .on('mouseover', function (d) {
        tool_tip1.show();
        var tipSVG = d3.select("#tipDiv1")
          .append("svg")
          .attr("width", 200)
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
          .text(d.margin > 0 ? "R+" + formatValue(d.absmargin) + "%" : "D+" + formatValue(d.absmargin) + "%")
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
      .attr("y1", 1000)
      .attr("x2", 510)
      .attr("y2", 720)
      .attr("stroke", "black")
      .attr("stroke-width", "1");

    svg.append("text")
      .html("270")
      .attr("x", 510)
      .attr("y", 1020)
      .attr("text-anchor", "middle")
      .style("font-weight", "600")
      .style("font-family", "brandon-grotesque");

    svg.append("text")
      .text("Which State tipped this election?")
      .attr("x", 510)
      .attr("y", 700)
      .attr("text-anchor", "middle")
      .style("font-weight", "600")
      .style("font-family", "brandon-grotesque");

    var dataabs = data
    var dataabs = dataabs.sort((a, b) => Math.abs(a.margin) - Math.abs(b.margin))

    console.log(dataabs)

    var svgLegend = svg.append('g')
      .attr('class', 'gLegend')
      .attr("transform", "translate(" + 100 + "," + 1100 + ")")



    var legend = svgLegend.selectAll('.legend')
      .data(data)
      .enter().append('g')
      .attr("class", "legend")
      .attr("transform", function (d, i) { return "translate(0," + i * 25 + ")" })


    legend.append("rect")
      .attr("x",d=>d.margin>=0? 530:470)
      .attr("y", -27)
      .attr("width", 60)
      .attr("height", 24)
      .style("fill", d=>d.margin>=0? gopwincol:demwincol)

    legend.append("text")
      .attr("class", "legend-text")
      .attr("x", 30)
      .attr("y", -10)
      .style("fill", "Black")
      .style("font-size", 15)
      .attr("font-weight", 500)
      .text(d => d.state)
      .attr("text-anchor", "start")

    legend.append("text")
      .attr("class", "legend-text")
      .attr("x", 230)
      .attr("y", -10)
      .style("fill", "Black")
      .style("font-size", 15)
      .attr("font-weight", 500)
      .text(d => d.electoralvotes)
      .attr("text-anchor", "middle")

    legend.append("text")
      .attr("class", "legend-text")
      .attr("x", 500)
      .attr("y", -10)
      .style("fill", "Black")
      .style("font-size", 12)
      .attr("font-weight", 500)
      .text(d => formatvalue(d.demvote) + "%")
      .attr("text-anchor", "middle")

    legend.append("text")
      .attr("class", "legend-text")
      .attr("x", 560)
      .attr("y", -10)
      .style("fill", "Black")
      .style("font-size", 12)
      .attr("font-weight", 500)
      .text(d => formatvalue(d.demvote) + "%")
      .attr("text-anchor", "middle")

      legend.append("text")
      .attr("class", "legend-text")
      .attr("x", 620)
      .attr("y", -10)
      .style("fill", "Black")
      .style("font-size", 12)
      .attr("font-weight", 500)
      .text(d => formatValue(d.thirdvote) + "%")
      .attr("text-anchor", "middle")


    legend.append("text")
      .attr("class", "legend-text")
      .attr("x", 750)
      .attr("y", -10)
      .style("fill", d => d.margin>=0?gopwincol:demwincol)
      .style("font-size", 12)
      .attr("font-weight", 500)
      .text(d => d.margin>=0?"Trump +"+formatValue(d.margin) + "%":"Democrat +"+formatValue(Math.abs(d.margin)) + "%")
      .attr("text-anchor", "middle")


      legend.append("text")
      .attr("class", "legend-text")
      .attr("x", 350)
      .attr("y", -10)
      .style("fill", d=>d.tippingpoint==1?gopev>=270?gopwincol:demwincol:"black")
      .style("font-size", 15)
      .attr("font-weight", 500)
      .text(d => d.indexev+d.electoralvotes)
      .attr("text-anchor", "middle")



    legend.append("line")
      .attr("x1", 0)
      .attr("x2", 950)
      .attr("y1", -2.5)
      .attr("y2", -2.5)
      .attr("stroke-width", 1)
      .attr("stroke", "#E2E2E2")

      svg.append("text")
      .attr("class", "legend-text")
      .attr("x", 130)
      .attr("y", 1060)
      .style("fill", "Black")
      .style("font-size", 20)
      .attr("font-weight", 700)
      .text("State")
      .attr("text-anchor", "start")

      svg.append("text")
      .attr("class", "legend-text")
      .attr("x", 330)
      .attr("y", 1060)
      .style("fill", "Black")
      .style("font-size", 15)
      .attr("font-weight", 700)
      .text("Electoral Votes")
      .attr("text-anchor", "middle")

      svg.append("text")
      .attr("class", "legend-text")
      .attr("x", 450)
      .attr("y", 1060)
      .style("fill", "Black")
      .style("font-size", 12)
      .attr("font-weight", 700)
      .text("Democrat ranked EVs")
      .attr("text-anchor", "middle")

      svg.append("text")
      .attr("class", "legend-text")
      .attr("x", 600)
      .attr("y", 1060)
      .style("fill", "Black")
      .style("font-size", 12)
      .attr("font-weight", 700)
      .text("Democrat")
      .attr("text-anchor", "middle")

      svg.append("text")
      .attr("class", "legend-text")
      .attr("x", 660)
      .attr("y", 1060)
      .style("fill", "Black")
      .style("font-size", 12)
      .attr("font-weight", 700)
      .text("Trump")
      .attr("text-anchor", "middle")

      svg.append("text")
      .attr("class", "legend-text")
      .attr("x", 720)
      .attr("y", 1060)
      .style("fill", "Black")
      .style("font-size", 12)
      .attr("font-weight", 700)
      .text("3rd Party")
      .attr("text-anchor", "middle")

      svg.append("text")
      .attr("class", "legend-text")
      .attr("x", 850)
      .attr("y", 1060)
      .style("fill", "Black")
      .style("font-size", 20)
      .attr("font-weight", 700)
      .text("Margin")
      .attr("text-anchor", "middle")

    svg.append("line")
      .attr("x1", 0)
      .attr("x2", 950)
      .attr("y1", 1070)
      .attr("y2", 1070)
      .attr("stroke-width", 2)
      .attr("stroke", "black")



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
        .attr("x", 880)
        .attr("y", 30)
        .style("fill", gopwincol)
        .style("font-size", 30)
        .attr("font-weight", 700)
        .text(gopev)
        .attr("text-anchor", "end")

      svg.append("text")
        .attr("x", 880)
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

      svg.append("text")
        .attr("x", 510)
        .attr("y", 550)
        .style("fill", "Black")
        .style("font-size", 30)
        .attr("font-weight", 700)
        .text("Popular Vote")
        .attr("text-anchor", "middle")

      svg.append("text")
        .attr("x", 510)
        .attr("y", 630)
        .style("fill", gopwincol)
        .style("font-size", 30)
        .attr("font-weight", 700)
        .text(formatvalue(goppopvote) + "%")
        .attr("text-anchor", "middle")

      svg.append("text")
        .attr("x", 510)
        .attr("y", 590)
        .style("fill", gopwincol)
        .style("font-size", 30)
        .attr("font-weight", 700)
        .text("Trump")
        .attr("text-anchor", "middle")

      svg.append("text")
        .attr("x", 120)
        .attr("y", 630)
        .style("fill", demwincol)
        .style("font-size", 30)
        .attr("font-weight", 700)
        .text(formatvalue(dempopvote) + "%")
        .attr("text-anchor", "start")

      svg.append("text")
        .attr("x", 120)
        .attr("y", 590)
        .style("fill", demwincol)
        .style("font-size", 30)
        .attr("font-weight", 700)
        .text("Democrats")
        .attr("text-anchor", "start")

      svg.append("text")
        .attr("x", 880)
        .attr("y", 630)
        .style("fill", thirdwincol)
        .style("font-size", 30)
        .attr("font-weight", 700)
        .text(formatValue(thirdpopvote) + "%")
        .attr("text-anchor", "end")

      svg.append("text")
        .attr("x", 880)
        .attr("y", 590)
        .style("fill", thirdwincol)
        .style("font-size", 30)
        .attr("font-weight", 700)
        .text("3rd Party")
        .attr("text-anchor", "end")



    });
  });
});