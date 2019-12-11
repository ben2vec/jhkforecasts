var margin = {top: 20, right: 80, bottom: 30, left: 50},
            width = innerWidth - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
        
        var parseDate = d3.time.format("%Y%m%d").parse;
        
        var parseWinChance = d3.format("%")

        var x = d3.time.scale()
            .range([0, width]);
        
        var y = d3.scale.linear()
            .range([height, 0]);
        
            var color = d3.scale.ordinal().range(["#00FF90", "#00B050", "#006541", "#36AEFF","#0077FF","002E66","E7B5FF","B722FF","0070B0"]);
        
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
         

        var line = d3.svg.line()
            .interpolate("basis")
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.winChance); });
        
        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vSm4KTVKOSGgVi3pwbGvtxOGotQZdP6C1loCXQlwOOBtVNa-0_mi0nD7JJ1eKvgQYYt8TtgVxAAWTmf/pub?output=csv", function(error, data) {
          color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
        
          data.forEach(function(d) {
            d.date = parseDate(d.date);
          });
          
          var candidates = color.domain().map(function(name) {
            return {
              name: name,
              values: data.map(function(d) {
                return {date: d.date, winChance: +d[name]};
              })
            };
          });
        
          x.domain(d3.extent(data, function(d) { return d.date; }));
        
          y.domain([
            0,1
          ]);
        
          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);
        
          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("x", 10)
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
              .attr("d", function(d) { return line(d.values); })
              .attr("data-legend",function(d) { return d.name})
              .style("stroke", function(d) { return color(d.name); });
        
          candidate.append("text")
              .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
              .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.winChance) + ")"; })
              .attr("x", 3)
              .attr("dy", ".35em")
              .text(function(d) { return d.name; });
        
        
        legend = svg.append("g")
    .attr("class","legend")
    .attr("transform","translate(50,30)")
    .style("font-size","12px")
    .call(d3.legend)

  setTimeout(function() { 
    legend
      .style("font-size","20px")
      .attr("data-style-padding",10)
      .call(d3.legend)
  },1000)
        });
        