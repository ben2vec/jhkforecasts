var colors = ["#FF6060", "#0091FF", "#FFE130"]

var category = ["gop", "dem", "third"]

var cand_colors = d3.scaleOrdinal()
  .domain(category)
  .range(["#FF6060", "#0091FF", "#FFE130"])

var tformat = d3.timeFormat("%m/%d/%Y")
var dateparse = d3.timeParse("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
var numberformat = d3.format(".1f")
var updated_format = d3.timeFormat("%b. %d %Y %I:%M %p")
var widthmap = 1020
var heightmap = 500;
var bubble_info = [{ "state": "Alabama", "abbrev": "AL", "radius": 16.43, "x": 413, "y": 332 }, { "state": "Alaska", "abbrev": "AK", "radius": 9.49, "x": 41, "y": 19 }, { "state": "Arizona", "abbrev": "AZ", "radius": 18.17, "x": 172, "y": 282 }, { "state": "Arkansas", "abbrev": "AR", "radius": 13.42, "x": 325, "y": 290 }, { "state": "California", "abbrev": "CA", "radius": 40.62, "x": 103, "y": 237 }, { "state": "Colorado", "abbrev": "CO", "radius": 16.43, "x": 224, "y": 249 }, { "state": "Connecticut", "abbrev": "CT", "radius": 14.49, "x": 586, "y": 128 }, { "state": "Delaware", "abbrev": "DE", "radius": 9.49, "x": 557, "y": 183 }, { "state": "Florida", "abbrev": "FL", "radius": 29.5, "x": 483, "y": 380 }, { "state": "Georgia", "abbrev": "GA", "radius": 21.91, "x": 443, "y": 298 }, { "state": "Hawaii", "abbrev": "HI", "radius": 10.95, "x": 88, "y": 372 }, { "state": "Idaho", "abbrev": "ID", "radius": 10.95, "x": 188, "y": 173 }, { "state": "Illinois", "abbrev": "IL", "radius": 24.49, "x": 359, "y": 207 }, { "state": "Indiana", "abbrev": "IN", "radius": 18.17, "x": 413, "y": 207 }, { "state": "Iowa", "abbrev": "IA", "radius": 13.42, "x": 306, "y": 195 }, { "state": "Kansas", "abbrev": "KS", "radius": 13.42, "x": 266, "y": 248 }, { "state": "Kentucky", "abbrev": "KY", "radius": 15.49, "x": 411, "y": 251 }, { "state": "Louisiana", "abbrev": "LA", "radius": 15.49, "x": 326, "y": 335 }, { "state": "Maine", "abbrev": "ME", "radius": 7.75, "x": 628, "y": 26 }, { "state": "Maryland", "abbrev": "MD", "radius": 17.32, "x": 505, "y": 185 }, { "state": "Massachusetts", "abbrev": "MA", "radius": 18.17, "x": 607, "y": 89 }, { "state": "Michigan", "abbrev": "MI", "radius": 21.91, "x": 418, "y": 149 }, { "state": "Minnesota", "abbrev": "MN", "radius": 17.32, "x": 304, "y": 142 }, { "state": "Mississippi", "abbrev": "MS", "radius": 13.42, "x": 373, "y": 324 }, { "state": "Missouri", "abbrev": "MO", "radius": 17.32, "x": 329, "y": 251 }, { "state": "Montana", "abbrev": "MT", "radius": 9.49, "x": 206, "y": 131 }, { "state": "Nebraska", "abbrev": "NE", "radius": 7.75, "x": 258, "y": 209 }, { "state": "Nevada", "abbrev": "NV", "radius": 13.42, "x": 167, "y": 220 }, { "state": "New Hampshire", "abbrev": "NH", "radius": 10.95, "x": 612, "y": 54 }, { "state": "New Jersey", "abbrev": "NJ", "radius": 20.49, "x": 551, "y": 147 }, { "state": "New Mexico", "abbrev": "NM", "radius": 12.25, "x": 215, "y": 303 }, { "state": "New York", "abbrev": "NY", "radius": 29.5, "x": 548, "y": 81 }, { "state": "North Carolina", "abbrev": "NC", "radius": 21.21, "x": 499, "y": 278 }, { "state": "North Dakota", "abbrev": "ND", "radius": 9.49, "x": 257, "y": 136 }, { "state": "Ohio", "abbrev": "OH", "radius": 23.24, "x": 459, "y": 191 }, { "state": "Oklahoma", "abbrev": "OK", "radius": 14.49, "x": 270, "y": 294 }, { "state": "Oregon", "abbrev": "OR", "radius": 14.49, "x": 124, "y": 176 }, { "state": "Pennsylvania", "abbrev": "PA", "radius": 24.49, "x": 498, "y": 132 }, { "state": "Rhode Island", "abbrev": "RI", "radius": 10.95, "x": 619, "y": 126 }, { "state": "South Carolina", "abbrev": "SC", "radius": 16.43, "x": 487, "y": 322 }, { "state": "South Dakota", "abbrev": "SD", "radius": 9.49, "x": 257, "y": 167 }, { "state": "Tennessee", "abbrev": "TN", "radius": 18.17, "x": 379, "y": 284 }, { "state": "Texas", "abbrev": "TX", "radius": 33.76, "x": 271, "y": 355 }, { "state": "Utah", "abbrev": "UT", "radius": 13.42, "x": 204, "y": 218 }, { "state": "Vermont", "abbrev": "VT", "radius": 9.49, "x": 585, "y": 47 }, { "state": "Virginia", "abbrev": "VA", "radius": 19.75, "x": 508, "y": 229 }, { "state": "Washington", "abbrev": "WA", "radius": 18.97, "x": 154, "y": 131 }, { "state": "West Virginia", "abbrev": "WV", "radius": 12.25, "x": 451, "y": 242 }, { "state": "Wisconsin", "abbrev": "WI", "radius": 17.32, "x": 359, "y": 146 }, { "state": "Wyoming", "abbrev": "WY", "radius": 9.49, "x": 214, "y": 177 }, { "state": "District of Columbia", "abbrev": "DC", "radius": 9.49, "x": 536, "y": 193 }, { "state": "Maine-1", "abbrev": 1, "radius": 5.48, "x": 612, "y": 26 }, { "state": "Maine-2", "abbrev": 2, "radius": 5.48, "x": 644, "y": 26 }, { "state": "Nebraska-1", "abbrev": 1, "radius": 5.48, "x": 242, "y": 209 }, { "state": "Nebraska-2", "abbrev": 2, "radius": 5.48, "x": 258, "y": 193 }, { "state": "Nebraska-3", "abbrev": 3, "radius": 5.48, "x": 274, "y": 209 }]
var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia", "Maine-1", "Maine-2", "Nebraska-1", "Nebraska-2", "Nebraska-3", "US"]
var map_states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"]
var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934 }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400 }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801 }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387 }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 253.9219 }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 245.5645 }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000 }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000 }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154 }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354 }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465 }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155 }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 231.2954 }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 228.4214 }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 202.6782 }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 259.1592 }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 264.9658 }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135 }, { "state": "Maine", "label": "ME", "xValue": 807.3105, "yValue": 109.855 }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000 }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000 }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647 }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874 }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514 }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 261.123 }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705 }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527 }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957 }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000 }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210 }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035 }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 163.2588 }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 284.5029 }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 117.3823 }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 219.4883 }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418 }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654 }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 200.856 }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000 }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 315.6387 }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 163.5166 }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 294.8193 }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 374.2861 }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 234.978 }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000 }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 252.7842 }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762 }, { "state": "West Virginia", "label": "WV", "xValue": 701, "yValue": 243 }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588 }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 179.6255 }, { "state": "District of Columbia", "label": "DC", "xValue": -1000, "yValue": -1000 }]
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
var overview = d3.select("#overview")
  .append("svg")
  .attr("viewBox", '0 0 1000 400');

var tool_tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-180, -90])
  .html("<div id='tipDiv'></div>");

map.call(tool_tip);


d3.csv("data.csv", function (data) {

  var updated = data[data.length - 1].experts_weight
  console.log(updated)
  data.forEach((d, i) => {
    d.forecast_date = dateparse(d.forecast_date)
    return d
  })

  var newest_update = d3.max(data, d => d.forecast_date)

  document.getElementById("updated").innerHTML = "Updated: " + updated

  var newest_data = data.slice(data.length - 171, data.length)


  var sd = []
  for (let k = 0; k < map_states.length; k++) {
    var dt = newest_data.filter(d => d.state == states[k])
    var ml = map_labels.filter(d => d.state == states[k])
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
      x_value: ml[0].xValue,
      y_value: ml[0].yValue,
      label: ml[0].label,

    }
    finaldt.margin = finaldt.gop_vote - finaldt.dem_vote
    sd.push(finaldt)
  }


  d3.json("https://projects.jhkforecasts.com/presidential_forecast/us-states.json", function (json) {

    for (var i = 0; i < sd.length; i++) {

      var dataState = sd[i].state;
      var gopwin = sd[i].gop_win
      var demwin = sd[i].dem_win
      var tippingpoint = sd[i].tipping_point
      var ev = sd[i].electoral_votes
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
    console.log(json.features)

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


    map.selectAll("label")
      .data(json.features)
      .enter()
      .append("text")
      .text(d => d.properties.label)
      .attr("x", d => d.properties.xv)
      .attr("y", d => d.properties.yv)
      .attr("font-family", "brandon-grotesque")
      .attr("font-size", "10")
      .attr("fill", "black")
      .attr("text-anchor", "middle")


    map.selectAll("path2")
      .data(json.features)
      .enter()
      .append("path")
      .attr("class", "statesover")
      .attr("d", path)
      .style("stroke", d => d.properties.tippingPoint >= 3 ? "black" : "none")
      .style("stroke-width", "1.5")
      .on('mouseover', function (d) {


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
          .text(d.properties.ev+ " Electoral Votes")
          .attr("y", 40)
          .attr("x", 87.5)
          .attr("fill", "#black")
          .style("font-weight", "400")
          .style("font-size", "15")
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


          tool_tip.hide()
        });

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




    var winner = newest_data[168].win > newest_data[169].win ? "Trump" : "Biden"

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
      .text(numberformat(newest_data[168].win) + "%")
      .attr("x", 1100)
      .attr("y", winner == "Trump" ? 175 : 375)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "35")
      .attr("fill", colors[0])
      .attr("text-anchor", "middle")

    map.append("text")
      .text(numberformat(newest_data[169].win) + "%")
      .attr("x", 1100)
      .attr("y", winner == "Biden" ? 175 : 375)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "35")
      .attr("fill", colors[1])
      .attr("text-anchor", "middle")

    map.append("image")
      .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
      .attr("x", 900)
      .attr("y", winner == "Trump" ? 100 : 300)
      .attr("width", 150)
      .attr("height", 150)

    map.append("image")
      .attr("xlink:href", d => "https://jhkforecasts.com/Biden-01.png")
      .attr("x", 900)
      .attr("y", winner == "Biden" ? 100 : 300)
      .attr("width", 150)
      .attr("height", 150)

    var dateparse = d3.timeParse("%m/%d/%y")
    var margin = { top: 20, right: 60, bottom: 30, left: 20 }
    var width = 1000 - margin.left - margin.right
    var height = 400 - margin.top - margin.bottom
    var axisPad = 12

    var time_data = data.filter(d => d.state == key_state)

    var time_data = time_data.filter(d => d.forecast_date > new Date(2020, 0, 1))
    var data_length = time_data.filter(d => d.party == "gop").length
    var max_date = d3.max(time_data, d => d.forecast_date)
    var line_data = []
    for (let j = 0; j < data_length; j++) {

      var ld = {
        date: time_data.filter(d => d.party == "gop")[j].forecast_date,
        gopwin: time_data.filter(d => d.party == "gop")[j].win,
        demwin: time_data.filter(d => d.party == "dem")[j].win,
        thirdwin: time_data.filter(d => d.party == "third")[j].win,
        gopvote: time_data.filter(d => d.party == "gop")[j].proj_vote,
        demvote: time_data.filter(d => d.party == "dem")[j].proj_vote,
        thirdvote: time_data.filter(d => d.party == "third")[j].proj_vote,
        gopev: time_data.filter(d => d.party == "gop")[j].electoral_vote,
        demev: time_data.filter(d => d.party == "dem")[j].electoral_vote,
        thirdev: time_data.filter(d => d.party == "third")[j].electoral_vote,
      }
      line_data.push(ld)
    }

    var today = line_data[line_data.lenth - 1]
    var parseTime = d3.timeParse("%Y-%m-%d"),
      formatDate = d3.timeFormat("%b - %d"),
      formatMonth = d3.timeFormat("%Y-%m-%d"),
      bisectDate = d3.bisector(d => d.date).left,
      wholevalue = d3.format(".0f"),
      onevalue = d3.format(".1f")

    var time = d3.select("#time").append("svg")
      .attr("viewBox", "0 0 1000 400")
      .append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var x = d3.scaleTime()
      .rangeRound([margin.left, width - margin.right])
      .domain([new Date(2020, 0, 1), new Date(2020, 10, 3)])

    var y = d3.scaleLinear()
      .rangeRound([height - margin.bottom, margin.top]);


    var z = d3.scaleOrdinal()
      .range(colors)
      ;

    var line = d3.line()
      .curve(d3.curveCatmullRom)
      .x(d => x(d.date))
      .y(d => y(d.pct));

    time.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + (height - margin.bottom) + ")")
      .call(d3.axisBottom(x).tickSize(-300).ticks(5)
        .tickFormat(d3.timeFormat("%b")))
      .call(g => {
        var years = x.ticks(d3.timeYear.every(1))
        var xshift = 0
        g.selectAll("text")
          .style("text-anchor", "right")
          .attr("y", axisPad)
          .attr('fill', 'black')
          .attr('font-size', 15)
          .attr('font-weight', 800)
        g.selectAll("line")
          .attr("opacity", .2)
          .attr("stroke", "grey")


        g.select(".domain")
          .attr("opacity", 0)


      })

    time.append("line")
      .attr("x1", x(new Date(2020, 10, 3)))
      .attr("x2", x(new Date(2020, 10, 3)))
      .attr("y1", 20)
      .attr("y2", (height - margin.bottom))
      .attr("stroke", "black")
      .attr("stroke-width", 3)

    time.append("text")
      .text("Nov. 3rd")
      .attr("x", x(new Date(2020, 10, 3)))
      .attr("y", 10)
      .attr("font-weight", 700)



    time.append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(" + margin.left + ",0)");

    var focus = time.append("g")
      .attr("class", "focus")
      .style("display", "none");

    focus.append("line").attr("class", "lineHover")
      .style("stroke", "#999")
      .attr("stroke-width", 1)
      .style("shape-rendering", "crispEdges")
      .style("opacity", 0)
      .attr("y1", -height)
      .attr("y2", -40);

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

      var copy = keys.filter(f => f.includes(input))
      var cities = copy.map(function (id) {
        return {
          id: id,
          values: line_data.map(d => { return { date: d.date, pct: +d[id] } })
        };
      });
      y.domain([
        0,
        input == "ev" ? 538 : input == "vote" ? 60 : 100
      ]).nice();

      time.selectAll(".y-axis").transition()
        .duration(speed)
        .call(d3.axisLeft(y).tickSize(-width + margin.right + margin.left).ticks(5)).call(g => {
          var years = x.ticks(d3.timeYear.every(1))
          var xshift = 0
          g.selectAll("text")
            .style("text-anchor", "right")
            .attr("y", 0)
            .attr('fill', 'black')
            .attr('font-size', 15)
            .attr('font-weight', 800)
          g.selectAll("line")
            .attr("opacity", .2)
            .attr("stroke", "grey")


          g.select(".domain")
            .attr("opacity", 0)


        })

      var city = time.selectAll(".cities")
        .data(cities);

      city.exit().remove();

      city.enter().insert("g", ".focus").append("path")
        .attr("class", "line cities")
        .style("stroke", (d, i) => colors[i])
        .style("stroke-width", 4)
        .style("opacity", .9)
        .merge(city)
        .transition().duration(speed)
        .attr("d", d => line(d.values))




      tooltip(copy);

      function tooltip(copy) {
        var rect = focus.selectAll(".lineHoverRect")
          .data(copy)

        var labels2 = focus.selectAll(".lineHoverText2")
          .data(copy)

        labels2.enter().append("text")
          .attr("class", "lineHoverText2")
          .attr("font-size", 20)
          .style("fill", "white")
          .style("stroke", "white")
          .style("stroke-width", 5)
          .merge(labels2)

        var labels = focus.selectAll(".lineHoverText")
          .data(copy)

        labels.enter().append("text")
          .attr("class", "lineHoverText")
          .attr("text-anchor", "middle")
          .attr("font-size", 20)
          .merge(labels)

        var circles = focus.selectAll(".hoverCircle")
          .data(copy)

        circles.enter().append("circle")
          .attr("class", "hoverCircle")
          .style("stroke", d => z(d))
          .style("stroke-width", 3)
          .style("fill", "white")
          .attr("r", 3)
          .merge(circles);

        time.selectAll(".overlay")
          .on("mouseover", () => focus.style("display", null))
          .on("mouseout", () => focus.style("display", "none"))
          .on("mousemove", mousemove);

        function mousemove() {

          var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(line_data, x0, 1),
            d0 = line_data[i - 1],
            d1 = line_data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;

          focus.select(".lineHoverDate")
            .attr("x", x(d.date))
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .style("font-size", 15)
            .style("font-weight", 700)
            .text(formatDate(d.date));

          focus.selectAll(".hoverCircle")
            .attr("cy", e => y(d[e]))
            .attr("cx", x(d.date));

          focus.selectAll(".lineHoverText2")
            .style("font-weight", 700)
            .attr("x", x(d.date) + 10)
            .text((e, i) => i == 1 ? ("Biden " + onevalue(d[e]) + "%") : i == 0 ? "Trump " + onevalue(d[e]) + "%" : "Third " + onevalue(d[e]) + "%")
            .attr("y", e => d[e] == d["gop" + input] ? y(d["gop" + input]) > y(d["dem" + input]) ? y(d["gop" + input]) + 15 : y(d["gop" + input]) - 15 : d[e] == d["dem" + input] ? y(d["dem" + input]) > y(d["gop" + input]) ? y(d["dem" + input]) + 15 : y(d["dem" + input]) - 15 : y(d[e]) - 15)
            .attr("text-anchor", "start")
            .attr("dominant-baseline", "middle")

          focus.selectAll(".lineHoverText")
            .style("font-weight", 700)
            .attr("x", x(d.date) + 10)
            .text((e, i) => input == "ev" ? i == 1 ? ("Biden " + onevalue(d[e])) : i == 0 ? "Trump " + onevalue(d[e]) : "Third " + onevalue(d[e]) : i == 1 ? ("Biden " + onevalue(d[e]) + "%") : i == 0 ? "Trump " + onevalue(d[e]) + "%" : "Third " + onevalue(d[e]) + "%")
            .attr("fill", (e, i) => colors[i])
            .attr("y", e => d[e] == d["gop" + input] ? y(d["gop" + input]) > y(d["dem" + input]) ? y(d["gop" + input]) + 15 : y(d["gop" + input]) - 15 : d[e] == d["dem" + input] ? y(d["dem" + input]) > y(d["gop" + input]) ? y(d["dem" + input]) + 15 : y(d["dem" + input]) - 15 : y(d[e]) - 15)
            .attr("text-anchor", "start")
            .attr("dominant-baseline", "middle")
        }
      }
      var winbutton = d3.select("#winbutton")
        .on("click", function () {
          update("win", 500)
        })

      var votebutton = d3.select("#votebutton")
        .on("click", function () {
          update("vote", 500)
        })
      var evbutton = d3.select("#evbutton")
        .on("click", function () {
          update("ev", 500)
        })
    }

    var overview_data = newest_data.filter(d => d.state == "US")
    overview_data.sort((a, b) => b.electoral_vote - a.electoral_vote)

    overview.selectAll()
      .data(overview_data)
      .enter()
      .append("text")
      .text(d => onevalue(d.electoral_vote))
      .attr("y", (d, i) => 100 + i * 100)
      .attr("x", 450)
      .attr("fill", (d, i) => cand_colors(d.party))
      .style("font-weight", "800")
      .style("font-size", 25)
      .attr("text-anchor", "middle")

    overview.selectAll()
      .data(overview_data)
      .enter()
      .append("text")
      .text(d => onevalue(d.proj_vote) + "%")
      .attr("y", (d, i) => 100 + i * 100)
      .attr("x", 850)
      .attr("fill", (d, i) => cand_colors(d.party))
      .style("font-weight", "800")
      .style("font-size", 25)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")

    overview.append("image")
      .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
      .attr("x", 100)
      .attr("y", overview_data[0].party == "gop" ? 55 : 155)
      .attr("width", 90)
      .attr("height", 90)
    overview.append("image")
      .attr("xlink:href", d => "https://jhkforecasts.com/Biden-01.png")
      .attr("x", 100)
      .attr("y", overview_data[0].party == "gop" ? 155 : 55)
      .attr("width", 90)
      .attr("height", 90)


    overview.append("text")
      .text("?")
      .attr("y", 300)
      .attr("x", 145)
      .attr("fill", cand_colors("third"))
      .style("font-weight", "800")
      .style("font-size", 50)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")


    overview.append("text")
      .text("Avg Electoral Votes")
      .attr("y", 30)
      .attr("x", 450)
      .attr("fill", "Black")
      .style("font-weight", "800")
      .style("font-size", 20)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
    overview.append("text")
      .text("Popular Vote")
      .attr("y", 30)
      .attr("x", 850)
      .attr("fill", "Black")
      .style("font-weight", "800")
      .style("font-size", 20)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")

      var sd2 = sd

    sd2.sort((a, b) => a.margin - b.margin)

    var y2 = d3.scaleLinear()
      .domain([0, 40, 100])
      .range([10, 300, 345])

    sd2.forEach(function (d, i) {
      d.index = i + 1;
      d.indexev = d.index == 1 ? 0 : sd2[i - 1].indexev + sd2[i - 1].electoral_votes;
      d.height = Math.abs(d.margin)
      return d;
    })
    console.log(sd2)

    var bars = d3.select("#bars")
      .append("svg")
      .attr("viewBox", '0 0 1000 400')

    var tool_tip2 = d3.tip()
      .attr("class", "d3-tip")
      .offset([-180, -90])
      .html("<div id='tipDiv2'></div>");

    bars.call(tool_tip2);

    var x2 = d3.scaleLinear()
      .domain([0, 538])
      .range([50, 950])



    bars.selectAll("bars")
      .data(sd2)
      .enter()
      .append("rect")
      .attr("x", d => x2(d.indexev))
      .attr("y", (d, i) => 350 - y2(d.height))
      .attr("width", d => d.electoral_votes * (900 / 538))
      .attr("height", (d, i) => y2(d.height))
      .attr("ry", 3)
      .attr("fill", d => color(d.gop_win))
      .attr("stroke", "white")
      .attr("stroke-width", .5)
      .on('mouseover', function (d) {

        d3.select(this)
          .attr("stroke", "black")
          .attr("stroke-width", 2)

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
          .text(d.state)
          .attr("y", 20)
          .attr("x", 87.5)
          .attr("fill", "#black")
          .style("font-weight", "600")
          .style("font-size", "20")
          .attr("text-anchor", "middle")

        tipSVG.append("text")
          .text(d.electoral_votes + " Electoral Votes")
          .attr("y", 40)
          .attr("x", 87.5)
          .attr("fill", "#black")
          .style("font-weight", "500")
          .style("font-size", "17")
          .attr("text-anchor", "middle")


        tipSVG.append("image")
          .attr("xlink:href", d.margin > 0 ? "https://jhkforecasts.com/Trump-01.png" : "https://jhkforecasts.com/Biden-01.png")
          .attr("x", 45)
          .attr("y", 50)
          .attr("width", 90)
          .attr("height", 90)

        tipSVG.append("text")
          .text(d.margin > 0 ? "Trump +" + numberformat(Math.abs(d.margin)) : "Biden +" + numberformat(Math.abs(d.margin)))
          .attr("y", 160)
          .attr("x", 87.5)
          .attr("fill", d.margin > 0 ? cand_colors("gop") : cand_colors("dem"))
          .style("font-weight", "700")
          .style("font-size", "17")
          .attr("text-anchor", "middle")




      })
      .on('mouseout',
        function (d) {
          d3.select(this)
            .attr("stroke", "white")
            .attr("stroke-width", .5)


          tool_tip2.hide()
        });


    var sd3 = []
    for (let k = 0; k < bubble_info.length; k++) {
        var dt = newest_data.filter(d => d.state == bubble_info[k].state)
        var finaldt = {
            state: bubble_info[k].state,
            electoral_votes: +dt[0].electoral_vote,
            gop_win: +dt[0].win,
            dem_win: +dt[1].win,
            third_win: +dt[2].win,
            gop_vote: +dt[0].proj_vote,
            dem_vote: +dt[1].proj_vote,
            third_vote: +dt[2].proj_vote,
            x: bubble_info[k].x,
            y: bubble_info[k].y,
            r: bubble_info[k].radius,
            label: bubble_info[k].abbrev,
            tp: dt[0].tipping_point
        }
        finaldt.margin = finaldt.gop_vote - finaldt.dem_vote
        sd3.push(finaldt)
    }


    var bubblemap = d3.select("#bubblemap")
        .append("svg")
        .attr("viewBox", '-100 0 1000 450')


    

    bubblemap.selectAll("circ")
        .data(sd3)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.r)
        .attr("fill",d=>color(d.gop_win))
        .attr("stroke",d=>d.tp>3?"black":"none")
        .attr("stroke-width",2)

    bubblemap.selectAll("labels")
        .data(sd3)
        .enter()
        .append("text")
        .text(d=>d.label)
        .attr("x", d => d.x)
        .attr("y", d => d.y+1.5)
        .attr("fill","black")
        .attr("text-anchor","middle")
        .attr("dominant-baseline","middle")
        .attr("font-size",8)
        

    bubblemap.selectAll("overfill")
        .data(sd3)
        .enter()
        .append("circle")
        .attr("class","statesover")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.r).on('mouseover', function (d) {

          
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
              .text(d.state)
              .attr("y", 20)
              .attr("x", 87.5)
              .attr("fill", "#black")
              .style("font-weight", "600")
              .style("font-size", "20")
              .attr("text-anchor", "middle")
    
            tipSVG.append("text")
              .text(d.electoral_votes + " Electoral Votes")
              .attr("y", 40)
              .attr("x", 87.5)
              .attr("fill", "#black")
              .style("font-weight", "500")
              .style("font-size", "17")
              .attr("text-anchor", "middle")
    
    
            tipSVG.append("image")
              .attr("xlink:href", d.margin > 0 ? "https://jhkforecasts.com/Trump-01.png" : "https://jhkforecasts.com/Biden-01.png")
              .attr("x", 45)
              .attr("y", 50)
              .attr("width", 90)
              .attr("height", 90)
    
            tipSVG.append("text")
              .text(d.margin > 0 ? "Trump +" + numberformat(Math.abs(d.margin)) : "Biden +" + numberformat(Math.abs(d.margin)))
              .attr("y", 160)
              .attr("x", 87.5)
              .attr("fill", d.margin > 0 ? cand_colors("gop") : cand_colors("dem"))
              .style("font-weight", "700")
              .style("font-size", "17")
              .attr("text-anchor", "middle")
    
    
    
    
          })
          .on('mouseout',
            function (d) {
            
    
    
              tool_tip2.hide()
            });


            var dist = d3.select("#dist").append("svg")
    
            show_more(975)
        
          function show_more(input_height) {
        
        
            dist.attr("viewBox", "00 40 1000 " + input_height)
            
            var fdt = []
            for (let k = 0; k < bubble_info.length; k++) {
              var dt = newest_data.filter(d => d.state == bubble_info[k].state)
              var finaldt = {
                state: bubble_info[k].state,
                electoral_votes: +dt[0].electoral_vote,
                std: (+dt[0].proj_vote - +dt[0].p_10) / 1.28,
                gop_vote: +dt[0].proj_vote,
                dem_vote: +dt[1].proj_vote,
                third_vote: +dt[2].proj_vote,
                tipping_point: +dt[0].tipping_point
              }
              finaldt.margin = finaldt.gop_vote - finaldt.dem_vote
              fdt.push(finaldt)
            }
            var min_stdev = d3.min(fdt,d=>d.std)*.8
            var highest_curve = jStat.normal.pdf(0, 0,min_stdev)
            fdt.sort((a, b) => b.tipping_point - a.tipping_point)
            var y3 = d3.scaleLinear()
              .domain([0, highest_curve])
              .range([0, 45])
            var sd4 = []
        
            for (let k = 0; k < bubble_info.length; k++) {
              var gopcurve = []
              var demcurve = []
        
              for (let l = 1; l < 500; l++) {
        
                var gq = jStat.normal.inv(l / 500, fdt[k].gop_vote, fdt[k].std * .8)
                var gp = jStat.normal.pdf(gq, fdt[k].gop_vote, fdt[k].std * .8)
        
                var dq = jStat.normal.inv(l / 500, fdt[k].dem_vote, fdt[k].std * .8)
                var dp = jStat.normal.pdf(dq, fdt[k].dem_vote, fdt[k].std * .8)
        
                var tq = (fdt[k].third_vote/.4)*(l / 500)
                var tp = jStat.beta.pdf(l/500, fdt[k].dem_vote, fdt[k].std * .8)
        
                var gopvalues = {
                  x: gq,
                  y: -y3(gp) + k * 50 + 160,
                  y2: k * 50 + 160
                }
        
                var demvalues = {
                  x: dq,
                  y: -y3(dp) + k * 50 + 160,
                  y2: k * 50 + 160
                }
                gopcurve.push(gopvalues)
                demcurve.push(demvalues)
              }
              var dt = {
                state: fdt[k].state,
                gopvalues: gopcurve,
                demvalues: demcurve,
                margin: fdt[k].margin,
                tipping_point: fdt[k].tipping_point
              }
        
        
              sd4.push(dt)
            }
        
        
            console.log(sd4)
            
        
        
            var x3 = d3.scaleLinear()
              .domain([0, 100])
              .range([150, 700])
        
            var area = d3.area()
              .x0(d => x3(d.x))
              .y0(d => d.y2)
              .y1(d => d.y)
        
            var line = d3.line()
              .x(d => x3(d.x))
              .y(d => d.y)
        
            var curves = dist.selectAll(".cities")
              .data(sd4)
        
        
        
            curves.enter().insert("g", ".focus").append("path")
              .attr("class", "line cities")
              .style("stroke-width", 3)
              .style("opacity", .4)
              .style("fill", "lightgrey")
              .attr("d", d => area(d.demvalues))
              .style("stroke", (d, i) => "lightgrey")
        
            curves.enter().insert("g", ".focus").append("path")
              .attr("class", "line cities")
              .style("stroke-width", 3)
              .style("opacity", .4)
              .style("fill", "lightgrey")
              .attr("d", d => area(d.gopvalues))
              .style("stroke", (d, i) => "lightgrey")
        
        
            curves.enter().insert("g", ".focus").append("path")
              .attr("class", "line cities")
              .style("opacity", .4)
              .style("fill", "#FF6060")
              .attr("d", d => area(d.gopvalues.filter((d, i) => i < 475 && i > 25)))
              .style("stroke", (d, i) => "#FF6060")
        
            curves.enter().insert("g", ".focus").append("path")
              .attr("class", "line cities")
              .style("opacity", .4)
              .style("fill", "#0091FF")
              .attr("d", d => area(d.demvalues.filter((d, i) => i < 475 && i > 25)))
              .style("stroke", (d, i) => "#0091FF")
        
            var pct = [0, 25, 50, 75, 100]
        
        
            dist.selectAll()
              .data(pct)
              .enter()
              .append("text")
              .text(d => d + "%")
              .attr("x", d => x3(d))
              .attr("y", 90)
              .attr("text-anchor", "middle")
              .attr("font-weight", 700)
              .attr("font-size",10)
        
            dist.selectAll()
              .data(sd4)
              .enter()
              .append("text")
              .text(d => d.state)
              .attr("x", 20)
              .attr("y", (d, i) => i * 50 + 150)
              .attr("font-weight", 700)
        
            dist.selectAll()
              .data(sd4)
              .enter()
              .append("text")
              .text(d => numberformat(d.tipping_point) + "%")
              .attr("x", 980)
              .attr("y", (d, i) => i * 50 + 150)
              .attr("font-weight", 700)
              .attr("text-anchor", "end")
        
            dist.selectAll()
              .data(sd4)
              .enter()
              .append("text")
              .text(d => d.margin >= 0 ? "Trump +" + numberformat(Math.abs(d.margin)) + "%" : "Biden +" + numberformat(Math.abs(d.margin)) + "%")
              .attr("x", 800)
              .attr("y", (d, i) => i * 50 + 150)
              .attr("font-weight", 700)
              .attr("text-anchor", "middle")
              .attr("fill", d => d.margin >= 0 ? "#FF6060" : "#0091FF")
        
        
        
            dist.selectAll()
              .data(sd4)
              .enter()
              .append("line")
              .attr("x1", 20)
              .attr("x2", 980)
              .attr("y1", (d, i) => i * 50 + 161)
              .attr("y2", (d, i) => i * 50 + 161)
              .attr("stroke", "black")
        
            dist.append("text")
              .text("Tipping Point")
              .attr("x", 980)
              .attr("y", 90)
              .attr("font-weight", 700)
              .attr("text-anchor", "end")
        
              dist.append("text")
              .text("Margin")
              .attr("x", 800)
              .attr("y", 90)
              .attr("font-weight", 700)
              .attr("text-anchor", "middle")
        
              dist.append("text")
              .text("Projected Vote")
              .attr("x", x3(50))
              .attr("y", 60)
              .attr("font-weight", 700)
              .attr("text-anchor", "middle")
        
             
          }
        
        
        
          var more = d3.select("#more")
  .on("click", function (d,i) {
    
    document.getElementById("less").style.display = "block"
    document.getElementById("more").style.display = "none"
    show_more(2900)
  })

  var less = d3.select("#less")
  .on("click", function (d,i) {

    document.getElementById("more").style.display = "block"
    document.getElementById("less").style.display = "none"
    show_more(975)
  })
  })
})