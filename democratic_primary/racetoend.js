var margin = { top: 20, right: 20, bottom: 100, left: 30 }
var width = 1000 - margin.left - margin.right
var height = 550 - margin.top - margin.bottom

var delScale = d3.scaleLinear()
    .domain([0, 50])
    .range(["white", "#0091FF"]);

var delScale = d3.scaleLinear()
    .domain([0, 1990])
    .range(["white", "#0091FF"]);

d3.csv("delegatetime.csv", function (error, data) {
    var keys = data.columns.slice(1);

    

    var datatype = "proj"

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
        .range(["#00FF90", "#FF6060", "#a4b1b5", "#FFC000", "#99D3FF", "#0091FF", "#EBBFFF", "#AF0BFF", "00C181"])
        ;

    var line = d3.line()
        .curve(d3.curveStepBefore)
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
                .attr("y", 6)
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

        var copy = keys.filter(f => f.includes("del"))

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
            .style("stroke-width",4)
            .style("line-cap","square")
            .merge(city)
            .transition().duration(speed)
            .attr("d", d => line(d.values))

       

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

    legend.append("text")
        .attr("class", "legend-text")
        .style("fill", d => z(d))
        .attr("text-anchor", "middle")
        .style("font-size", 14)
        .style("font-weight", 700)
        .text(d => d)
        svg.append("text")
        .attr("x", 500)
        .attr("y", 520)
        .attr("text-anchor", "middle")
        .style("font-size", 25)
        .style("font-weight", 700)
        .text(keyState=="US"?"Projected Delegates":"Projected Delegates in "+keyState)


}})
