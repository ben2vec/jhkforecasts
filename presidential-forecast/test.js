var candidates = ["Biden", "Sanders"]
var timeparse = d3.timeParse("%m/%d/%y")
var time_scale = 86400000
var national_third_party = .03
var simulations = 10000
var timeformat = d3.timeFormat("%b. %d")
var pollformat = d3.format(".0f")

var color = d3.scaleLinear()
    .domain([0, 0.5, 1])
    .range(["#0091FF", "white", "#FC474E"]);
var gopscale = d3.scaleLinear()
    .domain([20, 80])
    .range(["white", "#FC474E"]);

var demscale = d3.scaleLinear()
    .domain([20, 80])
    .range(["white", "#0091FF"]);


var gopwincol = "#FC474E"
var demwincol = "#0091FF"
var thirdwincol = "#FFE130"



var numberformat = d3.format(".1%");
var numberFormat = d3.format(".0%");
d3.csv("https://projects.jhkforecasts.com/presidential_forecast/pollster-ratings.csv", pollster_ratings => {
   
    var pollster_names = pollster_ratings.map((d, i) => {
        return d.Pollster
    })

    var pollster_grade = pollster_ratings.map((d, i) => {
        return d["538Grade"]
    })
    var pollster_bias = pollster_ratings.map((d, i) => {
        return d.MeanRevertedBias == NaN ? 0 : d.MeanRevertedBias
    })
    var grade_scale = [
        { Grade: "A+", Value: 1.5 },
        { Grade: "A", Value: 1.35 },
        { Grade: "A-", Value: 1.2 },
        { Grade: "A/B", Value: 1.1 },
        { Grade: "B+", Value: 1 },
        { Grade: "B", Value: .925 },
        { Grade: "B-", Value: .85 },
        { Grade: "B/C", Value: .8 },
        { Grade: "C+", Value: .7 },
        { Grade: "C", Value: .65 },
        { Grade: "C-", Value: .55 },
        { Grade: "C/D", Value: .5 },
        { Grade: "D+", Value: .4 },
        { Grade: "D", Value: .3 },
        { Grade: "D-", Value: .2 },
        { Grade: "", Value: .7 },
    ]
    var pollster_grade_letter = grade_scale.map((d) => {
        return d.Grade
    })

    var pollster_grade_value = grade_scale.map((d) => {
        return d.Value
    })

 
        d3.csv("https://projects.fivethirtyeight.com/polls-page/president_polls.csv", data => {
            var data = data.filter(d => d.answer != "Schultz")
            var data = data.filter(d => d.candidate_party != "LIB")

            data.forEach((d, i) => {
                d.party_id = d.candidate_party == "DEM" ? 0 : 1
                return d;
            })
            data.sort((a, b) => a.party_id - b.party_id)

            console.log(data[0])
            var datanew = d3.nest()
                .key(d => d.question_id)
                .entries(data)

            var datanew = datanew.map((d, i) => {
                return d.values
            })

            var data_new = datanew.map((d, i) => {
                return {
                    question_id: +datanew[i][0].question_id,
                    poll_id: +datanew[i][0].poll_id,
                    state: datanew[i][0].state == "" ? "US" : datanew[i][0].state,
                    pollster: datanew[i][0].pollster,
                    id: +datanew[i][0].pollster_id,
                    url: datanew[i][0].url,
                    sponsors: datanew[i][0].sponsors,
                    n: datanew[i][0].sample_size,
                    date: timeparse(datanew[i][0].end_date),
                    population: datanew[i][0].population,
                    grade: pollster_grade[pollster_names.indexOf(datanew[i][0].pollster)] == undefined ? "-" : pollster_grade[pollster_names.indexOf(datanew[i][0].pollster)],
                    bias: pollster_bias[pollster_names.indexOf(datanew[i][0].pollster)] == undefined ? 0 : pollster_bias[pollster_names.indexOf(datanew[i][0].pollster)],
                    dem: datanew[i][0].answer,
                    gop: datanew[i][1].answer,
                    dem_pct: +datanew[i][0].pct,
                    gop_pct: +datanew[i][1].pct,
                    poll_index: datanew[i][0].state == "" ? "US" + datanew[i][0].pollster : datanew[i][0].state + datanew[i][0].pollster,
                    margin: +datanew[i][0].pct - +datanew[i][1].pct
                }
            })
            var data_new = data_new.filter(d => d.gop == "Trump")

            




            



            var bottom = d3.select("#bottom")
                .append("svg")
                .attr("viewBox", '0 0 1000 610');

            

            


            t(key_state,"Biden");
            function t(state, candidate) {
                var datanew = state == "All" ? data_new.slice(0, 100) : data_new.filter(d => d.state == state)

                var finaldata = candidate == "All" ? datanew : datanew.filter(d => d.dem == candidate)
                console.log(finaldata)



                var height = finaldata.length * 40 + 25

                bottom.attr("viewBox", '0 0 1000 ' + height)

                bottom.append("rect")
                    .attr("fill", "white")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", 1000)
                    .attr("height", height)

                bottom.selectAll("states")
                    .data(finaldata)
                    .enter()
                    .append("rect")
                    .attr("y", (d, i) => 26 + i * 40)
                    .attr("x", 610)
                    .attr("height", 40)
                    .attr("width", 80)
                    .attr("fill", d => demscale(d.dem_pct))

                bottom.selectAll("states")
                    .data(finaldata)
                    .enter()
                    .append("rect")
                    .attr("y", (d, i) => 26 + i * 40)
                    .attr("x", 710)
                    .attr("height", 40)
                    .attr("width", 80)
                    .attr("fill", d => gopscale(d.gop_pct))

                bottom.append("text")
                    .text("Pollster")
                    .attr("y", 12)
                    .attr("x", 50)
                    .attr("fill", "black")
                    .style("font-weight", "600")
                    .style("font-size", 20)
                    .attr("text-anchor", "start")
                    .attr("dominant-baseline", "middle")

                bottom.append("text")
                    .text("Date")
                    .attr("y", 12)
                    .attr("x", 300)
                    .attr("fill", "black")
                    .style("font-weight", "600")
                    .style("font-size", 20)
                    .attr("text-anchor", "start")
                    .attr("dominant-baseline", "middle")


                bottom.append("text")
                    .text("Margin")
                    .attr("y", 12)
                    .attr("x", 950)
                    .attr("fill", "black")
                    .style("font-weight", "600")
                    .style("font-size", 20)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")

                bottom.append("text")
                    .text("State")
                    .attr("y", 12)
                    .attr("x", 420)
                    .attr("fill", "black")
                    .style("font-weight", "600")
                    .style("font-size", 20)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")

                bottom.append("text")
                    .text("Grade")
                    .attr("y", 12)
                    .attr("x", 500)
                    .attr("fill", "black")
                    .style("font-weight", "600")
                    .style("font-size", 20)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")

                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("a")
                    .attr("href", d => d.url)
                    .append("text")
                    .text(d => d.pollster)
                    .attr("y", (d, i) => 40 + i * 40)
                    .attr("x", (d, i) => 50)
                    .attr("fill", "black")
                    .style("font-weight", "600")
                    .style("font-size", 15)
                    .attr("text-anchor", "start")
                    .attr("dominant-baseline", "middle")
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .attr("text-decoration", "underline")
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .attr("text-decoration", "none")
                    })
                    .call(wrap, 250)



                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => d.dem)
                    .attr("y", (d, i) => 40 + i * 40)
                    .attr("x", (d, i) => 600)
                    .attr("fill", d => d.margin < 0 ? "lightgrey" : "black")
                    .style("font-weight", "600")
                    .style("font-size", 15)
                    .attr("text-anchor", "end")
                    .attr("dominant-baseline", "middle")

                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => d.dem_pct)
                    .attr("y", (d, i) => 40 + i * 40)
                    .attr("x", (d, i) => 650)
                    .attr("fill", "black")
                    .style("font-weight", "600")
                    .style("font-size", 15)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")

                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => pollformat(d.gop_pct))
                    .attr("y", (d, i) => 40 + i * 40)
                    .attr("x", (d, i) => 750)
                    .attr("fill", "black")
                    .style("font-weight", "600")
                    .style("font-size", 15)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")

                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => d.gop)
                    .attr("y", (d, i) => 40 + i * 40)
                    .attr("x", (d, i) => 800)
                    .attr("fill", d => d.margin > 0 ? "lightgrey" : "black")
                    .style("font-weight", "600")
                    .style("font-size", 15)
                    .attr("text-anchor", "start")
                    .attr("dominant-baseline", "middle")


                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => d.margin == 0? "Even": d.margin > 0 ? "Biden +" + pollformat(d.margin) : "Trump +" +pollformat(Math.abs(d.margin)))
                    .attr("y", (d, i) => 40 + i * 40)
                    .attr("x", (d, i) => 950)
                    .attr("fill", d => d.margin == 0? "black":d.margin > 0 ? demwincol : gopwincol)
                    .style("font-weight", "600")
                    .style("font-size", 15)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")

                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => d.state)
                    .attr("y", (d, i) => 40 + i * 40)
                    .attr("x", (d, i) => 420)
                    .attr("fill", "black")
                    .style("font-weight", "600")
                    .style("font-size", 15)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")

                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => d.grade)
                    .attr("y", (d, i) => 40 + i * 40)
                    .attr("x", (d, i) => 500)
                    .attr("fill", d => "grade")
                    .style("font-weight", "600")
                    .style("font-size", 15)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")

                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("line")
                    .attr("y1", (d, i) => 26 + i * 40)
                    .attr("x1", (d, i) => 0)
                    .attr("y2", (d, i) => 26 + i * 40)
                    .attr("x2", (d, i) => 1000)
                    .attr("stroke", "lightgrey")
                    .attr("stroke-width", 1)


                bottom.selectAll("cands")
                    .data(finaldata)
                    .enter()
                    .append("text")
                    .text(d => timeformat(d.date))
                    .attr("y", (d, i) => 40 + i * 40)
                    .attr("x", (d, i) => 300)
                    .attr("fill", "grey")
                    .style("font-weight", "600")
                    .style("font-size", 15)
                    .attr("text-anchor", "start")
                    .attr("dominant-baseline", "middle")

                


                function wrap(text, width) {
                    text.each(function () {
                        var text = d3.select(this),
                            words = text.text().split(/\s+/).reverse(),
                            word,
                            line = [],
                            lineNumber = 0,
                            lineHeight = 1.1, // ems
                            x = text.attr("x"),
                            y = text.attr("y"),
                            dy = 0, //parseFloat(text.attr("dy")),
                            tspan = text.text(null)
                                .append("tspan")
                                .attr("x", x)
                                .attr("y", y)
                                .attr("dy", dy + "em");
                        while (word = words.pop()) {
                            line.push(word);
                            tspan.text(line.join(" "));
                            if (tspan.node().getComputedTextLength() > width) {
                                line.pop();
                                tspan.text(line.join(" "));
                                line = [word];
                                tspan = text.append("tspan")
                                    .attr("x", x)
                                    .attr("y", y)
                                    .attr("dy", ++lineNumber * lineHeight + dy + "em")
                                    .text(word);
                            }
                        }
                    });
                }




                var states = d3.select("#state-search")
                    .on("change", function () {
                        t(this.value, candidate);
                    })
                var cands = d3.select("#candidate-filter")
                    .on("change", function () {
                        t(state, this.value);
                    })
            }
            var selectbox = d3.select("#selectbox")
                .on("change", function () {
                    update(this.value);
                })

        })
    })

