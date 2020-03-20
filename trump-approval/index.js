var dateparse = d3.timeParse("%m/%d/%y")

var tformat = d3.timeFormat("%m/%d/%Y")
var dateparse = d3.timeParse("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
var numberformat = d3.format(".1f")
var updated_format = d3.timeFormat("%b. %d %Y %I:%M %p")


d3.csv("https://projects.fivethirtyeight.com/polls-page/president_approval_polls.csv", function (data) {
   console.log(data)
})