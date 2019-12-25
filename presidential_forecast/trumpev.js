var category = ["Trump", "Democrats", "3rd Party"]
      // since Category B and E are really close to each other, assign them diverging colors
      var colorScale = d3.scaleOrdinal()
        .domain(category)
        .range(["#FF6060", "#0091FF", "#FFE130"])

    d3.csv("histogram.csv", function(error, data){
            
        
        
      console.log(data)  
      
      var max = d3.max(data,d=> d.gopPerc)

      console.log(max)
        
      var svg = d3.select("#trumpev").append("svg")
            .attr("viewBox", '-100 0 738 175')




        
            svg.selectAll("bars")
            .data(data)
            .enter()
            .append("rect")
            .attr("x",d => d.ev)
            .attr("y",d => d.gopY )
            .attr("width",1.1)
            .attr("height",d => d.gop)
            .attr("fill", "#FF6060");
            
            svg.append("text")
            .text("270")
            .attr("x",270)
            .attr("y", 160)
            .attr("fill","black")
            .attr("font-size",8)
            .attr("text-anchor","middle");

            svg.append("text")
            .text("200")
            .attr("x",200)
            .attr("y", 160)
            .attr("fill","black")
            .attr("font-size",6)
            .attr("text-anchor","middle");

            svg.append("text")
            .text("100")
            .attr("x",100)
            .attr("y", 160)
            .attr("fill","black")
            .attr("font-size",6)
            .attr("text-anchor","middle");

            svg.append("text")
            .text("300")
            .attr("x",300)
            .attr("y", 160)
            .attr("fill","black")
            .attr("font-size",6)
            .attr("text-anchor","middle");

            svg.append("text")
            .text("400")
            .attr("x",400)
            .attr("y", 160)
            .attr("fill","black")
            .attr("font-size",6)
            .attr("text-anchor","middle");


            svg.append("text")
            .text("500")
            .attr("x",500)
            .attr("y", 160)
            .attr("fill","black")
            .attr("font-size",6)
            .attr("text-anchor","middle");

            svg.append("line")
        .attr("x1",270)
        .attr("y1",0)
        .attr("x2",270)
        .attr("y2",150)
        .attr("stroke-width",1)
        .attr("stroke","black")
        .attr("opacity",.3)

        svg.append("text")
            .text("Trump")
            .attr("x",538)
            .attr("y", 70)
            .attr("fill","black")
            .attr("font-size",20)
            .attr("text-anchor","middle");

            svg.append("text")
            .text(max+"%")
            .attr("x",10)
            .attr("y", 5)
            .attr("fill","black")
            .attr("font-size",7)
            .attr("text-anchor","middle")
    
            svg.append("line")
        .attr("x1",20)
        .attr("y1",5)
        .attr("x2",538)
        .attr("y2",5)
        .attr("stroke-width",.5)
        .attr("stroke","lightgray")
        .attr("opacity",.4)

    })
