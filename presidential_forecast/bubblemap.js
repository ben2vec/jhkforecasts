

var margin = {top: 0, right: 50, bottom: 0, left: 50}
var width = 780
var height = 445
var axisPad = 12 
var color = d3.scaleLinear()
      .domain([0,50,100])
        .range(["#0091FF","white" ,"#FF6060"])
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

d3.csv("bubble map.csv", function(error, data){
        
        
    
    var res = data.map((d,i) => {
        return {
          state : +d.state,
          label : +d.label,
          gopWin :+d.gopWin,
          demWin : +d.demWin,
          radius :+d.radius,
          xValue : +d.xValue,
          yValue : +d.yValue,
          pageLink : +d.pageLink,
          tippingPoint : +d.tippingPoint,
        }
      })

      
        
      var xScale = d3.scaleLinear()
          .domain([0,780])
          .range([0, width])
  
        
  
        var yScale = d3.scaleLinear()
          .domain([0,445])
          .range([0, height]);

      

        var svg = d3.select("body").append("svg")
        .attr("viewBox", '0 0 780 445')
        
          .append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        

        var xAxis = d3.axisBottom(xScale)
        var yAxis = d3.axisLeft(yScale)
        

           
                            svg.selectAll("states")
                            .data(data)
                            .enter()
                            .append("a")
                            .attr("xlink:href", function(d) {return  d.pageLink})
                            .append("circle")
                            .attr("cx",d => xScale(d.xValue))
                            .attr("cy",d => yScale(d.yValue))
                            .attr("r", d => d.radius)
                            .style("fill",d => color(d.gopWin) )
                            .attr("stroke",d =>  d.tippingPoint >= 2 ? "black" : "white")
                            .attr("stroke-width","1")
                            .on("mouseover", function(d) {		
                              div.transition()		
                                  .duration(50)		
                                  .style("opacity",1);		
                              div	.html(d.state + "<br/>"  + "Win %"  +"<br/>"+ "Gop : "+ d.gopWin +"%"+ "<br/>"  + "Dem : "+ d.demWin +"%")	
                                  .style("left", (d3.event.pageX +20) + "px")		
                                  .style("top", (d3.event.pageY + 20) + "px");	
                              })					
                          .on("mouseout", function(d) {		
                              div.transition()		
                                  .duration(50)		
                                  .style("opacity", 0);	
                          });
                            
                       svg.selectAll("label")
                       .data(data)
                       .enter()
                       .append("text")
                       .text(d => d.label)
                       .attr("x",d => xScale(d.xValue))
                       .attr("y",d => yScale(d.yValue)+3)
                       .attr("text-anchor","middle")
                       .attr("font-family","brandon-grotesque")
                       .attr("font-weight","500")
                       .attr("font-size","8")
                       .on("mouseover", function(d) {		
                        div.transition()		
                            .duration(50)		
                            .style("opacity", 1);		
                        div	.html(d.state + "<br/>"  + "Win %"  +"<br/>"+ "Gop : "+ d.gopWin +"%"+ "<br/>"  + "Dem : "+ d.demWin +"%")	
                            .style("left", (d3.event.pageX) + "px")		
                            .style("top", (d3.event.pageY - 28) + "px");	
                        })					
                    .on("mouseout", function(d) {		
                        div.transition()		
                            .duration(50)		
                            .style("opacity", 0);	
                    });
                    svg.append("circle")
                    .attr("cx",620)
                    .attr("cy",425)
                    .attr("r", 10)
                    .attr("stroke","black")
                    .attr("stroke-width","1")
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
                          .attr("x",600)
                          .attr("y",295)
                          .text("100%")
                          .attr("text-anchor","middle")
                             .attr("font-family","brandon-grotesque")
                             .attr("font-weight","500")
                             .attr("font-size","15");

                svg.append("text")
                             .attr("x",600)
                             .attr("y",295)
                             .text("100%")
                             .attr("text-anchor","middle")
                                .attr("font-family","brandon-grotesque")
                                .attr("font-weight","500")
                                .attr("font-size","15");    
                
                svg.append("text")
                             .attr("x",600)
                             .attr("y",320)
                             .text("90%")
                             .attr("text-anchor","middle")
                                .attr("font-family","brandon-grotesque")
                                .attr("font-weight","500")
                                .attr("font-size","15");  
                svg.append("text")                
                             .attr("x",600)
                             .attr("y",345)
                             .text("80%")
                             .attr("text-anchor","middle")
                                .attr("font-family","brandon-grotesque")
                                .attr("font-weight","500")
                                .attr("font-size","15");                              
                    
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