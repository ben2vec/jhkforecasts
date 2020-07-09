var dateparse = d3.timeParse("%m/%d/%y")
var colors = ["#FF6060", "#0091FF", "#FFE130", "#C473F6", "#31DE70"]
var nf = d3.format(".1f")
var category = ["REP", "DEM", "LIB", "IND", "GRN"]

var cand_colors = d3.scaleOrdinal()
    .domain(category)
    .range(colors)
var tformat = d3.timeFormat("%m/%d/%Y")
var timeformat = d3.timeFormat("%m/%d/%y")
var dateparse = d3.timeParse("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
var nf = d3.format(".1f")
var updated_format = d3.timeFormat("%b. %d %Y %I:%M %p")

d3.csv("https://data.jhkforecasts.com/senate-candidates.csv", candidates => {
    d3.csv("https://data.jhkforecasts.com/2020-senate-input.csv", input_data => {
        d3.csv("https://data.jhkforecasts.com/2020-senate.csv", data => {
            data.forEach((d, i) => {
                d.date = dateparse(d.forecast_date)
            })
            var data = data.filter(d => d.state_index == key_state)
            var state = key_state == "Georgia: Class III"?"Georgia Special":  key_state.split(":")[0]
            document.getElementById("stateTitle").innerHTML = state
            document.getElementById("winbutton").innerHTML = "Win " + state

            var cands = candidates.filter(d => d.state_index == key_state)

            var today = data.slice(data.length - cands.length, data.length)
            today.sort((a, b) => b.vote - a.vote)

            var rep_win = d3.sum(today.filter(d => d.party == "REP"), d => d.win)
            var dem_win = d3.sum(today.filter(d => d.party == "DEM"), d => d.win)
            var upset_odds = rep_win > dem_win ? dem_win : rep_win

            document.getElementById("stateTitle").style.backgroundColor = rep_win > dem_win ? colors[0] : colors[1]

            var topline = d3.select("#topline").append("svg")
                .attr("viewBox", "0 0 1000 100")

            topline.append("text")
                .text("Chance of an upset is about the odds of...")
                .attr("y", 20)
                .attr("x", 400)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-size", 12)
                .attr("font-weight", "500")

            topline.append("text")
                .text(events[Math.round(odds_scale(upset_odds))])
                .attr("y", 40)
                .attr("x", 400)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-size", 15)
                .attr("font-weight", "500")


            topline.append("image")
                .attr("href", "https://projects.jhkforecasts.com/presidential-forecast/" + events[Math.round(odds_scale(upset_odds))] + ".svg")
                .attr("x", 562.5)
                .attr("y", 0)
                .attr("height", 75)
                .attr("width", 75)

            topline.append("image")
                .attr("href", "https://jhkforecasts.com/elephant-01.png")
                .attr("x", 900)
                .attr("y", 0)
                .attr("height", 75)
                .attr("width", 75)

            topline.append("image")
                .attr("href", "https://jhkforecasts.com/donkey-01.png")
                .attr("x", 25)
                .attr("y", 0)
                .attr("height", 75)
                .attr("width", 75)

            topline.append("text")
                .text("Democrats")
                .attr("x", 105)
                .attr("y", 20)
                .attr("dominant-baseline", "top")
                .attr("text-anchor", "start")
                .attr("font-size", "23")

            topline.append("text")
                .text("Republicans")
                .attr("x", 895)
                .attr("y", 20)
                .attr("dominant-baseline", "top")
                .attr("text-anchor", "end")
                .attr("font-size", "23")


            topline.append("text")
                .text(nf(rep_win) + "%")
                .attr("x", 895)
                .attr("y", 60)
                .attr("dominant-baseline", "bottom")
                .attr("text-anchor", "end")
                .attr("font-size", "23")
                .attr("fill", colors[0])
                .style("font-weight", 100)

            topline.append("text")
                .text(nf(dem_win) + "%")
                .attr("x", 105)
                .attr("y", 60)
                .attr("dominant-baseline", "bottom")
                .attr("text-anchor", "start")
                .attr("font-size", "23")
                .attr("fill", colors[1])
                .style("font-weight", 100)

            var vote = d3.select("#vote").append("svg")
                .attr("viewBox", "0 0 1000 " + (cands.length * 100 + 50))
            var vote_scale = d3.scaleLinear()
                .domain([0, 100])
                .range([0, 650])

            var pct = [0, 25, 50, 75, 100]

            vote.selectAll("seats")
                .data(pct)
                .enter()
                .append("line")
                .attr("x1", d => 330 + vote_scale(d))
                .attr("x2", d => 330 + vote_scale(d))
                .attr("y1", 57.5)
                .attr("y2", 57.5 + 525)
                .attr("stroke", "lightgrey")

            vote.selectAll("seats")
                .data(pct)
                .enter()
                .append("text")
                .text(d => d)
                .attr("y", 40)
                .attr("x", d => 330 + vote_scale(d))
                .attr("fill", "#afafaf")
                .attr("font-weight", "500")
                .style("font-size", "15")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")

            vote.append("text")
                .text("Win")
                .attr("x", 305)
                .attr("y", 10)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "end")
                .attr("font-size", "18")
                .attr("fill", "black")
                .style("font-weight", 100)

            vote.append("text")
                .text("Candidate")
                .attr("x", 20)
                .attr("y", 10)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "start")
                .attr("font-size", "18")
                .attr("fill", "black")
                .style("font-weight", 100)

            vote.append("text")
                .text("Projected Vote")
                .attr("x", 330 + vote_scale(50))
                .attr("y", 10)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "middle")
                .attr("font-size", "18")
                .attr("fill", "black")
                .style("font-weight", 100)

            vote.selectAll("bars")
                .data(today)
                .enter()
                .append("rect")
                .attr("x", d => 330 + vote_scale(d.p_10))
                .attr("y", (d, i) => 55 + i * 100)
                .attr("height", 90)
                .attr("width", d => vote_scale(d.p_90) - vote_scale(d.p_10))
                .attr("fill", d => cand_colors(d.party))
                .attr("opacity", .5)
                .attr("ry", 5)

            vote.selectAll("bars")
                .data(today)
                .enter()
                .append("rect")
                .attr("x", d => 330 + vote_scale(d.vote) - 5)
                .attr("y", (d, i) => 95 + i * 100)
                .attr("height", 10)
                .attr("width", 10)
                .attr("fill", d => cand_colors(d.party))
                .attr("stroke", "white")
                .attr("stroke-width", 2)
                .attr("ry", 3)


            vote.selectAll("vote")
                .data(today)
                .enter()
                .append("text")
                .text(d => nf(d.vote))
                .attr("x", d => 330 + vote_scale(d.vote))
                .attr("y", (d, i) => i * 100 + 80)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "middle")
                .attr("font-size", "15")
                .attr("fill", "black")
                .style("font-weight", 100)

            vote.selectAll("vote")
                .data(today)
                .enter()
                .append("text")
                .text(d => nf(d.win))
                .attr("x", 305)
                .attr("y", (d, i) => i * 100 + 100)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "end")
                .attr("font-size", "15")
                .attr("fill", d => cand_colors(d.party))
                .style("font-weight", 100)

            vote.selectAll("vote")
                .data(today)
                .enter()
                .append("text")
                .text(d => d.candidate + " (" + d.party.substring(0, 1) + ")")
                .attr("x", 20)
                .attr("y", (d, i) => i * 100 + 100)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "start")
                .attr("font-size", "15")
                .attr("fill", d => cand_colors(d.party))
                .style("font-weight", 100)

            var voteCalc = d3.select("#voteCalc").append("svg")
                .attr("viewBox", "0 0 1000 500")

            var category = ["Polling", "Fundamentals", "Experts", "Projected Vote"]

            today.forEach((d, i) => {
                var candidate = d.candidate.split(" ")
                d.label = d.candidate == "" ? d.party : candidate[candidate.length - 1]
            })

            var margins = [
                d3.sum(today.filter(d => d.party == "REP"), d => d.poll_avg) - d3.sum(today.filter(d => d.party == "DEM"), d => d.poll_avg),
                d3.sum(today.filter(d => d.party == "REP"), d => d.fund_avg) - d3.sum(today.filter(d => d.party == "DEM"), d => d.fund_avg),
                d3.sum(today.filter(d => d.party == "REP"), d => d.exp_avg) - d3.sum(today.filter(d => d.party == "DEM"), d => d.exp_avg),
                d3.sum(today.filter(d => d.party == "REP"), d => d.vote) - d3.sum(today.filter(d => d.party == "DEM"), d => d.vote),
            ]
            var startX = 900 - cands.length * 100
            var fill_scale = d3.scaleLinear()
                .domain([0, 100])
                .range([0, 1])

            var spread = 800 / today.length

            voteCalc.selectAll("vote")
                .data(category)
                .enter()
                .append("text")
                .text(d => d)
                .attr("x", 20)
                .attr("y", (d, i) => i * 75 + 112.5)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "start")
                .attr("font-size", "25")
                .attr("fill", "black")
                .style("font-weight", 100)

            voteCalc.selectAll("vote")
                .data(margins)
                .enter()
                .append("text")
                .text(d => d == 0 ? "" : d > 0 ? "R +" + nf(d) : "D +" + nf(-d))
                .attr("x", 950)
                .attr("y", (d, i) => i * 75 + 112.5)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "middle")
                .attr("font-size", "20")
                .attr("fill", d => d == 0 ? "black" : d > 0 ? colors[0] : colors[1])
                .style("font-weight", 100)


            voteCalc.selectAll("vote")
                .data(today)
                .enter()
                .append("text")
                .text(d => d.label)
                .attr("y", 50)
                .attr("x", (d, i) => i * 100 + startX + 50)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "middle")
                .attr("font-size", "15")
                .attr("fill", "black")
                .style("font-weight", 100)

            voteCalc.selectAll("vote")
                .data(today)
                .enter()
                .append("rect")
                .attr("fill", d => cand_colors(d.party))
                .attr("opacity", d => fill_scale(d.poll_avg))
                .attr("y", 75)
                .attr("x", (d, i) => i * 100 + startX)
                .attr("width", 100)
                .attr("height", 75)


            voteCalc.selectAll("vote")
                .data(today)
                .enter()
                .append("rect")
                .attr("fill", d => cand_colors(d.party))
                .attr("opacity", d => fill_scale(d.fund_avg))
                .attr("y", 150)
                .attr("x", (d, i) => i * 100 + startX)
                .attr("width", 100)
                .attr("height", 75)

            voteCalc.selectAll("vote")
                .data(today)
                .enter()
                .append("rect")
                .attr("fill", d => cand_colors(d.party))
                .attr("opacity", d => fill_scale(d.exp_avg))
                .attr("y", 225)
                .attr("x", (d, i) => i * 100 + startX)
                .attr("width", 100)
                .attr("height", 75)

            voteCalc.selectAll("vote")
                .data(today)
                .enter()
                .append("rect")
                .attr("fill", d => cand_colors(d.party))
                .attr("opacity", d => fill_scale(d.vote))
                .attr("y", 300)
                .attr("x", (d, i) => i * 100 + startX)
                .attr("width", 100)
                .attr("height", 75)

            voteCalc.selectAll("vote")
                .data(today)
                .enter()
                .append("text")
                .text(d => nf(d.poll_avg))
                .attr("y", 112.5)
                .attr("x", (d, i) => i * 100 + startX + 50)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "middle")
                .attr("font-size", "25")
                .attr("fill", "black")
                .style("font-weight", 100)


            voteCalc.selectAll("vote")
                .data(today)
                .enter()
                .append("text")
                .text(d => nf(d.fund_avg))
                .attr("y", 187.5)
                .attr("x", (d, i) => i * 100 + startX + 50)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "middle")
                .attr("font-size", "25")
                .attr("fill", "black")
                .style("font-weight", 100)

            voteCalc.selectAll("vote")
                .data(today)
                .enter()
                .append("text")
                .text(d => nf(d.exp_avg))
                .attr("y", 262.5)
                .attr("x", (d, i) => i * 100 + startX + 50)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "middle")
                .attr("font-size", "25")
                .attr("fill", "black")
                .style("font-weight", 100)

            voteCalc.selectAll("vote")
                .data(today)
                .enter()
                .append("text")
                .text(d => nf(d.vote))
                .attr("y", 337.5)
                .attr("x", (d, i) => i * 100 + startX + 50)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "middle")
                .attr("font-size", "25")
                .attr("fill", "black")
                .style("font-weight", 100)

            voteCalc.selectAll('vote')
                .data(category)
                .enter()
                .append("line")
                .attr("x1", startX - 25)
                .attr("x2", 1000)
                .attr("y1", (d, i) => 75 + i * 75)
                .attr("y2", (d, i) => 75 + i * 75)
                .attr("stroke", "lightgrey")


            var cands_unique = cands.map((d, i) => {
                return d.candidate
            })

            var cands_party = cands.map((d, i) => {
                return d.party
            })

            var data_length = data.filter(d => d.party == "REP").length
            var max_date = d3.max(data, d => d.date)
            var line_data = data.map(d => {
                return d.forecast_date
            })
            var line_data = new Set(line_data)
            var lineData = [...line_data]
            var line_data = lineData.map((d, i) => {
                return {
                    date: d
                }
            })

            var keys = []
            line_data.forEach((d, i) => {
                var date = d.date
                var ds = data.filter(d => d.forecast_date == date)
                for (let a = 0; a < cands.length; a++) {
                    var candidate = cands[a].candidate
                    var party = cands[a].party
                    var id = candidate == "" ? party : candidate
                    var vote = candidate == "" ? ds.filter(d => d.party == party)[0].vote : ds.filter(d => d.candidate == candidate)[0].vote
                    var win = candidate == "" ? ds.filter(d => d.party == party)[0].win : ds.filter(d => d.candidate == candidate)[0].win
                    d[id + "win"] = +win
                    d[id + "vot"] = +vote
                    keys.push(id + "win")
                    keys.push(id + "vot")
                }
                d.date = dateparse(d.date)
            })
            var keys = new Set(keys)
            var keys = [...keys]

            var parseTime = d3.timeParse("%Y-%m-%d"),
                formatDate = d3.timeFormat("%b - %d"),
                formatMonth = d3.timeFormat("%Y-%m-%d"),
                bisectDate = d3.bisector(d => d.date).left,
                wholevalue = d3.format(".0f"),
                onevalue = d3.format(".1f")


            var margin = { top: 20, right: 80, bottom: 20, left: 80 }
            var width = 1400 - margin.left - margin.right
            var height = 600 - margin.top - margin.bottom
            var axisPad = 12
            var time = d3.select("#timePhone").append("svg")
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
                .curve(d3.curveLinear)
                .x(d => x(d.date))
                .y(d => y(d.pct));

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
                        .attr("opacity", .4)
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
                .attr("x", x(new Date(2020, 10, 3)) - 10)
                .attr("y", 10)
                .attr("font-weight", "500")
                .attr("font-size", 20)



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

            update("win", 0);


            function update(input, speed) {

                var copy = keys.filter(f => f.includes(input))
                var cities = copy.map(function (id) {
                    var candidate = id
                    var subs = id.substring(0, 3)
                    console.log
                    return {
                        candidate: id,
                        party: (id.substring(0, 3) == "REP" || id.substring(0, 3) == "DEM" || id.substring(0, 3) == "IND" || id.substring(0, 3) == "LIB" || id.substring(0, 3) == "GRN") ? id.substring(0, 3) : cands_party[cands_unique.indexOf(id.substring(0, id.length - 3))],
                        values: line_data.map(d => { return { date: d.date, pct: +d[id] } })
                    };
                });
                console.log(cities)
                y.domain([
                    0, 100
                ]).nice();

                time.selectAll(".y-axis").transition()
                    .duration(speed)
                    .call(d3.axisLeft(y).tickSize(-1080).ticks(5)).call(g => {
                        var years = x.ticks(d3.timeYear.every(1))
                        var xshift = 0
                        g.selectAll("text")
                            .style("text-anchor", "right")
                            .attr("x", -20)
                            .attr('fill', 'black')
                            .attr('font-size', 20)
                            .attr('font-weight', 500)
                        g.selectAll("line")
                            .attr("opacity", .4)
                            .attr("stroke", "grey")


                        g.select(".domain")
                            .attr("opacity", 0)


                    })

                var city = time.selectAll(".cities")
                    .data(cities);

                city.exit().remove();

                city.enter().insert("g", ".focus").append("path")
                    .attr("class", "line cities")
                    .style("stroke", (d, i) => cand_colors(d.party))
                    .style("stroke-width", 5)
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
                        .attr("font-size", 25)
                        .style("fill", "white")
                        .style("stroke", "white")
                        .style("stroke-width", 8)
                        .merge(labels2)

                    var labels = focus.selectAll(".lineHoverText")
                        .data(copy)

                    labels.enter().append("text")
                        .attr("class", "lineHoverText")
                        .attr("font-size", 25)
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
                            .style("font-size", 18)
                            .attr("font-weight", "500")
                            .text(formatDate(d.date));

                        focus.selectAll(".hoverCircle")
                            .attr("cy", e => y(d[e]))
                            .attr("cx", x(d.date))
                            .style("stroke", (e, i) => (e.substring(0, e.length - 3) == "REP" || e.substring(0, e.length - 3) == "DEM" || e.substring(0, e.length - 3) == "IND" || e.substring(0, e.length - 3) == "GRN" || e.substring(0, e.length - 3) == "LIB") ? cand_colors(e.substring(0, e.length - 3)) : cand_colors(cands_party[cands_unique.indexOf(e.substring(0, e.length - 3))]))

                        focus.selectAll(".lineHoverText2")
                            .attr("font-weight", "500")
                            .attr("x", (e, i) => i % 2 == 0 ? x(d.date) + 5 : x(d.date) - 5)
                            .text((e, i) => {
                                var name = e.split(" ")[e.split(" ").length - 1]
                                return name.substring(0, name.length - 3) + " " + nf(d[e])
                            })
                            .attr("fill", "black")
                            .attr("y", e => y(d[e]))
                            .attr("dominant-baseline", "middle")
                            .attr("text-anchor", (e, i) => i % 2 == 0 ? "start" : "end")

                        focus.selectAll(".lineHoverText")
                            .style("font-weight", "100")
                            .attr("x", (e, i) => i % 2 == 0 ? x(d.date) + 5 : x(d.date) - 5)
                            .text((e, i) => {
                                var name = e.split(" ")[e.split(" ").length - 1]
                                return name.substring(0, name.length - 3) + " " + nf(d[e])
                            })
                            .style("fill", (e, i) => (e.substring(0, e.length - 3) == "REP" || e.substring(0, e.length - 3) == "DEM" || e.substring(0, e.length - 3) == "IND" || e.substring(0, e.length - 3) == "GRN" || e.substring(0, e.length - 3) == "LIB") ? cand_colors(e.substring(0, e.length - 3)) : cand_colors(cands_party[cands_unique.indexOf(e.substring(0, e.length - 3))]))
                            .attr("y", e => y(d[e]))
                            .attr("dominant-baseline", "middle")
                            .attr("text-anchor", (e, i) => i % 2 == 0 ? "start" : "end")





                    }
                }
                var winbuttonPhone = d3.select("#winbutton")
                    .on("click", function () {
                        update("win", 500)
                    })

                var votebuttonPhone = d3.select("#votebutton")
                    .on("click", function () {
                        update("vot", 500)
                    })

            }
        })
    })
})