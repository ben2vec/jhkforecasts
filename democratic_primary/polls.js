var parse_date = d3.timeParse("%m/%d/%y")
        var parse_date_time = d3.timeParse("%m/%d/%y %H:%M")
        var allcandidates = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Gabbard", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]

        var pollster_grade = [
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
        var pollster_grade_letter = pollster_grade.map((d) => {
            return d.Grade
        })
        
        var pollster_grade_value = pollster_grade.map((d) => {
            return d.Value
        })

        d3.csv("https://projects.fivethirtyeight.com/polls-page/president_primary_polls.csv", function (data) {
            var data = data.filter(d => d.party == "DEM")
            console.log(data)
            var data_nested = d3.nest()
                .key(d => d.question_id)
                .entries(data)
            console.log(data_nested)
            var polls = []
            for (let i = 0; i < data_nested.length; i++) {
                var poll_response = []
                var cands_polled = []
                for (let j = 0; j < allcandidates.length; j++) {

                    var poll_candidate = data_nested[i].values.filter(d => d.answer == allcandidates[j])


                    var poll_answer = poll_candidate.map((d) => {
                        return +d.pct
                    })

                    poll_response.push(poll_answer)


                }

                var new_poll = {
                    question_id: +data_nested[i].values[0].question_id,
                    poll_id: +data_nested[i].values[0].poll_id,
                    state: data_nested[i].values[0].state == "" ? "US" : data_nested[i].values[0].state,
                    pollster_id: +data_nested[i].values[0].pollster_id.replace(","),
                    pollster: data_nested[i].values[0].pollster,
                    sponsor_ids: +data_nested[i].values[0].sponsor_ids,
                    sponsors: data_nested[i].values[0].sponsors,
                    display_name: data_nested[i].values[0].display_name,
                    pollster_rating_id: +data_nested[i].values[0].pollster_rating_id,
                    pollster_rating_name: data_nested[i].values[0].pollster_rating_name,
                    grade: data_nested[i].values[0].fte_grade,
                    n: +data_nested[i].values[0].sample_size,
                    population: data_nested[i].values[0].population,
                    start_date: parse_date(data_nested[i].values[0].start_date),
                    end_date: parse_date(data_nested[i].values[0].edn_date),
                    created_at: parse_date_time(data_nested[i].values[0].created_at),
                    url: data_nested[i].values[0].url,
                    Biden: +poll_response[0] == "" ? "-" : +poll_response[0],
                    Bloomberg: +poll_response[1] == "" ? "-" : +poll_response[1],
                    Buttigieg: +poll_response[3] == "" ? "-" : +poll_response[3],
                    Klobuchar: +poll_response[5] == "" ? "-" : +poll_response[5],
                    Sanders: +poll_response[6] == "" ? "-" : +poll_response[6],
                    Steyer: +poll_response[7] == "" ? "-" : +poll_response[7],
                    Warren: +poll_response[8] == "" ? "-" : +poll_response[8],
                    Yang: +poll_response[9] == "" ? "-" : +poll_response[9],
                    date: data_nested[i].values[0].end_date,
                    grade_value: pollster_grade_value[pollster_grade_letter.indexOf(data_nested[i].values[0].fte_grade)]
                }
                polls.push(new_poll)
            }

            console.log(polls)

            var polls_filtered = polls.filter(d => d.state == keyState)
            var svgHeight = polls_filtered.length * 50 + 60


            var svg = d3.select("#polls").append("svg")
                .attr("viewBox", "-50 0 1050 " + svgHeight)
                .append('g')



            var weightScale = d3.scaleLinear()
                .domain([0, 50])
                .range(["white", "#a4b1b5"]);
            var gopScale = d3.scaleLinear()
                .domain([20, 80])
                .range(["white", "#a4b1b5"]);

            var demScale = d3.scaleLinear()
                .domain([0, 50])
                .range(["white", "#0077FF"]);

            var demScale = d3.scaleLinear()
                .domain([0, 50])
                .range(["white", "#0077FF"]);

            var grade_scale = d3.scaleLinear()
                .domain([0.2, .75, 1.1, 1.5])
                .range(["#F0474E", "#FCDD26", "#37B76E", "#2079FF"])

            var parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S")
                formatDate = d3.timeFormat("%m - %d"),
                formatMonth = d3.timeFormat("%Y-%m-%d"),
                bisectDate = d3.bisector(d => d.date).left,
                formatValue = d3.format(".0f");

            var svgLegend = svg.append('g')
                .attr('class', 'gLegend')
                .attr("transform", "translate(" + 0 + "," + 90 + ")")



            var legend = svgLegend.selectAll('.legend')
                .data(polls_filtered)
                .enter().append('g')
                .attr("class", "legend")
                .attr("transform", function (d, i) { return "translate(0," + i * 50 + ")" })



            legend.append("a").attr("href", d => d.url).append("text")
                .attr("class", "legend-text")
                .attr("x", 0)
                .attr("y", -10)
                .style("fill", "Black")
                .style("font-size", 15)
                .attr("font-weight", 500)
                .text(d => d.pollster)
                .attr("text-anchor", "start")
                .call(wrap, 275)
                .on("mouseover", function (d) {
                    d3.select(this)
                        .attr("text-decoration", "underline")
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .attr("text-decoration", "none")
                })

            legend.append("rect")
                .attr("x", 275)
                .attr("y", -30)
                .attr("width", 1000)
                .attr("height", 50)
                .style("fill", "white")


            legend.append("text")
                .attr("class", "legend-text")
                .attr("x", 300)
                .attr("y", 0)
                .style("fill", d=>grade_scale(d.grade_value))
                .style("font-size", 20)
                .attr("font-weight", 900)
                .text(d => d.grade)
                .attr("text-anchor", "middle")

            legend.append("text")
                .attr("class", "legend-text")
                .attr("x", 400)
                .attr("y", 0)
                .style("fill", "Black")
                .style("font-size", 15)
                .attr("font-weight", 700)
                .text(d => d.date)
                .attr("text-anchor", "middle")

            legend.append("text")
                .attr("class", "legend-text")
                .attr("x", 500)
                .attr("y", 0)
                .style("fill", "Black")
                .style("font-size", 15)
                .attr("font-weight", 700)
                .text(d => d.n + " " + d.population)
                .attr("text-anchor", "end")





            legend.append("rect")
                .attr("x", 525)
                .attr("y", -30)
                .attr("width", 50)
                .attr("height", 50)
                .style("fill", d => d.Biden == "-" ? "white" : demScale(d.Biden))

            legend.append("rect")
                .attr("x", 575)
                .attr("y", -30)
                .attr("width", 50)
                .attr("height", 50)
                .style("fill", d => d.Bloomberg == "-" ? "white" : demScale(d.Bloomberg))


            legend.append("rect")
                .attr("x", 625)
                .attr("y", -30)
                .attr("width", 50)
                .attr("height", 50)
                .style("fill", d => d.Buttigieg == "-" ? "white" : demScale(d.Buttigieg))

            legend.append("rect")
                .attr("x", 675)
                .attr("y", -30)
                .attr("width", 50)
                .attr("height", 50)
                .style("fill", d => d.Klobuchar == "-" ? "white" : demScale(d.Klobuchar))

            legend.append("rect")
                .attr("x", 725)
                .attr("y", -30)
                .attr("width", 50)
                .attr("height", 50)
                .style("fill", d => d.Sanders == "-" ? "white" : demScale(d.Sanders))

            legend.append("rect")
                .attr("x", 775)
                .attr("y", -30)
                .attr("width", 50)
                .attr("height", 50)
                .style("fill", d => d.Steyer == "-" ? "white" : demScale(d.Steyer))

            legend.append("rect")
                .attr("x", 825)
                .attr("y", -30)
                .attr("width", 50)
                .attr("height", 50)
                .style("fill", d => d.Warren == "-" ? "white" : demScale(d.Warren))

            legend.append("rect")
                .attr("x", 875)
                .attr("y", -30)
                .attr("width", 50)
                .attr("height", 50)
                .style("fill", d => d.Yang == "-" ? "white" : demScale(d.Yang))

            legend.append("text")
                .attr("class", "legend-text")
                .attr("x", 550)
                .attr("y", 0)
                .style("fill", "Black")
                .style("font-size", 15)
                .attr("font-weight", 700)
                .text(d => d.Biden == "-" ? "-" : d.Biden + "%")
                .attr("text-anchor", "middle")
            legend.append("text")
                .attr("class", "legend-text")
                .attr("x", 600)
                .attr("y", 0)
                .style("fill", "Black")
                .style("font-size", 15)
                .attr("font-weight", 700)
                .text(d => d.Bloomberg == "-" ? "-" : d.Bloomberg + "%")
                .attr("text-anchor", "middle")

            legend.append("text")
                .attr("class", "legend-text")
                .attr("x", 650)
                .attr("y", 0)
                .style("fill", "Black")
                .style("font-size", 15)
                .attr("font-weight", 700)
                .text(d => d.Buttigieg == "-" ? "-" : d.Buttigieg + "%")
                .attr("text-anchor", "middle")
            legend.append("text")
                .attr("class", "legend-text")
                .attr("x", 700)
                .attr("y", 0)
                .style("fill", "Black")
                .style("font-size", 15)
                .attr("font-weight", 700)
                .text(d => d.Klobuchar == "-" ? "-" : d.Klobuchar + "%")
                .attr("text-anchor", "middle")
            legend.append("text")
                .attr("class", "legend-text")
                .attr("x", 750)
                .attr("y", 0)
                .style("fill", "Black")
                .style("font-size", 15)
                .attr("font-weight", 700)
                .text(d => d.Sanders == "-" ? "-" : d.Sanders + "%")
                .attr("text-anchor", "middle")
            legend.append("text")
                .attr("class", "legend-text")
                .attr("x", 800)
                .attr("y", 0)
                .style("fill", "Black")
                .style("font-size", 15)
                .attr("font-weight", 700)
                .text(d => d.Steyer == "-" ? "-" : d.Steyer + "%")
                .attr("text-anchor", "middle")
            legend.append("text")
                .attr("class", "legend-text")
                .attr("x", 850)
                .attr("y", 0)
                .style("fill", "Black")
                .style("font-size", 15)
                .attr("font-weight", 700)
                .text(d => d.Warren == "-" ? "-" : d.Warren + "%")
                .attr("text-anchor", "middle")
            legend.append("text")
                .attr("class", "legend-text")
                .attr("x", 900)
                .attr("y", 0)
                .style("fill", "Black")
                .style("font-size", 15)
                .attr("font-weight", 700)
                .text(d => d.Yang == "-" ? "-" : d.Yang + "%")
                .attr("text-anchor", "middle")



            svg.append("text")
                .attr("x", 00)
                .attr("y", 50)
                .style("fill", "Black")
                .style("font-size", 20)
                .attr("font-weight", 900)
                .text("Pollster")
                .attr("text-anchor", "start")


            svg.append("text")
                .attr("x", 300)
                .attr("y", 50)
                .style("fill", "Black")
                .style("font-size", 20)
                .attr("font-weight", 900)
                .text("Grade")
                .attr("text-anchor", "middle")

            svg.append("text")
                .attr("x", 400)
                .attr("y", 50)
                .style("fill", "Black")
                .style("font-size", 20)
                .attr("font-weight", 900)
                .text("Date")
                .attr("text-anchor", "middle")


            svg.append("text")
                .attr("x", 550)
                .attr("y", 40)
                .style("fill", "Black")
                .style("font-size", 12)
                .attr("font-weight", 500)
                .text("Biden")
                .attr("text-anchor", "middle")
            svg.append("text")
                .attr("x", 600)
                .attr("y", 40)
                .style("fill", "Black")
                .style("font-size", 12)
                .attr("font-weight", 500)
                .text("Bloomberg")
                .attr("text-anchor", "middle")


            svg.append("text")
                .attr("x", 650)
                .attr("y", 40)
                .style("fill", "Black")
                .style("font-size", 12)
                .attr("font-weight", 500)
                .text("Buttigieg")
                .attr("text-anchor", "middle")
            svg.append("text")
                .attr("x", 700)
                .attr("y", 40)
                .style("fill", "Black")
                .style("font-size", 12)
                .attr("font-weight", 500)
                .text("Klobuchar")
                .attr("text-anchor", "middle")
            svg.append("text")
                .attr("x", 750)
                .attr("y", 40)
                .style("fill", "Black")
                .style("font-size", 12)
                .attr("font-weight", 500)
                .text("Sanders")
                .attr("text-anchor", "middle")
            svg.append("text")
                .attr("x", 800)
                .attr("y", 40)
                .style("fill", "Black")
                .style("font-size", 12)
                .attr("font-weight", 500)
                .text("Steyer")
                .attr("text-anchor", "middle")
            svg.append("text")
                .attr("x", 850)
                .attr("y", 40)
                .style("fill", "Black")
                .style("font-size", 12)
                .attr("font-weight", 500)
                .text("Warren")
                .attr("text-anchor", "middle")
            svg.append("text")
                .attr("x", 900)
                .attr("y", 40)
                .style("fill", "Black")
                .style("font-size", 12)
                .attr("font-weight", 500)
                .text("Yang")
                .attr("text-anchor", "middle")
            legend.append("line")
                .attr("x1", 0)
                .attr("x2", 950)
                .attr("y1", 20)
                .attr("y2", 20)
                .attr("stroke-width", 1)
                .attr("stroke", "#E2E2E2")

            svg.append("line")
                .attr("x1", 0)
                .attr("x2", 950)
                .attr("y1", 60)
                .attr("y2", 60)
                .attr("stroke-width", 2)
                .attr("stroke", "black")

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
        })