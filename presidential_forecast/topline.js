var category = ["Trump", "Democrats", "3rd Party"]
              // since Category B and E are really close to each other, assign them diverging colors
              var colorScale = d3.scaleOrdinal()
                .domain(category)
                .range(["#FF6060", "#0091FF", "#FFE130"])
        
            d3.csv("statetoplines.csv", function(error, data){
                    
             var data = data.filter(function(d){return d.state == 'US';})    
                
              console.log(data)  
                
              var svg = d3.select("#topline").append("svg")
                    .attr("viewBox", '0 0 1000 100')
        
        
                svg.append("text")
                    .text("Democrats")
                    .attr("x",50)
                    .attr("y",25)
                    .attr("font-size",20)
                    .attr("fill","black")
                    .attr("text-anchor","start")
                    .attr("font-weight",500);
        
                svg.append("text")
                    .text("Trump")
                    .attr("x",950)
                    .attr("y",25)
                    .attr("font-size",20)
                    .attr("fill","black")
                    .attr("text-anchor","end")
                    .attr("font-weight",500)

                
        
                svg.selectAll("bar")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x",d => d.xValue)
                    .attr("y",40)
                    .attr("width",d => d.width)
                    .attr("height",20)
                    .attr("fill", d=> colorScale(d.cand))
        
                svg.selectAll("win")
                    .data(data)
                    .enter()
                    .append("text")
                    .text(d => d.win+"%")
                    .attr("x",d => d.xlabel)
                    .attr("y",95)
                    .attr("fill", "black")
                    .attr("font-size",30)
                    .attr("fill",d=> colorScale(d.cand))
                    .attr("text-anchor","middle")
                    .attr("font-weight",900)
            });