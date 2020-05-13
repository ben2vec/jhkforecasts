var forecasters = [
    {
        "forecast": "JHK Forecasts",
        "link": "https://projects.jhkforecasts.com/presidential-forecast/",
        "type": "",
        "shorthand": "jhk",
        "label": "JHK"
    },
    {
        "forecast": "Cook Political",
        "link": "https://cookpolitical.com/analysis/national/national-politics/introducing-cook-political-reports-2020-electoral-college",
        "type": "expert",
        "shorthand": "cook",
        "label": "Cook"
    },
    {
        "forecast": "Inside Elections",
        "link": "https://insideelections.com/ratings/president",
        "type": "expert",
        "shorthand": "inside",
        "label": "Inside"
    },
    {
        "forecast": "Sabato's Crystal Ball",
        "link": "http://centerforpolitics.org/crystalball/2020-president/",
        "type": "expert",
        "shorthand": "sabato",
        "label": "Sabato"
    },
    {
        "forecast": "Lean Tossup",
        "link": "https://leantossup.ca/us-presidency/",
        "type": "newcomer",
        "shorthand": "leanTossup",
        "label": "Lean Tossup"
    },
]
var boxmap = d3.select("#boxmap").append("svg")
    .attr("viewBox", "50 0 1210 650")
    .append("g")
    .attr("transform", "translate(100,-50)")


var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"])

var colors = [color(100), color(0)]

var nf = d3.format(".1f")
var dp = d3.timeParse("%m/%d/%y")
var ratings_colors = [
    { rating: "Solid D", color: color(-5), rating_num: 0, opacity: 1 },
    { rating: "Likely D", color: color(15), rating_num: 10, opacity: 1 },
    { rating: "Lean D", color: color(30), rating_num: 25, opacity: 1 },
    { rating: "Tilt D", color: color(40), rating_num: 40, opacity: 1 },
    { rating: "Tossup", color: "white", rating_num: 50, opacity: 1 },
    { rating: "Tilt R", color: color(60), rating_num: 60, opacity: 1 },
    { rating: "Lean R", color: color(70), rating_num: 75, opacity: 3 },
    { rating: "Likely R", color: color(85), rating_num: 90, opacity: 7 },
    { rating: "Solid R", color: color(105), rating_num: 100, opacity: 1 },
]
var ratings = ratings_colors.map(d => {
    return d.rating
})

var colorsratings = ratings_colors.map(d => {
    return d.color
})
var ratingValueScale = ratings_colors.map(d => {
    return d.rating_num
})

var rating_opacity = ratings_colors.map(d => {
    return d.opacity
})

var ratings_colors = d3.scaleOrdinal()
    .domain(ratings)
    .range(colorsratings)
function ordinal(i) {

    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i == 0 ? "At-Large" : i + "th";
}
queue()
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-house-input.csv")
    .defer(d3.csv, "grid-map.csv")
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-house.csv")
    .defer(d3.csv, "https://raw.githubusercontent.com/robby500/US_Model_Data/master/CD_LT_Data.csv")
    .await(ready);

function ready(error, inputData, grid, data, leanTossup) {
    if (error) throw error;


    leanTossup.forEach((d, i) => {
        var district = d.state.split("-")
        var state = district[0]
        var seat = district[1] == "AL" ? "00" : district[1]
        d.district = state + seat
    })

    var inputData = inputData.map((d, i) => {
        return {
            state: d.state,
            seat: d.seat,
            id: d.id,
            cook: d.cook,
            sabato: d.sabato,
            inside: d.inside,
            incumbent: d.incumbentParty
        }
    })
    var jhk = data.slice(data.length - 436, data.length - 1)

    inputData.forEach((d, i) => {
        var id = d.id
        d.jhk = +jhk.filter(d => d.districtID == id)[0].repWin
        d.leanTossup = +leanTossup.filter(d => d.district == id)[0].gop_win
    })


    forecasters.forEach((d, i) => {
        var shorthand = d.shorthand
        var ratingS = []
        inputData.forEach((d, i) => {
            var rating = d[shorthand]
            var ratingValue = typeof rating == "number" ? rating : ratingValueScale[ratings.indexOf(rating)]
            ratingS.push({ state: d.state, seat: d.seat, rating: rating, ratingValue: ratingValue })
        })
        d.ratings = ratingS
    })
    console.log(forecasters)
}