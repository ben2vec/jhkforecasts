d3.csv("partisanlean.csv", function(error, data){
                    
    var data = data.filter(function(d){return d.state == keyState;})    
       
     console.log(data)  
       
     var svg = d3.select("#pvi").append("svg")
           .attr("viewBox", '0 0 1000 160')

svg.append("line")
.attr("x1",100)
.attr("y1",80)
.attr("x2",450)
.attr("y2",80)
.attr("stroke-width",1)
.attr("stroke","black")

svg.append("line")
.attr("x1",275)
.attr("y1",75)
.attr("x2",275)
.attr("y2",85)
.attr("stroke-width",1)
.attr("stroke","black")

svg.append("text")
.text("Partisan Lean")
.attr("x",100)
.attr("y",35)
.attr("fill","black")
.style("text-anchor","start")
.attr("font-size",20)
    .attr("font-weight",700)

svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x",d => d.xValue)
    .attr("y",d => d.yValue)
    .attr("width",d => d.width)
    .attr("height",15)
    .attr("fill",d=> d.pvi>0 ? "#FF6060" : "#0091FF" )
    

    svg.selectAll("bars")
    .data(data)
    .enter()
    .append("text")
    .attr("x",350)
    .attr("y",35)
    .text(d=> d.label)
    
    .attr("fill",d=> d.pvi>0 ? "#FF6060" : "#0091FF" )
    .style("text-anchor","start")
    .attr("font-size",20)
    .attr("font-weight",700)


    //2016 vote
    svg.append("line")
.attr("x1",550)
.attr("y1",80)
.attr("x2",900)
.attr("y2",80)
.attr("stroke-width",1)
.attr("stroke","black")

svg.append("line")
.attr("x1",725)
.attr("y1",75)
.attr("x2",725)
.attr("y2",85)
.attr("stroke-width",1)
.attr("stroke","black")

svg.append("text")
.text("2016 Vote")
.attr("x",540)
.attr("y",35)
.attr("fill","black")
.style("text-anchor","start")
.attr("font-size",20)
    .attr("font-weight",700)

svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x",d => d.xValue2016)
    .attr("y",d => d.yValue2016)
    .attr("width",d=> d.width2016)
    .attr("height",15)
    .attr("fill",d=> d.vote2016>0 ? "#FF6060" : "#0091FF" )
    

    svg.selectAll("bars")
    .data(data)
    .enter()
    .append("text")
    .attr("x",700)
    .attr("y",35)
    .text(d=> d.label2016)
    
    .attr("fill",d=> d.pvi>0 ? "#FF6060" : "#0091FF" )
    .style("text-anchor","start")
    .attr("font-size",20)
    .attr("font-weight",700)      




})
