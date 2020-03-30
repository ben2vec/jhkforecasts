var parseTime = d3.timeParse("%m/%d/%Y"),
    formatDate = d3.timeFormat("%b - %d"),
    formatMonth = d3.timeFormat("%Y-%m-%d"),
    bisectDate = d3.bisector(d => d.date).left,
    wholevalue = d3.format(".0f"),
    onevalue = d3.format(".1f")

var colors = ["#0091FF", "#FF0660"]

d3.csv("Trump-approval.csv", data => {
    var margin = { top: 20, right: 40, bottom: 20, left: 20 }
    var width = 1100 - margin.left - margin.right
    var height = 450 - margin.top - margin.bottom
    var axisPad = 12

    var data = data.map((d, i) => {
        return {
            date: parseTime(d.date),
            day: i + 5,
            approve: +d.approve,
            disapprove: +d.disapprove
        }
    })
    console.log(data)
    var today = data[data.length - 1]
    var max_date = d3.max(data, d => d.date)
    console.log(max_date)
    var time = d3.select("#time").append("svg")
        .attr("viewBox", "0 0 1100 450")
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var x = d3.scaleTime()
        .rangeRound([margin.left, width - margin.right])
        .domain([new Date(2017, 0, 22), new Date(2020, 10, 3)])

    var y = d3.scaleLinear()
        .rangeRound([height - margin.bottom, margin.top]);


    var z = d3.scaleOrdinal()
        .range(colors)
        ;

    var line = d3.line()
        .curve(d3.curveBasis)
        .x(d => x(d.date))
        .y(d => y(d.pct));

    time.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(x).tickSize(-370).ticks(5)
            .tickFormat(d3.timeFormat("%Y")))
        .call(g => {
            var years = x.ticks(d3.timeYear.every(1))
            var xshift = 0
            g.selectAll("text")
                .style("text-anchor", "right")
                .attr("y", axisPad)
                .attr('fill', 'black')
                .attr('font-size', 15)
                .attr('font-weight', 500)
            g.selectAll("line")
                .attr("opacity", .5)
                .attr("stroke", "grey")


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

    var keys = ["approve", "disapprove"]
    update("", 0);


    function update(input, speed) {

        var copy = keys.filter(f => f.includes(input))
        var cities = copy.map(function (id) {
            return {
                id: id,
                values: data.map(d => { return { date: d.date, pct: +d[id] } })
            };
        });
        y.domain([
            20,
            80
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
                    .attr("opacity", .5)
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
            .style("stroke-width", 3)
            .style("opacity", .9)
            .merge(city)
            .transition().duration(speed)
            .attr("d", d => line(d.values))




        tooltip(copy);

        function tooltip(copy) {
            var rect = focus.selectAll(".lineHoverRect")
                .data(copy)




            var labels = focus.selectAll(".lineHoverText")
                .data(copy)

            labels.enter().append("text")
                .attr("class", "lineHoverText")
                .attr("font-size", 20)
                .merge(labels)

            var labels2 = focus.selectAll(".lineHoverText2")
                .data(copy)

            labels2.enter().append("text")
                .attr("class", "lineHoverText")
                .attr("font-size", 20)
                .attr("stroke", "black")
                .attr("stroke-width", 5)
                .merge(labels2)

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
                    i = bisectDate(data, x0, 1),
                    d0 = data[i - 1],
                    d1 = data[i],
                    d = x0 - d0.date > d1.date - x0 ? d1 : d0;



                focus.selectAll(".hoverCircle")
                    .attr("cy", e => y(d[e]))
                    .attr("cx", x(d.date));

                focus.selectAll(".lineHoverText2")
                    .style("font-weight", 700)
                    .attr("x", x(d.date) + 10)
                    .text((e, i) => input == "ev" ? i == 1 ? ("Disapprove " + onevalue(d[e])) : i == 0 ? "Approve " + onevalue(d[e]) : "Third " + onevalue(d[e]) : i == 1 ? ("Disapprove " + onevalue(d[e]) + "%") : i == 0 ? "Approve " + onevalue(d[e]) + "%" : "Third " + onevalue(d[e]) + "%")
                    .attr("fill", (e, i) => "white")
                    .attr("y", e => y(d[e]))
                    .attr("text-anchor", (e, i) => i == 1 ? "end" : "start")
                    .attr("dominant-baseline", "middle")

                focus.selectAll(".lineHoverText")
                    .style("font-weight", 700)
                    .attr("x", x(d.date) + 10)
                    .text((e, i) => input == "ev" ? i == 1 ? ("Disapprove " + onevalue(d[e])) : i == 0 ? "Approve " + onevalue(d[e]) : "Third " + onevalue(d[e]) : i == 1 ? ("Disapprove " + onevalue(d[e]) + "%") : i == 0 ? "Approve " + onevalue(d[e]) + "%" : "Third " + onevalue(d[e]) + "%")
                    .attr("fill", (e, i) => colors[i])
                    .attr("y", e => y(d[e]))
                    .attr("text-anchor", (e, i) => i == 1 ? "end" : "start")
                    .attr("dominant-baseline", "middle")




                focus.select(".lineHoverDate")
                    .attr("x", x(d.date))
                    .attr("y", 0)
                    .style("font-size", 15)
                    .style("font-weight", 700)
                    .text(formatDate(d.date));
            }
        }

    }

})