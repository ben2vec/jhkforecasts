var category = ["Trump", "Democrats", "3rd Party"]
              // since Category B and E are really close to each other, assign them diverging colors
              var colorScale = d3.scaleOrdinal()
                .domain(category)
                .range(["#FF6060", "#0091FF", "#FFE130"])
        
            d3.csv("statetoplines.csv", function(error, data){
                    
             var data = data.filter(function(d){return d.state == keyState;})    
                
              console.log(data)  
                
              var svg = d3.select("#topline").append("svg")
                    .attr("viewBox", '0 0 1000 200')
        
        

                    svg.append("text")
                    .text(keyState=="US"?"Win Presidency":"Win "+keyState)
                    .attr("x",500)
                    .attr("y",20)
                    .attr("font-size",30)
                    .attr("fill","Black")
                    .attr("text-anchor","middle")
                    .attr("dominant-baseline","middle")
                    .attr("font-weight",900);

                svg.append("text")
                    .text("D")
                    .attr("x",440)
                    .attr("y",90)
                    .attr("font-size",60)
                    .attr("fill",colorScale("Democrats"))
                    .attr("text-anchor","middle")
                    .attr("dominant-baseline","middle")
                    .attr("font-weight",900);
        
                svg.append("image")
                .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
                    .attr("x",510)
                    .attr("y",40)
                    .attr("width",100)
                    .attr("height",100)
                   
                svg.append("text")
                    .text(data[1].win+"%")
                    .attr("x",560)
                    .attr("y",170)
                    .attr("font-size",30)
                    .attr("fill",colorScale("Trump"))
                    .attr("text-anchor","middle")
                    .attr("font-weight",900);

                    svg.append("text")
                    .text(data[0].win+"%")
                    .attr("x",440)
                    .attr("y",170)
                    .attr("font-size",30)
                    .attr("fill",colorScale("Democrats"))
                    .attr("text-anchor","middle")
                    .attr("font-weight",900);

                
        
                
        
                
            });
        