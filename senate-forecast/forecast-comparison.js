var forecasters = [
    {
        "forecaster": "JHK Forecasts",
        "type": "",
        "shorthand": "jhk",
        "link": "https://projects.jhkforecasts.com/senate-forecast/"
    },
    {
        "forecaster": "Bitecofer/Niskanen",
        "type": "newcomer",
        "shorthand": "bitecofer",
        "link": "https://www.niskanencenter.org/negative-partisanship-and-the-2020-congressional-elections/"
    },
    {
        "forecaster": "Cnalysis",
        "type": "newcomer",
        "shorthand": "cnalysis",
        "link": "https://www.cnalysiscom.website/forecasts/2020-president-governor-senate-house-ratings"
    },
    {
        "forecaster": "Cook Political Report",
        "type": "expert",
        "shorthand": "cook",
        "link": "https://www.cookpolitical.com/index.php/ratings/senate-race-ratings"
    },
    {
        "forecaster": "Inside Elections",
        "type": "expert",
        "shorthand": "inside",
        "link": "https://insideelections.com/ratings/senate"
    },
    {
        "forecaster": "Politico",
        "type": "expert",
        "shorthand": "politico",
        "link": "https://www.politico.com/2020-election/race-forecasts-and-predictions/senate/"
    },
    {
        "forecaster": "Lean Tossup",
        "type": "newcomer",
        "shorthand": "leanTossup",
        "link": "https://leantossup.ca/us-house/"
    }
]
var tformat = d3.timeFormat("%m/%d/%Y")
var timeformat = d3.timeFormat("%m/%d/%y")
var dateparse = d3.timeParse("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
var nf = d3.format(".1f")
var updated_format = d3.timeFormat("%b. %d %Y %I:%M %p")
var widthmap = 1020
var heightmap = 500;
var bubble_info = [{ "state": "Alabama", "abbrev": "AL", "radius": 16.43, "x": 413, "y": 332 }, { "state": "Alaska", "abbrev": "AK", "radius": 9.49, "x": 41, "y": 19 }, { "state": "Arizona", "abbrev": "AZ", "radius": 18.17, "x": 172, "y": 282 }, { "state": "Arkansas", "abbrev": "AR", "radius": 13.42, "x": 325, "y": 290 }, { "state": "California", "abbrev": "CA", "radius": 40.62, "x": 103, "y": 237 }, { "state": "Colorado", "abbrev": "CO", "radius": 16.43, "x": 224, "y": 249 }, { "state": "Connecticut", "abbrev": "CT", "radius": 14.49, "x": 586, "y": 128 }, { "state": "Delaware", "abbrev": "DE", "radius": 9.49, "x": 557, "y": 183 }, { "state": "District of Columbia", "abbrev": "DC", "radius": 9.49, "x": 536, "y": 193 }, { "state": "Florida", "abbrev": "FL", "radius": 29.5, "x": 483, "y": 380 }, { "state": "Georgia", "abbrev": "GA", "radius": 21.91, "x": 443, "y": 298 }, { "state": "Hawaii", "abbrev": "HI", "radius": 10.95, "x": 88, "y": 372 }, { "state": "Idaho", "abbrev": "ID", "radius": 10.95, "x": 188, "y": 173 }, { "state": "Illinois", "abbrev": "IL", "radius": 24.49, "x": 359, "y": 207 }, { "state": "Indiana", "abbrev": "IN", "radius": 18.17, "x": 413, "y": 207 }, { "state": "Iowa", "abbrev": "IA", "radius": 13.42, "x": 306, "y": 195 }, { "state": "Kansas", "abbrev": "KS", "radius": 13.42, "x": 266, "y": 248 }, { "state": "Kentucky", "abbrev": "KY", "radius": 15.49, "x": 411, "y": 251 }, { "state": "Louisiana", "abbrev": "LA", "radius": 15.49, "x": 326, "y": 335 }, { "state": "Maine", "abbrev": "ME", "radius": 7.75, "x": 628, "y": 26 }, { "state": "Maryland", "abbrev": "MD", "radius": 17.32, "x": 505, "y": 185 }, { "state": "Massachusetts", "abbrev": "MA", "radius": 18.17, "x": 607, "y": 89 }, { "state": "Michigan", "abbrev": "MI", "radius": 21.91, "x": 418, "y": 149 }, { "state": "Minnesota", "abbrev": "MN", "radius": 17.32, "x": 304, "y": 142 }, { "state": "Mississippi", "abbrev": "MS", "radius": 13.42, "x": 373, "y": 324 }, { "state": "Missouri", "abbrev": "MO", "radius": 17.32, "x": 329, "y": 251 }, { "state": "Montana", "abbrev": "MT", "radius": 9.49, "x": 206, "y": 131 }, { "state": "Nebraska", "abbrev": "NE", "radius": 7.75, "x": 258, "y": 209 }, { "state": "Nevada", "abbrev": "NV", "radius": 13.42, "x": 167, "y": 220 }, { "state": "New Hampshire", "abbrev": "NH", "radius": 10.95, "x": 612, "y": 54 }, { "state": "New Jersey", "abbrev": "NJ", "radius": 20.49, "x": 551, "y": 147 }, { "state": "New Mexico", "abbrev": "NM", "radius": 12.25, "x": 215, "y": 303 }, { "state": "New York", "abbrev": "NY", "radius": 29.5, "x": 548, "y": 81 }, { "state": "North Carolina", "abbrev": "NC", "radius": 21.21, "x": 499, "y": 278 }, { "state": "North Dakota", "abbrev": "ND", "radius": 9.49, "x": 257, "y": 136 }, { "state": "Ohio", "abbrev": "OH", "radius": 23.24, "x": 459, "y": 191 }, { "state": "Oklahoma", "abbrev": "OK", "radius": 14.49, "x": 270, "y": 294 }, { "state": "Oregon", "abbrev": "OR", "radius": 14.49, "x": 124, "y": 176 }, { "state": "Pennsylvania", "abbrev": "PA", "radius": 24.49, "x": 498, "y": 132 }, { "state": "Rhode Island", "abbrev": "RI", "radius": 10.95, "x": 619, "y": 126 }, { "state": "South Carolina", "abbrev": "SC", "radius": 16.43, "x": 487, "y": 322 }, { "state": "South Dakota", "abbrev": "SD", "radius": 9.49, "x": 257, "y": 167 }, { "state": "Tennessee", "abbrev": "TN", "radius": 18.17, "x": 379, "y": 284 }, { "state": "Texas", "abbrev": "TX", "radius": 33.76, "x": 271, "y": 355 }, { "state": "Utah", "abbrev": "UT", "radius": 13.42, "x": 204, "y": 218 }, { "state": "Vermont", "abbrev": "VT", "radius": 9.49, "x": 585, "y": 47 }, { "state": "Virginia", "abbrev": "VA", "radius": 19.75, "x": 508, "y": 229 }, { "state": "Washington", "abbrev": "WA", "radius": 18.97, "x": 154, "y": 131 }, { "state": "West Virginia", "abbrev": "WV", "radius": 12.25, "x": 451, "y": 242 }, { "state": "Wisconsin", "abbrev": "WI", "radius": 17.32, "x": 359, "y": 146 }, { "state": "Wyoming", "abbrev": "WY", "radius": 9.49, "x": 214, "y": 177 }, { "state": "Maine-1", "abbrev": 1, "radius": 5.48, "x": 612, "y": 26 }, { "state": "Maine-2", "abbrev": 2, "radius": 5.48, "x": 644, "y": 26 }, { "state": "Nebraska-1", "abbrev": 1, "radius": 5.48, "x": 242, "y": 209 }, { "state": "Nebraska-2", "abbrev": 2, "radius": 5.48, "x": 258, "y": 193 }, { "state": "Nebraska-3", "abbrev": 3, "radius": 5.48, "x": 274, "y": 209 }]
var map_states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934 }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400 }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801 }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387 }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 253.9219, demseats: 2 }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 245.5645 }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000, demseats: 2 }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000, demseats: 2 }, { "state": "District of Columbia", "label": "DC", "xValue": -1000, "yValue": -1000 }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154, demseats: 0 }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354 }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465, demseats: 2 }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155 }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 231.2954 }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 228.4214, demseats: 0 }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 202.6782 }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 259.1592 }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 264.9658 }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135 }, { "state": "Maine", "label": "ME", "xValue": 810.3105, "yValue": 109.855 }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000, demseats: 2 }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000 }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647 }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874 }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514 }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 261.123, demseats: 0 }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705 }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527 }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957, demseats: 2 }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000 }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210 }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035 }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 163.2588, demseats: 2 }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 284.5029 }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 117.3823, demseats: 0 }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 219.4883, demseats: 1 }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418 }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654 }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 200.856, demseats: 1 }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000 }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 315.6387 }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 163.5166 }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 295.8193 }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 374.2861 }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 234.978, demseats: 0 }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000, demseats: 2 }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 252.7842 }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762, demseats: 2 }, { "state": "West Virginia", "label": "WV", "xValue": 703, "yValue": 243 }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588, demseats: 1 }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 179.6255 }]
var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"]);
var ratingScale = [
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
var ratingTypes = ratingScale.map(d => { return d.rating })

d3.csv("https://data.jhkforecasts.com/2020-senate-input.csv", data => {
    var data = data.map((d, i) => {
        return {
            state: d.state,
            stateIndex: d.state_index,
            incumbentParty: d.inc_party,
            pvi: +d.pvi,
            bitecofer: d.bitecofer,
            cnalysis: d.cnalysis,
            cook: d.cook,
            inside: d.inside,
            politico: d.politico,
            sabato: d.sabato
        }
    })
    d3.csv("https://data.jhkforecasts.com/2020-senate.csv", jhk => {
        d3.csv("", jhk => {
        d3.csv("https://data.jhkforecasts.com/senate-candidates.csv", cands => {
            var today = jhk.slice(jhk.length - cands.length - 2, jhk.length)
            data.forEach((d, i) => {
                var stateIndex = d.stateIndex
                var stateData = today.filter(d => d.state_index == stateIndex)
                d.jhk = d3.sum(stateData.filter(d => d.party == "REP"), d => d.win)
            })

            var forecastRatings = []
            forecasters.forEach(id => {
                var forecastID = id.shorthand
                data.forEach((d, i) => {
                    var rating = d[forecastID]
                    var ratingValue = typeof rating == "number" ? rating : ratingScale[ratingTypes.indexOf(rating)]
                    forecastRatings.push({ forecast: forecastID, rating: rating, ratingValue: ratingValue })
                })
            })



            console.log(forecastRatings)
        })
    })
})