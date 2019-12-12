

    var myData = d3.csv("US.csv");

    var margin = {top: 20, right: 80, bottom: 30, left: 50},
            width = innerWidth - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y-%m-%d").parse;
    
    
    var x = d3.time.scale()
      .range([0, width]);

    var y = d3.scale.linear()
      .range([height, 0]);

      var color = d3.scale.ordinal().range(["#00FF90", "#00B050", "#006541", "#36AEFF","#0077FF","002E66","E7B5FF","B722FF","0070B0"]);

      var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(12)
            ;
            
        
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10);

    var line = d3.svg.line()
      .interpolate("monotone")
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.winChance);
      });

    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.csv("us_win.csv", function(error, data) {
          color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date" }));

    data.forEach(function(d) {
      d.date = parseDate(d.date);
    });

    var candidates = color.domain().map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          return {
            date: d.date,
            winChance: +d[name]
          };
        })
      };
    });

    var mindate = new Date(2019,5,1),
          maxdate = new Date(2020,6,1);
          
          x.domain([mindate,maxdate]);
        
          y.domain([
            0,100
          ]);

   

    

    

    svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
              .style("font-size","10pt")
              ;

              svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .style("font-weight","500")
            .append("text")
              .attr("x", 20)
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "start")
              .text("Win Democratic Primary")
              .style("font-size","20px")
              .style("font-weight","700");

    var candidate = svg.selectAll(".candidate")
      .data(candidates)
      .enter().append("g")
      .attr("class", "candidate");

    candidate.append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d.values);
      })
      .style("stroke", function(d) {
        return color(d.name);
      });

      candidate.append("text")
              .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
              .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.winChance) + ")"; })
              .attr("x",10)
              .attr("dy", ".35em")
              .text(function(d) { return d.name; })
              .style("fill",function(d) { return color(d.name); })
              .style("font-weight","700")
              .style("font-size","12px");

    var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects")
      ;

    
      
    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(candidates)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 3)
      .style("stroke", function(d) {
        return color(d.name);
      })
      .style("fill", "black" )
      .style("stroke-width", "2px")
      .style("opacandidate", "0");

    mousePerLine.append("text")
    .attr("transform", "translate(0,-10)")
        .style("font-weight","700")
        .style("font-size","12px");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
          .style("opacandidate", "0");
        d3.selectAll(".mouse-per-line circle")
          .style("opacandidate", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacandidate", "0");
      })
      .on('mouseover', function() { // on mouse in show line, circles and text
        d3.select(".mouse-line")
          .style("opacandidate", "1");
        d3.selectAll(".mouse-per-line circle")
          .style("opacandidate", "1");
        d3.selectAll(".mouse-per-line text")
          .style("opacandidate", "1");
      })
      .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line")
          .attr("d", function() {
            var d = "M" + mouse[0] + "," + height;
            d += " " + mouse[0] + "," + 0;
            return d;
          });

        d3.selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
            console.log(width/mouse[0])
            var xDate = x.invert(mouse[0]),
                bisect = d3.bisector(function(d) { return d.date; }).right;
                idx = bisect(d.values, xDate);
            
            var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;

            while (true){
              target = Math.floor((beginning + end) / 2);
              pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
              }
              if (pos.x > mouse[0])      end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; //position found
            }
            
            d3.select(this).select('text')
              .text(y.invert(pos.y).toFixed(2))
              ;
              
            return "translate(" + mouse[0] + "," + pos.y +")";
          });
      })});
      


