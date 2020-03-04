var winscale = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["white", "#2968F5", "#002E66"]);
var delscale = d3.scaleLinear()
    .domain([0, 1990])
    .range(["white", "#002E66"]);

var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]

var color = d3.scaleOrdinal()
    .domain(category)
    .range(["#00C181", "#FF6060", "#a4b1b5", "#FFE130", "#FF8D32", "#2968F5", "#FF2EF0", "#AF0BFF", "#a4b1b5"])


d3.csv("candsoverview.csv", function (error, data) {

    var data = data.filter(function (d) { return d.candidate == keycand; })
    var data = data[0]
    console.log(data)
    var svg = d3.select("#topline").append("svg")
        .attr("viewBox", "-100 0 1100 450")
        .append('g')


    svg.append("rect")
        .attr("width", 500)
        .attr("height", 500)
        .attr("fill", "white")

    var svgrepeat = svg.append('g')
        .attr('class', 'grepeat')
        .attr("transform", "translate(" + 50 + "," + 180 + ")")



    var repeat = svgrepeat.selectAll('.repeat')
        .data(data)
        .enter().append('g')
        .attr("class", "repeat")
        .attr("transform", function (d, i) { return "translate(" + i * 100 + ",0)" })

    svg.append("image")
        .attr("xlink:href", d => "https://raw.githubusercontent.com/jhkersting/home/master/" + keycand + "-01.png")
        .attr("x", 100)
        .attr("y", 00)
        .attr("height", 300)
        .attr("width", 300)

    var win = data.win+"%"
    var delegates = data.del
    var vote = data.vote+"%"

    svg.append("text")
    .attr("x", 250)
    .attr("y", 370)
    .style("fill", "Black")
    .style("font-size", 50)
    .attr("font-weight", 700)
    .attr("text-anchor", "middle")
    .text(keycand=="Biden"?"Joe Biden":keycand=="Bloomberg"?"Mike Bloomberg":keycand=="Buttigieg"?"Pete Buttigieg":keycand=="Booker"?"Cory Booker":keycand=="Klobuchar"?"Amy Klobuchar":keycand=="Sanders"?"Bernie Sanders":keycand=="Steyer"?"Tom Steyer":keycand=="Warren"?"Elizabeth Warren":"Andrew Yang")


    svg.append("text")
    .attr("x", 750)
    .attr("y", 160)
    .style("fill", "Black")
    .style("font-size", 30)
    .attr("font-weight", 700)
    .attr("text-anchor", "middle")
    .text(win)

    svg.append("text")
    .attr("x", 750)
    .attr("y", 260)
    .style("fill", "Black")
    .style("font-size", 30)
    .attr("font-weight", 700)
    .attr("text-anchor", "middle")
    .text(delegates)

    svg.append("text")
    .attr("x", 750)
    .attr("y", 360)
    .style("fill", "Black")
    .style("font-size", 30)
    .attr("font-weight", 700)
    .attr("text-anchor", "middle")
    .text(vote)



    svg.append("text")
        .attr("x", 640)
        .attr("y", 350)
        .style("fill", "Black")
        .style("font-size", 20)
        .attr("font-weight", 700)
        .attr("text-anchor", "end")
        .text("Projected")


    svg.append("text")
        .attr("x", 640)
        .attr("y", 370)
        .style("fill", "Black")
        .style("font-size", 20)
        .attr("font-weight", 700)
        .attr("text-anchor", "end")
        .text("Vote")
    svg.append("text")
        .attr("x", 640)
        .attr("y", 250)
        .style("fill", "Black")
        .style("font-size", 20)
        .attr("font-weight", 700)
        .attr("text-anchor", "end")
        .text("Projected")


    svg.append("text")
        .attr("x", 640)
        .attr("y", 270)
        .style("fill", "Black")
        .style("font-size", 20)
        .attr("font-weight", 700)
        .attr("text-anchor", "end")
        .text("Delegates")




    svg.append("text")
        .attr("x", 640)
        .attr("y", 150)
        .style("fill", "Black")
        .style("font-size", 20)
        .attr("font-weight", 700)
        .attr("text-anchor", "end")
        .text("Win")

    svg.append("text")
        .attr("x", 640)
        .attr("y", 170)
        .style("fill", "Black")
        .style("font-size", 20)
        .attr("font-weight", 700)
        .attr("text-anchor", "end")
        .text("Nomination")


})