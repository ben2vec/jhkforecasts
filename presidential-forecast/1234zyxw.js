var economic_index = 1
var incumbency_adv = 2
var national_third_party = 5
var election_date = new Date(2020, 10, 3)
var time_scale = 86400000
var simulations = 100000
var timeformat = d3.timeFormat("%m/%d/%y")
var updateformat = d3.timeFormat("%b. %d %Y %I:%M %p")
var dataformat = d3.format(".3f")
var fund_weight = 75
var experts_weight = 40
var polls_weight
var ss_weight = 15

var today = new Date()
var tformat = d3.timeFormat("%m/%d/%Y")
var dateparse = d3.timeParse("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
document.getElementById("sim").value = tformat(today)


update(d3.select('#sim').property('value'))
function update(input) {
	var array = input.split("/")
	var sim_month = array[0]
	var sim_day = array[1]
	var sim_year = array[2]

	var sim_date = new Date(sim_year, sim_month - 1, sim_day)

	var days_until_election = (election_date - sim_date) / time_scale
	var variance = 0.0000004 * Math.pow(days_until_election, 3) - .00021 * Math.pow(days_until_election, 2) + 0.034 * days_until_election + 2.1
	var exp = [
		{ rating: "Tossup", margin: 0 },
		{ rating: "Tilt R", margin: 3 },
		{ rating: "Lean R", margin: 5.4 },
		{ rating: "Likely R", margin: 13.0 },
		{ rating: "Solid R", margin: 20 },
		{ rating: "Tilt D", margin: -3 },
		{ rating: "Lean D", margin: -5.4 },
		{ rating: "Likely D", margin: -13.0 },
		{ rating: "Solid D", margin: -20 },
		{ rating: "", margin: 0 },
	]
	var exp_rating = exp.map((d) => {
		return d.rating
	})
	var exp_margin = exp.map((d) => {
		return d.margin
	})
	d3.csv("https://projects.jhkforecasts.com/presidential_forecast/ssindex.csv", state_similarity => {
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
			var ds = []
			d3.csv("https://projects.jhkforecasts.com/presidential_forecast/simdata.csv", data => {

				data[52].pvi = +data[52].pvi + 3
				var states = data.map(d => {
					return d.state
				})
				console.log(states)
				var experts_ratings = data.map((d, i) => {
					return {
						state: d.state,
						pvi: +d.pvi,
						sabato: d.sabato,
						cook: d.cook,
						inside: d.inside,
						bitecofer: d.bitecofer,
						politico: d.politico,
						bitecofer_margin: +d.bitecofer_margin
					}
				})
				experts_ratings.forEach((d, i) => {
					d.sabato_margin = d.sabato == "Solid R" ? Math.abs(exp_margin[exp_rating.indexOf(d.sabato)]) < Math.abs(d.pvi) ? d.pvi : exp_margin[exp_rating.indexOf(d.sabato)] : d.sabato == "Solid D" ? Math.abs(exp_margin[exp_rating.indexOf(d.sabato)]) < Math.abs(d.pvi) ? d.pvi : exp_margin[exp_rating.indexOf(d.sabato)] : exp_margin[exp_rating.indexOf(d.sabato)]

					d.cook_margin = d.cook == "Solid R" ? Math.abs(exp_margin[exp_rating.indexOf(d.cook)]) < Math.abs(d.pvi) ? d.pvi : exp_margin[exp_rating.indexOf(d.cook)] : d.cook == "Solid D" ? Math.abs(exp_margin[exp_rating.indexOf(d.cook)]) < Math.abs(d.pvi) ? d.pvi : exp_margin[exp_rating.indexOf(d.cook)] : exp_margin[exp_rating.indexOf(d.cook)]

					d.inside_margin = d.inside == "Solid R" ? Math.abs(exp_margin[exp_rating.indexOf(d.inside)]) < Math.abs(d.pvi) ? d.pvi : exp_margin[exp_rating.indexOf(d.inside)] : d.inside == "Solid D" ? Math.abs(exp_margin[exp_rating.indexOf(d.inside)]) < Math.abs(d.pvi) ? d.pvi : exp_margin[exp_rating.indexOf(d.inside)] : exp_margin[exp_rating.indexOf(d.inside)]

					d.politico_margin = d.politico == "Solid R" ? Math.abs(exp_margin[exp_rating.indexOf(d.politico)]) < Math.abs(d.pvi) ? d.pvi : exp_margin[exp_rating.indexOf(d.politico)] : d.politico == "Solid D" ? Math.abs(exp_margin[exp_rating.indexOf(d.politico)]) < Math.abs(d.pvi) ? d.pvi : exp_margin[exp_rating.indexOf(d.politico)] : exp_margin[exp_rating.indexOf(d.politico)]

					d.avg = (d.politico_margin + d.inside_margin + d.cook_margin + d.sabato_margin + d.bitecofer_margin) / 5
					d.third = +data[i].third_index * national_third_party
					d.gop = (100 - d.third) / 2 + (d.avg / 2)
					d.dem = (100 - d.third) / 2 - (d.avg / 2)
				})


				d3.csv("https://projects.fivethirtyeight.com/polls-page/president_polls.csv", polls => {
					var polls = polls.filter(d => d.answer != "Schultz")
					var polls = polls.filter(d => d.candidate_party != "LIB")

					polls.forEach((d, i) => {
						d.party_id = d.candidate_party == "DEM" ? 0 : 1
						return d;
					})
					polls.sort((a, b) => a.party_id - b.party_id)


					var pollsnew = d3.nest()
						.key(d => d.question_id)
						.entries(polls)

					var pollsnew = pollsnew.map((d, i) => {
						return d.values
					})

					var polls_new = pollsnew.map((d, i) => {
						return {
							question_id: +pollsnew[i][0].question_id,
							poll_id: +pollsnew[i][0].poll_id,
							state: pollsnew[i][0].state == "" ? "US" : pollsnew[i][0].state,
							pollster: pollsnew[i][0].pollster,
							pollster_id: +pollsnew[i][0].pollster_id,
							url: pollsnew[i][0].url,
							sponsors: pollsnew[i][0].sponsors,
							n: pollsnew[i][0].sample_size,
							date_raw: timeformat(dateparse(pollsnew[i][0].end_date)),
							date: dateparse(pollsnew[i][0].end_date),
							created: timeparse(pollsnew[i][0].created_at),
							population: pollsnew[i][0].population,
							grade: pollster_grade[pollster_names.indexOf(pollsnew[i][0].pollster)] == undefined ? "-" : pollster_grade[pollster_names.indexOf(pollsnew[i][0].pollster)],
							bias: pollster_bias[pollster_names.indexOf(pollsnew[i][0].pollster)] == undefined ? 0 : pollster_bias[pollster_names.indexOf(pollsnew[i][0].pollster)],
							dem: pollsnew[i][0].answer,
							gop: pollsnew[i][1].answer,
							dem_pct: +pollsnew[i][0].pct,
							gop_pct: +pollsnew[i][1].pct,
							poll_index: pollsnew[i][0].state == "" ? "US" + pollsnew[i][0].pollster : pollsnew[i][0].state + pollsnew[i][0].pollster,
							margin: +pollsnew[i][0].pct - +pollsnew[i][1].pct
						}
					})
					var polls_new = polls_new.filter(d => d.dem == "Biden")
					var polls_new = polls_new.filter(d => d.gop == "Trump")
					var us_polls = polls_new.filter(d => d.state == "US")
					var polls_new = polls_new.filter(d => d.date > new Date(2019, 6, 1))
					var polls_new = polls_new.filter(d => d.date < sim_date)



					var length_from_july_2019 = (sim_date - new Date(2019, 6, 1)) / time_scale
					//us trendline
					var us_trendline = []
					for (var b = 0; b < length_from_july_2019; b++) {

						var run_date = new Date(2019, 6, 1)
						run_date.setDate(run_date.getDate() + b);
						var polls = us_polls.filter(d => d.created <= run_date)
						polls.forEach((d, i) => {
							d.grade_value = pollster_grade_value[pollster_grade_letter.indexOf(d.grade)]
							d.population_adj = d.population == "lv" ? 1.33 : d.population == "rv" ? 1 : .7
							d.n_adjusted = d.n > 4000 ? Math.pow((d.n - 4000), .2) + 27 : Math.pow(d.n, .4)
							d.weight = d.n_adjusted * d.population_adj
							d.sum = (d.dem_pct + d.gop_pct)
							d.weight = Math.pow(d.weight, d.grade_value) * ((d.dem_pct + d.gop_pct) / 100)
							d.weight = d.weight / (1 + (((run_date - d.date) / time_scale) / 20))
							d.dem_adj = (d.dem_pct - (d.bias / 2)) + (d.population == "lv" ? 0 : -.5)
							d.gop_adj = (d.gop_pct + (d.bias / 2)) + (d.population == "lv" ? 0 : .5)
							d.margin = d.gop_adj - d.dem_adj
							return d;
						})
						var poll_filtered = d3.nest()
							.key(d => d.pollster_id)
							.entries(polls)
						var poll_filtered = poll_filtered.map(d => {
							return d.values
						})
						var ps = []
						for (c = 0; c < poll_filtered.length; c++) {
							var f = poll_filtered[c]
							f.sort((a, b) => b.weight - a.weight)
							f.forEach((d, i) => {
								d.weight = d.weight / Math.pow(i + 1, 3)
								d.margin_weight = d.margin * d.weight
							})
							ps.push(f)
						}
						var psflat = ps.flat()

						var us_avg = d3.sum(psflat, d => d.margin_weight) / d3.sum(psflat, d => d.weight)
						var ts = {
							date: timeformat(run_date),
							margin: us_avg
						}
						us_trendline.push(ts)
					}
					var usflat = us_trendline.flat()
					var us_index_date = usflat.map(d => {
						return d.date
					})
					var us_index_margin = usflat.map(d => {
						return d.margin
					})
					var current_us_poll_margin = us_index_margin[us_index_margin.length - 1]
					var pa = []
					for (let b = 0; b < states.length; b++) {
						var polls = polls_new.filter(d => d.state == states[b])
						polls.forEach((d, i) => {
							d.grade_value = pollster_grade_value[pollster_grade_letter.indexOf(d.grade)]
							d.population_adj = d.population == "lv" ? 1.33 : d.population == "rv" ? 1 : .7
							d.n_adjusted = d.n > 4000 ? Math.pow((d.n - 4000), .2) + 27 : Math.pow(d.n, .4)
							d.weight = d.n_adjusted * d.population_adj
							d.sum = (d.dem_pct + d.gop_pct)
							d.weight = Math.pow(d.weight, d.grade_value) * ((d.dem_pct + d.gop_pct) / 100)
							d.weight = d.weight / (1 + (((sim_date - d.date) / time_scale) / 20))
							d.change = current_us_poll_margin - us_index_margin[us_index_date.indexOf(d.date_raw)]
							d.dem_adj = (d.dem_pct - (d.bias / 2)) + (d.population == "lv" ? 0 : -1) + d.change / 2
							d.gop_adj = (d.gop_pct + (d.bias / 2)) + (d.population == "lv" ? 0 : 1) - d.change / 2
							d.margin = d.gop_adj - d.dem_adj
							return d;
						})
						var poll_filtered = d3.nest()
							.key(d => d.pollster_id)
							.entries(polls)
						var poll_filtered = poll_filtered.map(d => {
							return d.values
						})
						var ps = []
						for (c = 0; c < poll_filtered.length; c++) {
							var f = poll_filtered[c]
							f.sort((a, b) => b.weight - a.weight)
							f.forEach((d, i) => {
								d.weight = d.weight / Math.pow(i + 1, 3)
								d.margin_weight = d.margin * d.weight
								d.gop_weight = d.gop_adj * d.weight
								d.dem_weight = d.dem_adj * d.weight
							})
							ps.push(f)
						}
						var psflat = ps.flat()
						var gop_avg = d3.sum(psflat, d => d.gop_weight) / d3.sum(psflat, d => d.weight)
						var dem_avg = d3.sum(psflat, d => d.dem_weight) / d3.sum(psflat, d => d.weight)
						var third_avg = +data[b].third_index * national_third_party
						var total_left = 100 - gop_avg - dem_avg - third_avg
						var weight = d3.sum(psflat, d => d.weight)
						var sp = {
							state: states[b],
							margin: isNaN(gop_avg) == true ? 0 : gop_avg - dem_avg,
							gop: isNaN(gop_avg) == true ? 0 : gop_avg + total_left / 2,
							dem: isNaN(gop_avg) == true ? 0 : dem_avg + total_left / 2,
							third: isNaN(gop_avg) == true ? 0 : third_avg,
							weight: weight
						}
						pa.push(sp)
					}
					var state_poll_avg = pa.flat()

					var ssindexstate = state_poll_avg.map(d => {
						return d.state
					})
					var ssindexmargin = state_poll_avg.map(d => {
						return d.margin
					})

					var ss = []
					for (let b = 0; b < states.length; b++) {
						var scompare = state_similarity.filter(d => d.state == states[b])

						scompare.forEach((d, i) => {
							d.value = Math.pow(d.value, .4)
							d.polling_avg = ssindexmargin[ssindexstate.indexOf(d.state_comp)]
							d.ssinde = d.polling_avg == 0 ? "-" : d.polling_avg - d.comp_pvi
							d.ss = d.value * d.ssinde
							return d
						})
						var sumval = d3.sum(scompare, d => d.value)
						var sumss = d3.sum(scompare, d => d.ss)
						var ssraw = sumss / sumval
						var ssfinal = +data[b].pvi + ssraw
						var third = +data[b].third_index * national_third_party
						var ssindex = {
							state: states[b],
							index: ssfinal,
							third: third,
							gop: (100 - third) / 2 + (ssfinal / 2),
							dem: (100 - third) / 2 - (ssfinal / 2)
						}



						ss.push(ssindex)
					}


					var fund = data.map((d, i) => {
						return {
							state: d.state,
							index: +d.pvi + current_us_poll_margin + economic_index / 2 + incumbency_adv / 2,
							third: +d.third_index * national_third_party - economic_index / 2 - incumbency_adv / 2,

						}
					})
					fund.forEach((d, i) => {
						d.gop = (100 - d.third) / 2 + (d.index / 2)
						d.dem = (100 - d.third) / 2 - (d.index / 2)
						return d
					})




					var pv = []
					for (let b = 0; b < states.length; b++) {
						var f = fund[b]
						var p = state_poll_avg[b]
						var e = experts_ratings[b]
						var s = ss[b]
						var sum = fund_weight + p.weight + experts_weight + ss_weight
						var gop_raw = f.gop * fund_weight + p.gop * p.weight + e.gop * experts_weight + s.gop * ss_weight
						var datevariance = data[b].elasticity * variance

						var pvariance = p.weight > 400 ? 0 : .00005 * Math.pow(p.weight, 2) - 0.0121 * p.weight + 2.2645
						var dem_raw = f.dem * fund_weight + p.dem * p.weight + e.dem * experts_weight + s.dem * ss_weight
						var stdev = datevariance + pvariance
						var third_raw = f.third * fund_weight + p.third * p.weight + e.third * experts_weight + s.third * ss_weight
						var proj = {
							state: states[b],
							ev: +data[b].ev,
							elasticity: +data[b].elasticity,
							gop: gop_raw / sum,
							dem: dem_raw / sum,
							third: third_raw / sum,
							stdev: stdev,
							pct_vote: +data[b].pct_vote
						}
						proj.margin = proj.gop - proj.dem
						proj.gp = proj.gop * proj.pct_vote
						proj.dp = proj.dem * proj.pct_vote
						proj.tp = proj.third * proj.pct_vote
						pv.push(proj)
					}

					simres = []
					simnatres = []
					for (let s = 0; s < simulations; s++) {
						var goprand = Math.random()
						var demrand = Math.random()
						var thirdrand = Math.random()
						var sim = pv.map((d, j) => {
							return {
								state: d.state
							}
						})
						sim.forEach((d, i) => {
							d.ev = pv[i].ev
							d.gop_raw = jStat.normal.inv((goprand * 2 + Math.random()) / 3, pv[i].gop, Math.sqrt(2.2 * Math.pow(pv[i].stdev, 2)))
							d.dem_raw = jStat.normal.inv((demrand * 2 + Math.random()) / 3, pv[i].dem, Math.sqrt(2.2 * Math.pow(pv[i].stdev, 2)))
							d.third_raw = jStat.normal.inv((thirdrand * 2 + Math.random()) / 3, pv[i].third, pv[i].third / 2)
							d.tot = d.gop_raw + d.dem_raw + d.third_raw
							d.gop_sim = d.gop_raw / (d.tot / 100)
							d.dem_sim = d.dem_raw / (d.tot / 100)
							d.third_sim = d.third_raw / (d.tot / 100)
							d.margin_sim = d.gop_raw - d.dem_sim
							d.winner = d.margin_sim > 0 ? "gop" : "dem"
							d.gop_ev = d.winner == "gop" ? d.ev : 0
							d.dem_ev = d.winner == "dem" ? d.ev : 0
							return d
						})

						sim.sort((a, b) => a.margin_sim - b.margin_sim)

						sim.forEach(function (d, i) {
							d.index = i + 1
							d.indexev = d.index == 1 ? 0 : sim[i - 1].indexev + sim[i - 1].ev
							d.tippingpoint = d.indexev < 270 ? d.indexev + d.ev >= 270 ? 1 : 0 : 0
							return d;
						})

						var gop_ev = d3.sum(sim, d => d.gop_ev)
						var dem_ev = d3.sum(sim, d => d.dem_ev)
						var winner = gop_ev > 268 ? "gop" : "dem"
						var nat = {
							gop_ev: gop_ev,
							dem_ev: dem_ev,
							winner: winner
						}
						simres.push(sim)
						simnatres.push(nat)
					}

					var sim_results = simres.flat()
					var national_results = simnatres.flat()

					var gop_win1 = national_results.filter(d => d.winner == "gop").length * 100 / simulations
					var dem_win1 = national_results.filter(d => d.winner == "dem").length * 100 / simulations
					var third_win1 = 0
					var gop_vote1 = d3.sum(pv, d => d.gp)
					var dem_vote1 = d3.sum(pv, d => d.dp)
					var third_vote1 = d3.sum(pv, d => d.tp)
					var gop_ev1 = d3.mean(national_results, d => d.gop_ev)
					var dem_ev1 = d3.mean(national_results, d => d.dem_ev)
					var evstdev = d3.deviation(national_results, d => d.gop_ev)
					console.log(evstdev)
					var pr = []
					for (let b = 0; b < states.length; b++) {
						var stres = sim_results.filter(d => d.state == states[b])

						var forecast_date = timeformat(sim_date)
						var state = states[b]
						var ev = data[b].ev
						var gop_win = stres.filter(d => d.winner == "gop").length * 100 / simulations
						var dem_win = stres.filter(d => d.winner == "dem").length * 100 / simulations
						var third_win = stres.filter(d => d.winner == "third").length * 100 / simulations
						var gop_p10 = pv[b].gop - pv[b].stdev * 1.28
						var dem_p10 = pv[b].dem - pv[b].stdev * 1.28
						var third_p10 = pv[b].third - pv[b].third / 2 * 1.28
						var gop_vote = pv[b].gop
						var dem_vote = pv[b].dem
						var third_vote = pv[b].third
						var gop_p90 = pv[b].gop + pv[b].stdev * 1.28
						var dem_p90 = pv[b].dem + pv[b].stdev * 1.28
						var third_p90 = pv[b].third + pv[b].third / 2 * 1.28
						var tp = stres.filter(d => d.tippingpoint == 1).length * 100 / simulations
						var gpoll_avg = state_poll_avg[b].gop
						var dpoll_avg = state_poll_avg[b].dem
						var tpoll_avg = state_poll_avg[b].third
						var poll_weight = state_poll_avg[b].weight
						var gfund_avg = fund[b].gop
						var dfund_avg = fund[b].dem
						var tfund_avg = fund[b].third
						var gss_avg = ss[b].gop
						var dss_avg = ss[b].dem
						var tss_avg = ss[b].third
						var gexpert_avg = experts_ratings[b].gop
						var dexpert_avg = experts_ratings[b].dem
						var texpert_avg = experts_ratings[b].third



						var gop = [forecast_date, state, +ev, "gop", dataformat(gop_win), dataformat(gop_p10), dataformat(gop_vote), dataformat(gop_p90), dataformat(tp), dataformat(gpoll_avg), dataformat(gfund_avg), dataformat(gss_avg), dataformat(gexpert_avg), poll_weight, fund_weight, ss_weight, experts_weight]
						var dem = [forecast_date, state, +ev, "dem", dataformat(dem_win), dataformat(dem_p10), dataformat(dem_vote), dataformat(dem_p90), dataformat(tp), dataformat(dpoll_avg), dataformat(dfund_avg), dataformat(dss_avg), dataformat(dexpert_avg), poll_weight, fund_weight, ss_weight, experts_weight]
						var third = [forecast_date, state, +ev, "third", dataformat(third_win), dataformat(third_p10), dataformat(third_vote), dataformat(third_p90), dataformat(tp), dataformat(tpoll_avg), dataformat(tfund_avg), dataformat(tss_avg), dataformat(texpert_avg), poll_weight, fund_weight, ss_weight, experts_weight]
						pr.push(gop)
						pr.push(dem)
						pr.push(third)
					}
					var usgop = [timeformat(sim_date), "US", dataformat(gop_ev1), "gop", dataformat(gop_win1), dataformat(evstdev), dataformat(gop_vote1), , , , , , , , , , updateformat(today)]
					var usdem = [timeformat(sim_date), "US", dataformat(dem_ev1), "dem", dataformat(dem_win1),dataformat(evstdev) , dataformat(dem_vote1), , , , , , , , , , updateformat(today)]
					var usthird = [timeformat(sim_date), "US", 0, "third", dataformat(third_win1), , dataformat(third_vote1), , , , , , , , , , updateformat(today)]

					pr.push(usgop)
					pr.push(usdem)
					pr.push(usthird)
					var res = pr.join("</br>")
					document.getElementById("pr").innerHTML = res

					var inmonth = d3.select("#sim")
						.on("change", function () {
							update(this.value);

						})

				})
			})
		})
	})
}

