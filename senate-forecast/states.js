var url = window.location.href
var url = url.split("/")
var newrl = url[url.length - 1]
var newrl = newrl.includes(".html") ? newrl.split(".")[0] : newrl
var newrl = newrl.includes("cd") ? newrl.split("-")[0] + " " + "CD" + "-" + newrl.split("-")[2] : newrl.split("-").join(" ")
function titleCase(str) {
    var wordsArray = str.toLowerCase().split(/\s+/);
    var upperCased = wordsArray.map(function (d) {
        return d == "of" ? "of" : d.includes("cd") ? d.charAt(0).toUpperCase() + d.charAt(1).toUpperCase() + d.substr(2) : d.charAt(0).toUpperCase() + d.substr(1);
    });
    return upperCased.join(" ");
}
var keyState = titleCase(newrl)

var stateIndex = keyState == "Arizona" ? "Arizona: Class III" : keyState == "Georgia Special" ? "Georgia: Class III" : keyState + ": Class II"
console.log(stateIndex)
var colors = ["#FF6060", "#0091FF", "#FFE130", "#C473F6", "#31DE70"]
var category = ["REP", "DEM", "LIB", "IND", "GRE"]
var partyColors = d3.scaleOrdinal()
    .domain(category)
    .range(colors)
var partyLetter = ["(R)", "(D)", "(L)", "(I)", "(G)"]
var partyAbbrev = d3.scaleOrdinal()
    .domain(category)
    .range(partyLetter)
var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"]);
var dateparse = d3.timeParse("%m/%d/%y")
var dp = d3.timeParse("%m/%d/%y")
var tformat = d3.timeFormat("%m/%d/%Y")
var tf = d3.timeFormat("%m/%d")
var dateparse = d3.timeParse("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
var nf = d3.format(".1f")
var updated_format = d3.timeFormat("%b. %d %Y %I:%M %p")

queue()
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-senate-input.csv")
    .defer(d3.csv, "https://data.jhkforecasts.com/senate-candidates.csv")
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-senate.csv")
    .await(ready);

function ready(error, inputData, cands, data) {
    if (error) throw error;
    var inputData = inputData.filter(d => d.state_index == stateIndex)[0]
    var candidates = cands.filter(d => d.state_index == stateIndex)
    var seatData = data.filter(d => d.state_index == stateIndex)
    var today = seatData.slice(seatData.length - candidates.length, seatData.length)
    var repWin = d3.sum(today.filter(d => d.party == "REP"), d => d.win)
    var demWin = d3.sum(today.filter(d => d.party == "DEM"), d => d.win)
    var upset_odds = repWin > demWin ? demWin : repWin
    var rating = repWin < 5 ? "Solid D" : repWin < 15 ? "Likely D" : repWin < 40 ? "Lean D" : repWin < 60 ? "Tossup" : repWin < 85 ? "Lean R" : repWin < 95 ? "Likely R" : "Solid R"
    var incParty = inputData.inc_party
    document.getElementById("stateComp").innerHTML = keyState
    document.getElementById("evComp").style.backgroundColor = color(repWin)
    document.getElementById("evComp").innerHTML = rating
    console.log(candidates)
    seatData.forEach((d, i) => {
        d.rawDate = d.forecast_date
        d.forecastDate = dp(d.forecast_date)
        d.vote = +d.vote
        return d
    })
    const array = seatData.map(d => {
        return d.rawDate
    })
    const uniqueSet = new Set(array)
    var dates = [...uniqueSet]
    var dates = dates.map(d => {
        return dp(d)
    })

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
        .attr("href", "https://projects.jhkforecasts.com/presidential-forecast/" + events[Math.round(odds_scale(upset_odds))] + ".svg")
        .attr("x", 450)
        .attr("y", 120)
        .attr("height", 100)
        .attr("width", 100)


    topline.append("text")
        .text(nf(repWin) + "%")
        .attr("y", 140)
        .attr("x", 870)
        .attr("fill", colors[0])
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "bottom")
        .attr("font-size", 30)
        .style("font-weight", "100")

    topline.append("text")
        .text("Republicans")
        .attr("y", 100)
        .attr("x", 870)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "top")
        .attr("font-size", 20)
        .style("font-weight", "100")

    topline.append("text")
        .text("Democrats")
        .attr("y", 100)
        .attr("x", 130)
        .attr("fill", "black")
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "top")
        .attr("font-size", 20)
        .style("font-weight", "100")

    topline.append("text")
        .text(nf(demWin) + "%")
        .attr("y", 140)
        .attr("x", 130)
        .attr("fill", colors[1])
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "bottom")
        .attr("font-size", 30)
        .style("font-weight", "100")

    topline.append("image")
        .attr("href", "https://jhkforecasts.com/elephant-01.png")
        .attr("x", 880)
        .attr("y", 60)
        .attr("height", 100)
        .attr("width", 100)

    topline.append("image")
        .attr("href", "https://jhkforecasts.com/donkey-01.png")
        .attr("x", 20)
        .attr("y", 60)
        .attr("height", 100)
        .attr("width", 100)

    var vote = d3.select("#vote")
        .append("svg")
        .attr("viewBox", "0 0 1000 " + (candidates.length * 80 + 30))

    var x3 = d3.scaleLinear()
        .domain([0, 100])
        .range([400, 980])

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
        .text(d => d.candidate + " " + partyAbbrev(d.party))
        .attr("x", 20)
        .attr("y", (d, i) => i * 80 + 70)
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "central")
        .attr("font-size", 16)
        .style("font-weight", "100")

    vote.selectAll("rects")
        .data(vote_dist)
        .enter()
        .append("rect")
        .attr("fill", (d, i) => partyColors(d.party))
        .attr("x", (d, i) => i < 2 ? x3(d.vote - ((d.vote - d.p_10) * .95)) : x3(d.vote - ((d.vote - d.p_10))))
        .attr("y", (d, i) => 30 + 80 * i)
        .attr("height", 80)
        .attr("width", (d, i) => i < 2 ? x3(((d.vote - d.p_10) * .95) * 2) - 400 : x3(((d.vote - d.p_10) * .75) * 3) - 400)
        .attr("opacity", .4)
        .attr("ry", 10)


    vote.selectAll("rects")
        .data(vote_dist)
        .enter()
        .append("text")
        .attr("fill", (d, i) => "black")
        .attr("x", d => x3(d.vote))
        .attr("y", (d, i) => 55 + 80 * i)
        .text(d => nf(d.vote))
        .attr("dominant-baseline", "central")
        .style("font-weight", 500)
        .attr("text-anchor", "middle")
        .style("font-size", 15)


    vote.selectAll("rects")
        .data(vote_dist)
        .enter()
        .append("text")
        .attr("fill", (d, i) => partyColors(d.party))
        .attr("x", d => 350)
        .attr("y", (d, i) => 70 + 80 * i)
        .text(d => nf(d.win))
        .attr("dominant-baseline", "central")
        .style("font-weight", 500)
        .attr("text-anchor", "middle")
        .style("font-size", 15)

    vote.append("text")
        .attr("fill", (d, i) => "black")
        .attr("x", d => 350)
        .attr("y", (d, i) => 15)
        .text(d => "win")
        .attr("dominant-baseline", "central")
        .style("font-weight", 500)
        .attr("text-anchor", "middle")
        .style("font-size", 15)

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
          top: input == "win" ? d[input] : input == "ev" ? +d[input] + +d.p10 * 1.3 : i < 2 ? d.vote+(d.p_90-d.vote)*.9 : +d[input] + (+d[input] + 3) / 2,
          bottom: input == "win" ? d[input] : input == "ev" ? +d[input] - +d.p10 * 1.3 : i < 2 ? d.vote-(d.p_90-d.vote)*.9 : +d[input] - (+d[input]) / 1.5,
        }
      }))
    })

    y.domain([0,input == "vote" ? d3.max(lineData, d => d.p_90) < 60 ? 60 : d3.max(lineData, d => d.p_90) : 100]).nice();

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
          .attr("opacity",.95)

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
    var winbutton = d3.select("#winB")
      .on("click", function () {
        update("win", 500)
      })
      .style("cursor", "pointer")

    var votebutton = d3.select("#voteB")
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

}