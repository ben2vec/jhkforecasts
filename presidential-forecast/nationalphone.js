var colors = ["#FF6060", "#0091FF", "#FFE130"];

var category = ["gop", "dem", "third"];

var cand_colors = d3.scaleOrdinal()
  .domain(category)
  .range(["#FF6060", "#0091FF", "#FFE130"]);

var tformat = d3.timeFormat("%m/%d/%Y");
var dateparse = d3.timeParse("%m/%d/%y");
var timeparse = d3.timeParse("%m/%d/%y %H:%M");
var nf = d3.format(".1f");
var updated_format = d3.timeFormat("%b. %d %Y %I:%M %p");
var widthmap = 1020;
var heightmap = 500;
var bubble_info = [{ "state": "Alabama", "abbrev": "AL", "radius": 16.43, "x": 413, "y": 332 }, { "state": "Alaska", "abbrev": "AK", "radius": 9.49, "x": 41, "y": 19 }, { "state": "Arizona", "abbrev": "AZ", "radius": 18.17, "x": 172, "y": 282 }, { "state": "Arkansas", "abbrev": "AR", "radius": 13.42, "x": 325, "y": 290 }, { "state": "California", "abbrev": "CA", "radius": 40.62, "x": 103, "y": 237 }, { "state": "Colorado", "abbrev": "CO", "radius": 16.43, "x": 224, "y": 249 }, { "state": "Connecticut", "abbrev": "CT", "radius": 14.49, "x": 586, "y": 128 }, { "state": "Delaware", "abbrev": "DE", "radius": 9.49, "x": 557, "y": 183 }, { "state": "Florida", "abbrev": "FL", "radius": 29.5, "x": 483, "y": 380 }, { "state": "Georgia", "abbrev": "GA", "radius": 21.91, "x": 443, "y": 298 }, { "state": "Hawaii", "abbrev": "HI", "radius": 10.95, "x": 88, "y": 372 }, { "state": "Idaho", "abbrev": "ID", "radius": 10.95, "x": 188, "y": 173 }, { "state": "Illinois", "abbrev": "IL", "radius": 24.49, "x": 359, "y": 207 }, { "state": "Indiana", "abbrev": "IN", "radius": 18.17, "x": 413, "y": 207 }, { "state": "Iowa", "abbrev": "IA", "radius": 13.42, "x": 306, "y": 195 }, { "state": "Kansas", "abbrev": "KS", "radius": 13.42, "x": 266, "y": 248 }, { "state": "Kentucky", "abbrev": "KY", "radius": 15.49, "x": 411, "y": 251 }, { "state": "Louisiana", "abbrev": "LA", "radius": 15.49, "x": 326, "y": 335 }, { "state": "Maine", "abbrev": "ME", "radius": 7.75, "x": 628, "y": 26 }, { "state": "Maryland", "abbrev": "MD", "radius": 17.32, "x": 505, "y": 185 }, { "state": "Massachusetts", "abbrev": "MA", "radius": 18.17, "x": 607, "y": 89 }, { "state": "Michigan", "abbrev": "MI", "radius": 21.91, "x": 418, "y": 149 }, { "state": "Minnesota", "abbrev": "MN", "radius": 17.32, "x": 304, "y": 142 }, { "state": "Mississippi", "abbrev": "MS", "radius": 13.42, "x": 373, "y": 324 }, { "state": "Missouri", "abbrev": "MO", "radius": 17.32, "x": 329, "y": 251 }, { "state": "Montana", "abbrev": "MT", "radius": 9.49, "x": 206, "y": 131 }, { "state": "Nebraska", "abbrev": "NE", "radius": 7.75, "x": 258, "y": 209 }, { "state": "Nevada", "abbrev": "NV", "radius": 13.42, "x": 167, "y": 220 }, { "state": "New Hampshire", "abbrev": "NH", "radius": 10.95, "x": 612, "y": 54 }, { "state": "New Jersey", "abbrev": "NJ", "radius": 20.49, "x": 551, "y": 147 }, { "state": "New Mexico", "abbrev": "NM", "radius": 12.25, "x": 215, "y": 303 }, { "state": "New York", "abbrev": "NY", "radius": 29.5, "x": 548, "y": 81 }, { "state": "North Carolina", "abbrev": "NC", "radius": 21.21, "x": 499, "y": 278 }, { "state": "North Dakota", "abbrev": "ND", "radius": 9.49, "x": 257, "y": 136 }, { "state": "Ohio", "abbrev": "OH", "radius": 23.24, "x": 459, "y": 191 }, { "state": "Oklahoma", "abbrev": "OK", "radius": 14.49, "x": 270, "y": 294 }, { "state": "Oregon", "abbrev": "OR", "radius": 14.49, "x": 124, "y": 176 }, { "state": "Pennsylvania", "abbrev": "PA", "radius": 24.49, "x": 498, "y": 132 }, { "state": "Rhode Island", "abbrev": "RI", "radius": 10.95, "x": 619, "y": 126 }, { "state": "South Carolina", "abbrev": "SC", "radius": 16.43, "x": 487, "y": 322 }, { "state": "South Dakota", "abbrev": "SD", "radius": 9.49, "x": 257, "y": 167 }, { "state": "Tennessee", "abbrev": "TN", "radius": 18.17, "x": 379, "y": 284 }, { "state": "Texas", "abbrev": "TX", "radius": 33.76, "x": 271, "y": 355 }, { "state": "Utah", "abbrev": "UT", "radius": 13.42, "x": 204, "y": 218 }, { "state": "Vermont", "abbrev": "VT", "radius": 9.49, "x": 585, "y": 47 }, { "state": "Virginia", "abbrev": "VA", "radius": 19.75, "x": 508, "y": 229 }, { "state": "Washington", "abbrev": "WA", "radius": 18.97, "x": 154, "y": 131 }, { "state": "West Virginia", "abbrev": "WV", "radius": 12.25, "x": 451, "y": 242 }, { "state": "Wisconsin", "abbrev": "WI", "radius": 17.32, "x": 359, "y": 146 }, { "state": "Wyoming", "abbrev": "WY", "radius": 9.49, "x": 214, "y": 177 }, { "state": "District of Columbia", "abbrev": "DC", "radius": 9.49, "x": 536, "y": 193 }, { "state": "Maine-1", "abbrev": 1, "radius": 5.48, "x": 612, "y": 26 }, { "state": "Maine-2", "abbrev": 2, "radius": 5.48, "x": 644, "y": 26 }, { "state": "Nebraska-1", "abbrev": 1, "radius": 5.48, "x": 242, "y": 209 }, { "state": "Nebraska-2", "abbrev": 2, "radius": 5.48, "x": 258, "y": 193 }, { "state": "Nebraska-3", "abbrev": 3, "radius": 5.48, "x": 274, "y": 209 }];
var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia", "Maine-1", "Maine-2", "Nebraska-1", "Nebraska-2", "Nebraska-3", "US"];
var map_states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"];
var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934 }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400 }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801 }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387 }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 253.9219 }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 245.5645 }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000 }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000 }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154 }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354 }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465 }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155 }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 231.2954 }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 228.4214 }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 202.6782 }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 259.1592 }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 264.9658 }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135 }, { "state": "Maine", "label": "ME", "xValue": 807.3105, "yValue": 109.855 }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000 }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000 }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647 }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874 }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514 }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 261.123 }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705 }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527 }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957 }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000 }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210 }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035 }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 163.2588 }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 284.5029 }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 117.3823 }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 219.4883 }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418 }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654 }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 200.856 }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000 }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 315.6387 }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 163.5166 }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 294.8193 }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 374.2861 }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 234.978 }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000 }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 252.7842 }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762 }, { "state": "West Virginia", "label": "WV", "xValue": 701, "yValue": 243 }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588 }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 179.6255 }, { "state": "District of Columbia", "label": "DC", "xValue": -1000, "yValue": -1000 }];
var bars_info = [{ "state": "Alabama", "abbrev": "AL", "radius": 16.43, "x": 413, "y": 332 }, { "state": "Alaska", "abbrev": "AK", "radius": 9.49, "x": 41, "y": 19 }, { "state": "Arizona", "abbrev": "AZ", "radius": 18.17, "x": 172, "y": 282 }, { "state": "Arkansas", "abbrev": "AR", "radius": 13.42, "x": 325, "y": 290 }, { "state": "California", "abbrev": "CA", "radius": 40.62, "x": 103, "y": 237 }, { "state": "Colorado", "abbrev": "CO", "radius": 16.43, "x": 224, "y": 249 }, { "state": "Connecticut", "abbrev": "CT", "radius": 14.49, "x": 586, "y": 128 }, { "state": "Delaware", "abbrev": "DE", "radius": 9.49, "x": 557, "y": 183 }, { "state": "Florida", "abbrev": "FL", "radius": 29.5, "x": 483, "y": 380 }, { "state": "Georgia", "abbrev": "GA", "radius": 21.91, "x": 443, "y": 298 }, { "state": "Hawaii", "abbrev": "HI", "radius": 10.95, "x": 88, "y": 372 }, { "state": "Idaho", "abbrev": "ID", "radius": 10.95, "x": 188, "y": 173 }, { "state": "Illinois", "abbrev": "IL", "radius": 24.49, "x": 359, "y": 207 }, { "state": "Indiana", "abbrev": "IN", "radius": 18.17, "x": 413, "y": 207 }, { "state": "Iowa", "abbrev": "IA", "radius": 13.42, "x": 306, "y": 195 }, { "state": "Kansas", "abbrev": "KS", "radius": 13.42, "x": 266, "y": 248 }, { "state": "Kentucky", "abbrev": "KY", "radius": 15.49, "x": 411, "y": 251 }, { "state": "Louisiana", "abbrev": "LA", "radius": 15.49, "x": 326, "y": 335 }, { "state": "Maine", "abbrev": "ME", "radius": 7.75, "x": 628, "y": 26 }, { "state": "Maryland", "abbrev": "MD", "radius": 17.32, "x": 505, "y": 185 }, { "state": "Massachusetts", "abbrev": "MA", "radius": 18.17, "x": 607, "y": 89 }, { "state": "Michigan", "abbrev": "MI", "radius": 21.91, "x": 418, "y": 149 }, { "state": "Minnesota", "abbrev": "MN", "radius": 17.32, "x": 304, "y": 142 }, { "state": "Mississippi", "abbrev": "MS", "radius": 13.42, "x": 373, "y": 324 }, { "state": "Missouri", "abbrev": "MO", "radius": 17.32, "x": 329, "y": 251 }, { "state": "Montana", "abbrev": "MT", "radius": 9.49, "x": 206, "y": 131 }, { "state": "Nebraska", "abbrev": "NE", "radius": 7.75, "x": 258, "y": 209 }, { "state": "Nevada", "abbrev": "NV", "radius": 13.42, "x": 167, "y": 220 }, { "state": "New Hampshire", "abbrev": "NH", "radius": 10.95, "x": 612, "y": 54 }, { "state": "New Jersey", "abbrev": "NJ", "radius": 20.49, "x": 551, "y": 147 }, { "state": "New Mexico", "abbrev": "NM", "radius": 12.25, "x": 215, "y": 303 }, { "state": "New York", "abbrev": "NY", "radius": 29.5, "x": 548, "y": 81 }, { "state": "North Carolina", "abbrev": "NC", "radius": 21.21, "x": 499, "y": 278 }, { "state": "North Dakota", "abbrev": "ND", "radius": 9.49, "x": 257, "y": 136 }, { "state": "Ohio", "abbrev": "OH", "radius": 23.24, "x": 459, "y": 191 }, { "state": "Oklahoma", "abbrev": "OK", "radius": 14.49, "x": 270, "y": 294 }, { "state": "Oregon", "abbrev": "OR", "radius": 14.49, "x": 124, "y": 176 }, { "state": "Pennsylvania", "abbrev": "PA", "radius": 24.49, "x": 498, "y": 132 }, { "state": "Rhode Island", "abbrev": "RI", "radius": 10.95, "x": 619, "y": 126 }, { "state": "South Carolina", "abbrev": "SC", "radius": 16.43, "x": 487, "y": 322 }, { "state": "South Dakota", "abbrev": "SD", "radius": 9.49, "x": 257, "y": 167 }, { "state": "Tennessee", "abbrev": "TN", "radius": 18.17, "x": 379, "y": 284 }, { "state": "Texas", "abbrev": "TX", "radius": 33.76, "x": 271, "y": 355 }, { "state": "Utah", "abbrev": "UT", "radius": 13.42, "x": 204, "y": 218 }, { "state": "Vermont", "abbrev": "VT", "radius": 9.49, "x": 585, "y": 47 }, { "state": "Virginia", "abbrev": "VA", "radius": 19.75, "x": 508, "y": 229 }, { "state": "Washington", "abbrev": "WA", "radius": 18.97, "x": 154, "y": 131 }, { "state": "West Virginia", "abbrev": "WV", "radius": 12.25, "x": 451, "y": 242 }, { "state": "Wisconsin", "abbrev": "WI", "radius": 17.32, "x": 359, "y": 146 }, { "state": "Wyoming", "abbrev": "WY", "radius": 9.49, "x": 214, "y": 177 }, { "state": "District of Columbia", "abbrev": "DC", "radius": 9.49, "x": 536, "y": 193 }, { "state": "Maine-1", "abbrev": "NE-2", "radius": 5.48, "x": 612, "y": 26 }, { "state": "Maine-2", "abbrev": "ME-2", "radius": 5.48, "x": 644, "y": 26 }, { "state": "Nebraska-1", "abbrev": "NE-1", "radius": 5.48, "x": 242, "y": 209 }, { "state": "Nebraska-2", "abbrev": "NE-2", "radius": 5.48, "x": 258, "y": 193 }, { "state": "Nebraska-3", "abbrev": "NE-3", "radius": 5.48, "x": 274, "y": 209 }];
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

var overviewphone = d3.select("#overviewphone")
  .append("svg")
  .attr("viewBox", '0 0 1000 700');

var tool_tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-180, -90])
  .html("<div id='tipDiv'></div>");

maphone.call(tool_tip);



d3.csv("https://data.jhkforecasts.com/2020-presidential.csv", function (data) {

  var updated = data[data.length - 1].experts_weight
  data.forEach((d, i) => {
    d.forecast_date = dateparse(d.forecast_date)
    return d
  });

  var newest_update = d3.max(data, d => d.forecast_date);

  document.getElementById("updated").innerHTML = "Updated: " + updated;

  var newest_data = data.slice(data.length - 171, data.length);


  var sd = [];
  for (let k = 0; k < map_states.length; k++) {
    var dt = newest_data.filter(d => d.state == states[k]);s
    
    var ml = map_labels.filter(d => d.state == states[k]);
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
  var boxstates = [sd[28], sd[44], sd[20], sd[38], sd[6], sd[7], sd[19], sd[50]]

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
    .attr("fill", d => color(d.gop_win))

  maphone.selectAll()
    .data(boxstates)
    .enter()
    .append("text")
    .text(d => d.label)
    .attr("x", 865)
    .attr("y", (d, i) => 142.5 + 25 * i)
    .style("font-family", "sf-mono")
    .attr("font-size", "16")
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("font-weight", "500")
    .attr("dominant-baseline", "central")

  maphone.selectAll()
    .data(boxstates)
    .enter()
    .append("a")
    .attr("href", d => d.state)
    .append("rect")
    .attr("class", "statesover")
    .attr("x", 850)
    .attr("y", (d, i) => 130 + 25 * i)
    .attr("width", 30)
    .attr("height", 25)
    .attr("fill", "none")
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
        .text(d.state)
        .attr("y", 20)
        .attr("x", 87.5)
        .attr("fill", "#black")
        .attr("font-weight", "500")
        .style("font-size", "20")
        .attr("text-anchor", "middle")

      tipSVG.append("text")
        .text(d.electoral_votes + " Electoral Votes")
        .attr("y", 40)
        .attr("x", 87.5)
        .attr("fill", "#black")
        .style("font-weight", "500")
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
        .text(nf(d.gop_win) + "%")
        .attr("y", 150)
        .attr("x", 131.25)
        .attr("fill", color(100))
        .attr("font-weight", "500")
        .style("font-size", 20)
        .attr("text-anchor", "middle")

      tipSVG.append("text")
        .text(nf(d.dem_win) + "%")
        .attr("y", 150)
        .attr("x", 43.75)
        .attr("fill", color(0))
        .attr("font-weight", "500")
        .style("font-size", 20)
        .attr("text-anchor", "middle")




    })
    .on('mouseout',
      function (d) {


        tool_tip.hide()
      });

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




    maphone.append("text")
      .text("Win")
      .attr("x", 510)
      .attr("y", -170)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "35")
      .attr("fill", "black")
      .attr("text-anchor", "middle")

    maphone.append("text")
      .text(nf(newest_data[168].win) + "%")
      .attr("x", 740)
      .attr("y", -70)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
      .attr("font-size", "45")
      .attr("fill", colors[0])
      .attr("text-anchor", "end")

    maphone.append("text")
      .text(nf(newest_data[169].win) + "%")
      .attr("x", 310)
      .attr("y", -70)
      .attr("font-family", "brandon-grotesque")
      .attr("font-weight", "700")
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
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(15,0)")


    maphone.selectAll("path2")
      .data(json.features)
      .enter()
      .append("path")
      .attr("class", "statesover")
      .attr("d", path)
      .style("stroke", d => d.properties.tippingPoint >= 3 ? "black" : "none")
      .style("stroke-width", "1.5")
      .attr("transform", "translate(15,0)")
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
          .text(d.properties.ev + " Electoral Votes")
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
          .text(nf(d.properties.gopWin) + "%")
          .attr("y", 150)
          .attr("x", 131.25)
          .attr("fill", color(100))
          .style("font-weight", "600")
          .style("font-size", 20)
          .attr("text-anchor", "middle")

        tipSVG.append("text")
          .text(nf(d.properties.demWin) + "%")
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






    var winner = newest_data[168].win > newest_data[169].win ? "Trump" : "Biden"



    var dateparse = d3.timeParse("%m/%d/%y")
    var marginphone = { top: 20, right: 40, bottom: 30, left: 40 }
    var widthphone = 1000 - marginphone.left - marginphone.right
    var heightphone = 800 - marginphone.top - marginphone.bottom
    var axisPad = 12

    var time_data = data.filter(d => d.state == key_state)

    var lol
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

    var timephone = d3.select("#timephone").append("svg")
      .attr("viewBox", "0 0 1000 800")
      .append('g')
      .attr("transform", "translate(" + marginphone.left + "," + marginphone.top + ")");


    var xphone = d3.scaleTime()
      .rangeRound([marginphone.left, widthphone - marginphone.right])
      .domain([new Date(2020, 2, 1), new Date(2020, 10, 3)])

    var yphone = d3.scaleLinear()
      .rangeRound([heightphone - marginphone.bottom, marginphone.top]);


    var zphone = d3.scaleOrdinal()
      .range(colors)
      ;

    var line = d3.line()
      .curve(d3.curveLinear)
      .x(d => xphone(d.date))
      .y(d => yphone(d.pct));

    timephone.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + (heightphone - marginphone.bottom) + ")")
      .call(d3.axisBottom(xphone).tickSize(-700).ticks(5)
        .tickFormat(d3.timeFormat("%b")))
      .call(g => {
        var years = xphone.ticks(d3.timeYear.every(1))
        var xshift = 0
        g.selectAll("text")
          .style("text-anchor", "right")
          .attr("y", axisPad)
          .attr('fill', 'black')
          .attr('font-size', 20)
          .attr('font-weight', 800)
        g.selectAll("line")
          .attr("opacity", .2)
          .attr("stroke", "grey")


        g.select(".domain")
          .attr("opacity", 0)


      })

    timephone.append("line")
      .attr("x1", xphone(new Date(2020, 10, 3)))
      .attr("x2", xphone(new Date(2020, 10, 3)))
      .attr("y1", 20)
      .attr("y2", (heightphone - marginphone.bottom))
      .attr("stroke", "black")
      .attr("stroke-width", 3)

    timephone.append("text")
      .text("Nov. 3rd")
      .attr("x", xphone(new Date(2020, 10, 3)))
      .attr("y", 10)
      .attr("font-weight", "500")
      .attr('font-size', 20)
      .attr('font-weight', 800)



    timephone.append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(" + marginphone.left + ",0)");

    var focus = timephone.append("g")
      .attr("class", "focus")
      .style("display", "none");

    focus.append("line").attr("class", "lineHover")
      .style("stroke", "#999")
      .attr("stroke-width", 1)
      .style("shape-rendering", "crispEdges")
      .style("opacity", 0)
      .attr("y1", -heightphone)
      .attr("y2", -40);

    focus.append("text").attr("class", "lineHoverDate")
      .attr("text-anchor", "middle")
      .attr("font-size", 12);

    var overlay = timephone.append("rect")
      .attr("class", "overlay")
      .attr("x", marginphone.left)
      .attr("width", xphone(max_date) - marginphone.left)
      .attr("height", heightphone)

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
      yphone.domain([
        0,
        input == "ev" ? 538 : input == "vote" ? 60 : 100
      ]).nice();

      timephone.selectAll(".y-axis").transition()
        .duration(speed)
        .call(d3.axisLeft(yphone).tickSize(-widthphone + marginphone.right + marginphone.left).ticks(5)).call(g => {
          var years = xphone.ticks(d3.timeYear.every(1))
          var xshift = 0
          g.selectAll("text")
            .style("text-anchor", "right")
            .attr("y", 0)
            .attr('fill', 'black')
            .attr('font-size', 20)
            .attr('font-weight', 800)
          g.selectAll("line")
            .attr("opacity", .2)
            .attr("stroke", "grey")


          g.select(".domain")
            .attr("opacity", 0)


        })

      var city = timephone.selectAll(".cities")
        .data(cities);

      city.exit().remove();

      city.enter().insert("g", ".focus").append("path")
        .attr("class", "line cities")
        .style("stroke", (d, i) => colors[i])
        .style("stroke-width", 4)
        .style("opacity", .9)
        .style("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
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
          .style("stroke-width", 10)
          .merge(labels2)

        var labels = focus.selectAll(".lineHoverText")
          .data(copy)

        labels.enter().append("text")
          .attr("class", "lineHoverText")
          .attr("text-anchor", "middle")
          .attr("font-size", 25)
          .merge(labels)

        var circles = focus.selectAll(".hoverCircle")
          .data(copy)

        circles.enter().append("circle")
          .attr("class", "hoverCircle")
          .style("stroke", "white")
          .style("stroke-width", 3)
          .style("fill", d => zphone(d))
          .attr("r", 4)
          .merge(circles);

        timephone.selectAll(".overlay")
          .on("mouseover", () => focus.style("display", null))
          .on("mouseout", () => focus.style("display", "none"))
          .on("mousemove", mousemove);

        function mousemove() {

          var x0 = xphone.invert(d3.mouse(this)[0]),
            i = bisectDate(line_data, x0, 1),
            d0 = line_data[i - 1],
            d1 = line_data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;

          focus.select(".lineHoverDate")
            .attr("x", xphone(d.date))
            .attr("y", 2)
            .attr("text-anchor", "middle")
            .style("font-size", 20)
            .style("font-weight", 400)
            .text(formatDate(d.date));

          focus.selectAll(".hoverCircle")
            .attr("cy", e => yphone(d[e]))
            .attr("cx", xphone(d.date));

          focus.selectAll(".lineHoverText2")
            .style("font-weight", 400)
            .attr("x", xphone(d.date) + 10)
            .text((e, i) => i == 1 ? ("Biden " + onevalue(d[e]) + "%") : i == 0 ? "Trump " + onevalue(d[e]) + "%" : "Third " + onevalue(d[e]) + "%")
            .attr("y", e => d[e] == d["gop" + input] ? yphone(d["gop" + input]) > yphone(d["dem" + input]) ? yphone(d["gop" + input]) + 15 : yphone(d["gop" + input]) - 15 : d[e] == d["dem" + input] ? yphone(d["dem" + input]) > yphone(d["gop" + input]) ? yphone(d["dem" + input]) + 15 : yphone(d["dem" + input]) - 15 : yphone(d[e]) - 15)
            .attr("text-anchor", (e, i) => i == 2 ? "end" : "start")
            .attr("dominant-baseline", "middle")

          focus.selectAll(".lineHoverText")
            .style("font-weight", 400)
            .attr("x", xphone(d.date) + 10)
            .text((e, i) => input == "ev" ? i == 1 ? ("Biden " + onevalue(d[e])) : i == 0 ? "Trump " + onevalue(d[e]) : "Third " + onevalue(d[e]) : i == 1 ? ("Biden " + onevalue(d[e]) + "%") : i == 0 ? "Trump " + onevalue(d[e]) + "%" : "Third " + onevalue(d[e]) + "%")
            .attr("fill", (e, i) => colors[i])
            .attr("y", e => d[e] == d["gop" + input] ? yphone(d["gop" + input]) > yphone(d["dem" + input]) ? yphone(d["gop" + input]) + 15 : yphone(d["gop" + input]) - 15 : d[e] == d["dem" + input] ? yphone(d["dem" + input]) > yphone(d["gop" + input]) ? yphone(d["dem" + input]) + 15 : yphone(d["dem" + input]) - 15 : yphone(d[e]) - 15)
            .attr("text-anchor", (e, i) => i == 2 ? "end" : "start")
            .attr("dominant-baseline", "middle")
        }
      }
      var winbuttonp = d3.select("#winbuttonphone")
        .on("click", function () {
          update("win", 500)
        })

      var votebuttonp = d3.select("#votebuttonphone")
        .on("click", function () {
          update("vote", 500)
        })
      var evbuttonp = d3.select("#evbuttonphone")
        .on("click", function () {
          update("ev", 500)
        })
    }

    var overview_data = newest_data.filter(d => d.state == "US")
    overview_data.sort((a, b) => b.electoral_vote - a.electoral_vote)

    overviewphone.selectAll()
      .data(overview_data)
      .enter()
      .append("text")
      .text(d => onevalue(d.electoral_vote))
      .attr("y", (d, i) => 200 + i * 200)
      .attr("x", 450)
      .attr("fill", (d, i) => cand_colors(d.party))
      .style("font-weight", "800")
      .style("font-size", 55)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")

    overviewphone.selectAll()
      .data(overview_data)
      .enter()
      .append("text")
      .text(d => onevalue(d.proj_vote) + "%")
      .attr("y", (d, i) => 200 + i * 200)
      .attr("x", 850)
      .attr("fill", (d, i) => cand_colors(d.party))
      .style("font-weight", "800")
      .style("font-size", 55)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")

    overviewphone.append("image")
      .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
      .attr("x", 100)
      .attr("y", overview_data[0].party == "gop" ? 110 : 310)
      .attr("width", 180)
      .attr("height", 180)
    overviewphone.append("image")
      .attr("xlink:href", d => "https://jhkforecasts.com/Biden-01.png")
      .attr("x", 100)
      .attr("y", overview_data[0].party == "gop" ? 310 : 110)
      .attr("width", 180)
      .attr("height", 180)


    overviewphone.append("text")
      .text("?")
      .attr("y", 600)
      .attr("x", 190)
      .attr("fill", cand_colors("third"))
      .style("font-weight", "800")
      .style("font-size", "95")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")


    overviewphone.append("text")
      .text("Avg Electoral Votes")
      .attr("y", 50)
      .attr("x", 450)
      .attr("fill", "Black")
      .style("font-weight", "800")
      .style("font-size", 40)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
    overviewphone.append("text")
      .text("Popular Vote")
      .attr("y", 50)
      .attr("x", 850)
      .attr("fill", "Black")
      .style("font-weight", "800")
      .style("font-size", 40)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")

    var sdbars = []
    for (let k = 0; k < bars_info.length; k++) {
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
      sdbars.push(finaldt)
    }

    var barsphone = d3.select("#barsphone")
      .append("svg")
      .attr("viewBox", '0 0 400 800')

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
      d.indexev = d.index == 1 ? 0 : gopbars[i - 1].indexev + gopbars[i - 1].electoral_votes;

    })
    dembars.sort((a, b) => a.margin - b.margin)
    dembars.forEach(function (d, i) {
      d.index = i + 1;
      d.indexev = d.index == 1 ? 0 : dembars[i - 1].indexev + dembars[i - 1].electoral_votes;

    })

    var gop_ev_bars = d3.sum(gopbars, d => d.electoral_votes)
    var dem_ev_bars = d3.sum(dembars, d => d.electoral_votes)

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
      .attr("height", d => d.electoral_votes * (630 / max_evs))
      .attr("width", 70)
      .attr("ry", 3)
      .attr("fill", d => color(d.gop_win))
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
          .text(d.margin > 0 ? "Trump +" + nf(Math.abs(d.margin)) : "Biden +" + nf(Math.abs(d.margin)))
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


    barsphone.selectAll("bars")
      .data(dembars)
      .enter()
      .append("rect")
      .attr("y", d => xbarsphone(d.indexev))
      .attr("x", gop_ev_bars > dem_ev_bars ? 200 : 100)
      .attr("height", d => d.electoral_votes * (630 / max_evs))
      .attr("width", 70)
      .attr("ry", 3)
      .attr("fill", d => color(d.gop_win))
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
          .text(d.margin > 0 ? "Trump +" + nf(Math.abs(d.margin)) : "Biden +" + nf(Math.abs(d.margin)))
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
      .style("font-weight", "600")
      .style("font-size", "25")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")

    barsphone.append("text")
      .text(gop_ev_bars)
      .attr("y", xbarsphone(gop_ev_bars) + 120)
      .attr("x", gop_ev_bars < dem_ev_bars ? 237.5 : 137.5)
      .attr("fill", colors[0])
      .style("font-weight", "600")
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


    var bubblemapphone = d3.select("#bubblemapphone")
      .append("svg")
      .attr("viewBox", '0 0 750 450')

    var tool_tipbm = d3.tip()
      .attr("class", "d3-tip")
      .offset([-180, -90])
      .html("<div id='tipDivbm'></div>");

    bubblemapphone.call(tool_tipbm);


    bubblemapphone.selectAll("circ")
      .data(sd3)
      .enter()
      .append("a")
      .attr("xlink:href", d => d.state)
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", d => color(d.gop_win))
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
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", 13)
      .style("font-family", "source-code-pro")



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


        tool_tipbm.show();
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
          .text(d.margin > 0 ? "Trump +" + nf(Math.abs(d.margin)) : "Biden +" + nf(Math.abs(d.margin)))
          .attr("y", 160)
          .attr("x", 87.5)
          .attr("fill", d.margin > 0 ? cand_colors("gop") : cand_colors("dem"))
          .style("font-weight", "700")
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
      .attr("cy", (d, i) => 300)
      .attr("cx", (d, i) => 600 + i * 25)
      .attr("fill", d => color(d))


    bubblemapphone.selectAll("key")
      .data(pct)
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("cy", (d, i) => 350)
      .attr("cx", (d, i) => 600 + i * 25)
      .attr("fill", d => color(100 - d))


    bubblemapphone.selectAll("key")
      .data(pct)
      .enter()
      .append("text")
      .text(d => d)
      .attr("y", 260)
      .attr("x", (d, i) => 600 + i * 25)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("font-weight", 800)


    bubblemapphone.append("text")
      .text("Win State")
      .attr("y", 230)
      .attr("x", 650)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("font-size", 15)
      .attr("font-weight", 800)





    var distphone = d3.select("#distphone").append("svg")

    show_more(1170)

    function show_more(input_height) {


      distphone.attr("viewBox", "00 40 1000 " + input_height)

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
      var min_stdev = d3.min(fdt, d => d.std) * 1.5
      var highest_curve = jStat.normal.pdf(0, 0, min_stdev)
      fdt.sort((a, b) => b.tipping_point - a.tipping_point)
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
          tipping_point: fdt[k].tipping_point
        }


        sd4.push(dt)
      }





      var x3p = d3.scaleLinear()
        .domain([-75, 75])
        .range([200, 775])

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
        .style("fill", color(20))
        .attr("d", d => area(d.marginvalues.filter((d, i) => i < 90 && i > 10 && d.x < 0.1)))
        .style("stroke", (d, i) => color(20))

      curves.enter().insert("g", ".focus").append("path")
        .attr("class", "line cities")
        .style("stroke-width", 3)
        .style("opacity", 1)
        .style("fill", color(80))
        .attr("d", d => area(d.marginvalues.filter((d, i) => i < 90 && i > 10 && d.x > 0.2)))
        .style("stroke", (d, i) => color(80))



      var pct = [-75, -50, -25, 0, 25, 50, 75]


      distphone.selectAll()
        .data(pct)
        .enter()
        .append("text")
        .text(d => d == 0 ? "EVEN" : d > 0 ? "R +" + d + "%" : "D +" + -d + "%")
        .attr("x", d => x3p(d))
        .attr("y", 70)
        .attr("text-anchor", "middle")
        .attr("font-weight", "500")
        .attr("font-size", 20)
        .attr("fill", d => d == 0 ? "black" : d > 0 ? colors[0] : colors[1])

      distphone.selectAll()
        .data(sd4)
        .enter()
        .append("a")
        .attr("xlink:href", d => d.state)
        .append("text")
        .text(d => d.state)
        .attr("x", 20)
        .attr("y", (d, i) => i * 80 + 150)
        .attr("font-weight", "500")
        .attr("font-size", 25)

      distphone.selectAll()
        .data(sd4)
        .enter()
        .append("text")
        .text(d => nf(d.tipping_point) + "%")
        .attr("x", 980)
        .attr("y", (d, i) => i * 80 + 150)
        .attr("font-weight", "500")
        .attr("text-anchor", "end")

      distphone.selectAll()
        .data(sd4)
        .enter()
        .append("text")
        .text(d => d.margin >= 0 ? "Trump +" + nf(Math.abs(d.margin)) + "%" : "Biden +" + nf(Math.abs(d.margin)) + "%")
        .attr("x", 850)
        .attr("y", (d, i) => i * 80 + 150)
        .attr("font-weight", "500")
        .attr("text-anchor", "middle")
        .attr("fill", d => d.margin >= 0 ? "#FF6060" : "#0091FF")



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
        .attr("y2", 4530)
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
