

// vote time

var marginph = { top: 20, right: 100, bottom: 30, left: 30 }
var widthph = 1000 - marginph.left - marginph.right
var heightph = 800 - marginph.top - marginph.bottom
var axisPad = 12
var demScale = d3.scaleLinear()
    .domain([0, 50])
    .range(["white", "#0091FF"]);




d3.csv("time.csv", function (error, data) {
    var keys = data.columns.slice(1);

    var data = data.filter(d => d.state == keyState);

    var datatype = "del"



    var parseTime = d3.timeParse("%Y-%m-%d"),
        formatDate = d3.timeFormat("%b - %d"),
        formateTime = d3.timeFormat("%Y-%m-%d"),
        bisectDate = d3.bisector(d => d.date).left,
        formatValue = d3.format("0.0%");

    data.forEach(function (d) {
        d.date = parseTime(d.forecastdate);
        d.primarydate = parseTime(d.primarydate);
        return d;
    })

    var maxdate = d3.max(data, d => d.primarydate)

    var newest_day = d3.max(data, d => d.date)

    var data = data.filter(d => d.date <= maxdate)

    var newest_data = data.filter(d => d.date == d3.max(data, d => d.date))

    var keys = keys.filter(f => f.includes(datatype))

    var col_category = ["#00C181", "#FF6060", "#a4b1b5", "#FFE130", "#FF8D32", "#0091FF", "#FF2EF0", "#AF0BFF", "#a4b1b5"]

    var cand_now = keys.map(function (d, j) {
        return {
            candidate: d,
            value: newest_data.map((i) => +i[d]),
            color: col_category[j]
        };
    });

    cand_now.sort((a, b) => a.value - b.value)

    var keys = cand_now.map((d) =>
        d.candidate
    )
    var color_scale = cand_now.map((d) =>
        d.color
    )

    var candidates = keys

    var candidates = candidates.map((d) =>
        d.slice(0, -3)
    )

    var candidates = candidates.map((d) =>
        d[0].toUpperCase() + d.substring(1)
    )

    //today
    var now = d3.max(data, d => d.forecastdate)

    var nowarray = data.filter(function (d) { return d.forecastdate == now; });

    var copytwo = keys.filter(f => f.includes(datatype))

    var asoftoday = copytwo.map(function (id) {
        return {
            values: nowarray.map(d => { return +d[id] })
        };
    });




    var svg = d3.select("#delegatesphone").append("svg")
        .attr("viewBox", "0 0 1000 800")
        .append('g')
        .attr("transform", "translate(" + marginph.left + "," + margin.top + ")");





    var mindate = new Date(2019, 5, 1),
        maxdate = d3.max(data, d => d.primarydate),
        demadjust = new Date(2020, 0, 4);

    var x = d3.scaleTime()
        .rangeRound([marginph.left, width - marginph.right])
        .domain([mindate, maxdate])

    var y = d3.scaleLinear()
        .rangeRound([heightph - marginph.bottom, marginph.top]);


    var z = d3.scaleOrdinal()
        .range(color_scale)
        ;

    var line = d3.line()
        .curve(d3.curveStepAfter)
        .x(d => x(d.date))
        .y(d => y(d.degrees));

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (heightph - marginph.bottom) + ")")
        .call(d3.axisBottom(x).ticks(6)
            .tickFormat(d3.timeFormat("%b")))
            .call(d3.axisBottom(x).tickSize(-700)
            .tickFormat(d3.timeFormat("%b")))
        .call(g => {
            var years = x.ticks(d3.timeYear.every(1))
            var xshift = 0
            g.selectAll("text")
                .style("text-anchor", "middle")
                .attr("y", axisPad)
                .attr('fill', 'black')
                .attr('font-size', 15)
                .attr('font-weight', 800)
                .attr("transform",)

            g.selectAll("line") .attr("opacity",.5)
            .attr("stroke","grey")


            g.select(".domain")

        })

    demadjust = new Date(2020, 0, 4);

    


    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + marginph.left + ",0)");

    var focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("line").attr("class", "lineHover")
        .style("stroke", "#999")
        .attr("stroke-width", 1)
        .style("shape-rendering", "crispEdges")
        .style("opacity", 0)
        .attr("y1", -heightph)
        .attr("y2", -40);

    focus.append("text").attr("class", "lineHoverDate")
        .attr("text-anchor", "middle")
        .attr("font-size", 12);

    var overlay = svg.append("rect")
        .attr("class", "overlay")
        .attr("x", marginph.left)
        .attr("width", x(newest_day) - marginph.left)
        .attr("height", heightph)

    update(datatype, 0);


    function update(input, speed) {

        var copy = keys.filter(f => f.includes(input))

        var cities = copy.map(function (id) {
            return {
                id: id,
                values: data.map(d => { return { date: d.date, degrees: +d[id] } })
            };
        });

        y.domain([
            d3.min(cities, d => d3.min(d.values, c => c.degrees)),
            d3.max(cities, d => d3.max(d.values, c => c.degrees))
        ]).nice();

        svg.selectAll(".y-axis").transition()
            .duration(speed)
            .call(d3.axisLeft(y).tickSize(-widthph + marginph.right + marginph.left).ticks(5)).call(g => {
                var years = x.ticks(d3.timeYear.every(1))
                var xshift = 0
                g.selectAll("text")
                    .style("text-anchor", "right")
                    .attr("y", 0)
                    .attr('fill', 'black')
                    .attr('font-size', 15)
                    .attr('font-weight', 800)
                g.selectAll("line")
                .attr("opacity",.5)
                .attr("stroke","grey")


                g.select(".domain")

            })

        var city = svg.selectAll(".cities")
            .data(cities);

        city.exit().remove();

        city.enter().insert("g", ".focus").append("path")
            .attr("class", "line cities")
            .style("stroke", d => z(d.id))
            .style("stroke-width",4)
            .style("opacity", d => z(d.id) == "#a4b1b5" ? .3 : .8)
            .merge(city)
            .transition().duration(speed)
            .attr("d", d => line(d.values))

        // var results = final_results[0]

        // console.log(results)


        tooltip(copy);
    }

    function tooltip(copy) {
        var rect = focus.selectAll(".lineHoverRect")
            .data(copy)

        rect.enter().append("rect")
            .attr("class", "lineHoverRect")
            .attr("y", 572.5)
            .attr("x", 865)
            .attr("width", 75)
            .attr("height", 25)
            .attr("rx", 10)
            .attr("transform", (_, i) => "translate(0," + i * -50 + ")")
            .merge(rect);

        var labels = focus.selectAll(".lineHoverText")
            .data(copy)

        labels.enter().append("text")
        .attr("y", 150)
        .attr("x", 2.5)
            .attr("class", "lineHoverText")
            .attr("text-anchor", "middle")
            .attr("font-size", 18)
            .attr("dy", (_, i) => 1 + i * -50 + "px")
            
            .merge(labels);







        var circles = focus.selectAll(".hoverCircle")
            .data(copy)

        circles.enter().append("circle")
            .attr("class", "hoverCircle")
            .style("stroke", d => z(d))
            .style("stroke-width", 3)
            .style("fill", "white")
            .attr("r", 3)
            .merge(circles);

        svg.selectAll(".overlay")
            .on("mouseover", function () { focus.style("display", null); })
            .on("mouseout", function () { focus.style("display", "display"); })
            .on("mousemove", mousemove);

        function mousemove() {

            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;

            focus.select(".lineHover")
                .attr("transform", "translate(" + x(d.date) + "," + height + ")");

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

            focus.selectAll(".lineHoverRect")
                .style("fill", e => delScale(d[e]))
                ;

            focus.selectAll(".lineHoverText")
                .attr("transform",
                    "translate(" + 900 + "," + 440 + ")").style("font-weight", 700)
                .text(e => d[e] == "" ? "-" : d[e]);




        }
    }



    var svgLegend = svg.append('g')
        .attr('class', 'gLegend')
        .attr("transform", "translate(100,390)")

    var legend = svgLegend.selectAll('.legend')
        .data(candidates)
        .enter().append('g')
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(720," + i * -50 + ")" })


    legend.append("text")
        .attr("class", "legend-text")
        .attr("y", 197.5)
        .style("fill", d => z(d))
        .attr("text-anchor", "middle")
        .style("font-size", 18)
        .style("font-weight", 700)
        .text(d => d)
        .attr("dominant-baseline","middle")

    svg.append("text")
        .attr("x", 900)
        .attr("y", 100)
        .attr("text-anchor", "middle")
        .style("font-size", 15)
        .style("font-weight", 700)
        .text("Projected Delegates")
   








})

