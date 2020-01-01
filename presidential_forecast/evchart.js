var category = ["Trump", "Democrats", "3rd Party"]
      // since Category B and E are really close to each other, assign them diverging colors
      var colorScale = d3.scaleOrdinal()
        .domain(category)
        .range(["#FF6060", "#0091FF", "#FFE130"])

    d3.csv("votecharts.csv", function(error, data){
            
     var data = data.filter(function(d){return d.state == 'USev';})    
        
      console.log(data)  
        
      var svg = d3.select("#evchart").append("svg")
            .attr("viewBox", '00 0 820 300')


            


        svg.append("line")
        .attr("x1",500)
        .attr("y1",50)
        .attr("x2",500)
        .attr("y2",275)
        .attr("stroke-width",1)
        .attr("stroke","lightgrey")

        



        
            svg.selectAll("bars")
            .data(data)
            .enter()
            .append("rect")
            .attr("x",d => d.xValue)
            .attr("y",d => d.yValue)
            .attr("rx",5)
            .attr("ry",5)
            .attr("width",d => d.width)
            .attr("height",75)
            .attr("fill", d=> colorScale(d.cand))
            .style("opacity",.5)
        

        svg.selectAll("candidates")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.cand)
            .attr("x",20)
            .attr("y",d => d.yText)
            .attr("fill","black")
            .attr("font-size",20)
            .attr("font-weight",700)
   

        svg.selectAll("VoteShare")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.vote)
            .attr("x",d => d.voteLable)
            .attr("y",d => d.yText)
            .attr("fill","black")
            .attr("font-size",15)
            .style("text-anchor","middle")
            .attr("font-weight",700)

            svg.selectAll("bars")
            .data(data)
            .enter()
            .append("rect")
            .attr("x",d => d.voteLable)
            .attr("y",d => d.yValue)
            .attr("rx",5)
            .attr("ry",5)
            .attr("width",2)
            .attr("height",25)
            .attr("fill", d=> colorScale(d.cand))
            .style("opacity",1)

           
        svg.append("line")
        .attr("x1",0)
        .attr("y1",275)
        .attr("x2",800)
        .attr("y2",275)
        .attr("stroke-width",1)
        .attr("stroke","black")

        svg.append("line")
        .attr("x1",200)
        .attr("y1",125)
        .attr("x2",800)
        .attr("y2",125)
        .attr("stroke-width",1)
        .attr("stroke","black")

        svg.append("line")
        .attr("x1",200)
        .attr("y1",200)
        .attr("x2",800)
        .attr("y2",200)
        .attr("stroke-width",1)
        .attr("stroke","black")

        svg.append("line")
        .attr("x1",0)
        .attr("y1",50)
        .attr("x2",800)
        .attr("y2",50)
        .attr("stroke-width",1)
        .attr("stroke","black")

        svg.append("text")
        .text("Projected Electoral Votes")
        .attr("x",30)
        .attr("y",35)
        .attr("fill","black")
        .style("text-anchor","start")
        .attr("font-size",40)
            .attr("font-weight",700)
        
            svg.append("text")
            .text("80% confidence")
            .attr("x",700)
            .attr("y",35)
            .attr("fill","black")
            .style("text-anchor","middle")
            .attr("font-size",12)
                .attr("font-weight",500)
        
         

        svg.append("text")
                            .text("270")
                            .attr("x",500)
                            .attr("y",290)
                            .attr("fill","black")
                            .style("text-anchor","middle")
                            .attr("font-size",12)
                                .attr("font-weight",500)    
                                

                        
    })







