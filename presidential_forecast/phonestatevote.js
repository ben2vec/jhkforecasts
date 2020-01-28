var gopScale = d3.scaleLinear()
    .domain([20,80])
    .range(["white", "#FF6060"]);

var demScale = d3.scaleLinear()
    .domain([20,80])
    .range(["white", "#0091FF"]);

var otherScale = d3.scaleLinear()
    .domain([0,10])
    .range(["white","#FFE130"]);


      


    
    
   
    // Get the data
    d3.csv("votecurves.csv", function (error, data) {
      
        var data = data.filter(function (d) { return d.state == keyState; })

        var svg = d3.select("#phoneprojectedvote").append("svg")
      .attr("viewBox", "0 0 500 360")
        var goplo =d3.max(data, d => d.goplo)
        var gop =d3.max(data, d => d.gopvote)
        var gophi =d3.max(data, d => d.gophi)
        var demlo =d3.max(data, d => d.demlo)
        var dem =d3.max(data, d => d.demvote)
        var demhi =d3.max(data, d => d.demhi)
        var otherlo =d3.max(data, d => d.otherlo)
        var other =d3.max(data, d => d.thirdvote)
        var otherhi =d3.max(data, d => d.otherhi)


        svg.append("rect")
        .attr("x",400)
        .attr("y",50)
        .attr("width",100)
        .attr("height",33.33)
        .attr("fill",goplo>demlo?gopScale(goplo):demScale(demlo))

        svg.append("rect")
        .attr("x",400)
        .attr("y",83.3)
        .attr("width",100)
        .attr("height",33.33)
        .attr("fill",gop>dem?gopScale(gop):demScale(dem))

        svg.append("rect")
        .attr("x",400)
        .attr("y",117)
        .attr("width",100)
        .attr("height",33.33)
        .attr("fill",gop>dem?gopScale(gophi):demScale(demhi))

        svg.append("rect")
        .attr("x",400)
        .attr("y",150)
        .attr("width",100)
        .attr("height",33.33)
        .attr("fill",gop<dem?gopScale(goplo):demScale(demlo))

        svg.append("rect")
        .attr("x",400)
        .attr("y",183.3)
        .attr("width",100)
        .attr("height",33.33)
        .attr("fill",gop<dem?gopScale(gop):demScale(dem))

        svg.append("rect")
        .attr("x",400)
        .attr("y",217)
        .attr("width",100)
        .attr("height",33.33)
        .attr("fill",gop<dem?gopScale(gophi):demScale(demhi))


        svg.append("rect")
        .attr("x",400)
        .attr("y",250)
        .attr("width",100)
        .attr("height",33.33)
        .attr("fill",otherScale(otherlo))

        svg.append("rect")
        .attr("x",400)
        .attr("y",283.3)
        .attr("width",100)
        .attr("height",33.33)
        .attr("fill",otherScale(other))

        svg.append("rect")
        .attr("x",400)
        .attr("y",317)
        .attr("width",100)
        .attr("height",33.33)
        .attr("fill",otherScale(other))

        svg.append("text")
        .text("Candidate")
        .attr("y",45)
        .attr("x",100)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",20)
        .attr("fill","#black");

        svg.append("text")
        .text("Vote Share")
        .attr("y",45)
        .attr("x",450)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",15)
        .attr("fill","#black");

        svg.append("text")
        .text(gop>dem?"Trump":"Democrats")
        .attr("y",100)
        .attr("x",100)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",20)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text(gop<dem?"Trump":"Democrats")
        .attr("y",200)
        .attr("x",100)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",20)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text("Other")
        .attr("y",300)
        .attr("x",100)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",20)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

       
        svg.append("line")
        .attr("x1",0)
        .attr("x2",500)
        .attr("y1",50)
        .attr("y2",50)
        .attr("stroke","black")

        svg.append("line")
        .attr("x1",0)
        .attr("x2",500)
        .attr("y1",150)
        .attr("y2",150)
        .attr("stroke","black")

        svg.append("line")
        .attr("x1",0)
        .attr("x2",500)
        .attr("y1",250)
        .attr("y2",250)
        .attr("stroke","black")

        svg.append("line")
        .attr("x1",0)
        .attr("x2",500)
        .attr("y1",350)
        .attr("y2",350)
        .attr("stroke","black")


        svg.append("text")
        .text("Projected")
        .attr("y",300)
        .attr("x",350)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text("Hi")
        .attr("y",333)
        .attr("x",350)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text("Lo")
        .attr("y",267)
        .attr("x",350)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");



        svg.append("text")
        .text("Projected")
        .attr("y",200)
        .attr("x",350)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text("Hi")
        .attr("y",233)
        .attr("x",350)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text("Lo")
        .attr("y",167)
        .attr("x",350)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text("Projected")
        .attr("y",100)
        .attr("x",350)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text("Hi")
        .attr("y",133)
        .attr("x",350)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text("Lo")
        .attr("y",67)
        .attr("x",350)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");


        svg.append("line")
        .attr("x1",300)
        .attr("x2",500)
        .attr("y1",317)
        .attr("y2",317)
        .attr("stroke","black")

        svg.append("line")
        .attr("x1",300)
        .attr("x2",500)
        .attr("y1",283)
        .attr("y2",283)
        .attr("stroke","black")

        svg.append("line")
        .attr("x1",300)
        .attr("x2",500)
        .attr("y1",217)
        .attr("y2",217)
        .attr("stroke","black")

        svg.append("line")
        .attr("x1",300)
        .attr("x2",500)
        .attr("y1",183)
        .attr("y2",183)
        .attr("stroke","black")


        svg.append("line")
        .attr("x1",300)
        .attr("x2",500)
        .attr("y1",117)
        .attr("y2",117)
        .attr("stroke","black")

        svg.append("line")
        .attr("x1",300)
        .attr("x2",500)
        .attr("y1",83)
        .attr("y2",83)
        .attr("stroke","black")

        svg.append("text")
        .text(gop>dem?gop+"%":dem+"%")
        .attr("y",100)
        .attr("x",450)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text(gop>dem?gophi+"%":demhi+"%")
        .attr("y",133)
        .attr("x",450)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text(gop>dem?goplo+"%":demlo+"%")
        .attr("y",67)
        .attr("x",450)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text(gop<dem?gop+"%":dem+"%")
        .attr("y",200)
        .attr("x",450)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text(gop<dem?gophi+"%":demhi+"%")
        .attr("y",233)
        .attr("x",450)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text(gop<dem?goplo+"%":demlo+"%")
        .attr("y",167)
        .attr("x",450)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text(other+"%")
        .attr("y",300)
        .attr("x",450)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text(otherhi+"%")
        .attr("y",333)
        .attr("x",450)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text(otherlo+"%")
        .attr("y",267)
        .attr("x",450)
        .attr("text-anchor","middle")
        .attr("font-weight",500)
        .attr("font-size",12)
        .attr("fill","#black")
        .attr("alignment-baseline", "middle");

        svg.append("text")
        .text(gop>dem?"R+ "+Math.round(Math.abs(gop-dem)*10)/10+"%":"D+ "+Math.round(Math.abs(gop-dem)*10)/10+"%")
        .attr("y",100)
        .attr("x",250)
        .attr("text-anchor","middle")
        .attr("font-weight",700)
        .attr("font-size",12)
        .attr("fill",gop>dem?"#FF6060":"#0091FF")
        .attr("alignment-baseline", "middle");

       


    });