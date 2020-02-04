var month = 2
var day = 3
var year = 2020

var simulation_date = new Date(year, month-1, day)

var time_data = []
//for (let z = 0; z < 58; j++) {
var simulation_date_filter = d3.utcDay.offset(simulation_date, 1)
var time_scale = 86400000
var parse_date = d3.timeParse("%m/%d/%y")
var parse_date_time = d3.timeParse("%m/%d/%y %H:%M")
formatMonth = d3.timeFormat("%m/%d/%y")
var candidates = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Gabbard", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]
var drop_out = ["", "", new Date(2020, 0, 13), "", "", "", "", "", ""]
var entrance = [new Date(2019, 0, 11), new Date(2020, 10, 0), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11),]


var states_info = [{ "state": "Alabama", "primary_date": "03/03/20", "total_delegates": 52, "voteperc": 0.010912609 }, { "state": "Alaska", "primary_date": "04/04/20", "total_delegates": 15, "voteperc": 0.001741926 }, { "state": "American Samoa", "primary_date": "03/03/20", "total_delegates": 6, "voteperc": 0 }, { "state": "Arizona", "primary_date": "03/17/20", "total_delegates": 67, "voteperc": 0.035812053 }, { "state": "Arkansas", "primary_date": "03/03/20", "total_delegates": 31, "voteperc": 0.005691453 }, { "state": "California", "primary_date": "03/03/20", "total_delegates": 416, "voteperc": 0.130939702 }, { "state": "Colorado", "primary_date": "03/03/20", "total_delegates": 67, "voteperc": 0.0200269 }, { "state": "Connecticut", "primary_date": "04/28/20", "total_delegates": 60, "voteperc": 0.013425937 }, { "state": "Delaware", "primary_date": "04/28/20", "total_delegates": 21, "voteperc": 0.003524164 }, { "state": "Democrats Abroad", "primary_date": "03/03/20", "total_delegates": 13, "voteperc": 0 }, { "state": "District of Columbia", "primary_date": "06/02/20", "total_delegates": 20, "voteperc": 0.004230589 }, { "state": "Florida", "primary_date": "03/17/20", "total_delegates": 219, "voteperc": 0.017368808 }, { "state": "Georgia", "primary_date": "03/24/20", "total_delegates": 105, "voteperc": 0.028090687 }, { "state": "Guam", "primary_date": "05/02/20", "total_delegates": 7, "voteperc": 0 }, { "state": "Hawaii", "primary_date": "04/04/20", "total_delegates": 24, "voteperc": 0.003992172 }, { "state": "Idaho", "primary_date": "03/10/20", "total_delegates": 20, "voteperc": 0.002838517 }, { "state": "Illinois", "primary_date": "03/17/20", "total_delegates": 155, "voteperc": 0.067385695 }, { "state": "Indiana", "primary_date": "05/05/20", "total_delegates": 82, "voteperc": 0.015453563 }, { "state": "Iowa", "primary_date": "02/03/20", "total_delegates": 41, "voteperc": 0.009777621 }, { "state": "Kansas", "primary_date": "05/02/20", "total_delegates": 39, "voteperc": 0.006387167 }, { "state": "Kentucky", "primary_date": "05/19/20", "total_delegates": 54, "voteperc": 0.009406437 }, { "state": "Louisiana", "primary_date": "04/04/20", "total_delegates": 54, "voteperc": 0.011669592 }, { "state": "Maine", "primary_date": "03/03/20", "total_delegates": 24, "voteperc": 0.005351022 }, { "state": "Maryland", "primary_date": "04/28/20", "total_delegates": 96, "voteperc": 0.025099718 }, { "state": "Massachusetts", "primary_date": "03/03/20", "total_delegates": 91, "voteperc": 0.029844265 }, { "state": "Michigan", "primary_date": "03/10/20", "total_delegates": 125, "voteperc": 0.033937434 }, { "state": "Minnesota", "primary_date": "03/03/20", "total_delegates": 75, "voteperc": 0.020458216 }, { "state": "Mississippi", "primary_date": "03/10/20", "total_delegates": 36, "voteperc": 0.00725662 }, { "state": "Missouri", "primary_date": "03/10/20", "total_delegates": 68, "voteperc": 0.016021101 }, { "state": "Montana", "primary_date": "06/02/20", "total_delegates": 19, "voteperc": 0.002658182 }, { "state": "Nebraska", "primary_date": "05/12/20", "total_delegates": 29, "voteperc": 0.004255479 }, { "state": "Nevada", "primary_date": "02/22/20", "total_delegates": 36, "voteperc": 0.008066284 }, { "state": "New Hampshire", "primary_date": "02/11/20", "total_delegates": 24, "voteperc": 0.005213273 }, { "state": "New Jersey", "primary_date": "06/02/20", "total_delegates": 126, "voteperc": 0.032134075 }, { "state": "New Mexico", "primary_date": "06/02/20", "total_delegates": 34, "voteperc": 0.005762354 }, { "state": "New York", "primary_date": "04/28/20", "total_delegates": 274, "voteperc": 0.068150785 }, { "state": "North Carolina", "primary_date": "03/03/20", "total_delegates": 110, "voteperc": 0.032747924 }, { "state": "North Dakota", "primary_date": "03/10/20", "total_delegates": 14, "voteperc": 0.001402438 }, { "state": "Northern Marianas", "primary_date": "03/14/20", "total_delegates": 6, "voteperc": 0 }, { "state": "Ohio", "primary_date": "03/17/20", "total_delegates": 136, "voteperc": 0.046231316 }, { "state": "Oklahoma", "primary_date": "03/03/20", "total_delegates": 37, "voteperc": 0.006287995 }, { "state": "Oregon", "primary_date": "05/19/20", "total_delegates": 61, "voteperc": 0.014989564 }, { "state": "Pennsylvania", "primary_date": "04/28/20", "total_delegates": 186, "voteperc": 0.043773886 }, { "state": "Puerto Rico", "primary_date": "03/29/20", "total_delegates": 51, "voteperc": 0.014958062 }, { "state": "Rhode Island", "primary_date": "04/28/20", "total_delegates": 26, "voteperc": 0.003777285 }, { "state": "South Carolina", "primary_date": "02/29/20", "total_delegates": 54, "voteperc": 0.012794722 }, { "state": "South Dakota", "primary_date": "06/02/20", "total_delegates": 16, "voteperc": 0.001756944 }, { "state": "Tennessee", "primary_date": "03/03/20", "total_delegates": 64, "voteperc": 0.01302391 }, { "state": "Texas", "primary_date": "03/03/20", "total_delegates": 228, "voteperc": 0.058005389 }, { "state": "Utah", "primary_date": "03/03/20", "total_delegates": 29, "voteperc": 0.004647081 }, { "state": "Vermont", "primary_date": "03/03/20", "total_delegates": 16, "voteperc": 0.002671106 }, { "state": "Virgin Islands", "primary_date": "06/06/20", "total_delegates": 7, "voteperc": 0 }, { "state": "Virginia", "primary_date": "03/03/20", "total_delegates": 99, "voteperc": 0.029638996 }, { "state": "Washington", "primary_date": "03/10/20", "total_delegates": 89, "voteperc": 0.026067684 }, { "state": "West Virginia", "primary_date": "05/12/20", "total_delegates": 28, "voteperc": 0.002823992 }, { "state": "Wisconsin", "primary_date": "04/07/20", "total_delegates": 84, "voteperc": 0.020680059 }, { "state": "Wyoming", "primary_date": "04/04/20", "total_delegates": 14, "voteperc": 0.000837248 }]
var states_demographic = [{"state":"Alabama","Biden":28.29,"Bloomberg":24.5,"Booker":24.29,"Buttigieg":12.17,"Klobuchar":18.78,"Sanders":14.78,"Steyer":21.26,"Warren":14.49,"Yang":18.45},{"state":"Alaska","Biden":26.94,"Bloomberg":20.55,"Booker":15.97,"Buttigieg":19.32,"Klobuchar":22.64,"Sanders":22.73,"Steyer":21.87,"Warren":20.29,"Yang":21.46},{"state":"American Samoa","Biden":20,"Bloomberg":20,"Booker":20,"Buttigieg":16,"Klobuchar":20,"Sanders":20,"Steyer":20,"Warren":18,"Yang":20},{"state":"Arizona","Biden":32.73,"Bloomberg":20.67,"Booker":17.36,"Buttigieg":17.64,"Klobuchar":21.56,"Sanders":21.52,"Steyer":21.05,"Warren":18.24,"Yang":20.81},{"state":"Arkansas","Biden":26.65,"Bloomberg":25.25,"Booker":21.14,"Buttigieg":15.26,"Klobuchar":21.77,"Sanders":15.74,"Steyer":20.81,"Warren":15.67,"Yang":19.05},{"state":"California","Biden":21.29,"Bloomberg":18.74,"Booker":18.49,"Buttigieg":13.77,"Klobuchar":18.95,"Sanders":22.28,"Steyer":20.53,"Warren":17.9,"Yang":22.63},{"state":"Colorado","Biden":17.17,"Bloomberg":19.81,"Booker":17.44,"Buttigieg":16.48,"Klobuchar":20.58,"Sanders":27.95,"Steyer":21.07,"Warren":18.44,"Yang":21.25},{"state":"Connecticut","Biden":17.99,"Bloomberg":22.58,"Booker":18.72,"Buttigieg":19.87,"Klobuchar":21.11,"Sanders":21.9,"Steyer":21.87,"Warren":21.33,"Yang":20.07},{"state":"Delaware","Biden":38.34,"Bloomberg":23,"Booker":18.79,"Buttigieg":20.17,"Klobuchar":21.37,"Sanders":21.47,"Steyer":21.79,"Warren":20.93,"Yang":19.89},{"state":"Democrats Abroad","Biden":20,"Bloomberg":20,"Booker":20,"Buttigieg":16,"Klobuchar":20,"Sanders":20,"Steyer":20,"Warren":18,"Yang":20},{"state":"District of Columbia","Biden":28.55,"Bloomberg":22.83,"Booker":26.2,"Buttigieg":8.98,"Klobuchar":16.02,"Sanders":15.52,"Steyer":21.5,"Warren":13.88,"Yang":18.46},{"state":"Florida","Biden":23,"Bloomberg":30,"Booker":21.7,"Buttigieg":13.07,"Klobuchar":20.23,"Sanders":15.83,"Steyer":20.35,"Warren":22.06,"Yang":19.4},{"state":"Georgia","Biden":28.05,"Bloomberg":24.3,"Booker":24.08,"Buttigieg":12.05,"Klobuchar":18.73,"Sanders":14.74,"Steyer":21.08,"Warren":14.49,"Yang":18.45},{"state":"Guam","Biden":20,"Bloomberg":20,"Booker":20,"Buttigieg":16,"Klobuchar":20,"Sanders":20,"Steyer":20,"Warren":18,"Yang":20},{"state":"Hawaii","Biden":15.37,"Bloomberg":18.63,"Booker":17.97,"Buttigieg":13.52,"Klobuchar":18.81,"Sanders":21.92,"Steyer":20.36,"Warren":18.32,"Yang":23.43},{"state":"Idaho","Biden":21.69,"Bloomberg":21.16,"Booker":16.44,"Buttigieg":19.14,"Klobuchar":22.65,"Sanders":31.55,"Steyer":21.33,"Warren":14.83,"Yang":20.67},{"state":"Illinois","Biden":19.96,"Bloomberg":20.23,"Booker":19.36,"Buttigieg":19.99,"Klobuchar":22.61,"Sanders":20.2,"Steyer":19.8,"Warren":17.99,"Yang":19.57},{"state":"Indiana","Biden":19.31,"Bloomberg":20.6,"Booker":18.19,"Buttigieg":26.33,"Klobuchar":23.68,"Sanders":21.01,"Steyer":19.86,"Warren":18.92,"Yang":20.01},{"state":"Iowa","Biden":18.52,"Bloomberg":21.14,"Booker":16.17,"Buttigieg":23.78,"Klobuchar":25.81,"Sanders":25,"Steyer":24.9,"Warren":19.89,"Yang":20.22},{"state":"Kansas","Biden":18.63,"Bloomberg":20.9,"Booker":16.39,"Buttigieg":23.3,"Klobuchar":25.5,"Sanders":26.49,"Steyer":19.89,"Warren":19.67,"Yang":20.1},{"state":"Kentucky","Biden":20.54,"Bloomberg":25.33,"Booker":19.81,"Buttigieg":16.8,"Klobuchar":22.89,"Sanders":24,"Steyer":21.21,"Warren":17.58,"Yang":20.13},{"state":"Louisiana","Biden":28.88,"Bloomberg":24.6,"Booker":25.08,"Buttigieg":11.44,"Klobuchar":18.17,"Sanders":14.71,"Steyer":21.2,"Warren":13.71,"Yang":18.25},{"state":"Maine","Biden":17.51,"Bloomberg":22.82,"Booker":17.48,"Buttigieg":21.17,"Klobuchar":22.4,"Sanders":22.2,"Steyer":21.85,"Warren":21.7,"Yang":20.24},{"state":"Maryland","Biden":25.41,"Bloomberg":22.24,"Booker":22.48,"Buttigieg":16.47,"Klobuchar":18.06,"Sanders":20.34,"Steyer":22.13,"Warren":19.13,"Yang":19.01},{"state":"Massachusetts","Biden":17.06,"Bloomberg":22.91,"Booker":17.4,"Buttigieg":21.12,"Klobuchar":22.23,"Sanders":22.43,"Steyer":21.71,"Warren":24.07,"Yang":20.67},{"state":"Michigan","Biden":19.6,"Bloomberg":20.87,"Booker":18.39,"Buttigieg":21.14,"Klobuchar":23.69,"Sanders":20.49,"Steyer":19.6,"Warren":18.17,"Yang":19.76},{"state":"Minnesota","Biden":18.57,"Bloomberg":20.76,"Booker":16.93,"Buttigieg":22.5,"Klobuchar":39.7,"Sanders":21.31,"Steyer":19.78,"Warren":19.57,"Yang":20.24},{"state":"Mississippi","Biden":29.8,"Bloomberg":24.39,"Booker":26.39,"Buttigieg":10.37,"Klobuchar":17.17,"Sanders":14.01,"Steyer":21.42,"Warren":13.14,"Yang":17.76},{"state":"Missouri","Biden":25.58,"Bloomberg":30.7,"Booker":20.27,"Buttigieg":15.48,"Klobuchar":21.74,"Sanders":16.59,"Steyer":20.93,"Warren":16.75,"Yang":19.73},{"state":"Montana","Biden":28.3,"Bloomberg":21.88,"Booker":16.83,"Buttigieg":19.7,"Klobuchar":23.17,"Sanders":21.58,"Steyer":21.53,"Warren":18.69,"Yang":20.88},{"state":"Nebraska","Biden":19.18,"Bloomberg":21.34,"Booker":16.94,"Buttigieg":23.29,"Klobuchar":25.34,"Sanders":25.89,"Steyer":19.88,"Warren":19.21,"Yang":19.92},{"state":"Nevada","Biden":23.4,"Bloomberg":19.45,"Booker":17.97,"Buttigieg":15.93,"Klobuchar":20.09,"Sanders":22.03,"Steyer":26.29,"Warren":18.34,"Yang":21.3},{"state":"New Hampshire","Biden":17.17,"Bloomberg":23.28,"Booker":16.96,"Buttigieg":21.92,"Klobuchar":22.84,"Sanders":22.47,"Steyer":26.82,"Warren":22.26,"Yang":20.54},{"state":"New Jersey","Biden":23.71,"Bloomberg":22.89,"Booker":24.59,"Buttigieg":19.26,"Klobuchar":20.6,"Sanders":21.39,"Steyer":21.81,"Warren":20.47,"Yang":19.85},{"state":"New Mexico","Biden":16.46,"Bloomberg":19.55,"Booker":16.97,"Buttigieg":16.3,"Klobuchar":20.68,"Sanders":22.02,"Steyer":20.68,"Warren":18.36,"Yang":21.76},{"state":"New York","Biden":28.31,"Bloomberg":32.07,"Booker":19.86,"Buttigieg":18.09,"Klobuchar":19.83,"Sanders":21.63,"Steyer":21.62,"Warren":20.33,"Yang":19.99},{"state":"North Carolina","Biden":26.81,"Bloomberg":25.15,"Booker":21.8,"Buttigieg":14.82,"Klobuchar":21.13,"Sanders":15.84,"Steyer":21.11,"Warren":15.99,"Yang":19.39},{"state":"North Dakota","Biden":18.94,"Bloomberg":21.5,"Booker":16.44,"Buttigieg":23.3,"Klobuchar":25.71,"Sanders":28.16,"Steyer":19.18,"Warren":18.37,"Yang":19.54},{"state":"Northern Marinas","Biden":20,"Bloomberg":20,"Booker":20,"Buttigieg":16,"Klobuchar":20,"Sanders":20,"Steyer":20,"Warren":18,"Yang":20},{"state":"Ohio","Biden":19.39,"Bloomberg":20.44,"Booker":17.69,"Buttigieg":21.19,"Klobuchar":23.55,"Sanders":19.88,"Steyer":19.27,"Warren":17.86,"Yang":18.85},{"state":"Oklahoma","Biden":17.15,"Bloomberg":25.16,"Booker":19.47,"Buttigieg":15.83,"Klobuchar":22.53,"Sanders":27.73,"Steyer":20.04,"Warren":15.75,"Yang":19.49},{"state":"Oregon","Biden":21.88,"Bloomberg":20.27,"Booker":16.25,"Buttigieg":18.34,"Klobuchar":21.74,"Sanders":22.6,"Steyer":21.47,"Warren":19.59,"Yang":21.28},{"state":"Pennsylvania","Biden":24.5,"Bloomberg":20.35,"Booker":18.29,"Buttigieg":21.07,"Klobuchar":23.65,"Sanders":20.58,"Steyer":19.8,"Warren":18.55,"Yang":19.65},{"state":"Puerto Rico","Biden":20,"Bloomberg":20,"Booker":20,"Buttigieg":16,"Klobuchar":20,"Sanders":20,"Steyer":20,"Warren":18,"Yang":20},{"state":"Rhode Island","Biden":17.7,"Bloomberg":23.08,"Booker":18.13,"Buttigieg":20.52,"Klobuchar":21.68,"Sanders":21.74,"Steyer":21.58,"Warren":21.2,"Yang":20.25},{"state":"South Carolina","Biden":26.12,"Bloomberg":24.44,"Booker":25.12,"Buttigieg":11.54,"Klobuchar":18.25,"Sanders":14.43,"Steyer":26.38,"Warren":13.88,"Yang":17.89},{"state":"South Dakota","Biden":18.58,"Bloomberg":21.11,"Booker":16.39,"Buttigieg":22.94,"Klobuchar":25.26,"Sanders":24.79,"Steyer":19.32,"Warren":18.77,"Yang":19.93},{"state":"Tennessee","Biden":26.96,"Bloomberg":25.21,"Booker":21.93,"Buttigieg":15.06,"Klobuchar":21.29,"Sanders":16.17,"Steyer":21.42,"Warren":16.42,"Yang":19.55},{"state":"Texas","Biden":25,"Bloomberg":23.2,"Booker":21.28,"Buttigieg":12.21,"Klobuchar":19.92,"Sanders":19,"Steyer":19.95,"Warren":20.38,"Yang":20.34},{"state":"Utah","Biden":17.77,"Bloomberg":21.47,"Booker":16.63,"Buttigieg":19.36,"Klobuchar":22.39,"Sanders":25.35,"Steyer":21.65,"Warren":19.32,"Yang":21.07},{"state":"Vermont","Biden":17.11,"Bloomberg":23.35,"Booker":16.74,"Buttigieg":22.56,"Klobuchar":23.19,"Sanders":62.41,"Steyer":22.06,"Warren":22.84,"Yang":20.53},{"state":"Virgin Islands","Biden":20,"Bloomberg":20,"Booker":20,"Buttigieg":16,"Klobuchar":20,"Sanders":20,"Steyer":20,"Warren":18,"Yang":20},{"state":"Virginia","Biden":25.61,"Bloomberg":24.35,"Booker":20.94,"Buttigieg":14.52,"Klobuchar":23.84,"Sanders":24.36,"Steyer":20.86,"Warren":19.46,"Yang":20.77},{"state":"Washington","Biden":16.73,"Bloomberg":20.07,"Booker":16.21,"Buttigieg":18.23,"Klobuchar":21.64,"Sanders":22.76,"Steyer":21.53,"Warren":19.8,"Yang":21.34},{"state":"West Virginia","Biden":25.05,"Bloomberg":25.85,"Booker":18.19,"Buttigieg":17.96,"Klobuchar":24.22,"Sanders":28.6,"Steyer":20.38,"Warren":10.73,"Yang":19.59},{"state":"Wisconsin","Biden":18.66,"Bloomberg":20.88,"Booker":16.95,"Buttigieg":22.56,"Klobuchar":24.76,"Sanders":21.21,"Steyer":19.74,"Warren":19.45,"Yang":20.2},{"state":"Wyoming","Biden":27.94,"Bloomberg":21.5,"Booker":16.44,"Buttigieg":19.3,"Klobuchar":22.71,"Sanders":27.16,"Steyer":21.18,"Warren":18.37,"Yang":20.54}]

var pollster_grade = [
    { Grade: "A+", Value: 1.4 },
    { Grade: "A", Value: 1.25 },
    { Grade: "A-", Value: 1.1 },
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

var pollster_grade_letter = pollster_grade.map((d) => {
    return d.Grade
})

var pollster_grade_value = pollster_grade.map((d) => {
    return d.Value
})



var candidate_campaign_dates = candidates.map(function (d, i) {
    return {
        candidate: d,
        date: drop_out[i],
        entrance: entrance[i]
    };
});

candidate_campaign_dates.join()

d3.csv("https://projects.fivethirtyeight.com/polls-page/president_primary_polls.csv", function (data) {
    var data = data.filter(d => d.party == "DEM")
    var usdata = data.filter(d => d.state == "")

    //uspolls


    var us_polling_time = []


    var calc_date = new Date(2018, 10, 7)


    var no_days = ((simulation_date - calc_date) / time_scale)
    var date_index_us = []
    for (let l = 0; l <= no_days; l++) {

        var calc_date_new = d3.utcDay.offset(calc_date, l)

        var us_data = usdata.filter(d => parse_date(d.end_date) < calc_date_new)

        var data_nested_us = d3.nest()
            .key(d => d.question_id)
            .entries(us_data)



        var polls_raw_us = []

        for (let i = 0; i < data_nested_us.length; i++) {
            var poll_response = []
            var cands_polled = []
            for (let j = 0; j < candidates.length; j++) {

                var poll_candidate = data_nested_us[i].values.filter(d => d.answer == candidates[j])


                var poll_answer = poll_candidate.map((d) => {
                    return +d.pct
                })
                var cands_in_polled = data_nested_us[i].values.length
                poll_response.push(poll_answer)

                cands_polled.push(cands_in_polled)
            }

            var new_poll = {
                question_id: +data_nested_us[i].values[0].question_id,
                poll_id: +data_nested_us[i].values[0].poll_id,
                state: data_nested_us[i].values[0].state == "" ? "US" : data_nested_us[i].values[0].state,
                pollster_id: +data_nested_us[i].values[0].pollster_id.replace(","),
                pollster: data_nested_us[i].values[0].pollster,
                sponsor_ids: +data_nested_us[i].values[0].sponsor_ids,
                sponsors: data_nested_us[i].values[0].sponsors,
                display_name: data_nested_us[i].values[0].display_name,
                pollster_rating_id: +data_nested_us[i].values[0].pollster_rating_id,
                pollster_rating_name: data_nested_us[i].values[0].pollster_rating_name,
                grade: data_nested_us[i].values[0].fte_grade,
                n: +data_nested_us[i].values[0].sample_size,
                population: data_nested_us[i].values[0].population,
                start_date: parse_date(data_nested_us[i].values[0].start_date),
                end_date: parse_date(data_nested_us[i].values[0].start_date),
                created_at: parse_date_time(data_nested_us[i].values[0].created_at),
                url: data_nested_us[i].values[0].url,
                Biden: +poll_response[0] == "" ? "n/a" : +poll_response[0],
                Bloomberg: +poll_response[1] == "" ? "n/a" : +poll_response[1],
                Booker: +poll_response[2] == "" ? "n/a" : +poll_response[2],
                Buttigieg: +poll_response[3] == "" ? "n/a" : +poll_response[3],
                Klobuchar: +poll_response[5] == "" ? "n/a" : +poll_response[5],
                Sanders: +poll_response[6] == "" ? "n/a" : +poll_response[6],
                Steyer: +poll_response[7] == "" ? "n/a" : +poll_response[7],
                Warren: +poll_response[8] == "" ? "n/a" : +poll_response[8],
                Yang: +poll_response[9] == "" ? "n/a" : +poll_response[9],
                total: d3.sum(data_nested_us[i].values, d => d.pct),
                population_adj: data_nested_us[i].values[0].population == "lv" ? 1.33 : data_nested_us[i].values[0].population == "rv" ? 1 : .7,
                candidates_polled: +cands_polled[0],
                grade_value: pollster_grade_value[pollster_grade_letter.indexOf(data_nested_us[i].values[0].fte_grade)]
            }
            polls_raw_us.push(new_poll)
        }

        polls_raw_us.forEach(function (d) {
            d.n_adjusted = d.n > 4000 ? Math.pow((d.n - 4000), .2) + 27 : Math.pow(d.n, .4);
            d.weight = d.n_adjusted * d.population_adj
            d.candidates_weight = d.candidates_polled >= 8 ? 1 : d.candidates_polled < 5 ? 0 : d.candidates_polled * .1 + .2
            d.weight = d.weight * d.candidates_weight
            d.weight = Math.pow(d.weight, d.grade_value)
            d.time_weighted_weight = d.weight / (1 + (((calc_date_new - d.end_date) / time_scale) / 20))
            d.poll_index = d.pollster + d.state
            return d;
        })



        var polls_nested_by_poll_id_us = d3.nest()
            .key(d => d.poll_id)
            .entries(polls_raw_us)

        var polls_filtered_us = []
        for (let i = 0; i < polls_nested_by_poll_id_us.length; i++) {

            var unique_poll_id = polls_nested_by_poll_id_us[i].values



            unique_poll_id.sort((a, b) => b.weight - a.weight)
            var best_poll = unique_poll_id[0]

            polls_filtered_us.push(best_poll)
        }


        var polls_nested_by_same_pollster_us = d3.nest()
            .key(d => d.poll_index)
            .entries(polls_filtered_us)

        var newest_polls_us = []


        for (let i = 0; i < polls_nested_by_same_pollster_us.length; i++) {

            var unique_poll_id = polls_nested_by_same_pollster_us[i].values

            unique_poll_id.forEach(function (d, i) {
                d.newest_poll = i + 1
                return d;
            })

            unique_poll_id.sort((a, b) => b.end_date - a.end_date)



            for (let j = 0; j < unique_poll_id.length; j++) {
                var indivual_poll = unique_poll_id[j]
                newest_polls_us.push(indivual_poll)
            }

        }

        newest_polls_us.forEach(function (d) {
            d.time_weighted_weight = d.time_weighted_weight / Math.pow(d.newest_poll, 3)
            return d;
        })

        newest_polls_us.forEach(function (d) {
            d.Biden_adj = isNaN(d.Biden * 95 / d.total) == true ? "n/a" : d.Biden * 95 / d.total * d.time_weighted_weight / 100
            d.Bloomberg_adj = isNaN(d.Bloomberg * 95 / d.total) == true ? "n/a" : d.Bloomberg * 95 / d.total * d.time_weighted_weight / 100
            d.Booker_adj = isNaN(d.Booker * 95 / d.total) == true ? "n/a" : d.Booker * 95 / d.total * d.time_weighted_weight / 100
            d.Buttigieg_adj = isNaN(d.Buttigieg * 95 / d.total) == true ? "n/a" : d.Buttigieg * 95 / d.total * d.time_weighted_weight / 100

            d.Klobuchar_adj = isNaN(d.Klobuchar * 95 / d.total) == true ? "n/a" : d.Klobuchar * 95 / d.total * d.time_weighted_weight / 100
            d.Sanders_adj = isNaN(d.Sanders * 95 / d.total) == true ? "n/a" : d.Sanders * 95 / d.total * d.time_weighted_weight / 100
            d.Steyer_adj = isNaN(d.Steyer * 95 / d.total) == true ? "n/a" : d.Steyer * 95 / d.total * d.time_weighted_weight / 100
            d.Warren_adj = isNaN(d.Warren * 95 / d.total) == true ? "n/a" : d.Warren * 95 / d.total * d.time_weighted_weight / 100
            d.Yang_adj = isNaN(d.Yang * 95 / d.total) == true ? "n/a" : d.Yang * 95 / d.total * d.time_weighted_weight / 100
            return d;
        })


        var res = {
            state: "US",
            polls: newest_polls_us
        }

        var k = {
            Biden: d3.sum(res.polls, d => d.Biden_adj),
            Biden_tot: d3.sum(res.polls.filter(d => d.Biden_adj != "n/a"), d => d.time_weighted_weight),
            Bloomberg: d3.sum(res.polls, d => d.Bloomberg_adj),
            Bloomberg_tot: d3.sum(res.polls.filter(d => d.Bloomberg_adj != "n/a"), d => d.time_weighted_weight),
            Booker: d3.sum(res.polls, d => d.Booker_adj),
            Booker_tot: d3.sum(res.polls.filter(d => d.Booker_adj != "n/a"), d => d.time_weighted_weight),
            Buttigieg: d3.sum(res.polls, d => d.Buttigieg_adj),
            Buttigieg_tot: d3.sum(res.polls.filter(d => d.Buttigieg_adj != "n/a"), d => d.time_weighted_weight),
            Klobuchar: d3.sum(res.polls, d => d.Klobuchar_adj),
            Klobuchar_tot: d3.sum(res.polls.filter(d => d.Klobuchar_adj != "n/a"), d => d.time_weighted_weight),
            Sanders: d3.sum(res.polls, d => d.Sanders_adj),
            Sanders_tot: d3.sum(res.polls.filter(d => d.Sanders_adj != "n/a"), d => d.time_weighted_weight),
            Steyer: d3.sum(res.polls, d => d.Steyer_adj),
            Steyer_tot: d3.sum(res.polls.filter(d => d.Steyer_adj != "n/a"), d => d.time_weighted_weight),
            Warren: d3.sum(res.polls, d => d.Warren_adj),
            Warren_tot: d3.sum(res.polls.filter(d => d.Warren_tot != "n/a"), d => d.time_weighted_weight),
            Yang: d3.sum(res.polls, d => d.Yang_adj),
            Yang_tot: d3.sum(res.polls.filter(d => d.Yang_adj != "n/a"), d => d.time_weighted_weight)
        }

        var averages = {
            date: calc_date_new,
            Biden: k.Biden / k.Biden_tot,
            Bloomberg: k.Bloomberg / k.Bloomberg_tot,
            Booker: k.Booker / k.Booker_tot,
            Buttigieg: k.Buttigieg / k.Buttigieg_tot,
            Gabbard: k.Gabbard / k.Gabbard_tot,
            Klobuchar: k.Klobuchar / k.Klobuchar_tot,
            Sanders: k.Sanders / k.Sanders_tot,
            Steyer: k.Steyer / k.Steyer_tot,
            Warren: k.Warren / k.Warren_tot,
            Yang: k.Yang / k.Yang_tot
        }


        var dates = formatMonth(calc_date_new)

        us_polling_time.push(averages)
        date_index_us.push(dates)



    }

    us_polling_time.forEach(function (d) {
        d.biden = us_polling_time[us_polling_time.length - 1].Biden - d.Biden
        d.bloomberg = us_polling_time[us_polling_time.length - 1].Bloomberg - d.Bloomberg
        d.booker = us_polling_time[us_polling_time.length - 1].Booker - d.Booker
        d.buttigieg = us_polling_time[us_polling_time.length - 1].Buttigieg - d.Buttigieg
        d.klobuchar = us_polling_time[us_polling_time.length - 1].Klobuchar - d.Klobuchar
        d.sanders = us_polling_time[us_polling_time.length - 1].Sanders - d.Sanders
        d.steyer = us_polling_time[us_polling_time.length - 1].Steyer - d.Steyer
        d.warren = us_polling_time[us_polling_time.length - 1].Warren - d.Warren
        d.yang = us_polling_time[us_polling_time.length - 1].Yang - d.Yang

    })

    var us_biden = us_polling_time.map((d, i) => {
        return d.biden
    })

    var us_bloomberg = us_polling_time.map((d, i) => {
        return d.bloomberg
    })

    var us_booker = us_polling_time.map((d, i) => {
        return d.booker
    })

    var us_buttigieg = us_polling_time.map((d, i) => {
        return d.buttigieg
    })



    var us_klobuchar = us_polling_time.map((d, i) => {
        return d.klobuchar
    })

    var us_sanders = us_polling_time.map((d, i) => {
        return d.sanders
    })

    var us_steyer = us_polling_time.map((d, i) => {
        return d.steyer
    })

    var us_warren = us_polling_time.map((d, i) => {
        return d.warren
    })

    var us_yang = us_polling_time.map((d, i) => {
        return d.yang
    })

    var us_polling_average = us_polling_time[us_polling_time.length - 1]






    //states polled
    var data = data.filter(d => parse_date_time(d.created_at) < simulation_date_filter)

    var data_nested = d3.nest()
        .key(d => d.question_id)
        .entries(data)

    var polls_raw = []

    for (let i = 0; i < data_nested.length; i++) {
        var poll_response = []
        var cands_polled = []
        for (let j = 0; j < candidates.length; j++) {

            var poll_candidate = data_nested[i].values.filter(d => d.answer == candidates[j])


            var poll_answer = poll_candidate.map((d) => {
                return +d.pct
            })
            var cands_in_polled = data_nested[i].values.length
            poll_response.push(poll_answer)

            cands_polled.push(cands_in_polled)
        }

        var new_poll = {
            question_id: +data_nested[i].values[0].question_id,
            poll_id: +data_nested[i].values[0].poll_id,
            state: data_nested[i].values[0].state == "" ? "US" : data_nested[i].values[0].state,
            pollster_id: +data_nested[i].values[0].pollster_id.replace(","),
            pollster: data_nested[i].values[0].pollster,
            sponsor_ids: +data_nested[i].values[0].sponsor_ids,
            sponsors: data_nested[i].values[0].sponsors,
            display_name: data_nested[i].values[0].display_name,
            pollster_rating_id: +data_nested[i].values[0].pollster_rating_id,
            pollster_rating_name: data_nested[i].values[0].pollster_rating_name,
            grade: data_nested[i].values[0].fte_grade,
            n: +data_nested[i].values[0].sample_size,
            population: data_nested[i].values[0].population,
            start_date: parse_date(data_nested[i].values[0].start_date),
            end_date: parse_date(data_nested[i].values[0].end_date),
            end_date_raw: formatMonth(parse_date(data_nested[i].values[0].end_date)),
            created_at: parse_date_time(data_nested[i].values[0].created_at),
            url: data_nested[i].values[0].url,
            Biden: +poll_response[0] == "" ? "n/a" : +poll_response[0],
            Bloomberg: +poll_response[1] == "" ? "n/a" : +poll_response[1],
            Booker: +poll_response[2] == "" ? "n/a" : +poll_response[2],
            Buttigieg: +poll_response[3] == "" ? "n/a" : +poll_response[3],

            Klobuchar: +poll_response[5] == "" ? "n/a" : +poll_response[5],
            Sanders: +poll_response[6] == "" ? "n/a" : +poll_response[6],
            Steyer: +poll_response[7] == "" ? "n/a" : +poll_response[7],
            Warren: +poll_response[8] == "" ? "n/a" : +poll_response[8],
            Yang: +poll_response[9] == "" ? "n/a" : +poll_response[9],
            total: d3.sum(data_nested[i].values, d => d.pct),
            population_adj: data_nested[i].values[0].population == "lv" ? 1.33 : data_nested[i].values[0].population == "rv" ? 1 : .7,
            candidates_polled: +cands_polled[0],
            grade_value: pollster_grade_value[pollster_grade_letter.indexOf(data_nested[i].values[0].fte_grade)],

        }
        polls_raw.push(new_poll)
    }
    polls_raw.forEach(function (d) {
        d.n_adjusted = d.n > 4000 ? Math.pow((d.n - 4000), .2) + 27 : Math.pow(d.n, .4);
        d.weight = d.n_adjusted * d.population_adj
        d.candidates_weight = d.candidates_polled >= 8 ? 1 : d.candidates_polled < 5 ? 0 : d.candidates_polled * .1 + .2
        d.weight = d.weight * d.candidates_weight
        d.weight = Math.pow(d.weight, d.grade_value)
        d.time_weighted_weight = d.weight / (1 + (((simulation_date - d.end_date) / time_scale) / 20))
        d.poll_index = d.pollster + d.state
        d.biden_change = us_biden[date_index_us.indexOf(d.end_date_raw)] * 100
        d.bloomberg_change = us_bloomberg[date_index_us.indexOf(d.end_date_raw)] * 100
        d.booker_change = us_booker[date_index_us.indexOf(d.end_date_raw)] * 100
        d.buttigieg_change = us_buttigieg[date_index_us.indexOf(d.end_date_raw)] * 100
        d.klobuchar_change = us_klobuchar[date_index_us.indexOf(d.end_date_raw)] * 100
        d.sanders_change = us_sanders[date_index_us.indexOf(d.end_date_raw)] * 100
        d.steyer_change = us_steyer[date_index_us.indexOf(d.end_date_raw)] * 100
        d.warren_change = us_warren[date_index_us.indexOf(d.end_date_raw)] * 100
        d.yang_change = us_yang[date_index_us.indexOf(d.end_date_raw)] * 100
        return d;
    })



    var polls_nested_by_poll_id = d3.nest()
        .key(d => d.poll_id)
        .entries(polls_raw)

    var polls_filtered = []
    for (let i = 0; i < polls_nested_by_poll_id.length; i++) {

        var unique_poll_id = polls_nested_by_poll_id[i].values



        unique_poll_id.sort((a, b) => b.weight - a.weight)
        var best_poll = unique_poll_id[0]

        polls_filtered.push(best_poll)
    }


    var polls_nested_by_same_pollster = d3.nest()
        .key(d => d.poll_index)
        .entries(polls_filtered)

    var newest_polls = []


    for (let i = 0; i < polls_nested_by_same_pollster.length; i++) {

        var unique_poll_id = polls_nested_by_same_pollster[i].values

        unique_poll_id.forEach(function (d, i) {
            d.newest_poll = i + 1
            return d;
        })

        unique_poll_id.sort((a, b) => b.end_date - a.end_date)



        for (let j = 0; j < unique_poll_id.length; j++) {
            var indivual_poll = unique_poll_id[j]
            newest_polls.push(indivual_poll)
        }

    }

    newest_polls.forEach(function (d) {
        d.time_weighted_weight = d.time_weighted_weight / Math.pow(d.newest_poll, 3)
        return d;
    })

    newest_polls.forEach(function (d) {
        d.Biden_adj = isNaN(d.Biden * 95 / d.total) == true ? "n/a" : (d.Biden + d.biden_change) * 95 / d.total * d.time_weighted_weight / 100
        d.Bloomberg_adj = isNaN(d.Bloomberg * 95 / d.total) == true ? "n/a" : (d.Bloomberg + d.bloomberg_change) * 95 / d.total * d.time_weighted_weight / 100
        d.Booker_adj = isNaN(d.Booker * 95 / d.total) == true ? "n/a" : (d.Booker + d.booker_change) * 95 / d.total * d.time_weighted_weight / 100
        d.Buttigieg_adj = isNaN(d.Buttigieg * 95 / d.total) == true ? "n/a" : (d.Buttigieg + d.buttigieg_change) * 95 / d.total * d.time_weighted_weight / 100

        d.Klobuchar_adj = isNaN(d.Klobuchar * 95 / d.total) == true ? "n/a" : (d.Klobuchar + d.klobuchar_change) * 95 / d.total * d.time_weighted_weight / 100
        d.Sanders_adj = isNaN(d.Sanders * 95 / d.total) == true ? "n/a" : (d.Sanders + d.sanders_change) * 95 / d.total * d.time_weighted_weight / 100
        d.Steyer_adj = isNaN(d.Steyer * 95 / d.total) == true ? "n/a" : (d.Steyer + d.steyer_change) * 95 / d.total * d.time_weighted_weight / 100
        d.Warren_adj = isNaN(d.Warren * 95 / d.total) == true ? "n/a" : (d.Warren + d.warren_change) * 95 / d.total * d.time_weighted_weight / 100
        d.Yang_adj = isNaN(d.Yang * 95 / d.total) == true ? "n/a" : (d.Yang + d.yang_change) * 95 / d.total * d.time_weighted_weight / 100
        return d;
    })

    var raw_states_data = []
    var state_polling_averages = []
    var state_demographic_regression = []
    var projected_vote = []
    for (let i = 0; i < states_info.length; i++) {

        var filtered_data = newest_polls.filter(d => d.state == states_info[i].state)
        var res = {
            state: states_info[i].state,
            polls: filtered_data
        }
        var k = {
            Biden: d3.sum(res.polls, d => d.Biden_adj),
            Biden_tot: d3.sum(res.polls.filter(d => d.Biden_adj != "n/a"), d => d.time_weighted_weight),
            Bloomberg: d3.sum(res.polls, d => d.Bloomberg_adj),
            Bloomberg_tot: d3.sum(res.polls.filter(d => d.Bloomberg_adj != "n/a"), d => d.time_weighted_weight),
            Buttigieg: d3.sum(res.polls, d => d.Buttigieg_adj),
            Buttigieg_tot: d3.sum(res.polls.filter(d => d.Buttigieg_adj != "n/a"), d => d.time_weighted_weight),
            Klobuchar: d3.sum(res.polls, d => d.Klobuchar_adj),
            Klobuchar_tot: d3.sum(res.polls.filter(d => d.Klobuchar_adj != "n/a"), d => d.time_weighted_weight),
            Sanders: d3.sum(res.polls, d => d.Sanders_adj),
            Sanders_tot: d3.sum(res.polls.filter(d => d.Sanders_adj != "n/a"), d => d.time_weighted_weight),
            Steyer: d3.sum(res.polls, d => d.Steyer_adj),
            Steyer_tot: d3.sum(res.polls.filter(d => d.Steyer_adj != "n/a"), d => d.time_weighted_weight),
            Warren: d3.sum(res.polls, d => d.Warren_adj),
            Warren_tot: d3.sum(res.polls.filter(d => d.Warren_tot != "n/a"), d => d.time_weighted_weight),
            Yang: d3.sum(res.polls, d => d.Yang_adj),
            Yang_tot: d3.sum(res.polls.filter(d => d.Yang_adj != "n/a"), d => d.time_weighted_weight),
            weight: d3.sum(res.polls, d => d.time_weighted_weight)
        }

        var averages = {
            state: res.state,
            Biden: drop_out[0] == "" ? k.Biden / k.Biden_tot : drop_out[0] < simulation_date ? 0 : k.Biden / k.Biden_tot,
            Bloomberg:  drop_out[1] == "" ? k.Bloomberg / k.Bloomberg_tot : drop_out[1] < simulation_date ? 0 : k.Bloomberg / k.Bloomberg_tot,
           
            Buttigieg: drop_out[3] == "" ? k.Buttigieg / k.Buttigieg_tot : drop_out[3] < simulation_date ? 0 : k.Buttigieg / k.Buttigieg_tot,
            Klobuchar: drop_out[5] == "" ? k.Klobuchar / k.Klobuchar_tot : drop_out[5] < simulation_date ? 0 : k.Klobuchar_tot / k.Klobuchar_tot,
            Sanders: drop_out[6] == "" ? k.Sanders / k.Sanders_tot : drop_out[6] < simulation_date ? 0 : k.Sanders / k.Sanders_tot,
            Steyer: drop_out[7] == "" ? k.Steyer / k.Steyer_tot : drop_out[7] < simulation_date ? 0 : k.Steyer / k.Steyer_tot,
            Warren: drop_out[8] == "" ? k.Warren / k.Warren_tot : drop_out[8] < simulation_date ? 0 : k.Warren / k.Warren_tot,
            Yang: drop_out[9] == "" ? k.Yang / k.Yang_tot : drop_out[9] < simulation_date ? 0 : k.Yang / k.Yang_tot,
            weight: k.weight
        }

        var regression = {
            state: res.state,
            Biden: states_demographic[i].Biden / 20 * us_polling_average.Biden,
            Bloomberg: states_demographic[i].Bloomberg / 20 * us_polling_average.Bloomberg,
            
            Buttigieg: states_demographic[i].Buttigieg / 20 * us_polling_average.Buttigieg,
            Klobuchar: states_demographic[i].Klobuchar / 20 * us_polling_average.Klobuchar,
            Sanders: states_demographic[i].Sanders / 20 * us_polling_average.Sanders,
            Steyer: states_demographic[i].Steyer / 20 * us_polling_average.Steyer,
            Warren: states_demographic[i].Warren / 20 * us_polling_average.Warren,
            Yang: states_demographic[i].Yang / 20 * us_polling_average.Yang,
        }


        var raw = {
            state: res.state,
            date: states_info[i].primary_date,
            delegates: states_info[i].total_delegates,
            Biden: k.Biden_tot == 0 ? regression.Biden * 100 : (regression.Biden * 20 + averages.Biden * k.weight) / (k.weight + 20) * 100,
            Bloomberg: k.Bloomberg_tot == 0 ? regression.Bloomberg * 100 : (regression.Bloomberg * 20 + averages.Bloomberg * k.weight) / (k.weight + 20) * 100,
            Buttigieg: k.Buttigieg_tot == 0 ? regression.Buttigieg * 100 : (regression.Buttigieg * 20 + averages.Buttigieg * k.weight) / (k.weight + 20) * 100,
            Klobuchar: k.Klobuchar_tot == 0 ? regression.Klobuchar * 100 : (regression.Klobuchar * 20 + averages.Klobuchar * k.weight) / (k.weight + 20) * 100,
            Sanders: k.Sanders_tot == 0 ? regression.Sanders * 100 : (regression.Sanders * 20 + averages.Sanders * k.weight) / (k.weight + 20) * 100,
            Steyer: k.Steyer_tot == 0 ? regression.Steyer * 100 : (regression.Steyer * 20 + averages.Steyer * k.weight) / (k.weight + 20) * 100,
            Warren: k.Warren_tot == 0 ? regression.Warren * 100 : (regression.Warren * 20 + averages.Warren * k.weight) / (k.weight + 20) * 100,
            Yang: k.Yang_tot == 0 ? regression.Yang * 100 : (regression.Yang * 20 + averages.Yang * k.weight) / (k.weight + 20) * 100,
            delegates: states_info[i].total_delegates,
            voteperc : states_info[i].voteperc,
        }
        

        raw_states_data.push(k)
        state_polling_averages.push(averages)
        state_demographic_regression.push(regression)
        projected_vote.push(raw)
    }
    projected_vote.map((d, k) => {
        d.Bidenov15 = d.Biden > 15 ? d.Biden : 0
        d.Bloombergov15 = d.Bloomberg > 15 ? d.Bloomberg : 0
        d.Buttigiegov15 = d.Buttigieg > 15 ? d.Buttigieg : 0
        d.Klobucharov15 = d.Klobuchar > 15 ? d.Klobuchar : 0
        d.Sandersov15 = d.Sanders > 15 ? d.Sanders : 0
        d.Steyerov15 = d.Steyer > 15 ? d.Steyer : 0
        d.Warrenov15 = d.Warren > 15 ? d.Warren : 0
        d.Yangov15 = d.Yang > 15 ? d.Yang : 0
        d.sumover15 = d.Bidenov15 + d.Bloombergov15 + d.Buttigiegov15 + d.Klobucharov15 + d.Sandersov15 + d.Steyerov15 + d.Warrenov15 + d.Yangov15
        d.Bidendelegateun15 = d.Bidenov15 == 0 ? Math.round((300 * Math.pow(d.Biden / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Bloombergdelegateun15 = d.Bloombergov15 == 0 ? Math.round((300 * Math.pow(d.Bloomberg / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Buttigiegdelegateun15 = d.Buttigiegov15 == 0 ? Math.round((300 * Math.pow(d.Buttigieg / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Klobuchardelegateun15 = d.Klobcharov15 == 0 ? Math.round((300 * Math.pow(d.Klobuchar / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Sandersdelegateun15 = d.Sandersov15 == 0 ? Math.round((300 * Math.pow(d.Sanders / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Steyerdelegateun15 = d.Steyerov15 == 0 ? Math.round((300 * Math.pow(d.Steyer / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Warrendelegateun15 = d.Warrenov15 == 0 ? Math.round((300 * Math.pow(d.Warren / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Yangdelegateun15 = d.Yangov15 == 0 ? Math.round((300 * Math.pow(d.Yang / 100, 4) - 0.0006) * d.delegates) : 0;
        d.over15delegates = d.delegates - d.Bidendelegateun15 - d.Bloombergdelegateun15 - d.Buttigiegdelegateun15 - d.Klobuchardelegateun15 - d.Sandersdelegateun15 - d.Steyerdelegateun15 - d.Warrendelegateun15 - d.Yangdelegateun15
        d.Bidendelegateover15 = Math.round((d.Bidenov15 / d.sumover15) * d.over15delegates)
        d.Bloombergdelegateover15 = Math.round((d.Bloombergov15 / d.sumover15) * d.over15delegates)
        d.Buttigiegdelegateover15 = Math.round((d.Buttigiegov15 / d.sumover15) * d.over15delegates)
        d.Klobuchardelegateover15 = Math.round((d.Klobucharov15 / d.sumover15) * d.over15delegates)
        d.Sandersdelegateover15 = Math.round((d.Sandersov15 / d.sumover15) * d.over15delegates)
        d.Steyerdelegateover15 = Math.round((d.Steyerov15 / d.sumover15) * d.over15delegates)
        d.Warrendelegateover15 = Math.round((d.Warrenov15 / d.sumover15) * d.over15delegates)
        d.Yangdelegateover15 = Math.round((d.Yangov15 / d.sumover15) * d.over15delegates)
        d.Bidendelegates = d.Bidendelegateover15 + d.Bidendelegateun15
        d.Bloombergdelegates = d.Bloombergdelegateover15 + d.Bloombergdelegateun15
        d.Buttigiegdelegates = d.Buttigiegdelegateover15 + d.Buttigiegdelegateun15
        d.Klobuchardelegates = d.Klobuchardelegateover15 + d.Klobuchardelegateun15
        d.Sandersdelegates = d.Sandersdelegateover15 + d.Sandersdelegateun15
        d.Steyerdelegates = d.Steyerdelegateover15 + d.Steyerdelegateun15
        d.Warrendelegates = d.Warrendelegateover15 + d.Warrendelegateun15
        d.Yangdelegates = d.Yangdelegateover15 + d.Yangdelegateun15
        d.winner = Math.max(d.Biden, d.Bloomberg, d.Buttigieg, d.Klobuchar, d.Sanders, d.Steyer, d.Warren, d.Yang)
        d.Bidenwin = d.winner == d.Biden ? 1 : 0
        d.Bloombergwin = d.winner == d.Bloomberg ? 1 : 0
        d.Buttigiegwin = d.winner == d.Buttigieg ? 1 : 0
        d.Klobucharwin = d.winner == d.Klobuchar ? 1 : 0
        d.Sanderswin = d.winner == d.Sanders ? 1 : 0
        d.Steyerwin = d.winner == d.Steyer ? 1 : 0
        d.Warrenwin = d.winner == d.Warren ? 1 : 0
        d.Yangwin = d.winner == d.Yang ? 1 : 0
        d.winner = d.Bidenwin == 1 ? "Biden" : d.Bloombergwin == 1 ? "Bloomberg" : d.Buttigiegwin == 1 ? "Buttigieg" : d.Klobucharwin == 1 ? "Klobuchar" : d.Sanderswin == 1 ? "Sanders" : d.Steyerwin == 1 ? "Steyer" : d.Warenwin == 1 ? "Warren" : "Yang"
        return d;
    })

    projected_vote.forEach(function (d) {
        d.Bidenpop = d.Biden * d.voteperc;
        d.Bloombergpop = d.Bloomberg * d.voteperc;
        d.Buttigiegpop = d.Buttigieg * d.voteperc;
        d.Klobucharpop = d.Klobuchar * d.voteperc;
        d.Sanderspop = d.Sanders * d.voteperc;
        d.Steyerpop = d.Steyer * d.voteperc;
        d.Warrenpop = d.Warren * d.voteperc;
        d.Yangpop = d.Yang * d.voteperc;
        return d;
    })


    Bidendelegates = d3.sum(projected_vote, d => d.Bidendelegates)
    Bloombergdelegates = d3.sum(projected_vote, d => d.Bloombergdelegates)
    Buttigiegdelegates = d3.sum(projected_vote, d => d.Buttigiegdelegates)
    Klobuchardelegates = d3.sum(projected_vote, d => d.Klobuchardelegates)
    Sandersdelegates = d3.sum(projected_vote, d => d.Sandersdelegates)
    Steyerdelegates = d3.sum(projected_vote, d => d.Steyerdelegates)
    Warrendelegates = d3.sum(projected_vote, d => d.Warrendelegates)
    Yangdelegates = d3.sum(projected_vote, d => d.Yangdelegates)

    Bidenpop = d3.sum(projected_vote, d => d.Bidenpop)
    Bloombergpop = d3.sum(projected_vote, d => d.Bloombergpop)
    Buttigiegpop = d3.sum(projected_vote, d => d.Buttigiegpop)
    Klobucharpop = d3.sum(projected_vote, d => d.Klobucharpop)
    Sanderspop = d3.sum(projected_vote, d => d.Sanderspop)
    Steyerpop = d3.sum(projected_vote, d => d.Steyerpop)
    Warrenpop = d3.sum(projected_vote, d => d.Warrenpop)
    Yangpop = d3.sum(projected_vote, d => d.Yangpop)

    var usa = {
        state: "US",
        date: "07/01/20",
        delegates: 3879,
        Biden: Bidenpop,
        Bloomberg: Bloombergpop,
        Buttigieg: Buttigiegpop,
        Klobuchar: Klobucharpop,
        Sanders: Sanderspop,
        Steyer: Steyerpop,
        Warren: Warrenpop,
        Yang: Yangpop,
        Bidendelegates: Bidendelegates,
        Bloombergdelegates: Bloombergdelegates,
        Buttigiegdelegates: Buttigiegdelegates,
        Klobuchardelegates: Klobuchardelegates,
        Sandersdelegates: Sandersdelegates,
        Steyerdelegates: Steyerdelegates,
        Warrendelegates: Warrendelegates,
        Yangdelegates: Yangdelegates,

    }
    projected_vote.push(usa)

    projected_vote[5].Bloomberg = projected_vote[5].Bloomberg+2
    projected_vote[18].Bloomberg = 0
    projected_vote[31].Bloomberg = 0
    projected_vote[32].Bloomberg = 0
    projected_vote[45].Bloomberg = 0

    projected_vote.forEach(function (d) {
        d.date = parse_date(d.date)
        return d;
    })


    projected_vote.sort((a, b) => a.date - b.date)
    console.log(projected_vote)
    //simulation
    


    var trialruns = 25000
    var parseTime = d3.timeParse("%m/%d/%y")
    formatTime = d3.timeFormat("%m/%d/%y")
    formatValue = d3.format(".2")
    formatvalue = d3.format(".3");
    formatFinal = d3.timeFormat("%Y-%m-%d")
    
   
    data = projected_vote
    data.sort((a, b) => a.date - b.date)
      var rawvote = data.map((d, k) => {
        return {
          state: d.state,
          date: d.date,
          delegates: d.delegates,
          Bidenvote: d.Biden,
          Bloombergvote: d.Bloomberg,
          Buttigiegvote: d.Buttigieg,
          Klobucharvote: d.Klobuchar,
          Sandersvote: d.Sanders,
          Steyervote: d.Steyer,
          Warrenvote: d.Warren,
          Yangvote: d.Yang,
          bi: d.Bidendelegates,
          bl: d.Bloombergdelegates,
          bu: d.Buttigiegdelegates,
          kl: d.Klobuchardelegates,
          sa: d.Sandersdelegates,
          st: d.Steyerdelegates,
          wa: d.Warrendelegates,
          ya: d.Yangdelegates,
          voteperc: d.voteperc,
        }
      })
      
     

      var data = data.map((d, k) => {
        return {
          state: d.state,
          date: parseTime(d.date),
          delegates: d.delegates,
          Bidenproj: d.Biden,
          Bloombergproj: d.Bloomberg,
          Buttigiegproj: d.Buttigieg,
          Klobucharproj: d.Klobuchar,
          Sandersproj: d.Sanders,
          Steyerproj: d.Steyer,
          Warrenproj: d.Warren,
          Yangproj: d.Yang,
          voteperc: d.voteperc
        }
      })
      
      var dataoutput = []
      for (let i = 0; i < trialruns; i++) {
      var Bidensimulation = Math.random()
      Bloombergsimulation = Math.random()
      Buttigiegsimulation = Math.random()
      Klobucharsimulation = Math.random()
      Sanderssimulation = Math.random()
      Steyersimulation = Math.random()
      Warrensimulation = Math.random()
      Yangsimulation = Math.random()
      BidenUS = data[57].Bidenproj
      BloombergUS = data[57].Bloombergproj
      ButtigiegUS =  data[57].Buttigiegproj
      KlobucharUS = data[57].Klobucharproj
      SandersUS = data[57].Sandersproj
      SteyerUS = data[57].Steyerproj
      WarrenUS = data[57].Warrenproj
      YangUS = data[57].Yangproj
      firstSectionResults =0
      secondSectionResults =0
      thirdSectionResults =0
      fourthSectionResults =0
      
    
    
    
    
    
      //IA & NH
      var firstSection = data.slice(0, 2)
        
      var firstSection = firstSection.map((d, k) => {
        d.Bidenstd = 15
        d.Bloombergstd = 15
        d.Buttigiegstd = 15
        d.Klobucharstd = 15
        d.Sandersstd = 15
        d.Steyerstd = 15
        d.Warrenstd = 15
        d.Yangstd = 15
        d.Bidenvoteraw = jStat.normal.inv((Bidensimulation * 3 + Math.random()) / 4, d.Bidenproj, d.Bidenstd);
        d.Bloombergvoteraw = jStat.normal.inv((Bloombergsimulation * 3 + Math.random()) / 4, d.Bloombergproj, d.Bloombergstd);
        d.Buttigiegvoteraw = jStat.normal.inv((Buttigiegsimulation * 3 + Math.random()) / 4, d.Buttigiegproj, d.Buttigiegstd);
        d.Klobucharvoteraw = jStat.normal.inv((Klobucharsimulation * 3 + Math.random()) / 4, d.Klobucharproj, d.Klobucharstd);
        d.Sandersvoteraw = jStat.normal.inv((Sanderssimulation * 3 + Math.random()) / 4, d.Sandersproj, d.Sandersstd);
        d.Steyervoteraw = jStat.normal.inv((Steyersimulation * 3 + Math.random()) / 4, d.Steyerproj, d.Steyerstd);
        d.Warrenvoteraw = jStat.normal.inv((Warrensimulation * 3 + Math.random()) / 4, d.Warrenproj, d.Warrenstd);
        d.Yangvoteraw = jStat.normal.inv((Yangsimulation * 3 + Math.random()) / 4, d.Yangproj, d.Yangstd);
        d.Bidenvoteraw = d.Bidenvoteraw > 0 ? d.Bidenvoteraw : 0;
        d.Bloombergvoteraw = d.Bloombergvoteraw > 0 ? d.Bloombergvoteraw : 0;
        d.Buttigiegvoteraw = d.Buttigiegvoteraw > 0 ? d.Buttigiegvoteraw : 0;
        d.Klobucharvoteraw = d.Klobucharvoteraw > 0 ? d.Klobucharvoteraw : 0;
        d.Sandersvoteraw = d.Sandersvoteraw > 0 ? d.Sandersvoteraw : 0;
        d.Steyervoteraw = d.Steyervoteraw > 0 ? d.Steyervoteraw : 0;
        d.Warrenvoteraw = d.Warrenvoteraw > 0 ? d.Warrenvoteraw : 0;
        d.Yangvoteraw = d.Yangvoteraw > 0 ? d.Yangvoteraw : 0;
        d.sumvoteraw = d.Bidenvoteraw + d.Bloombergvoteraw + d.Buttigiegvoteraw + d.Klobucharvoteraw + d.Sandersvoteraw + d.Steyervoteraw + d.Warrenvoteraw + d.Yangvoteraw
        d.candsabove0 = (d.Bidenvoteraw > 0 ? 1 : 0) + (d.Bloombergvoteraw > 0 ? 1 : 0) + (d.Buttigiegvoteraw > 0 ? 1 : 0) + (d.Klobucharvoteraw > 0 ? 1 : 0) + (d.Sandersvoteraw > 0 ? 1 : 0) + (d.Steyervoteraw > 0 ? 1 : 0) + (d.Warrenvoteraw > 0 ? 1 : 0) + (d.Yangvoteraw > 0 ? 1 : 0)
        d.sumdistribute = (100 - d.sumvoteraw) / 2
        d.distributeper = d.sumdistribute / d.candsabove0
        d.Bidenvote = d.Bidenvoteraw == 0 ? 0 : d.Bidenvoteraw + d.distributeper + ((d.Bidenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Bloombergvote = d.Bloombergvoteraw == 0 ? 0 : d.Bloombergvoteraw + d.distributeper + ((d.Bloombergvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Buttigiegvote = d.Buttigiegvoteraw == 0 ? 0 : d.Buttigiegvoteraw + d.distributeper + ((d.Buttigiegvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Klobucharvote = d.Klobucharvoteraw == 0 ? 0 : d.Klobucharvoteraw + d.distributeper + ((d.Klobucharvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Sandersvote = d.Sandersvoteraw == 0 ? 0 : d.Sandersvoteraw + d.distributeper + ((d.Sandersvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Steyervote = d.Steyervoteraw == 0 ? 0 : d.Steyervoteraw + d.distributeper + ((d.Steyervoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Warrenvote = d.Warrenvoteraw == 0 ? 0 : d.Warrenvoteraw + d.distributeper + ((d.Warrenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Yangvote = d.Yangvoteraw == 0 ? 0 : d.Yangvoteraw + d.distributeper + ((d.Yangvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.sum = d.Bidenvote + d.Bloombergvote + d.Buttigiegvote + d.Klobucharvote + d.Sandersvote + d.Steyervote + d.Warrenvote + d.Yangvoteraw
        d.Bidenov15 = d.Bidenvote > 15 ? d.Bidenvote : 0
        d.Bloombergov15 = d.Bloombergvote > 15 ? d.Bloombergvote : 0
        d.Buttigiegov15 = d.Buttigiegvote > 15 ? d.Buttigiegvote : 0
        d.Klobucharov15 = d.Klobucharvote > 15 ? d.Klobucharvote : 0
        d.Sandersov15 = d.Sandersvote > 15 ? d.Sandersvote : 0
        d.Steyerov15 = d.Steyervote > 15 ? d.Steyervote : 0
        d.Warrenov15 = d.Warrenvote > 15 ? d.Warrenvote : 0
        d.Yangov15 = d.Yangvote > 15 ? d.Yangvote : 0
        d.sumover15 = d.Bidenov15 + d.Bloombergov15 + d.Buttigiegov15 + d.Klobucharov15 + d.Sandersov15 + d.Steyerov15 + d.Warrenov15 + d.Yangov15
        d.Bidendelegateun15 = d.Bidenov15 == 0 ? Math.round((300 * Math.pow(d.Bidenvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Bloombergdelegateun15 = d.Bloombergov15 == 0 ? Math.round((300 * Math.pow(d.Bloombergvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Buttigiegdelegateun15 = d.Buttigiegov15 == 0 ? Math.round((300 * Math.pow(d.Buttigiegvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Klobuchardelegateun15 = d.Klobcharov15 == 0 ? Math.round((300 * Math.pow(d.Klobucharvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Sandersdelegateun15 = d.Sandersov15 == 0 ? Math.round((300 * Math.pow(d.Sandersvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Steyerdelegateun15 = d.Steyerov15 == 0 ? Math.round((300 * Math.pow(d.Steyervote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Warrendelegateun15 = d.Warrenov15 == 0 ? Math.round((300 * Math.pow(d.Warrenvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Yangdelegateun15 = d.Yangov15 == 0 ? Math.round((300 * Math.pow(d.Yangvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.over15delegates = d.delegates - d.Bidendelegateun15 - d.Bloombergdelegateun15 - d.Buttigiegdelegateun15 - d.Klobuchardelegateun15 - d.Sandersdelegateun15 - d.Steyerdelegateun15 - d.Warrendelegateun15 - d.Yangdelegateun15
        d.Bidendelegateover15 = Math.round((d.Bidenov15 / d.sumover15) * d.over15delegates)
        d.Bloombergdelegateover15 = Math.round((d.Bloombergov15 / d.sumover15) * d.over15delegates)
        d.Buttigiegdelegateover15 = Math.round((d.Buttigiegov15 / d.sumover15) * d.over15delegates)
        d.Klobuchardelegateover15 = Math.round((d.Klobucharov15 / d.sumover15) * d.over15delegates)
        d.Sandersdelegateover15 = Math.round((d.Sandersov15 / d.sumover15) * d.over15delegates)
        d.Steyerdelegateover15 = Math.round((d.Steyerov15 / d.sumover15) * d.over15delegates)
        d.Warrendelegateover15 = Math.round((d.Warrenov15 / d.sumover15) * d.over15delegates)
        d.Yangdelegateover15 = Math.round((d.Yangov15 / d.sumover15) * d.over15delegates)
        d.Bidendelegates = d.Bidendelegateover15 + d.Bidendelegateun15
        d.Bloombergdelegates = d.Bloombergdelegateover15 + d.Bloombergdelegateun15
        d.Buttigiegdelegates = d.Buttigiegdelegateover15 + d.Buttigiegdelegateun15
        d.Klobuchardelegates = d.Klobuchardelegateover15 + d.Klobuchardelegateun15
        d.Sandersdelegates = d.Sandersdelegateover15 + d.Sandersdelegateun15
        d.Steyerdelegates = d.Steyerdelegateover15 + d.Steyerdelegateun15
        d.Warrendelegates = d.Warrendelegateover15 + d.Warrendelegateun15
        d.Yangdelegates = d.Yangdelegateover15 + d.Yangdelegateun15
        d.winner = Math.max(d.Bidenvote, d.Bloombergvote, d.Buttigiegvote, d.Klobucharvote, d.Sandersvote, d.Steyervote, d.Warrenvote, d.Yangvote)
        d.Bidenwin = d.winner == d.Bidenvote ? 1 : 0
        d.Bloombergwin = d.winner == d.Bloombergvote ? 1 : 0
        d.Buttigiegwin = d.winner == d.Buttigiegvote ? 1 : 0
        d.Klobucharwin = d.winner == d.Klobucharvote ? 1 : 0
        d.Sanderswin = d.winner == d.Sandersvote ? 1 : 0
        d.Steyerwin = d.winner == d.Steyervote ? 1 : 0
        d.Warrenwin = d.winner == d.Warrenvote ? 1 : 0
        d.Yangwin = d.winner == d.Yangvote ? 1 : 0
        d.winner = d.Bidenwin == 1 ? "Biden" : d.Bloombergwin == 1 ? "Bloomberg" : d.Buttigiegwin == 1 ? "Buttigieg" : d.Klobucharwin == 1 ? "Klobuchar" : d.Sanderswin == 1 ? "Sanders" : d.Steyerwin == 1 ? "Steyer" : d.Warenwin == 1 ? "Warren" : "Yang"
        d.voteperc = d.voteperc
        return d;
      })
    
      var firstSectionResults = [{ Candidate: "Biden", Delegates: d3.sum(firstSection, d => d.Bidendelegates) },
      { Candidate: "Bloomberg", Delegates: d3.sum(firstSection, d => d.Bloombergdelegates) },
      { Candidate: "Buttigieg", Delegates: d3.sum(firstSection, d => d.Buttigiegdelegates) },
      { Candidate: "Klobuchar", Delegates: d3.sum(firstSection, d => d.Klobuchardelegates) },
      { Candidate: "Sanders", Delegates: d3.sum(firstSection, d => d.Sandersdelegates) },
      { Candidate: "Steyer", Delegates: d3.sum(firstSection, d => d.Steyerdelegates) },
      { Candidate: "Warren", Delegates: d3.sum(firstSection, d => d.Warrendelegates) },
      { Candidate: "Yang", Delegates: d3.sum(firstSection, d => d.Yangdelegates) },
      ]
    
      firstSectionResults.forEach(function (d) {
        d.dropOut = d.Delegates == 0 ? Math.random() < .4 ? 1 : 0 : 0;
        return d;
      })
      Bidenbump =0
      Bloombergbump =0
      Buttigiegbump =0
      Klobucharbump =0
      Sandersbump =0
      Steyerbump =0
      Warrenbump =0
      Yangbump =0
    
      //Bidenbump = firstSection[1].Bidenwin * 3 + firstSection[1].Bidenwin * 3
      //Bloombergbump = 2
      //Buttigiegbump = firstSection[1].Buttigiegwin * 3 + firstSection[1].Buttigiegwin * 1
      //Klobucharbump = firstSection[1].Klobucharwin * 5 + firstSection[1].Klobucharwin * 5
      //Sandersbump = firstSection[1].Sanderswin * 4 + firstSection[1].Sanderswin * 4
      //Steyerbump = firstSection[1].Steyerwin * 4 + firstSection[1].Steyerwin * 2
      //Warrenbump = firstSection[1].Warrenwin * 3 + firstSection[1].Warrenwin * 2
      //Yangbump = firstSection[1].Yangwin * 3 + firstSection[1].Yangwin * 3
    
    
    
    
      firstSectionResults[1].dropOut = 0
      //NV-Super Tuesday
    
    
    
      var dataadj = data.map((d, i) => {
        d.Bidenproj = d.Bidenproj 
        d.Bloombergproj = d.Bloombergproj 
        d.Buttigiegproj = d.Buttigiegproj 
        d.Klobucharproj = d.Klobucharproj 
        d.Sandersproj = d.Sandersproj 
        d.Steyerproj = d.Steyerproj
        d.Warrenproj = d.Warrenproj
        d.Yangproj =d.Yangproj
        return d;
      })
    
    
    
    
      var secondSection = dataadj.slice(2, 20)
    
    
      var secondSection = secondSection.map((d, k) => {
        d.Bidenstd = 17
        d.Bloombergstd = 17
        d.Buttigiegstd = 17
        d.Klobucharstd = 17
        d.Sandersstd = 17
        d.Steyerstd = 17
        d.Warrenstd = 17
        d.Yangstd = 17
        d.Bidenvoteraw = firstSectionResults[0].dropOut == 1 ? 0 : jStat.normal.inv((Bidensimulation * 3 + Math.random()) / 4, d.Bidenproj, d.Bidenstd);
        d.Bloombergvoteraw = firstSectionResults[1].dropOut == 1 ? 0 : jStat.normal.inv((Bloombergsimulation * 3 + Math.random()) / 4, d.Bloombergproj, d.Bloombergstd);
        d.Buttigiegvoteraw = firstSectionResults[2].dropOut == 1 ? 0 : jStat.normal.inv((Buttigiegsimulation * 3 + Math.random()) / 4, d.Buttigiegproj, d.Buttigiegstd);
        d.Klobucharvoteraw = firstSectionResults[3].dropOut == 1 ? 0 : jStat.normal.inv((Klobucharsimulation * 3 + Math.random()) / 4, d.Klobucharproj, d.Klobucharstd);
        d.Sandersvoteraw = firstSectionResults[4].dropOut == 1 ? 0 : jStat.normal.inv((Sanderssimulation * 3 + Math.random()) / 4, d.Sandersproj, d.Sandersstd);
        d.Steyervoteraw = firstSectionResults[5].dropOut == 1 ? 0 : jStat.normal.inv((Steyersimulation * 3 + Math.random()) / 4, d.Steyerproj, d.Steyerstd);
        d.Warrenvoteraw = firstSectionResults[6].dropOut == 1 ? 0 : jStat.normal.inv((Warrensimulation * 3 + Math.random()) / 4, d.Warrenproj, d.Warrenstd);
        d.Yangvoteraw = firstSectionResults[7].dropOut == 1 ? 0 : jStat.normal.inv((Yangsimulation * 3 + Math.random()) / 4, d.Yangproj, d.Yangstd);
        d.Bidenvoteraw = d.Bidenvoteraw > 0 ? d.Bidenvoteraw : 0;
        d.Bloombergvoteraw = d.Bloombergvoteraw > 0 ? d.Bloombergvoteraw : 0;
        d.Buttigiegvoteraw = d.Buttigiegvoteraw > 0 ? d.Buttigiegvoteraw : 0;
        d.Klobucharvoteraw = d.Klobucharvoteraw > 0 ? d.Klobucharvoteraw : 0;
        d.Sandersvoteraw = d.Sandersvoteraw > 0 ? d.Sandersvoteraw : 0;
        d.Steyervoteraw = d.Steyervoteraw > 0 ? d.Steyervoteraw : 0;
        d.Warrenvoteraw = d.Warrenvoteraw > 0 ? d.Warrenvoteraw : 0;
        d.Yangvoteraw = d.Yangvoteraw > 0 ? d.Yangvoteraw : 0;
        d.sumvoteraw = d.Bidenvoteraw + d.Bloombergvoteraw + d.Buttigiegvoteraw + d.Klobucharvoteraw + d.Sandersvoteraw + d.Steyervoteraw + d.Warrenvoteraw + d.Yangvoteraw
        d.candsabove0 = (d.Bidenvoteraw > 0 ? 1 : 0) + (d.Bloombergvoteraw > 0 ? 1 : 0) + (d.Buttigiegvoteraw > 0 ? 1 : 0) + (d.Klobucharvoteraw > 0 ? 1 : 0) + (d.Sandersvoteraw > 0 ? 1 : 0) + (d.Steyervoteraw > 0 ? 1 : 0) + (d.Warrenvoteraw > 0 ? 1 : 0) + (d.Yangvoteraw > 0 ? 1 : 0)
        d.sumdistribute = (100 - d.sumvoteraw) / 2
        d.distributeper = d.sumdistribute / d.candsabove0
        d.Bidenvote = d.Bidenvoteraw == 0 ? 0 : d.Bidenvoteraw + d.distributeper + ((d.Bidenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Bloombergvote = d.Bloombergvoteraw == 0 ? 0 : d.Bloombergvoteraw + d.distributeper + ((d.Bloombergvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Buttigiegvote = d.Buttigiegvoteraw == 0 ? 0 : d.Buttigiegvoteraw + d.distributeper + ((d.Buttigiegvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Klobucharvote = d.Klobucharvoteraw == 0 ? 0 : d.Klobucharvoteraw + d.distributeper + ((d.Klobucharvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Sandersvote = d.Sandersvoteraw == 0 ? 0 : d.Sandersvoteraw + d.distributeper + ((d.Sandersvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Steyervote = d.Steyervoteraw == 0 ? 0 : d.Steyervoteraw + d.distributeper + ((d.Steyervoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Warrenvote = d.Warrenvoteraw == 0 ? 0 : d.Warrenvoteraw + d.distributeper + ((d.Warrenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Yangvote = d.Yangvoteraw == 0 ? 0 : d.Yangvoteraw + d.distributeper + ((d.Yangvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Bidenov15 = d.Bidenvote > 15 ? d.Bidenvote : 0
        d.Bloombergov15 = d.Bloombergvote > 15 ? d.Bloombergvote : 0
        d.Buttigiegov15 = d.Buttigiegvote > 15 ? d.Buttigiegvote : 0
        d.Klobucharov15 = d.Klobucharvote > 15 ? d.Klobucharvote : 0
        d.Sandersov15 = d.Sandersvote > 15 ? d.Sandersvote : 0
        d.Steyerov15 = d.Steyervote > 15 ? d.Steyervote : 0
        d.Warrenov15 = d.Warrenvote > 15 ? d.Warrenvote : 0
        d.Yangov15 = d.Yangvote > 15 ? d.Yangvote : 0
        d.sumover15 = d.Bidenov15 + d.Bloombergov15 + d.Buttigiegov15 + d.Klobucharov15 + d.Sandersov15 + d.Steyerov15 + d.Warrenov15 + d.Yangov15
        d.Bidendelegateun15 = d.Bidenov15 == 0 ? Math.round((300 * Math.pow(d.Bidenvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Bloombergdelegateun15 = d.Bloombergov15 == 0 ? Math.round((300 * Math.pow(d.Bloombergvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Buttigiegdelegateun15 = d.Buttigiegov15 == 0 ? Math.round((300 * Math.pow(d.Buttigiegvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Klobuchardelegateun15 = d.Klobcharov15 == 0 ? Math.round((300 * Math.pow(d.Klobucharvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Sandersdelegateun15 = d.Sandersov15 == 0 ? Math.round((300 * Math.pow(d.Sandersvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Steyerdelegateun15 = d.Steyerov15 == 0 ? Math.round((300 * Math.pow(d.Steyervote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Warrendelegateun15 = d.Warrenov15 == 0 ? Math.round((300 * Math.pow(d.Warrenvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Yangdelegateun15 = d.Yangov15 == 0 ? Math.round((300 * Math.pow(d.Yangvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.over15delegates = d.delegates - d.Bidendelegateun15 - d.Bloombergdelegateun15 - d.Buttigiegdelegateun15 - d.Klobuchardelegateun15 - d.Sandersdelegateun15 - d.Steyerdelegateun15 - d.Warrendelegateun15 - d.Yangdelegateun15
        d.Bidendelegateover15 = Math.round((d.Bidenov15 / d.sumover15) * d.over15delegates)
        d.Bloombergdelegateover15 = Math.round((d.Bloombergov15 / d.sumover15) * d.over15delegates)
        d.Buttigiegdelegateover15 = Math.round((d.Buttigiegov15 / d.sumover15) * d.over15delegates)
        d.Klobuchardelegateover15 = Math.round((d.Klobucharov15 / d.sumover15) * d.over15delegates)
        d.Sandersdelegateover15 = Math.round((d.Sandersov15 / d.sumover15) * d.over15delegates)
        d.Steyerdelegateover15 = Math.round((d.Steyerov15 / d.sumover15) * d.over15delegates)
        d.Warrendelegateover15 = Math.round((d.Warrenov15 / d.sumover15) * d.over15delegates)
        d.Yangdelegateover15 = Math.round((d.Yangov15 / d.sumover15) * d.over15delegates)
        d.Bidendelegates = d.Bidendelegateover15 + d.Bidendelegateun15
        d.Bloombergdelegates = d.Bloombergdelegateover15 + d.Bloombergdelegateun15
        d.Buttigiegdelegates = d.Buttigiegdelegateover15 + d.Buttigiegdelegateun15
        d.Klobuchardelegates = d.Klobuchardelegateover15 + d.Klobuchardelegateun15
        d.Sandersdelegates = d.Sandersdelegateover15 + d.Sandersdelegateun15
        d.Steyerdelegates = d.Steyerdelegateover15 + d.Steyerdelegateun15
        d.Warrendelegates = d.Warrendelegateover15 + d.Warrendelegateun15
        d.Yangdelegates = d.Yangdelegateover15 + d.Yangdelegateun15
    
        return d;
      })
    
      var secondSectionResults = [{ Candidate: "Biden", Delegates: d3.sum(secondSection, d => d.Bidendelegates), dropOut: firstSectionResults[0].dropOut },
      { Candidate: "Bloomberg", Delegates: d3.sum(secondSection, d => d.Bloombergdelegates), dropOut: firstSectionResults[1].dropOut },
      { Candidate: "Buttigieg", Delegates: d3.sum(secondSection, d => d.Buttigiegdelegates), dropOut: firstSectionResults[2].dropOut },
      { Candidate: "Klobuchar", Delegates: d3.sum(secondSection, d => d.Klobuchardelegates), dropOut: firstSectionResults[3].dropOut },
      { Candidate: "Sanders", Delegates: d3.sum(secondSection, d => d.Sandersdelegates), dropOut: firstSectionResults[4].dropOut },
      { Candidate: "Steyer", Delegates: d3.sum(secondSection, d => d.Steyerdelegates), dropOut: firstSectionResults[5].dropOut },
      { Candidate: "Warren", Delegates: d3.sum(secondSection, d => d.Warrendelegates), dropOut: firstSectionResults[6].dropOut },
      { Candidate: "Yang", Delegates: d3.sum(secondSection, d => d.Yangdelegates), dropOut: firstSectionResults[7].dropOut },
      ]
    
      secondSectionResults.forEach(function (d) {
        d.dropOut = d.dropOut == 1 ? 1 : d.Delegates == 0 ? 1 : d.Delegates < 75 ? Math.random() < .50 ? 1 : 0 : 0;
        return d;
      })
      secondSectionResults[1].dropOut = 0
      //mar. 10 & mar. 17
    
      var thirdSection = dataadj.slice(20, 30)
    
    
      var thirdSection = thirdSection.map((d, k) => {
        d.Bidenstd = 20
        d.Bloombergstd = 20
        d.Buttigiegstd = 20
        d.Klobucharstd = 20
        d.Sandersstd = 20
        d.Steyerstd = 20
        d.Warrenstd = 20
        d.Yangstd = 20
        d.Bidenvoteraw = secondSectionResults[0].dropOut == 1 ? 0 : jStat.normal.inv((Bidensimulation * 3 + Math.random()) / 4, d.Bidenproj, d.Bidenstd);
        d.Bloombergvoteraw = secondSectionResults[1].dropOut == 1 ? 0 : jStat.normal.inv((Bloombergsimulation * 3 + Math.random()) / 4, d.Bloombergproj, d.Bloombergstd);
        d.Buttigiegvoteraw = secondSectionResults[2].dropOut == 1 ? 0 : jStat.normal.inv((Buttigiegsimulation * 3 + Math.random()) / 4, d.Buttigiegproj, d.Buttigiegstd);
        d.Klobucharvoteraw = secondSectionResults[3].dropOut == 1 ? 0 : jStat.normal.inv((Klobucharsimulation * 3 + Math.random()) / 4, d.Klobucharproj, d.Klobucharstd);
        d.Sandersvoteraw = secondSectionResults[4].dropOut == 1 ? 0 : jStat.normal.inv((Sanderssimulation * 3 + Math.random()) / 4, d.Sandersproj, d.Sandersstd);
        d.Steyervoteraw = secondSectionResults[5].dropOut == 1 ? 0 : jStat.normal.inv((Steyersimulation * 3 + Math.random()) / 4, d.Steyerproj, d.Steyerstd);
        d.Warrenvoteraw = secondSectionResults[6].dropOut == 1 ? 0 : jStat.normal.inv((Warrensimulation * 3 + Math.random()) / 4, d.Warrenproj, d.Warrenstd);
        d.Yangvoteraw = secondSectionResults[7].dropOut == 1 ? 0 : jStat.normal.inv((Yangsimulation * 3 + Math.random()) / 4, d.Yangproj, d.Yangstd);
        d.Bidenvoteraw = d.Bidenvoteraw > 0 ? d.Bidenvoteraw : 0;
        d.Bloombergvoteraw = d.Bloombergvoteraw > 0 ? d.Bloombergvoteraw : 0;
        d.Buttigiegvoteraw = d.Buttigiegvoteraw > 0 ? d.Buttigiegvoteraw : 0;
        d.Klobucharvoteraw = d.Klobucharvoteraw > 0 ? d.Klobucharvoteraw : 0;
        d.Sandersvoteraw = d.Sandersvoteraw > 0 ? d.Sandersvoteraw : 0;
        d.Steyervoteraw = d.Steyervoteraw > 0 ? d.Steyervoteraw : 0;
        d.Warrenvoteraw = d.Warrenvoteraw > 0 ? d.Warrenvoteraw : 0;
        d.Yangvoteraw = d.Yangvoteraw > 0 ? d.Yangvoteraw : 0;
        d.sumvoteraw = d.Bidenvoteraw + d.Bloombergvoteraw + d.Buttigiegvoteraw + d.Klobucharvoteraw + d.Sandersvoteraw + d.Steyervoteraw + d.Warrenvoteraw + d.Yangvoteraw
        d.candsabove0 = (d.Bidenvoteraw > 0 ? 1 : 0) + (d.Bloombergvoteraw > 0 ? 1 : 0) + (d.Buttigiegvoteraw > 0 ? 1 : 0) + (d.Klobucharvoteraw > 0 ? 1 : 0) + (d.Sandersvoteraw > 0 ? 1 : 0) + (d.Steyervoteraw > 0 ? 1 : 0) + (d.Warrenvoteraw > 0 ? 1 : 0) + (d.Yangvoteraw > 0 ? 1 : 0)
        d.sumdistribute = (100 - d.sumvoteraw) / 2
        d.distributeper = d.sumdistribute / d.candsabove0
        d.Bidenvote = d.Bidenvoteraw == 0 ? 0 : d.Bidenvoteraw + d.distributeper + ((d.Bidenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Bloombergvote = d.Bloombergvoteraw == 0 ? 0 : d.Bloombergvoteraw + d.distributeper + ((d.Bloombergvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Buttigiegvote = d.Buttigiegvoteraw == 0 ? 0 : d.Buttigiegvoteraw + d.distributeper + ((d.Buttigiegvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Klobucharvote = d.Klobucharvoteraw == 0 ? 0 : d.Klobucharvoteraw + d.distributeper + ((d.Klobucharvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Sandersvote = d.Sandersvoteraw == 0 ? 0 : d.Sandersvoteraw + d.distributeper + ((d.Sandersvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Steyervote = d.Steyervoteraw == 0 ? 0 : d.Steyervoteraw + d.distributeper + ((d.Steyervoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Warrenvote = d.Warrenvoteraw == 0 ? 0 : d.Warrenvoteraw + d.distributeper + ((d.Warrenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Yangvote = d.Yangvoteraw == 0 ? 0 : d.Yangvoteraw + d.distributeper + ((d.Yangvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Bidenov15 = d.Bidenvote > 15 ? d.Bidenvote : 0
        d.Bloombergov15 = d.Bloombergvote > 15 ? d.Bloombergvote : 0
        d.Buttigiegov15 = d.Buttigiegvote > 15 ? d.Buttigiegvote : 0
        d.Klobucharov15 = d.Klobucharvote > 15 ? d.Klobucharvote : 0
        d.Sandersov15 = d.Sandersvote > 15 ? d.Sandersvote : 0
        d.Steyerov15 = d.Steyervote > 15 ? d.Steyervote : 0
        d.Warrenov15 = d.Warrenvote > 15 ? d.Warrenvote : 0
        d.Yangov15 = d.Yangvote > 15 ? d.Yangvote : 0
        d.sumover15 = d.Bidenov15 + d.Bloombergov15 + d.Buttigiegov15 + d.Klobucharov15 + d.Sandersov15 + d.Steyerov15 + d.Warrenov15 + d.Yangov15
        d.Bidendelegateun15 = d.Bidenov15 == 0 ? Math.round((300 * Math.pow(d.Bidenvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Bloombergdelegateun15 = d.Bloombergov15 == 0 ? Math.round((300 * Math.pow(d.Bloombergvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Buttigiegdelegateun15 = d.Buttigiegov15 == 0 ? Math.round((300 * Math.pow(d.Buttigiegvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Klobuchardelegateun15 = d.Klobcharov15 == 0 ? Math.round((300 * Math.pow(d.Klobucharvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Sandersdelegateun15 = d.Sandersov15 == 0 ? Math.round((300 * Math.pow(d.Sandersvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Steyerdelegateun15 = d.Steyerov15 == 0 ? Math.round((300 * Math.pow(d.Steyervote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Warrendelegateun15 = d.Warrenov15 == 0 ? Math.round((300 * Math.pow(d.Warrenvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Yangdelegateun15 = d.Yangov15 == 0 ? Math.round((300 * Math.pow(d.Yangvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.over15delegates = d.delegates - d.Bidendelegateun15 - d.Bloombergdelegateun15 - d.Buttigiegdelegateun15 - d.Klobuchardelegateun15 - d.Sandersdelegateun15 - d.Steyerdelegateun15 - d.Warrendelegateun15 - d.Yangdelegateun15
        d.Bidendelegateover15 = Math.round((d.Bidenov15 / d.sumover15) * d.over15delegates)
        d.Bloombergdelegateover15 = Math.round((d.Bloombergov15 / d.sumover15) * d.over15delegates)
        d.Buttigiegdelegateover15 = Math.round((d.Buttigiegov15 / d.sumover15) * d.over15delegates)
        d.Klobuchardelegateover15 = Math.round((d.Klobucharov15 / d.sumover15) * d.over15delegates)
        d.Sandersdelegateover15 = Math.round((d.Sandersov15 / d.sumover15) * d.over15delegates)
        d.Steyerdelegateover15 = Math.round((d.Steyerov15 / d.sumover15) * d.over15delegates)
        d.Warrendelegateover15 = Math.round((d.Warrenov15 / d.sumover15) * d.over15delegates)
        d.Yangdelegateover15 = Math.round((d.Yangov15 / d.sumover15) * d.over15delegates)
        d.Bidendelegates = d.Bidendelegateover15 + d.Bidendelegateun15
        d.Bloombergdelegates = d.Bloombergdelegateover15 + d.Bloombergdelegateun15
        d.Buttigiegdelegates = d.Buttigiegdelegateover15 + d.Buttigiegdelegateun15
        d.Klobuchardelegates = d.Klobuchardelegateover15 + d.Klobuchardelegateun15
        d.Sandersdelegates = d.Sandersdelegateover15 + d.Sandersdelegateun15
        d.Steyerdelegates = d.Steyerdelegateover15 + d.Steyerdelegateun15
        d.Warrendelegates = d.Warrendelegateover15 + d.Warrendelegateun15
        d.Yangdelegates = d.Yangdelegateover15 + d.Yangdelegateun15
    
        return d;
      })
    
      var thirdSectionResults = [{ Candidate: "Biden", Delegates: d3.sum(thirdSection, d => d.Bidendelegates), dropOut: secondSectionResults[0].dropOut },
      { Candidate: "Bloomberg", Delegates: d3.sum(thirdSection, d => d.Bloombergdelegates), dropOut: secondSectionResults[1].dropOut },
      { Candidate: "Buttigieg", Delegates: d3.sum(thirdSection, d => d.Buttigiegdelegates), dropOut: secondSectionResults[2].dropOut },
      { Candidate: "Klobuchar", Delegates: d3.sum(thirdSection, d => d.Klobuchardelegates), dropOut: secondSectionResults[3].dropOut },
      { Candidate: "Sanders", Delegates: d3.sum(thirdSection, d => d.Sandersdelegates), dropOut: secondSectionResults[4].dropOut },
      { Candidate: "Steyer", Delegates: d3.sum(thirdSection, d => d.Steyerdelegates), dropOut: secondSectionResults[5].dropOut },
      { Candidate: "Warren", Delegates: d3.sum(thirdSection, d => d.Warrendelegates), dropOut: secondSectionResults[6].dropOut },
      { Candidate: "Yang", Delegates: d3.sum(thirdSection, d => d.Yangdelegates), dropOut: secondSectionResults[7].dropOut },
      ]
    
      thirdSectionResults.forEach(function (d) {
        d.dropOut = d.dropOut == 1 ? 1 : d.Delegates == 0 ? 1 : d.Delegates < 150 ? Math.random() < 100 ? 1 : 0 : 0;
        return d;
      })
    
      //mar. 18 - Apr. 28
    
      var fourthSection = dataadj.slice(30, 44)
    
    
      var fourthSection = fourthSection.map((d, k) => {
        d.Bidenstd = 22
        d.Bloombergstd = 22
        d.Buttigiegstd = 22
        d.Klobucharstd = 22
        d.Sandersstd = 22
        d.Steyerstd = 22
        d.Warrenstd = 22
        d.Yangstd = 22
        d.Bidenvoteraw = thirdSectionResults[0].dropOut == 1 ? 0 : jStat.normal.inv((Bidensimulation * 3 + Math.random()) / 4, d.Bidenproj, d.Bidenstd);
        d.Bloombergvoteraw = thirdSectionResults[1].dropOut == 1 ? 0 : jStat.normal.inv((Bloombergsimulation * 3 + Math.random()) / 4, d.Bloombergproj, d.Bloombergstd);
        d.Buttigiegvoteraw = thirdSectionResults[2].dropOut == 1 ? 0 : jStat.normal.inv((Buttigiegsimulation * 3 + Math.random()) / 4, d.Buttigiegproj, d.Buttigiegstd);
        d.Klobucharvoteraw = thirdSectionResults[3].dropOut == 1 ? 0 : jStat.normal.inv((Klobucharsimulation * 3 + Math.random()) / 4, d.Klobucharproj, d.Klobucharstd);
        d.Sandersvoteraw = thirdSectionResults[4].dropOut == 1 ? 0 : jStat.normal.inv((Sanderssimulation * 3 + Math.random()) / 4, d.Sandersproj, d.Sandersstd);
        d.Steyervoteraw = thirdSectionResults[5].dropOut == 1 ? 0 : jStat.normal.inv((Steyersimulation * 3 + Math.random()) / 4, d.Steyerproj, d.Steyerstd);
        d.Warrenvoteraw = thirdSectionResults[6].dropOut == 1 ? 0 : jStat.normal.inv((Warrensimulation * 3 + Math.random()) / 4, d.Warrenproj, d.Warrenstd);
        d.Yangvoteraw = thirdSectionResults[7].dropOut == 1 ? 0 : jStat.normal.inv((Yangsimulation * 3 + Math.random()) / 4, d.Yangproj, d.Yangstd);
        d.Bidenvoteraw = d.Bidenvoteraw > 0 ? d.Bidenvoteraw : 0;
        d.Bloombergvoteraw = d.Bloombergvoteraw > 0 ? d.Bloombergvoteraw : 0;
        d.Buttigiegvoteraw = d.Buttigiegvoteraw > 0 ? d.Buttigiegvoteraw : 0;
        d.Klobucharvoteraw = d.Klobucharvoteraw > 0 ? d.Klobucharvoteraw : 0;
        d.Sandersvoteraw = d.Sandersvoteraw > 0 ? d.Sandersvoteraw : 0;
        d.Steyervoteraw = d.Steyervoteraw > 0 ? d.Steyervoteraw : 0;
        d.Warrenvoteraw = d.Warrenvoteraw > 0 ? d.Warrenvoteraw : 0;
        d.Yangvoteraw = d.Yangvoteraw > 0 ? d.Yangvoteraw : 0;
        d.sumvoteraw = d.Bidenvoteraw + d.Bloombergvoteraw + d.Buttigiegvoteraw + d.Klobucharvoteraw + d.Sandersvoteraw + d.Steyervoteraw + d.Warrenvoteraw + d.Yangvoteraw
        d.candsabove0 = (d.Bidenvoteraw > 0 ? 1 : 0) + (d.Bloombergvoteraw > 0 ? 1 : 0) + (d.Buttigiegvoteraw > 0 ? 1 : 0) + (d.Klobucharvoteraw > 0 ? 1 : 0) + (d.Sandersvoteraw > 0 ? 1 : 0) + (d.Steyervoteraw > 0 ? 1 : 0) + (d.Warrenvoteraw > 0 ? 1 : 0) + (d.Yangvoteraw > 0 ? 1 : 0)
        d.sumdistribute = (100 - d.sumvoteraw) / 2
        d.distributeper = d.sumdistribute / d.candsabove0
        d.Bidenvote = d.Bidenvoteraw == 0 ? 0 : d.Bidenvoteraw + d.distributeper + ((d.Bidenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Bloombergvote = d.Bloombergvoteraw == 0 ? 0 : d.Bloombergvoteraw + d.distributeper + ((d.Bloombergvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Buttigiegvote = d.Buttigiegvoteraw == 0 ? 0 : d.Buttigiegvoteraw + d.distributeper + ((d.Buttigiegvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Klobucharvote = d.Klobucharvoteraw == 0 ? 0 : d.Klobucharvoteraw + d.distributeper + ((d.Klobucharvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Sandersvote = d.Sandersvoteraw == 0 ? 0 : d.Sandersvoteraw + d.distributeper + ((d.Sandersvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Steyervote = d.Steyervoteraw == 0 ? 0 : d.Steyervoteraw + d.distributeper + ((d.Steyervoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Warrenvote = d.Warrenvoteraw == 0 ? 0 : d.Warrenvoteraw + d.distributeper + ((d.Warrenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Yangvote = d.Yangvoteraw == 0 ? 0 : d.Yangvoteraw + d.distributeper + ((d.Yangvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Bidenov15 = d.Bidenvote > 15 ? d.Bidenvote : 0
        d.Bloombergov15 = d.Bloombergvote > 15 ? d.Bloombergvote : 0
        d.Buttigiegov15 = d.Buttigiegvote > 15 ? d.Buttigiegvote : 0
        d.Klobucharov15 = d.Klobucharvote > 15 ? d.Klobucharvote : 0
        d.Sandersov15 = d.Sandersvote > 15 ? d.Sandersvote : 0
        d.Steyerov15 = d.Steyervote > 15 ? d.Steyervote : 0
        d.Warrenov15 = d.Warrenvote > 15 ? d.Warrenvote : 0
        d.Yangov15 = d.Yangvote > 15 ? d.Yangvote : 0
        d.sumover15 = d.Bidenov15 + d.Bloombergov15 + d.Buttigiegov15 + d.Klobucharov15 + d.Sandersov15 + d.Steyerov15 + d.Warrenov15 + d.Yangov15
        d.Bidendelegateun15 = d.Bidenov15 == 0 ? Math.round((300 * Math.pow(d.Bidenvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Bloombergdelegateun15 = d.Bloombergov15 == 0 ? Math.round((300 * Math.pow(d.Bloombergvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Buttigiegdelegateun15 = d.Buttigiegov15 == 0 ? Math.round((300 * Math.pow(d.Buttigiegvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Klobuchardelegateun15 = d.Klobcharov15 == 0 ? Math.round((300 * Math.pow(d.Klobucharvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Sandersdelegateun15 = d.Sandersov15 == 0 ? Math.round((300 * Math.pow(d.Sandersvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Steyerdelegateun15 = d.Steyerov15 == 0 ? Math.round((300 * Math.pow(d.Steyervote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Warrendelegateun15 = d.Warrenov15 == 0 ? Math.round((300 * Math.pow(d.Warrenvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Yangdelegateun15 = d.Yangov15 == 0 ? Math.round((300 * Math.pow(d.Yangvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.over15delegates = d.delegates - d.Bidendelegateun15 - d.Bloombergdelegateun15 - d.Buttigiegdelegateun15 - d.Klobuchardelegateun15 - d.Sandersdelegateun15 - d.Steyerdelegateun15 - d.Warrendelegateun15 - d.Yangdelegateun15
        d.Bidendelegateover15 = Math.round((d.Bidenov15 / d.sumover15) * d.over15delegates)
        d.Bloombergdelegateover15 = Math.round((d.Bloombergov15 / d.sumover15) * d.over15delegates)
        d.Buttigiegdelegateover15 = Math.round((d.Buttigiegov15 / d.sumover15) * d.over15delegates)
        d.Klobuchardelegateover15 = Math.round((d.Klobucharov15 / d.sumover15) * d.over15delegates)
        d.Sandersdelegateover15 = Math.round((d.Sandersov15 / d.sumover15) * d.over15delegates)
        d.Steyerdelegateover15 = Math.round((d.Steyerov15 / d.sumover15) * d.over15delegates)
        d.Warrendelegateover15 = Math.round((d.Warrenov15 / d.sumover15) * d.over15delegates)
        d.Yangdelegateover15 = Math.round((d.Yangov15 / d.sumover15) * d.over15delegates)
        d.Bidendelegates = d.Bidendelegateover15 + d.Bidendelegateun15
        d.Bloombergdelegates = d.Bloombergdelegateover15 + d.Bloombergdelegateun15
        d.Buttigiegdelegates = d.Buttigiegdelegateover15 + d.Buttigiegdelegateun15
        d.Klobuchardelegates = d.Klobuchardelegateover15 + d.Klobuchardelegateun15
        d.Sandersdelegates = d.Sandersdelegateover15 + d.Sandersdelegateun15
        d.Steyerdelegates = d.Steyerdelegateover15 + d.Steyerdelegateun15
        d.Warrendelegates = d.Warrendelegateover15 + d.Warrendelegateun15
        d.Yangdelegates = d.Yangdelegateover15 + d.Yangdelegateun15
    
        return d;
      })
    
      var fourthSectionResults = [{ Candidate: "Biden", Delegates: d3.sum(fourthSection, d => d.Bidendelegates), dropOut: thirdSectionResults[0].dropOut },
      { Candidate: "Bloomberg", Delegates: d3.sum(fourthSection, d => d.Bloombergdelegates), dropOut: thirdSectionResults[1].dropOut },
      { Candidate: "Buttigieg", Delegates: d3.sum(fourthSection, d => d.Buttigiegdelegates), dropOut: thirdSectionResults[2].dropOut },
      { Candidate: "Klobuchar", Delegates: d3.sum(fourthSection, d => d.Klobuchardelegates), dropOut: thirdSectionResults[3].dropOut },
      { Candidate: "Sanders", Delegates: d3.sum(fourthSection, d => d.Sandersdelegates), dropOut: thirdSectionResults[4].dropOut },
      { Candidate: "Steyer", Delegates: d3.sum(fourthSection, d => d.Steyerdelegates), dropOut: thirdSectionResults[5].dropOut },
      { Candidate: "Warren", Delegates: d3.sum(fourthSection, d => d.Warrendelegates), dropOut: thirdSectionResults[6].dropOut },
      { Candidate: "Yang", Delegates: d3.sum(fourthSection, d => d.Yangdelegates), dropOut: thirdSectionResults[7].dropOut },
      ]
    
      fourthSectionResults.forEach(function (d) {
        d.dropOut = d.dropOut == 1 ? 1 : d.Delegates == 0 ? 1 : d.Delegates < 300 ? Math.random() < 1 ? 1 : 0 : 0;
        return d;
      })
    
      //final
    
      var finalSection = dataadj.slice(44, 57)
    
    
      var finalSection = finalSection.map((d, k) => {
        d.Bidenstd = 23
        d.Bloombergstd = 23
        d.Buttigiegstd = 23
        d.Klobucharstd = 23
        d.Sandersstd = 23
        d.Steyerstd = 23
        d.Warrenstd = 23
        d.Yangstd = 23
        d.Bidenvoteraw = fourthSectionResults[0].dropOut == 1 ? 0 : jStat.normal.inv((Bidensimulation * 3 + Math.random()) / 4, d.Bidenproj, d.Bidenstd);
        d.Bloombergvoteraw = fourthSectionResults[1].dropOut == 1 ? 0 : jStat.normal.inv((Bloombergsimulation * 3 + Math.random()) / 4, d.Bloombergproj, d.Bloombergstd);
        d.Buttigiegvoteraw = fourthSectionResults[2].dropOut == 1 ? 0 : jStat.normal.inv((Buttigiegsimulation * 3 + Math.random()) / 4, d.Buttigiegproj, d.Buttigiegstd);
        d.Klobucharvoteraw = fourthSectionResults[3].dropOut == 1 ? 0 : jStat.normal.inv((Klobucharsimulation * 3 + Math.random()) / 4, d.Klobucharproj, d.Klobucharstd);
        d.Sandersvoteraw = fourthSectionResults[4].dropOut == 1 ? 0 : jStat.normal.inv((Sanderssimulation * 3 + Math.random()) / 4, d.Sandersproj, d.Sandersstd);
        d.Steyervoteraw = fourthSectionResults[5].dropOut == 1 ? 0 : jStat.normal.inv((Steyersimulation * 3 + Math.random()) / 4, d.Steyerproj, d.Steyerstd);
        d.Warrenvoteraw = fourthSectionResults[6].dropOut == 1 ? 0 : jStat.normal.inv((Warrensimulation * 3 + Math.random()) / 4, d.Warrenproj, d.Warrenstd);
        d.Yangvoteraw = fourthSectionResults[7].dropOut == 1 ? 0 : jStat.normal.inv((Yangsimulation * 3 + Math.random()) / 4, d.Yangproj, d.Yangstd);
        d.Bidenvoteraw = d.Bidenvoteraw > 0 ? d.Bidenvoteraw : 0;
        d.Bloombergvoteraw = d.Bloombergvoteraw > 0 ? d.Bloombergvoteraw : 0;
        d.Buttigiegvoteraw = d.Buttigiegvoteraw > 0 ? d.Buttigiegvoteraw : 0;
        d.Klobucharvoteraw = d.Klobucharvoteraw > 0 ? d.Klobucharvoteraw : 0;
        d.Sandersvoteraw = d.Sandersvoteraw > 0 ? d.Sandersvoteraw : 0;
        d.Steyervoteraw = d.Steyervoteraw > 0 ? d.Steyervoteraw : 0;
        d.Warrenvoteraw = d.Warrenvoteraw > 0 ? d.Warrenvoteraw : 0;
        d.Yangvoteraw = d.Yangvoteraw > 0 ? d.Yangvoteraw : 0;
        d.sumvoteraw = d.Bidenvoteraw + d.Bloombergvoteraw + d.Buttigiegvoteraw + d.Klobucharvoteraw + d.Sandersvoteraw + d.Steyervoteraw + d.Warrenvoteraw + d.Yangvoteraw
        d.candsabove0 = (d.Bidenvoteraw > 0 ? 1 : 0) + (d.Bloombergvoteraw > 0 ? 1 : 0) + (d.Buttigiegvoteraw > 0 ? 1 : 0) + (d.Klobucharvoteraw > 0 ? 1 : 0) + (d.Sandersvoteraw > 0 ? 1 : 0) + (d.Steyervoteraw > 0 ? 1 : 0) + (d.Warrenvoteraw > 0 ? 1 : 0) + (d.Yangvoteraw > 0 ? 1 : 0)
        d.sumdistribute = (100 - d.sumvoteraw) / 2
        d.distributeper = d.sumdistribute / d.candsabove0
        d.Bidenvote = d.Bidenvoteraw == 0 ? 0 : d.Bidenvoteraw + d.distributeper + ((d.Bidenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Bloombergvote = d.Bloombergvoteraw == 0 ? 0 : d.Bloombergvoteraw + d.distributeper + ((d.Bloombergvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Buttigiegvote = d.Buttigiegvoteraw == 0 ? 0 : d.Buttigiegvoteraw + d.distributeper + ((d.Buttigiegvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Klobucharvote = d.Klobucharvoteraw == 0 ? 0 : d.Klobucharvoteraw + d.distributeper + ((d.Klobucharvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Sandersvote = d.Sandersvoteraw == 0 ? 0 : d.Sandersvoteraw + d.distributeper + ((d.Sandersvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Steyervote = d.Steyervoteraw == 0 ? 0 : d.Steyervoteraw + d.distributeper + ((d.Steyervoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Warrenvote = d.Warrenvoteraw == 0 ? 0 : d.Warrenvoteraw + d.distributeper + ((d.Warrenvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Yangvote = d.Yangvoteraw == 0 ? 0 : d.Yangvoteraw + d.distributeper + ((d.Yangvoteraw / ((d.sumvoteraw / 100))) * (d.sumdistribute / 100))
        d.Bidenov15 = d.Bidenvote > 15 ? d.Bidenvote : 0
        d.Bloombergov15 = d.Bloombergvote > 15 ? d.Bloombergvote : 0
        d.Buttigiegov15 = d.Buttigiegvote > 15 ? d.Buttigiegvote : 0
        d.Klobucharov15 = d.Klobucharvote > 15 ? d.Klobucharvote : 0
        d.Sandersov15 = d.Sandersvote > 15 ? d.Sandersvote : 0
        d.Steyerov15 = d.Steyervote > 15 ? d.Steyervote : 0
        d.Warrenov15 = d.Warrenvote > 15 ? d.Warrenvote : 0
        d.Yangov15 = d.Yangvote > 15 ? d.Yangvote : 0
        d.sumover15 = d.Bidenov15 + d.Bloombergov15 + d.Buttigiegov15 + d.Klobucharov15 + d.Sandersov15 + d.Steyerov15 + d.Warrenov15 + d.Yangov15
        d.Bidendelegateun15 = d.Bidenov15 == 0 ? Math.round((300 * Math.pow(d.Bidenvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Bloombergdelegateun15 = d.Bloombergov15 == 0 ? Math.round((300 * Math.pow(d.Bloombergvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Buttigiegdelegateun15 = d.Buttigiegov15 == 0 ? Math.round((300 * Math.pow(d.Buttigiegvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Klobuchardelegateun15 = d.Klobcharov15 == 0 ? Math.round((300 * Math.pow(d.Klobucharvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Sandersdelegateun15 = d.Sandersov15 == 0 ? Math.round((300 * Math.pow(d.Sandersvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Steyerdelegateun15 = d.Steyerov15 == 0 ? Math.round((300 * Math.pow(d.Steyervote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Warrendelegateun15 = d.Warrenov15 == 0 ? Math.round((300 * Math.pow(d.Warrenvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.Yangdelegateun15 = d.Yangov15 == 0 ? Math.round((300 * Math.pow(d.Yangvote / 100, 4) - 0.0006) * d.delegates) : 0;
        d.over15delegates = d.delegates - d.Bidendelegateun15 - d.Bloombergdelegateun15 - d.Buttigiegdelegateun15 - d.Klobuchardelegateun15 - d.Sandersdelegateun15 - d.Steyerdelegateun15 - d.Warrendelegateun15 - d.Yangdelegateun15
        d.Bidendelegateover15 = Math.round((d.Bidenov15 / d.sumover15) * d.over15delegates)
        d.Bloombergdelegateover15 = Math.round((d.Bloombergov15 / d.sumover15) * d.over15delegates)
        d.Buttigiegdelegateover15 = Math.round((d.Buttigiegov15 / d.sumover15) * d.over15delegates)
        d.Klobuchardelegateover15 = Math.round((d.Klobucharov15 / d.sumover15) * d.over15delegates)
        d.Sandersdelegateover15 = Math.round((d.Sandersov15 / d.sumover15) * d.over15delegates)
        d.Steyerdelegateover15 = Math.round((d.Steyerov15 / d.sumover15) * d.over15delegates)
        d.Warrendelegateover15 = Math.round((d.Warrenov15 / d.sumover15) * d.over15delegates)
        d.Yangdelegateover15 = Math.round((d.Yangov15 / d.sumover15) * d.over15delegates)
        d.Bidendelegates = d.Bidendelegateover15 + d.Bidendelegateun15
        d.Bloombergdelegates = d.Bloombergdelegateover15 + d.Bloombergdelegateun15
        d.Buttigiegdelegates = d.Buttigiegdelegateover15 + d.Buttigiegdelegateun15
        d.Klobuchardelegates = d.Klobuchardelegateover15 + d.Klobuchardelegateun15
        d.Sandersdelegates = d.Sandersdelegateover15 + d.Sandersdelegateun15
        d.Steyerdelegates = d.Steyerdelegateover15 + d.Steyerdelegateun15
        d.Warrendelegates = d.Warrendelegateover15 + d.Warrendelegateun15
        d.Yangdelegates = d.Yangdelegateover15 + d.Yangdelegateun15
    
        return d;
      })
    
      var finalSectionResults = [{ Candidate: "Biden", Delegates: d3.sum(finalSection, d => d.Bidendelegates), dropOut: fourthSectionResults[0].dropOut },
      { Candidate: "Bloomberg", Delegates: d3.sum(finalSection, d => d.Bloombergdelegates), dropOut: fourthSectionResults[1].dropOut },
      { Candidate: "Buttigieg", Delegates: d3.sum(finalSection, d => d.Buttigiegdelegates), dropOut: fourthSectionResults[2].dropOut },
      { Candidate: "Klobuchar", Delegates: d3.sum(finalSection, d => d.Klobuchardelegates), dropOut: fourthSectionResults[3].dropOut },
      { Candidate: "Sanders", Delegates: d3.sum(finalSection, d => d.Sandersdelegates), dropOut: fourthSectionResults[4].dropOut },
      { Candidate: "Steyer", Delegates: d3.sum(finalSection, d => d.Steyerdelegates), dropOut: fourthSectionResults[5].dropOut },
      { Candidate: "Warren", Delegates: d3.sum(finalSection, d => d.Warrendelegates), dropOut: fourthSectionResults[6].dropOut },
      { Candidate: "Yang", Delegates: d3.sum(finalSection, d => d.Yangdelegates), dropOut: fourthSectionResults[7].dropOut },
      ]
    
      finalSectionResults.forEach(function (d) {
        d.dropOut = d.dropOut == 1 ? 1 : d.Delegates == 0 ? 1 : d.Delegates < 0 ? Math.random() < 50 ? 1 : 0 : 0;
        return d;
      })
    
    
    
    
    
    
      var rawsimulation = firstSection.concat(secondSection)
      var rawsimulation = rawsimulation.concat(thirdSection)
      var rawsimulation = rawsimulation.concat(fourthSection)
      var rawsimulation = rawsimulation.concat(finalSection)
      rawsimulation.forEach(function (d) {
        d.Bidentotvote = d.Bidenvote * d.voteperc;
        d.Bloombergtotvote = d.Bloombergvote * d.voteperc;
        d.Buttigiegtotvote = d.Buttigiegvote * d.voteperc;
        d.Klobuchartotvote = d.Klobucharvote * d.voteperc;
        d.Sanderstotvote = d.Sandersvote * d.voteperc;
        d.Steyertotvote = d.Steyervote * d.voteperc;
        d.Warrentotvote = d.Warrenvote * d.voteperc;
        d.Yangtotvote = d.Yangvote * d.voteperc;
        return d;
      })
    
      var rawsimulation = rawsimulation.map((d, k) => {
        d.winner = Math.max(d.Bidenvote, d.Bloombergvote, d.Buttigiegvote, d.Klobucharvote, d.Sandersvote, d.Steyervote, d.Warrenvote, d.Yangvote)
        d.Bidenwin = d.winner == d.Bidenvote ? 1 : 0
        d.Bloombergwin = d.winner == d.Bloombergvote ? 1 : 0
        d.Buttigiegwin = d.winner == d.Buttigiegvote ? 1 : 0
        d.Klobucharwin = d.winner == d.Klobucharvote ? 1 : 0
        d.Sanderswin = d.winner == d.Sandersvote ? 1 : 0
        d.Steyerwin = d.winner == d.Steyervote ? 1 : 0
        d.Warrenwin = d.winner == d.Warrenvote ? 1 : 0
        d.Yangwin = d.winner == d.Yangvote ? 1 : 0
        d.winner = d.Bidenwin == 1 ? "Biden" : d.Bloombergwin == 1 ? "Bloomberg" : d.Buttigiegwin == 1 ? "Buttigieg" : d.Klobucharwin == 1 ? "Klobuchar" : d.Sanderswin == 1 ? "Sanders" : d.Steyerwin == 1 ? "Steyer" : d.Warenwin == 1 ? "Warren" : "Yang"
        return d;
      })
    
    
      var simulation = rawsimulation.map((d, k) => {
        return {
          state: d.state,
          date: d.date,
          delegates: +d.delegates,
          winner: d.winner,
          Bidenvote: +d.Bidenvote,
          Bloombergvote: +d.Bloombergvote,
          Buttigiegvote: +d.Buttigiegvote,
          Klobucharvote: +d.Klobucharvote,
          Sandersvote: +d.Sandersvote,
          Steyervote: +d.Steyervote,
          Warrenvote: +d.Warrenvote,
          Yangvote: +d.Yangvote,
          Bidendelegates: +d.Bidendelegates,
          Bloombergdelegates: +d.Bloombergdelegates,
          Buttigiegdelegates: +d.Buttigiegdelegates,
          Klobuchardelegates: +d.Klobuchardelegates,
          Sandersdelegates: +d.Sandersdelegates,
          Steyerdelegates: +d.Steyerdelegates,
          Warrendelegates: +d.Warrendelegates,
          Yangdelegates: +d.Yangdelegates,
          Bidenwin: +d.Bidenwin,
          Bloombergwin: +d.Bloombergwin,
          Buttigiegwin: +d.Buttigiegwin,
          Klobucharwin: +d.Klobucharwin,
          Sanderswin: +d.Sanderswin,
          Steyerwin: +d.Steyerwin,
          Warrenwin: +d.Warrenwin,
          Yangwin: +d.Yangwin,
          Bidenpop: +d.Bidentotvote,
          Bloombergpop: +d.Bloombergtotvote,
          Buttigiegpop: +d.Buttigiegtotvote,
          Klobucharpop: +d.Klobuchartotvote,
          Sanderspop: +d.Sanderstotvote,
          Steyerpop: +d.Steyertotvote,
          Warrenpop: +d.Warrentotvote,
          Yangpop: +d.Yangtotvote,
        }
      })
    
      //Final Results
    
    
    
      var Bidendelegates = d3.sum(simulation, d => d.Bidendelegates)
      Bloombergdelegates = d3.sum(simulation, d => d.Bloombergdelegates)
      Buttigiegdelegates = d3.sum(simulation, d => d.Buttigiegdelegates)
      Klobuchardelegates = d3.sum(simulation, d => d.Klobuchardelegates)
      Sandersdelegates = d3.sum(simulation, d => d.Sandersdelegates)
      Steyerdelegates = d3.sum(simulation, d => d.Steyerdelegates)
      Warrendelegates = d3.sum(simulation, d => d.Warrendelegates)
      Yangdelegates = d3.sum(simulation, d => d.Yangdelegates)
    
      Bidenpop = d3.sum(simulation, d => d.Bidenpop)
      Bloombergpop = d3.sum(simulation, d => d.Bloombergpop)
      Buttigiegpop = d3.sum(simulation, d => d.Buttigiegpop)
      Klobucharpop = d3.sum(simulation, d => d.Klobucharpop)
      Sanderspop = d3.sum(simulation, d => d.Sanderspop)
      Steyerpop = d3.sum(simulation, d => d.Steyerpop)
      Warrenpop = d3.sum(simulation, d => d.Warrenpop)
      Yangpop = d3.sum(simulation, d => d.Yangpop)
    
      nomwinner = Math.max(Bidendelegates, Bloombergdelegates, Buttigiegdelegates, Klobuchardelegates, Sandersdelegates, Steyerdelegates, Warrendelegates, Yangdelegates)
      Bidenwin = Bidendelegates == nomwinner ? 1 : 0
      Bloombergwin = Bloombergdelegates == nomwinner ? 1 : 0
      Buttigiegwin = Buttigiegdelegates == nomwinner ? 1 : 0
      Klobucharwin = Klobuchardelegates == nomwinner ? 1 : 0
      Sanderswin = Sandersdelegates == nomwinner ? 1 : 0
      Steyerwin = Steyerdelegates == nomwinner ? 1 : 0
      Warrenwin = Warrendelegates == nomwinner ? 1 : 0
      Yangwin = Yangdelegates == nomwinner ? 1 : 0
      nomwinner = Bidenwin == 1? "Biden":Bloombergwin == 1? "Bloomberg":Buttigiegwin == 1? "Buttigieg":Klobucharwin == 1? "Klobuchar":Sanderswin == 1? "Sanders":Steyerwin == 1? "Steyer":Warrenwin == 1? "Warren":"Yang"
    
    
    
      var usa = {
        state:"US",
        date: new Date(2020, 6, 1),
        delegates: 3879, 
        winner: nomwinner, 
        Bidenvote: Bidenpop, 
        Bloombergvote: Bloombergpop, 
        Buttigiegvote: Buttigiegpop, 
        Klobucharvote: Klobucharpop, 
        Sandersvote: Sanderspop, 
        Steyervote: Steyerpop, 
        Warrenvote: Warrenpop, 
        Yangvote: Yangpop, 
        Bidendelegates: Bidendelegates,
        Bloombergdelegates: Bloombergdelegates,
        Buttigiegdelegates: Buttigiegdelegates,
        Klobuchardelegates: Klobuchardelegates,
        Sandersdelegates: Sandersdelegates,
        Steyerdelegates: Steyerdelegates,
        Warrendelegates: Warrendelegates,
        Yangdelegates: Yangdelegates,
        Bidenwin: Bidenwin,
        Bloombergwin: Bloombergwin,
        Buttigiegwin: Buttigiegwin,
        Klobucharwin: Klobucharwin,
        Sanderswin: Sanderswin,
        Steyerwin: Steyerwin,
        Warrenwin: Warrenwin,
        Yangwin: Yangwin,
        Bidenpop: Bidenpop, 
        Bloombergpop: Bloombergpop, 
        Buttigiegpop: Buttigiegpop, 
        Klobucharpop: Klobucharpop, 
        Sanderspop: Sanderspop, 
        Steyerpop: Steyerpop, 
        Warrenpop: Warrenpop, 
        Yangpop: Yangpop,
      }
    
      var simulationnew = simulation.concat(usa)
      
      
     
    
    
      var states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Marianas', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', "US",'Democrats Abroad']
    
      console.log(states.length)
    
      
     
    
    
        for (let j = 0; j < 58; j++) {
          
          var state = {
            today: simulation_date,
            state: simulationnew[j].state,
            date: projected_vote[j].date,
            delegates: simulationnew[j].delegates,
            Bidenvote: rawvote[j].Bidenvote,
            Bookervote: 0,
            Bloombergvote: 0,
            Buttigiegvote: rawvote[j].Buttigiegvote,
            Klobucharvote: rawvote[j].Klobucharvote,
            Sandersvote: rawvote[j].Sandersvote,
            Steyervote: rawvote[j].Steyervote,
            Warrenvote: rawvote[j].Warrenvote,
            Yangvote: rawvote[j].Yangvote,
            Bidenwin: simulationnew[j].Bidenwin,
            Bookerwin: 0,
            Bloombergwin:  simulationnew[j].Bloombergwin,
            Buttigiegwin: simulationnew[j].Buttigiegwin,
            Klobucharwin: simulationnew[j].Klobucharwin,
            Sanderswin: simulationnew[j].Sanderswin,
            Steyerwin: simulationnew[j].Steyerwin,
            Warrenwin: simulationnew[j].Warrenwin,
            Yangwin: simulationnew[j].Yangwin,
            Bidendelegates: rawvote[j].bi,
            Bookerdelegates: 0,
            Bloombergdelegates: rawvote[j].bl,
            Buttigiegdelegates: rawvote[j].bu,
            Klobuchardelegates: rawvote[j].kl,
            Sandersdelegates: rawvote[j].sa,
            Steyerdelegates: rawvote[j].st,
            Warrendelegates: rawvote[j].wa,
            Yangdelegates: rawvote[j].ya,
            Bidenavgvote: simulationnew[j].Bidenvote,
            Bookeravgvote: 0,
            Bloombergavgvote: simulationnew[j].Bloombergavgvote,
            Buttigiegavgvote: simulationnew[j].Buttigiegvote,
            Klobucharavgvote: simulationnew[j].Klobucharvote,
            Sandersavgvote: simulationnew[j].Sandersvote,
            Steyeravgvote: simulationnew[j].Steyervote,
            Warrenavgvote: simulationnew[j].Warrenvote,
            Yangavgvote: simulationnew[j].Yangdelegates,
            Bidenavgdelegates: simulationnew[j].Bidendelegates,
            Bookeravgdelegates: 0,
            Bloomberavggdelegates: simulationnew[j].Bloombergdelegates,
            Buttigiegavgdelegates: simulationnew[j].Buttigiegdelegates,
            Klobucharavgdelegates: simulationnew[j].Klobuchardelegates,
            Sandersavgdelegates: simulationnew[j].Sandersdelegates,
            Steyeravgdelegates: simulationnew[j].Steyerdelegates,
            Warrenavgdelegates: simulationnew[j].Warrendelegates,
            Yangavgdelegates: simulationnew[j].Yangdelegates}
            dataoutput.push(state)
          }
          
        }
          var finaldata = []
          for (let j = 0; j < 58; j++) {
        var keystate = states[j]
    
        var dataraw = dataoutput.filter(function (d) { return d.state == keystate; })
        
        
        
        var final ={ State: keystate, bidenwin: d3.mean(dataraw,d=>d.Bidenwin),Bloombergwin: d3.mean(dataraw,d=>d.Bloombergwin),sanderswin: d3.mean(dataraw,d=>d.Sanderswin)}
        var final =[formatFinal(dataraw[0].today) , keystate,formatFinal(dataraw[0].date),dataraw[0].delegates,+formatvalue(dataraw[0].Bidenvote),+formatvalue(dataraw[0].Bloombergvote),+formatvalue(dataraw[0].Buttigiegvote),+formatvalue(dataraw[0].Klobucharvote),+formatvalue(dataraw[0].Sandersvote),+formatvalue(dataraw[0].Steyervote),+formatvalue(dataraw[0].Warrenvote),+formatvalue(dataraw[0].Yangvote),Math.round( d3.mean(dataraw,d=>d.Bidenwin)*1000)/10,Math.round( d3.mean(dataraw,d=>d.Bloombergwin)*1000)/10,Math.round( d3.mean(dataraw,d=>d.Buttigiegwin)*1000)/10,Math.round( d3.mean(dataraw,d=>d.Klobucharwin)*1000)/10,Math.round( d3.mean(dataraw,d=>d.Sanderswin)*1000)/10,Math.round( d3.mean(dataraw,d=>d.Steyerwin)*1000)/10,Math.round( d3.mean(dataraw,d=>d.Warrenwin)*1000)/10,Math.round( d3.mean(dataraw,d=>d.Yangwin)*1000)/10,dataraw[0].Bidendelegates,dataraw[0].Bloombergdelegates,dataraw[0].Buttigiegdelegates,dataraw[0].Klobuchardelegates,dataraw[0].Sandersdelegates,dataraw[0].Steyerdelegates,dataraw[0].Warrendelegates,dataraw[0].Yangdelegates,+formatvalue(dataraw[0].Bidenavgdelegates),+formatvalue(dataraw[0].Bloombergdelegates),+formatvalue(dataraw[0].Buttigiegavgdelegates),+formatvalue(dataraw[0].Klobucharavgdelegates),+formatvalue(dataraw[0].Sandersavgdelegates),+formatvalue(dataraw[0].Steyeravgdelegates),+formatvalue(dataraw[0].Warrenavgdelegates),+formatvalue(dataraw[0].Yangavgdelegates)]
        
        finaldata.push(final)
      }
     
      
    //}
    document.getElementById("demo").innerHTML = finaldata.join("<br>")
    //dont go past here
})