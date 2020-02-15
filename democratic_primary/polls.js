var gopScale = d3.scaleLinear()
  .domain([20, 80])
  .range(["white", "#FF6060"]);

var demScale = d3.scaleLinear()
  .domain([0, 50])
  .range(["white", "#0091FF"]);

var demScale = d3.scaleLinear()
  .domain([0, 50])
  .range(["white", "#0091FF"]);
var racetype = keyState == "Iowa" || "Nevada" || "Wyoming" ? " Caucus" : " Primary"
d3.csv("delegates.csv", function (error, data) {
  var data = data.filter(function (d) { return d.state == keyState; });
  console.log(data[0].date)
  document.getElementById("primarydate").innerHTML = racetype + " - " + data[0].date;
})

var parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S"),
        formatDate = d3.timeFormat("%m - %d"),
        formatMonth = d3.timeFormat("%Y-%m-%d"),
        bisectDate = d3.bisector(d => d.date).left,
        formatValue = d3.format("0.0%");

d3.csv("polls.csv", function (error, data) {



  var data = data.filter(function (d) { return d.State == keyState; })


  var data = data.map((d, i) => {
    return {
      Pollster: d.Pollster,
      Grade: d.Grade,
      Sample: d.Sample,
      Date: parseTime(d.Date),
      weight: d.weight,
      Biden: +d.Biden,
      Bloomberg: +d.Bloomberg,
      Booker: +d.Booker,
      Buttigieg: +d.Buttigieg,
      Klobuchar: +d.Klobuchar,
      Sanders: +d.Sanders,
      Steyer: +d.Steyer,
      Warren: +d.Warren,
      Yang: +d.Yang,

    }
  })


  console.log(data.length)

  var svgHeight = data.length * 50 + 60

  console.log(svgHeight)

  var svg = d3.select("#polls").append("svg")
    .attr("viewBox", "-50 0 1050 " + svgHeight)
    .append('g')

  var maxweight = d3.max(data, d => d.weight)

  console.log(maxweight);

  var weightScale = d3.scaleLinear()
    .domain([0, 50])
    .range(["white", "#a4b1b5"]);


  var svgLegend = svg.append('g')
    .attr('class', 'gLegend')
    .attr("transform", "translate(" + 0 + "," + 90 + ")")



  var legend = svgLegend.selectAll('.legend')
    .data(data)
    .enter().append('g')
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(0," + i * 50 + ")" })



  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 0)
    .attr("y", -10)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 500)
    .text(d => d.Pollster)
    .attr("text-anchor", "start")
    .call(wrap, 275)

  legend.append("rect")
    .attr("x", 275)
    .attr("y", -30)
    .attr("width", 1000)
    .attr("height", 50)
    .style("fill", "white")


  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 300)
    .attr("y", 0)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 700)
    .text(d => d.Grade)
    .attr("text-anchor", "middle")

  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 350)
    .attr("y", 0)
    .style("fill", "Black")
    .style("font-size", 10)
    .attr("font-weight", 700)
    .text(d => formatDate(d.Date))
    .attr("text-anchor", "middle")

  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 395)
    .attr("y", 0)
    .style("fill", "Black")
    .style("font-size", 10)
    .attr("font-weight", 700)
    .text(d => d.Sample)
    .attr("text-anchor", "middle")

  legend.append("circle")
    .attr("cx", 440)
    .attr("cy", -3.5)
    .attr("r", 15)
    .attr("fill", d => weightScale(d.weight))

  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 440)
    .attr("y", 0)
    .style("fill", "Black")
    .style("font-size", 10)
    .attr("font-weight", 700)
    .text(d => d.weight == 0 ? "-" : d.weight)
    .attr("text-anchor", "middle")



  legend.append("rect")
    .attr("x", 475)
    .attr("y", -30)
    .attr("width", 50)
    .attr("height", 50)
    .style("fill", d => demScale(d.Biden))

  legend.append("rect")
    .attr("x", 525)
    .attr("y", -30)
    .attr("width", 50)
    .attr("height", 50)
    .style("fill", d => demScale(d.Bloomberg))
  legend.append("rect")
    .attr("x", 575)
    .attr("y", -30)
    .attr("width", 50)
    .attr("height", 50)
    .style("fill", d => demScale(d.Booker))

  legend.append("rect")
    .attr("x", 625)
    .attr("y", -30)
    .attr("width", 50)
    .attr("height", 50)
    .style("fill", d => demScale(d.Buttigieg))

  legend.append("rect")
    .attr("x", 675)
    .attr("y", -30)
    .attr("width", 50)
    .attr("height", 50)
    .style("fill", d => demScale(d.Klobuchar))

  legend.append("rect")
    .attr("x", 725)
    .attr("y", -30)
    .attr("width", 50)
    .attr("height", 50)
    .style("fill", d => demScale(d.Sanders))

  legend.append("rect")
    .attr("x", 775)
    .attr("y", -30)
    .attr("width", 50)
    .attr("height", 50)
    .style("fill", d => demScale(d.Steyer))

  legend.append("rect")
    .attr("x", 825)
    .attr("y", -30)
    .attr("width", 50)
    .attr("height", 50)
    .style("fill", d => demScale(d.Warren))

  legend.append("rect")
    .attr("x", 875)
    .attr("y", -30)
    .attr("width", 50)
    .attr("height", 50)
    .style("fill", d => demScale(d.Yang))

  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 500)
    .attr("y", 0)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 700)
    .text(d => d.Biden + "%")
    .attr("text-anchor", "middle")
  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 550)
    .attr("y", 0)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 700)
    .text(d => d.Bloomberg + "%")
    .attr("text-anchor", "middle")
  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 600)
    .attr("y", 0)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 700)
    .text(d => d.Booker + "%")
    .attr("text-anchor", "middle")
  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 650)
    .attr("y", 0)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 700)
    .text(d => d.Buttigieg + "%")
    .attr("text-anchor", "middle")
  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 700)
    .attr("y", 0)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 700)
    .text(d => d.Klobuchar + "%")
    .attr("text-anchor", "middle")
  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 750)
    .attr("y", 0)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 700)
    .text(d => d.Sanders + "%")
    .attr("text-anchor", "middle")
  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 800)
    .attr("y", 0)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 700)
    .text(d => d.Steyer + "%")
    .attr("text-anchor", "middle")
  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 850)
    .attr("y", 0)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 700)
    .text(d => d.Warren + "%")
    .attr("text-anchor", "middle")
  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 900)
    .attr("y", 0)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 700)
    .text(d => d.Yang + "%")
    .attr("text-anchor", "middle")



  svg.append("text")
    .attr("x", 20)
    .attr("y", 40)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 500)
    .text("Pollster")
    .attr("text-anchor", "start")


  svg.append("text")
    .attr("x", 300)
    .attr("y", 40)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 500)
    .text("Grade")
    .attr("text-anchor", "middle")

  svg.append("text")
    .attr("x", 350)
    .attr("y", 40)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 500)
    .text("Date")
    .attr("text-anchor", "middle")

  svg.append("text")
    .attr("x", 440)
    .attr("y", 40)
    .style("fill", "Black")
    .style("font-size", 12)
    .attr("font-weight", 500)
    .text("Weight")
    .attr("text-anchor", "middle")
  svg.append("text")
    .attr("x", 500)
    .attr("y", 40)
    .style("fill", "Black")
    .style("font-size", 10)
    .attr("font-weight", 500)
    .text("Biden")
    .attr("text-anchor", "middle")
  svg.append("text")
    .attr("x", 550)
    .attr("y", 40)
    .style("fill", "Black")
    .style("font-size", 10)
    .attr("font-weight", 500)
    .text("Bloomberg")
    .attr("text-anchor", "middle")
  svg.append("text")
    .attr("x", 600)
    .attr("y", 40)
    .style("fill", "Black")
    .style("font-size", 10)
    .attr("font-weight", 500)
    .text("Booker")
    .attr("text-anchor", "middle")

  svg.append("text")
    .attr("x", 650)
    .attr("y", 40)
    .style("fill", "Black")
    .style("font-size", 10)
    .attr("font-weight", 500)
    .text("Buttigieg")
    .attr("text-anchor", "middle")
  svg.append("text")
    .attr("x", 700)
    .attr("y", 40)
    .style("fill", "Black")
    .style("font-size", 10)
    .attr("font-weight", 500)
    .text("Klobuchar")
    .attr("text-anchor", "middle")
  svg.append("text")
    .attr("x", 750)
    .attr("y", 40)
    .style("fill", "Black")
    .style("font-size", 10)
    .attr("font-weight", 500)
    .text("Sanders")
    .attr("text-anchor", "middle")
  svg.append("text")
    .attr("x", 800)
    .attr("y", 40)
    .style("fill", "Black")
    .style("font-size", 10)
    .attr("font-weight", 500)
    .text("Steyer")
    .attr("text-anchor", "middle")
  svg.append("text")
    .attr("x", 850)
    .attr("y", 40)
    .style("fill", "Black")
    .style("font-size", 10)
    .attr("font-weight", 500)
    .text("Warren")
    .attr("text-anchor", "middle")
  svg.append("text")
    .attr("x", 900)
    .attr("y", 40)
    .style("fill", "Black")
    .style("font-size", 10)
    .attr("font-weight", 500)
    .text("Yang")
    .attr("text-anchor", "middle")
  legend.append("line")
    .attr("x1", 0)
    .attr("x2", 950)
    .attr("y1", 20)
    .attr("y2", 20)
    .attr("stroke-width", 1)
    .attr("stroke", "#E2E2E2")

  svg.append("line")
    .attr("x1", 0)
    .attr("x2", 950)
    .attr("y1", 60)
    .attr("y2", 60)
    .attr("stroke-width", 2)
    .attr("stroke", "black")

  function wrap(text, width) {
    text.each(function () {
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 10, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", 10).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }
});