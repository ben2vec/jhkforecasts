
var tformat = d3.timeFormat("%m/%d/%Y");
var dateparse = d3.timeParse("%m/%d/%y");
var timeparse = d3.timeParse("%m/%d/%y %H:%M");
var nf = d3.format(".1f");
var updated_format = d3.timeFormat("%b. %d %Y %I:%M %p");
var widthmap = 1020;
var heightmap = 500;

var projection = d3.geoAlbersUsa()
  .translate([widthmap / 2, heightmap / 2])
  .scale([900]);

var path = d3.geoPath()
  .projection(projection);


var color = d3.scaleLinear()
  .domain([0, 50, 100])
  .range(["#0091FF", "white", "#FF6060"]);

var maphone = d3.select("#usmapphone")
  .append("svg")
  .attr("viewBox", '150 -200 750 700');

d3.select("#overviewphone").append("h1")
  .text("National Overview")
  .style("font-weight", 900)

var overviewphone = d3.select("#overviewphone")
  .append("svg")
  .attr("viewBox", '0 0 1000 500');

var tool_tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-150, -75])
  .html("<div id='tipDiv'></div>");

maphone.call(tool_tip);



d3.csv("https://data.jhkforecasts.com/2020-presidential.csv", function (data) {

  document.getElementById("topBanner").style.backgroundColor = color(data[data.length - 3].win)
  var updated = data[data.length - 1].tippingPoint
  data.forEach((d, i) => {
    d.rawDate = d.forecastDate
    d.candidate = d.candidate == "Joseph R. Biden Jr." ? "Joseph Biden" : d.candidate
    d.forecastDate = dp(d.forecastDate)
    return d
  })
  data.sort((a, b) => a.forecastDate - b.forecastDate)
  const array = data.map(d => {
    return d.rawDate
  })
  const uniqueSet = new Set(array)
  var dates = [...uniqueSet]
  var dates = dates.map(d => {
    return dp(d)
  })
  document.getElementById("updated").innerHTML = "Updated: " + updated

  var newest_data = data.slice(data.length - 228, data.length)
  var upset_odds = newest_data[225].win > newest_data[224].win ? +newest_data[224].win : +newest_data[225].win

  var sd = [];
  for (let k = 0; k < map_states.length; k++) {
    var dt = newest_data.filter(d => d.state == states[k]);

    var ml = map_labels.filter(d => d.state == states[k]);
    var finaldt = {
      state: states[k],
      evs: +dt[0].ev,
      gopWIn: +dt[1].win,
      demWin: +dt[0].win,
      third_win: +dt[2].win,
      gop_vote: +dt[1].vote,
      dem_vote: +dt[0].vote,
      third_vote: +dt[2].vote,
      tippingPoint: +dt[0].tippingPoint,
      x_value: ml[0].xValue,
      y_value: ml[0].yValue,
      label: ml[0].label,

    }
    finaldt.margin = finaldt.gop_vote - finaldt.dem_vote
    sd.push(finaldt)
  }
  var boxstates = [sd[29], sd[45], sd[21], sd[39], sd[30], sd[6], sd[7], sd[20], sd[8]]

  maphone.append("rect")
    .attr("x", 150)
    .attr("y", -200)
    .attr("width", 750)
    .attr("height", 700)
    .attr("fill", "white")
    .on('click',
      function (d) {


        tool_tip.hide()
      });

  maphone.selectAll()
    .data(boxstates)
    .enter()
    .append("rect")
    .attr("x", 850)
    .attr("y", (d, i) => 130 + 25 * i)
    .attr("width", 30)
    .attr("height", 25)
    .attr("stroke", "white")
    .attr("fill", d => color(d.gopWIn))

  maphone.selectAll()
    .data(boxstates)
    .enter()
    .append("text")
    .text(d => d.label)
    .attr("x", 865)
    .attr("y", (d, i) => 142.5 + 25 * i)
    .style("font-family", "sf-mono")
    .attr("font-size", "16")
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("font-weight", "100")
    .attr("dominant-baseline", "central")

  maphone.selectAll()
    .data(boxstates)
    .enter()
    .append("rect")
    .attr("class", "statesover")
    .attr("x", 850)
    .attr("y", (d, i) => 130 + 25 * i)
    .attr("width", 30)
    .attr("height", 25)
    .attr("fill", "none")
    .on('mouseover', function (d) {


      tool_tip.offset([-150, -140])
      tool_tip.show();
      var tipSVG = d3.select("#tipDiv")
        .append("svg")
        .attr("width", 150)
        .attr("height", 150)
        ;
      tipSVG.append("rect")
        .attr("y", 1.5)
        .attr("x", 1.5)
        .attr("width", 147)
        .attr("height", 147)
        .attr("rx", 8)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 2)



      tipSVG.append("text")
        .text(d.state == "District of Columbia" ? "DC" : d.state)
        .attr("y", 20)
        .attr("x", 75)
        .attr("fill", "#black")
        .attr("font-weight", "100")
        .style("font-size", "15")
        .attr("text-anchor", "middle")

      tipSVG.append("text")
        .text(d.evs + " Electoral Votes")
        .attr("y", 40)
        .attr("x", 75)
        .attr("fill", "#black")
        .attr("font-weight", "500")
        .style("font-size", "12")
        .attr("text-anchor", "middle")

      tipSVG.append("image")
        .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
        .attr("x", 77.5)
        .attr("y", 50)
        .attr("width", 70)
        .attr("height", 70)

      tipSVG.append("image")
        .attr("xlink:href", d => "https://jhkforecasts.com/Biden-01.png")
        .attr("x", 2.5)
        .attr("y", 50)
        .attr("width", 70)
        .attr("height", 70)

      tipSVG.append("text")
        .text(nf(d.gopWIn) + "%")
        .attr("y", 135)
        .attr("x", 112.5)
        .attr("fill", color(100))
        .attr("font-weight", "100")
        .style("font-size", 15)
        .attr("text-anchor", "middle")

      tipSVG.append("text")
        .text(nf(d.demWin) + "%")
        .attr("y", 135)
        .attr("x", 37.5)
        .attr("fill", color(0))
        .attr("font-weight", "100")
        .style("font-size", 15)
        .attr("text-anchor", "middle")




    })
    .on('mouseout',
      function (d) {


        tool_tip.hide()
      });

  d3.json("https://projects.jhkforecasts.com/presidential-forecast/us-states.json", function (json) {

    for (var i = 0; i < sd.length; i++) {

      var dataState = sd[i].state;
      var gopwin = sd[i].gopWIn
      var demwin = sd[i].demWin
      var tippingpoint = sd[i].tippingPoint
      var ev = sd[i].evs
      var xv = sd[i].x_value
      var yv = sd[i].y_value
      var label = sd[i].label


      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.name;

        if (dataState == jsonState) {
          json.features[j].properties.gopWin = gopwin
          json.features[j].properties.tippingPoint = tippingpoint
          json.features[j].properties.demWin = demwin
          json.features[j].properties.ev = ev
          json.features[j].properties.label = label
          json.features[j].properties.yv = yv
          json.features[j].properties.xv = xv
          break;
        }
      }
    }




    maphone.append("text")
      .text("Win")
      .attr("x", 510)
      .attr("y", -170)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "100")
      .attr("font-size", "35")
      .attr("fill", "black")
      .attr("text-anchor", "middle")

    maphone.append("text")
      .text(nf(newest_data[225].win) + "%")
      .attr("x", 740)
      .attr("y", -70)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "100")
      .attr("font-size", "45")
      .attr("fill", colors[0])
      .attr("text-anchor", "end")

    maphone.append("text")
      .text(nf(newest_data[224].win) + "%")
      .attr("x", 310)
      .attr("y", -70)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "100")
      .attr("font-size", "45")
      .attr("fill", colors[1])
      .attr("text-anchor", "start")

    maphone.append("image")
      .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
      .attr("x", 750)
      .attr("y", -150)
      .attr("width", 150)
      .attr("height", 150)

    maphone.append("image")
      .attr("xlink:href", d => "https://jhkforecasts.com/Biden-01.png")
      .attr("x", 150)
      .attr("y", -150)
      .attr("width", 150)
      .attr("height", 150)

    maphone.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("class", "states")
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", "1")
      .style("fill", d => color(d.properties.gopWin))
      .attr("transform", "translate(15,0)")


    maphone.selectAll("label")
      .data(json.features)
      .enter()
      .append("text")
      .text(d => d.properties.label)
      .attr("x", d => d.properties.xv)
      .attr("y", d => d.properties.yv)
      .style("font-family", "sf-mono")
      .attr("font-size", 16)
      .attr("fill", d => Math.abs(d.properties.gopWin - 50) > 15 ? "white" : "black")
      .attr("text-anchor", "middle")
      .attr('dominant-baseline', "central")
      .attr("transform", "translate(15,0)")

    maphone.selectAll("label")
      .data(json.features)
      .enter()
      .append("rect")
      .attr("x", d => d.properties.xv - 12)
      .attr("y", d => d.properties.yv - 10)
      .attr("width", 24)
      .attr("height", 20)
      .style('fill', "none")
      .style('stroke', d => d.properties.tippingPoint >= 3 ? "black" : "none")
      .attr("ry", 2)
      .attr("transform", "translate(15,0)")


    maphone.selectAll("path2")
      .data(json.features)
      .enter()
      .append("path")
      .attr("class", "statesover")
      .attr("d", path)
      .style("stroke-width", "1.5")
      .attr("transform", "translate(15,0)")
      .on('mouseover', function (d) {

        tool_tip.offset([-150, -75])
        tool_tip.show();
        var tipSVG = d3.select("#tipDiv")
          .append("svg")
          .attr("width", 150)
          .attr("height", 150)
          ;
        tipSVG.append("rect")
          .attr("y", 1.5)
          .attr("x", 1.5)
          .attr("width", 147)
          .attr("height", 147)
          .attr("rx", 8)
          .attr("fill", "white")
          .attr("stroke", "black")
          .attr("stroke-width", 2)



        tipSVG.append("text")
          .text(d.properties.name == "District of Columbia" ? "DC" : d.properties.name)
          .attr("y", 20)
          .attr("x", 75)
          .attr("fill", "#black")
          .attr("font-weight", "100")
          .style("font-size", "15")
          .attr("text-anchor", "middle")

        tipSVG.append("text")
          .text(d.properties.ev + " Electoral Votes")
          .attr("y", 40)
          .attr("x", 75)
          .attr("fill", "#black")
          .attr("font-weight", "100")
          .style("font-size", "12")
          .attr("text-anchor", "middle")

        tipSVG.append("image")
          .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
          .attr("x", 77.5)
          .attr("y", 50)
          .attr("width", 70)
          .attr("height", 70)

        tipSVG.append("image")
          .attr("xlink:href", d => "https://jhkforecasts.com/Biden-01.png")
          .attr("x", 2.5)
          .attr("y", 50)
          .attr("width", 70)
          .attr("height", 70)

        tipSVG.append("text")
          .text(nf(d.properties.gopWin) + "%")
          .attr("y", 135)
          .attr("x", 112.5)
          .attr("fill", color(100))
          .attr("font-weight", "100")
          .style("font-size", 16)
          .attr("text-anchor", "middle")

        tipSVG.append("text")
          .text(nf(d.properties.demWin) + "%")
          .attr("y", 135)
          .attr("x", 37.5)
          .attr("fill", color(0))
          .attr("font-weight", "100")
          .style("font-size", 16)
          .attr("text-anchor", "middle")



      })
      .on('mouseout',
        function (d) {


          tool_tip.hide()
        });






    var winner = newest_data[168].win > newest_data[169].win ? "Trump" : "Biden"



    var time_data = data.filter(d => d.state == key_state)

    var lol
    var max_date = d3.max(time_data, d => d.forecastDate)
    var lineData = data.filter(d => d.state == key_state)
    var margin = { top: 50, right: 70, bottom: 50, left: 70 }
    var width = 1400 - margin.left - margin.right
    var height = 1000 - margin.top - margin.bottom
    var axisPad = 12
    var parseTime = d3.timeParse("%Y-%m-%d"),
      formatDate = d3.timeFormat("%b - %d"),
      formatMonth = d3.timeFormat("%Y-%m-%d"),
      bisectDate = d3.bisector(d => d).left,
      wholevalue = d3.format(".0f"),
      onevalue = d3.format(".1f")

    var time = d3.select("#timephone").append("svg")
      .attr("viewBox", "0 0 1400 1000")
      .append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    var x = d3.scaleTime()
      .rangeRound([margin.left, width - margin.right])
      .domain([new Date(2020, 2, 1), new Date(2020, 10, 3)])

    var y = d3.scaleLinear()
      .rangeRound([height - margin.bottom, margin.top]);


    var z = d3.scaleOrdinal()
      .range(colors)
      ;

    var line = d3.line()
      .curve(d3.curveCatmullRom)
      .x(d => x(d.date))
      .y(d => y(d.pct))

    var area = d3.area()
      .x(d => x(d.date))
      .y0(d => y(d.top))
      .y1(d => y(d.bottom));

    time.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + (height - margin.bottom) + ")")
      .call(d3.axisBottom(x).tickSize(-800).ticks(3)
        .tickFormat(d3.timeFormat("%b")))
      .call(g => {
        var years = x.ticks(d3.timeYear.every(1))
        var xshift = 0
        g.selectAll("text")
          .style("text-anchor", "right")
          .attr("y", 20)
          .attr('fill', 'black')
          .attr('fill', 'black')
          .attr('font-size', 40)
          .attr('font-weight', 500)
        g.selectAll("line")
          .attr("opacity", 1)
          .attr("stroke", "#afafaf")


        g.select(".domain")
          .attr("opacity", 0)


      })




    time.append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(" + margin.left + ",0)");

    var focus = time.append("g")
      .attr("class", "focus")
      .style("display", "none");

    focus.append("line").attr("class", "lineHover")
      .style("stroke", "#999")
      .attr("stroke-width", 1.5)
      .style("shape-rendering", "crispEdges")
      .style("opacity", 0.5)
      .attr("y1", -height + 10)
      .attr("y2", -20);

    focus.append("text").attr("class", "lineHoverDate")
      .attr("text-anchor", "middle")
      .attr("font-size", 12);

    var overlay = time.append("rect")
      .attr("class", "overlay")
      .attr("x", margin.left)
      .attr("width", x(max_date) - margin.left)
      .attr("height", height)

    var keys = ["gopwin", "demwin", "thirdwin", "gopvote", "demvote", "thirdvote", "gopev", "demev", "thirdev"]
    update("win", 0);


    function update(input, speed) {

      var cands = candidates

      cands.forEach((d, i) => {
        var candidate = d.candidate
        var candsData = lineData.filter(d => d.candidate == candidate)
        d.line = candsData.map((d => { return { date: d.forecastDate, pct: d[input] } }))
        d.conf = candsData.map(((d, j) => {
          return {
            date: d.forecastDate,
            top: input == "win" ? d[input] : input == "ev" ? +d[input] + +d.p10 * 1.3 : i < 2 ? +d[input] + (4.75 - (j / 150)) : +d[input] + (+d[input] + 3) / 2,
            bottom: input == "win" ? d[input] : input == "ev" ? +d[input] - +d.p10 * 1.3 : i < 2 ? +d[input] - (4.75 - (j / 150)) : +d[input] - (+d[input]) / 1.5,
          }
        }))
      })


      y.domain([
        0,
        input == "ev" ? 500 : input == "vote" ? 60 : 100
      ]).nice();

      time.selectAll(".y-axis").transition()
        .duration(speed)
        .call(d3.axisLeft(y).tickSize(-width + margin.right + margin.left).ticks(5)).call(g => {
          var years = x.ticks(d3.timeYear.every(1))
          var xshift = 0
          g.selectAll("text")
            .style("text-anchor", "right")
            .attr("x", -20)
            .attr('fill', 'black')
            .attr('font-size', 40)
            .attr('font-weight', 500)
          g.selectAll("line")
            .attr("opacity", 1)
            .attr("stroke", "#afafaf")


          g.select(".domain")
            .attr("opacity", 0)


        })

      var city = time.selectAll(".cities")
        .data(cands);

      city.exit().remove();

      var cityout = time.selectAll(".citiesout")
        .data(cands);

      cityout.exit().remove();

      var areas = time.selectAll(".areas")
        .data(cands);

      areas.exit().remove();



      areas.enter().insert("g", ".focus").append("path")
        .attr("class", "line areas")
        .style("fill", (d, i) => partyColors(d.party))
        .style("stroke-width", 4)
        .style("opacity", .2)
        .style("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .merge(areas)
        .transition().duration(speed)
        .attr("d", d => area(d.conf))

      cityout.enter().insert("g", ".focus").append("path")
        .attr("class", "line citiesout")
        .style("stroke", (d, i) => "white")
        .style("stroke-width", 12)
        .style("opacity", 1)
        .style("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .merge(cityout)
        .transition().duration(speed)
        .attr("d", d => line(d.line))

      city.enter().insert("g", ".focus").append("path")
        .attr("class", "line cities")
        .style("stroke", (d, i) => partyColors(d.party))
        .style("stroke-width", 6)
        .style("opacity", .7)
        .style("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .merge(city)
        .transition().duration(speed)
        .attr("d", d => line(d.line))


      tooltip(cands);

      function tooltip(copy) {

        var rect = focus.selectAll(".lineHoverRect")
          .data(cands)

        var labels2 = focus.selectAll(".lineHoverText2")
          .data(copy)

          labels2.enter().append("text")
          .attr("class", "lineHoverText2")
          .attr("font-size", 55)
          .style("fill", "white")
          .style("stroke", "white")
          .style("stroke-width", 12)
          .style("opacity", 1)
          .merge(labels2)

        var labels = focus.selectAll(".lineHoverText")
          .data(copy)

        labels.enter().append("text")
          .attr("class", "lineHoverText")
          .attr("text-anchor", "middle")
          .attr("font-size", 55)
          .merge(labels)

        var circles = focus.selectAll(".hoverCircle")
          .data(copy)

        circles.enter().append("circle")
          .attr("class", "hoverCircle")
          .style("stroke", d => partyColors(d.party))
          .attr("r", 4)
          .attr("stroke-width", 2.5)
          .attr("fill", "white")
          .merge(circles);



        time.selectAll(".overlay")
          .on("mouseover", () => focus.style("display", null))
          .on("mouseout", () => focus.style("display", "none"))
          .on("mousemove", mousemove);

        function mousemove() {
          var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(dates, x0, 1),
            d0 = dates[i - 1],
            d1 = dates[i],
            i = x0 - d0 > d1 - x0 ? dates.indexOf(d1) : dates.indexOf(d1);

          focus.selectAll(".hoverCircle")
            .attr("cy", d => y(d.line[i].pct))
            .attr("cx", x(dates[i]));

          focus.select(".lineHoverDate")
            .attr("x", x(dates[i]))
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .style("font-size", 30)
            .style("font-weight", "100")
            .text(d => formatDate(dates[i]));

          focus.select(".lineHover")
            .attr("transform", d => "translate(" + x(dates[i]) + "," + height + ")")
            .style("opacity", 0)

          focus.selectAll(".lineHoverText")
            .style("font-weight", "500")
            .attr("x", (d, j) => x(dates[i]) + (j % 2 == 0 ? -10 : 10))
            .text((d, j) => d.id + " " + (input == "ev" ? nf(d.line[i].pct) : nf(d.line[i].pct) + "%"))
            .attr("fill", (d, i) => partyColors(d.party))
            .attr("y", (d, j) => y(d.line[i].pct))
            .attr("text-anchor", (d, j) => j % 2 == 0 ? "end" : "start")
            .attr("dominant-baseline", "central")

          focus.selectAll(".lineHoverText2")
            .style("font-weight", "500")
            .attr("x", (d, j) => x(dates[i]) + (j % 2 == 0 ? -10 : 10))
            .text((d, j) => d.id + " " + (input == "ev" ? nf(d.line[i].pct) : nf(d.line[i].pct) + "%"))
            .attr("fill", (d, i) => "white")
            .attr("y", (d, j) => y(d.line[i].pct))
            .attr("text-anchor", (d, j) => j % 2 == 0 ? "end" : "start")
            .attr("dominant-baseline", "central")

        }
      }
      var winbuttonp = d3.select("#winphone")
        .on("click", function () {
          update("win", 500)
        })

      var votebuttonp = d3.select("#votephone")
        .on("click", function () {
          update("vote", 500)
        })
      var evbuttonp = d3.select("#evbuttonphone")
        .on("click", function () {
          update("ev", 500)
        })
    }

    var overview_data = newest_data.filter(d => d.state == "US")
    overview_data.sort((a, b) => b.ev - a.ev)

    overviewphone.selectAll()
      .data(overview_data)
      .enter()
      .append("text")
      .text(d => d.candidate.split(" ")[1])
      .attr("y", (d, i) => 100 + i * 100)
      .attr("x", 20)
      .attr("fill", "black")
      .style("font-weight", "500")
      .style("font-size", 40)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "central")

    overviewphone
      .append("text")
      .text("Candidate")
      .attr("y", 20)
      .attr("x", 20)
      .attr("fill", "black")
      .style("font-weight", "500")
      .style("font-size", 30)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "central")

    overviewphone
      .append("text")
      .text("avg. EVs")
      .attr("y", 20)
      .attr("x", 250)
      .attr("fill", "black")
      .style("font-weight", "500")
      .style("font-size", 30)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "central")

    overviewphone
      .append("text")
      .text("popular vote")
      .attr("y", 20)
      .attr("x", 600)
      .attr("fill", "black")
      .style("font-weight", "500")
      .style("font-size", 30)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "central")

    overviewphone.selectAll()
      .data(overview_data)
      .enter().append("rect")
      .attr("x", 250)
      .attr("y", (d, i) => 47.5 + i * 100)
      .attr("width", d => (d.ev / 538) * 358)
      .attr("height", 95)
      .attr("fill", d => partyColors(d.party))
      .attr("opacity", .7)

    overviewphone.selectAll()
      .data(overview_data)
      .enter().append("rect")
      .attr("x", 600)
      .attr("y", (d, i) => 47.5 + i * 100)
      .attr("width", d => (d.vote) * 5)
      .attr("height", 95)
      .attr("fill", d => partyColors(d.party))
      .attr("opacity", .7)


    overviewphone.selectAll()
      .data(overview_data)
      .enter()
      .append("text")
      .text(d => numberformat(d.ev))
      .attr("y", (d, i) => 100 + i * 100)
      .attr("x", 255)
      .attr("fill", "black")
      .style("font-weight", "500")
      .style("font-size", 40)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "central")

    overviewphone.selectAll()
      .data(overview_data)
      .enter()
      .append("text")
      .text(d => numberformat(d.vote) + "%")
      .attr("y", (d, i) => 100 + i * 100)
      .attr("x", 605)
      .attr("fill", "black")
      .style("font-weight", "500")
      .style("font-size", 40)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "central")

    var sdbars = []
    for (let k = 0; k < bubble_info.length; k++) {
      var dt = newest_data.filter(d => d.state == bubble_info[k].state)
      var finaldt = {
        state: bubble_info[k].state,
        evs: +dt[0].ev,
        gopWIn: +dt[1].win,
        demWin: +dt[0].win,
        third_win: +dt[2].win,
        gop_vote: +dt[1].vote,
        dem_vote: +dt[0].vote,
        third_vote: +dt[2].vote,
        x: bubble_info[k].x,
        y: bubble_info[k].y,
        r: bubble_info[k].radius,
        label: bubble_info[k].abbrev,
        tp: dt[0].tippingPoint
      }
      finaldt.margin = finaldt.gop_vote - finaldt.dem_vote
      sdbars.push(finaldt)
    }

    var barsphone = d3.select("#barsphone")
      .append("svg")
      .attr("viewBox", '-50 0 500 800')

    var tool_tip2 = d3.tip()
      .attr("class", "d3-tip")
      .offset([-180, -90])
      .html("<div id='tipDiv2'></div>");

    barsphone.call(tool_tip2);

    var gopbars = sdbars.filter(d => d.margin >= 0)
    var dembars = sdbars.filter(d => d.margin < 0)

    gopbars.sort((a, b) => b.margin - a.margin)
    gopbars.forEach(function (d, i) {
      d.index = i + 1;
      d.indexev = d.index == 1 ? 0 : gopbars[i - 1].indexev + gopbars[i - 1].evs;

    })
    dembars.sort((a, b) => a.margin - b.margin)
    dembars.forEach(function (d, i) {
      d.index = i + 1;
      d.indexev = d.index == 1 ? 0 : dembars[i - 1].indexev + dembars[i - 1].evs;

    })

    var gop_ev_bars = d3.sum(gopbars, d => d.evs)
    var dem_ev_bars = d3.sum(dembars, d => d.evs)

    var max_evs = gop_ev_bars > dem_ev_bars ? gop_ev_bars : dem_ev_bars



    var xbarsphone = d3.scaleLinear()
      .range([20, 650])
      .domain([0, max_evs])



    barsphone.selectAll("bars")
      .data(gopbars)
      .enter()
      .append("rect")
      .attr("y", d => xbarsphone(d.indexev))
      .attr("x", gop_ev_bars < dem_ev_bars ? 200 : 100)
      .attr("height", d => d.evs * (630 / max_evs))
      .attr("width", 70)
      .attr("ry", 3)
      .attr("fill", d => color(d.gopWIn))
      .attr("stroke", colors[0])
      .attr("stroke-width", 1)
      .on('mouseover', function (d) {


        tool_tip2.show();
        var tipSVG = d3.select("#tipDiv2")
          .append("svg")
          .attr("width", 180)
          .attr("height", 180)
          ;
        tipSVG.append("rect")
          .attr("y", 1)
          .attr("x", 1)
          .attr("width", 178)
          .attr("height", 178)
          .attr("rx", 8)
          .attr("fill", "white")
          .attr("stroke", "black")
          .attr("stroke-width", 2)



        tipSVG.append("text")
          .text(d.state == "District of Columbia" ? "DC" : d.state)
          .attr("y", 20)
          .attr("x", 87.5)
          .attr("fill", "#black")
          .attr("font-weight", "100")
          .style("font-size", "16")
          .attr("text-anchor", "middle")

        tipSVG.append("text")
          .text(d.evs + " Electoral Votes")
          .attr("y", 40)
          .attr("x", 87.5)
          .attr("fill", "#black")
          .attr("font-weight", "100")
          .style("font-size", "15")
          .attr("text-anchor", "middle")


        tipSVG.append("image")
          .attr("xlink:href", d.margin > 0 ? "https://jhkforecasts.com/Trump-01.png" : "https://jhkforecasts.com/Biden-01.png")
          .attr("x", 45)
          .attr("y", 50)
          .attr("width", 90)
          .attr("height", 90)

        tipSVG.append("text")
          .text(d.margin > 0 ? "Trump +" + nf(Math.abs(d.margin)) : "Biden +" + nf(Math.abs(d.margin)))
          .attr("y", 160)
          .attr("x", 87.5)
          .attr("fill", d.margin > 0 ? partyColors("gop") : partyColors("dem"))
          .attr("font-weight", "100")
          .style("font-size", "17")
          .attr("text-anchor", "middle")




      })
      .on('mouseout',
        function (d) {



          tool_tip2.hide()
        });


    barsphone.selectAll("bars")
      .data(dembars)
      .enter()
      .append("rect")
      .attr("y", d => xbarsphone(d.indexev))
      .attr("x", gop_ev_bars > dem_ev_bars ? 200 : 100)
      .attr("height", d => d.evs * (630 / max_evs))
      .attr("width", 70)
      .attr("ry", 3)
      .attr("fill", d => color(d.gopWIn))
      .attr("stroke", colors[1])
      .attr("stroke-width", 1)
      .on('mouseover', function (d) {


        tool_tip2.show();
        var tipSVG = d3.select("#tipDiv2")
          .append("svg")
          .attr("width", 180)
          .attr("height", 180)
          ;
        tipSVG.append("rect")
          .attr("y", 1)
          .attr("x", 1)
          .attr("width", 178)
          .attr("height", 178)
          .attr("rx", 8)
          .attr("fill", "white")
          .attr("stroke", "black")
          .attr("stroke-width", 2)



        tipSVG.append("text")
          .text(d.state == "District of Columbia" ? "DC" : d.state)
          .attr("y", 20)
          .attr("x", 87.5)
          .attr("fill", "#black")
          .attr("font-weight", "100")
          .style("font-size", "16")
          .attr("text-anchor", "middle")

        tipSVG.append("text")
          .text(d.evs + " Electoral Votes")
          .attr("y", 40)
          .attr("x", 87.5)
          .attr("fill", "#black")
          .attr("font-weight", "100")
          .style("font-size", "15")
          .attr("text-anchor", "middle")


        tipSVG.append("image")
          .attr("xlink:href", d.margin > 0 ? "https://jhkforecasts.com/Trump-01.png" : "https://jhkforecasts.com/Biden-01.png")
          .attr("x", 45)
          .attr("y", 50)
          .attr("width", 90)
          .attr("height", 90)

        tipSVG.append("text")
          .text(d.margin > 0 ? "Trump +" + nf(Math.abs(d.margin)) : "Biden +" + nf(Math.abs(d.margin)))
          .attr("y", 160)
          .attr("x", 87.5)
          .attr("fill", d.margin > 0 ? partyColors("gop") : partyColors("dem"))
          .attr("font-weight", "100")
          .style("font-size", "17")
          .attr("text-anchor", "middle")




      })
      .on('mouseout',
        function (d) {



          tool_tip2.hide()
        });

    barsphone.append("image")
      .attr("xlink:href", d => "https://jhkforecasts.com/Biden-01.png")
      .attr("y", xbarsphone(dem_ev_bars) + 10)
      .attr("x", gop_ev_bars > dem_ev_bars ? 200 : 100)
      .attr("width", 75)
      .attr("height", 75)


    barsphone.append("text")
      .text(dem_ev_bars)
      .attr("y", xbarsphone(dem_ev_bars) + 120)
      .attr("x", gop_ev_bars > dem_ev_bars ? 237.5 : 137.5)
      .attr("fill", colors[1])
      .attr("font-weight", "100")
      .style("font-size", "25")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")

    barsphone.append("text")
      .text(gop_ev_bars)
      .attr("y", xbarsphone(gop_ev_bars) + 120)
      .attr("x", gop_ev_bars < dem_ev_bars ? 237.5 : 137.5)
      .attr("fill", colors[0])
      .attr("font-weight", "100")
      .style("font-size", "25")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")


    barsphone.append("image")
      .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
      .attr("y", xbarsphone(gop_ev_bars) + 10)
      .attr("x", gop_ev_bars < dem_ev_bars ? 200 : 100)
      .attr("width", 75)
      .attr("height", 75)

    barsphone.append("image")
      .attr("xlink:href", d => "Arrow-01.svg")
      .attr("y", 400)
      .attr("x", 300)
      .attr("width", 100)
      .attr("height", 100)





    var sd3 = []
    for (let k = 0; k < bubble_info.length; k++) {
      var dt = newest_data.filter(d => d.state == bubble_info[k].state)
      var finaldt = {
        state: bubble_info[k].state,
        evs: +dt[0].ev,
        gopWIn: +dt[1].win,
        demWin: +dt[0].win,
        third_win: +dt[2].win,
        gop_vote: +dt[1].vote,
        dem_vote: +dt[0].vote,
        third_vote: +dt[2].vote,
        x: bubble_info[k].x,
        y: bubble_info[k].y,
        r: bubble_info[k].radius,
        label: bubble_info[k].abbrev,
        tp: dt[0].tippingPoint
      }
      finaldt.margin = finaldt.gop_vote - finaldt.dem_vote
      sd3.push(finaldt)
    }


    var bubblemapphone = d3.select("#bubblemapphone")
      .append("svg")
      .attr("viewBox", '20 0 650 550')

    var tool_tipbm = d3.tip()
      .attr("class", "d3-tip")
      .html("<div id='tipDivbm'></div>");

    bubblemapphone.call(tool_tipbm);

    bubblemapphone.append("rect")
      .attr("x", 20)
      .attr("y", 0)
      .attr("width", 650)
      .attr("height", 550)
      .attr("fill", "white")
      .on("click", d => {
        tool_tipbm.hide();
      })

    bubblemapphone.selectAll("circ")
      .data(sd3)
      .enter()
      .append("a")
      .attr("xlink:href", d => d.state)
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", d => color(d.gopWIn))
      .attr("stroke", d => d.tp > 3 ? "black" : "none")
      .attr("stroke-width", 2)

    bubblemapphone.selectAll("labels")
      .data(sd3)
      .enter()
      .append("a")
      .attr("xlink:href", d => d.state)
      .append("text")
      .text(d => d.label)
      .attr("x", d => d.x)
      .attr("y", d => d.y + 1.1)
      .attr("fill", d => Math.abs(d.gopWIn - 50) > 15 ? "white" : "black")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", d => d.evs < 3 ? 9 : 12)
      .style("font-family", "sf-mono")



    bubblemapphone.selectAll("overfill")
      .data(sd3)
      .enter()
      .append("a")
      .attr("xlink:href", d => d.state)
      .append("circle")
      .attr("class", "statesover")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r).on('mouseover', function (d) {
        var yOff
        yOff = -180 - d.y - d.r
        console.log(yOff)
        tool_tipbm.show().offset([-180, -90]);
        var tipSVG = d3.select("#tipDivbm")
          .append("svg")
          .attr("width", 180)
          .attr("height", 180)
          ;
        tipSVG.append("rect")
          .attr("y", 1)
          .attr("x", 1)
          .attr("width", 178)
          .attr("height", 178)
          .attr("rx", 8)
          .attr("fill", "white")
          .attr("stroke", "black")
          .attr("stroke-width", 2)



        tipSVG.append("text")
          .text(d.state == "District of Columbia" ? "DC" : d.state)
          .attr("y", 20)
          .attr("x", 87.5)
          .attr("fill", "#black")
          .attr("font-weight", "100")
          .style("font-size", "16")
          .attr("text-anchor", "middle")

        tipSVG.append("text")
          .text(d.evs + " Electoral Votes")
          .attr("y", 40)
          .attr("x", 87.5)
          .attr("fill", "#black")
          .attr("font-weight", "100")
          .style("font-size", "15")
          .attr("text-anchor", "middle")


        tipSVG.append("image")
          .attr("xlink:href", d.margin > 0 ? "https://jhkforecasts.com/Trump-01.png" : "https://jhkforecasts.com/Biden-01.png")
          .attr("x", 45)
          .attr("y", 50)
          .attr("width", 90)
          .attr("height", 90)

        tipSVG.append("text")
          .text(d.margin > 0 ? "Trump +" + nf(Math.abs(d.margin)) : "Biden +" + nf(Math.abs(d.margin)))
          .attr("y", 160)
          .attr("x", 87.5)
          .attr("fill", d.margin > 0 ? partyColors("gop") : partyColors("dem"))
          .attr("font-weight", "100")
          .style("font-size", "17")
          .attr("text-anchor", "middle")




      })
      .on('mouseout',
        function (d) {



          tool_tipbm.hide()
        });


    var pct = [60, 70, 80, 90, 100]

    bubblemapphone.selectAll("key")
      .data(pct)
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("cy", (d, i) => 500)
      .attr("cx", (d, i) => 375 + i * 25)
      .attr("fill", d => color(d))



    bubblemapphone.selectAll("key")
      .data(pct)
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("cy", (d, i) => 500)
      .attr("cx", (d, i) => 325 + i * -25)
      .attr("fill", d => color(100 - d))



    bubblemapphone.selectAll("key")
      .data(pct)
      .enter()
      .append("text")
      .text(d => d)
      .attr("y", 470)
      .attr("x", (d, i) => 375 + i * 25)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("font-weight", "100")

    bubblemapphone.selectAll("key")
      .data(pct)
      .enter()
      .append("text")
      .text(d => d)
      .attr("y", 470)
      .attr("x", (d, i) => 325 + i * -25)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("font-weight", "100")


    bubblemapphone.append("text")
      .text("TRUMP")
      .attr("y", 450)
      .attr("x", 425)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("font-size", 15)
      .attr("font-weight", "100")
      .style("font-family", "sf-mono")

    bubblemapphone.append("text")
      .text("BIDEN")
      .attr("y", 450)
      .attr("x", 275)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("font-size", 15)
      .attr("font-weight", "100")
      .style("font-family", "sf-mono")






    var distphone = d3.select("#distphone").append("svg")

    show_more(1170)

    function show_more(input_height) {


      distphone.attr("viewBox", "00 40 1000 " + input_height)

      var fdt = []
      for (let k = 0; k < bubble_info.length; k++) {
        var dt = newest_data.filter(d => d.state == bubble_info[k].state)
        var finaldt = {
          state: bubble_info[k].state,
          evs: +dt[0].ev,
          std: (+dt[0].vote - +dt[0].p10) / 1.05,
          gop_vote: +dt[1].vote,
          dem_vote: +dt[0].vote,
          third_vote: +dt[2].vote,
          tippingPoint: +dt[0].tippingPoint
        }
        finaldt.margin = finaldt.gop_vote - finaldt.dem_vote
        fdt.push(finaldt)
      }
      var min_stdev = d3.min(fdt, d => d.std) * 1.5
      var highest_curve = jStat.normal.pdf(0, 0, min_stdev)
      fdt.sort((a, b) => b.tippingPoint - a.tippingPoint)
      var y3 = d3.scaleLinear()
        .domain([0, highest_curve])
        .range([0, 70])
      var sd4 = []

      for (let k = 0; k < bubble_info.length; k++) {
        var margincurve = []

        for (let l = 1; l < 100; l++) {

          var gq = jStat.normal.inv(l / 100, fdt[k].margin, fdt[k].std * 1.5)
          var gp = jStat.normal.pdf(gq, fdt[k].margin, fdt[k].std * 1.5)



          var marginvalues = {
            x: gq,
            y: -y3(gp) + k * 80 + 163,
            y2: k * 80 + 160
          }
          margincurve.push(marginvalues)

        }
        var dt = {
          state: fdt[k].state,
          marginvalues: margincurve,
          margin: fdt[k].margin,
          tippingPoint: fdt[k].tippingPoint
        }


        sd4.push(dt)
      }





      var x3p = d3.scaleLinear()
        .domain([-75, 75])
        .range([100, 775])

      var area = d3.area()
        .x0(d => x3p(d.x))
        .y0(d => d.y2)
        .y1(d => d.y)

      var line = d3.line()
        .x(d => x3p(d.x))
        .y(d => d.y)

      var curves = distphone.selectAll(".cities")
        .data(sd4)



      curves.enter().insert("g", ".focus").append("path")
        .attr("class", "line cities")
        .style("stroke-width", 3)
        .style("opacity", .4)
        .style("fill", "#AFAFAF")
        .attr("d", d => area(d.marginvalues))
        .style("stroke", (d, i) => "#AFAFAF")

      curves.enter().insert("g", ".focus").append("path")
        .attr("class", "line cities")
        .style("stroke-width", 3)
        .style("opacity", 1)
        .style("fill", color(30))
        .attr("d", d => area(d.marginvalues.filter((d, i) => i < 90 && i > 10 && d.x < 0.1)))
        .style("stroke", (d, i) => color(30))

      curves.enter().insert("g", ".focus").append("path")
        .attr("class", "line cities")
        .style("stroke-width", 3)
        .style("opacity", 1)
        .style("fill", color(70))
        .attr("d", d => area(d.marginvalues.filter((d, i) => i < 90 && i > 10 && d.x > 0.2)))
        .style("stroke", (d, i) => color(70))



      var pct = [-75, -50, -25, 0, 25, 50, 75]


      distphone.selectAll()
        .data(pct)
        .enter()
        .append("text")
        .text(d => d == 0 ? "EVEN" : d > 0 ? "R +" + d + "%" : "D +" + -d + "%")
        .attr("x", d => x3p(d))
        .attr("y", 70)
        .attr("text-anchor", "middle")
        .attr("font-weight", "100")
        .attr("font-size", 20)
        .attr("fill", d => d == 0 ? "black" : d > 0 ? colors[0] : colors[1])


      distphone.selectAll()
        .data(sd4)
        .enter()
        .append("a")
        .attr("xlink:href", d => d.state)
        .append("text")
        .text(id => stateLabels.filter(d => d.state == id.state).length == 0 ? "" : stateLabels.filter(d => d.state == id.state)[0].abbrev)
        .attr("x", 20)
        .attr("y", (d, i) => i * 80 + 150)
        .attr("font-weight", "100")
        .attr("font-size", 25)

      distphone.selectAll()
        .data(sd4)
        .enter()
        .append("text")
        .text(d => nf(d.tippingPoint) + "%")
        .attr("x", 980)
        .attr("y", (d, i) => i * 80 + 150)
        .attr("font-weight", "100")
        .attr("text-anchor", "end")
        .style("font-size", "25")


      distphone.append("text")
        .text("Tipping")
        .attr("x", 980)
        .attr("y", 60)
        .attr("font-weight", "100")
        .attr("text-anchor", "end")
        .style("font-size", "20")
      distphone.append("text")
        .text("Point")
        .attr("x", 980)
        .attr("y", 80)
        .attr("font-weight", "100")
        .attr("text-anchor", "end")
        .style("font-size", "20")

      distphone.selectAll()
        .data(sd4)
        .enter()
        .append("text")
        .text(d => d.margin >= 0 ? "R+" + nf(Math.abs(d.margin)) : "D+" + nf(Math.abs(d.margin)))
        .attr("x", 850)
        .attr("y", (d, i) => i * 80 + 150)
        .attr("font-weight", "100")
        .attr("text-anchor", "middle")
        .attr("fill", d => d.margin >= 0 ? "#FF6060" : "#0091FF")
        .style("font-size", "25")



      distphone.selectAll()
        .data(sd4)
        .enter()
        .append("line")
        .attr("x1", 20)
        .attr("x2", 980)
        .attr("y1", (d, i) => i * 80 + 161)
        .attr("y2", (d, i) => i * 80 + 161)
        .attr("stroke", "black")

      distphone.append("line")
        .attr("x1", x3p(0))
        .attr("x2", x3p(0))
        .attr("y1", 80)
        .attr("y2", 4560)
        .attr("stroke", "#AFAFAF")






    }



    var more = d3.select("#morephone")
      .on("click", function (d, i) {

        document.getElementById("lessphone").style.display = "block"
        document.getElementById("morephone").style.display = "none"
        show_more(4530)
      })

    var less = d3.select("#lessphone")
      .on("click", function (d, i) {

        document.getElementById("morephone").style.display = "block"
        document.getElementById("lessphone").style.display = "none"
        show_more(1170)
      })
  })
})
