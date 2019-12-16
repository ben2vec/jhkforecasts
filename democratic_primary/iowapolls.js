var svg = d3.select("body").append("svg")
    .attr("width", 1)
    .attr("height", 1)

var table = d3.select("#table-location")
	.append("table")
	.attr("class", "table table-condensed"),
	thead = table.append("thead"),
	tbody = table.append("tbody");


d3.csv("polls.csv", function(error, data){

	// filter year
	var data = data.filter(function(d){return d.State == 'Iowa';});
	// Get every column value
	var columns = Object.keys(data[0])
		.filter(function(d){
			return ((d != "State"));
        });
        
	var header = thead.append("tr")
        .selectAll("th")
        .style("font-size",10)
		.data(columns)
		.enter()
		.append("th")
			.text(function(d){ return d;})
			.on("click", function(d){
				if (d == "State"){
					rows.sort(function(a, b) {
						if (a[d] < b[d]){
							return -1;
						}
						if (a[d] > b[d]){
							return 1;
						}
						else{
							return 0;
						}
    				});
				}
				else if (d.split(" ")[0] == "Percent"){
					rows.sort(function(a, b){
						return +b[d].split("%")[0] - +a[d].split("%")[0];
					});
				}
				else {
					rows.sort(function(a, b){
						return b[d] - a[d];
					})
				}
  			});

	var rows = tbody.selectAll("tr")
		.data(data)
		.enter()
		.append("tr")
	
	var cells = rows.selectAll("td")
		.data(function(row){
			return columns.map(function(d, i){
				return {i: d, value: row[d]};
			});
		})
		.enter()
		.append("td")
		.html(function(d){ return d.value;})
		.style("font-size",10);


});