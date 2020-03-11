



var colors = ["#FF6060", "#0091FF", "#FFE130"]

d3.csv("data.csv", function (error, data) {

    var dateparse = d3.timeParse("%m/%d/%y")
    var margin = { top: 20, right: 60, bottom: 30, left: 60 }
    var width = 1000 - margin.left - margin.right
    var height = 400 - margin.top - margin.bottom
    var axisPad = 12
    
    var time_data = data.filter(d => d.state == key_state)
    time_data.forEach((d, i) => {
        d.forecast_date = dateparse(d.forecast_date)
        return
    })
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

    var today = line_data[line_data.lenth-1]
    console.log(today)
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
        .attr("x1",x(new Date(2020,10,3)))
        .attr("x2",x(new Date(2020,10,3)))
        .attr("y1",20)
        .attr("y2",(height - margin.bottom))
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        
        time.append("text")
        .text("Nov. 3rd")
        .attr("x",x(new Date(2020,10,3)))
        .attr("y",10)
        .attr("font-weight",700)
        


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
            input == "ev"?538:100
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
                .on("mouseover", ()=> focus.style("display", null))
                .on("mouseout", ()=> focus.style("display", "none"))
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
                    .text((e, i) => input == "ev"?i == 1 ? ("Biden " + onevalue(d[e])) : i == 0 ? "Trump " + onevalue(d[e])  : "Third " + onevalue(d[e]): i == 1 ? ("Biden " + onevalue(d[e]) + "%") : i == 0 ? "Trump " + onevalue(d[e]) + "%" : "Third " + onevalue(d[e]) + "%")
                    .attr("fill", (e, i) => colors[i])
                    .attr("y", e => d[e] == d["gop" + input] ? y(d["gop" + input]) > y(d["dem" + input]) ? y(d["gop" + input]) + 15 : y(d["gop" + input]) - 15 : d[e] == d["dem" + input] ? y(d["dem" + input]) > y(d["gop" + input]) ? y(d["dem" + input]) + 15 : y(d["dem" + input]) - 15 : y(d[e]) - 15)
                    .attr("text-anchor", "start")
                    .attr("dominant-baseline", "middle")
            }
        }
    }
    var winbutton = d3.select("#winbutton")
        .on("change", function () {
            click("win", 500)
        })

    var votebutton = d3.select("#votebutton")
        .on("click", function () {
            update("vote", 500)
        })
        var evbutton = d3.select("#evbutton")
        .on("click", function () {
            update("ev", 500)
        })

})

