var parseTime = d3.timeParse("%Y-%m-%d");

d3.csv("https://raw.githubusercontent.com/jhkersting/jhkforecasts/master/democratic_primary/poll_accuracy.csv", function (data) {
  
  var forecasters = data.filter(function (d) { return d.type == "forecast"; });

  var data = data.filter(function (d) { return d.type == "pollster"; });

   

  var data = data.map(d => {
    return {
      name: d.name,
      RMSE: d.RMSE,
    }
  })

  var pollsters = data.map(d => {
    return d.name
  })

  var pollsters = d3.set(pollsters).values();

  console.log(pollsters)

  var avg_data = []

  for (let j = 0; j <= pollsters.length - 1; j++) {

    var pollsters_data = {
      pollster: pollsters[j],
      avg_rmse: d3.mean(data.filter(d => d.name == pollsters[j]), d => d.RMSE),
      num_polls: d3.sum(data.filter(d => d.name == pollsters[j]), d => d.RMSE) / d3.mean(data.filter(d => d.name == pollsters[j]), d => d.RMSE)
    }
    avg_data.push(pollsters_data)
  }

  avg_data.sort((a, b) => a.avg_rmse - b.avg_rmse)
  avg_data.sort((a, b) => b.num_polls - a.num_polls)



  var qualifying_pollsters = avg_data.filter(d => d.num_polls > 1)

  var qualifying_pollsters = qualifying_pollsters.map((d, i) => {
    return {
      pollster: d.pollster,
      avg_rmse: d.avg_rmse,
      num_polls: d.num_polls,
      rank: i + 1
    }
  })

  var avg_data = avg_data.map((d, i) => {
    return {
      pollster: d.pollster,
      avg_rmse: d.avg_rmse,
      num_polls: d.num_polls,
      rank: i + 1
    }
  })

  avg_data.sort(function (a, b) {
    a = a.pollster.toLowerCase();
    b = b.pollster.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
  });

  console.log(qualifying_pollsters)
  console.log(avg_data)

  var z = d3.scaleLinear()
    .domain([0, d3.max(avg_data, d => d.avg_rmse)])
    .range(["white", "#FF6060"])

  var height = qualifying_pollsters.length * 50 + 30

  var svg = d3.select("#qualpollsters").append("svg")
    .attr("viewBox", "0 0 800 " + height)

  svg.selectAll("rect")
    .data(qualifying_pollsters)
    .enter()
    .append("rect")
    .attr("fill", d => z(d.avg_rmse))
    .attr("x", 550)
    .attr("y", (d, i) => i * 50 + 30)
    .attr("width", 100)
    .attr("height", 50)

    svg.selectAll("topline")
    .data(qualifying_pollsters)
    .enter()
    .append("text")
    .text(d=>d.avg_rmse)
    .attr("x",600)
    .attr("y",(d,i)=> i*50 + 60)
    .attr("font-size",25)
    .attr("fill","black")
    .attr("text-anchor","middle")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")

    svg.selectAll("topline")
    .data(qualifying_pollsters)
    .enter()
    .append("text")
    .text(d=>d.pollster)
    .attr("x",100)
    .attr("y",(d,i)=> i*50 + 60)
    .attr("font-size",20)
    .attr("fill","black")
    .attr("text-anchor","start")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")

    svg.selectAll("topline")
    .data(qualifying_pollsters)
    .enter()
    .append("text")
    .text(d=>d.rank)
    .attr("x",50)
    .attr("y",(d,i)=> i*50 + 60)
    .attr("font-size",20)
    .attr("fill","black")
    .attr("text-anchor","middle")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")


    svg.selectAll("topline")
    .data(qualifying_pollsters)
    .enter()
    .append("text")
    .text(d=>d.num_polls)
    .attr("x",720)
    .attr("y",(d,i)=> i*50 + 60)
    .attr("font-size",20)
    .attr("fill","black")
    .attr("text-anchor","middle")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")


    svg.append("text")
    .text("Rank")
    .attr("x",50)
    .attr("y",15)
    .attr("font-size",20)
    .attr("fill","black")
    .attr("text-anchor","middle")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")

    svg.append("text")
    .text("Pollster")
    .attr("x",100)
    .attr("y",15)
    .attr("font-size",20)
    .attr("fill","black")
    .attr("text-anchor","start")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")

    svg.append("text")
    .text("Average Error")
    .attr("x",600)
    .attr("y",15)
    .attr("font-size",20)
    .attr("fill","black")
    .attr("text-anchor","middle")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")

    svg.append("text")
    .text("# of Polls")
    .attr("x",720)
    .attr("y",15)
    .attr("font-size",20)
    .attr("fill","black")
    .attr("text-anchor","middle")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")

    svg.append("line")
    .attr("x1",1000)
    .attr("x2",000)
    .attr("y1",30)
    .attr("y2",30)
    .attr("stroke","black")
    .attr("stroke-width",1.5)


  var height2 = avg_data.length * 30 + 30

  var svg = d3.select("#allpollsters").append("svg")
    .attr("viewBox", "0 0 800 " + height2)

  svg.selectAll("rect")
    .data(avg_data)
    .enter()
    .append("rect")
    .attr("fill", d => z(d.avg_rmse))
    .attr("x", 550)
    .attr("y", (d, i) => i * 30 + 30)
    .attr("width", 100)
    .attr("height", 30)

    svg.selectAll("topline")
    .data(avg_data)
    .enter()
    .append("text")
    .text(d=>d.avg_rmse)
    .attr("x",600)
    .attr("y",(d,i)=> i*30 + 47.5)
    .attr("font-size",15)
    .attr("fill","black")
    .attr("text-anchor","middle")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")

    svg.selectAll("topline")
    .data(avg_data)
    .enter()
    .append("text")
    .text(d=>d.pollster)
    .attr("x",100)
    .attr("y",(d,i)=> i*30 + 47.5)
    .attr("font-size",15)
    .attr("fill","black")
    .attr("text-anchor","start")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")

    svg.selectAll("topline")
    .data(avg_data)
    .enter()
    .append("text")
    .text(d=>d.rank)
    .attr("x",50)
    .attr("y",(d,i)=> i*30 + 47.5)
    .attr("font-size",15)
    .attr("fill","black")
    .attr("text-anchor","middle")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")


    svg.selectAll("topline")
    .data(avg_data)
    .enter()
    .append("text")
    .text(d=>d.num_polls)
    .attr("x",720)
    .attr("y",(d,i)=> i*30 + 47.5)
    .attr("font-size",15)
    .attr("fill","black")
    .attr("text-anchor","middle")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")


    svg.append("text")
    .text("Rank")
    .attr("x",50)
    .attr("y",15)
    .attr("font-size",20)
    .attr("fill","black")
    .attr("text-anchor","middle")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")

    svg.append("text")
    .text("Pollster")
    .attr("x",100)
    .attr("y",15)
    .attr("font-size",20)
    .attr("fill","black")
    .attr("text-anchor","start")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")

    svg.append("text")
    .text("Average Error")
    .attr("x",600)
    .attr("y",15)
    .attr("font-size",20)
    .attr("fill","black")
    .attr("text-anchor","middle")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")

    svg.append("text")
    .text("# of Polls")
    .attr("x",720)
    .attr("y",15)
    .attr("font-size",20)
    .attr("fill","black")
    .attr("text-anchor","middle")
    .attr("font-weight",700)
    .attr("dominant-baseline","middle")

    svg.append("line")
    .attr("x1",1000)
    .attr("x2",000)
    .attr("y1",30)
    .attr("y2",30)
    .attr("stroke","black")
    .attr("stroke-width",1.5)

    var forecasts = ["JHK Forecasts","RealClearPolitics","Lean Tossup","#10at10","FiveThirtyEight Polling Avg","FiveThirtyEight Forecast"]

    var forecast_data = []

  for (let j = 0; j <= forecasts.length - 1; j++) {

    var data = {
      forecast: forecasts[j],
      avg_rmse: d3.mean(forecasters.filter(d => d.name == forecasts[j]), d => d.RMSE),
    }
    forecast_data.push(data)
  }
console.log(forecast_data)


})


