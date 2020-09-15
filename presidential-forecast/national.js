var timeScale = 86400000
var colors = ["#FF6060", "#0091FF", "#ffc300", "#C473F6", "#31DE70"]
var category = ["REP", "DEM", "LIB", "IND", "GRE"]
var partyColors = d3.scaleOrdinal()
  .domain(category)
  .range(colors)
var candidates = [
  { candidate: "Joseph Biden", party: "DEM", id: "Biden" },
  { candidate: "Donald Trump", party: "REP", id: "Trump" },
  { candidate: "Howie Hawkins", party: "GRE", id: "Hawkins" },
  { candidate: "Jo Jorgensen", party: "LIB", id: "Jorgensen" },
]
var tformat = d3.timeFormat("%m/%d/%Y")
var dp = d3.timeParse("%m/%d/%y")
var tf = d3.timeFormat("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
var numberformat = d3.format(".1f")
var updated_format = d3.timeFormat("%b. %d %Y %I:%M %p")
var widthmap = 1020
var heightmap = 500;
var bubble_info = [{ "state": "Alabama", "abbrev": "AL", "radius": 16.43, "x": 413, "y": 332 }, { "state": "Alaska", "abbrev": "AK", "radius": 9.49, "x": 41, "y": 19 }, { "state": "Arizona", "abbrev": "AZ", "radius": 18.17, "x": 172, "y": 282 }, { "state": "Arkansas", "abbrev": "AR", "radius": 13.42, "x": 325, "y": 290 }, { "state": "California", "abbrev": "CA", "radius": 40.62, "x": 103, "y": 237 }, { "state": "Colorado", "abbrev": "CO", "radius": 16.43, "x": 224, "y": 249 }, { "state": "Connecticut", "abbrev": "CT", "radius": 14.49, "x": 586, "y": 128 }, { "state": "Delaware", "abbrev": "DE", "radius": 9.49, "x": 557, "y": 183 }, { "state": "District of Columbia", "abbrev": "DC", "radius": 9.49, "x": 536, "y": 193 }, { "state": "Florida", "abbrev": "FL", "radius": 29.5, "x": 483, "y": 380 }, { "state": "Georgia", "abbrev": "GA", "radius": 21.91, "x": 443, "y": 298 }, { "state": "Hawaii", "abbrev": "HI", "radius": 10.95, "x": 88, "y": 372 }, { "state": "Idaho", "abbrev": "ID", "radius": 10.95, "x": 188, "y": 173 }, { "state": "Illinois", "abbrev": "IL", "radius": 24.49, "x": 359, "y": 207 }, { "state": "Indiana", "abbrev": "IN", "radius": 18.17, "x": 413, "y": 207 }, { "state": "Iowa", "abbrev": "IA", "radius": 13.42, "x": 306, "y": 195 }, { "state": "Kansas", "abbrev": "KS", "radius": 13.42, "x": 266, "y": 248 }, { "state": "Kentucky", "abbrev": "KY", "radius": 15.49, "x": 411, "y": 251 }, { "state": "Louisiana", "abbrev": "LA", "radius": 15.49, "x": 326, "y": 335 }, { "state": "Maine", "abbrev": "ME", "radius": 7.75, "x": 628, "y": 26 }, { "state": "Maryland", "abbrev": "MD", "radius": 17.32, "x": 505, "y": 185 }, { "state": "Massachusetts", "abbrev": "MA", "radius": 18.17, "x": 607, "y": 89 }, { "state": "Michigan", "abbrev": "MI", "radius": 21.91, "x": 418, "y": 149 }, { "state": "Minnesota", "abbrev": "MN", "radius": 17.32, "x": 304, "y": 142 }, { "state": "Mississippi", "abbrev": "MS", "radius": 13.42, "x": 373, "y": 324 }, { "state": "Missouri", "abbrev": "MO", "radius": 17.32, "x": 329, "y": 251 }, { "state": "Montana", "abbrev": "MT", "radius": 9.49, "x": 206, "y": 131 }, { "state": "Nebraska", "abbrev": "NE", "radius": 7.75, "x": 258, "y": 209 }, { "state": "Nevada", "abbrev": "NV", "radius": 13.42, "x": 167, "y": 220 }, { "state": "New Hampshire", "abbrev": "NH", "radius": 10.95, "x": 612, "y": 54 }, { "state": "New Jersey", "abbrev": "NJ", "radius": 20.49, "x": 551, "y": 147 }, { "state": "New Mexico", "abbrev": "NM", "radius": 12.25, "x": 215, "y": 303 }, { "state": "New York", "abbrev": "NY", "radius": 29.5, "x": 548, "y": 81 }, { "state": "North Carolina", "abbrev": "NC", "radius": 21.21, "x": 499, "y": 278 }, { "state": "North Dakota", "abbrev": "ND", "radius": 9.49, "x": 257, "y": 136 }, { "state": "Ohio", "abbrev": "OH", "radius": 23.24, "x": 459, "y": 191 }, { "state": "Oklahoma", "abbrev": "OK", "radius": 14.49, "x": 270, "y": 294 }, { "state": "Oregon", "abbrev": "OR", "radius": 14.49, "x": 124, "y": 176 }, { "state": "Pennsylvania", "abbrev": "PA", "radius": 24.49, "x": 498, "y": 132 }, { "state": "Rhode Island", "abbrev": "RI", "radius": 10.95, "x": 619, "y": 126 }, { "state": "South Carolina", "abbrev": "SC", "radius": 16.43, "x": 487, "y": 322 }, { "state": "South Dakota", "abbrev": "SD", "radius": 9.49, "x": 257, "y": 167 }, { "state": "Tennessee", "abbrev": "TN", "radius": 18.17, "x": 379, "y": 284 }, { "state": "Texas", "abbrev": "TX", "radius": 33.76, "x": 271, "y": 355 }, { "state": "Utah", "abbrev": "UT", "radius": 13.42, "x": 204, "y": 218 }, { "state": "Vermont", "abbrev": "VT", "radius": 9.49, "x": 585, "y": 47 }, { "state": "Virginia", "abbrev": "VA", "radius": 19.75, "x": 508, "y": 229 }, { "state": "Washington", "abbrev": "WA", "radius": 18.97, "x": 154, "y": 131 }, { "state": "West Virginia", "abbrev": "WV", "radius": 12.25, "x": 451, "y": 242 }, { "state": "Wisconsin", "abbrev": "WI", "radius": 17.32, "x": 359, "y": 146 }, { "state": "Wyoming", "abbrev": "WY", "radius": 9.49, "x": 214, "y": 177 }, { "state": "Maine CD-1", "abbrev": 1, "radius": 5.48, "x": 612, "y": 26 }, { "state": "Maine CD-2", "abbrev": 2, "radius": 5.48, "x": 644, "y": 26 }, { "state": "Nebraska CD-1", "abbrev": 1, "radius": 5.48, "x": 242, "y": 209 }, { "state": "Nebraska CD-2", "abbrev": 2, "radius": 5.48, "x": 258, "y": 193 }, { "state": "Nebraska CD-3", "abbrev": 3, "radius": 5.48, "x": 274, "y": 209 }]
var stateLabels = [{ "state": "Alabama", "abbrev": "AL", "radius": 16.43, "x": 413, "y": 332 }, { "state": "Alaska", "abbrev": "AK", "radius": 9.49, "x": 41, "y": 19 }, { "state": "Arizona", "abbrev": "AZ", "radius": 18.17, "x": 172, "y": 282 }, { "state": "Arkansas", "abbrev": "AR", "radius": 13.42, "x": 325, "y": 290 }, { "state": "California", "abbrev": "CA", "radius": 40.62, "x": 103, "y": 237 }, { "state": "Colorado", "abbrev": "CO", "radius": 16.43, "x": 224, "y": 249 }, { "state": "Connecticut", "abbrev": "CT", "radius": 14.49, "x": 586, "y": 128 }, { "state": "Delaware", "abbrev": "DE", "radius": 9.49, "x": 557, "y": 183 }, { "state": "District of Columbia", "abbrev": "DC", "radius": 9.49, "x": 536, "y": 193 }, { "state": "Florida", "abbrev": "FL", "radius": 29.5, "x": 483, "y": 380 }, { "state": "Georgia", "abbrev": "GA", "radius": 21.91, "x": 443, "y": 298 }, { "state": "Hawaii", "abbrev": "HI", "radius": 10.95, "x": 88, "y": 372 }, { "state": "Idaho", "abbrev": "ID", "radius": 10.95, "x": 188, "y": 173 }, { "state": "Illinois", "abbrev": "IL", "radius": 24.49, "x": 359, "y": 207 }, { "state": "Indiana", "abbrev": "IN", "radius": 18.17, "x": 413, "y": 207 }, { "state": "Iowa", "abbrev": "IA", "radius": 13.42, "x": 306, "y": 195 }, { "state": "Kansas", "abbrev": "KS", "radius": 13.42, "x": 266, "y": 248 }, { "state": "Kentucky", "abbrev": "KY", "radius": 15.49, "x": 411, "y": 251 }, { "state": "Louisiana", "abbrev": "LA", "radius": 15.49, "x": 326, "y": 335 }, { "state": "Maine", "abbrev": "ME", "radius": 7.75, "x": 628, "y": 26 }, { "state": "Maryland", "abbrev": "MD", "radius": 17.32, "x": 505, "y": 185 }, { "state": "Massachusetts", "abbrev": "MA", "radius": 18.17, "x": 607, "y": 89 }, { "state": "Michigan", "abbrev": "MI", "radius": 21.91, "x": 418, "y": 149 }, { "state": "Minnesota", "abbrev": "MN", "radius": 17.32, "x": 304, "y": 142 }, { "state": "Mississippi", "abbrev": "MS", "radius": 13.42, "x": 373, "y": 324 }, { "state": "Missouri", "abbrev": "MO", "radius": 17.32, "x": 329, "y": 251 }, { "state": "Montana", "abbrev": "MT", "radius": 9.49, "x": 206, "y": 131 }, { "state": "Nebraska", "abbrev": "NE", "radius": 7.75, "x": 258, "y": 209 }, { "state": "Nevada", "abbrev": "NV", "radius": 13.42, "x": 167, "y": 220 }, { "state": "New Hampshire", "abbrev": "NH", "radius": 10.95, "x": 612, "y": 54 }, { "state": "New Jersey", "abbrev": "NJ", "radius": 20.49, "x": 551, "y": 147 }, { "state": "New Mexico", "abbrev": "NM", "radius": 12.25, "x": 215, "y": 303 }, { "state": "New York", "abbrev": "NY", "radius": 29.5, "x": 548, "y": 81 }, { "state": "North Carolina", "abbrev": "NC", "radius": 21.21, "x": 499, "y": 278 }, { "state": "North Dakota", "abbrev": "ND", "radius": 9.49, "x": 257, "y": 136 }, { "state": "Ohio", "abbrev": "OH", "radius": 23.24, "x": 459, "y": 191 }, { "state": "Oklahoma", "abbrev": "OK", "radius": 14.49, "x": 270, "y": 294 }, { "state": "Oregon", "abbrev": "OR", "radius": 14.49, "x": 124, "y": 176 }, { "state": "Pennsylvania", "abbrev": "PA", "radius": 24.49, "x": 498, "y": 132 }, { "state": "Rhode Island", "abbrev": "RI", "radius": 10.95, "x": 619, "y": 126 }, { "state": "South Carolina", "abbrev": "SC", "radius": 16.43, "x": 487, "y": 322 }, { "state": "South Dakota", "abbrev": "SD", "radius": 9.49, "x": 257, "y": 167 }, { "state": "Tennessee", "abbrev": "TN", "radius": 18.17, "x": 379, "y": 284 }, { "state": "Texas", "abbrev": "TX", "radius": 33.76, "x": 271, "y": 355 }, { "state": "Utah", "abbrev": "UT", "radius": 13.42, "x": 204, "y": 218 }, { "state": "Vermont", "abbrev": "VT", "radius": 9.49, "x": 585, "y": 47 }, { "state": "Virginia", "abbrev": "VA", "radius": 19.75, "x": 508, "y": 229 }, { "state": "Washington", "abbrev": "WA", "radius": 18.97, "x": 154, "y": 131 }, { "state": "West Virginia", "abbrev": "WV", "radius": 12.25, "x": 451, "y": 242 }, { "state": "Wisconsin", "abbrev": "WI", "radius": 17.32, "x": 359, "y": 146 }, { "state": "Wyoming", "abbrev": "WY", "radius": 9.49, "x": 214, "y": 177 }, { "state": "Maine CD-1", "abbrev": "ME-1", "radius": 5.48, "x": 612, "y": 26 }, { "state": "Maine CD-2", "abbrev": "ME-1", "radius": 5.48, "x": 644, "y": 26 }, { "state": "Nebraska CD-1", "abbrev": "NE-1", "radius": 5.48, "x": 242, "y": 209 }, { "state": "Nebraska CD-2", "abbrev": "NE-2", "radius": 5.48, "x": 258, "y": 193 }, { "state": "Nebraska CD-3", "abbrev": "NE-3", "radius": 5.48, "x": 274, "y": 209 }]
var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Maine CD-1", "Maine CD-2", "Nebraska CD-1", "Nebraska CD-2", "Nebraska CD-3", "US"]
var map_states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934 }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400 }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801 }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387 }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 245.9219 }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 240.5645 }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000 }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000 }, { "state": "District of Columbia", "label": "DC", "xValue": -1000, "yValue": -1000 }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154 }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354 }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465 }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155 }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 225.2954 }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 223.4214 }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 198.6782 }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 255.1592 }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 264.9658 }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135 }, { "state": "Maine", "label": "ME", "xValue": 807.3105, "yValue": 109.855 }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000 }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000 }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647 }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874 }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514 }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 255.123 }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705 }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527 }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957 }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000 }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210 }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035 }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 160.2588 }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 280.5029 }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 112.3823 }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 215.4883 }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418 }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654 }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 195.856 }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000 }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 310.6387 }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 158.5166 }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 290.8193 }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 368.2861 }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 230.978 }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000 }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 252.7842 }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762 }, { "state": "West Virginia", "label": "WV", "xValue": 701, "yValue": 243 }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588 }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 175.6255 }]
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
  .attr("viewBox", '75 -50 900 550');

d3.select("#overview").append("h1")
  .text("National Overview")
  .style("font-weight", 900)
var overview = d3.select("#overview")
  .append("svg")
  .attr("viewBox", '0 0 1000 250');

var tool_tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-180, -90])
  .html("<div id='tipDiv'></div>");

map.call(tool_tip);

d3.json("https://projects.jhkforecasts.com/presidential-forecast/us.json", function (us) {

 
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
        map.append("text")
          .text("Chance of an upset is about the odds of...")
          .attr("y", -40)
          .attr("x", 525)
          .attr("fill", "black")
          .attr("text-anchor", "middle")
          .attr("font-size", 12)
          .style("font-weight", "100")


        map.append("text")
          .text(events[Math.round(odds_scale(upset_odds))])
          .attr("y", -20)
          .attr("x", 525)
          .attr("fill", "black")
          .attr("text-anchor", "middle")
          .attr("font-size", 15)
          .style("font-weight", "100")


        map.append("image")
          .attr("href", events[Math.round(odds_scale(upset_odds))] + ".svg")
          .attr("x", 487.5)
          .attr("y", -10)
          .attr("height", 75)
          .attr("width", 75)

        var sd = []
        for (let k = 0; k < map_states.length; k++) {
          var dt = newest_data.filter(d => d.state == states[k])
          var ml = map_labels.filter(d => d.state == states[k])
          var finaldt = {
            state: states[k],
            evs: +dt[0].ev,
            gopWin: +dt[1].win,
            demWin: +dt[0].win,
            third_win: +dt[3].win,
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

        map.selectAll()
          .data(boxstates)
          .enter()
          .append("rect")
          .attr("x", 825)
          .attr("y", (d, i) => 130 + 15 * i)
          .attr("width", 30)
          .attr("height", 15)
          .attr("stroke", "white")
          .attr("fill", d => color(d.gopWin))

        map.selectAll()
          .data(boxstates)
          .enter()
          .append("text")
          .text(d => d.label)
          .attr("x", 840)
          .attr("y", (d, i) => 137.5 + 15 * i)
          .style("font-family", "sf-mono")
          .attr("font-size", "9")
          .attr("fill", "white")
          .attr("text-anchor", "middle")
          .style("font-weight", "100")
          .attr("dominant-baseline", "central")

        map.selectAll()
          .data(boxstates)
          .enter()
          .append("a")
          .attr("href", d => d.state.toLowerCase().split(" ").join("-"))
          .append("rect")
          .attr("class", "statesover")
          .attr("x", 825)
          .attr("y", (d, i) => 130 + 15 * i)
          .attr("width", 30)
          .attr("height", 15)
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
              .text(d.state == "District of Columbia" ? "DC" : d.state)
              .attr("y", 20)
              .attr("x", 87.5)
              .attr("fill", "#black")
              .style("font-weight", "100")
              .style("font-size", "16")
              .attr("text-anchor", "middle")

            tipSVG.append("text")
              .text(d.evs + " Electoral Votes")
              .attr("y", 40)
              .attr("x", 87.5)
              .attr("fill", "#black")
              .style("font-weight", "500")
              .style("font-size", "14")
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
              .text(d.gopWin > 99.9 ? ">99.9%" : d.gopWin < 0.1 ? "<0.1%" : numberformat(d.gopWin) + "%")
              .attr("y", 155)
              .attr("x", 131.25)
              .attr("fill", color(100))
              .style("font-weight", "100")
              .style("font-size", 20)
              .attr("text-anchor", "middle")

            tipSVG.append("text")
              .text(d.demWin > 99.9 ? ">99.9%" : d.demWin < 0.1 ? "<0.1%" : numberformat(d.demWin) + "%")
              .attr("y", 155)
              .attr("x", 43.75)
              .attr("fill", color(0))
              .style("font-weight", "100")
              .style("font-size", 20)
              .attr("text-anchor", "middle")




          })
          .on('mouseout',
            function (d) {


              tool_tip.hide()
            });



        var json = topojson.feature(us, us.objects.states)
        for (var i = 0; i < sd.length; i++) {

          var dataState = sd[i].state;
          var gopwin = sd[i].gopWin
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



        map.selectAll("path")
          .data(json.features)
          .enter()
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
          .style("font-family", "sf-mono")
          .style("font-size", 9)
          .attr("fill", d => Math.abs(50 - d.properties.gopWin) < 15 ? "black" : "white")
          .attr("dominant-baseline", "central")
          .attr("text-anchor", "middle")
          .style("font-weight", 500)

        map.selectAll("label")
          .data(json.features)
          .enter()
          .append("rect")
          .attr("x", d => d.properties.xv - 7.5)
          .attr("y", d => d.properties.yv - 7)
          .attr("width", 15)
          .attr("height", 14)
          .style('fill', "none")
          .style('stroke', d => d.properties.tippingPoint >= 3 ? "black" : "none")
          .attr("ry", 2)



        map.selectAll("path2")
          .data(json.features)
          .enter()
          .append("a")
          .attr("xlink:href", d => d.properties.name.toLowerCase().split(" ").join("-"))
          .append("path")
          .attr("class", "statesover")
          .attr("d", path)
          .style("stroke-width", "1.5")
          .on('mouseover', function (d) {


            tool_tip.offset([-180, -90]).show();
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
              .text(d.properties.name == "District of Columbia" ? "DC" : d.properties.name)
              .attr("y", 20)
              .attr("x", 87.5)
              .attr("fill", "#black")
              .style("font-weight", "100")
              .style("font-size", "16")
              .attr("text-anchor", "middle")

            tipSVG.append("text")
              .text(d.properties.ev + " Electoral Votes")
              .attr("y", 40)
              .attr("x", 87.5)
              .attr("fill", "#black")
              .style("font-weight", "500")
              .style("font-size", "14")
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
              .text(d.properties.gopWin > 99.9 ? ">99.9%" : d.properties.gopWin < 0.1 ? "<0.1%" : numberformat(d.properties.gopWin) + "%")
              .attr("y", 155)
              .attr("x", 131.25)
              .attr("fill", color(100))
              .style("font-weight", "100")
              .style("font-size", 20)
              .attr("text-anchor", "middle")

            tipSVG.append("text")
              .text(d.properties.demWin > 99.9 ? ">99.9%" : d.properties.demWin < 0.1 ? "<0.1%" : numberformat(d.properties.demWin) + "%")
              .attr("y", 155)
              .attr("x", 43.75)
              .attr("fill", color(0))
              .style("font-weight", "100")
              .style("font-size", 20)
              .attr("text-anchor", "middle")



          })
          .on('mouseout',
            function (d) {


              tool_tip.hide()
            });

        map.append("rect")
          .attr("x", 880)
          .attr("y", 420)
          .attr("width", 20)
          .attr("height", 20)
          .style("stroke", "black")
          .style("stroke-width", 2)
          .attr("ry", "6")
          .style("fill", "none");

        map.append("text")
          .text("Tipping Points")
          .attr("x", 790)
          .attr("y", 430)
          .attr("fill", "black")
          .style("font-weight", "100")
          .style("font-size", "10");

          var pct = [60, 70, 80, 90, 100]

          map.selectAll("key")
            .data(pct)
            .enter()
            .append("circle")
            .attr("r", 20)
            .attr("cy", (d, i) => 330)
            .attr("cx", (d, i) => 810 + i * 20)
            .attr("fill", d => color(d))
  
  
            map.selectAll("key")
            .data(pct)
            .enter()
            .append("circle")
            .attr("r", 20)
            .attr("cy", (d, i) => 380)
            .attr("cx", (d, i) => 810 + i * 20)
            .attr("fill", d => color(100 - d))
  
            map.selectAll("key")
            .data(pct)
            .enter()
            .append("text")
            .text(d => d)
            .attr("y", 330)
            .attr("x", (d, i) => 795 + i * 20)
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .attr("font-size", 10)
            .style("font-weight", "100")
            .style("dominant-baseline", "central")
  
  
            map
            .append("text")
            .text("Trump")
            .attr("y", 330)
            .attr("x", (d, i) => 785 + i * 20)
            .attr("fill", "black")
            .attr("text-anchor", "end")
            .attr("font-size", 10)
            .style("font-weight", "100")
            .style("dominant-baseline", "central")
  
            map
            .append("text")
            .text("Biden")
            .attr("y", 380)
            .attr("x", (d, i) => 785 + i * 20)
            .attr("fill", "black")
            .attr("text-anchor", "end")
            .attr("font-size", 10)
            .style("font-weight", "100")
            .style("dominant-baseline", "central")
  
  
            map.selectAll("key")
            .data(pct)
            .enter()
            .append("text")
            .text(d => d)
            .attr("y", 380)
            .attr("x", (d, i) => 795 + i * 20)
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .attr("font-size", 10)
            .style("font-weight", "100")
            .style("dominant-baseline", "central")
  
  
          map.append("text")
            .text("Win State")
            .attr("y", 300)
            .attr("x", 850)
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("font-size", 15)
            .style("font-weight", "100")


        var winner = newest_data[168].win > newest_data[169].win ? "Trump" : "Biden"

        map.append("text")
          .text("Donald Trump")
          .attr("x", 850)
          .attr("y", -30)
          .attr("font-family", "sf-mono")
          .style("font-weight", "100")
          .attr("font-size", "15")
          .attr("fill", "black")
          .attr("text-anchor", "end")


        map.append("text")
          .text(numberformat(newest_data[225].win) + "%")
          .attr("x", 850)
          .attr("y", 0)
          .attr("font-family", "sf-mono")
          .style("font-weight", "100")
          .attr("font-size", "25")
          .attr("fill", colors[0])
          .attr("text-anchor", "end")


        map.append("text")
          .text(numberformat(newest_data[224].win) + "%")
          .attr("x", 200)
          .attr("y", 0)
          .attr("font-family", "sf-mono")
          .style("font-weight", "100")
          .attr("font-size", "25")
          .attr("fill", colors[1])
          .attr("text-anchor", "start")

        map.append("text")
          .text("Joseph Biden")
          .attr("x", 200)
          .attr("y", -30)
          .style("font-family", "sf-mono")
          .style("font-weight", "100")
          .attr("font-size", "15")
          .attr("fill", "black")
          .attr("text-anchor", "start")

        map.append("image")
          .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
          .attr("x", 875)
          .attr("y", -40)
          .attr("width", 75)
          .attr("height", 75)

        map.append("image")
          .attr("xlink:href", d => "https://jhkforecasts.com/Biden-01.png")
          .attr("x", 100)
          .attr("y", -40)
          .attr("width", 75)
          .attr("height", 75)

        var dateparse = d3.timeParse("%m/%d/%y")


        var time_data = data.filter(d => d.state == key_state)

        var lol
        var max_date = d3.max(time_data, d => d.forecastDate)
        var lineData = data.filter(d => d.state == key_state)
        var margin = { top: 20, right: 50, bottom: 20, left: 50 }
        var width = 1400 - margin.left - margin.right
        var height = 600 - margin.top - margin.bottom
        var axisPad = 12
        var parseTime = d3.timeParse("%Y-%m-%d"),
          formatDate = d3.timeFormat("%b - %d"),
          formatMonth = d3.timeFormat("%Y-%m-%d"),
          bisectDate = d3.bisector(d => d).left,
          wholevalue = d3.format(".0f"),
          onevalue = d3.format(".1f")

        var time = d3.select("#time").append("svg")
          .attr("viewBox", "0 0 1400 600")
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
          .call(d3.axisBottom(x).tickSize(-520).ticks(5)
            .tickFormat(d3.timeFormat("%b")))
          .call(g => {
            var years = x.ticks(d3.timeYear.every(1))
            var xshift = 0
            g.selectAll("text")
              .style("text-anchor", "right")
              .attr("y", 15)
              .attr('fill', 'black')
              .attr('font-size', 20)
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
          .style("font-weight", "100")
          .attr("font-size", 15)
          .attr("text-anchor", "end")



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
                top: input == "win" ? d[input] : input == "ev" ? +d[input] + +d.p10 * 1.5 : i < 2 ? +d[input] + (4.5- (j / 150)) : +d[input] + (+d[input] + 3) / 2,
                bottom: input == "win" ? d[input] : input == "ev" ? +d[input] - +d.p10 * 1.5 : i < 2 ? +d[input] - (4.5 - (j / 150)) : +d[input] - (+d[input]) / 1.5,
              }
            }))
          })


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
                .attr('font-size', 20)
                .attr('font-weight', 500)
              g.selectAll("line")
                .attr("opacity", .2)
                .attr("stroke", "grey")


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
            .style("stroke-width", 8)
            .style("opacity", 1)
            .style("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .merge(cityout)
            .transition().duration(speed)
            .attr("d", d => line(d.line))

          city.enter().insert("g", ".focus").append("path")
            .attr("class", "line cities")
            .style("stroke", (d, i) => partyColors(d.party))
            .style("stroke-width", 3)
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
              .attr("font-size", 25)
              .style("fill", "white")
              .style("stroke", "white")
              .style("stroke-width", 5)
              .style("opacity", 1)
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
                .style("font-size", 15)
                .style("font-weight", "100")
                .text(d => formatDate(dates[i]));

              focus.select(".lineHover")
                .attr("transform", d => "translate(" + x(dates[i]) + "," + height + ")")
                .style("opacity", 0)

              focus.selectAll(".lineHoverText")
                .style("font-weight", "100")
                .attr("x", (d, j) => x(dates[i]) + (j % 2 == 0 ? -10 : 10))
                .text((d, j) => d.id + " " + (input == "ev" ? nf(d.line[i].pct) : nf(d.line[i].pct) + "%"))
                .attr("fill", (d, i) => partyColors(d.party))
                .attr("y", (d, j) => y(d.line[i].pct))
                .attr("text-anchor", (d, j) => j % 2 == 0 ? "end" : "start")
                .attr("dominant-baseline", "central")

              focus.selectAll(".lineHoverText2")
                .style("font-weight", "100")
                .attr("x", (d, j) => x(dates[i]) + (j % 2 == 0 ? -10 : 10))
                .text((d, j) => d.id + " " + (input == "ev" ? nf(d.line[i].pct) : nf(d.line[i].pct) + "%"))
                .attr("fill", (d, i) => "white")
                .attr("y", (d, j) => y(d.line[i].pct))
                .attr("text-anchor", (d, j) => j % 2 == 0 ? "end" : "start")
                .attr("dominant-baseline", "central")

            }
          }
          var winbutton = d3.select("#winbu")
            .on("click", function () {
              update("win", 500)
            })
            .style("cursor", "pointer")

          var votebutton = d3.select("#votebu")
            .on("click", function () {
              update("vote", 500)
            })
            .style("cursor", "pointer")

          var evbutton = d3.select("#evbutton")
            .on("click", function () {
              update("ev", 500)
            })
            .style("cursor", "pointer")

        }

        var overview_data = newest_data.filter(d => d.state == "US")
        overview_data.sort((a, b) => b.ev - a.ev)
        overview.selectAll()
          .data(overview_data)
          .enter()
          .append("text")
          .text(d => d.candidate)
          .attr("y", (d, i) => 70 + i * 50)
          .attr("x", 50)
          .attr("fill", "black")
          .style("font-weight", "100")
          .style("font-size", 20)
          .attr("text-anchor", "start")
          .attr("dominant-baseline", "central")

        overview
          .append("text")
          .text("Candidate")
          .attr("y", 20)
          .attr("x", 50)
          .attr("fill", "black")
          .style("font-weight", "100")
          .style("font-size", 16)
          .attr("text-anchor", "start")
          .attr("dominant-baseline", "central")

        overview
          .append("text")
          .text("avg. electoral votes")
          .attr("y", 20)
          .attr("x", 250)
          .attr("fill", "black")
          .style("font-weight", "100")
          .style("font-size", 16)
          .attr("text-anchor", "start")
          .attr("dominant-baseline", "central")

        overview
          .append("text")
          .text("popular vote")
          .attr("y", 20)
          .attr("x", 600)
          .attr("fill", "black")
          .style("font-weight", "100")
          .style("font-size", 16)
          .attr("text-anchor", "start")
          .attr("dominant-baseline", "central")

        overview.selectAll()
          .data(overview_data)
          .enter().append("rect")
          .attr("x", 250)
          .attr("y", (d, i) => 47.5 + i * 50)
          .attr("width", d => (d.ev / 538) * 358)
          .attr("height", 45)
          .attr("fill", d => partyColors(d.party))
          .attr("opacity", .7)

        overview.selectAll()
          .data(overview_data)
          .enter().append("rect")
          .attr("x", 600)
          .attr("y", (d, i) => 47.5 + i * 50)
          .attr("width", d => (d.vote) * 5)
          .attr("height", 45)
          .attr("fill", d => partyColors(d.party))
          .attr("opacity", .7)


        overview.selectAll()
          .data(overview_data)
          .enter()
          .append("text")
          .text(d => numberformat(d.ev))
          .attr("y", (d, i) => 70 + i * 50)
          .attr("x", 255)
          .attr("fill", "black")
          .style("font-weight", "100")
          .style("font-size", 20)
          .attr("text-anchor", "start")
          .attr("dominant-baseline", "central")

        overview.selectAll()
          .data(overview_data)
          .enter()
          .append("text")
          .text(d => numberformat(d.vote) + "%")
          .attr("y", (d, i) => 70 + i * 50)
          .attr("x", 605)
          .attr("fill", "black")
          .style("font-weight", "100")
          .style("font-size", 20)
          .attr("text-anchor", "start")
          .attr("dominant-baseline", "central")




        var sdbars = []
        for (let k = 0; k < bubble_info.length; k++) {
          var dt = newest_data.filter(d => d.state == bubble_info[k].state)
          var finaldt = {
            state: bubble_info[k].state,
            evs: +dt[0].ev,
            gopWin: +dt[1].win,
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

        var bars = d3.select("#bars")
          .append("svg")
          .attr("viewBox", '0 50 1000 300')

        var tool_tip2 = d3.tip()
          .attr("class", "d3-tip")
          .offset([-180, -90])
          .html("<div id='tipDiv2'></div>");

        bars.call(tool_tip2);

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



        var xbars = d3.scaleLinear()
          .range([50, 850])
          .domain([0, max_evs])

        bars.append("line")
          .attr("x1", xbars(270))
          .attr("x2", xbars(270))
          .attr("y1", 80)
          .attr("y2", 120)
          .attr("stroke", "lightgray")


        bars.selectAll("bars")
          .data(gopbars)
          .enter()
          .append("a")
          .attr("xlink:href", d => d.state.toLowerCase().split(" ").join("-"))
          .append("rect")
          .attr("x", d => xbars(d.indexev))
          .attr("y", gop_ev_bars < dem_ev_bars ? 200 : 100)
          .attr("width", d => d.evs * (800 / max_evs))
          .attr("height", 70)
          .attr("ry", 3)
          .attr("fill", d => color(d.gopWin))
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
              .style("font-weight", "100")
              .style("font-size", "16")
              .attr("text-anchor", "middle")

            tipSVG.append("text")
              .text(d.evs + " Electoral Votes")
              .attr("y", 40)
              .attr("x", 87.5)
              .attr("fill", "#black")
              .style("font-weight", "500")
              .style("font-size", "14")
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
              .attr("fill", partyColors("REP"))
              .style("font-weight", "100")
              .style("font-size", "17")
              .attr("text-anchor", "middle")




          })
          .on('mouseout',
            function (d) {



              tool_tip2.hide()
            });


        bars.selectAll("bars")
          .data(dembars)
          .enter()
          .append("a")
          .attr("xlink:href", d => d.state.toLowerCase().split(" ").join("-"))
          .append("rect")
          .attr("x", d => xbars(d.indexev))
          .attr("y", gop_ev_bars > dem_ev_bars ? 200 : 100)
          .attr("width", d => d.evs * (800 / max_evs))
          .attr("height", 70)
          .attr("ry", 3)
          .attr("fill", d => color(d.gopWin))
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
              .style("font-weight", "100")
              .style("font-size", "16")
              .attr("text-anchor", "middle")

            tipSVG.append("text")
              .text(d.evs + " Electoral Votes")
              .attr("y", 40)
              .attr("x", 87.5)
              .attr("fill", "#black")
              .style("font-weight", "500")
              .style("font-size", "14")
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
              .attr("fill", partyColors("DEM"))
              .style("font-weight", "100")
              .style("font-size", "17")
              .attr("text-anchor", "middle")

          })
          .on('mouseout',
            function (d) {



              tool_tip2.hide()
            });




        bars.append("text")
          .text(dem_ev_bars)
          .attr("x", xbars(dem_ev_bars) + 85)
          .attr("y", gop_ev_bars > dem_ev_bars ? 237.5 : 137.5)
          .attr("fill", colors[1])
          .style("font-weight", "100")
          .style("font-size", "25")
          .attr("text-anchor", "start")
          .attr("dominant-baseline", "central")

        bars.append("text")
          .text(gop_ev_bars)
          .attr("x", xbars(gop_ev_bars) + 85)
          .attr("y", gop_ev_bars < dem_ev_bars ? 237.5 : 137.5)
          .attr("fill", colors[0])
          .style("font-weight", "100")
          .style("font-size", "25")
          .attr("text-anchor", "start")
          .attr("dominant-baseline", "central")

        bars.append("text")
          .text("270")
          .attr("x", xbars(270))
          .attr("y", 70)
          .attr("fill", "black")
          .style("font-weight", "100")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")

        bars.append("line")
          .attr("x1", xbars(270))
          .attr("x2", xbars(270))
          .attr("y1", 80)
          .attr("y2", 120)
          .attr("stroke", "black")

        bars.append("image")
          .attr("xlink:href", d => "https://jhkforecasts.com/Biden-01.png")
          .attr("x", xbars(dem_ev_bars) + 10)
          .attr("y", gop_ev_bars > dem_ev_bars ? 200 : 100)
          .attr("width", 75)
          .attr("height", 75)

        bars.append("image")
          .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
          .attr("x", xbars(gop_ev_bars) + 10)
          .attr("y", gop_ev_bars < dem_ev_bars ? 200 : 100)
          .attr("width", 75)
          .attr("height", 75)


        var sd3 = []
        for (let k = 0; k < bubble_info.length; k++) {
          var dt = newest_data.filter(d => d.state == bubble_info[k].state)
          var finaldt = {
            state: bubble_info[k].state,
            evs: +dt[0].ev,
            gopWin: +dt[1].win,
            demWin: +dt[0].win,
            gop_vote: +dt[1].vote,
            dem_vote: +dt[0].vote,
            x: bubble_info[k].x,
            y: bubble_info[k].y,
            r: bubble_info[k].radius,
            label: bubble_info[k].abbrev,
            tp: dt[0].tippingPoint
          }
          finaldt.margin = finaldt.gop_vote - finaldt.dem_vote
          sd3.push(finaldt)
        }


        var bubblemap = d3.select("#bubblemap")
          .append("svg")
          .attr("viewBox", '-50 0 800 450')




        bubblemap.selectAll("circ")
          .data(sd3)
          .enter()
          .append("circle")
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
          .attr("r", d => d.r)
          .attr("fill", d => color(d.gopWin))
          .attr("stroke", d => d.tp > 3 ? "black" : "none")
          .attr("stroke-width", 1)

        bubblemap.selectAll("labels")
          .data(sd3)
          .enter()
          .append("text")
          .text(d => d.label)
          .attr("x", d => d.x)
          .attr("y", d => d.y)
          .attr("fill", d => Math.abs(50 - d.gopWin) > 15 ? "white" : "black")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "central")
          .attr("font-size", 8)
          .style("font-weight", "500")
          .style("font-family", "sf-mono")


        bubblemap.selectAll("overfill")
          .data(sd3)
          .enter()
          .append("a")
          .attr("xlink:href", d => d.state.toLowerCase().split(" ").join("-"))
          .append("circle")
          .attr("class", "statesover")
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
          .attr("r", d => d.r)
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
              .style("font-weight", "100")
              .style("font-size", "16")
              .attr("text-anchor", "middle")

            tipSVG.append("text")
              .text(d.evs + " Electoral Votes")
              .attr("y", 40)
              .attr("x", 87.5)
              .attr("fill", "#black")
              .style("font-weight", "100")
              .style("font-size", "15")
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
              .attr("fill", d.margin > 0 ? partyColors("REP") : partyColors("DEM"))
              .style("font-weight", "100")
              .style("font-size", "17")
              .attr("text-anchor", "middle")




          })
          .on('mouseout',
            function (d) {



              tool_tip2.hide()
            });




        var pct = [60, 70, 80, 90, 100]

        bubblemap.selectAll("key")
          .data(pct)
          .enter()
          .append("circle")
          .attr("r", 20)
          .attr("cy", (d, i) => 300)
          .attr("cx", (d, i) => 610 + i * 20)
          .attr("fill", d => color(d))

        bubblemap
          .append("circle")
          .attr("stroke", "black")
          .attr("r", 10)
          .attr("cy", (d, i) => 255)
          .attr("cx", (d, i) => 610 + i * 20)
          .attr("fill", "none")

        bubblemap
          .append("text")
          .text("Tipping Point")
          .attr("y", 255)
          .attr("x", (d, i) => 625)
          .attr("fill", "black")
          .attr("text-anchor", "start")
          .attr("font-size", 10)
          .style("font-weight", "100")
          .style("dominant-baseline", "central")


        bubblemap.selectAll("key")
          .data(pct)
          .enter()
          .append("circle")
          .attr("r", 20)
          .attr("cy", (d, i) => 350)
          .attr("cx", (d, i) => 610 + i * 20)
          .attr("fill", d => color(100 - d))

        bubblemap.selectAll("key")
          .data(pct)
          .enter()
          .append("text")
          .text(d => d)
          .attr("y", 300)
          .attr("x", (d, i) => 592 + i * 20)
          .attr("fill", "black")
          .attr("text-anchor", "start")
          .attr("font-size", 10)
          .style("font-weight", "100")
          .style("dominant-baseline", "central")


        bubblemap
          .append("text")
          .text("Trump")
          .attr("y", 300)
          .attr("x", (d, i) => 585 + i * 20)
          .attr("fill", "black")
          .attr("text-anchor", "end")
          .attr("font-size", 10)
          .style("font-weight", "100")
          .style("dominant-baseline", "central")

        bubblemap
          .append("text")
          .text("Biden")
          .attr("y", 350)
          .attr("x", (d, i) => 585 + i * 20)
          .attr("fill", "black")
          .attr("text-anchor", "end")
          .attr("font-size", 10)
          .style("font-weight", "100")
          .style("dominant-baseline", "central")


        bubblemap.selectAll("key")
          .data(pct)
          .enter()
          .append("text")
          .text(d => d)
          .attr("y", 350)
          .attr("x", (d, i) => 590 + i * 20)
          .attr("fill", "black")
          .attr("text-anchor", "start")
          .attr("font-size", 10)
          .style("font-weight", "100")
          .style("dominant-baseline", "central")


        bubblemap.append("text")
          .text("Win State")
          .attr("y", 230)
          .attr("x", 650)
          .attr("fill", "black")
          .attr("text-anchor", "middle")
          .attr("font-size", 15)
          .style("font-weight", "100")





        var dist = d3.select("#dist").append("svg")

        show_more(975, "n/a", "high-to-low")

        function show_more(input_height, marginSort, tippingPointSort) {





          var fdt = []
          for (let k = 0; k < bubble_info.length; k++) {
            var dt = newest_data.filter(d => d.state == bubble_info[k].state)
            var finaldt = {
              state: bubble_info[k].state,
              evs: +dt[0].ev,
              std: (+dt[0].vote - +dt[0].p10) / 1.1,
              gop_vote: +dt[1].vote,
              dem_vote: +dt[0].vote,
              tippingPoint: +dt[0].tippingPoint
            }
            finaldt.margin = finaldt.gop_vote - finaldt.dem_vote
            fdt.push(finaldt)
          }


          tippingPointSort == "high-to-low" ? fdt.sort((a, b) => Math.abs(a.margin) - Math.abs(b.margin)) && fdt.sort((a, b) => b.tippingPoint - a.tippingPoint) :
            tippingPointSort == "low-to-high" ? fdt.sort((a, b) => Math.abs(b.margin) - Math.abs(a.margin)) && fdt.sort((a, b) => a.tippingPoint - b.tippingPoint) :
              marginSort == "d-to-r" ? fdt.sort((a, b) => a.margin - b.margin) :
                marginSort == "r-to-d" ? fdt.sort((a, b) => b.margin - a.margin) :
                  fdt.sort((a, b) => Math.abs(a.margin) - Math.abs(b.margin))

          dist.attr("viewBox", "00 40 1000 " + input_height)
          dist.append("rect")
            .attr("x", 0)
            .attr("y", 40)
            .attr("width", 1000)
            .attr("height", input_height)
            .attr("fill", "white")

          console.log(jStat.normal.pdf(0, 0, 1))
          console.log(jStat.studentt.pdf(jStat.studentt.inv(.5, 8), 8))
          var sd4 = []

          for (let k = 0; k < bubble_info.length; k++) {
            var gopcurve = []
            var demcurve = []

            for (let l = 1; l < 100; l++) {

              var min_stdev = fdt[k].std * .7
              var highest_curve = jStat.studentt.pdf(jStat.studentt.inv(.5, 8), 8)+.05

              var tq = jStat.normal.inv(.01, 0, min_stdev)
              var tp = jStat.normal.pdf(tq, 0, min_stdev)


              var gq = (jStat.studentt.inv(l / 100, 8) * fdt[k].std * .7) + fdt[k].gop_vote
              var gp = jStat.studentt.pdf(jStat.studentt.inv(l / 100, 8), 8)

              var dq = (jStat.studentt.inv(l / 100, 8) * fdt[k].std * .7) + fdt[k].dem_vote
              var dp = jStat.studentt.pdf(jStat.studentt.inv(l / 100, 8), 8)

              var y3 = d3.scaleLinear()
                .domain([0, highest_curve])
                .range([0, 45])
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
              tippingPoint: fdt[k].tippingPoint
            }

            sd4.push(dt)
          }





          var x3 = d3.scaleLinear()
            .domain([0, 100])
            .range([250, 775])

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
            .style("opacity", .3)
            .style("fill", "#AFAFAF")
            .attr("d", d => area(d.gopvalues))

          curves.enter().insert("g", ".focus").append("path")
            .style("opacity", .3)
            .style("fill", "#AFAFAF")
            .attr("d", d => area(d.demvalues))

          curves.enter().insert("g", ".focus").append("path")
            .style("opacity", .4)
            .style("fill", "#FF6060")
            .attr("d", d => area(d.gopvalues.filter((d, i) => i < 90 && i > 10)))

          curves.enter().insert("g", ".focus").append("path")
            .style("opacity", .4)
            .style("fill", colors[1])
            .attr("d", d => area(d.demvalues.filter((d, i) => i < 90 && i > 10)))



          var pct = [0, 25, 50, 75, 100]


          dist.selectAll()
            .data(pct)
            .enter()
            .append("text")
            .text(d => d + "%")
            .attr("x", d => x3(d))
            .attr("y", 90)
            .attr("text-anchor", "middle")
            .style("font-weight", "100")
            .attr("font-size", 10)
            .style("font-family", "sf-mono")
            .style("font-weight", "100")

          dist.selectAll()
            .data(sd4)
            .enter()
            .append("a")
            .attr("xlink:href", d => d.state.toLowerCase().split(" ").join("-"))
            .append("text")
            .text(d => d.state.toUpperCase())
            .attr("x", 20)
            .attr("y", (d, i) => i * 50 + 150)
            .style("font-weight", "100")
            .style("font-family", "sf-mono")
            .style("font-weight", "100")
            .on("mouseover", function (d) {
              d3.select(this)
                .attr("text-decoration", "underline")
                .style("cursor", "pointer")
            })
            .on("mouseout", function (d) {
              d3.select(this)
                .attr("text-decoration", "none")
            })

          dist.selectAll()
            .data(sd4)
            .enter()
            .append("text")
            .text(d => numberformat(d.tippingPoint) + "%")
            .attr("x", 980)
            .attr("y", (d, i) => i * 50 + 150)
            .style("font-weight", "100")
            .attr("text-anchor", "end")
            .style("font-family", "sf-mono")

          dist.selectAll()
            .data(sd4)
            .enter()
            .append("text")
            .text(d => d.margin >= 0 ? "R+" + numberformat(Math.abs(d.margin)) : "D+" + numberformat(Math.abs(d.margin)))
            .attr("x", 850)
            .attr("y", (d, i) => i * 50 + 150)
            .style("font-weight", "100")
            .attr("text-anchor", "middle")
            .attr("fill", d => d.margin >= 0 ? "#FF6060" : "#0091FF")
            .style("font-family", "sf-mono")



          dist.selectAll()
            .data(sd4)
            .enter()
            .append("line")
            .attr("x1", 20)
            .attr("x2", 980)
            .attr("y1", (d, i) => i * 50 + 160)
            .attr("y2", (d, i) => i * 50 + 160)
            .attr("stroke", "black")

          dist.append("text")
            .text("Tipping Point")
            .attr("x", 980)
            .attr("y", 90)
            .attr("text-anchor", "end")
            .style("font-family", "sf-mono")
            .style("font-weight", "100")
            .style("font-size", "12")
            .on("mouseover", function (d) {
              d3.select(this)
                .attr("text-decoration", "underline")
                .style("cursor", "pointer")
            })
            .on("mouseout", function (d) {
              d3.select(this)
                .attr("text-decoration", "none")
            })
            .on("click", d => {
              tippingPointSort == "high-to-low" ?
                show_more(input_height, "n/a", "low-to-high") :
                show_more(input_height, "n/a", "high-to-low")
            })



          dist.append("text")
            .text("PROJECTED VOTE")
            .attr("x", x3(50))
            .attr("y", 60)
            .style("font-weight", "100")
            .attr("text-anchor", "middle")
            .style("font-family", "sf-mono")
            .style("font-weight", "100")

          var more = d3.select("#more")
            .on("click", function (d, i) {

              document.getElementById("less").style.display = "block"
              document.getElementById("more").style.display = "none"
              show_more(2900, marginSort, tippingPointSort)

            })
            .style("cursor", "pointer")


          var less = d3.select("#less")
            .on("click", function (d, i) {

              document.getElementById("more").style.display = "block"
              document.getElementById("less").style.display = "none"
              show_more(975, marginSort, tippingPointSort)
            })
            .style("cursor", "pointer")

        }




      })
    })

d3.csv("https://data.jhkforecasts.com/2020-house-histogram.csv", function (house) {
    d3.csv("https://data.jhkforecasts.com/2020-senate.csv", function (senate) {
        d3.csv("https://data.jhkforecasts.com/2020-presidential.csv", function (data) {
           

            var newest_data = data.slice(data.length - 228, data.length)
            document.getElementById("presLink").style.backgroundColor = color(newest_data[225].win)
            document.getElementById("demLink").style.backgroundColor = "navy"
            document.getElementById("houseLink").style.backgroundColor = color(d3.sum(house.filter(d => d.seats > 218), d => d.occ))
            document.getElementById("senateLink").style.backgroundColor = color(senate[senate.length - 2].win)

            document.getElementById("presLink").style.color = Math.abs(newest_data[225].win - 50) > 20 ? "white" : "black"
            document.getElementById("demLink").style.color = "white"
            document.getElementById("houseLink").style.color = Math.abs(d3.sum(house.filter(d => d.seats > 218), d => d.occ) - 50) > 20 ? "white" : "black"
            document.getElementById("senateLink").style.color = Math.abs(senate[senate.length - 2].win - 50) > 20 ? "white" : "black"
        })
    })
})