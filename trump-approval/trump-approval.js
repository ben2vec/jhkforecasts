var dateparse = d3.timeParse("%m/%d/%y")
var starting_day = new Date(2017, 0, 22)
var tformat = d3.timeFormat("%m/%d/%Y")
var dateparse = d3.timeParse("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
var numberformat = d3.format(".1f")
var updated_format = d3.timeFormat("%b. %d %Y %I:%M %p")
var time_scale = 86400000


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
   { Grade: "-", Value: .65 },
]
var pollster_grade_letter = grade_scale.map((d) => {
   return d.Grade
})

var pollster_grade_value = grade_scale.map((d) => {
   return d.Value
})

d3.csv("https://projects.fivethirtyeight.com/polls-page/president_approval_polls.csv", function (data) {


   data.forEach((d, i) => {
      d.grade = d.fte_grade == "" ? "-" : d.fte_grade
      d.grade_value = pollster_grade_value[pollster_grade_letter.indexOf(d.grade)]
      d.yes = +d.yes
      d.no = +d.no
      d.date = dateparse(d.end_date)
      d.n = +d.sample_size
      d.population_adj = d.population == "lv" ? 1.33 : d.population == "rv" ? 1 : .7
      d.population_adj = d.population == "lv" ? 1.33 : d.population == "rv" ? 1 : .7
      d.n_adjusted = d.n > 4000 ? Math.pow((d.n - 4000), .2) + 27 : Math.pow(d.n, .4)
      d.weight = d.n_adjusted * d.population_adj
      d.weight = Math.pow(d.weight, d.grade_value)
      return d
   })
   var today = d3.max(data,d=>d.date)
   var days = (today - starting_day) / time_scale
   var res = []

   for (let j = 0; j < days; j++) {
      var run_date = new Date(2017, 0, 22)
      run_date.setDate(run_date.getDate() + j)
      var polls = data.filter(d => d.date <= run_date)
      polls.forEach((d, i) => {
         d.days_old = (run_date - d.date) / time_scale
         d.weight = d.weight / (1 + (d.days_old / 20))
         return d
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
            d.yes_n = d.weight * d.yes
            d.no_n = d.weight * d.no
         })
         ps.push(f)
      }
      var psflat = ps.flat()

      var dta = {
         date: tformat(run_date),
         approve: d3.sum(psflat, d => d.yes_n)/d3.sum(psflat,d=>d.weight),
         disapprove: d3.sum(psflat, d => d.no_n)/d3.sum(psflat,d=>d.weight) ,
      }
      res.push(dta)
   }

   var data = res.flat()
   
})