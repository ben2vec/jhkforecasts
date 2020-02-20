var winscale = d3.scaleLinear()
  .domain([0, 50, 100])
  .range(["white", "#0091FF", "#002E66"]);
var delscale = d3.scaleLinear()
  .domain([0, 1990])
  .range(["white", "#002E66"]);

var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]

var color = d3.scaleOrdinal()
  .domain(category)
  .range(["#00C181", "#FF6060", "#a4b1b5", "#FFE130", "#FF8D32", "#0091FF", "#FF2EF0", "#AF0BFF", "#a4b1b5"])


d3.csv("candsoverview.csv", function (error, data) {

  formatValue = d3.format(".3");
  formatvalue = d3.format(".2");

  data.sort((a, b) => b.win - a.win)

  var svg = d3.select("#topline").append("svg")
    .attr("viewBox", "0 0 900 450")
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

  repeat.append("a").attr("xlink:href", d => d.candidate).append("image")
  .attr("xlink:href", d => "https://raw.githubusercontent.com/jhkersting/home/master/" + d.candidate + "-01.png")
    .attr("x", 100)
    .attr("y", -170)
    .attr("height", 100)
    .attr("width", 100)

    .attr("anchor", "middle").on('mouseover', function (d) {

      d3.select(this)
        .attr("y", -180)




    })
    .on('mouseout',
      function (d) {

        d3.select(this)
          .attr("y", -170)



      });;

  repeat.append("a")
    .attr("xlink:href", d => d.candidate)
    .append("text")
    .attr("class", "repeat-text")
    .attr("x", 150)
    .attr("y", -50)
    .style("fill", d => color(d.candidate))
    .style("font-size", 20)
    .attr("font-weight", 700)
    .text(d => d.candidate)
    .attr("text-anchor", "middle")

  repeat.append("rect")
    .attr("x", 110)
    .attr("y", -25)
    .attr("rx", 12)
    .attr("ry", 12)
    .attr("width", 80)
    .attr("height", 60)
    .attr("fill", d => winscale(d.win))

  repeat.append("rect")
    .attr("x", 110)
    .attr("y", 75)
    .attr("rx", 12)
    .attr("ry", 12)
    .attr("width", 80)
    .attr("height", 60)
    .attr("fill", d => delscale(d.del))

  repeat.append("rect")
    .attr("x", 110)
    .attr("y", 175)
    .attr("rx", 12)
    .attr("ry", 12)
    .attr("width", 80)
    .attr("height", 60)
    .attr("fill", d => winscale(d.vote))



  repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 150)
    .attr("y", 10)
    .style("fill", d => d.win > 50 ? "white" : "black")
    .style("font-size", d => Math.sqrt(d.win) + 15)
    .attr("font-weight", 700)
    .text(d => d.win + "%")
    .attr("text-anchor", "middle")




  repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 150)
    .attr("y", 110)
    .style("fill", d => d.del > 1500 ? "white" : "black")
    .style("font-size", 20)
    .attr("font-weight", 500)
    .text(d => d.del)
    .attr("text-anchor", "middle")


  repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 150)
    .attr("y", 210)
    .style("fill", d => d.vote > 50 ? "white" : "black")
    .style("font-size", d => Math.sqrt(d.vote) + 15)
    .attr("font-weight", 700)
    .text(d => d.vote + "%")
    .attr("text-anchor", "middle")



  svg.append("text")
    .attr("x", 140)
    .attr("y", 350)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight", 700)
    .attr("text-anchor", "end")
    .text("Projected")


  svg.append("text")
    .attr("x", 140)
    .attr("y", 370)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight", 700)
    .attr("text-anchor", "end")
    .text("Vote")
  svg.append("text")
    .attr("x", 140)
    .attr("y", 250)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight", 700)
    .attr("text-anchor", "end")
    .text("Projected")


  svg.append("text")
    .attr("x", 140)
    .attr("y", 270)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight", 700)
    .attr("text-anchor", "end")
    .text("Delegates")




  svg.append("text")
    .attr("x", 140)
    .attr("y", 150)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight", 700)
    .attr("text-anchor", "end")
    .text("Win")

  svg.append("text")
    .attr("x", 140)
    .attr("y", 170)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight", 700)
    .attr("text-anchor", "end")
    .text("Nomination")


})