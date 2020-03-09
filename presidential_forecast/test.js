var sim_month = 3
var economic_index = 1
var sim_day = 8
var sim_year = 2020
var national_third_party = 4
var sim_date = new Date(sim_year, sim_month - 1, sim_day)
var dateparse = d3.timeParse("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
var time_scale = 86400000
var simulations = 10000
var timeformat = d3.timeFormat("%m/%d/%y")
var wholeformat = d3.format(".1f")
var fund_weight = 75
var experts_weight = 40
var polls_weight
var ss_weight = 15
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
d3.csv("ssindex.csv", state_similarity => {
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
		d3.csv("simdata.csv", data => {


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
						index: +d.pvi + current_us_poll_margin,
						third: +d.third_index * national_third_party,

					}
				})
				fund.forEach((d, i) => {
					d.gop = (100 - d.third) / 2 + (d.index / 2)
					d.dem = (100 - d.third) / 2 - (d.index / 2)
					return d
				})

				console.log(fund)
				console.log(state_poll_avg)
				console.log(experts_ratings)
				console.log(ss)


				var pv = []
				for (let b = 0; b < states.length; b++) {
					var f = fund[b]
					var p = state_poll_avg[b]
					var e = experts_ratings[b]
					var s = ss[b]
					var sum =  fund_weight+p.weight+experts_weight
					var gop_raw = f.gop * fund_weight + p.gop * p.weight + e.gop * experts_weight + s.gop * ss_weight
					var gop = gop_raw/sum
					var dem_raw = f.dem * fund_weight + p.dem * p.weight + e.dem * experts_weight + s.dem * ss_weight
					
					var third_raw = f.third * fund_weight + p.third * p.weight + e.third * experts_weight + s.third * ss_weight
					console.log(gop)
				}
			})
		})
	})
})