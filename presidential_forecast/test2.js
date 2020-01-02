var category = ["Trump", "Democrats", "3rd Party"]
    // since Category B and E are really close to each other, assign them diverging colors
    var colorScale = d3.scaleOrdinal()
      .domain(category)
      .range(["#FF6060", "#0091FF", "#FFE130"])

      d3.csv("tp_margin.csv", function(error, data){

        var data = data.filter(function(d){return d.measure == 'margin';})

        var svg = d3.select("#margin").append("svg")
        .attr("viewBox",'0 0 620 600')
        .append('g')

        svg.append("text")
        .text("Closest States")
        .attr("x", 20)
          .attr("y", 40)
          .style("fill", "Black")
          .style("font-size", 30)
          .attr("font-weight",700)

        svg.append("line")
        .attr("x1",0)
        .attr("x2",600)
        .attr("y1",60)
        .attr("y2",60)
        .attr("stroke-width",1)
        .attr("stroke","black")

        var svgLegend = svg.append('g')
          .attr('class', 'gLegend')
          .attr("transform", "translate(" + 0 + "," + 90 + ")")

      

      var legend = svgLegend.selectAll('.legend')
        .data(data)
        .enter().append('g')
          .attr("class", "legend")
          .attr("transform", function (d, i) {return "translate(0," + i * 50 + ")"})

      

      legend.append("text")
          .attr("class", "legend-text")
          .attr("x", 0)
          .attr("y", 0)
          .style("fill", "Black")
          .style("font-size", 15)
          .attr("font-weight",700)
          .text(d=>d.state)
          .attr("text-anchor","start")

        

        legend.append("rect")
        .attr("x",d=>d.x)
        .attr("y",-25)
        .attr("width",d=>d.width)
        .attr("height",40)
        .attr("fill",d=>d.percentage > 0?"#FF6060":"#0091FF")

        legend.append("text")
        .attr("class", "legend-text")
        .attr("x", 520)
        .attr("y", 0)
        .style("fill",d=>d.percentage > 0?"#FF6060":"#0091FF")
        .style("font-size", 15)
        .attr("font-weight",700)
        .text(d=>d.percentage > 0 ? "R+ " +Math.abs(d.percentage)+"%":"D+ "+Math.abs(d.percentage)+"%")
        .attr("text-anchor","start")

        legend.append("line")
        .attr("x1",0)
        .attr("x2",600)
        .attr("y1",20)
        .attr("y2",20)
        .attr("stroke-width",1)
        .attr("stroke","#E2E2E2")


      });