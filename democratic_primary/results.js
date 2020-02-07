var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]
// since Category B and E are really close to each other, assign them diverging colors
var color = d3.scaleOrdinal()
  .domain(category)
  .range(["#00FF90", "#00B050", "#a4b1b5", "#98d2f8", "#0077FF", "#002E66", "#E7B5FF", "#B722FF", "purple"])

  



d3.csv("finalresults.csv", function (error, data) {
  var data = data.filter(function (d) { return d.state == keyState; });
  formatValue = d3.format(".3");
  formatvalue = d3.format(".2");


var colorscale = d3.scaleLinear()
    .domain([0,20,50])
    .range(["#98d2f8", "#0091FF","#002E66"]);

var errorscale = d3.scaleLinear()
    .domain([-10,0,10])
    .range(["#FF6060", "white","#0091FF"]);

  data.sort((a,b)=> b.vote - a.vote)

  var svg = d3.select("#topline").append("svg")
    .attr("viewBox", "0 40 1200 550")
    .append('g')

  
svg.append("rect")
.attr("width",500)
.attr("height",500)
.attr("fill","white")

  var svgrepeat = svg.append('g')
    .attr('class', 'grepeat')
    .attr("transform", "translate(" + -100 + "," + 250 + ")")



  var repeat = svgrepeat.selectAll('.repeat')
    .data(data)
    .enter().append('g')
    .attr("class", "repeat")
    .attr("transform", function (d, i) { return "translate(0," + i * 50 + ")" })

    repeat.append("a").attr("xlink:href",d=>d.candidate).append("image")
    .attr("xlink:href",  d=>d.candidate+".jpg")
    .attr("x", 150)
    .attr("y", -100)
    .attr("height", 40)
    .attr("width", 30)
    .attr("anchor","middle");
    
    

    repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 200)
    .attr("y", -70)
    .style("fill", d=>color(d.candidate))
    .style("font-size",25)
    .attr("font-weight", 700)
    .text(d => d.candidate)
    .attr("text-anchor", "start")

    repeat.append("rect")
    .attr("x",350)
    .attr("y",-100)
    .attr("height",45)
    .attr("width",100)
    .attr("fill",d=>colorscale(d.vote))

    repeat.append("rect")
    .attr("x",950)
    .attr("y",-100)
    .attr("height",45)
    .attr("width",100)
    .attr("fill",d=>errorscale(d.vote_error))

    repeat.append("rect")
    .attr("x",1100)
    .attr("y",-100)
    .attr("height",45)
    .attr("width",100)
    .attr("fill",d=>errorscale(d.delegates_diff))

    repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 400)
    .attr("y", -70)
    .style("fill",d=>d.vote>20?"white":"black")
    .style("font-size",20)
    .attr("font-weight", 700)
    .text(d => d.vote+"%")
    .attr("text-anchor", "middle")

    repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 550)
    .attr("y", -70)
    .style("fill", "black")
    .style("font-size",20)
    .attr("font-weight", 700)
    .text(d => d.delegates)
    .attr("text-anchor", "middle")

    repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 700)
    .attr("y", -70)
    .style("fill", "black")
    .style("font-size",20)
    .attr("font-weight", 700)
    .text(d => d.proj_votes+"%")
    .attr("text-anchor", "middle")

    repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 850)
    .attr("y", -70)
    .style("fill", "black")
    .style("font-size",20)
    .attr("font-weight", 700)
    .text(d => d.proj_delegates)
    .attr("text-anchor", "middle")

    repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 1000)
    .attr("y", -70)
    .style("fill", "black")
    .style("font-size",20)
    .attr("font-weight", 700)
    .text(d => formatvalue(d.vote_error)+"%")
    .attr("text-anchor", "middle")

    repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 1150)
    .attr("y", -70)
    .style("fill", "black")
    .style("font-size",20)
    .attr("font-weight", 700)
    .text(d => d.delegates_diff)
    .attr("text-anchor", "middle")
    

    
    
  

    svg.append("text")
    .attr("x",120)
    .attr("y",120)
    .style("fill", "Black")
    .style("font-size", 30)
    .attr("font-weight",700)
    .attr("text-anchor","middle")
    .text("Candidate")

    svg.append("text")
    .attr("x",300)
    .attr("y",120)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight",700)
    .attr("text-anchor","middle")
    .text("Vote Share")

    svg.append("text")
    .attr("x",450)
    .attr("y",120)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight",700)
    .attr("text-anchor","middle")
    .text("Delegates")

    svg.append("text")
    .attr("x",600)
    .attr("y",120)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight",700)
    .attr("text-anchor","middle")
    .text("Vote Share")

    svg.append("text")
    .attr("x",750)
    .attr("y",120)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight",700)
    .attr("text-anchor","middle")
    .text("Delegates")
    

    svg.append("text")
    .attr("x",900)
    .attr("y",120)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight",700)
    .attr("text-anchor","middle")
    .text("Vote Share")

    svg.append("text")
    .attr("x",1050)
    .attr("y",120)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight",700)
    .attr("text-anchor","middle")
    .text("Delegates")


    svg.append("text")
    .attr("x",975)
    .attr("y",70)
    .style("fill", "Black")
    .style("font-size", 30)
    .attr("font-weight",700)
    .attr("text-anchor","middle")
    .text("Error")

    svg.append("text")
    .attr("x",675)
    .attr("y",70)
    .style("fill", "Black")
    .style("font-size", 30)
    .attr("font-weight",700)
    .attr("text-anchor","middle")
    .text("Projected")

    svg.append("text")
    .attr("x",375)
    .attr("y",70)
    .style("fill", "Black")
    .style("font-size", 30)
    .attr("font-weight",700)
    .attr("text-anchor","middle")
    .text("Results")
    

    

   


   

    
})