
var parseDate = d3.timeParse("%Y-%m-%d")



var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]

var color = d3.scaleOrdinal()
  .domain(category)
  .range(["#00C181", "#FF6060", "#a4b1b5", "#FFE130", "#FF8D32", "#0091FF", "#FF2EF0", "#AF0BFF", "#a4b1b5"])

d3.csv("http://www.leantossup.ca/US_DEM/Dem_Primary_Model_Results.", data =>{
console.log(data)
})
