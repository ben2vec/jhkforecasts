// set the dimensions and margins of the graph

    // define the line

    marginpv = { top: 30, right: 30, bottom: 20, left: 100 },
    widthpv = 960 - marginpv.left - marginpv.right,
    heightpv = 400 - marginpv.top - marginpv.bottom;

    d3.csv("votecurves.csv", function (error, data) {
      
        var data = data.filter(function (d) { return d.state == keyState; })   

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#projected").append("svg")
      .attr("viewBox", "0 0 960 400")
      .append("g")
    .attr("transform",
          "translate(" + marginpv.left + "," + marginpv.top + ")");


    var tool_tipgop = d3.tip()
      .attr("class", "d3-tip")
      .offset([-130,-80])
      .html("<div id='tipDivgop'></div>");
    
    svg.call(tool_tipgop); 

    var tool_tipdem = d3.tip()
      .attr("class", "d3-tip")
      .offset([-130,-80])
      .html("<div id='tipDivdem'></div>");
    
    svg.call(tool_tipdem); 

    
    // Get the data
    

   

      // parse the date / time

      // set the ranges
      var x = d3.scaleLinear().range([0, widthpv])
        .domain([0, 100]);
      var y = d3.scaleLinear().range([heightpv, 0])
        .domain([0, .6]);



      var goparea = d3.area()
        .x0(d => x(d.gopv))
        .y0(y(gopmindensity))
        .y1(d => d.prob > .1 ? d.prob < .9 ? y(d.gopdensity) : y(gopmindensity) : y(gopmindensity))

      var goparea2 = d3.area()
        .x1(function (d) { return x(d.gopv); })
        .y0(y(gopmindensity))
        .y1(d => y(d.gopdensity))


        var demarea = d3.area()
        .x1(d => x(d.demv))
        .y0(y(demmindensity))
        .y1(d => d.prob > .1 ? d.prob < .9 ? y(d.demdensity) : y(demmindensity) : y(demmindensity))

      var demarea2 = d3.area()
        .x1(function (d) { return x(d.demv); })
        .y0(y(demmindensity))
        .y1(d => y(d.demdensity))


        var thirdarea = d3.area()
        .x1(d => x(d.thirdv))
        .y0(heightpv)
        .y1(d => d.prob > .1 ? d.prob < .9 ? y(d.thirddensity) : heightpv : heightpv)

      var thirdarea2 = d3.area()
        .x1(function (d) { return x(d.thirdv); })
        .y0(y(0))
        .y1(d => y(d.thirddensity))
     
     
        // format the data
    var goplo =d3.max(data, d => d.goplo)
    var gophi =d3.max(data, d => d.gophi)
    var demlo =d3.max(data, d => d.demlo)
    var demhi =d3.max(data, d => d.demhi)


      var gopprojvote = d3.max(data, d => d.gopvote)
      var gopmaxdensity = d3.max(data, d => d.gopdensity)
      var demprojvote = d3.max(data, d => d.demvote)
      var demmaxdensity = d3.max(data, d => d.demdensity)
      var gopmindensity = gopprojvote > demprojvote ?.4:.2
      var demmindensity = gopprojvote < demprojvote ? .4:.2
      var thirdprojvote = d3.max(data, d => d.thirdvote)
      

      svg.append("line")
        .attr("x1",x(0))
        .attr("x2",x(0))
        .attr("y1",y(0))
        .attr("y2",y(.6))
        .attr("stroke","#b0b3b8")
        .attr("opacity",.5)
      
        svg.append("line")
        .attr("x1",x(25))
        .attr("x2",x(25))
        .attr("y1",y(0))
        .attr("y2",y(.6))
        .attr("stroke","#b0b3b8")
        .attr("opacity",.5)
        svg.append("line")
        .attr("x1",x(50))
        .attr("x2",x(50))
        .attr("y1",y(0))
        .attr("y2",y(.6))
        .attr("stroke","#b0b3b8")
        .attr("opacity",.5)
        svg.append("line")
        .attr("x1",x(75))
        .attr("x2",x(75))
        .attr("y1",y(0))
        .attr("y2",y(.6))
        .attr("stroke","#b0b3b8")
        .attr("opacity",.5)

        svg.append("line")
        .attr("x1",x(100))
        .attr("x2",x(100))
        .attr("y1",y(0))
        .attr("y2",y(.6))
        .attr("stroke","#b0b3b8")
        .attr("opacity",.5)


      svg.append("path")
        .data([data])
        .attr("d", goparea2)
        .attr("fill", "#798285")
        .attr("opacity",.5)

      svg.append("path")
        .data([data])
        .attr("d", goparea)
        .attr("fill", "#FF6060")
        .attr("opacity",1).on('mouseover', function(d) {

            
            
        
              tool_tipgop.show();
              var tipSVG = d3.select("#tipDivgop")
                .append("svg")
                .attr("width", 150)
            .attr("height", 120)
            ;
            
            tipSVG.append("rect")
            .attr("x",0)
            .attr("y",0)
            .attr("rx","10px")
            .attr("ry","10px")
            .attr("width",150)
            .attr("height",120)
            .attr("fill","#FFDFDF")
              
            
          tipSVG.append("text")
                .text("Trump")
            .attr("y", 20)
            .attr("x",75)
            .attr("fill","#black")
            .style("font-weight","600")
            .style("font-size","20")
            .attr("text-anchor","middle")
          
            tipSVG.append("text")
            .text("Lo")
        .attr("y", 50)
        .attr("x",25)
        .attr("fill","#black")
        .style("font-weight","600")
        .style("font-size","12")
        .attr("text-anchor","middle")
        tipSVG.append("text")
        .text("Proj.")
    .attr("y", 50)
    .attr("x",75)
    .attr("fill","#black")
    .style("font-weight","600")
    .style("font-size","15")
    .attr("text-anchor","middle") 
    tipSVG.append("text")
        .text("Hi")
    .attr("y", 50)
    .attr("x",125)
    .attr("fill","#black")
    .style("font-weight","600")
    .style("font-size","12")
    .attr("text-anchor","middle") 

    tipSVG.append("text")
            .text(goplo+"%")
        .attr("y", 80)
        .attr("x",25)
        .attr("fill","#black")
        .style("font-weight","900")
        .style("font-size","12")
        .attr("text-anchor","middle")
        tipSVG.append("text")
        .text(gopprojvote+"%")
    .attr("y", 80)
    .attr("x",75)
    .attr("fill","#black")
    .style("font-weight","900")
    .style("font-size","15")
    .attr("text-anchor","middle") 
    tipSVG.append("text")
        .text(gophi+"%")
    .attr("y", 80)
    .attr("x",125)
    .attr("fill","#black")
    .style("font-weight","900")
    .style("font-size","12")
    .attr("text-anchor","middle") 
    
            })
            .on('mouseout', 
            
              
          tool_tipgop.hide)


        svg.append("path")
        .data([data])
        .attr("d", demarea2)
        .attr("fill", "#798285")
        .attr("opacity",.5)

      svg.append("path")
        .data([data])
        .attr("d", demarea)
        .attr("fill", "#0091FF").on('mouseover', function(d) {

            
            
        
            tool_tipdem.show();
            var tipSVG = d3.select("#tipDivdem")
              .append("svg")
              .attr("width", 150)
          .attr("height", 120)
          ;
          
        tipSVG.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("rx","10px")
        .attr("ry","10px")
        .attr("width",150)
        .attr("height",120)
        .attr("fill","#CCEAFF")
        
            
          
        tipSVG.append("text")
              .text("Democrats")
          .attr("y", 20)
          .attr("x",75)
          .attr("fill","#black")
          .style("font-weight","600")
          .style("font-size","20")
          .attr("text-anchor","middle")
        
          tipSVG.append("text")
          .text("Lo")
      .attr("y", 50)
      .attr("x",25)
      .attr("fill","#black")
      .style("font-weight","600")
      .style("font-size","12")
      .attr("text-anchor","middle")
      tipSVG.append("text")
      .text("Proj.")
  .attr("y", 50)
  .attr("x",75)
  .attr("fill","#black")
  .style("font-weight","600")
  .style("font-size","15")
  .attr("text-anchor","middle") 
  tipSVG.append("text")
      .text("Hi")
  .attr("y", 50)
  .attr("x",125)
  .attr("fill","#black")
  .style("font-weight","600")
  .style("font-size","12")
  .attr("text-anchor","middle") 

  tipSVG.append("text")
          .text(demlo+"%")
      .attr("y", 80)
      .attr("x",25)
      .attr("fill","#black")
      .style("font-weight","900")
      .style("font-size","12")
      .attr("text-anchor","middle")
      tipSVG.append("text")
      .text(demprojvote+"%")
  .attr("y", 80)
  .attr("x",75)
  .attr("fill","#black")
  .style("font-weight","900")
  .style("font-size","15")
  .attr("text-anchor","middle") 
  tipSVG.append("text")
      .text(demhi+"%")
  .attr("y", 80)
  .attr("x",125)
  .attr("fill","#black")
  .style("font-weight","900")
  .style("font-size","12")
  .attr("text-anchor","middle") 
  
          })
          .on('mouseout', 
          
            
        tool_tipdem.hide)


        
      svg.append("path")
        .data([data])
        .attr("d", thirdarea2)
        .attr("fill", "#798285")
        .attr("opacity",.5)

     
        svg.append("path")
        .data([data])
        .attr("d", thirdarea)
        .attr("fill", "#FFE130")

        

        svg.append("line")
        .attr("x1",-100)
        .attr("x2",x(100))
        .attr("y1",y(.4))
        .attr("y2",y(.4))
        .attr("stroke","black")
        .attr("stroke-width",1)

        svg.append("line")
        .attr("x1",-100)
        .attr("x2",x(100))
        .attr("y1",y(.2))
        .attr("y2",y(.2))
        .attr("stroke","black")
        .attr("stroke-width",1)


        svg.append("line")
        .attr("x1",-100)
        .attr("x2",x(100))
        .attr("y1",y(0))
        .attr("y2",y(0))
        .attr("stroke","black")
        .attr("stroke-width",1)


        svg.append("circle")
        .attr("cy",y(gopmaxdensity))
        .attr("cx",x(gopprojvote))
        .attr("r",4)
        .attr("fill","#FF6060")
        .attr("stroke-width",2)
        .attr("stroke","white")

        svg.append("circle")
        .attr("cy",y(demmaxdensity))
        .attr("cx",x(demprojvote))
        .attr("r",4)
        .attr("fill","#0091FF")
        .attr("stroke-width",2)
        .attr("stroke","white")

        svg.append("circle")
        .attr("cy",y(.0864))
        .attr("cx",x(thirdprojvote))
        .attr("r",4)
        .attr("fill","#FFE130")
        .attr("stroke-width",2)
        .attr("stroke","white")

        


        svg.append("text")
        .text(gopprojvote+"%")
        .attr("y",y(gopmaxdensity)-12)
        .attr("x",x(gopprojvote)+20)
        .attr("text-anchor","middle")
        .attr("font-weight",700)


    


        svg.append("text")
        .text(demprojvote+"%")
        .attr("y",y(demmaxdensity)-12)
        .attr("x",x(demprojvote)+20)
        .attr("text-anchor","middle")
        .attr("font-weight",700)


        

        svg.append("text")
        .text(thirdprojvote+"%")
        .attr("y",y(.0864)-12)
        .attr("x",x(thirdprojvote)+20)
        .attr("text-anchor","middle")
        .attr("font-weight",700)

        svg.append("text")
        .text("Trump")
        .attr("y",y(gopmindensity)-10)
        .attr("x",-10)
        .attr("text-anchor","end")
        .attr("font-weight",700)

        svg.append("text")
        .text("Democrats")
        .attr("y",y(demmindensity)-10)
        .attr("x",-10)
        .attr("text-anchor","end")
        .attr("font-weight",700)

        svg.append("text")
        .text("Other")
        .attr("y",y(0)-10)
        .attr("x",-10)
        .attr("text-anchor","end")
        .attr("font-weight",700)

        svg.append("text")
        .text("0%")
        .attr("y",-5)
        .attr("x",x(0))
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",10)
        .attr("fill","#b0b3b8")

        svg.append("text")
        .text("25%")
        .attr("y",-5)
        .attr("x",x(25))
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",10)
        .attr("fill","#b0b3b8")

        svg.append("text")
        .text("50%")
        .attr("y",-5)
        .attr("x",x(50))
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",10)
        .attr("fill","#b0b3b8")

        svg.append("text")
        .text("75%")
        .attr("y",-5)
        .attr("x",x(75))
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",10)
        .attr("fill","#b0b3b8")

        svg.append("text")
        .text("100%")
        .attr("y",-5)
        .attr("x",x(100))
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",10)
        .attr("fill","#b0b3b8")


    });