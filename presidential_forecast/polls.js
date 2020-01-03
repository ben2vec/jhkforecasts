var gopScale = d3.scaleLinear()
      .domain([20,80])
      .range(["white", "#FF6060"]);
var height10= 560;
var demScale = d3.scaleLinear()
      .domain([20,80])
      .range(["white", "#0091FF"]);

      d3.csv("polls.csv", function(error, data){

        var data = data.filter(function(d){return d.state == keyState;})


      var data = data.map((d,i) => {
          return {
            pollster: d.pollster,
            grade: d.grade,
            date: d.date,
            nsize: +d.nsize,
            ntype: d.ntype,
            dem: +d.dem,
            gop: +d.gop,
            adjmargin: +d.adjmargin,
          }
        })
        
        var svg = d3.select("#polls").append("svg")
        .attr("viewBox","-100 0 1150 560" )
        .append('g')


        

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
          .attr("x", 20)
          .attr("y", 0)
          .style("fill", "Black")
          .style("font-size", 15)
          .attr("font-weight",500)
          .text(d=>d.pollster)
          .attr("text-anchor","start")

        


        legend.append("text")
        .attr("class", "legend-text")
        .attr("x", 325)
        .attr("y", 0)
        .style("fill", "Black")
        .style("font-size", 15)
        .attr("font-weight",700)
        .text(d=>d.grade)
        .attr("text-anchor","middle")

        legend.append("text")
        .attr("class", "legend-text")
        .attr("x", 400)
        .attr("y", 0)
        .style("fill", "#BFBFBF")
        .style("font-size", 10)
        .attr("font-weight",700)
        .text(d=>d.date)
        .attr("text-anchor","middle")

        legend.append("text")
        .attr("class", "legend-text")
        .attr("x", 500)
        .attr("y", 0)
        .style("fill", "Black")
        .style("font-size", 10)
        .attr("font-weight",700)
        .text(d=>d.nsize)
        .attr("text-anchor","middle")

        legend.append("text")
        .attr("class", "legend-text")
        .attr("x", 525)
        .attr("y", 0)
        .style("fill", "Black")
        .style("font-size", 10)
        .attr("font-weight",700)
        .text(d=>d.ntype)
        .attr("text-anchor","middle")

        legend.append("rect")
        .attr("x",550)
        .attr("y",-30)
        .attr("width",100)
        .attr("height",50)
        .style("fill",d=> demScale(d.dem))

        legend.append("rect")
        .attr("x",650)
        .attr("y",-30)
        .attr("width",100)
        .attr("height",50)
        .style("fill",d=> gopScale(d.gop))


        legend.append("text")
        .attr("class", "legend-text")
        .attr("x", 600)
        .attr("y", 0)
        .style("fill", "Black")
        .style("font-size", 15)
        .attr("font-weight",700)
        .text(d=>d.dem+"%")
        .attr("text-anchor","middle")


        legend.append("text")
        .attr("class", "legend-text")
        .attr("x", 700)
        .attr("y", 0)
        .style("fill", "Black")
        .style("font-size", 15)
        .attr("font-weight",700)
        .text(d=>d.gop+"%")
        .attr("text-anchor","middle")

        legend.append("text")
        .attr("class", "legend-text")
        .attr("x", 825)
        .attr("y", 0)
        .style("fill", d=>d.adjmargin>0?"#FF6060" : "#0091FF")
        .style("font-size", 15)
        .attr("font-weight",700)
        .text(d=>d.adjmargin>0 ? "Gop "+Math.abs(d.adjmargin)+"%":"Dem "+Math.abs(d.adjmargin)+"%")
        .attr("text-anchor","middle")
        

        svg.append("text")
          .attr("x", 20)
          .attr("y", 40)
          .style("fill", "Black")
          .style("font-size", 15)
          .attr("font-weight",500)
          .text("Pollster")
          .attr("text-anchor","start")

        
        svg.append("text")
          .attr("x", 325)
          .attr("y", 40)
          .style("fill", "Black")
          .style("font-size", 15)
          .attr("font-weight",500)
          .text("Grade")
          .attr("text-anchor","middle")

        svg.append("text")
          .attr("x", 400)
          .attr("y", 40)
          .style("fill", "Black")
          .style("font-size", 15)
          .attr("font-weight",500)
          .text("Date")
          .attr("text-anchor","middle")


        svg.append("text")
          .attr("x", 600)
          .attr("y", 40)
          .style("fill", "Black")
          .style("font-size", 15)
          .attr("font-weight",500)
          .text("Dem")
          .attr("text-anchor","middle")


        svg.append("text")
          .attr("x", 700)
          .attr("y", 40)
          .style("fill", "Black")
          .style("font-size", 15)
          .attr("font-weight",500)
          .text("Gop")
          .attr("text-anchor","middle")

        svg.append("text")
          .attr("x", 825)
          .attr("y", 40)
          .style("fill", "Black")
          .style("font-size", 15)
          .attr("font-weight",500)
          .text("Adj. Margin")
          .attr("text-anchor","middle")


        legend.append("line")
        .attr("x1",0)
        .attr("x2",950)
        .attr("y1",20)
        .attr("y2",20)
        .attr("stroke-width",1)
        .attr("stroke","#E2E2E2")

        svg.append("line")
        .attr("x1",0)
        .attr("x2",950)
        .attr("y1",60)
        .attr("y2",60)
        .attr("stroke-width",2)
        .attr("stroke","black")
      });