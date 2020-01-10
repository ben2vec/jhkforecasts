var category = ["Trump", "Democrats", "3rd Party"]
      // since Category B and E are really close to each other, assign them diverging colors
      var colorScale = d3.scaleOrdinal()
        .domain(category)
        .range(["#FF6060", "#0091FF", "#FFE130"])

    d3.csv("histogram.csv", function(error, data){
            
        
        
      console.log(data)  
      
      var max = d3.max(data,d=> d.demPerc)

      console.log(max)
        
      var svg = d3.select("#demev").append("svg")
            .attr("viewBox", '0 0 10000 1')

            svg.append("line")
            .attr("x1",20)
            .attr("y1",5)
            .attr("x2",538)
            .attr("y2",5)
            .attr("stroke-width",.5)
            .attr("stroke","lightgray")
            .attr("opacity",1)
    
            svg.append("line")
            .attr("x1",20)
            .attr("y1",75)
            .attr("x2",538)
            .attr("y2",75)
            .attr("stroke-width",.5)
            .attr("stroke","lightgray")
            .attr("opacity",1)

        
            svg.selectAll("bars")
            .data(data)
            .enter()
            .append("rect")
            .attr("x",d => d.ev)
            .attr("y",d => d.demY )
            .attr("width",1.5)
            .attr("height",d => d.dem)
            .attr("fill", "#0091FF");
            
            svg.append("text")
            .text("270")
            .attr("x",270)
            .attr("y", 160)
            .attr("fill","black")
            .attr("font-size",10)
            .attr("text-anchor","middle");

            svg.append("text")
            .text("200")
            .attr("x",200)
            .attr("y", 160)
            .attr("fill","black")
            .attr("font-size",8)
            .attr("text-anchor","middle");

            svg.append("text")
            .text("100")
            .attr("x",100)
            .attr("y", 160)
            .attr("fill","black")
            .attr("font-size",8)
            .attr("text-anchor","middle");

            svg.append("text")
            .text("300")
            .attr("x",300)
            .attr("y", 160)
            .attr("fill","black")
            .attr("font-size",8)
            .attr("text-anchor","middle");

            svg.append("text")
            .text("400")
            .attr("x",400)
            .attr("y", 160)
            .attr("fill","black")
            .attr("font-size",8)
            .attr("text-anchor","middle");


            svg.append("text")
            .text("500")
            .attr("x",500)
            .attr("y", 160)
            .attr("fill","black")
            .attr("font-size",8)
            .attr("text-anchor","middle");

            svg.append("line")
        .attr("x1",270)
        .attr("y1",0)
        .attr("x2",270)
        .attr("y2",150)
        .attr("stroke-width",1)
        .attr("stroke","black")
        .attr("opacity",.5)

        svg.append("text")
            .text("Democrats")
            .attr("x",50)
            .attr("y", 30)
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
            svg.append("text")
            .text(max/2+"%")
            .attr("x",10)
            .attr("y", 75)
            .attr("fill","black")
            .attr("font-size",7)
            .attr("text-anchor","middle")
    
            
    })
