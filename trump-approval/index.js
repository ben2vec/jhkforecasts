var parseTime = d3.timeParse("%m/%d/%Y"),
    formatDate = d3.timeFormat("%b - %d"),
    formatMonth = d3.timeFormat("%Y-%m-%d"),
    bisectDate = d3.bisector(d => d.date).left,
    wholevalue = d3.format(".0f"),
    onevalue = d3.format(".1f")

var colors = ["#0091FF", "#FF0660"]
var dateparse = d3.timeParse("%m/%d/%y")
var starting_day = new Date(2017, 0, 22)
var tformat = d3.timeFormat("%m/%d/%Y")
var dateparse = d3.timeParse("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
var numberformat = d3.format(".1f")
var updated_format = d3.timeFormat("%b. %d %Y %I:%M %p")
var time_scale = 86400000


var grade_scale = [
    { Grade: "A+", Value: 1.5 },
    { Grade: "A", Value: 1.35 },
    { Grade: "A-", Value: 1.2 },
    { Grade: "A/B", Value: 1.1 },
    { Grade: "B+", Value: 1 },
    { Grade: "B", Value: .925 },
    { Grade: "B-", Value: .85 },
    { Grade: "B/C", Value: .8 },
    { Grade: "C+", Value: .7 },
    { Grade: "C", Value: .65 },
    { Grade: "C-", Value: .55 },
    { Grade: "C/D", Value: .5 },
    { Grade: "D+", Value: .4 },
    { Grade: "D", Value: .3 },
    { Grade: "D-", Value: .2 },
    { Grade: "-", Value: .65 },
]
var pollster_grade_letter = grade_scale.map((d) => {
    return d.Grade
})

var pollster_grade_value = grade_scale.map((d) => {
    return d.Value
})

d3.csv("https://projects.fivethirtyeight.com/polls-page/president_approval_polls.csv", function(data) {


    data.forEach((d, i) => {
        d.grade = d.fte_grade == "" ? "-" : d.fte_grade
        d.grade_value = pollster_grade_value[pollster_grade_letter.indexOf(d.grade)]
        d.yes = +d.yes
        d.no = +d.no
        d.date = dateparse(d.end_date)
        d.n = +d.sample_size
        d.population_adj = d.population == "lv" ? 1.33 : d.population == "rv" ? 1 : .7
        d.population_adj = d.population == "lv" ? 1.33 : d.population == "rv" ? 1 : .7
        d.n_adjusted = d.n > 4000 ? Math.pow((d.n - 4000), .2) + 27 : Math.pow(d.n, .4)
        d.weight = d.n_adjusted * d.population_adj
        d.weight = Math.pow(d.weight, d.grade_value)
        return d
    })
    var today = d3.max(data, d => d.date)
    var days = (today - starting_day) / time_scale
    var res = []

    for (let j = 0; j < days; j++) {
        var run_date = new Date(2017, 0, 22)
        run_date.setDate(run_date.getDate() + j)
        var polls = data.filter(d => d.date <= run_date)
        polls.forEach((d, i) => {
            d.days_old = (run_date - d.date) / time_scale
            d.weight = d.weightz / (1 + (d.days_old / 20))
            return d
        })

        var poll_filtered = d3.nest()
            .key(d => d.pollster_id)
            .entries(polls)
        var poll_filtered = poll_filtered.map(d => {
            return d.values
        })
        var ps = []
        for (c = 0; c < poll_filtered.length; c++) {
            var f = poll_filtered[c]
            f.sort((a, b) => b.weight - a.weight)
            f.forEach((d, i) => {
                d.yes_n = d.weight * d.yes
                d.no_n = d.weight * d.no
            })
            ps.push(f)
        }
        var psflat = ps.flat()

        var dta = {
            date: tformat(run_date),
            approve: d3.sum(psflat, d => d.yes_n) / d3.sum(psflat, d => d.weight),
            disapprove: d3.sum(psflat, d => d.no_n) / d3.sum(psflat, d => d.weight),
        }
        res.push(dta)
    }

    var data = res.flat()
    var topline = d3.select("#topline")
        .append("svg")
        .attr("viewBox", "0 0 1000 200")

    topline.append("image")
        .attr("href", "https://jhkforecasts.com/trump")

    var margin = { top: 20, right: 40, bottom: 20, left: 20 }
    var width = 1100 - margin.left - margin.right
    var height = 450 - margin.top - margin.bottom
    var axisPad = 12

    var data = data2.map((d, i) => {
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
        console.log(cities)
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
                .attr("class", "lineHoverText2")
                .attr("font-size", 20)
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



                focus.selectAll(".lineHoverText")
                    .style("font-weight", 900)
                    .attr("x", (e, i) => i == 0 ? x(d.date) + 10 : x(d.date) - 10)
                    .text((e, i) => onevalue(d[e]) + "%")
                    .attr("fill", (e, i) => colors[i])
                    .attr("y", e => y(75))
                    .attr("text-anchor", (e, i) => i == 1 ? "end" : "start")
                    .attr("dominant-baseline", "middle")
                console.log(copy)

                focus.selectAll(".lineHoverText2")
                    .style("font-weight", 900)
                    .attr("x", (e, i) => x(d.date))
                    .text((e, i) => onevalue(d.approve - d.disapprove))
                    .attr("fill", "black")
                    .attr("y", e => y(70))
                    .attr("text-anchor", "middle")
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