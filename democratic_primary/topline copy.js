var winscale = d3.scaleLinear()
  .domain([0, 50,100])
  .range(["white", "#0091FF", "#002E66"]);
var delscale = d3.scaleLinear()
  .domain([0, 1990])
  .range(["white", "#002E66"]);  



d3.csv("candsoverview.csv", function (error, data) {

  
  

  var svg = d3.select("#overview").append("svg")
    .attr("viewBox", "0 0 1000 400")
    .append('g')

  
svg.append("rect")
.attr("width",500)
.attr("height",500)
.attr("fill","white")

  var svgrepeat = svg.append('g')
    .attr('class', 'grepeat')
    .attr("transform", "translate(" + 0 + "," + 150 + ")")



  var repeat = svgrepeat.selectAll('.repeat')
    .data(data)
    .enter().append('g')
    .attr("class", "repeat")
    .attr("transform", function (d, i) { return "translate(" + i * 100 + ",0)" })

    repeat.append("a").attr("xlink:href",d=>d.candidate).append("image")
    .attr("xlink:href",  d=>d.candidate+".jpg")
    .attr("x", 120)
    .attr("y", -130)
    .attr("height", 100)
    .attr("width", 60)
    .attr("anchor","middle").on('mouseover', function(d) {
                                  
      d3.select(this)
      .attr("x", 100)
      .attr("width",100)
      

        
      })
      .on('mouseout', 
      function(d) {
      
        d3.select(this)
        .attr("x", 120)
        .attr("width",60)
        

      });;
    
    repeat.append("rect")
    .attr("x",110)
    .attr("y",-25)
    .attr("rx",12)
    .attr("ry",12)
    .attr("width",80)
    .attr("height",60)
    .attr("fill",d=> winscale(d.win))

    

    repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 150)
    .attr("y", 10)
    .style("fill", d => d.win > 50? "white":"black")
    .style("font-size",d=> Math.sqrt(d.win)+15)
    .attr("font-weight", 700)
    .text(d => d.win+"%")
    .attr("text-anchor", "middle")

    repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 875)
    .attr("y", 0)
    .style("fill", d => d.delegates > 1500? "white":"black")
    .style("font-size", 20)
    .attr("font-weight", 500)
    .text(d => d.delegates)
    .attr("text-anchor", "end")


    repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 975)
    .attr("y", 0)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight", 500)
    .text(d => d.vote+"%")
    .attr("text-anchor", "end")
    
    

   


    svg.append("text")
    .attr("x",50)
    .attr("y",140)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight",700)
    .attr("text-anchor","end")
    .attr("text-anchor","middle")
    .text("Win")
    
    svg.append("text")
    .attr("x",50)
    .attr("y",160)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight",700)
    .attr("text-anchor","middle")
    .text("Nomination")

    
})