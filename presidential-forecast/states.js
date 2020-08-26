var candidates = [
  { candidate: "Joseph Biden", party: "DEM", id: "Biden" },
  { candidate: "Donald Trump", party: "REP", id: "Trump" },
  { candidate: "Howie Hawkins", party: "GRE", id: "Hawkins" },
  { candidate: "Jo Jorgensen", party: "LIB", id: "Jorgensen" },
]
var timeScale = 86400000
var colors = ["#FF6060", "#0091FF", "#ffc300", "#C473F6", "#31DE70"]
var category = ["REP", "DEM", "LIB", "IND", "GRE"]
var partyColors = d3.scaleOrdinal()
  .domain(category)
  .range(colors)

var url = window.location.href
var url = url.split("/")
var newrl = url[url.length - 1]
var newrl = newrl.includes(".html") ? newrl.split(".")[0] : newrl
var newrl = newrl.includes("cd") ? newrl.split("-")[0] + " " + "CD" + "-" + newrl.split("-")[2] : newrl.split("-").join(" ")
function titleCase(str) {
  var wordsArray = str.toLowerCase().split(/\s+/);
  console.log(wordsArray)
  var upperCased = wordsArray.map(function (d) {
    return d == "of" ? "of" : d.includes("cd") ? d.charAt(0).toUpperCase() + d.charAt(1).toUpperCase() + d.substr(2) : d.charAt(0).toUpperCase() + d.substr(1);
  });
  return upperCased.join(" ");
}
var keyState = titleCase(newrl)

console.log(keyState)


var dateparse = d3.timeParse("%m/%d/%y")
var dp = d3.timeParse("%m/%d/%y")
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


var color = d3.scaleLinear()
  .domain([0, 50, 100])
  .range(["#0091FF", "white", "#FF6060"]);




d3.csv("https://data.jhkforecasts.com/2020-presidential.csv", data => {
  var data = data.filter(d => d.state == keyState)
  data.forEach((d, i) => {
    d.rawDate = d.forecastDate
    d.candidate = d.candidate == "Joseph R. Biden Jr." ? "Joseph Biden" : d.candidate
    d.forecastDate = dp(d.forecastDate)
    d.vote = +d.vote
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

  var stateData = data.filter(d => d.state == keyState)
  console.log(data)

  var today = stateData.slice(stateData.length - 4, stateData.length)

  var gop_vote = today[1].vote
  var dem_vote = today[0].vote
  var third_vote = today[2].vote
  var gop_win = today[1].win
  var dem_win = today[0].win
  var evs = today[1].ev == 1 ? today[1].ev + " Electoral Vote" : today[1].ev + " Electoral Votes"




  var upset_odds = dem_win > gop_win ? gop_win : dem_win

  document.getElementById("stateComp").innerHTML = keyState
  document.getElementById("stateComp").style.color = gop_win > dem_win ? colors[0] : colors[1]
  document.getElementById("evComp").innerHTML = evs


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
    .text("Win " + keyState + "'s " + today[0].ev + (today[0].ev > 1 ? " Electoral Votes" : " Electoral Vote"))
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
    .attr("viewBox", "0 0 1000 350")

  var x3 = d3.scaleLinear()
    .domain([0, 100])
    .range([300, 980])

  var pct = [0, 25, 50, 75, 100]




  vote.selectAll("lines")
    .data(pct)
    .enter()
    .append("line")
    .attr("x1", d => x3(d))
    .attr("x2", d => x3(d))
    .attr("y1", 30)
    .attr("y2", 3500)
    .attr("stroke", "#AFAFAF")
    .attr("opacity", .5)

  vote.selectAll("lines")
    .data(pct)
    .enter()
    .append("text")
    .text(d => d)
    .attr("x", d => x3(d))
    .attr("y", 20)
    .attr("fill", "grey")
    .attr("text-anchor", "middle")
    .attr("font-size", 14)
    .style("font-weight", "100")





  var vote_dist = today
  vote_dist.sort((a, b) => b.vote - a.vote)





  vote.selectAll("rects")
    .data(vote_dist)
    .enter().append("text")
    .text(d => d.candidate)
    .attr("x", 20)
    .attr("y", (d, i) => i * 80 + 70)
    .attr("text-anchor", "start")
    .attr("dominant-baseline", "central")
    .attr("font-size", 20)
    .style("font-weight", "100")

  vote.selectAll("rects")
    .data(vote_dist)
    .enter()
    .append("rect")
    .attr("fill", (d, i) => partyColors(d.party))
    .attr("x", (d, i) => i < 2 ? x3(d.vote - ((d.vote - d.p10) * .85)) : x3(d.vote - ((d.vote - d.p10))))
    .attr("y", (d, i) => 30 + 80 * i)
    .attr("height", 80)
    .attr("width", (d, i) => i < 2 ? x3(((d.vote - d.p10) * .85) * 2) - 300 : x3(((d.vote - d.p10) * .75) * 3) - 300)
    .attr("opacity", .4)
    .attr("ry", 10)

  vote.append("text")
    .attr("fill", gop_vote <= dem_vote ? colors[1] : colors[0])
    .attr("x", d => 290)
    .attr("y", (d, i) => 70 + 80 * i)
    .text(d => (gop_vote <= dem_vote ? "D+" : "R+") + nf(vote_dist[0].vote - vote_dist[1].vote))
    .attr("dominant-baseline", "central")
    .style("font-weight", 500)
    .attr("text-anchor", "end")
    .style("font-size", 20)



  vote.selectAll("rects")
    .data(vote_dist)
    .enter()
    .append("text")
    .attr("fill", (d, i) => "black")
    .attr("x", d => x3(d.vote))
    .attr("y", (d, i) => 55 + 80 * i)
    .text(d => nf(d.vote))
    .attr("dominant-baseline", "central")
    .style("font-weight", 100)
    .attr("text-anchor", "middle")




  vote.selectAll("rects")
    .data(vote_dist)
    .enter()
    .append("rect")
    .attr("fill", (d, i) => partyColors(d.party))
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .attr("x", d => x3(d.vote) - 4)
    .attr("y", (d, i) => 66 + 80 * i)
    .attr("height", 8)
    .attr("width", 8)
    .attr("ry", 2)

  d3.select("#winButton").text("Win " + keyState)


  var time_data = data.filter(d => d.state == keyState)

  var lol
  var max_date = d3.max(time_data, d => d.forecastDate)
  var lineData = data.filter(d => d.state == keyState)
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
          top: input == "win" ? d[input] : input == "ev" ? +d[input] + +d.p10 * 1.3 : i < 2 ? +d.vote + (+d.p90 - +d.vote) * .9 : +d[input] + (+d[input] + 3) / 2,
          bottom: input == "win" ? d[input] : input == "ev" ? +d[input] - +d.p10 * 1.3 : i < 2 ? +d.vote - (+d.p90 - +d.vote) * .9 : +d[input] - (+d[input]) / 1.5,
        }
      }))
    })

 
    y.domain([
      0,
      input == "vote" ? d3.max(lineData, d => d.p90) < 60 ? 60 : d3.max(lineData, d => d.p90) : 100
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
          .attr("opacity", .95)

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
        update("ev", 0)
      })
      .style("cursor", "pointer")

  }


  var keys2 = ["Fundamentals", "Adjusted Polling Avg.", "State Similarity", "Experts Ratings"]
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

  var gop_data = [stateData[stateData.length - 3].fundamentals, stateData[stateData.length - 3].pollingAvg, stateData[stateData.length - 3].stateSimilarity, stateData[stateData.length - 3].experts, stateData[stateData.length - 3].vote]
  var dem_data = [stateData[stateData.length - 4].fundamentals, stateData[stateData.length - 4].pollingAvg, stateData[stateData.length - 4].stateSimilarity, stateData[stateData.length - 4].experts, stateData[stateData.length - 4].vote]
  var margin_data = [gop_data[0] - dem_data[0], gop_data[1] - dem_data[1], gop_data[2] - dem_data[2], gop_data[3] - dem_data[3]]


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
    .data(gop_data)
    .enter()
    .append("rect")
    .attr("x", 710)
    .attr("y", (d, i) => 110 + i * 60)
    .attr("height", 60)
    .attr("width", 80)
    .attr("fill", d => gopscale(d))

  calc.selectAll("gop")
    .data(dem_data)
    .enter()
    .append("rect")
    .attr("x", 810)
    .attr("y", (d, i) => 110 + i * 60)
    .attr("height", 60)
    .attr("width", 80)
    .attr("fill", d => demscale(d))


  calc.selectAll("gop")
    .data(gop_data)
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

  calc.append("text")
    .text(d => gop_data[4] - dem_data[4] > 0 ? "Trump +" + nf(gop_data[4] - dem_data[4]) : "Biden +" + -nf(gop_data[4] - dem_data[4]))
    .attr("x", 800)
    .attr("y", 450)
    .attr("fill", d => gop_data[4] - dem_data[4] > 0 ? colors[0] : colors[1])
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", 25)
    .style("font-weight", "100")


  calc.append("text")
    .text("Projected Vote")
    .attr("x", 700)
    .attr("y", 390)
    .attr("fill", "black")
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "end")
    .attr("font-size", 25)
    .style("font-weight", "100")


  calc.append("text")
    .text("Margin")
    .attr("x", 700)
    .attr("y", 450)
    .attr("fill", "black")
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "central")
    .attr("font-size", 25)
    .style("font-weight", "100")

  calc.selectAll("gop")
    .data(dem_data)
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
    .data(gop_data)
    .enter()
    .append("line")
    .attr("x1", 700)
    .attr("x2", 900)
    .attr("y1", (d, i) => 110 + i * 60)
    .attr("y2", (d, i) => 110 + i * 60)
    .attr("stroke", (d, i) => i == 4 ? "black" : "#AFAFAF")


  calc.append("image")
    .attr("href", "https://jhkforecasts.com/Trump-01.png")
    .attr("x", 710)
    .attr("y", 20)
    .attr("height", 80)
    .attr("width", 80)

  calc.append("image")
    .attr("href", "https://jhkforecasts.com/Biden-01.png")
    .attr("x", 810)
    .attr("y", 20)
    .attr("height", 80)
    .attr("width", 80)


  var mf = d3.timeFormat("%b %d")
  var wf = d3.format(".0f")
  d3.csv("https://projects.fivethirtyeight.com/polls-page/president_polls.csv", polls => {
    
    var polls = polls.filter(d => d.state == keyState)

    var pollsIndexed = d3.nest()
      .key(d => d.question_id)
      .entries(polls)

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
    var gradeLetter = grade_scale.map((d) => {
      return d.Grade
    })

    var gradeValue = grade_scale.map((d) => {
      return d.Value
    })


    var gradeColor = d3.scaleLinear()
      .domain([0.2, .85, 1.1, 1.5])
      .range(["#F0474E", "#FCDD26", "#37B76E", "#2079FF"])

    pollsIndexed.forEach((d, i) => {
      d.repCandidate = d.values.filter(d => d.candidate_party == "REP").length == 0 ? "na" : d.values.filter(d => d.candidate_party == "REP")[0].candidate_name
      d.demCandidate = d.values.filter(d => d.candidate_party == "DEM").length == 0 ? "na" : d.values.filter(d => d.candidate_party == "DEM")[0].candidate_name
      d.pollster = d.values[0].pollster
      d.sample = d.values[0].sample_size + " " + d.values[0].population
      d.grade = d.values[0].fte_grade
      d.gradeColor = gradeColor(gradeValue[gradeLetter.indexOf(d.grade)])
      d.date = dp(d.values[0].end_date)
      d.values.sort((a, b) => b.pct - a.pct)
      d.leader = d.values[0].pct - d.values[1].pct == 0 ? "EVEN" : d.values[0].answer + " +" + wf(d.values[0].pct - d.values[1].pct)
      d.leaderParty = d.leader=="EVEN"?"tie":d.values[0].candidate_party
    })


    var table = d3.select("#bottom")
      .append("table")
      .style("border-collapse", "collapse")
      .style("width", "100%")

    var header = table.append("tr").style("width", "100%").style("border-bottom", "1px black solid")

    header.append("td")
      .style("width", "40%")
      .append("h1")
      .text("POLLSTER")
      .style("font-family", "sf-mono")
      .style("font-weight", 100)
      .style("font-size", "1.5vw")

    header.append("td")
      .style("width", "10%")
      .append("h1")
      .text("")
      .style("font-family", "sf-mono")
      .style("font-weight", 100)
      .style("font-size", "1.5vw")
      .style("text-align", "center")

    header.append("td")
      .style("width", "10%")
      .append("h1")
      .text("DATE")
      .style("font-family", "sf-mono")
      .style("font-weight", 100)
      .style("font-size", "1.5vw")
      .style("text-align", "center")

    header.append("td")
      .style("width", "10%")
      .append("h1")
      .text("GRADE")
      .style("font-family", "sf-mono")
      .style("font-weight", 100)
      .style("font-size", "1.5vw")
      .style("text-align", "center")


    header.append("td")
      .style("width", "30%")
      .append("h1")
      .text("LEADER")
      .style("font-family", "sf-mono")
      .style("font-weight", 100)
      .style("font-size", "1.5vw")
      .style("text-align", "right")

    pollsIndexed.forEach((d, i) => {
      var row = table.append("tr").style("width", "100%")
      var svgrow = table.append("tr").style("width", "100%")
      var candsLength = d.values.length
      var svgcontainer = svgrow.append("td").attr("colspan", 5)
      var svg = svgcontainer.append("svg")
        .attr("viewBox", "0 0 1000 " + (20 + candsLength * 40))

      row.append("td")
        .style("width", "40%")
        .append("h1")
        .text(d.pollster.toUpperCase())
        .style("font-family", "sf-mono")
        .style("font-weight", 100)
        .style("font-size", "1.5vw")

      row.append("td")
        .style("width", "10%")
        .append("h1")
        .text(d.sample.toUpperCase())
        .style("font-family", "sf-mono")
        .style("font-weight", 100)
        .style("font-size", "1.5vw")
        .style("text-align", "center")
        .style("color", "gray")

      row.append("td")
        .style("width", "10%")
        .append("h1")
        .text(mf(d.date).toUpperCase())
        .style("font-family", "sf-mono")
        .style("font-weight", 100)
        .style("font-size", "1.5vw")
        .style("text-align", "center")
        .style("color", "black")

      row.append("td")
        .style("width", "10%")
        .append("h1")
        .text(d.grade)
        .style("font-family", "sf-mono")
        .style("font-weight", 500)
        .style("font-size", "1.5vw")
        .style("text-align", "center")
        .style("color", d.gradeColor)

      row.append("td")
        .style("width", "30%")
        .append("h1")
        .text(d.leader.toUpperCase())
        .style("font-family", "sf-mono")
        .style("font-weight", 500)
        .style("font-size", "1.5vw")
        .style("text-align", "right")
        .style("color",d.leaderParty=="tie"?"black": partyColors(d.leaderParty))


      d.values.forEach((j, k) => {
        svg.append('text')
          .text(j.answer)
          .attr("x", 50)
          .attr("y", 40 + k * 40)
          .attr("font-size", 15)
          .attr("dominant-baseline", "central")

        svg.append("circle")
          .attr("cx", 300 + j.pct * 7)
          .attr("cy", 40 + k * 40)
          .attr("r", 5)
          .attr("fill", partyColors(j.candidate_party))

        svg.append('text')
          .text(wf(j.pct))
          .attr("x", 310 + j.pct * 7)
          .attr("y", 40 + k * 40)
          .attr("font-size", 15)
          .attr("dominant-baseline", "central")

      })


    })
  })

})