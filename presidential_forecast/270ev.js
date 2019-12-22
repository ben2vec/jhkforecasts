var margin = {top: 30, right: 20, bottom: 30, left: 20}
var width = 780 - margin.left - margin.right
var height = 310 - margin.top - margin.bottom
var axisPad = 12 
var color = d3.scaleLinear()
      .domain([0,50,100])
        .range(["#0091FF","white" ,"#FF6060"])
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

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

      

        var svg = d3.select("body").append("svg")
        .attr("viewBox", '0 0 780 370')
        
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
                            .attr("stroke","black")
                            .attr("stroke-width","0.5")
                            .on("mouseover", function(d) {		
                              div.transition()		
                                  .duration(50)		
                                  .style("opacity", .9);		
                              div	.html(d.state + "<br/>"  + "Win %"  +"<br/>"+ "Gop:"+ d.gopWin +"%"+ "<br/>"  + "Dem:"+ d.demWin +"%")	
                                  .style("left", (d3.event.pageX) + "px")		
                                  .style("top", (d3.event.pageY - 28) + "px");	
                              })					
                          .on("mouseout", function(d) {		
                              div.transition()		
                                  .duration(50)		
                                  .style("opacity", 0);	
                          });
                            
                       
        
        svg.append("line")
                .attr("x1", xScale(270))
                .attr("y1", 0)
                .attr("x2", xScale(270))
                .attr("y2", 250)
                .attr("stroke", "black")
                .attr("stroke-width","1");
                            
        svg.append("text")
                .text("270")
                .attr("x", xScale(270))
                .attr("y", 265)
                .attr("text-anchor","middle")
                .style("font-weight","600")
                .style("font-family","brandon-grotesque");

    })