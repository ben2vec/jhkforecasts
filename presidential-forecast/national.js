var colors = ["#FF6060", "#0091FF", "#FFE130"]
var tformat = d3.timeFormat("%m/%d/%Y")
var dateparse = d3.timeParse("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
var numberformat = d3.format(".1f")
var widthmap = 1020
var heightmap = 500;
var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia", "Maine-1", "Maine-2", "Nebraska-1", "Nebraska-2", "Nebraska-3", "US"]
var projection = d3.geoAlbersUsa()
  .translate([widthmap / 2, heightmap / 2])
  .scale([900]);

var path = d3.geoPath()
  .projection(projection);


var color = d3.scaleLinear()
  .domain([0, 50, 100])
  .range(["#0091FF", "white", "#FF6060"]);



var map = d3.select("#usmap")
  .append("svg")
  .attr("viewBox", '100 50 1120 450');






var tool_tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-180, -90])
  .html("<div id='tipDiv'></div>");

map.call(tool_tip);


d3.csv("data.csv", function (data) {


  data.forEach((d, i) => {
    d.forecast_date = dateparse(d.forecast_date)
    return d
  })

  var newest_update = d3.max(data, d => d.forecast_date)


  var newest_data = data.slice(data.length - 171, data.length)
  console.log(newest_update)
  console.log(data)
  console.log(newest_data)

  var sd = []
  for (let k = 0; k < states.length; k++) {
    var dt = newest_data.filter(d => d.state == states[k])

    var finaldt = {
      state: states[k],
      electoral_votes: +dt[0].electoral_vote,
      gop_win: +dt[0].win,
      dem_win: +dt[1].win,
      third_win: +dt[2].win,
      gop_vote: +dt[0].proj_vote,
      dem_vote: +dt[1].proj_vote,
      third_vote: +dt[2].proj_vote,
      tipping_point: +dt[0].tipping_point,
    }
    finaldt.margin = finaldt.gop_vote - finaldt.dem_vote
    sd.push(finaldt)
  }

  console.log(sd)

  d3.json("https://projects.jhkforecasts.com/presidential_forecast/us-states.json", function (json) {

    for (var i = 0; i < sd.length; i++) {

      var dataState = sd[i].state;
      var gopwin = sd[i].gop_win
      var demwin = sd[i].dem_win
      var tippingpoint = sd[i].tipping_point
      var ev = sd[i].electoral_votes

      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.name;

        if (dataState == jsonState) {
          json.features[j].properties.gopWin = gopwin
          json.features[j].properties.tippingPoint = tippingpoint
          json.features[j].properties.demWin = demwin
          json.features[j].properties.ev = ev
          break;
        }
      }
    }


    map.selectAll("path")
      .data(json.features)
      .enter()
      //.append("a")
      //.attr("xlink:href", d=> d.properties.name )
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

        tipSVG.append("image")
          .attr("xlink:href", d => "https://jhkforecasts.com/Biden-01.png")
          .attr("x", 3)
          .attr("y", 50)
          .attr("width", 82)
          .attr("height", 82)

        tipSVG.append("text")
          .text(numberformat(d.properties.gopWin) + "%")
          .attr("y", 150)
          .attr("x", 131.25)
          .attr("fill", color(100))
          .style("font-weight", "600")
          .style("font-size", 20)
          .attr("text-anchor", "middle")

        tipSVG.append("text")
          .text(numberformat(d.properties.demWin) + "%")
          .attr("y", 150)
          .attr("x", 43.75)
          .attr("fill", color(0))
          .style("font-weight", "600")
          .style("font-size", 20)
          .attr("text-anchor", "middle")



      })
      .on('mouseout',
        function (d) {

          d3.select(this)
            .style("fill", function (d) { return color(d.properties.gopWin); })

          tool_tip.hide()
        });


    map.selectAll("path2")
      .data(json.features)
      .enter()
      .append("path")
      .attr("class", "states")
      .attr("d", path)
      .style("stroke", d => d.properties.tippingPoint >= 3 ? "black" : "none")
      .style("stroke-width", "1.5")
      .style("fill", "none")

    map.append("rect")
      .attr("x", 850)
      .attr("y", 350)
      .attr("width", 20)
      .attr("height", 20)
      .style("stroke", "black")
      .style("stroke-width", 2)
      .attr("ry", "6")
      .style("fill", "none");

    map.append("text")
      .text("Tipping Points")
      .attr("x", 760)
      .attr("y", 365)
      .attr("fill", "black")
      .style("font-weight", "500")
      .style("font-size", "15");


    d3.csv("https://projects.jhkforecasts.com/presidential_forecast/US%20Map.csv", function (error, data) {




      map.selectAll("labels")
        .data(data)
        .enter()
        .append("text")
        .text(d => d.label)
        .attr("x", d => d.xValue)
        .attr("y", d => d.yValue)
        .attr("font-family", "brandon-grotesque")
        .attr("font-weight", "500")
        .attr("font-size", "10")
        .attr("fill", "black")
        .attr("text-anchor", "middle")

    })

    var winner = sd[56].gop_win > sd[56].dem_win?"Trump":"Biden"

    map.append("text")
      .text("Win White House")
      .attr("x", 1037.5)
      .attr("y", 80)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "25")
      .attr("fill", "black")
      .attr("text-anchor", "middle")

    map.append("text")
      .text(numberformat(sd[56].gop_win) + "%")
      .attr("x", 1100)
      .attr("y", winner=="Trump"?175:375)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "35")
      .attr("fill", colors[0])
      .attr("text-anchor", "middle")

    map.append("text")
      .text(numberformat(sd[56].dem_win) + "%")
      .attr("x", 1100)
      .attr("y", winner=="Biden"?175:375)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "35")
      .attr("fill", colors[1])
      .attr("text-anchor", "middle")

    map.append("image")
      .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
      .attr("x", 900)
      .attr("y", winner=="Trump"?100:300)
      .attr("width", 150)
      .attr("height", 150)

    map.append("image")
      .attr("xlink:href", d => "https://jhkforecasts.com/Biden-01.png")
      .attr("x", 900)
      .attr("y", winner=="Biden"?100:300)
      .attr("width", 150)
      .attr("height", 150)


  })
})
