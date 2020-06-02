const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const districtID = urlParams.get("district").toUpperCase()
console.log(districtID)
var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"])

var topline = d3.select("#topline")
    .append("svg")
    .attr("viewBox", "0 0 1000 160")

var vote = d3.select("#voteShare")
    .append("svg")
    .attr("viewBox", "0 0 1000 260")

var colors = [color(100), color(0)]
var nf = d3.format(".1f")
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
var odds_scale = d3.scaleLinear()
    .domain(odds)
    .range([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])

function ordinal(i) {

    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i == 00 ? "At-Large" : i + "th";
}
queue()
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-house-input.csv")
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-house.csv")
    .await(ready);

function ready(error, inputData, data) {
    if (error) throw error;
    var districtData = data.filter(d => d.districtID == districtID)
    var districtInput = inputData.filter(d => d.id == districtID)[0]
    var incumbentParty = districtInput.incumbentParty
    var incumbent = districtInput.incumbent == "" ? "" : districtInput.incumbent.split(", ")
    var incumbent = districtInput.incumbent == "" ? "" : incumbent[1] + " " + incumbent[0]
    var democrat = incumbentParty == "(D)" ? incumbent == "" ? "Democrat" : incumbent : "Democrat"
    var republican = incumbentParty == "(R)" ? incumbent == "" ? "Republican" : incumbent : "Republican"
    console.log(democrat)
    var districtTitle = districtInput.state + " " + ordinal(districtInput.seat)
    var districtRepWin = districtData[districtData.length - 1].repWin
    var today = districtData[districtData.length - 1]
    var upsetOdds = districtRepWin > 50 ? 100 - districtRepWin : districtRepWin
    console.log(districtRepWin)
    document.getElementById("districtTitle").innerText = districtTitle
    document.getElementById("districtTitle").style.backgroundColor = districtRepWin > 50 ? colors[0] : colors[1]
    document.title = "House Forecast - " + districtTitle
    d3.select("head").append("meta")
        .attr("name", "twitter:title")
        .attr("content", "House Forecast - " + districtTitle)

    d3.select("head").append("meta")
        .attr("name", "twitter:description")
        .attr("content", "Who will win " + districtTitle + " congressional district?")


    topline.append("image")
        .attr("href", "https://jhkforecasts.com/donkey-01.png")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", 100)
        .attr("width", 100)

    topline.append("image")
        .attr("href", "https://jhkforecasts.com/elephant-01.png")
        .attr("x", 900)
        .attr("y", 0)
        .attr("height", 100)
        .attr("width", 100)

    topline.append("text")
        .text("Democrats")
        .attr("y", 30)
        .attr("x", 105)
        .style("font-size", "20")
        .style("font-weight", "100")

    topline.append("text")
        .text(nf(100 - districtRepWin) + "%")
        .attr("y", 70)
        .attr("x", 105)
        .style("font-size", "30")
        .style("font-weight", "100")
        .style("fill", color(0))

    topline.append("text")
        .text(nf(districtRepWin) + "%")
        .attr("y", 70)
        .attr("x", 895)
        .style("font-size", "30")
        .style("font-weight", "100")
        .style("fill", color(100))
        .style("text-anchor", "end")


    topline.append("text")
        .text("Republicans")
        .attr("y", 30)
        .attr("x", 895)
        .style("font-size", "20")
        .style("font-weight", "100")
        .style("text-anchor", "end")


    topline.append("text")
        .text("Chance of an upset is about the odds of...")
        .attr("y", 30)
        .attr("x", 500)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("font-size", 15)
        .style("font-weight", "100")


    topline.append("text")
        .text(events[Math.round(odds_scale(upsetOdds))])
        .attr("y", 50)
        .attr("x", 500)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .style("font-weight", "100")
        



    topline.append("image")
        .attr("href", "https://projects.jhkforecasts.com/presidential-forecast/" + events[Math.round(odds_scale(upsetOdds))] + ".svg")
        .attr("x", 450)
        .attr("y", 60)
        .attr("height", 100)
        .attr("width", 100)

    var pct = [0, 25, 50, 75, 100]

    var xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([300, 950])

    vote.selectAll("all")
        .data(pct)
        .enter()
        .append("line")
        .attr("x1", d => xScale(d))
        .attr("x2", d => xScale(d))
        .attr("y1", 50)
        .attr("y2", 250)
        .attr("stroke", "lightgray")

    vote.selectAll("all")
        .data(pct)
        .enter()
        .append("text")
        .text(d => d + "%")
        .attr("x", d => xScale(d))
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-weight", 500)

    vote.append("text")
        .text(republican + " " + (incumbentParty == "(R)" ? incumbent == "" ? "" : "(I)" : ""))
        .attr("x", 10)
        .attr("y", districtRepWin > 50 ? 100 : 200)
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "central")
        .style("font-weight", 700)
        .attr("font-size", 20)
        .attr("fill", color(100))

    vote.append("text")
        .text(democrat + " " + (incumbentParty == "(D)" ? incumbent == "" ? "" : "(I)" : ""))
        .attr("x", 10)
        .attr("y", districtRepWin < 50 ? 100 : 200)
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "central")
        .style("font-weight", 700)
        .attr("font-size", 20)
        .attr("fill", color(0))


    vote.append("rect")
        .attr("x", function (d) {
            var startRep
            +today.repVote == xScale(0) ? startRep = xScale(0) :
                +today.repVote == 100 ? startRep = xScale(100) :
                    +today.rep10 < 0 ? startRep = xScale(0) :
                        +today.rep90 > 100 ? startRep = xScale(100) :
                            startRep = xScale(+today.rep10 - 2)
            return startRep
        })
        .attr("y", districtRepWin > 50 ? 50 : 150)
        .attr("height", 100)
        .attr("width", function (d) {
            var widthRep
            +today.repVote == 0 ? widthRep = 0 :
                +today.repVote == 100 ? widthRep = 0 :
                    +today.rep10 < 0 ? widthRep = xScale(+today.rep90 + 2) - xScale(0) :
                        +today.rep90 > 100 ? widthRep = xScale(100) - xScale(+today.rep10 - 2) :
                            widthRep = xScale(+today.rep90 + 2) - xScale(+today.rep10 - 2)
            return widthRep
        })
        .attr("ry", 7)
        .attr("fill", color(100))
        .attr("opacity", .5)

    vote.append("rect")
        .attr("x", xScale(today.repVote) - 5)
        .attr("y", districtRepWin > 50 ? 95 : 195)
        .attr("height", 10)
        .attr("width", 10)
        .attr("ry", 3)
        .attr("fill", color(100))
        .attr("stroke", "white")
        .attr("stroke-width", 2)


    vote.append("rect")
        .attr("x", function (d) {
            var startdem
            +today.demVote == xScale(0) ? startdem = xScale(0) :
                +today.demVote == 100 ? startdem = xScale(100) :
                    +today.dem10 < 0 ? startdem = xScale(0) :
                        +today.dem90 > 100 ? startdem = xScale(100) :
                            startdem = xScale(+today.dem10 - 2)
            return startdem
        })
        .attr("y", districtRepWin < 50 ? 50 : 150)
        .attr("height", 100)
        .attr("width", function (d) {
            var widthdem
            +today.demVote == 0 ? widthdem = 0 :
                +today.demVote == 100 ? widthdem = 0 :
                    +today.dem10 < 0 ? widthdem = xScale(+today.dem90 + 2) - xScale(0) :
                        +today.dem90 > 100 ? widthdem = xScale(100) - xScale(+today.dem10 - 2) :
                            widthdem = xScale(+today.dem90 + 2) - xScale(+today.dem10 - 2)
            return widthdem
        })
        .attr("ry", 7)
        .attr("fill", color(0))
        .attr("opacity", .5)

    vote.append("rect")
        .attr("x", xScale(today.demVote) - 5)
        .attr("y", districtRepWin < 50 ? 95 : 195)
        .attr("height", 10)
        .attr("width", 10)
        .attr("ry", 3)
        .attr("fill", color(0))
        .attr("stroke", "white")
        .attr("stroke-width", 2)

    vote.append("text")
        .text(nf(today.repVote) + "%")
        .attr("x", d => xScale(today.repVote))
        .attr("y", districtRepWin > 50 ? 85 : 185)
        .attr("text-anchor", "middle")
        .style("font-weight", 500)

    vote.append("text")
        .text(nf(today.demVote) + "%")
        .attr("x", d => xScale(today.demVote))
        .attr("y", districtRepWin < 50 ? 85 : 185)
        .attr("text-anchor", "middle")
        .style("font-weight", 500)
    var dp = d3.timeParse("%m/%d/%y")
    var time_data = districtData
    var line_data = time_data
    line_data.forEach((d, i) => {
        d.date = dp(d.forecastDate)
    })
    var max_date = d3.max(line_data, d => d.date)

    var margin = { top: 70, right: 40, bottom: 20, left: 40 }
    var width = 1400 - margin.left - margin.right
    var height = 600 - margin.top - margin.bottom
    var axisPad = 12
    var formatDate = d3.timeFormat("%b - %d"),
        bisectDate = d3.bisector(d => d.date).left,
        onevalue = d3.format(".1f")

    var time = d3.select("#time").append("svg")
        .attr("viewBox", "0 0 1400 650")
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var x = d3.scaleTime()
        .rangeRound([margin.left, width - margin.right])
        .domain([new Date(2020, 4, 8), new Date(2020, 10, 3)])

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
        .call(d3.axisBottom(x).tickSize(-420).ticks(5)
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
                .style("text-transform", "uppercase")
                .style("font-family", "sf-mono")
            g.selectAll("line")
                .attr("opacity", .2)
                .attr("stroke", "grey")


            g.select(".domain")
                .attr("opacity", 0)


        })

    time.append("line")
        .attr("x1", x(new Date(2020, 10, 3)))
        .attr("x2", x(new Date(2020, 10, 3)))
        .attr("y1", 70)
        .attr("y2", (height - margin.bottom))
        .attr("stroke", "black")
        .attr("stroke-width", 3)

    time.append("text")
        .text("NOV. 3RD")
        .attr("x", x(new Date(2020, 10, 3)) + 3)
        .attr("y", 80)
        .style("font-weight", "100")
        .attr("font-size", 12)
        .style("font-family", "sf-mono")



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
    var demScale = "D+"
    var keys = ["repWin", "demWin", "margin", "repVote", "demVote"]
    update("Win", 0);
    console.log(line_data)

    function update(input, speed) {


        var copy = keys.filter(f => f.includes(input))
        var cities = copy.map(function (id) {
            return {
                id: id,
                values: line_data.map(d => { return { date: d.date, pct: +d[id] } })
            };
        });
        console.log(cities)
        y.domain([
            0,
            100
        ]).nice();

        time.selectAll(".y-axis").transition()
            .duration(speed)
            .call(d3.axisLeft(y).tickSize(-width + margin.right + margin.left).ticks(5)).call(g => {
                var xshift = 0
                g.selectAll("text")
                    .text(d => input == "margin" ? "D+" + Math.abs(d) : d)
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
            .style("stroke", (d, i) => input == "margin" ? color(0) : colors[i])
            .style("stroke-width", 4)
            .style("opacity", .7)
            .style("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .merge(city)
            .transition().duration(speed)
            .attr("d", d => line(d.values))
            .style("stroke", (d, i) => input == "margin" ? color(0) : colors[i])





        tooltip(copy);

        function tooltip(copy) {
            var rect = focus.selectAll(".lineHoverRect")
                .data(copy)

            var labels2 = focus.selectAll(".lineHoverText2")
                .data(copy)

            labels2.enter().append("text")
                .attr("class", "lineHoverText2")
                .attr("font-size", 25)
                .style("fill", "white")
                .style("stroke", "white")
                .style("stroke-width", 5)
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
                .style("stroke", d => input == "margin" ? color(100) : z(d))
                .style("stroke-width", 3)
                .style("fill", "white")
                .attr("r", 3)
                .merge(circles)
                .transition().duration(speed)
                .style("stroke", (d, i) => input == "margin" ? color(0) : colors[i]);

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
                    .attr("y", 50)
                    .attr("text-anchor", "middle")
                    .style("font-size", 20)
                    .style("font-weight", "100")
                    .text(formatDate(d.date).toUpperCase())
                    .style("font-family", "sf-mono");

                focus.selectAll(".hoverCircle")
                    .attr("cy", e => y(d[e]))
                    .attr("cx", x(d.date));

                focus.selectAll(".lineHoverText2")
                    .style("font-weight", "100")
                    .attr("x", x(d.date) + 10)
                    .text((e, i) => input == "margin" ? "D +" + onevalue(-d[e]) : i == 1 ? ("DEM " + onevalue(d[e])) : i == 0 ? "REP " + onevalue(d[e]) : "Third " + onevalue(d[e]))
                    .attr("y", e => d[e] == d["rep" + input] ? y(d["rep" + input]) > y(d["dem" + input]) ? y(d["rep" + input]) + 15 : y(d["rep" + input]) - 15 : d[e] == d["dem" + input] ? y(d["dem" + input]) > y(d["rep" + input]) ? y(d["dem" + input]) + 15 : y(d["dem" + input]) - 15 : y(d[e]) - 15)
                    .attr("text-anchor", (e, i) => i == 2 ? "end" : "start")
                    .attr("dominant-baseline", "middle")
                    .style("font-family", "sf-mono")


                focus.selectAll(".lineHoverText")
                    .style("font-weight", "100")
                    .attr("x", x(d.date) + 10)
                    .text((e, i) => input == "margin" ? "D +" + onevalue(-d[e]) : i == 1 ? ("DEM " + onevalue(d[e])) : i == 0 ? "REP " + onevalue(d[e]) : "Third " + onevalue(d[e]))
                    .attr("fill", (e, i) => input == "margin" ? color(0) : colors[i])
                    .attr("y", e => d[e] == d["rep" + input] ? y(d["rep" + input]) > y(d["dem" + input]) ? y(d["rep" + input]) + 15 : y(d["rep" + input]) - 15 : d[e] == d["dem" + input] ? y(d["dem" + input]) > y(d["rep" + input]) ? y(d["dem" + input]) + 15 : y(d["dem" + input]) - 15 : y(d[e]) - 15)
                    .attr("text-anchor", (e, i) => i == 2 ? "end" : "start")
                    .attr("dominant-baseline", "middle")
                    .style("font-family", "sf-mono")
            }
        }



        time.append("text")
            .text("Win Majority")
            .attr("x", 350)
            .attr("y", 25)
            .style("font-weight", "100")
            .attr("font-size", 25)
            .attr("fill", input == "Win" ? "black" : "lightgray")
            .on("mouseover", function (d) {
                d3.select(this)
                    .attr("text-decoration", "underline")
                    .style("cursor", "pointer")
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .attr("text-decoration", "none")
            })
            .on("click", d => { update("Win", 500) })
            .transition()
            .duration(speed)
            .attr("fill", input == "Win" ? "black" : "lightgray")


        time.append("text")
            .text("Projected Vote")
            .attr("x", 700)
            .attr("y", 25)
            .style("font-weight", "100")
            .attr("font-size", 25)
            .attr("fill", input == "Vote" ? "black" : "lightgray")
            .on("mouseover", function (d) {
                d3.select(this)
                    .attr("text-decoration", "underline")
                    .style("cursor", "pointer")
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .attr("text-decoration", "none")
            })
            .on("click", d => { update("Vote", 500) })
            .transition()
            .duration(speed)
            .attr("fill", input == "Vote" ? "black" : "lightgray")
    }
}