var dateparse = d3.timeParse("%m/%d/%y")
var today = new Date()
var starting_day = new Date()
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
      d.days_old = (today - d.date) / time_scale
      d.n = +d.sample_size
      d.population_adj = d.population == "lv" ? 1.33 : d.population == "rv" ? 1 : .7
      d.population_adj = d.population == "lv" ? 1.33 : d.population == "rv" ? 1 : .7
      d.n_adjusted = d.n > 4000 ? Math.pow((d.n - 4000), .2) + 27 : Math.pow(d.n, .4)
      d.weight = d.n_adjusted * d.population_adj
      d.weight = Math.pow(d.weight, d.grade_value)
      d.weight = d.weight / (1 + (d.days_old / 20))
      return d
   })


   console.log(data[0])







})