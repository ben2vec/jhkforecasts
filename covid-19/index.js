var dateparse = d3.timeParse("Ydm")
//hey
d3.csv("http://covidtracking.com/api/states/daily.csv",data=>{
    console.log(data)
    data.forEach((d,i) => {
        d.date = new Date(d.date.slice(0,4),d.date.slice(4,6)-1,d.date.slice(6,8))
    })
    var current_data = []

})