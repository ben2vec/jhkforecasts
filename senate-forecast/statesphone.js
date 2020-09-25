
queue()
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-senate-input.csv")
    .defer(d3.csv, "https://data.jhkforecasts.com/senate-candidates.csv")
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-senate.csv")
    .defer(d3.csv, "https://projects.fivethirtyeight.com/polls-page/senate_polls.csv")
    .await(ready);

function ready(error, inputData, cands, data, polls) {
    if (error) throw error;
    var inputData = inputData.filter(d => d.state_index == stateIndex)[0]
    var candidates = cands.filter(d => d.state_index == stateIndex)
    var seatData = data.filter(d => d.state_index == stateIndex)

    seatData.forEach((d, i) => {
        d.rawDate = d.forecast_date
        d.forecastDate = dp(d.forecast_date)
        d.vote = +d.vote
        var candidate = d.candidate
        d.id = candidates.filter(d => d.candidate == candidate)[0].id
        return d
    })
    var today = seatData.slice(seatData.length - candidates.length, seatData.length)
    var repWin = d3.sum(today.filter(d => d.party == "REP"), d => d.win)
    var demWin = d3.sum(today.filter(d => d.party == "DEM"), d => d.win)
    var upset_odds = repWin > demWin ? demWin : repWin
    var rating = repWin < 5 ? "Solid D" : repWin < 15 ? "Likely D" : repWin < 40 ? "Lean D" : repWin < 60 ? "Tossup" : repWin < 85 ? "Lean R" : repWin < 95 ? "Likely R" : "Solid R"
    var incParty = inputData.inc_party
    document.getElementById("stateCompPhone").innerHTML = keyState
    document.getElementById("evCompPhone").style.backgroundColor = color(repWin)
    document.getElementById("evCompPhone").innerHTML = rating
    const array = seatData.map(d => {
        return d.rawDate
    })
    const uniqueSet = new Set(array)
    var dates = [...uniqueSet]
    var dates = dates.map(d => {
        return dp(d)
    })
    var repCandidate = cands.filter(d => d.party == "REP")[0].candidate
    var demCandidate = cands.filter(d => d.party == "DEM")[0].candidate


    var topline = d3.select("#toplinePhone")
        .append("svg")
        .attr("viewBox", "0 60 1000 600")

    topline
        .append("line")
        .attr("x1", 0)
        .attr("x2", 1000)
        .attr("y1", 50)
        .attr("y2", 50)
        .attr("stroke", "black")

    topline.append("text")
        .text("Chance of an upset is about the odds of...")
        .attr("y", 300)
        .attr("x", 500)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("font-size", 30)
        .style("font-weight", "100")

    topline.append("text")
        .text(events[Math.round(odds_scale(upset_odds))])
        .attr("y", 350)
        .attr("x", 500)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("font-size", 30)
        .style("font-weight", "100")

    topline.append("image")
        .attr("href", "https://projects.jhkforecasts.com/presidential-forecast/" + events[Math.round(odds_scale(upset_odds))] + ".svg")
        .attr("x", 400)
        .attr("y", 400)
        .attr("height", 200)
        .attr("width", 200)


    topline.append("text")
        .text(nf(repWin) + "%")
        .attr("y", 200)
        .attr("x", 780)
        .attr("fill", colors[0])
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "bottom")
        .attr("font-size", 40)
        .style("font-weight", "500")

    topline.append("text")
        .text("Republicans")
        .attr("y", 120)
        .attr("x", 780)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "top")
        .attr("font-size", 35)
        .style("font-weight", "100")

    topline.append("text")
        .text("Democrats")
        .attr("y", 120)
        .attr("x", 220)
        .attr("fill", "black")
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "top")
        .attr("font-size", 35)
        .style("font-weight", "100")

    topline.append("text")
        .text(nf(demWin) + "%")
        .attr("y", 200)
        .attr("x", 220)
        .attr("fill", colors[1])
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "bottom")
        .attr("font-size", 40)
        .style("font-weight", "500")

    topline.append("image")
        .attr("href", "https://jhkforecasts.com/elephant-01.png")
        .attr("x", 800)
        .attr("y", 60)
        .attr("height", 200)
        .attr("width", 200)

    topline.append("image")
        .attr("href", "https://jhkforecasts.com/donkey-01.png")
        .attr("x", 0)
        .attr("y", 60)
        .attr("height", 200)
        .attr("width", 200)

    var vote = d3.select("#votePhone")
        .append("svg")
        .attr("viewBox", "0 0 1000 " + (candidates.length * 200 + 50))

    var x3 = d3.scaleLinear()
        .domain([0, 100])
        .range([600, 980])


    var vote_dist = today
    vote_dist.sort((a, b) => b.vote - a.vote)

    vote.selectAll("rects")
        .data(vote_dist)
        .enter().append("text")
        .text(d => d.id + " " + partyAbbrev(d.party))
        .attr("x", 20)
        .attr("y", (d, i) => i * 200 + 125)
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "central")
        .attr("font-size", 25)
        .style("font-weight", "500")

    vote.selectAll("rects")
        .data(vote_dist)
        .enter()
        .append("rect")
        .attr("fill", (d, i) => partyColors(d.party))
        .attr("x", (d, i) => d.party == "REP" || d.party == 'DEM' ? x3(d.vote - ((d.vote - d.p_10) * .95)) : x3(d.vote - ((d.vote - d.p_10))))
        .attr("y", (d, i) => 25 + 200 * i)
        .attr("height", 200)
        .attr("width", (d, i) => d.party == "REP" || d.party == 'DEM' ? x3(((d.vote - d.p_10) * .95) * 2) - 600 : x3(((d.vote - d.p_10) * .75) * 3) - 600)
        .attr("opacity", .4)
        .attr("ry", 10)


    vote.selectAll("rects")
        .data(vote_dist)
        .enter()
        .append("text")
        .attr("fill", (d, i) => "black")
        .attr("x", d => 500)
        .attr("y", (d, i) => 125 + 200 * i)
        .text(d => nf(d.vote))
        .attr("dominant-baseline", "central")
        .style("font-weight", 500)
        .attr("text-anchor", "middle")
        .style("font-size", 25)


    vote.selectAll("rects")
        .data(vote_dist)
        .enter()
        .append("text")
        .attr("fill", (d, i) => partyColors(d.party))
        .attr("x", d => 400)
        .attr("y", (d, i) => 125 + 200 * i)
        .text(d => nf(d.win))
        .attr("dominant-baseline", "central")
        .style("font-weight", 500)
        .attr("text-anchor", "middle")
        .style("font-size", 25)

    vote.append("text")
        .attr("fill", (d, i) => "black")
        .attr("x", d => 400)
        .attr("y", (d, i) => 30)
        .text(d => "win")
        .attr("dominant-baseline", "central")
        .style("font-weight", 500)
        .attr("text-anchor", "middle")
        .style("font-size", 25)

    vote.append("text")
        .attr("fill", (d, i) => "black")
        .attr("x", d => 500)
        .attr("y", (d, i) => 30)
        .text(d => "vote")
        .attr("dominant-baseline", "central")
        .style("font-weight", 500)
        .attr("text-anchor", "middle")
        .style("font-size", 25)


    d3.select("#winButtonPhone").text("Win " + keyState)

    var time_data = seatData

    var lol
    var max_date = d3.max(time_data, d => d.forecastDate)
    var lineData = seatData
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

    var time = d3.select("#timePhone").append("svg")
        .attr("viewBox", "0 0 1400 1000")
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    var x = d3.scaleTime()
        .rangeRound([margin.left, width - margin.right])
        .domain([new Date(2020,7,1), new Date(2020, 10, 3)])

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
                    top: input == "win" ? d[input] : d.party == "REP" || d.party == 'DEM' ? +d.vote + (+d.p_90 - +d.vote) * .9 : +d[input] + (+d[input] + 3) / 2,
                    bottom: input == "win" ? d[input] : d.party == "REP" || d.party == 'DEM' ? +d.vote - (+d.p_90 - +d.vote) * .9 : +d[input] - (+d[input]) / 1.5,
                }
            }))
        })


        y.domain([
            0,
            input == "vote" ? d3.max(lineData, d => d.p_90) < 60 ? 60 : d3.max(lineData, d => d.p_90) : 100
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

        var votebuttonp = d3.select("#voteBPhone")
            .on("click", function () {
                update("vote", 500)
            })
    }

    polls.forEach((d, i) => {
        d.date = dateparse(d.end_date)
        d.stateIndex = d.state + ": " + d.seat_name
    })
    var polls = polls.filter(d => d.stateIndex == stateIndex)

    var pollsIndexed = d3.nest()
        .key(d => d.question_id)
        .entries(polls)

    pollsIndexed.forEach((d, i) => {
        d.repCandidate = d.values.filter(d => d.candidate_party == "REP").length == 0 ? "na" : d.values.filter(d => d.candidate_party == "REP")[0].candidate_name
        d.demCandidate = d.values.filter(d => d.candidate_party == "DEM").length == 0 ? "na" : d.values.filter(d => d.candidate_party == "DEM")[0].candidate_name
        d.pollster = d.values[0].pollster
        d.sample = d.values[0].sample_size + " " + d.values[0].population
        d.grade = d.values[0].fte_grade
        d.date = d.values[0].date
        d.values.sort((a, b) => b.pct - a.pct)
        d.leader = d.values[0].pct - d.values[1].pct == 0 ? "EVEN" : d.values[0].answer + " +" + wf(d.values[0].pct - d.values[1].pct)
        d.leaderParty = d.values[0].candidate_party
    })


    var pollsIndexed = stateIndex == "Arkansas: Class II" ? pollsIndexed : stateIndex == "Georgia: Class III" ? pollsIndexed : pollsIndexed.filter(d => d.repCandidate == repCandidate && d.demCandidate == demCandidate)

    var table = d3.select("#pollsPhone")
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
        .style("font-size", "2vw")

    header.append("td")
        .style("width", "10%")
        .append("h1")
        .text("")
        .style("font-family", "sf-mono")
        .style("font-weight", 100)
        .style("font-size", "2vw")
        .style("text-align", "center")

    header.append("td")
        .style("width", "10%")
        .append("h1")
        .text("DATE")
        .style("font-family", "sf-mono")
        .style("font-weight", 100)
        .style("font-size", "2vw")
        .style("text-align", "center")

    header.append("td")
        .style("width", "10%")
        .append("h1")
        .text("GRADE")
        .style("font-family", "sf-mono")
        .style("font-weight", 100)
        .style("font-size", "2vw")
        .style("text-align", "center")


    header.append("td")
        .style("width", "30%")
        .append("h1")
        .text("LEADER")
        .style("font-family", "sf-mono")
        .style("font-weight", 100)
        .style("font-size", "2vw")
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
            .style("font-size", "2vw")

        row.append("td")
            .style("width", "10%")
            .append("h1")
            .text(d.sample.toUpperCase())
            .style("font-family", "sf-mono")
            .style("font-weight", 100)
            .style("font-size", "2vw")
            .style("text-align", "center")
            .style("color", "gray")

        row.append("td")
            .style("width", "10%")
            .append("h1")
            .text(mf(d.date).toUpperCase())
            .style("font-family", "sf-mono")
            .style("font-weight", 100)
            .style("font-size", "2vw")
            .style("text-align", "center")
            .style("color", "black")

        row.append("td")
            .style("width", "10%")
            .append("h1")
            .text(d.grade)
            .style("font-family", "sf-mono")
            .style("font-weight", 100)
            .style("font-size", "2vw")
            .style("text-align", "center")

        row.append("td")
            .style("width", "30%")
            .append("h1")
            .text(d.leader.toUpperCase())
            .style("font-family", "sf-mono")
            .style("font-weight", 500)
            .style("font-size", "2vw")
            .style("text-align", "right")
            .style("color", partyColors(d.leaderParty))


        d.values.forEach((j, k) => {
            svg.append('text')
                .text(j.answer)
                .attr("x", 50)
                .attr("y", 40 + k * 40)
                .attr("font-size", 20)
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
                .attr("font-size", 20)
                .attr("dominant-baseline", "central")

        })


    })

}