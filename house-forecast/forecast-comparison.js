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
    {
        "forecast": "CNalysis",
        "link": "https://www.cnalysiscom.website/forecasts/2020-president-governor-senate-house-ratings",
        "type": "newcomer",
        "shorthand": "cnalysis",
        "label": "CNalysis"
    },
]
var windowWidth = window.innerWidth
var boxmap = d3.select("#boxmap").append("svg")
    .attr("viewBox", windowWidth > 600 ? "0 0 1310 750" : "0 0 1110 750")
    .append("g")
    .attr("transform", windowWidth > 600 ? "translate(100,50)" : "translate(00,50)")

var tool_tip = d3.tip()
    .offset([-200, -87.5])
    .html("<div id='tipDiv'></div>");

boxmap.call(tool_tip);

var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"])
var colorSpecial = d3.scaleLinear()
    .domain([0, 100])
    .range([-5, 105])
var colors = [color(100), color(0)]
var wf = d3.format(".0f")
var nf = d3.format(".1f")
var dp = d3.timeParse("%m/%d/%y")
var ratings_colors = [
    { rating: "Solid D", color: color(-5), rating_num: 0, opacity: 1 },
    { rating: "Likely D", color: color(15), rating_num: 15, opacity: 1 },
    { rating: "Lean D", color: color(30), rating_num: 30, opacity: 1 },
    { rating: "Tilt D", color: color(40), rating_num: 40, opacity: 1 },
    { rating: "Tossup", color: color(50), rating_num: 50, opacity: 1 },
    { rating: "Tilt R", color: color(60), rating_num: 60, opacity: 1 },
    { rating: "Lean R", color: color(70), rating_num: 70, opacity: 3 },
    { rating: "Likely R", color: color(85), rating_num: 85, opacity: 7 },
    { rating: "Solid R", color: color(105), rating_num: 100, opacity: 1 },
]
console.log(ratings_colors)
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
            cnalysis: d.cnalysis,
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
            var ratingType = typeof rating == "string" ? rating : rating > 90 ? "Solid R" : rating > 80 ? "Likely R" : rating > 60 ? "Lean R" : rating > 55 ? "Tilt R" : rating > 45 ? "Tossup" : rating > 40 ? "Tilt D" : rating > 20 ? "Lean D" : rating > 10 ? "Likely D" : "Solid D"
            ratingS.push({ state: d.state, seat: d.seat, district: d.id, rating: rating, ratingValue: ratingValue, ratingType: ratingType })
        })
        d.ratings = ratingS
    })
    forecasters.forEach((d, i) => {
        var ratingS = d.ratings
        var seats = []
        ratings.forEach((d, i) => {
            var rating = d
            var seatsN = ratingS.filter(d => d.ratingType == rating).length
            seats.push({ rating: rating, seats: seatsN })
        })
        seats.forEach((d, i) => {
            d.prevseats = i == 0 ? 0 : i == 1 ? seats[i - 1].seats : (seats[i - 1].seats + seats[i - 1].prevseats)
        })
        d.seats = seats
    })


    console.log(forecasters)
    update("jhk")
    function update(input) {
        var forecast = forecasters.filter(d => d.shorthand == input)[0]
        var forecastRatings = forecast.ratings
        var forecastSeats = forecast.seats
        var forecastMap = forecastRatings
        var gopSeats = d3.sum(forecastSeats.slice(5, 9), d => d.seats)
        var demSeats = d3.sum(forecastSeats.slice(0, 4), d => d.seats)
        var stateLabels = grid.filter(d => d.label != "")
        forecastMap.forEach((d, i) => {
            var district = d.district
            d.column = +grid.filter(d => d.district == district)[0].column
            d.row = +grid.filter(d => d.district == district)[0].row
        })
        console.log(demSeats)

        d3.selectAll(".change").remove()

        boxmap.append("line")
            .attr("class", "change")
            .attr("x1", d => (1110 / 435) * 217.5)
            .attr("x2", d => (1110 / 435) * 217.5)
            .attr("y1", 0)
            .attr("y2", 60)
            .attr("stroke", "gray")

        boxmap.selectAll("g")
            .data(forecastSeats)
            .enter()
            .append("rect")
            .attr("class", "change")
            .attr("x", d => (1110 / 435) * d.prevseats)
            .attr("y", 10)
            .attr("width", d => (1110 / 435) * d.seats)
            .attr("height", 40)
            .attr("fill", (d, i) => ratings_colors(d.rating))

        boxmap.selectAll("g")
            .data(forecastSeats)
            .enter()
            .append("text")
            .attr("class", "change")
            .text(d => d.seats > 5 ? d.seats : "")
            .attr("x", d => (1110 / 435) * d.prevseats + (((1110 / 435) * d.seats) / 2))
            .attr("y", 30)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")



        boxmap.append("text")
            .attr("class", "change")
            .text("Gop " + gopSeats)
            .attr("x", 1110)
            .attr("y", -5)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "end")
            .attr("font-size", 30)

        boxmap.append("text")
            .attr("class", "change")
            .text("DEM " + demSeats)
            .attr("x", 0)
            .attr("y", -5)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "start")
            .attr("font-size", 30)

        var pct = [50, 60, 70, 80, 90, 100]


        boxmap.selectAll("grid")
            .data(pct)
            .enter()
            .append("rect")
            .attr("class", "change")
            .attr("x", (d, i) => i * 20 + 900)
            .attr("y", (d, i) => 500)
            .attr("width", 20)
            .attr("height", 20)
            .attr("ry", 5)
            .attr("stroke", "white")
            .attr("fill", d => color(d))


        boxmap.selectAll("grid")
            .data(pct)
            .enter()
            .append("rect")
            .attr("class", "change")
            .attr("x", (d, i) => i * 20 + 900)
            .attr("y", (d, i) => 500)
            .attr("width", 20)
            .attr("height", 20)
            .attr("ry", 5)
            .attr("stroke", "white")
            .attr("fill", d => color(d))


        boxmap.append("rect")
            .attr("class", "change")
            .attr("x", 900)
            .attr("y", 570)
            .attr("width", 20)
            .attr("height", 20)
            .attr("ry", 5)
            .attr("stroke", "black")
            .attr("fill", "white")


        boxmap.append("text")
            .attr("class", "change")
            .text("Close Race")
            .attr("x", 900)
            .attr("y", 600)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "start")
            .attr("fill", "black")
            .style("font-family", "sf-mono")
            .attr("font-size", 15)

        boxmap.selectAll("grid")
            .data(pct)
            .enter()
            .append("rect")
            .attr("class", "change")
            .attr("x", (d, i) => i * 20 + 900)
            .attr("y", (d, i) => 520)
            .attr("width", 20)
            .attr("height", 20)
            .attr("ry", 5)
            .attr("stroke", "white")
            .attr("fill", d => color(100 - d))

        boxmap.selectAll("grid")
            .data(pct)
            .enter()
            .append("text")
            .attr("class", "change")
            .text(d => d)
            .attr("x", (d, i) => i * 20 + 910)
            .attr("y", (d, i) => 490)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .style("font-family", "sf-mono")
            .attr("font-size", 12)

        boxmap.append("text")
            .text("REP")
            .attr("class", "change")
            .attr("x", (d, i) => 1025)
            .attr("y", (d, i) => 510)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "start")
            .attr("fill", "black")
            .style("font-family", "sf-mono")
            .attr("font-size", 15)

        boxmap.append("text")
            .text("DEM")
            .attr("class", "change")
            .attr("x", (d, i) => 1025)
            .attr("y", (d, i) => 530)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "start")
            .attr("fill", "black")
            .style("font-family", "sf-mono")
            .attr("font-size", 15)



        boxmap.selectAll("grid")
            .data(forecastMap)
            .enter()
            .append("rect")
            .attr("class", "gridDistricts change")
            .attr("id", d => d.district + "grid")
            .attr("x", d => (d.column) * 20)
            .attr("y", d => (d.row) * 20)
            .attr("width", 20)
            .attr("height", 20)
            .attr("ry", 5)
            .attr("stroke", "white")
            .attr("fill", d => typeof d.rating == "number" ? color(d.rating) : colorsratings[ratings.indexOf(d.rating)])

        boxmap.selectAll("grid")
            .data(stateLabels)
            .enter()
            .append("text")
            .attr("class", "gridLabels change")
            .text(d => d.label)
            .attr("x", d => (+d.column) * 20 + 10)
            .attr("y", d => (+d.row) * 20 + 10)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .style("font-family", "sf-mono")
            .attr("font-size", 15)

        boxmap.selectAll("grid")
            .data(forecastMap)
            .enter()
            .append("rect")
            .attr("class", "statesover change")
            .attr("x", d => (+d.column) * 20)
            .attr("y", d => (+d.row) * 20)
            .attr("width", 20)
            .attr("height", 20)
            .attr("ry", 5)
            .attr("stroke", d => Math.abs(d.ratingValue - 50) < 30 ? "black" : "none")
            .attr("stroke-width", 1.5)
            .on("click", d => {
                var inputvalue = d.district
                console.log(inputvalue)
                window.location.replace("#district" + inputvalue)
                window.scrollBy(0, -100)
            })
            .on('mouseover', function (d) {




                d3.select(this)
                    .attr("stroke", "black")
                    .attr("opacity", 1)




                tool_tip.show().offset([-210, -87.5]);
                var tipSVG = d3.select("#tipDiv")
                    .append("svg")
                    .attr("width", 175)
                    .attr("height", 200)
                    ;
                tipSVG.append("rect")
                    .attr("y", 1.5)
                    .attr("x", 1.5)
                    .attr("width", 172)
                    .attr("height", 197)
                    .attr("rx", 8)
                    .attr("fill", "white")
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)



                tipSVG.append("text")
                    .text(d.state)
                    .attr("y", 20)
                    .attr("x", 87.5)
                    .attr("fill", "black")
                    .attr("font-weight", "500")
                    .style("font-size", "20")
                    .attr("text-anchor", "middle")

                tipSVG.append("text")
                    .text(ordinal(d.seat))
                    .attr("y", 40)
                    .attr("x", 87.5)
                    .attr("fill", "black")
                    .style("font-weight", "500")
                    .style("font-size", "15")
                    .attr("text-anchor", "middle")
                    .style("font-family", "sf-mono")

                tipSVG.append("image")
                    .attr("xlink:href", d.ratingValue == 50 ? "https://jhkforecasts.com/No%20one-01.png" : d.ratingValue > 50 ? "https://jhkforecasts.com/elephant-01.png" : "https://jhkforecasts.com/donkey-01.png")
                    .attr("x", 37.5)
                    .attr("y", 50)
                    .attr("width", 100)
                    .attr("height", 100)



                tipSVG.append("text")
                    .text(typeof d.rating == "number" ? "Win:" + nf(Math.abs(d.rating - 50) + 50) + "%" : d.rating)
                    .attr("y", 175)
                    .attr("x", 87.5)
                    .attr("fill", d.ratingValue == 50 ? "black" : d.ratingValue > 50 ? color(100) : color(0))
                    .attr("font-weight", "500")
                    .style("font-size", 20)
                    .attr("text-anchor", "middle")


            })

            .on('mouseout',
                function (d) {

                    d3.select(this)
                        .attr("stroke", d => Math.abs(d.ratingValue - 50) < 25 ? "black" : "none")
                    tool_tip.hide()


                });



    }


    var table = d3.select("#dataTable")
        .append("table")
        .attr("class", "sortable")
        .style("width", "100%")

    var header = table.append("thead").append("tr")
        .style("border-bottom", "black 1px solid")

    var demScale = d3.scaleLinear()
        .domain([0, 100])
        .range(["white", color(0)])

    var repScale = d3.scaleLinear()
        .domain([0, 100])
        .range(["white", color(100)])

    header.append("th")
        .attr("class", "backTop")
        .style("text-align", "left")
        .style("width", "30%")
        .append("a")
        .attr("href", "#finaldiv")
        .append("h1")
        .text("DISTRICT (BACK TO TOP)")
        .style("font-size", "1.5vw")
        .style("font-weight", 100)
        .style("font-family", "sf-mono")

    header.selectAll("h")
        .data(forecasters)
        .enter()
        .append("th")
        .attr("class", "hoverBox")
        .style("text-align", "center")
        .style("width", (60 / forecasters.length) + "%")
        .style("padding", "7px")
        .append("a")
        .attr("href", d => d.link)
        .append("h1")
        .attr("class", "hoverText")
        .text(d => d.forecast.toUpperCase())
        .style("font-size", "1.5vw")
        .style("font-weight", 100)
        .style("font-family", "sf-mono")

    var tbody = table.append("tbody")
    inputData.sort((a, b) => Math.abs(a.jhk - 50) - Math.abs(b.jhk - 50))
    inputData.forEach((d, i) => {
        var district = d.id
        tbody.append("tr")
            .attr("id", "district" + district)
            .style("border-bottom", "lightgray .01vw solid")

        d3.select("#" + "district" + district)
            .append("td")
            .style("text-align", "left")
            .style("width", "30%")
            .text(d.state.toUpperCase() + "  " + ordinal(d.seat).toUpperCase())
            .style("font-size", "1.5vw")
            .style("font-weight", 100)
            .style("font-family", "sf-mono")

        forecasters.forEach((id) => {
            var shorthand = id.shorthand
            d3.select("#" + "district" + district)
                .append("td")
                .style("text-align", "center")
                .style("width", (60 / forecasters.length) + "%")
                .style("background-color", typeof d[shorthand] == "number" ? color(colorSpecial(d[shorthand])) : colorsratings[ratings.indexOf(d[shorthand])])
                .text(typeof d[shorthand] == "number" ? wf(Math.abs(d[shorthand] - 50) + 50) : d[shorthand].split(" ")[0].toUpperCase())
                .style("font-size", "1.5vw")
                .style("font-weight", 100)
                .style("font-family", "sf-mono")
        })

    })

    var fct = d3.select("#fct").append("svg").attr("viewBox", "0 -50 1000 700")
    fct.append("text")
    .text("218")
    .attr("x", 500)
    .attr("y", 70)
    .attr("dominant-baseline", "central")
    .attr("text-anchor", "middle")
    .style("font-weight",100)

    forecasters.forEach((d, j) => {
        var forecast = d
        var forecastRatings = forecast.ratings
        var forecastSeats = forecast.seats
        var gopSeats = d3.sum(forecastSeats.slice(5, 9), d => d.seats)
        var demSeats = d3.sum(forecastSeats.slice(0, 4), d => d.seats)
        fct.append("line")
            .attr("x1", d => (1000 / 435) * 217.5)
            .attr("x2", d => (1000 / 435) * 217.5)
            .attr("y1", 10 + j * 100)
            .attr("y2", 60 + j * 100)
            .attr("stroke", "gray")

        fct.selectAll("g")
            .data(forecastSeats)
            .enter()
            .append("rect")
            .attr("x", d => (1000 / 435) * d.prevseats)
            .attr("y", 10 + j * 100)
            .attr("width", d => (1000 / 435) * d.seats)
            .attr("height", 40)
            .attr("fill", (d, i) => ratings_colors(d.rating))

        fct.selectAll("g")
            .data(forecastSeats)
            .enter()
            .append("text")
            .text(d => d.seats > 5 ? d.seats : "")
            .attr("x", d => (1000 / 435) * d.prevseats + (((1000 / 435) * d.seats) / 2))
            .attr("y", 30 + j * 100)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")



        fct.append("text")
            .text("Gop " + gopSeats)
            .attr("x", 1000)
            .attr("y", -5 + j * 100)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "end")
            .attr("font-size", 25)
            .style("font-weight",100)

            fct.append("text")
            .text(forecast.forecast)
            .attr("x", 500)
            .attr("y", -5 + j * 100)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "middle")
            .attr("font-size", 17)
            .style("font-weight",100)


        fct.append("text")
            .text("DEM " + demSeats)
            .attr("x", 0)
            .attr("y", -5 + j * 100)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "start")
            .attr("font-size", 25)
            .style("font-weight",100)

    })
    var selectbox = d3.select("#selectbox")
        .on("change", function () {
            update(this.value)
        })

    var searchBar = d3.select("#searchBar")
        .on("change", d => {
            var inputvalue = d3.select("#searchBar").property("value").toUpperCase()
            console.log(inputvalue)
            window.location.replace("#district" + inputvalue)
            window.scrollBy(0, -125)

        })



}

