    var margin = {top: 30, right:50, bottom:0, left:50}
    var width = 860 - margin.left - margin.right
    var height = 280 - margin.top - margin.bottom
    var axisPad = 12 
    var color = d3.scaleLinear()
        .domain([0,50,100])
            .range(["#0091FF","white" ,"#FF6060"])
    var div = d3.select("#raceto270").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);

        var tool_tip1 = d3.tip()
        .attr("class", "d3-tip")
        .offset([-30,0])
        .html("<div id='tipDiv'></div>");
      
      svg.call(tool_tip1)

    d3.csv("evrace.csv", function(error, data){
            
            
        
        var res = data.map((d,i) => {
            return {
            state : +d.state,
            electoralVotes : +d.electoralVotes,
            gopWin :+d.gopWin,
            demWin : +d.demWin,
            winHeight:+d.winHeight,
            winY : +d.winY,
            evWidth : +d.evWidth,
            evX : +d.evX,
            textX : +d.textX,
            pageLink : +d.pageLink,
            }
        })

        
            
        var xScale = d3.scaleLinear()
            .domain([0,538])
            .range([0, width])
    
            
    
            var yScale = d3.scaleLinear()
            .domain([0,250])
            .range([0, height]);

        

            var svg = d3.select("#raceto270").append("svg")
            .attr("viewBox", '0 0 860 370')
            
            .append('g')
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            

            var xAxis = d3.axisBottom(xScale)
            var yAxis = d3.axisLeft(yScale)
            

            
                                svg.selectAll("rect")
                                .data(data)
                                .enter()
                                .append("a")
                                .attr("xlink:href", function(d) {return  d.pageLink})
                                .append("rect")
                                .attr("rx", 2)
                                .attr("ry", 1)
                                .attr("x",d => xScale(d.evX))
                                .attr("y",d => yScale(d.winY))
                                .attr("width", d => xScale(d.evWidth))
                                .attr("height",d => yScale(d.winHeight))
                                .style("fill",d => color(d.gopWin) )
                                .attr("stroke","white")
                                .attr("stroke-width","0.5")
                                .on('mouseover', function(d) {
                                    tool_tip1.show();
                                    var tipSVG = d3.select("#tipDiv")
                                      .append("svg")
                                      .attr("width", 150)
                                  .attr("height", 50);
                                  
                                
                                
                                tipSVG.append("text")
                                  .text(d.state)
                                  .attr("y", 20)
                                  .attr("x",75)
                                  .attr("fill","#black")
                                  .attr("text-anchor","middle")
                                  .style("font-weight","600")
                                  .style("font-size","20");
                                  
                                tipSVG.append("text")
                                  .text((Math.abs(d.gopWin - 50) + 50) + "%") 
                                  .attr("y", 40)
                                  .attr("x",75)
                                  .attr("fill","#black")
                                  .attr("text-anchor","middle")
                                  .style("font-weight","600")
                                  .style("font-size","20");
                                  
                                      
                                
                                    
                                  })
                                  .on('mouseout', tool_tip1.hide);
                                
                        
            
            svg.append("line")
                    .attr("x1", xScale(270))
                    .attr("y1", 0)
                    .attr("x2", xScale(270))
                    .attr("y2", 250)
                    .attr("stroke", "black")
                    .attr("stroke-width","1");
                                
            svg.append("text")
                    .html("270")
                    .attr("x", xScale(270))
                    .attr("y", 265)
                    .attr("text-anchor","middle")
                    .style("font-weight","600")
                    .style("font-family","brandon-grotesque");
            
            


                    
        })