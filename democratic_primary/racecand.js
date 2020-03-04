var margin = { top: 20, right: 20, bottom: 100, left: 30 }
var width = 1000 - margin.left - margin.right
var height = 550 - margin.top - margin.bottom

var delScale = d3.scaleLinear()
    .domain([0, 1990])
    .range(["white", "#2968F5"]);

d3.csv("delegatetime.csv", function (error, data) {
    var keys = data.columns.slice(1);
    var keys = keys.filter(f => f.includes(keycand))
   
    var axisPad =7

    var parseTime = d3.timeParse("%Y-%m-%d"),
        formatDate = d3.timeFormat("%b - %d"),
        formatMonth = d3.timeFormat("%Y-%m-%d"),
        bisectDate = d3.bisector(d => d.date).left,
        formatValue = d3.format("0.0%");

    data.forEach(function (d) {
        d.date = parseTime(d.date);
     
        return d;
    })



    

    var svg = d3.select("#race").append("svg")
        .attr("viewBox", "0 0 1000 550")
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    



    var mindate = new Date(2020, 1, 1),
        maxdate = new Date(2020, 6, 1)
    demadjust = new Date(2020, 0, 4);

    var x = d3.scaleTime()
        .rangeRound([margin.left, width - margin.right])
        .domain([mindate, maxdate])

    var y = d3.scaleLinear()
        .rangeRound([height - margin.bottom, margin.top]);

    var z = d3.scaleOrdinal()
        .range(["#00C181", "#FF6060", "#a4b1b5", "#FFE130", "#FF8D32", "#2968F5", "#FF2EF0", "#AF0BFF", "#a4b1b5"])
        ;

    var line = d3.line()
        .curve(d3.curveStepAfter)
        .x(d => x(d.date))
        .y(d => y(d.degrees));

    svg.append("g")
        .attr("class", "x-axis")
        
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
            .style("stroke", candcolor(keycand))
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
            .style("stroke", d => candcolor(keycand))
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
                .style("fill", e => delScale(d[e]))
                ;

            focus.selectAll(".lineHoverText")
                .attr("transform",
                    "translate(" + 100 + "," + 420 + ")").style("font-weight", 700)
                .text(e => d[e]);




        }
    }

    

        var selectbox = d3.select("#selectboxrace")
		.on("change", function() {
			update(this.value, 750);
        })
  

})

