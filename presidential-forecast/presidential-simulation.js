var mapType = "margin"
function winnerfunc() {
	var button = document.getElementById("winnerbutton")
	var winner = document.getElementById("winner")
	var margin = document.getElementById("margin")

	function func1() {
		button.innerHTML = "show margin"
		winner.style.display = "block"
		margin.style.display = "none"
		mapType = "winner"
		console.log(mapType)

	}
	function func2() {
		button.innerHTML = "SHOW WINNER"
		winner.style.display = "none"
		margin.style.display = "block"
		mapType = "margin"
		console.log(mapType)
	}

	button.innerHTML == "SHOW WINNER" ? func1() : func2()

}




var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia", "Maine CD-1", "Maine CD-2", "Nebraska CD-1", "Nebraska CD-2", "Nebraska CD-3"]
var map_states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"]
var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934 }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400 }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801 }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387 }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 253.9219 }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 245.5645 }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000 }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000 }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154 }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354 }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465 }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155 }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 231.2954 }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 228.4214 }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 202.6782 }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 259.1592 }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 264.9658 }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135 }, { "state": "Maine", "label": "ME", "xValue": 807.3105, "yValue": 109.855 }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000 }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000 }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647 }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874 }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514 }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 261.123 }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705 }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527 }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957 }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000 }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210 }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035 }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 163.2588 }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 284.5029 }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 117.3823 }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 219.4883 }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418 }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654 }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 200.856 }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000 }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 315.6387 }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 163.5166 }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 294.8193 }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 374.2861 }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 234.978 }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000 }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 252.7842 }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762 }, { "state": "West Virginia", "label": "WV", "xValue": 701, "yValue": 243 }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588 }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 179.6255 }, { "state": "District of Columbia", "label": "DC", "xValue": -1000, "yValue": -1000 }]
var stateInfo = [{ "state": "Alabama", "abbrev": "AL" }, { "state": "Alaska", "abbrev": "AK" }, { "state": "Arizona", "abbrev": "AZ" }, { "state": "Arkansas", "abbrev": "AR" }, { "state": "California", "abbrev": "CA" }, { "state": "Colorado", "abbrev": "CO" }, { "state": "Connecticut", "abbrev": "CT" }, { "state": "Delaware", "abbrev": "DE" }, { "state": "District of Columbia", "abbrev": "DC" }, { "state": "Florida", "abbrev": "FL" }, { "state": "Georgia", "abbrev": "GA" }, { "state": "Hawaii", "abbrev": "HI" }, { "state": "Idaho", "abbrev": "ID" }, { "state": "Illinois", "abbrev": "IL" }, { "state": "Indiana", "abbrev": "IN" }, { "state": "Iowa", "abbrev": "IA" }, { "state": "Kansas", "abbrev": "KS" }, { "state": "Kentucky", "abbrev": "KY" }, { "state": "Louisiana", "abbrev": "LA" }, { "state": "Maine", "abbrev": "ME" }, { "state": "Maryland", "abbrev": "MD" }, { "state": "Massachusetts", "abbrev": "MA" }, { "state": "Michigan", "abbrev": "MI" }, { "state": "Minnesota", "abbrev": "MN" }, { "state": "Mississippi", "abbrev": "MS" }, { "state": "Missouri", "abbrev": "MO" }, { "state": "Montana", "abbrev": "MT" }, { "state": "Nebraska", "abbrev": "NE" }, { "state": "Nevada", "abbrev": "NV" }, { "state": "New Hampshire", "abbrev": "NH" }, { "state": "New Jersey", "abbrev": "NJ" }, { "state": "New Mexico", "abbrev": "NM" }, { "state": "New York", "abbrev": "NY" }, { "state": "North Carolina", "abbrev": "NC" }, { "state": "North Dakota", "abbrev": "ND" }, { "state": "Ohio", "abbrev": "OH" }, { "state": "Oklahoma", "abbrev": "OK" }, { "state": "Oregon", "abbrev": "OR" }, { "state": "Pennsylvania", "abbrev": "PA" }, { "state": "Rhode Island", "abbrev": "RI" }, { "state": "South Carolina", "abbrev": "SC" }, { "state": "South Dakota", "abbrev": "SD" }, { "state": "Tennessee", "abbrev": "TN" }, { "state": "Texas", "abbrev": "TX" }, { "state": "Utah", "abbrev": "UT" }, { "state": "Vermont", "abbrev": "VT" }, { "state": "Virginia", "abbrev": "VA" }, { "state": "Washington", "abbrev": "WA" }, { "state": "West Virginia", "abbrev": "WV" }, { "state": "Wisconsin", "abbrev": "WI" }, { "state": "Wyoming", "abbrev": "WY" }, { "state": "Maine CD-1", "abbrev": "ME-1" }, { "state": "Maine CD-2", "abbrev": "ME-2" }, { "state": "Nebraska CD-1", "abbrev": "NE-1" }, { "state": "Nebraska CD-2", "abbrev": "NE-2" }, { "state": "Nebraska CD-3", "abbrev": "NE-3" }]

var width3 = 1020;
var height3 = 500;


var projection = d3.geoAlbersUsa()
	.translate([width3 / 2, height3 / 2])
	.scale([900]);


var path = d3.geoPath()
	.projection(projection);

var colormargin = d3.scaleLinear()
	.domain([100, -20, 0, 20, 100])
	.range(["#0091FF", "#0091FF", "white", "#FF6060", "#FF6060"]);

var color = d3.scaleLinear()
	.domain([-100, -10, 0, 10, 100])
	.range(["#0091FF", "#0091FF", "white", "#FF6060", "#FF6060"]);
var winColor = d3.scaleLinear()
	.domain([0, 50, 100])
	.range(["#0091FF", "white", "#FF6060"]);


var gopwincol = "#FF6060"
var demwincol = "#0091FF"
var thirdwincol = "#FFE130"

var svg = d3.select("#usmap")
	.append("svg")
	.attr("viewBox", '100 50 820 600');

d3.select("#usmap").append("h1")
	.text("National Uncertaintity")
	.style("padding-left", "15px")
	.style("border", "black solid ")
	.style("width", "50%")
var dist = d3.select("#usmap")
	.append("svg")
	.attr("viewBox", '0 0 1000 400');

d3.select("#states").append("h1")
	.text("State Uncertaintity")
	.style("border", "black solid ")
	.style("padding-left", "15px")
	.style("width", "50%")
var st = d3.select("#states")
	.append("svg")
	.attr("viewBox", '0 0 1000 2300');
var pct = [-75, -50, -25, 0, 25, 50, 75]
st.selectAll("pct")
	.data(pct)
	.enter()
	.append("line")
	.attr("x1", d => d * 5.33 + 500)
	.attr("x2", d => d * 5.33 + 500)
	.attr("y1", 60)
	.attr("y2", 2300)
	.style("stroke", "lightgray")

var tool_tip1 = d3.tip()
	.attr("class", "d3-tip")
	.html("<div id='tipDiv1'></div>");

var tool_tip = d3.tip()
	.attr("class", "d3-tip")
	.html("<div id='tipDiv'></div>");

svg.call(tool_tip);

svg.call(tool_tip1)

var formatValue = d3.format(".1f");
var formatvalue = d3.format(".1f");

queue()
	.defer(d3.json, "us-states.json")
	.defer(d3.csv, "https://data.jhkforecasts.com/2020-pres-input.csv")
	.defer(d3.csv, "https://data.jhkforecasts.com/2020-presidential.csv")
	.await(ready);

function ready(error, json, inputData, dataInput) {
	if (error) throw error;


	var dataInput = dataInput.slice(dataInput.length - 228, dataInput.length)


	console.log(inputData)
	var data = []
	states.forEach((d, i) => {
		var state = d
		var stateData = dataInput.filter(d => d.state == state)
		var gopVote = stateData.filter(d => d.party == "REP")[0].vote
		var demVote = stateData.filter(d => d.party == "DEM")[0].vote
		var thirdVote = stateData.filter(d => d.party == "LIB")[0].vote
		var variance = inputData.filter(d => d.state == state)[0].elasticity
		var pct_vote = inputData.filter(d => d.state == state)[0].pct_vote
		var region = inputData.filter(d => d.state == state)[0].region
		var tippingPoint = stateData.filter(d => d.party == "DEM")[0].tipping_point
		data.push({
			state: state,
			electoralVotes: +stateData[0].ev,
			gopVote: +gopVote,
			demVote: +demVote,
			thirdVote: +thirdVote,
			variance: +variance,
			pctVote: +pct_vote,
			tippingPoint: tippingPoint,
			region: region
		})
	})
	var avgs = []
	var stavgs = []
	update(data, avgs, mapType, 1);
	function update(input, avgs, type, num) {

		for (let a = 0; a < num; a++) {
			var averages = avgs
			var change = d3.selectAll(".change")

			change.remove()

			var data = input
			var swings = {
				national: jStat.normal.inv((Math.random()), 0, 5),
				south: jStat.normal.inv((Math.random()), 0, 1),
				midwest: jStat.normal.inv((Math.random()), 0, 1),
				northeast: jStat.normal.inv((Math.random()), 0, 1),
				west: jStat.normal.inv((Math.random()), 0, 1),
				third: Math.random()
			}
			console.log(swings["south"])
			console.log(data)
			data.forEach((d, i) => {
				var simNum = (Math.random())
				d.gopSim = jStat.normal.inv(Math.random(), d.gopVote, 1 * d.variance) + (swings.national * d.variance) / 2 + swings[d.region] / 2
				d.demSim = jStat.normal.inv(Math.random(), d.demVote, 1 * d.variance) - (swings.national * d.variance) / 2 - swings[d.region] / 2
				d.thirdSim = jStat.normal.inv((Math.random() + ((swings.third) * 2)) / 3, d.thirdVote, swings.third > .5 ? d.thirdVote : d.thirdVote / 2)
				d.sum = d.gopSim + d.demSim + d.thirdSim
				d.gopSim = d.gopSim < 0 ? .5 : d.gopSim
				d.demSim = d.demSim < 0 ? .5 : d.demSim
				d.thirdSim = d.thirdSim < 0 ? .5 : d.thirdSim
				d.gopvote = d.gopSim / (d.sum / 100)
				d.demvote = d.demSim / (d.sum / 100)
				d.thirdvote = d.thirdSim / (d.sum / 100)
				d.margin = d.gopvote - d.demvote
				d.gopev = d.gopvote > d.demvote ? d.electoralVotes : 0
				d.gopvoteperc = d.gopvote * d.pctVote
				d.demvoteperc = d.demvote * d.pctVote
				d.thirdvoteperc = d.thirdvote * d.pctVote
				d.absmargin = Math.abs(d.margin)
				d.height = d.absmargin > 50 ? 300 : d.absmargin * 6
				stavgs.push({
					state: d.state,
					evs: d.electoralVotes,
					margin: d.margin
				})
			})


			var data = data.sort((a, b) => a.margin - b.margin)
			var dataabs = data

			data.forEach(function (d, i) {
				d.index = i + 1;
				d.indexev = d.index == 1 ? 0 : data[i - 1].indexev + data[i - 1].electoralVotes;
				d.tippingpoint = d.indexev < 270 ? d.indexev + d.electoralVotes >= 270 ? 1 : 0 : 0
				return d;
			})



			var gopev = d3.sum(data, d => d.gopev)
			var demev = 538 - gopev
			var goppopvote = d3.sum(data, d => d.gopvoteperc)
			var dempopvote = d3.sum(data, d => d.demvoteperc)
			var thirdpopvote = d3.sum(data, d => d.thirdvoteperc)





			for (var i = 0; i < data.length; i++) {
				var dataState = data[i].state;
				var margin = data[i].margin;
				var gopvote = data[i].gopvote;
				var demvote = data[i].demvote;
				var thirdvote = data[i].thirdvote;
				var tippingpoint = data[i].tippingpoint;
				var absmargin = data[i].absmargin;
				var pollclose = data[i].pollclose;
				for (var j = 0; j < json.features.length; j++) {
					var jsonState = json.features[j].properties.name;

					if (dataState == jsonState) {
						json.features[j].properties.margin = margin
						json.features[j].properties.gopvote = gopvote
						json.features[j].properties.demvote = demvote
						json.features[j].properties.thirdvote = thirdvote
						json.features[j].properties.tippingpoint = tippingpoint
						json.features[j].properties.pollclose = pollclose
							;




						break;
					}
				}
			}
			json.features.sort((a, b) => a.properties.pollclose - b.properties.pollclose)



			svg.append("g")
				.attr("id", "margin")
				.attr("class", "change")
				.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("d", path)
				.style("stroke", "white")
				.style("stroke-width", "1")
				.style("fill", d => colormargin(d.properties.margin))

			svg.append("g")
				.attr("id", "winner")
				.attr("class", "change")
				.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("d", path)
				.style("stroke", "white")
				.style("stroke-width", "1")
				.style("fill", d => d.properties.margin > 0 ? gopwincol : demwincol)

			svg.selectAll("w")
				.data(map_labels)
				.enter()
				.append("text")
				.attr("class", "change")
				.text(d => d.label)
				.attr("x", d => d.xValue)
				.attr("y", d => d.yValue)
				.style("font-family", "sf-mono")
				.style("font-weight", 100)
				.style("font-size", "11")
				.attr("text-anchor", "middle")

			svg.append("g")
				.attr("class", "statesover change")
				.selectAll("path2")
				.data(json.features)
				.enter()
				.append("path")
				.attr("d", path)
				.style("stroke", "white")
				.style("stroke-width", "1")
				.on("mouseover", function (d) {

					tool_tip.show().offset([-150, -87.5]);
					var tipSVG = d3.select("#tipDiv")
						.append("svg")
						.attr("width", 175)
						.attr("height", 150)
						;
					tipSVG.append("rect")
						.attr("y", 1.5)
						.attr("x", 1.5)
						.attr("width", 172)
						.attr("height", 147)
						.attr("rx", 8)
						.attr("fill", "white")
						.attr("stroke", "black")
						.attr("stroke-width", 2)

					tipSVG.append("text")
						.text(d.properties.name.toUpperCase())
						.attr("y", 23)
						.attr("x", 87.5)
						.attr("fill", "#black")
						.attr("font-weight", "500")
						.style("font-size", "20")
						.attr("text-anchor", "middle")
						.style("font-family", "sf-mono")
						.style("font-weight", 100);



					tipSVG.append("line")
						.attr("y1", 30)
						.attr("x1", 0)
						.attr("y2", 30)
						.attr("x2", 200)
						.attr("stroke", "black")
						.attr("stroke-width", 1)


					tipSVG.append("text")
						.text(d.properties.gopvote > d.properties.demvote ? "Trump" : "Biden")
						.attr("y", 50)
						.attr("x", 10)
						.attr("fill", d.properties.gopvote > d.properties.demvote ? gopwincol : demwincol)
						.attr("font-weight", "500")
						.style("font-size", "20")
						.attr("text-anchor", "start")
						.style("font-family", "sf-mono")
						.style("font-weight", 100);;

					tipSVG.append("text")
						.text(d.properties.gopvote > d.properties.demvote ? formatvalue(d.properties.gopvote) + "%" : formatvalue(d.properties.demvote) + "%")
						.attr("y", 50)
						.attr("x", 160)
						.attr("fill", d.properties.gopvote > d.properties.demvote ? gopwincol : demwincol)
						.attr("font-weight", "500")
						.style("font-size", "20")
						.attr("text-anchor", "end")
						.style("font-family", "sf-mono")
						.style("font-weight", 100);;

					tipSVG.append("text")
						.text(d.properties.gopvote < d.properties.demvote ? "Trump" : "Biden")
						.attr("y", 80)
						.attr("x", 10)
						.attr("fill", d.properties.gopvote < d.properties.demvote ? gopwincol : demwincol)
						.attr("font-weight", "500")
						.style("font-size", "20")
						.attr("text-anchor", "start")
						.style("font-family", "sf-mono")
						.style("font-weight", 100);;

					tipSVG.append("text")
						.text(d.properties.gopvote < d.properties.demvote ? formatvalue(d.properties.gopvote) + "%" : formatvalue(d.properties.demvote) + "%")
						.attr("y", 80)
						.attr("x", 160)
						.attr("fill", d.properties.gopvote < d.properties.demvote ? gopwincol : demwincol)
						.attr("font-weight", "500")
						.style("font-size", "20")
						.attr("text-anchor", "end")
						.style("font-family", "sf-mono")
						.style("font-weight", 100);;

					tipSVG.append("text")
						.text("other")
						.attr("y", 110)
						.attr("x", 10)
						.attr("fill", thirdwincol)
						.attr("font-weight", "500")
						.style("font-size", "20")
						.attr("text-anchor", "start")
						.style("font-family", "sf-mono")
						.style("font-weight", 100);;

					tipSVG.append("text")
						.text(formatValue(d.properties.thirdvote) + "%")
						.attr("y", 110)
						.attr("x", 160)
						.attr("fill", thirdwincol)
						.attr("font-weight", "500")
						.style("font-size", "20")
						.attr("text-anchor", "end")
						.style("font-family", "sf-mono")
						.style("font-weight", 100);;


					tipSVG.append("text")
						.text(d.properties.gopvote > d.properties.demvote ? "R+" + formatValue(Math.abs(d.properties.margin)) : "D+" + formatValue(Math.abs(d.properties.margin)))
						.attr("y", 140)
						.attr("x", 87.5)
						.attr("fill", d.properties.gopvote > d.properties.demvote ? gopwincol : demwincol)
						.attr("font-weight", "500")
						.style("font-size", "20")
						.attr("text-anchor", "middle")
						.style("font-family", "sf-mono")
						.style("font-weight", 100);;

				})
				.on('mouseout',
					function (d) {
						tool_tip.hide()
					})
			console.log(type)
			function func3() {
				document.getElementById("winner").style.display = "block"
				document.getElementById("margin").style.display = "none"
			}
			function func4() {
				document.getElementById("winner").style.display = "none"
				document.getElementById("margin").style.display = "block"
			}

			type == "winner" ? func3() : func4()


				;
			svg.selectAll("pe")
				.data(json.features)
				.enter()
				.append("path")
				.attr("class", "states change")
				.attr("d", path)
				.style("stroke", d => d.properties.tippingpoint == 1 ? "black" : "none")
				.style("stroke-width", "2")
				.style("fill", "none");



			svg.append("rect")
				.attr("class", "change")
				.attr("x", 850)
				.attr("y", 350)
				.attr("width", 20)
				.attr("height", 20)
				.style("stroke", "black")
				.style("stroke-width", 2)
				.attr("ry", "6")
				.style("fill", "none");

			svg.append("text")
				.attr("class", "change")
				.text("Tipping Point")
				.attr("x", 725)
				.attr("y", 365)
				.attr("fill", "black")
				.style("font-weight", "500")
				.style("font-size", "15")
				.style("font-family", "sf-mono")
				.style("font-weight", 100);;

			var x = d3.scaleLinear()
				.domain([0, 538])
				.range([0, 750])

			svg.selectAll("rect")
				.data(data)
				.enter()
				.append("rect")
				.attr("class", "change")
				.attr("stroke", "white")
				.attr("transform", "translate(135,0)")
				.attr("y", d => 1000 - d.height)
				.attr("x", d => x(d.indexev))
				.attr("rx", 3)
				.attr("height", d => d.height)
				.attr("width", d => x(d.electoralVotes))
				.attr("fill", d => color(d.margin))
				.attr("stroke-width", .5)
				.on('mouseover', function (d) {
					tool_tip1.show().offset([-50, -150]);
					var tipSVG = d3.select("#tipDiv1")
						.append("svg")
						.attr("width", 300)
						.attr("height", 50)



					tipSVG.append("text")
						.text(d.state)
						.attr("y", 20)
						.attr("x", 150)
						.attr("fill", "#black")
						.attr("text-anchor", "middle")
						.attr("font-weight", "500")
						.style("font-size", "20");

					tipSVG.append("text")
						.text(d.margin > 0 ? "R+" + formatValue(d.absmargin) + "%" : "D+" + formatValue(d.absmargin) + "%")
						.attr("y", 40)
						.attr("x", 150)
						.attr("fill", "#black")
						.attr("text-anchor", "middle")
						.attr("font-weight", "500")
						.style("font-size", "20");




				})
				.on('mouseout', tool_tip1.hide);

			svg.append("line")
				.attr("class", "change")
				.attr("x1", 510)
				.attr("y1", 1000)
				.attr("x2", 510)
				.attr("y2", 720)
				.attr("stroke", "black")
				.attr("stroke-width", "1");

			svg.append("text")
				.attr("class", "change")
				.text("270")
				.attr("x", 510)
				.attr("y", 710)
				.attr("text-anchor", "middle")
				.style("font-family", "sf-mono")
				.style("font-weight", 100);;

			svg.append("text")
				.attr("class", "change")
				.text("Which State tipped this election?")
				.attr("x", 510)
				.attr("y", 690)
				.attr("text-anchor", "middle")
				.style("font-family", "sf-mono")
				.style("font-weight", 100);;

			var dataabs = data
			var dataabs = dataabs.sort((a, b) => Math.abs(a.margin) - Math.abs(b.margin))

			svg.append("text")
				.attr("class", "change")
				.attr("x", 880)
				.attr("y", 30)
				.style("fill", gopwincol)
				.style("font-size", 30)
				.attr("font-weight", "500")
				.text(gopev)
				.attr("text-anchor", "end")

			svg.append("text")
				.attr("class", "change")
				.attr("x", 880)
				.attr("y", -10)
				.style("fill", gopwincol)
				.style("font-size", 30)
				.attr("font-weight", "500")
				.text("Trump")
				.attr("text-anchor", "end")

			svg.append("text").attr("class", "change")
				.attr("x", 140)
				.attr("y", 30)
				.style("fill", demwincol)
				.style("font-size", 30)
				.attr("font-weight", "500")
				.text(demev)
				.attr("text-anchor", "start")

			svg.append("text").attr("class", "change")
				.attr("x", 140)
				.attr("y", -10)
				.style("fill", demwincol)
				.style("font-size", 30)
				.attr("font-weight", "500")
				.text("Biden")
				.attr("text-anchor", "start")


			svg.append("text").attr("class", "change")
				.attr("x", 510)
				.attr("y", 550)
				.style("fill", "Black")
				.style("font-size", 30)
				.attr("font-weight", "500")
				.text("Popular Vote")
				.attr("text-anchor", "middle")

			svg.append("text").attr("class", "change")
				.attr("x", 510)
				.attr("y", 630)
				.style("fill", gopwincol)
				.style("font-size", 30)
				.attr("font-weight", "500")
				.text(formatvalue(goppopvote) + "%")
				.attr("text-anchor", "middle")

			svg.append("text").attr("class", "change")
				.attr("x", 510)
				.attr("y", 590)
				.style("fill", gopwincol)
				.style("font-size", 30)
				.attr("font-weight", "500")
				.text("Trump")
				.attr("text-anchor", "middle")

			svg.append("text").attr("class", "change")
				.attr("x", 120)
				.attr("y", 630)
				.style("fill", demwincol)
				.style("font-size", 30)
				.attr("font-weight", "500")
				.text(formatvalue(dempopvote) + "%")
				.attr("text-anchor", "start")

			svg.append("text").attr("class", "change")
				.attr("x", 120)
				.attr("y", 590)
				.style("fill", demwincol)
				.style("font-size", 30)
				.attr("font-weight", "500")
				.text("Biden")
				.attr("text-anchor", "start")

			svg.append("text").attr("class", "change")
				.attr("x", 880)
				.attr("y", 630)
				.style("fill", thirdwincol)
				.style("font-size", 30)
				.attr("font-weight", "500")
				.text(formatValue(thirdpopvote) + "%")
				.attr("text-anchor", "end")

			svg.append("text").attr("class", "change")
				.attr("x", 880)
				.attr("y", 590)
				.style("fill", thirdwincol)
				.style("font-size", 30)
				.attr("font-weight", "500")
				.text("3rd Party")
				.attr("text-anchor", "end")

			//vote & ev distribution
			var pct = [0, 10, 20, 30, 40, 50, 60]
			var evs = [0, 100, 200, 270, 300, 400, 500]

			dist.selectAll("pct")
				.data(pct)
				.enter()
				.append("text")
				.attr("class", "change")
				.attr("x", d => d * 12 + 200)
				.attr("y", 50)
				.style("fill", "black")
				.style("font-size", 13)
				.attr("font-weight", "100")
				.text(d => d)
				.attr("text-anchor", "middle")

			dist.selectAll("pct")
				.data(pct)
				.enter()
				.append("line")
				.attr("class", "change")
				.attr("x1", d => d * 12 + 200)
				.attr("x2", d => d * 12 + 200)
				.attr("y1", 60)
				.attr("y2", 210)
				.style("stroke", "lightgray")


			dist.selectAll("pct")
				.data(evs)
				.enter()
				.append("line")
				.attr("class", "change")
				.attr("x1", d => d * 1.5 + 200)
				.attr("x2", d => d * 1.5 + 200)
				.attr("y1", 260)
				.attr("y2", 360)
				.style("stroke", d => d == 270 ? "black" : "lightgray")


			dist.selectAll("pct")
				.data(evs)
				.enter()
				.append("text")
				.attr("class", "change")
				.attr("x", d => d * 1.5 + 200)
				.attr("y", 250)
				.style("fill", "black")
				.style("font-size", 13)
				.attr("font-weight", "100")
				.text(d => d)
				.attr("text-anchor", "middle")

			dist.append("circle")
				.attr("cy", 300)
				.attr("cx", gopev * 1.5 + 200)
				.attr("fill", gopwincol)
				.attr("r", 4)
				.attr("opacity", .2)



			dist.append("circle")
				.attr("cy", 350)
				.attr("cx", demev * 1.5 + 200)
				.attr("fill", demwincol)
				.attr("r", 4)
				.attr("opacity", .2)



			dist.append("circle")
				.attr("cy", 100)
				.attr("cx", goppopvote * 12 + 200)
				.attr("fill", gopwincol)
				.attr("r", 4)
				.attr("opacity", .2)

			dist.append("circle")
				.attr("cy", 150)
				.attr("cx", dempopvote * 12 + 200)
				.attr("fill", demwincol)
				.attr("r", 4)
				.attr("opacity", .2)

			dist.append("circle")
				.attr("cy", 200)
				.attr("cx", thirdpopvote * 12 + 200)
				.attr("fill", thirdwincol)
				.attr("r", 4)
				.attr("opacity", .2)

			dist.append("circle")
				.attr("class", "change")
				.attr("cy", 100)
				.attr("cx", goppopvote * 12 + 200)
				.attr("fill", "none")
				.attr("stroke", "black")
				.attr("r", 4)
				.attr("opacity", 1)


			dist.append("circle")
				.attr("class", "change")
				.attr("cy", 150)
				.attr("cx", dempopvote * 12 + 200)
				.attr("fill", "none")
				.attr("stroke", "black")
				.attr("r", 4)
				.attr("opacity", 1)

			dist.append("circle")
				.attr("class", "change")
				.attr("cy", 200)
				.attr("cx", thirdpopvote * 12 + 200)
				.attr("fill", "none")
				.attr("stroke", "black")
				.attr("r", 4)
				.attr("opacity", 1)

			dist.append("circle")
				.attr("class", "change")
				.attr("cy", 300)
				.attr("cx", gopev * 1.5 + 200)
				.attr("fill", "none")
				.attr("stroke", "black")
				.attr("r", 4)
				.attr("opacity", 1)

			dist.append("circle")
				.attr("class", "change")
				.attr("cy", 350)
				.attr("cx", demev * 1.5 + 200)
				.attr("fill", "none")
				.attr("stroke", "black")
				.attr("r", 4)
				.attr("opacity", 1)

			dist.append("text").attr("class", "change")
				.attr("x", 50)
				.attr("y", 100)
				.style("fill", "black")
				.style("font-size", 20)
				.attr("font-weight", "100")
				.text("TRUMP")
				.attr("text-anchor", "start")
				.attr("dominant-baseline", "central")

			dist.append("text").attr("class", "change")
				.attr("x", 50)
				.attr("y", 150)
				.style("fill", "black")
				.style("font-size", 20)
				.attr("font-weight", "100")
				.text("BIDEN")
				.attr("text-anchor", "start")
				.attr("dominant-baseline", "central")

			dist.append("text").attr("class", "change")
				.attr("x", 50)
				.attr("y", 200)
				.style("fill", "black")
				.style("font-size", 20)
				.attr("font-weight", "100")
				.text("3rd")
				.attr("text-anchor", "start")
				.attr("dominant-baseline", "central")

			dist.append("text").attr("class", "change")
				.attr("x", 50)
				.attr("y", 300)
				.style("fill", "black")
				.style("font-size", 20)
				.attr("font-weight", "100")
				.text("TRUMP")
				.attr("text-anchor", "start")
				.attr("dominant-baseline", "central")

			dist.append("text").attr("class", "change")
				.attr("x", 50)
				.attr("y", 350)
				.style("fill", "black")
				.style("font-size", 20)
				.attr("font-weight", "100")
				.text("BIDEN")
				.attr("text-anchor", "start")
				.attr("dominant-baseline", "central")



			dist.append("text").attr("class", "change")
				.attr("x", 500)
				.attr("y", 230)
				.style("fill", "black")
				.style("font-size", 15)
				.attr("font-weight", "100")
				.text("electoral votes")
				.attr("text-anchor", "middle")


			dist.append("text").attr("class", "change")
				.attr("x", 500)
				.attr("y", 30)
				.style("fill", "black")
				.style("font-size", 15)
				.attr("font-weight", "100")
				.text("popular vote")
				.attr("text-anchor", "middle")

			avgs.push({
				winner: gopev == 269 || gopev > 269 ? "gop" : "dem",
				gopev: gopev,
				demev: demev,
				gopvote: goppopvote,
				demvote: dempopvote,
				thirdvote: thirdpopvote
			})
			dist.append("text")
				.attr("class", "change")
				.attr("x", d => d3.mean(avgs, d => d.gopvote) * 12 + 200)
				.attr("y", 85)
				.style("fill", "black")
				.style("font-size", 13)
				.attr("font-weight", "100")
				.text(d => formatvalue(d3.mean(avgs, d => d.gopvote)))
				.attr("text-anchor", "middle")

			dist.append("line")
				.attr("class", "change")
				.attr("x1", d => d3.mean(avgs, d => d.gopvote) * 12 + 200)
				.attr("x2", d => d3.mean(avgs, d => d.gopvote) * 12 + 200)
				.attr("y1", 95)
				.attr("y2", 105)
				.style("stroke", "black")

			dist.append("line")
				.attr("class", "change")
				.attr("x1", d => d3.mean(avgs, d => d.demvote) * 12 + 200)
				.attr("x2", d => d3.mean(avgs, d => d.demvote) * 12 + 200)
				.attr("y1", 145)
				.attr("y2", 155)
				.style("stroke", "black")


			dist.append("line")
				.attr("class", "change")
				.attr("x1", d => d3.mean(avgs, d => d.thirdvote) * 12 + 200)
				.attr("x2", d => d3.mean(avgs, d => d.thirdvote) * 12 + 200)
				.attr("y1", 195)
				.attr("y2", 205)
				.style("stroke", "black")

			dist.append("line")
				.attr("class", "change")
				.attr("x1", d => d3.mean(avgs, d => d.gopev) * 1.5 + 200)
				.attr("x2", d => d3.mean(avgs, d => d.gopev) * 1.5 + 200)
				.attr("y1", 295)
				.attr("y2", 305)
				.style("stroke", "black")

			dist.append("line")
				.attr("class", "change")
				.attr("x1", d => d3.mean(avgs, d => d.demev) * 1.5 + 200)
				.attr("x2", d => d3.mean(avgs, d => d.demev) * 1.5 + 200)
				.attr("y1", 345)
				.attr("y2", 355)
				.style("stroke", "black")



			dist.append("text")
				.attr("class", "change")
				.attr("x", d => d3.mean(avgs, d => d.demvote) * 12 + 200)
				.attr("y", 135)
				.style("fill", "black")
				.style("font-size", 13)
				.attr("font-weight", "100")
				.text(d => formatvalue(d3.mean(avgs, d => d.demvote)))
				.attr("text-anchor", "middle")

			dist.append("text")
				.attr("class", "change")
				.attr("x", d => d3.mean(avgs, d => d.thirdvote) * 12 + 200)
				.attr("y", 185)
				.style("fill", "black")
				.style("font-size", 13)
				.attr("font-weight", "100")
				.text(d => formatvalue(d3.mean(avgs, d => d.thirdvote)))
				.attr("text-anchor", "middle")


			dist.append("text")
				.attr("class", "change")
				.attr("x", d => d3.mean(avgs, d => d.gopev) * 1.5 + 200)
				.attr("y", 285)
				.style("fill", "black")
				.style("font-size", 13)
				.attr("font-weight", "100")
				.text(d => formatvalue(d3.mean(avgs, d => d.gopev)))
				.attr("text-anchor", "middle")


			dist.append("text")
				.attr("class", "change")
				.attr("x", d => d3.mean(avgs, d => d.demev) * 1.5 + 200)
				.attr("y", 335)
				.style("fill", "black")
				.style("font-size", 13)
				.attr("font-weight", "100")
				.text(d => formatvalue(d3.mean(avgs, d => d.demev)))
				.attr("text-anchor", "middle")

			d3.select("#p").remove()
			var simulations = avgs.length
			d3.select("#P")
				.append("p")
				.attr("id", "p")
				.text("Simulations:" + simulations)
				.style("font-size", "1.2vw")
				.style("font-family", "sf-mono")

			dist.append("text").attr("class", "change")
				.attr("x", 990)
				.attr("y", 100)
				.style("fill", "black")
				.style("font-size", 15)
				.attr("font-weight", "100")
				.text(formatValue(avgs.filter(d => d.winner == "gop").length * 100 / simulations) + "%")
				.attr("text-anchor", "end")
				.attr("dominant-baseline", "central")


			dist.append("text").attr("class", "change")
				.attr("x", 990)
				.attr("y", 50)
				.style("fill", "black")
				.style("font-size", 15)
				.attr("font-weight", "100")
				.text("WIN")
				.attr("text-anchor", "end")
				.attr("dominant-baseline", "central")
			dist.append("text").attr("class", "change")
				.attr("x", 990)
				.attr("y", 150)
				.style("fill", "black")
				.style("font-size", 15)
				.attr("font-weight", "100")
				.text(100 - formatValue(avgs.filter(d => d.winner == "gop").length * 100 / simulations) + "%")
				.attr("text-anchor", "end")
				.attr("dominant-baseline", "central")



			stateInfo.forEach((d, i) => {
				var state = d.state
				var stdata = stavgs.filter(d => d.state == state)
				d.gopWin = stdata.filter(d => d.margin > 0).length * 100 / simulations
				d.avgMargin = d3.mean(stdata, d => d.margin)
				d.margin = data.filter(d => d.state == state)[0].margin
				d.tippingPoint = +data.filter(d => d.state == state)[0].tippingPoint
			})
			stateInfo.sort((a, b) => b.tippingPoint - a.tippingPoint)
			console.log(stateInfo)
			var pct = [-75, -50, -25, 0, 25, 50, 75]
			st.selectAll("pct")
				.data(pct)
				.enter()
				.append("line")
				.attr("class", "change")
				.attr("x1", d => d * 5.33 + 500)
				.attr("x2", d => d * 5.33 + 500)
				.attr("y1", 60)
				.attr("y2", 2300)
				.style("stroke", "lightgray")

			st.selectAll("w")
				.data(stateInfo)
				.enter()
				.append("text")
				.attr("class", "change")
				.text(d => d.abbrev)
				.attr("x", 20)
				.attr("y", (d, i) => i * 40 + 80)
				.style("fill", "black")
				.style("font-size", 20)
				.attr("font-weight", "100")
				.attr("text-anchor", "start")
				.attr("dominant-baseline", "central")

			st.selectAll("w")
				.data(stateInfo)
				.enter()
				.append("rect")
				.attr("class", "change")
				.attr("x", 900)
				.attr("y", (d, i) => i * 40 + 60)
				.attr("height", 40)
				.attr("width", 100)
				.style("fill", d => winColor(d.gopWin))

			st.selectAll("w")
				.data(stateInfo)
				.enter()
				.append("text")
				.attr("class", "change")
				.text(d => formatValue(Math.abs(((d.gopWin) - 50)) + 50))
				.attr("x", 950)
				.attr("y", (d, i) => i * 40 + 80)
				.style("fill", "black")
				.style("font-size", 15)
				.attr("font-weight", "100")
				.attr("text-anchor", "middle")
				.attr("dominant-baseline", "central")




			st.selectAll("w")
				.data(stateInfo)
				.enter()
				.append("circle")
				.attr("cy", (d, i) => i * 40 + 80)
				.attr("cx", d => d.margin * 5.33 + 500)
				.attr("fill", d => d.margin > 0 ? gopwincol : demwincol)
				.attr("r", 4)
				.attr("opacity", .2)

			st.selectAll("w")
				.data(stateInfo)
				.enter()
				.append("circle")
				.attr("class", "change")
				.attr("cy", (d, i) => i * 40 + 80)
				.attr("cx", d => d.margin * 5.33 + 500)
				.attr("fill", d => "none")
				.attr("r", 4)
				.attr("stroke", "black")
				.attr("opacity", 1)
				.attr("stroke-width", 1)

			st.selectAll("w")
				.data(stateInfo)
				.enter()
				.append("text")
				.attr("class", "change")
				.text(d => d.avgMargin == 0 ? "-" : d.avgMargin > 0 ? "R+" + formatvalue(d.avgMargin) : "D+" + formatvalue(-d.avgMargin))
				.attr("x", d => d.avgMargin * 5.33 + 500)
				.attr("y", (d, i) => i * 40 + 65)
				.style("fill", "black")
				.style("font-size", 12)
				.attr("font-weight", "100")
				.attr("text-anchor", "middle")
				.attr("dominant-baseline", "central")

			st.selectAll("w")
				.data(stateInfo)
				.enter()
				.append("line")
				.attr("class", "change")
				.attr("x1", d => d.avgMargin * 5.33 + 500)
				.attr("x2", d => d.avgMargin * 5.33 + 500)
				.attr("y1", (d, i) => i * 40 + 75)
				.attr("y2", (d, i) => i * 40 + 85)
				.attr("stroke", "black")



			st.selectAll("w")
				.data(pct)
				.enter()
				.append("text")
				.attr("class", "change")
				.text(d => d == 0 ? "EVEN" : d > 0 ? "R+" + formatvalue(d) : "D+" + formatvalue(-d))
				.attr("x", d => d * 5.33 + 500)
				.attr("y", (d, i) => 45)
				.style("fill", "black")
				.style("font-size", 12)
				.attr("font-weight", "100")
				.attr("text-anchor", "middle")
				.attr("dominant-baseline", "central")

			d3.select("#B")
				.transition()
				.text(demev)

			d3.select("#C")
				.transition()
				.text(gopev)

			console.log(num)

		}
	}


	d3.select("#newSim")
		.on("click", d => {
			update(data, avgs, mapType, 1)
		})

}