t()
function t(){var bee = d3.select("#beeSwarm")
    .append("svg")
    .attr("viewBox", "0 0 1000 400")
var margin = { top: 40, right: 40, bottom: 40, left: 40 }
var width = 1000 - margin.left - margin.right
var height = 400 - margin.top - margin.bottom
var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"])
var formatValue = d3.format(".1f");
var nf = d3.format(".1f")
var x = d3.scaleLinear()
    .rangeRound([0, width]);

var g = bee.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://data.jhkforecasts.com/2020-house.csv", function (data) {
    data = data.slice(data.length - 436, data.length - 1)
    console.log(data)
    data.forEach(d => {
        d.repWin = +d.repWin
    })
    x.domain([0, 100]);
    console.log(x(50))
    var simulation = d3.forceSimulation(data)
        .force("x", d3.forceX(function (d) { return x(d.repWin); }).strength(1))
        .force("y", d3.forceY(height / 2))
        .force("collide", d3.forceCollide(5))
        .stop();

    for (var i = 0; i < 120; ++i) simulation.tick();

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(-420).ticks(10))
        .call(g => {
            var years = x.ticks(d3.timeYear.every(1))
            var xshift = 0
            g.selectAll("text")
                .text(d => d == 50 ? 50 : d < 50 ? 100 - d : d)
                .style("text-anchor", "right")
                .attr("y", 15)
                .attr('fill', 'black')
                .attr('font-size', 15)
                .attr('font-weight', 800)
                .style("text-transform", "uppercase")
                .style("font-family", "sf-mono")

            g.selectAll("line")
                .attr("opacity", .2)
                .attr("stroke", "grey")


            g.select(".domain")
                .attr("opacity", 0)


        })

    var cell = g.append("g")
        .attr("class", "cells")
        .selectAll("g").data(d3.voronoi()
            .extent([[-margin.left, -margin.top], [width + margin.right, height + margin.top]])
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; })
            .polygons(data)).enter().append("g");

    cell.append("circle")
        .attr("r", 3)
        .attr("cx", function (d) { return d.data.x; })
        .attr("cy", function (d) { return d.data.y; })
        .style("fill", d => color(d.data.repWin))
        .style("stroke", d => Math.abs(d.data.repWin - 50) > 25 ? "none" : "black")
        .on("mouseover", d => {

            bee.append("text")
                .attr("class", "hoverText")
                .text(d.data.districtID)
                .attr("x", d.data.x + margin.left)
                .attr("y", d.data.y)
                .attr("text-anchor", "middle")
                .style("font-size", 15)

            bee.append("text")
                .attr("class", "hoverText")
                .text(nf(Math.abs(d.data.repWin - 50) + 50))
                .attr("x", d.data.x + margin.left)
                .attr("y", d.data.y + 15)
                .attr("text-anchor", "middle")
                .style("font-size", 15)
        })
        .on("mouseout", d => {
            d3.selectAll(".hoverText").remove()
        })

    cell.append("title")
        .text(function (d) { return d.data.districtID + "\n" + formatValue(d.data.repWin); });
});
}