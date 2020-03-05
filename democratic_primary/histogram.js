var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]

  var color = d3.scaleOrdinal()
    .domain(category)
    .range(["#00C181", "#a4b1b5", "#a4b1b5", "#a4b1b5", "#a4b1b5", "#0077FF", "#a4b1b5", "#a4b1b5", "#a4b1b5"])

  var candidate_color = color(keycand)
  d3.csv("histogram.csv", function (data) {


    var svg = d3.select("#histogram").append("svg")
      .attr("viewBox", "0 0 1000 350")

    var output = []

    for (let j = 0; j <= 20; j++) {
      var candidate = {
        candidate: keycand,
        delegates: +data[j].delegates,
        chance: +data[j][keycand]
      }
      output.push(candidate)
    }
    console.log(output)


    var x = d3.scaleLinear()
      .domain([0, 4000])
      .range([50, 950])

    var y = d3.scaleLinear()
      .domain([0, 100])
      .range([0, 300])



    svg.selectAll("bars")
      .data(output)
      .enter()
      .append("rect")
      .attr("height", d => y(d.chance))
      .attr("width", 900 / 20)
      .attr("x", (d, i) => x(d.delegates))
      .attr("y", d => 300 - y(d.chance))
      .attr("fill", candidate_color)
      .attr("stroke", "white")
      .attr("stroke-width", 2)


    var dividers = [0, 1000, 2000, 3000, 4000]

    svg.selectAll("bars")
      .data(dividers)
      .enter()
      .append("text")
      .text(d => d)
      .attr("x", d => x(d))
      .attr("y", 320)
      .attr("fill", "grey")
      .attr("text-anchor", "middle")

    svg.append("line")
      .attr("x1", x(1990))
      .attr("x2", x(1990))
      .attr("y1", 00)
      .attr("y2", 299)
      .attr("stroke", "grey")
      .attr("stroke-width",2)

      svg.append("text")
      .text("1990 Delegates")
      .attr("x", x(1990)+5)
      .attr("y", 20)
      .attr("fill", "grey")
      .attr("text-anchor", "start")

  })
  var candidate_color = color(keycand)
  d3.csv("histogram.csv", function (data) {


    var svg = d3.select("#histogramphone").append("svg")
      .attr("viewBox", "0 0 1000 650")

    var output = []

    for (let j = 0; j <= 20; j++) {
      var candidate = {
        candidate: keycand,
        delegates: +data[j].delegates,
        chance: +data[j][keycand]
      }
      output.push(candidate)
    }
    console.log(output)


    var x = d3.scaleLinear()
      .domain([0, 4000])
      .range([50, 950])

    var y = d3.scaleLinear()
      .domain([0, 50+d3.max(output,d=>d.chance)/2])
      .range([0, 600])



    svg.selectAll("bars")
      .data(output)
      .enter()
      .append("rect")
      .attr("height", d => y(d.chance))
      .attr("width", 900 / 20)
      .attr("x", (d, i) => x(d.delegates))
      .attr("y", d => 600 - y(d.chance))
      .attr("fill", candidate_color)
      .attr("stroke", "white")
      .attr("stroke-width", 2)


    var dividers = [0, 1000, 2000, 3000, 4000]

    svg.selectAll("bars")
      .data(dividers)
      .enter()
      .append("text")
      .text(d => d)
      .attr("x", d => x(d))
      .attr("y", 620)
      .attr("fill", "grey")
      .attr("text-anchor", "middle")
      .attr("font-size",20)

    svg.append("line")
      .attr("x1", x(1990))
      .attr("x2", x(1990))
      .attr("y1", 00)
      .attr("y2", 599)
      .attr("stroke", "grey")
      .attr("stroke-width",2)

      svg.append("text")
      .text("1990 Delegates")
      .attr("x", x(1990)+5)
      .attr("y", 20)
      .attr("fill", "grey")
      .attr("font-size",20)
      .attr("text-anchor", "start")

  })