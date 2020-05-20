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
var boxmap = d3.select("#boxmap").append("svg")
    .attr("viewBox", "50 0 1210 650")
    .append("g")
    .attr("transform", "translate(100,-50)")

var tool_tip = d3.tip()
    .offset([-200, -87.5])
    .html("<div id='tipDiv'></div>");

boxmap.call(tool_tip);

var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"])

var colors = [color(100), color(0)]

var nf = d3.format(".1f")
var dp = d3.timeParse("%m/%d/%y")
var ratings_colors = [
    { rating: "Uncontested D", color: color(-5), rating_num: 0, opacity: 1 },
    { rating: "Solid D", color: color(-5), rating_num: 0, opacity: 1 },
    { rating: "Likely D", color: color(15), rating_num: 15, opacity: 1 },
    { rating: "Lean D", color: color(30), rating_num: 30, opacity: 1 },
    { rating: "Tilt D", color: color(40), rating_num: 40, opacity: 1 },
    { rating: "Tossup", color: color(50), rating_num: 50, opacity: 1 },
    { rating: "Tilt R", color: color(60), rating_num: 60, opacity: 1 },
    { rating: "Lean R", color: color(70), rating_num: 70, opacity: 3 },
    { rating: "Likely R", color: color(85), rating_num: 85, opacity: 7 },
    { rating: "Solid R", color: color(105), rating_num: 100, opacity: 1 },
    { rating: "Uncontested R", color: color(105), rating_num: 100, opacity: 1 },
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
            ratingS.push({ state: d.state, seat: d.seat, district: d.id, rating: rating, ratingValue: ratingValue })
        })
        d.ratings = ratingS
    })

    console.log(forecasters)
    update("jhk")
    function update(input) {
        var forecast = forecasters.filter(d => d.shorthand == input)[0]
        var forecastRatings = forecast.ratings
        console.log(grid)
        var forecastMap = forecastRatings
        var stateLabels = grid.filter(d => d.label != "")
        forecastMap.forEach((d, i) => {
            var district = d.district
            console.log(district)
            d.column = +grid.filter(d => d.district == district)[0].column
            d.row = +grid.filter(d => d.district == district)[0].row
        })
        console.log(forecastMap)

        boxmap.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 1000)
            .attr("height", 1000)
            .attr("ry", 5)
            .attr("stroke", "white")
            .attr("fill", "white")

        var pct = [50, 60, 70, 80, 90, 100]


        boxmap.selectAll("grid")
            .data(pct)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 20 + 900)
            .attr("y", (d, i) => 500)
            .attr("width", 20)
            .attr("height", 20)
            .attr("ry", 5)
            .attr("stroke", "white")
            .attr("fill", d => color(d))

        var pct = [50, 60, 70, 80, 90, 100]


        boxmap.selectAll("grid")
            .data(pct)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 20 + 900)
            .attr("y", (d, i) => 500)
            .attr("width", 20)
            .attr("height", 20)
            .attr("ry", 5)
            .attr("stroke", "white")
            .attr("fill", d => color(d))


        boxmap.append("rect")
            .attr("x", 900)
            .attr("y", 570)
            .attr("width", 20)
            .attr("height", 20)
            .attr("ry", 5)
            .attr("stroke", "black")
            .attr("fill", "white")

        boxmap.append("text")
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
            .attr("x", (d, i) => 1025)
            .attr("y", (d, i) => 510)
            .attr("dominant-baseline", "central")
            .attr("text-anchor", "start")
            .attr("fill", "black")
            .style("font-family", "sf-mono")
            .attr("font-size", 15)

        boxmap.append("text")
            .text("DEM")
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
            .attr("class", "gridDistricts")
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
            .attr("class", "gridLabels")
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
            .attr("class", "statesover")
            .attr("x", d => (+d.column) * 20)
            .attr("y", d => (+d.row) * 20)
            .attr("width", 20)
            .attr("height", 20)
            .attr("ry", 5)
            .attr("stroke", d => Math.abs(d.ratingValue - 50) < 25 ? "black" : "none")
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
        .attr("href","#dataTable")
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

    inputData.forEach((d, i) => {
        var district = d.id
        tbody.append("tr")
            .attr("id", "district" + district)

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
                .style("background-color", typeof d[shorthand] == "number" ? color(d[shorthand]) : colorsratings[ratings.indexOf(d[shorthand])])
                .text(typeof d[shorthand] == "number" ? nf(d[shorthand]) : d[shorthand].split(" ")[0].toUpperCase())
                .style("font-size", "1.5vw")
                .style("font-weight", 100)
                .style("font-family", "sf-mono")
        })

    })

    var selectbox = d3.select("#selectbox")
        .on("change", function () {
            update(this.value)
        })



}

