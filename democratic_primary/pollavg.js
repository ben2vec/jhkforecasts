var margin = { top: 20, right: 20, bottom: 100, left: 30 }
var width = 1000 - margin.left - margin.right
var height = 550 - margin.top - margin.bottom

var demscale = d3.scaleLinear()
    .domain([0, 30])
    .range(["white", "#0091FF"]);

d3.csv("Sheet2.csv", function (error, data) {
    var keys = data.columns.slice(1);
var startdate = new Date(2018,10,30)


    
    var datatype = "avg"

    var parseTime = d3.timeParse("%Y-%m-%d"),
        formatDate = d3.timeFormat("%b - %d"),
        formatMonth = d3.timeFormat("%Y-%m-%d"),
        bisectDate = d3.bisector(d => d.date).right,
        formatValue = d3.format(".3");

    data.forEach(function (d) {
        d.date = parseTime(d.date);
        return d;
    })

    var data = data.filter(function (d) { return d.date > startdate; });


    //today
    var now = d3.max(data, d => d.date)

    var nowarray = data.filter(function (d) { return d.date == now; });

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

    var svg = d3.select("#pollavg").append("svg")
        .attr("viewBox", "0 0 1000 550")
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var svgnow = svg.append('g')
        .attr('class', 'gnow')
        .attr("transform", "translate(100,420)")

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
        .attr("fill", d => demscale(d.values))

    nowv.append("text")
        .attr("class", "now-text")
        .style("fill", "Black")
        .attr("text-anchor", "middle")
        .style("font-size", 14)
        .style("font-weight", 700)
        .text(d => formatValue(d.values) + "%")
        //one week ago
    now = now
    console.log(now)
    var weekago = formatMonth(d3.utcWeek.offset(now, -1))

    var weekarray = data.filter(function (d) { return formatMonth(d.date) == weekago; });

    var copyweek = keys.filter(f => f.includes(datatype))

    var oneweekago = copyweek.map(function (id) {
        return {
            values: weekarray.map(d => { return +d[id] })
        };
    });

    console.log(monthago)
    console.log(montharray)
    console.log(onemonthago)

    
    var svgmonth = svg.append('g')
        .attr('class', 'gmonth')
        .attr("transform", "translate(100,450)")

    var monthv = svgmonth.selectAll('.now')
        .data(oneweekago)
        .enter().append('g')
        .attr("class", "month")
        .attr("transform", function (d, i) { return "translate(" + i * 100 + ",0)" })

    monthv.append("rect")
        .attr("y", -17.5)
        .attr("x", -37.5)
        .attr("width", 75)
        .attr("height", 25)
        .attr("rx", 10)
        .attr("fill", d => demscale(d.values))

    monthv.append("text")
        .attr("class", "now-text")
        .style("fill", "Black")
        .attr("text-anchor", "middle")
        .style("font-size", 14)
        .style("font-weight", 700)
        .text(d => formatValue(d.values) + "%")
    //one month ago
    now = now
    console.log(now)
    var monthago = formatMonth(d3.utcMonth.offset(now, -1))

    var montharray = data.filter(function (d) { return formatMonth(d.date) == monthago; });

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
        .attr("fill", d => demscale(d.values))

    monthv.append("text")
        .attr("class", "now-text")
        .style("fill", "Black")
        .attr("text-anchor", "middle")
        .style("font-size", 14)
        .style("font-weight", 700)
        .text(d => formatValue(d.values) + "%")



    var mindate = new Date(2019, 5, 1),
        maxdate = d3.max(data, d => d.date)
    demadjust = new Date(2020, 0, 4);

    var x = d3.scaleTime()
        .rangeRound([margin.left, width - margin.right])
        .domain([startdate, maxdate])

    var y = d3.scaleLinear()
        .rangeRound([height - margin.bottom, margin.top]);

    var z = d3.scaleOrdinal()
        .range(["#00C181", "#FF6060", "#a4b1b5", "#FFC000", "#FF8D32", "#0091FF", "#FF2EF0", "#CD64FF", "#0070C0"])
        ;

    var line = d3.line()
        .curve(d3.curveBundle)
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
                .attr("y", 0)
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

    update(d3.select('#selectboxpoll').property('value'), 0);

    function update(input, speed) {

        var copy = keys.filter(f => f.includes(input))

        var cities = copy.map(function (id) {
            return {
                id: id,
                values: data.map(d => { return { date: d.date, degrees: +d[id] } })
            };
        });
        console.log(cities)
        y.domain([
            d3.min(cities, d => d3.min(d.values, c => c.degrees)),
            d3.max(cities, d => d3.max(d.values, c => c.degrees))
        ]).nice();

        svg.selectAll(".y-axis").transition()
            .duration(speed)
            .call(d3.axisLeft(y).tickSize(-width + margin.right + margin.left).ticks(5).tickFormat(d3.format(".2"))).call(g => {
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
        .attr("y", 420)
        .attr("text-anchor", "start")
        .style("font-size", 12)
        .style("font-weight", 700)
        .text("Today")
        svg.append("text")
        .attr("x", 0)
        .attr("y", 450)
        .attr("text-anchor", "start")
        .style("font-size", 12)
        .style("font-weight", 700)
        .text("Week Ago")

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


})
