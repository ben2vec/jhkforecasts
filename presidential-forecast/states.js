var colors = ["#FF0660", "#0091FF", "#FFE130"]
var wf = d3.format(".0f")

var category = ["gop", "dem", "third"]

var cand_colors = d3.scaleOrdinal()
  .domain(category)
  .range(["#FF6060", "#0091FF", "#FFE130"])

var dateparse = d3.timeParse("%m/%d/%y")

var tformat = d3.timeFormat("%m/%d/%Y")
var tf = d3.timeFormat("%m/%d")
var dateparse = d3.timeParse("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
var nf = d3.format(".1f")
var updated_format = d3.timeFormat("%b. %d %Y %I:%M %p")
var widthmap = 1020
var heightmap = 500;
var bubble_info = [{ "state": "Alabama", "abbrev": "AL", "radius": 16.43, "x": 413, "y": 332 }, { "state": "Alaska", "abbrev": "AK", "radius": 9.49, "x": 41, "y": 19 }, { "state": "Arizona", "abbrev": "AZ", "radius": 18.17, "x": 172, "y": 282 }, { "state": "Arkansas", "abbrev": "AR", "radius": 13.42, "x": 325, "y": 290 }, { "state": "California", "abbrev": "CA", "radius": 40.62, "x": 103, "y": 237 }, { "state": "Colorado", "abbrev": "CO", "radius": 16.43, "x": 224, "y": 249 }, { "state": "Connecticut", "abbrev": "CT", "radius": 14.49, "x": 586, "y": 128 }, { "state": "Delaware", "abbrev": "DE", "radius": 9.49, "x": 557, "y": 183 }, { "state": "Florida", "abbrev": "FL", "radius": 29.5, "x": 483, "y": 380 }, { "state": "Georgia", "abbrev": "GA", "radius": 21.91, "x": 443, "y": 298 }, { "state": "Hawaii", "abbrev": "HI", "radius": 10.95, "x": 88, "y": 372 }, { "state": "Idaho", "abbrev": "ID", "radius": 10.95, "x": 188, "y": 173 }, { "state": "Illinois", "abbrev": "IL", "radius": 24.49, "x": 359, "y": 207 }, { "state": "Indiana", "abbrev": "IN", "radius": 18.17, "x": 413, "y": 207 }, { "state": "Iowa", "abbrev": "IA", "radius": 13.42, "x": 306, "y": 195 }, { "state": "Kansas", "abbrev": "KS", "radius": 13.42, "x": 266, "y": 248 }, { "state": "Kentucky", "abbrev": "KY", "radius": 15.49, "x": 411, "y": 251 }, { "state": "Louisiana", "abbrev": "LA", "radius": 15.49, "x": 326, "y": 335 }, { "state": "Maine", "abbrev": "ME", "radius": 7.75, "x": 628, "y": 26 }, { "state": "Maryland", "abbrev": "MD", "radius": 17.32, "x": 505, "y": 185 }, { "state": "Massachusetts", "abbrev": "MA", "radius": 18.17, "x": 607, "y": 89 }, { "state": "Michigan", "abbrev": "MI", "radius": 21.91, "x": 418, "y": 149 }, { "state": "Minnesota", "abbrev": "MN", "radius": 17.32, "x": 304, "y": 142 }, { "state": "Mississippi", "abbrev": "MS", "radius": 13.42, "x": 373, "y": 324 }, { "state": "Missouri", "abbrev": "MO", "radius": 17.32, "x": 329, "y": 251 }, { "state": "Montana", "abbrev": "MT", "radius": 9.49, "x": 206, "y": 131 }, { "state": "Nebraska", "abbrev": "NE", "radius": 7.75, "x": 258, "y": 209 }, { "state": "Nevada", "abbrev": "NV", "radius": 13.42, "x": 167, "y": 220 }, { "state": "New Hampshire", "abbrev": "NH", "radius": 10.95, "x": 612, "y": 54 }, { "state": "New Jersey", "abbrev": "NJ", "radius": 20.49, "x": 551, "y": 147 }, { "state": "New Mexico", "abbrev": "NM", "radius": 12.25, "x": 215, "y": 303 }, { "state": "New York", "abbrev": "NY", "radius": 29.5, "x": 548, "y": 81 }, { "state": "North Carolina", "abbrev": "NC", "radius": 21.21, "x": 499, "y": 278 }, { "state": "North Dakota", "abbrev": "ND", "radius": 9.49, "x": 257, "y": 136 }, { "state": "Ohio", "abbrev": "OH", "radius": 23.24, "x": 459, "y": 191 }, { "state": "Oklahoma", "abbrev": "OK", "radius": 14.49, "x": 270, "y": 294 }, { "state": "Oregon", "abbrev": "OR", "radius": 14.49, "x": 124, "y": 176 }, { "state": "Pennsylvania", "abbrev": "PA", "radius": 24.49, "x": 498, "y": 132 }, { "state": "Rhode Island", "abbrev": "RI", "radius": 10.95, "x": 619, "y": 126 }, { "state": "South Carolina", "abbrev": "SC", "radius": 16.43, "x": 487, "y": 322 }, { "state": "South Dakota", "abbrev": "SD", "radius": 9.49, "x": 257, "y": 167 }, { "state": "Tennessee", "abbrev": "TN", "radius": 18.17, "x": 379, "y": 284 }, { "state": "Texas", "abbrev": "TX", "radius": 33.76, "x": 271, "y": 355 }, { "state": "Utah", "abbrev": "UT", "radius": 13.42, "x": 204, "y": 218 }, { "state": "Vermont", "abbrev": "VT", "radius": 9.49, "x": 585, "y": 47 }, { "state": "Virginia", "abbrev": "VA", "radius": 19.75, "x": 508, "y": 229 }, { "state": "Washington", "abbrev": "WA", "radius": 18.97, "x": 154, "y": 131 }, { "state": "West Virginia", "abbrev": "WV", "radius": 12.25, "x": 451, "y": 242 }, { "state": "Wisconsin", "abbrev": "WI", "radius": 17.32, "x": 359, "y": 146 }, { "state": "Wyoming", "abbrev": "WY", "radius": 9.49, "x": 214, "y": 177 }, { "state": "District of Columbia", "abbrev": "DC", "radius": 9.49, "x": 536, "y": 193 }, { "state": "Maine-1", "abbrev": 1, "radius": 5.48, "x": 612, "y": 26 }, { "state": "Maine-2", "abbrev": 2, "radius": 5.48, "x": 644, "y": 26 }, { "state": "Nebraska-1", "abbrev": 1, "radius": 5.48, "x": 242, "y": 209 }, { "state": "Nebraska-2", "abbrev": 2, "radius": 5.48, "x": 258, "y": 193 }, { "state": "Nebraska-3", "abbrev": 3, "radius": 5.48, "x": 274, "y": 209 }]
var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia", "Maine-1", "Maine-2", "Nebraska-1", "Nebraska-2", "Nebraska-3", "US"]
var map_states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"]
var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934 }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400 }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801 }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387 }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 253.9219 }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 245.5645 }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000 }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000 }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154 }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354 }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465 }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155 }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 231.2954 }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 228.4214 }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 202.6782 }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 259.1592 }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 264.9658 }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135 }, { "state": "Maine", "label": "ME", "xValue": 807.3105, "yValue": 109.855 }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000 }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000 }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647 }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874 }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514 }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 261.123 }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705 }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527 }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957 }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000 }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210 }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035 }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 163.2588 }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 284.5029 }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 117.3823 }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 219.4883 }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418 }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654 }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 200.856 }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000 }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 315.6387 }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 163.5166 }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 294.8193 }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 374.2861 }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 234.978 }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000 }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 252.7842 }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762 }, { "state": "West Virginia", "label": "WV", "xValue": 701, "yValue": 243 }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588 }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 179.6255 }, { "state": "District of Columbia", "label": "DC", "xValue": -1000, "yValue": -1000 }]
var bars_info = [{ "state": "Alabama", "abbrev": "AL", "radius": 16.43, "x": 413, "y": 332 }, { "state": "Alaska", "abbrev": "AK", "radius": 9.49, "x": 41, "y": 19 }, { "state": "Arizona", "abbrev": "AZ", "radius": 18.17, "x": 172, "y": 282 }, { "state": "Arkansas", "abbrev": "AR", "radius": 13.42, "x": 325, "y": 290 }, { "state": "California", "abbrev": "CA", "radius": 40.62, "x": 103, "y": 237 }, { "state": "Colorado", "abbrev": "CO", "radius": 16.43, "x": 224, "y": 249 }, { "state": "Connecticut", "abbrev": "CT", "radius": 14.49, "x": 586, "y": 128 }, { "state": "Delaware", "abbrev": "DE", "radius": 9.49, "x": 557, "y": 183 }, { "state": "Florida", "abbrev": "FL", "radius": 29.5, "x": 483, "y": 380 }, { "state": "Georgia", "abbrev": "GA", "radius": 21.91, "x": 443, "y": 298 }, { "state": "Hawaii", "abbrev": "HI", "radius": 10.95, "x": 88, "y": 372 }, { "state": "Idaho", "abbrev": "ID", "radius": 10.95, "x": 188, "y": 173 }, { "state": "Illinois", "abbrev": "IL", "radius": 24.49, "x": 359, "y": 207 }, { "state": "Indiana", "abbrev": "IN", "radius": 18.17, "x": 413, "y": 207 }, { "state": "Iowa", "abbrev": "IA", "radius": 13.42, "x": 306, "y": 195 }, { "state": "Kansas", "abbrev": "KS", "radius": 13.42, "x": 266, "y": 248 }, { "state": "Kentucky", "abbrev": "KY", "radius": 15.49, "x": 411, "y": 251 }, { "state": "Louisiana", "abbrev": "LA", "radius": 15.49, "x": 326, "y": 335 }, { "state": "Maine", "abbrev": "ME", "radius": 7.75, "x": 628, "y": 26 }, { "state": "Maryland", "abbrev": "MD", "radius": 17.32, "x": 505, "y": 185 }, { "state": "Massachusetts", "abbrev": "MA", "radius": 18.17, "x": 607, "y": 89 }, { "state": "Michigan", "abbrev": "MI", "radius": 21.91, "x": 418, "y": 149 }, { "state": "Minnesota", "abbrev": "MN", "radius": 17.32, "x": 304, "y": 142 }, { "state": "Mississippi", "abbrev": "MS", "radius": 13.42, "x": 373, "y": 324 }, { "state": "Missouri", "abbrev": "MO", "radius": 17.32, "x": 329, "y": 251 }, { "state": "Montana", "abbrev": "MT", "radius": 9.49, "x": 206, "y": 131 }, { "state": "Nebraska", "abbrev": "NE", "radius": 7.75, "x": 258, "y": 209 }, { "state": "Nevada", "abbrev": "NV", "radius": 13.42, "x": 167, "y": 220 }, { "state": "New Hampshire", "abbrev": "NH", "radius": 10.95, "x": 612, "y": 54 }, { "state": "New Jersey", "abbrev": "NJ", "radius": 20.49, "x": 551, "y": 147 }, { "state": "New Mexico", "abbrev": "NM", "radius": 12.25, "x": 215, "y": 303 }, { "state": "New York", "abbrev": "NY", "radius": 29.5, "x": 548, "y": 81 }, { "state": "North Carolina", "abbrev": "NC", "radius": 21.21, "x": 499, "y": 278 }, { "state": "North Dakota", "abbrev": "ND", "radius": 9.49, "x": 257, "y": 136 }, { "state": "Ohio", "abbrev": "OH", "radius": 23.24, "x": 459, "y": 191 }, { "state": "Oklahoma", "abbrev": "OK", "radius": 14.49, "x": 270, "y": 294 }, { "state": "Oregon", "abbrev": "OR", "radius": 14.49, "x": 124, "y": 176 }, { "state": "Pennsylvania", "abbrev": "PA", "radius": 24.49, "x": 498, "y": 132 }, { "state": "Rhode Island", "abbrev": "RI", "radius": 10.95, "x": 619, "y": 126 }, { "state": "South Carolina", "abbrev": "SC", "radius": 16.43, "x": 487, "y": 322 }, { "state": "South Dakota", "abbrev": "SD", "radius": 9.49, "x": 257, "y": 167 }, { "state": "Tennessee", "abbrev": "TN", "radius": 18.17, "x": 379, "y": 284 }, { "state": "Texas", "abbrev": "TX", "radius": 33.76, "x": 271, "y": 355 }, { "state": "Utah", "abbrev": "UT", "radius": 13.42, "x": 204, "y": 218 }, { "state": "Vermont", "abbrev": "VT", "radius": 9.49, "x": 585, "y": 47 }, { "state": "Virginia", "abbrev": "VA", "radius": 19.75, "x": 508, "y": 229 }, { "state": "Washington", "abbrev": "WA", "radius": 18.97, "x": 154, "y": 131 }, { "state": "West Virginia", "abbrev": "WV", "radius": 12.25, "x": 451, "y": 242 }, { "state": "Wisconsin", "abbrev": "WI", "radius": 17.32, "x": 359, "y": 146 }, { "state": "Wyoming", "abbrev": "WY", "radius": 9.49, "x": 214, "y": 177 }, { "state": "District of Columbia", "abbrev": "DC", "radius": 9.49, "x": 536, "y": 193 }, { "state": "Maine-1", "abbrev": "NE-2", "radius": 5.48, "x": 612, "y": 26 }, { "state": "Maine-2", "abbrev": "ME-2", "radius": 5.48, "x": 644, "y": 26 }, { "state": "Nebraska-1", "abbrev": "NE-1", "radius": 5.48, "x": 242, "y": 209 }, { "state": "Nebraska-2", "abbrev": "NE-2", "radius": 5.48, "x": 258, "y": 193 }, { "state": "Nebraska-3", "abbrev": "NE-3", "radius": 5.48, "x": 274, "y": 209 }]

var event_odds = [
  { event: "flipping a coin", odds: 50 },
  { event: "getting a one pair", odds: 43.8 },
  { event: "NBA player makes a three", odds: 36 },
  { event: "MLB batter getting on base", odds: 30.8 },
  { event: "getting a two pair", odds: 23.5 },
  { event: "rolling a six on a die", odds: 16.666 },
  { event: "picking a random digit", odds: 10 },
  { event: "picking an ace", odds: 7.69 },
  { event: "getting a blackjack", odds: 4.8 },
  { event: "getting a full house", odds: 2.8 },
  { event: "getting a four of a kind", odds: 0.168 },
  { event: "getting a royal flush", odds: 0 },
]

var events = event_odds.map((d, i) => {
  return d.event
})

var odds = event_odds.map((d, i) => {
  return d.odds
})

var color = d3.scaleLinear()
  .domain([0, 50, 100])
  .range(["#0091FF", "white", "#FF6060"]);




d3.csv("https://data.jhkforecasts.com/2020-presidential.csv", data => {

  data.forEach((d, i) => {
    d.forecast_date = dateparse(d.forecast_date)
    return d
  })

  var state_data = data.filter(d => d.state == key_state)


  var today = state_data.slice(state_data.length - 3, state_data.length)

  var gop_proj_vote = today[0].proj_vote
  var dem_proj_vote = today[1].proj_vote
  var third_proj_vote = today[2].proj_vote
  var gop_win = today[0].win
  var dem_win = today[1].win


  var odds_scale = d3.scaleLinear()
    .domain(odds)
    .range([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])

  var upset_odds = dem_win > gop_win ? gop_win : dem_win

  document.getElementById("state").innerHTML = key_state
  document.getElementById("state").style.backgroundColor = gop_win > dem_win ? colors[0] : colors[1]


  var topline = d3.select("#topline")
    .append("svg")
    .attr("viewBox", "0 60 1000 160")

  topline
    .append("line")
    .attr("x1", 0)
    .attr("x2", 1000)
    .attr("y1", 50)
    .attr("y2", 50)
    .attr("stroke", "black")

  topline.append("text")
    .text("Chance of an upset is about the odds of...")
    .attr("y", 80)
    .attr("x", 500)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("font-size", 15)
    .style("font-weight", "100")


  topline.append("text")
    .text(events[Math.round(odds_scale(upset_odds))])
    .attr("y", 110)
    .attr("x", 500)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("font-size", 20)
    .style("font-weight", "100")


  topline.append("image")
    .attr("href", events[Math.round(odds_scale(upset_odds))] + ".svg")
    .attr("x", 450)
    .attr("y", 120)
    .attr("height", 100)
    .attr("width", 100)


  topline.append("text")
    .text("Win " + key_state + "'s " + today[0].electoral_vote + (today[0].electoral_vote > 1 ? " Electoral Votes" : " Electoral Vote"))
    .attr("y", 30)
    .attr("x", 500)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("font-size", 35)
    .style("font-weight", "100")


  topline.append("text")
    .text(nf(gop_win) + "%")
    .attr("y", 140)
    .attr("x", 870)
    .attr("fill", colors[0])
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "bottom")
    .attr("font-size", 30)
    .style("font-weight", "100")

  topline.append("text")
    .text("Donald Trump")
    .attr("y", 100)
    .attr("x", 870)
    .attr("fill", "black")
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "top")
    .attr("font-size", 20)
    .style("font-weight", "100")

  topline.append("text")
    .text("Joseph Biden")
    .attr("y", 100)
    .attr("x", 130)
    .attr("fill", "black")
    .attr("text-anchor", "start")
    .attr("dominant-baseline", "top")
    .attr("font-size", 20)
    .style("font-weight", "100")



  topline.append("text")
    .text(nf(dem_win) + "%")
    .attr("y", 140)
    .attr("x", 130)
    .attr("fill", colors[1])
    .attr("text-anchor", "start")
    .attr("dominant-baseline", "bottom")
    .attr("font-size", 30)
    .style("font-weight", "100")



  topline.append("image")
    .attr("href", "https://jhkforecasts.com/Trump-01.png")
    .attr("x", 880)
    .attr("y", 60)
    .attr("height", 100)
    .attr("width", 100)

  topline.append("image")
    .attr("href", "https://jhkforecasts.com/Biden-01.png")
    .attr("x", 20)
    .attr("y", 60)
    .attr("height", 100)
    .attr("width", 100)







  var vote = d3.select("#vote")
    .append("svg")
    .attr("viewBox", "0 0 1000 300")

  var x3 = d3.scaleLinear()
    .domain([0, 100])
    .range([100, 980])

  var pct = [0, 25, 50, 75, 100]




  vote.selectAll("lines")
    .data(pct)
    .enter()
    .append("line")
    .attr("x1", d => x3(d))
    .attr("x2", d => x3(d))
    .attr("y1", 30)
    .attr("y2", 270)
    .attr("stroke", "#AFAFAF")

  vote.selectAll("lines")
    .data(pct)
    .enter()
    .append("text")
    .text(d => d + "%")
    .attr("x", d => x3(d))
    .attr("y", 20)
    .attr("fill", "#AFAFAF")
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .style("font-weight", "100")



  vote.append("text")
    .text(d => "?")
    .attr("x", 57.5)
    .attr("y", 237.5)
    .attr("fill", colors[2])
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", 60)
    .style("font-weight", "100")

  var vote_dist = today
  vote_dist.sort((a, b) => b.proj_vote - a.proj_vote)
  vote_dist.forEach((d, i) => {
    var stdev = (+d.proj_vote - +d.p_10) / 1.3
    d.p_10 = +d.proj_vote - stdev
    d.p_90 = +d.proj_vote + stdev
  })
  console.log(vote_dist)
  vote.append("image")
    .attr("href", "https://jhkforecasts.com/Trump-01.png")
    .attr("x", 20)
    .attr("y", gop_proj_vote >= dem_proj_vote ? 35 : 115)
    .attr("height", 70)
    .attr("width", 70)

  vote.append("image")
    .attr("href", "https://jhkforecasts.com/Biden-01.png")
    .attr("x", 20)
    .attr("y", gop_proj_vote <= dem_proj_vote ? 35 : 115)
    .attr("height", 70)
    .attr("width", 70)

  vote.selectAll("rects")
    .data(vote_dist)
    .enter()
    .append("rect")
    .attr("fill", (d, i) => cand_colors(d.party))
    .attr("x", d => x3(d.p_10))
    .attr("y", (d, i) => 30 + 80 * i)
    .attr("height", 80)
    .attr("width", d => x3(d.p_90) - x3(d.p_10))
    .attr("opacity", .5)
    .attr("ry", 10)

  vote.selectAll("rects")
    .data(vote_dist)
    .enter()
    .append("text")
    .attr("fill", (d, i) => "black")
    .attr("x", d => x3(d.proj_vote) + 5)
    .attr("y", (d, i) => 70 + 80 * i)
    .text(d => nf(d.proj_vote))
    .attr("dominant-baseline", "central")
    .attr("font-weight", 500)




  vote.selectAll("rects")
    .data(vote_dist)
    .enter()
    .append("line")
    .attr("stroke", (d, i) => cand_colors(d.party))
    .attr("stroke-width", 2)
    .attr("x1", d => x3(d.proj_vote))
    .attr("x2", d => x3(d.proj_vote))
    .attr("y1", (d, i) => 30 + 80 * i)
    .attr("y2", (d, i) => 110 + 80 * i)

  vote.selectAll("rects")
    .data(vote_dist)
    .enter()
    .append("line")
    .attr("stroke", "black")
    .attr("x1", d => x3(0))
    .attr("x2", d => x3(100))
    .attr("y1", (d, i) => 30 + 80 * i)
    .attr("y2", (d, i) => 30 + 80 * i)

  vote.append("line")
    .attr("stroke", "black")
    .attr("x1", d => x3(0))
    .attr("x2", d => x3(100))
    .attr("y1", (d, i) => 30 + 80 * 3)
    .attr("y2", (d, i) => 30 + 80 * 3)



  var marginphone = { top: 20, right: 40, bottom: 30, left: 40 }
  var widthphone = 1000 - marginphone.left - marginphone.right
  var heightphone = 800 - marginphone.top - marginphone.bottom
  var axisPad = 12

  var time_data = data.filter(d => d.state == key_state)


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

  var margin = { top: 20, right: 40, bottom: 20, left: 20 }
  var width = 1100 - margin.left - margin.right
  var height = 450 - margin.top - margin.bottom
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

  var time = d3.select("#time").append("svg")
    .attr("viewBox", "0 0 1100 450")
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
    .curve(d3.curveLinear)
    .x(d => x(d.date))
    .y(d => y(d.pct));

  time.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (height - margin.bottom) + ")")
    .call(d3.axisBottom(x).tickSize(-370).ticks(5)
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
    .style("font-weight", "100")



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
    .attr("text-anchor", "end")
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
      input == "ev" ? 538 : input == "vote" ? 100 : 100
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
      .data(cities);

    city.exit().remove();

    city.enter().insert("g", ".focus").append("path")
      .attr("class", "line cities")
      .style("stroke", (d, i) => colors[i])
      .style("stroke-width", 4)
      .style("opacity", .7)
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
        .style("stroke-width", 5)
        .merge(labels2)

      var labels = focus.selectAll(".lineHoverText")
        .data(copy)

      labels.enter().append("text")
        .attr("class", "lineHoverText")
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



        focus.selectAll(".hoverCircle")
          .attr("cy", e => y(d[e]))
          .attr("cx", x(d.date));

        focus.selectAll(".lineHoverText2")
          .style("font-weight", "100")
          .attr("x", x(d.date) + 10)
          .text((e, i) => i == 1 ? ("Biden " + onevalue(d[e]) + "%") : i == 0 ? "Trump " + onevalue(d[e]) + "%" : "Third " + onevalue(d[e]) + "%")
          .attr("y", e => d[e] == d["gop" + input] ? y(d["gop" + input]) >= y(d["dem" + input]) ? y(d["gop" + input]) + 15 : y(d["gop" + input]) - 15 : d[e] == d["dem" + input] ? y(d["dem" + input]) > y(d["gop" + input]) ? y(d["dem" + input]) + 15 : y(d["dem" + input]) - 15 : y(d[e]) - 15)
          .attr("text-anchor", (e, i) => i == 2 ? "end" : "start")
          .attr("dominant-baseline", "central")

        focus.selectAll(".lineHoverText")
          .style("font-weight", "100")
          .attr("x", x(d.date) + 10)
          .text((e, i) => input == "ev" ? i == 1 ? ("Biden " + onevalue(d[e])) : i == 0 ? "Trump " + onevalue(d[e]) : "Third " + onevalue(d[e]) : i == 1 ? ("Biden " + onevalue(d[e]) + "%") : i == 0 ? "Trump " + onevalue(d[e]) + "%" : "Third " + onevalue(d[e]) + "%")
          .attr("fill", (e, i) => colors[i])
          .attr("y", e => d[e] == d["gop" + input] ? y(d["gop" + input]) >= y(d["dem" + input]) ? y(d["gop" + input]) + 15 : y(d["gop" + input]) - 15 : d[e] == d["dem" + input] ? y(d["dem" + input]) > y(d["gop" + input]) ? y(d["dem" + input]) + 15 : y(d["dem" + input]) - 15 : y(d[e]) - 15)
          .attr("text-anchor", (e, i) => i == 2 ? "end" : "start")
          .attr("dominant-baseline", "central")

        focus.select(".lineHoverDate")
          .attr("x", x(d.date))
          .attr("y", 0)
          .style("font-size", 15)
          .style("font-weight", "100")
          .text(formatDate(d.date));
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
    document.getElementById("winbutton").innerHTML = "Win " + key_state

  }

  var keys2 = ["Fundamentals", "Polling Average", "State Similarity", "Experts Ratings"]
  var calc = d3.select("#calculation")
    .append("svg")
    .attr("viewBox", '0 0 1000 500')

  var gopscale = d3.scaleLinear()
    .domain([20, 80])
    .range(["white", "#FF6060"]);

  var demscale = d3.scaleLinear()
    .domain([20, 80])
    .range(["white", "#0091FF"]);

  var thirdscale = d3.scaleLinear()
    .domain([0, 20])
    .range(["white", colors[2]]);

  var weightscale = d3.scaleLinear()
    .domain([0, 100])
    .range(["white", "green"]);

  var weights = [state_data[state_data.length - 3].fund_weight, state_data[state_data.length - 3].poll_weight, state_data[state_data.length - 3].ss_weight, state_data[state_data.length - 3].experts_weight]
  var gop_data = [state_data[state_data.length - 3].fund_avg, state_data[state_data.length - 3].poll_avg, state_data[state_data.length - 3].ss_avg, state_data[state_data.length - 3].experts_avg, state_data[state_data.length - 3].proj_vote]
  var dem_data = [state_data[state_data.length - 2].fund_avg, state_data[state_data.length - 2].poll_avg, state_data[state_data.length - 2].ss_avg, state_data[state_data.length - 2].experts_avg, state_data[state_data.length - 2].proj_vote]
  var third_data = [state_data[state_data.length - 1].fund_avg, state_data[state_data.length - 1].poll_avg, state_data[state_data.length - 1].ss_avg, state_data[state_data.length - 1].experts_avg, state_data[state_data.length - 1].proj_vote]
  var margin_data = [gop_data[0] - dem_data[0], gop_data[1] - dem_data[1], gop_data[2] - dem_data[2], gop_data[3] - dem_data[3]]

  var weight_sum = d3.sum(weights)
  console.log()

  calc.selectAll("gop")
    .data(keys2)
    .enter()
    .append("text")
    .text(d => d)
    .attr("x", 50)
    .attr("y", (d, i) => 140 + i * 60)
    .attr("fill", "black")
    .attr("text-anchor", "start")
    .attr("dominant-baseline", "central")
    .attr("font-size", 25)
    .style("font-weight", "100")



  calc.selectAll("gop")
    .data(weights)
    .enter()
    .append("circle")
    .attr("cx", 500)
    .attr("cy", (d, i) => 140 + i * 60)
    .attr("r", 20)
    .attr("fill", d => weightscale(d * 100 / weight_sum))

  calc.selectAll("gop")
    .data(weights)
    .enter()
    .append("text")
    .text(d => wf(d / d3.sum(weights) * 100))
    .attr("x", 500)
    .attr("y", (d, i) => 140 + i * 60)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", 20)
    .style("font-weight", "100")


  calc.selectAll("gop")
    .data(gop_data)
    .enter()
    .append("rect")
    .attr("x", 610)
    .attr("y", (d, i) => 110 + i * 60)
    .attr("height", 60)
    .attr("width", 80)
    .attr("fill", d => gopscale(d))

  calc.selectAll("gop")
    .data(dem_data)
    .enter()
    .append("rect")
    .attr("x", 710)
    .attr("y", (d, i) => 110 + i * 60)
    .attr("height", 60)
    .attr("width", 80)
    .attr("fill", d => demscale(d))

  calc.selectAll("gop")
    .data(third_data)
    .enter()
    .append("rect")
    .attr("x", 810)
    .attr("y", (d, i) => 110 + i * 60)
    .attr("height", 60)
    .attr("width", 80)
    .attr("fill", d => thirdscale(d))

  calc.selectAll("gop")
    .data(gop_data)
    .enter()
    .append("text")
    .text(d => nf(d))
    .attr("x", 650)
    .attr("y", (d, i) => 140 + i * 60)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", 20)
    .style("font-weight", "100")

  calc.append("text")
    .text(d => gop_data[4] - dem_data[4] > 0 ? "Trump +" + nf(gop_data[4] - dem_data[4]) : "Biden +" + -nf(gop_data[4] - dem_data[4]))
    .attr("x", 750)
    .attr("y", 450)
    .attr("fill", d => gop_data[4] - dem_data[4] > 0 ? colors[0] : colors[1])
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", 25)
    .style("font-weight", "100")


  calc.append("text")
    .text("Projected Vote")
    .attr("x", 500)
    .attr("y", 380)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", 25)
    .style("font-weight", "100")


  calc.append("text")
    .text("Weight")
    .attr("x", 500)
    .attr("y", 100)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", 25)
    .style("font-weight", "100")

  calc.append("text")
    .text("Margin")
    .attr("x", 550)
    .attr("y", 450)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", 25)
    .style("font-weight", "100")

  calc.selectAll("gop")
    .data(dem_data)
    .enter()
    .append("text")
    .text(d => nf(d))
    .attr("x", 750)
    .attr("y", (d, i) => 140 + i * 60)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", 20)
    .style("font-weight", "100")

  calc.selectAll("gop")
    .data(margin_data)
    .enter()
    .append("text")
    .text(d => d == 0 ? "-" : "+" + Math.abs(nf(d)))
    .attr("x", 950)
    .attr("y", (d, i) => 140 + i * 60)
    .attr("fill", d => d == 0 ? "black" : d > 0 ? colors[0] : colors[1])
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", 20)
    .style("font-weight", "100")

  calc.selectAll("gop")
    .data(third_data)
    .enter()
    .append("text")
    .text(d => nf(d))
    .attr("x", 850)
    .attr("y", (d, i) => 140 + i * 60)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", 20)
    .style("font-weight", "100")


  calc.selectAll("gop")
    .data(gop_data)
    .enter()
    .append("line")
    .attr("x1", 600)
    .attr("x2", 900)
    .attr("y1", (d, i) => 110 + i * 60)
    .attr("y2", (d, i) => 110 + i * 60)
    .attr("stroke", (d, i) => i == 4 ? "black" : "#AFAFAF")


  calc.append("image")
    .attr("href", "https://jhkforecasts.com/Trump-01.png")
    .attr("x", 610)
    .attr("y", 20)
    .attr("height", 80)
    .attr("width", 80)

  calc.append("image")
    .attr("href", "https://jhkforecasts.com/Biden-01.png")
    .attr("x", 710)
    .attr("y", 20)
    .attr("height", 80)
    .attr("width", 80)

  calc.append("text")
    .text(d => "?")
    .attr("x", 850)
    .attr("y", 70)
    .attr("fill", colors[2])
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", 60)
    .style("font-weight", "100")


  var candidates = ["Biden", "Sanders"]
  var timeformat = d3.timeFormat("%b. %d")
  var pollformat = d3.format(".0f")

  var gopscale = d3.scaleLinear()
    .domain([20, 80])
    .range(["white", "#FF6060"]);

  var demscale = d3.scaleLinear()
    .domain([20, 80])
    .range(["white", "#0091FF"]);
  var tformat = d3.timeFormat("%m/%d/%Y")
  var date2parse = d3.timeParse("%m/%d/%y")
  var timeparse = d3.timeParse("%m/%d/%y %H:%M")
  var gopwincol = "#FF6060"
  var demwincol = "#0091FF"
  var thirdwincol = "#FFE130"

  d3.csv("https://data.jhkforecasts.com/pollster-ratings.csv", pollster_ratings => {

    var pollsterID = pollster_ratings.map((d, i) => {
      return +d.PollsterRatingID
    })

    var pollster_grade = pollster_ratings.map((d, i) => {
      return d["538Grade"]
    })
    var pollster_bias = pollster_ratings.map((d, i) => {
      return d.MeanRevertedBias == NaN ? 0 : d.MeanRevertedBias
    })
    var grade_scale = [
      { Grade: "A+", Value: 1.5 },
      { Grade: "A", Value: 1.4 },
      { Grade: "A-", Value: 1.3 },
      { Grade: "A/B", Value: 1.2 },
      { Grade: "B+", Value: 1.1 },
      { Grade: "B", Value: 1 },
      { Grade: "B-", Value: .9 },
      { Grade: "B/C", Value: .8 },
      { Grade: "C+", Value: .7 },
      { Grade: "C", Value: .65 },
      { Grade: "C-", Value: .55 },
      { Grade: "C/D", Value: .5 },
      { Grade: "D+", Value: .4 },
      { Grade: "D", Value: .3 },
      { Grade: "D-", Value: .2 },
      { Grade: "-", Value: .7 },
    ]
    var pollster_grade_letter = grade_scale.map((d) => {
      return d.Grade
    })

    var pollster_grade_value = grade_scale.map((d) => {
      return d.Value
    })

    d3.csv("https://projects.fivethirtyeight.com/polls-page/president_polls.csv", data => {
      var data = data.filter(d => d.answer != "Schultz")
      var data = data.filter(d => d.candidate_party != "LIB")

      data.forEach((d, i) => {
        d.party_id = d.candidate_party == "DEM" ? 0 : 1
        return d;
      })
      data.sort((a, b) => a.party_id - b.party_id)

      var datanew = d3.nest()
        .key(d => d.question_id)
        .entries(data)

      var datanew = datanew.map((d, i) => {
        return d.values
      })

      var data_new = datanew.map((d, i) => {
        return {
          question_id: +datanew[i][0].question_id,
          poll_id: +datanew[i][0].poll_id,
          state: datanew[i][0].state == "" ? "US" : datanew[i][0].state,
          pollster: datanew[i][0].pollster,
          id: +datanew[i][0].pollster_rating_id,
          url: datanew[i][0].url,
          sponsors: datanew[i][0].sponsors,
          n: datanew[i][0].sample_size,
          date: date2parse(datanew[i][0].end_date),
          population: datanew[i][0].population,
          grade: pollster_grade[pollsterID.indexOf(+datanew[i][0].pollster_rating_id)] == undefined ? "-" : pollster_grade[pollsterID.indexOf(+datanew[i][0].pollster_rating_id)],
          bias: pollster_bias[pollsterID.indexOf(+datanew[i][0].pollster_rating_id)] == undefined ? 0 : pollster_bias[pollsterID.indexOf(+datanew[i][0].pollster_rating_id)],
          dem: datanew[i][0].answer,
          gop: datanew[i][1].answer,
          dem_pct: +datanew[i][0].pct,
          gop_pct: +datanew[i][1].pct,
          poll_index: datanew[i][0].state == "" ? "US" + +datanew[i][0].pollster_rating_id : datanew[i][0].state + +datanew[i][0].pollster_rating_id,
          margin: wf(+datanew[i][0].pct) - wf(+datanew[i][1].pct)
        }
      })
      data_new.forEach((d) => {
        var grade = d.grade
        d.gradeValue = grade_scale.filter(d => d.Grade == grade)[0].Value
      })
      var data_new = data_new.filter(d => d.gop == "Trump")
      var data_new = data_new.filter(d => d.dem == "Biden")



      var gradeColor = d3.scaleLinear()
        .domain([0.2, .85, 1.1, 1.5])
        .range(["#F0474E", "#FCDD26", "#37B76E", "#2079FF"])
      t(key_state, "Biden");
      function t(state, candidate) {
        var datanew = state == "All" ? data_new.slice(0, 100) : data_new.filter(d => d.state == state)

        var finaldata = candidate == "All" ? datanew : datanew.filter(d => d.dem == candidate)
        console.log(finaldata)
        var table = d3.select("#bottom")
          .append("table")
          .attr("class", "pollTable")

        var header = table.append("thead")


        header.append("th").attr("class", "pollth")
          .style("width", "35%")
          .append("h1")
          .text("Pollster")
          .style("font-family", "sf-mono")
          .style("font-weight", 100)
          .style("text-align", "left")
          .attr("class", "tableFont")


        header.append("th").attr("class", "pollth")
          .style("width", "5%")
          .append("h1")
          .text("Grade")
          .style("font-family", "sf-mono")
          .style("font-weight", 100)
          .style("text-align", "center")
          .attr("class", "tableFont")

        header.append("th").attr("class", "pollth")
          .style("width", "10%")
          .append("h1")
          .text("Date")
          .style("font-family", "sf-mono")
          .style("font-weight", 100)
          .style("text-align", "center")
          .attr("class", "tableFont")

        header.append("th").attr("class", "pollth")
          .style("width", "10%")
          .append("h1")
          .text("Biden")
          .style("font-family", "sf-mono")
          .style("font-weight", 100)
          .style("text-align", "center")
          .attr("class", "tableFont")


        header.append("th").attr("class", "pollth")
          .style("width", "10%")
          .append("h1")
          .text("Trump")
          .style("font-family", "sf-mono")
          .style("font-weight", 100)
          .style("text-align", "center")
          .attr("class", "tableFont")

        header.append("th").attr("class", "pollth")
          .style("width", "5%")
          .append("h1")
          .text("")
          .style("font-family", "sf-mono")
          .style("font-weight", 100)
          .style("text-align", "center")
          .attr("class", "tableFont")



        finaldata.forEach((d, i) => {
          table.append("tr")
            .attr("id", "row" + i)

          d3.select("#" + "row" + i)
            .append("td")
            .append("h1")
            .text(d.pollster)
            .style("font-family", "sf-mono")
            .style("font-weight", 100)
            .style("text-align", "left")
            .attr("class", "tableFont")


          d3.select("#" + "row" + i)
            .append("td")
            .append("h1")
            .text(d.grade)
            .style("color", d.grade == "-" ? "black" : gradeColor(d.gradeValue))
            .style("font-family", "sf-mono")
            .style("font-weight", 500)
            .style("text-align", "right")
            .attr("class", "tableFont")

          d3.select("#" + "row" + i)
            .append("td")
            .append("h1")
            .text(timeformat(d.date))
            .style("color", "#afafaf")
            .style("font-family", "sf-mono")
            .style("font-weight", 500)
            .style("text-align", "center")
            .attr("class", "tableFont")

          d3.select("#" + "row" + i)
            .append("td")
            .style("background-color", demscale(d.dem_pct))
            .append("h1")
            .text(wf(d.dem_pct))
            .style("font-family", "sf-mono")
            .style("font-weight", 100)
            .style("text-align", "center")
            .attr("class", "tableFont")


          d3.select("#" + "row" + i)
            .append("td")
            .style("padding", "5px")
            .style("background-color", gopscale(d.gop_pct))
            .append("h1")
            .text(wf(d.gop_pct))
            .style("font-family", "sf-mono")
            .style("font-weight", 100)
            .style("text-align", "center")
            .attr("class", "tableFont")

          d3.select("#" + "row" + i)
            .append("td")
            .style("padding", "5px")
            .append("h1")
            .text(d.margin == 0 ? "EVEN" : d.margin > 0 ? "D+" + wf(d.margin) : "R+" + wf(-d.margin))
            .style("color", d.margin == 0 ? "black" : d.margin > 0 ? demwincol : gopwincol)
            .style("font-family", "sf-mono")
            .style("font-weight", 100)
            .style("text-align", "center")
            .attr("class", "tableFont")
        })
      }


    })
  })


})