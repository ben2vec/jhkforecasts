var colors = ["#FF6060", "#0091FF", "#FFE130"]
var bubble_info = [{ "state": "Alabama", "abbrev": "AL", "radius": 16.43, "x": 413, "y": 332 }, { "state": "Alaska", "abbrev": "AK", "radius": 9.49, "x": 41, "y": 19 }, { "state": "Arizona", "abbrev": "AZ", "radius": 18.17, "x": 172, "y": 282 }, { "state": "Arkansas", "abbrev": "AR", "radius": 13.42, "x": 325, "y": 290 }, { "state": "California", "abbrev": "CA", "radius": 40.62, "x": 103, "y": 237 }, { "state": "Colorado", "abbrev": "CO", "radius": 16.43, "x": 224, "y": 249 }, { "state": "Connecticut", "abbrev": "CT", "radius": 14.49, "x": 586, "y": 128 }, { "state": "Delaware", "abbrev": "DE", "radius": 9.49, "x": 557, "y": 183 }, { "state": "Florida", "abbrev": "FL", "radius": 29.5, "x": 483, "y": 380 }, { "state": "Georgia", "abbrev": "GA", "radius": 21.91, "x": 443, "y": 298 }, { "state": "Hawaii", "abbrev": "HI", "radius": 10.95, "x": 88, "y": 372 }, { "state": "Idaho", "abbrev": "ID", "radius": 10.95, "x": 188, "y": 173 }, { "state": "Illinois", "abbrev": "IL", "radius": 24.49, "x": 359, "y": 207 }, { "state": "Indiana", "abbrev": "IN", "radius": 18.17, "x": 413, "y": 207 }, { "state": "Iowa", "abbrev": "IA", "radius": 13.42, "x": 306, "y": 195 }, { "state": "Kansas", "abbrev": "KS", "radius": 13.42, "x": 266, "y": 248 }, { "state": "Kentucky", "abbrev": "KY", "radius": 15.49, "x": 411, "y": 251 }, { "state": "Louisiana", "abbrev": "LA", "radius": 15.49, "x": 326, "y": 335 }, { "state": "Maine", "abbrev": "ME", "radius": 7.75, "x": 628, "y": 26 }, { "state": "Maryland", "abbrev": "MD", "radius": 17.32, "x": 505, "y": 185 }, { "state": "Massachusetts", "abbrev": "MA", "radius": 18.17, "x": 607, "y": 89 }, { "state": "Michigan", "abbrev": "MI", "radius": 21.91, "x": 418, "y": 149 }, { "state": "Minnesota", "abbrev": "MN", "radius": 17.32, "x": 304, "y": 142 }, { "state": "Mississippi", "abbrev": "MS", "radius": 13.42, "x": 373, "y": 324 }, { "state": "Missouri", "abbrev": "MO", "radius": 17.32, "x": 329, "y": 251 }, { "state": "Montana", "abbrev": "MT", "radius": 9.49, "x": 206, "y": 131 }, { "state": "Nebraska", "abbrev": "NE", "radius": 7.75, "x": 258, "y": 209 }, { "state": "Nevada", "abbrev": "NV", "radius": 13.42, "x": 167, "y": 220 }, { "state": "New Hampshire", "abbrev": "NH", "radius": 10.95, "x": 612, "y": 54 }, { "state": "New Jersey", "abbrev": "NJ", "radius": 20.49, "x": 551, "y": 147 }, { "state": "New Mexico", "abbrev": "NM", "radius": 12.25, "x": 215, "y": 303 }, { "state": "New York", "abbrev": "NY", "radius": 29.5, "x": 548, "y": 81 }, { "state": "North Carolina", "abbrev": "NC", "radius": 21.21, "x": 499, "y": 278 }, { "state": "North Dakota", "abbrev": "ND", "radius": 9.49, "x": 257, "y": 136 }, { "state": "Ohio", "abbrev": "OH", "radius": 23.24, "x": 459, "y": 191 }, { "state": "Oklahoma", "abbrev": "OK", "radius": 14.49, "x": 270, "y": 294 }, { "state": "Oregon", "abbrev": "OR", "radius": 14.49, "x": 124, "y": 176 }, { "state": "Pennsylvania", "abbrev": "PA", "radius": 24.49, "x": 498, "y": 132 }, { "state": "Rhode Island", "abbrev": "RI", "radius": 10.95, "x": 619, "y": 126 }, { "state": "South Carolina", "abbrev": "SC", "radius": 16.43, "x": 487, "y": 322 }, { "state": "South Dakota", "abbrev": "SD", "radius": 9.49, "x": 257, "y": 167 }, { "state": "Tennessee", "abbrev": "TN", "radius": 18.17, "x": 379, "y": 284 }, { "state": "Texas", "abbrev": "TX", "radius": 33.76, "x": 271, "y": 355 }, { "state": "Utah", "abbrev": "UT", "radius": 13.42, "x": 204, "y": 218 }, { "state": "Vermont", "abbrev": "VT", "radius": 9.49, "x": 585, "y": 47 }, { "state": "Virginia", "abbrev": "VA", "radius": 19.75, "x": 508, "y": 229 }, { "state": "Washington", "abbrev": "WA", "radius": 18.97, "x": 154, "y": 131 }, { "state": "West Virginia", "abbrev": "WV", "radius": 12.25, "x": 451, "y": 242 }, { "state": "Wisconsin", "abbrev": "WI", "radius": 17.32, "x": 359, "y": 146 }, { "state": "Wyoming", "abbrev": "WY", "radius": 9.49, "x": 214, "y": 177 }, { "state": "District of Columbia", "abbrev": "DC", "radius": 9.49, "x": 536, "y": 193 }, { "state": "Maine-1", "abbrev": 1, "radius": 5.48, "x": 612, "y": 26 }, { "state": "Maine-2", "abbrev": 2, "radius": 5.48, "x": 644, "y": 26 }, { "state": "Nebraska-1", "abbrev": 1, "radius": 5.48, "x": 242, "y": 209 }, { "state": "Nebraska-2", "abbrev": 2, "radius": 5.48, "x": 258, "y": 193 }, { "state": "Nebraska-3", "abbrev": 3, "radius": 5.48, "x": 274, "y": 209 }]
var category = ["gop", "dem", "third"]

var cand_colors = d3.scaleOrdinal()
  .domain(category)
  .range(["#FF6060", "#0091FF", "#FFE130"])

var color = d3.scaleLinear()
  .domain([0, 50, 100])
  .range(["#0091FF", "white", "#FF6060"]);
var tformat = d3.timeFormat("%m/%d/%Y")
var dateparse = d3.timeParse("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
var numberformat = d3.format(".1f")
var updated_format = d3.timeFormat("%b. %d %Y %I:%M %p")



d3.csv("data.csv", data => {

  data.forEach((d, i) => {
    d.forecast_date = dateparse(d.forecast_date)
    return d
  })
  console.log(data)

  var newest_data = data.slice(data.length - 171, data.length)

  

  var dist = d3.select("#dist").append("svg")
    
    show_more(975)

  function show_more(input_height) {


    dist.attr("viewBox", "00 40 1000 " + input_height)
    
    var fdt = []
    for (let k = 0; k < bubble_info.length; k++) {
      var dt = newest_data.filter(d => d.state == bubble_info[k].state)
      var finaldt = {
        state: bubble_info[k].state,
        electoral_votes: +dt[0].electoral_vote,
        std: (+dt[0].proj_vote - +dt[0].p_10) / 1.28,
        gop_vote: +dt[0].proj_vote,
        dem_vote: +dt[1].proj_vote,
        third_vote: +dt[2].proj_vote,
        tipping_point: +dt[0].tipping_point
      }
      finaldt.margin = finaldt.gop_vote - finaldt.dem_vote
      fdt.push(finaldt)
    }
    var min_stdev = d3.min(fdt,d=>d.std)*.8
    var highest_curve = jStat.normal.pdf(0, 0,min_stdev)
    fdt.sort((a, b) => b.tipping_point - a.tipping_point)
    var y3 = d3.scaleLinear()
      .domain([0, highest_curve])
      .range([0, 45])
    var sd4 = []

    for (let k = 0; k < bubble_info.length; k++) {
      var gopcurve = []
      var demcurve = []

      for (let l = 1; l < 500; l++) {

        var gq = jStat.normal.inv(l / 500, fdt[k].gop_vote, fdt[k].std * .8)
        var gp = jStat.normal.pdf(gq, fdt[k].gop_vote, fdt[k].std * .8)

        var dq = jStat.normal.inv(l / 500, fdt[k].dem_vote, fdt[k].std * .8)
        var dp = jStat.normal.pdf(dq, fdt[k].dem_vote, fdt[k].std * .8)

        var tq = (fdt[k].third_vote/.4)*(l / 500)
        var tp = jStat.beta.pdf(l/500, fdt[k].dem_vote, fdt[k].std * .8)

        var gopvalues = {
          x: gq,
          y: -y3(gp) + k * 50 + 160,
          y2: k * 50 + 160
        }

        var demvalues = {
          x: dq,
          y: -y3(dp) + k * 50 + 160,
          y2: k * 50 + 160
        }
        gopcurve.push(gopvalues)
        demcurve.push(demvalues)
      }
      var dt = {
        state: fdt[k].state,
        gopvalues: gopcurve,
        demvalues: demcurve,
        margin: fdt[k].margin,
        tipping_point: fdt[k].tipping_point
      }


      sd4.push(dt)
    }


    console.log(sd4)
    


    var x3 = d3.scaleLinear()
      .domain([0, 100])
      .range([150, 700])

    var area = d3.area()
      .x0(d => x3(d.x))
      .y0(d => d.y2)
      .y1(d => d.y)

    var line = d3.line()
      .x(d => x3(d.x))
      .y(d => d.y)

    var curves = dist.selectAll(".cities")
      .data(sd4)



    curves.enter().insert("g", ".focus").append("path")
      .attr("class", "line cities")
      .style("stroke-width", 3)
      .style("opacity", .4)
      .style("fill", "lightgrey")
      .attr("d", d => area(d.demvalues))
      .style("stroke", (d, i) => "lightgrey")

    curves.enter().insert("g", ".focus").append("path")
      .attr("class", "line cities")
      .style("stroke-width", 3)
      .style("opacity", .4)
      .style("fill", "lightgrey")
      .attr("d", d => area(d.gopvalues))
      .style("stroke", (d, i) => "lightgrey")


    curves.enter().insert("g", ".focus").append("path")
      .attr("class", "line cities")
      .style("opacity", .4)
      .style("fill", "#FF6060")
      .attr("d", d => area(d.gopvalues.filter((d, i) => i < 475 && i > 25)))
      .style("stroke", (d, i) => "#FF6060")

    curves.enter().insert("g", ".focus").append("path")
      .attr("class", "line cities")
      .style("opacity", .4)
      .style("fill", "#0091FF")
      .attr("d", d => area(d.demvalues.filter((d, i) => i < 475 && i > 25)))
      .style("stroke", (d, i) => "#0091FF")

    var pct = [0, 25, 50, 75, 100]


    dist.selectAll()
      .data(pct)
      .enter()
      .append("text")
      .text(d => d + "%")
      .attr("x", d => x3(d))
      .attr("y", 90)
      .attr("text-anchor", "middle")
      .attr("font-weight", 700)
      .attr("font-size",10)

    dist.selectAll()
      .data(sd4)
      .enter()
      .append("text")
      .text(d => d.state)
      .attr("x", 20)
      .attr("y", (d, i) => i * 50 + 150)
      .attr("font-weight", 700)

    dist.selectAll()
      .data(sd4)
      .enter()
      .append("text")
      .text(d => numberformat(d.tipping_point) + "%")
      .attr("x", 980)
      .attr("y", (d, i) => i * 50 + 150)
      .attr("font-weight", 700)
      .attr("text-anchor", "end")

    dist.selectAll()
      .data(sd4)
      .enter()
      .append("text")
      .text(d => d.margin >= 0 ? "Trump +" + numberformat(Math.abs(d.margin)) + "%" : "Biden +" + numberformat(Math.abs(d.margin)) + "%")
      .attr("x", 800)
      .attr("y", (d, i) => i * 50 + 150)
      .attr("font-weight", 700)
      .attr("text-anchor", "middle")
      .attr("fill", d => d.margin >= 0 ? "#FF6060" : "#0091FF")



    dist.selectAll()
      .data(sd4)
      .enter()
      .append("line")
      .attr("x1", 20)
      .attr("x2", 980)
      .attr("y1", (d, i) => i * 50 + 161)
      .attr("y2", (d, i) => i * 50 + 161)
      .attr("stroke", "black")

    dist.append("text")
      .text("Tipping Point")
      .attr("x", 980)
      .attr("y", 90)
      .attr("font-weight", 700)
      .attr("text-anchor", "end")

      dist.append("text")
      .text("Margin")
      .attr("x", 800)
      .attr("y", 90)
      .attr("font-weight", 700)
      .attr("text-anchor", "middle")

      dist.append("text")
      .text("Projected Vote")
      .attr("x", x3(50))
      .attr("y", 60)
      .attr("font-weight", 700)
      .attr("text-anchor", "middle")

     
  }



  var more = d3.select("#more")
  .on("click", function (d,i) {
    
    document.getElementById("less").style.display = "block"
    
    show_more(2920)
  })

  var less = d3.select("#less")
  .on("click", function (d,i) {

    document.getElementById("less").style.display = "block"
    
    show_more(750)
  })

})