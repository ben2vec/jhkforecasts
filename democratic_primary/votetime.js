var margin = { top: 20, right: 20, bottom: 100, left: 30 }
var width = 1000 - margin.left - margin.right
var height = 550 - margin.top - margin.bottom

var demScale = d3.scaleLinear()
    .domain([0, 50])
    .range(["white", "#0091FF"]);

d3.csv("time.csv", function (error, data) {
    var keys = data.columns.slice(1);

    var data = data.filter(function (d) { return d.state == keyState; });

    var datatype = "vote"

    var parseTime = d3.timeParse("%Y-%m-%d"),
        formatDate = d3.timeFormat("%b - %d"),
        formatMonth = d3.timeFormat("%Y-%m-%d"),
        bisectDate = d3.bisector(d => d.date).left,
        formatValue = d3.format("0.0%");

    data.forEach(function (d) {
        d.date = parseTime(d.forecastdate);
        d.primarydate = parseTime(d.primarydate);
        return d;
    })



    //today
    var now = d3.max(data, d => d.forecastdate)

    var nowarray = data.filter(function (d) { return d.forecastdate == now; });

    var copytwo = keys.filter(f => f.includes(datatype))

    var asoftoday = copytwo.map(function (id) {
        return {
            values: nowarray.map(d => { return +d[id] })
        };
    });


    console.log(now)
    console.log(nowarray)
    console.log(asoftoday)

    console.log(data)

    var svg = d3.select("#vote").append("svg")
        .attr("viewBox", "0 0 1000 550")
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var svgnow = svg.append('g')
        .attr('class', 'gnow')
        .attr("transform", "translate(100,450)")

    var nowv = svgnow.selectAll('.now')
        .data(asoftoday)
        .enter().append('g')
        .attr("class", "now")
        .attr("transform", function (d, i) { return "translate(" + i * 100 + ",0)" })

    nowv.append("rect")
        .attr("y", -17.5)
        .attr("x", -37.5)
        .attr("width", 75)
        .attr("height", 25)
        .attr("rx", 10)
        .attr("fill", d => demScale(d.values))

    nowv.append("text")
        .attr("class", "now-text")
        .style("fill", "Black")
        .attr("text-anchor", "middle")
        .style("font-size", 14)
        .style("font-weight", 700)
        .text(d => d.values + "%")
    //one month ago
    now = parseTime(now)

    var monthago = formatMonth(d3.utcMonth.offset(now, -1))

    var montharray = data.filter(function (d) { return d.forecastdate == monthago; });

    var copythree = keys.filter(f => f.includes(datatype))

    var onemonthago = copythree.map(function (id) {
        return {
            values: montharray.map(d => { return +d[id] })
        };
    });

    console.log(monthago)
    console.log(montharray)
    console.log(onemonthago)

    
    var svgmonth = svg.append('g')
        .attr('class', 'gmonth')
        .attr("transform", "translate(100,480)")

    var monthv = svgmonth.selectAll('.now')
        .data(onemonthago)
        .enter().append('g')
        .attr("class", "month")
        .attr("transform", function (d, i) { return "translate(" + i * 100 + ",0)" })

    monthv.append("rect")
        .attr("y", -17.5)
        .attr("x", -37.5)
        .attr("width", 75)
        .attr("height", 25)
        .attr("rx", 10)
        .attr("fill", d => demScale(d.values))

    monthv.append("text")
        .attr("class", "now-text")
        .style("fill", "Black")
        .attr("text-anchor", "middle")
        .style("font-size", 14)
        .style("font-weight", 700)
        .text(d => d.values + "%")



    var mindate = new Date(2019, 5, 1),
        maxdate = d3.max(data, d => d.primarydate)
    demadjust = new Date(2020, 0, 4);

    var x = d3.scaleTime()
        .rangeRound([margin.left, width - margin.right])
        .domain([mindate, maxdate])

    var y = d3.scaleLinear()
        .rangeRound([height - margin.bottom, margin.top]);

    var z = d3.scaleOrdinal()
        .range(["#00FF90", "#00B050", "#006541", "#98d2f8", "#0077FF", "#002E66", "#E7B5FF", "#B722FF", "purple"])
        ;

    var line = d3.line()
        .curve(d3.curveCardinal)
        .x(d => x(d.date))
        .y(d => y(d.degrees));

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(x).ticks(6)
            .tickFormat(d3.timeFormat("%b")))
        .call(g => {
            var years = x.ticks(d3.timeYear.every(1))
            var xshift = 0
            g.selectAll("text")
                .style("text-anchor", "right")
                .attr("y", axisPad)
                .attr('fill', 'black')
                .attr('font-size', 15)
                .attr('font-weight', 400)
            g.selectAll("line").remove()


            g.select(".domain")
                .remove()

        })

    demadjust = new Date(2020, 0, 4);

    svg.append("line")
        .attr("x1", x(demadjust))
        .attr("x2", x(demadjust))
        .attr("y1", y(0))
        .attr("y2", -height)
        .attr("stroke", "grey")

    svg.append("line")
        .attr("x1", x(maxdate))
        .attr("x2", x(maxdate))
        .attr("y1", y(0))
        .attr("y2", -height)
        .attr("stroke", "grey")

    


    svg.append("text")
        .attr("x", x(demadjust) - 5)
        .attr("y", "20")
        .attr('fill', 'grey')
        .attr('font-size', '15')
        .attr('font-weight', 500)
        .attr("text-anchor", "end")
        .text("Demographic Calculation Adjusted >")


    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + margin.left + ",0)");

    var focus = svg.append("g")
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

    var overlay = svg.append("rect")
        .attr("class", "overlay")
        .attr("x", margin.left)
        .attr("width", width - margin.right - margin.left)
        .attr("height", height)

    update(d3.select('#selectboxvote').property('value'), 0);

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
            .call(d3.axisLeft(y).tickSize(-width + margin.right + margin.left).ticks(5)).call(g => {
                var years = x.ticks(d3.timeYear.every(1))
                var xshift = 0
                g.selectAll("text")
                    .style("text-anchor", "right")
                    .attr("y", 0)
                    .attr('fill', 'black')
                    .attr('font-size', 15)
                    .attr('font-weight', 400)
                g.selectAll("line").remove()


                g.select(".domain")
                    .remove()

            })

        var city = svg.selectAll(".cities")
            .data(cities);

        city.exit().remove();

        city.enter().insert("g", ".focus").append("path")
            .attr("class", "line cities")
            .style("stroke", d => z(d.id))
            .merge(city)
            .transition().duration(speed)
            .attr("d", d => line(d.values))

        tooltip(copy);
    }

    function tooltip(copy) {
        var rect = focus.selectAll(".lineHoverRect")
            .data(copy)

        rect.enter().append("rect")
            .attr("class", "lineHoverRect")
            .attr("y", 402.5)
            .attr("x", 62.5)
            .attr("width", 75)
            .attr("height", 25)
            .attr("rx", 10)
            .attr("transform", (_, i) => "translate(" + i * 100 + ",0)")
            .merge(rect);

        var labels = focus.selectAll(".lineHoverText")
            .data(copy)

        labels.enter().append("text")
            .attr("class", "lineHoverText")
            .attr("text-anchor", "middle")
            .attr("font-size", 14)
            .attr("dx", (_, i) => 1 + i * 100 + "px")
            .merge(labels);







        var circles = focus.selectAll(".hoverCircle")
            .data(copy)

        circles.enter().append("circle")
            .attr("class", "hoverCircle")
            .style("stroke", d => z(d))
            .style("stroke-width", 2)
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
                .attr("x", 0)
                .attr("y", 420)
                .attr("text-anchor", "start")
                .style("font-size", 12)
                .style("font-weight", 700)
                .text(formatDate(d.date));

            focus.selectAll(".hoverCircle")
                .attr("cy", e => y(d[e]))
                .attr("cx", x(d.date));

            focus.selectAll(".lineHoverRect")
                .style("fill", e => demScale(d[e]))
                ;

            focus.selectAll(".lineHoverText")
                .attr("transform",
                    "translate(" + 100 + "," + 420 + ")").style("font-weight", 700)
                .text(e => d[e] + "%");




        }
    }

    var cands = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]

    var svgLegend = svg.append('g')
        .attr('class', 'gLegend')
        .attr("transform", "translate(100,390)")

    var legend = svgLegend.selectAll('.legend')
        .data(cands)
        .enter().append('g')
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(" + i * 100 + ",0)" })

    svg.append("text")
        .attr("x", 0)
        .attr("y", 450)
        .attr("text-anchor", "start")
        .style("font-size", 12)
        .style("font-weight", 700)
        .text("Today")

    svg.append("text")
        .attr("x", 0)
        .attr("y", 480)
        .attr("text-anchor", "start")
        .style("font-size", 12)
        .style("font-weight", 700)
        .text("Month Ago")

        svg.append("text")
        .attr("x", 500)
        .attr("y", 520)
        .attr("text-anchor", "middle")
        .style("font-size", 25)
        .style("font-weight", 700)
        .text(keyState=="US"?"Projected Vote Share":"Projected Vote in "+racename)

    legend.append("text")
        .attr("class", "legend-text")
        .style("fill", d => z(d))
        .attr("text-anchor", "middle")
        .style("font-size", 14)
        .style("font-weight", 700)
        .text(d => d)


})
