

    var margin7 = {top: 0, right: 0, bottom: 0, left: 0}
    var width7 = 860 - margin7.left - margin7.right
    var height7 = 445
    var axisPad = 12 
    var color = d3.scaleLinear()
        .domain([0,50,100])
            .range(["#0091FF","white" ,"#FF6060"])
    var div = d3.select("#bubblemap2").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);

    d3.csv("bubble map.csv", function(error, data){
            
            
        
        
        
            
        var x = d3.scaleLinear()
            .domain([0,780])
            .range([0, width7])
    
            
    
            var y = d3.scaleLinear()
            .domain([0,445])
            .range([0, height7]);

        

            var svg = d3.select("#bubblemap2").append("svg")
            .attr("viewBox", '0 0 760 445')
            
            .append('g')
                .attr("transform", "translate(" + margin7.left + "," + margin7.top + ")");
            

            
            

            
                                svg.selectAll("states")
                                .data(data)
                                .enter()
                                .append("a")
                                .attr("xlink:href", function(d) {return  d.pageLink})
                                .append("circle")
                                .attr("cx",d => x(d.xValue))
                                .attr("cy",d => y(d.yValue))
                                .attr("r", d => d.radius)
                                .style("fill",d => color(d.gopWin) )
                                .attr("stroke",d =>  d.tippingPoint >= 3 ? "black" : "none")
                                .attr("stroke-width","1.5")
                                .on('mouseover', function(d) {
                                    tool_tip.show();
                                    var tipSVG = d3.select("#tipDiv")
                                      .append("svg")
                                      .attr("width", 150)
                                  .attr("height", 120);
                                  
                                
                                    tipSVG.append("rect")
                                      .attr("fill", "#FF6060")
                                      .attr("y", 50)
                                      .attr("width", 0)
                                      .attr("height", 20)
                                      .transition()
                                      .duration(300)
                                      .attr("width", d.gopWin);
                                  
                                tipSVG.append("text")
                                      .text("Gop Win" +"%")
                                  .attr("y", 45);
                                
                                tipSVG.append("text")
                                  .text(d.state)
                                  .attr("y", 20)
                                  .attr("x",10)
                                  .attr("fill","#black")
                                  .style("font-weight","600")
                                  .style("font-size","20");
                                
                                  tipSVG.append("text")
                                      .text("Dem Win" +"%")
                                      .attr("y", 105)
                                      
                                
                                    tipSVG.append("text")
                                      .text(d.gopWin +"%")
                                      .attr("y", 65)
                                      .attr("x",110)
                                  
                                  .attr("fill","#FF6060")
                                  .style("font-weight","600")
                                  .style("font-size","15");
                                
                                tipSVG.append("rect")
                                      .attr("fill", "#0091FF")
                                      .attr("y", 70)
                                      .attr("width", 0)
                                      .attr("height", 20)
                                      .transition()
                                      .duration(300)
                                      .attr("width", d.demWin);
                                
                                    tipSVG.append("text")
                                      .text(d.demWin +"%")
                                      .attr("y", 85)
                                      .attr("x",110)
                                  
                                  .attr("fill","#0091FF")
                                  .style("font-weight","600")
                                  .style("font-size","15");
                                  })
                                  .on('mouseout', tool_tip.hide);
                                
                        svg.selectAll("label")
                        .data(data)
                        .enter()
                        .append("text")
                        .text(d => d.abbrev)
                        .attr("x",d => x(d.xValue))
                        .attr("y",d => y(d.yValue)+3)
                        .attr("text-anchor","middle")
                        .attr("font-family","brandon-grotesque")
                        .attr("font-weight","500")
                        .attr("font-size","8")
                        .on('mouseover', function(d) {
                          tool_tip.show();
                          var tipSVG = d3.select("#tipDiv")
                            .append("svg")
                            .attr("width", 150)
                        .attr("height", 120);
                        
                      
                          tipSVG.append("rect")
                            .attr("fill", "#FF6060")
                            .attr("y", 50)
                            .attr("width", 0)
                            .attr("height", 20)
                            .transition()
                            .duration(300)
                            .attr("width", d.gopWin);
                        
                      tipSVG.append("text")
                            .text("Gop Win" +"%")
                        .attr("y", 45);
                      
                      tipSVG.append("text")
                        .text(d.state)
                        .attr("y", 20)
                        .attr("x",10)
                        .attr("fill","#black")
                        .style("font-weight","600")
                        .style("font-size","20");
                      
                        tipSVG.append("text")
                            .text("Dem Win" +"%")
                            .attr("y", 105)
                            
                      
                          tipSVG.append("text")
                            .text(d.gopWin +"%")
                            .attr("y", 65)
                            .attr("x",110)
                        
                        .attr("fill","#FF6060")
                        .style("font-weight","600")
                        .style("font-size","15");
                      
                      tipSVG.append("rect")
                            .attr("fill", "#0091FF")
                            .attr("y", 70)
                            .attr("width", 0)
                            .attr("height", 20)
                            .transition()
                            .duration(300)
                            .attr("width", d.demWin);
                      
                          tipSVG.append("text")
                            .text(d.demWin +"%")
                            .attr("y", 85)
                            .attr("x",110)
                        
                        .attr("fill","#0091FF")
                        .style("font-weight","600")
                        .style("font-size","15");
                        })
                        .on('mouseout', tool_tip.hide);
                        svg.append("circle")
                        .attr("cx",620)
                        .attr("cy",425)
                        .attr("r", 10)
                        .attr("stroke","black")
                        .attr("stroke-width","1.5")
                        .attr("fill","none");

                        svg.append("text")
                        .attr("x",635)
                        .attr("y",430)
                        .text("Tipping Points")
                        .attr("font-family","brandon-grotesque")
                        .attr("font-weight","500")
                        .attr("font-size","15");

                        svg.append("text")
                        .attr("x",680)
                        .attr("y",270)
                        .text("GOP")
                        .attr("text-anchor","middle")
                            .attr("font-family","brandon-grotesque")
                            .attr("font-weight","500")
                            .attr("font-size","15");

                        svg.append("text")
                            .attr("x",640)
                            .attr("y",270)
                            .text("DEM")
                            .attr("text-anchor","middle")
                                .attr("font-family","brandon-grotesque")
                                .attr("font-weight","500")
                                .attr("font-size","15");
                        svg.append("text")
                            .attr("x",610)
                            .attr("y",295)
                            .text("100%")
                            .attr("text-anchor","middle")
                                .attr("font-family","brandon-grotesque")
                                .attr("font-weight","500")
                                .attr("font-size","12");

                    svg.append("text")
                                .attr("x",610)
                                .attr("y",370)
                                .text("70%")
                                .attr("text-anchor","middle")
                                    .attr("font-family","brandon-grotesque")
                                    .attr("font-weight","500")
                                    .attr("font-size","12");    
                    
                    svg.append("text")
                                .attr("x",610)
                                .attr("y",320)
                                .text("90%")
                                .attr("text-anchor","middle")
                                    .attr("font-family","brandon-grotesque")
                                    .attr("font-weight","500")
                                    .attr("font-size","12");  
                    svg.append("text")                
                                .attr("x",610)
                                .attr("y",345)
                                .text("80%")
                                .attr("text-anchor","middle")
                                    .attr("font-family","brandon-grotesque")
                                    .attr("font-weight","500")
                                    .attr("font-size","12");    
                    svg.append("text")                
                                    .attr("x",610)
                                    .attr("y",395)
                                    .text("60%")
                                    .attr("text-anchor","middle")
                                    .attr("font-family","brandon-grotesque")
                                    .attr("font-weight","500")
                                    .attr("font-size","12");                           
                        
                    //dem legend
                    svg.append("circle")
                        .attr("cx",640)
                        .attr("cy",290)
                        .attr("r", 10)
                        .attr("fill",color(0));
                        svg.append("circle")
                        .attr("cx",640)
                        .attr("cy",315)
                        .attr("r", 10)
                        .attr("fill",color(10));
                        svg.append("circle")
                        .attr("cx",640)
                        .attr("cy",340)
                        .attr("r", 10)
                        .attr("fill",color(20));
                        svg.append("circle")
                        .attr("cx",640)
                        .attr("cy",365)
                        .attr("r", 10)
                        .attr("fill",color(30));
                        svg.append("circle")
                        .attr("cx",640)
                        .attr("cy",390)
                        .attr("r", 10)
                        .attr("fill",color(40));
                    //gop legend
                    svg.append("circle")
                    .attr("cx",680)
                    .attr("cy",290)
                    .attr("r", 10)
                    .attr("fill",color(100));
                    svg.append("circle")
                    .attr("cx",680)
                    .attr("cy",315)
                    .attr("r", 10)
                    .attr("fill",color(90));
                    svg.append("circle")
                    .attr("cx",680)
                    .attr("cy",340)
                    .attr("r", 10)
                    .attr("fill",color(80));
                    svg.append("circle")
                    .attr("cx",680)
                    .attr("cy",365)
                    .attr("r", 10)
                    .attr("fill",color(70));
                    svg.append("circle")
                    .attr("cx",680)
                    .attr("cy",390)
                    .attr("r", 10)
                    .attr("fill",color(60));
               
        })