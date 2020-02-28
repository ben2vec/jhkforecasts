var marginracephone = { top: 20, right: 20, bottom: 50, left: 30 }
var widthracephone = 1000 - marginracephone.left - marginracephone.right
var heightracephone = 900 - marginracephone.top - marginracephone.bottom

var delScale = d3.scaleLinear()
    .domain([0, 1990])
    .range(["white", "#0091FF"]);

d3.csv("delegatetime.csv", function (error, data) {
    var keys = data.columns.slice(1);

    var axisPad = 7

    var parseTime = d3.timeParse("%Y-%m-%d"),
        formatDate = d3.timeFormat("%b - %d"),
        formatMonth = d3.timeFormat("%Y-%m-%d"),
        bisectDate = d3.bisector(d => d.date).left,
        formatValue = d3.format("0.0%");

    data.forEach(function (d) {
        d.date = parseTime(d.date);

        return d;
    })

    var final_delegates = [data[18]["Biden-"], data[18]["Bloomberg-"], data[18]["Booker-"], data[18]["Buttigieg-"], data[18]["Klobuchar-"], data[18]["Sanders-"], data[18]["Steyer-"], data[18]["Warren-"], data[18]["Yang-"]]



    var col_category = ["#00C181", "#FF6060", "#a4b1b5", "#FFE130", "#FF8D32", "#0091FF", "#FF2EF0", "#AF0BFF", "#a4b1b5"]

    var cand_now = keys.map(function (d, j) {
        return {
            candidate: d,
            value: final_delegates[j],
            color: col_category[j]
        };
    });

    console.log(cand_now)

    cand_now.sort((a, b) => a.value - b.value)
    console.log(cand_now)
    var keys = cand_now.map((d) =>
        d.candidate
    )
    var color_scale = cand_now.map((d) =>
        d.color)

    var candidates = keys

    var candidates = candidates.map((d) =>
        d.slice(0, -1)
    )

    var candidates = candidates.map((d) =>
        d[0].toUpperCase() + d.substring(1)
    )

    var svg = d3.select("#racephone").append("svg")
        .attr("viewBox", "0 0 1000 900")
        .append('g')
        .attr("transform", "translate(" + marginracephone.left + "," + marginracephone.top + ")");

    var mindate = new Date(2020, 1, 1),
        maxdate = new Date(2020, 5, 6)
    demadjust = new Date(2020, 0, 4);

    var x = d3.scaleTime()
        .rangeRound([marginracephone.left, widthracephone - marginracephone.right])
        .domain([mindate, maxdate])

    var y = d3.scaleLinear()
        .rangeRound([heightracephone - marginracephone.bottom, marginracephone.top]);

    var z = d3.scaleOrdinal()
        .range(color_scale)
        ;

    var line = d3.line()
        .curve(d3.curveStepAfter)
        .x(d => x(d.date))
        .y(d => y(d.degrees));

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (heightracephone - marginracephone.bottom) + ")")
        .call(d3.axisBottom(x).tickSize(-heightracephone+marginracephone.top+marginracephone.bottom).ticks(5)
            .tickFormat(d3.timeFormat("%b")))
        .call(g => {
            var years = x.ticks(d3.timeYear.every(1))
            var xshift = 0
            g.selectAll("text")
                .style("text-anchor", "right")
                .attr("y", 12)
                .attr('fill', 'black')
                .attr('font-size', 20)
                .attr('font-weight', 800)
            g.selectAll("line")
                .attr("opacity", .5)
                .attr("stroke", "grey")
                .attr("stroke-width", 2)


            g.select(".domain")

        })




    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + marginracephone.left + ",0)");

    var focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("line").attr("class", "lineHover")
        .style("stroke", "#999")
        .attr("stroke-width", 1)
        .style("shape-rendering", "crispEdges")
        .style("opacity", 0)
        .attr("y1", -heightracephone)
        .attr("y2", -40);

    focus.append("text").attr("class", "lineHoverDate")
        .attr("text-anchor", "middle")
        .attr("font-size", 12);

    var overlay = svg.append("rect")
        .attr("class", "overlay")
        .attr("x", marginracephone.left)
        .attr("width", widthracephone - marginracephone.right - marginracephone.left)
        .attr("height", heightracephone)

    update(d3.select('#selectboxrace').property('value'), 0);

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
            d3.max(cities, d => d3.max(d.values, c => c.degrees)) > 2000 ? d3.max(cities, d => d3.max(d.values, c => c.degrees)) : 2000
        ]).nice();

        svg.append("line")
            .attr("x1", 30)
            .attr("x2", 930)
            .attr("y1", y(1990))
            .attr("y2", y(1990))
            .attr("stroke-width", 2)
            .attr("stroke", "black")

        svg.append("text")
            .attr("x", 100)
            .attr("y", y(1990) + 15)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("font-weight", 700)
            .text("1990 Delegates")


        svg.selectAll(".y-axis").transition()
            .duration(speed)
            .call(d3.axisLeft(y).tickSize(-widthracephone + marginracephone.right + marginracephone.left).ticks(5)).call(g => {
                var years = x.ticks(d3.timeYear.every(1))
                var xshift = 0
                g.selectAll("text")
                    .style("text-anchor", "end")
                    .attr("y", 0)
                    .attr('fill', 'black')
                    .attr('font-size', 20)
                    .attr('font-weight', 800)
                g.selectAll("line")
                    .attr("opacity", .5)
                    .attr("stroke", "grey")
                    .attr("stroke-width", 2)


                g.select(".domain")

            })

        var city = svg.selectAll(".cities")
            .data(cities);

        city.exit().remove();

        city.enter().insert("g", ".focus").append("path")
            .style("stroke", d => z(d.id))
            .attr("stroke-width", 5)
            .attr("fill", "none")
            .attr("d", d => line(d.values))
            .attr("opacity", .8)

        tooltip(copy);
    }

    function tooltip(copy) {
        var rect = focus.selectAll(".lineHoverRect")
            .data(copy)

        rect.enter().append("rect")
            .attr("class", "lineHoverRect")
            .attr("y", 852.5)
            .attr("x", 862.5)
            .attr("width", 75)
            .attr("height", 25)
            .attr("rx", 10)
            .attr("transform", (_, i) => "translate(" + i * -100 + ",0)")
            .merge(rect);

        var labels = focus.selectAll(".lineHoverText")
            .data(copy)

        labels.enter().append("text")
            .attr("class", "lineHoverText")
            .attr("text-anchor", "middle")
            .attr("font-size", 14)
            .attr("dx", (_, i) => i * -100 + "px")
            .merge(labels);

        var circles = focus.selectAll(".hoverCircle")
            .data(copy)

        circles.enter().append("circle")
            .attr("class", "hoverCircle")
            .style("stroke", d => z(d))
            .style("stroke-width", 4)
            .style("fill", "white")
            .attr("r", 4)
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
                .attr("transform", "translate(" + x(d.date) + "," + heightracephone + ")");

            focus.select(".lineHoverDate")
                .attr("x", x(d.date))
                .attr("y", e => y(d[e]))
                .attr("text-anchor", "start")
                .style("font-size", 12)
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
                    "translate(" + 900 + "," + 870 + ")").style("font-weight", 700)
                .text(e => d[e]);




        }
    }

    var cands = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]

    var svgLegend = svg.append('g')
        .attr('class', 'gLegend')
        .attr("transform", "translate(900,290)")

    var legend = svgLegend.selectAll('.legend')
        .data(candidates)
        .enter().append('g')
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(" + i * -100 + ",550)" })




    legend.append("text")
        .attr("class", "legend-text")
        .style("fill", d => z(d))
        .attr("text-anchor", "middle")
        .style("font-size", 20)
        .style("font-weight", 700)
        .text(d => d)

    var selectbox = d3.select("#selectboxrace")
        .on("change", function () {
            update(this.value, 750);
        })


})
