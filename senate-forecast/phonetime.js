var dateparse = d3.timeParse("%m/%d/%y")
var colors = ["#FF6060", "#0091FF", "#FFE130", "#C473F6", "#31DE70"]
var nf = d3.format(".1f")
var category = ["REP", "DEM", "LIB", "IND", "GREEN"]

var cand_colors = d3.scaleOrdinal()
    .domain(category)
    .range(colors)
d3.csv("https://data.jhkforecasts.com/2020-senate.csv", data => {
    data.forEach((d, i) => {
        d.date = dateparse(d.forecast_date)
    })
    console.log(data)

    var time_data = data.filter(d => d.state == key_state)

    
    var time_data = time_data.map((d, i) => {
        return {
            date: d.date,
            party: d.party,
            win: d.win,
            seats: d.p_90,
        }
    })
    var data_length = time_data.filter(d => d.party == "REP").length
    var max_date = d3.max(time_data, d => d.date)

    console.log(data_length)
    console.log(timePhone)
    var line_data = []
    for (let j = 0; j < data_length; j++) {
        var ld = {
            date: time_data.filter(d => d.party == "REP")[j].date,
            repwin: time_data.filter(d => d.party == "REP")[j].win,
            demwin: time_data.filter(d => d.party == "DEM")[j].win,
            repseats: time_data.filter(d => d.party == "REP")[j].seats,
            demseats: time_data.filter(d => d.party == "DEM")[j].seats,
        }
        line_data.push(ld)
    }
    console.log(line_data)
    var today = line_data[line_data.lenth - 1]
    var parseTime = d3.timeParse("%Y-%m-%d"),
        formatDate = d3.timeFormat("%b - %d"),
        formatMonth = d3.timeFormat("%Y-%m-%d"),
        bisectDate = d3.bisector(d => d.date).left,
        wholevalue = d3.format(".0f"),
        onevalue = d3.format(".1f")


    var marginPhone = { top: 20, right: 50, bottom: 20, left: 50 }
    var widthPhone = 1400 - marginPhone.left - marginPhone.right
    var heightPhone = 1000 - marginPhone.top - marginPhone.bottom
    var axisPad = 12
    var timePhone = d3.select("#timePhone").append("svg")
        .attr("viewBox", "0 0 1400 1000")
        .append('g')
        .attr("transform", "translate(" + marginPhone.left + "," + marginPhone.top + ")");
    var xPhone = d3.scaleTime()
        .rangeRound([marginPhone.left, widthPhone - marginPhone.right])
        .domain([new Date(2020, 3, 1), new Date(2020, 10, 3)])

    var yPhone = d3.scaleLinear()
        .rangeRound([heightPhone - marginPhone.bottom, marginPhone.top]);


    var z = d3.scaleOrdinal()
        .range(colors)
        ;

    var line = d3.line()
        .curve(d3.curveLinear)
        .x(d => xPhone(d.date))
        .y(d => yPhone(d.pct));

    timePhone.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (heightPhone - marginPhone.bottom) + ")")
        .call(d3.axisBottom(xPhone).tickSize(-920).ticks(5)
            .tickFormat(d3.timeFormat("%b")))
        .call(g => {
            var years = xPhone.ticks(d3.timeYear.every(1))
            var xshift = 0
            g.selectAll("text")
                .style("text-anchor", "right")
                .attr("y", 15)
                .attr('fill', 'black')
                .attr('font-size', 30)
                .attr('font-weight', 800)
            g.selectAll("line")
                .attr("opacity", .4)
                .attr("stroke", "grey")


            g.select(".domain")
                .attr("opacity", 0)


        })

    timePhone.append("line")
        .attr("x1", xPhone(new Date(2020, 10, 3)))
        .attr("x2", xPhone(new Date(2020, 10, 3)))
        .attr("y1", 20)
        .attr("y2", (heightPhone - marginPhone.bottom))
        .attr("stroke", "black")
        .attr("stroke-width", 3)

    timePhone.append("text")
        .text("Nov. 3rd")
        .attr("x", xPhone(new Date(2020, 10, 3))-10)
        .attr("y", 10)
        .attr("font-weight", "500")
        .attr("font-size", 30)



    timePhone.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + marginPhone.left + ",0)");

    var focusPhone = timePhone.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focusPhone.append("line").attr("class", "lineHover")
        .style("stroke", "#999")
        .attr("stroke-width", 1)
        .style("shape-rendering", "crispEdges")
        .style("opacity", 0)
        .attr("y1", -heightPhone)
        .attr("y2", -40);

    focusPhone.append("text").attr("class", "lineHoverDate")
        .attr("text-anchor", "middle")
        .attr("font-size", 12);

    var overlayPhone = timePhone.append("rect")
        .attr("class", "overlay")
        .attr("x", marginPhone.left)
        .attr("width", xPhone(max_date) - marginPhone.left)
        .attr("height", heightPhone)

    var keys = ["repwin", "demwin", "repseats", "demseats"]
    update("win", 0);


    function update(input, speed) {

        var copy = keys.filter(f => f.includes(input))
        var cities = copy.map(function (id) {
            return {
                party: id.substring(0, 3).toUpperCase(),
                values: line_data.map(d => { return { date: d.date, pct: +d[id] } })
            };
        });
        console.log(cities)
        yPhone.domain([
            0,
            input == "ev" ? 538 : input == "vote" ? 60 : 100
        ]).nice();

        timePhone.selectAll(".y-axis").transition()
            .duration(speed)
            .call(d3.axisLeft(yPhone).tickSize(-1200).ticks(5)).call(g => {
                var years = xPhone.ticks(d3.timeYear.every(1))
                var xshift = 0
                g.selectAll("text")
                    .style("text-anchor", "right")
                    .attr("x", -20)
                    .attr('fill', 'black')
                    .attr('font-size', 30)
                    .attr('font-weight', 500)
                g.selectAll("line")
                    .attr("opacity", .4)
                    .attr("stroke", "grey")


                g.select(".domain")
                    .attr("opacity", 0)


            })

        var city = timePhone.selectAll(".cities")
            .data(cities);

        city.exit().remove();

        city.enter().insert("g", ".focus").append("path")
            .attr("class", "line cities")
            .style("stroke", (d, i) => cand_colors(d.party))
            .style("stroke-width", 5)
            .style("opacity", .9)
            .style("stroke-linecap", "round")
            .attr("stroke-linejoin", "round")
            .merge(city)
            .transition().duration(speed)
            .attr("d", d => line(d.values))





        tooltip(copy);

        function tooltip(copy) {
            var rect = focusPhone.selectAll(".lineHoverRect")
                .data(copy)

            var labels2 = focusPhone.selectAll(".lineHoverText2")
                .data(copy)

            labels2.enter().append("text")
                .attr("class", "lineHoverText2")
                .attr("font-size", 35)
                .style("fill", "white")
                .style("stroke", "white")
                .style("stroke-width", 5)
                .merge(labels2)

            var labels = focusPhone.selectAll(".lineHoverText")
                .data(copy)

            labels.enter().append("text")
                .attr("class", "lineHoverText")
                .attr("text-anchor", "middle")
                .attr("font-size", 25)
                .merge(labels)

            var circles = focusPhone.selectAll(".hoverCircle")
                .data(copy)

            circles.enter().append("circle")
                .attr("class", "hoverCircle")
                .style("stroke", d => z(d))
                .style("stroke-width", 3)
                .style("fill", "white")
                .attr("r", 3)
                .merge(circles);

            timePhone.selectAll(".overlay")
                .on("mouseover", () => focusPhone.style("display", null))
                .on("mouseout", () => focusPhone.style("display", "none"))
                .on("mousemove", mousemove);

            function mousemove() {

                var x0 = xPhone.invert(d3.mouse(this)[0]),
                    i = bisectDate(line_data, x0, 1),
                    d0 = line_data[i - 1],
                    d1 = line_data[i],
                    d = x0 - d0.date > d1.date - x0 ? d1 : d0;

                focusPhone.select(".lineHoverDate")
                    .attr("x", xPhone(d.date))
                    .attr("y", 0)
                    .attr("text-anchor", "middle")
                    .style("font-size", 30)
                    .attr("font-weight", "500")
                    .text(formatDate(d.date));

                focusPhone.selectAll(".hoverCircle")
                    .attr("cy", e => yPhone(d[e]))
                    .attr("cx", xPhone(d.date));



                focusPhone.selectAll(".lineHoverText")
                    .attr("font-weight", "500")
                    .attr("x", xPhone(d.date) + 10)
                    .text((e, i) => i == 0 ? "GOP " + nf(d[e]) : "DEM " + nf(d[e]))
                    .attr("fill", (e, i) => colors[i])
                    .attr("y", e => d[e] == d["rep" + input] ? yPhone(d["rep" + input]) > yPhone(d["dem" + input]) ? yPhone(d["rep" + input]) + 15 : yPhone(d["rep" + input]) - 15 : d[e] == d["dem" + input] ? yPhone(d["dem" + input]) > yPhone(d["rep" + input]) ? yPhone(d["dem" + input]) + 15 : yPhone(d["dem" + input]) - 15 : yPhone(d[e]) - 15)
                    .attr("text-anchor", (e, i) => i == 2 ? "end" : "start")
                    .attr("dominant-baseline", "middle")
            }
        }
        var winbuttonPhone = d3.select("#winbuttonPhone")
            .on("click", function () {
                update("win", 500)
            })

        var seatsbuttonPhone = d3.select("#seatsbuttonPhone")
            .on("click", function () {
                update("seats", 500)
            })

    }
})