
var simulation_date = new Date(2020, 1, 2)
var simulation_date_filter = d3.utcDay.offset(simulation_date, 1)
var time_scale = 86400000
var parse_date = d3.timeParse("%m/%d/%y")
var parse_date_time = d3.timeParse("%m/%d/%y %H:%M")
formatMonth = d3.timeFormat("%m/%d/%y")
var candidates = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Gabbard", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]
var drop_out = ["", "", new Date(2020, 0, 13), "", "", "", "", "", ""]
var entrance = [new Date(2019, 0, 11), new Date(2020, 10, 0), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11), new Date(2019, 0, 11),]


var states_info = [{ "state": "Alabama", "total_delegates": 52, "primary_date": "03/03/20" }, { "state": "Alaska", "total_delegates": 15, "primary_date": "04/04/20" }, { "state": "American Samoa", "total_delegates": 6, "primary_date": "03/03/20" }, { "state": "Arizona", "total_delegates": 67, "primary_date": "03/17/20" }, { "state": "Arkansas", "total_delegates": 31, "primary_date": "03/03/20" }, { "state": "California", "total_delegates": 416, "primary_date": "03/03/20" }, { "state": "Colorado", "total_delegates": 67, "primary_date": "03/03/20" }, { "state": "Connecticut", "total_delegates": 60, "primary_date": "04/28/20" }, { "state": "Delaware", "total_delegates": 21, "primary_date": "04/28/20" }, { "state": "Democrats Abroad", "total_delegates": 13, "primary_date": "03/03/20" }, { "state": "District of Columbia", "total_delegates": 20, "primary_date": "06/02/20" }, { "state": "Florida", "total_delegates": 219, "primary_date": "03/17/20" }, { "state": "Georgia", "total_delegates": 105, "primary_date": "03/24/20" }, { "state": "Guam", "total_delegates": 7, "primary_date": "05/02/20" }, { "state": "Hawaii", "total_delegates": 24, "primary_date": "04/04/20" }, { "state": "Idaho", "total_delegates": 20, "primary_date": "03/10/20" }, { "state": "Illinois", "total_delegates": 155, "primary_date": "03/17/20" }, { "state": "Indiana", "total_delegates": 82, "primary_date": "05/05/20" }, { "state": "Iowa", "total_delegates": 41, "primary_date": "02/03/20" }, { "state": "Kansas", "total_delegates": 39, "primary_date": "05/02/20" }, { "state": "Kentucky", "total_delegates": 54, "primary_date": "05/19/20" }, { "state": "Louisiana", "total_delegates": 54, "primary_date": "04/04/20" }, { "state": "Maine", "total_delegates": 24, "primary_date": "03/03/20" }, { "state": "Maryland", "total_delegates": 96, "primary_date": "04/28/20" }, { "state": "Massachusetts", "total_delegates": 91, "primary_date": "03/03/20" }, { "state": "Michigan", "total_delegates": 125, "primary_date": "03/10/20" }, { "state": "Minnesota", "total_delegates": 75, "primary_date": "03/03/20" }, { "state": "Mississippi", "total_delegates": 36, "primary_date": "03/10/20" }, { "state": "Missouri", "total_delegates": 68, "primary_date": "03/10/20" }, { "state": "Montana", "total_delegates": 19, "primary_date": "06/02/20" }, { "state": "Nebraska", "total_delegates": 29, "primary_date": "05/12/20" }, { "state": "Nevada", "total_delegates": 36, "primary_date": "02/22/20" }, { "state": "New Hampshire", "total_delegates": 24, "primary_date": "02/11/20" }, { "state": "New Jersey", "total_delegates": 126, "primary_date": "06/02/20" }, { "state": "New Mexico", "total_delegates": 34, "primary_date": "06/02/20" }, { "state": "New York", "total_delegates": 274, "primary_date": "04/28/20" }, { "state": "North Carolina", "total_delegates": 110, "primary_date": "03/03/20" }, { "state": "North Dakota", "total_delegates": 14, "primary_date": "03/10/20" }, { "state": "Northern Marianas", "total_delegates": 6, "primary_date": "03/14/20" }, { "state": "Ohio", "total_delegates": 136, "primary_date": "03/17/20" }, { "state": "Oklahoma", "total_delegates": 37, "primary_date": "03/03/20" }, { "state": "Oregon", "total_delegates": 61, "primary_date": "05/19/20" }, { "state": "Pennsylvania", "total_delegates": 186, "primary_date": "04/28/20" }, { "state": "Puerto Rico", "total_delegates": 51, "primary_date": "03/29/20" }, { "state": "Rhode Island", "total_delegates": 26, "primary_date": "04/28/20" }, { "state": "South Carolina", "total_delegates": 54, "primary_date": "02/29/20" }, { "state": "South Dakota", "total_delegates": 16, "primary_date": "06/02/20" }, { "state": "Tennessee", "total_delegates": 64, "primary_date": "03/03/20" }, { "state": "Texas", "total_delegates": 228, "primary_date": "03/03/20" }, { "state": "Utah", "total_delegates": 29, "primary_date": "03/03/20" }, { "state": "Vermont", "total_delegates": 16, "primary_date": "03/03/20" }, { "state": "Virgin Islands", "total_delegates": 7, "primary_date": "06/06/20" }, { "state": "Virginia", "total_delegates": 99, "primary_date": "03/03/20" }, { "state": "Washington", "total_delegates": 89, "primary_date": "03/10/20" }, { "state": "West Virginia", "total_delegates": 28, "primary_date": "05/12/20" }, { "state": "Wisconsin", "total_delegates": 84, "primary_date": "04/07/20" }, { "state": "Wyoming", "total_delegates": 14, "primary_date": "04/04/20" }]
var states_demographic = [{"state":"Alabama","Biden":28.29,"Bloomberg":24.495,"Booker":24.292,"Buttigieg":16.174,"Klobuchar":18.779,"Sanders":14.776,"Steyer":21.256,"Warren":16.491,"Yang":18.449,"Gbbard":20},{"state":"Alaska","Biden":26.936,"Bloomberg":20.55,"Booker":15.974,"Buttigieg":23.316,"Klobuchar":22.637,"Sanders":22.732,"Steyer":21.873,"Warren":22.293,"Yang":21.461,"Gbbard":20},{"state":"American Samoa","Biden":20,"Bloomberg":20,"Booker":20,"Buttigieg":20,"Klobuchar":20,"Sanders":20,"Steyer":20,"Warren":20,"Yang":20,"Gbbard":20},{"state":"Arizona","Biden":32.728,"Bloomberg":20.667,"Booker":17.361,"Buttigieg":21.639,"Klobuchar":21.564,"Sanders":21.525,"Steyer":21.053,"Warren":20.245,"Yang":20.815,"Gbbard":20},{"state":"Arkansas","Biden":26.646,"Bloomberg":25.251,"Booker":21.138,"Buttigieg":19.261,"Klobuchar":21.767,"Sanders":15.741,"Steyer":20.809,"Warren":17.666,"Yang":19.055,"Gbbard":20},{"state":"California","Biden":21.294,"Bloomberg":18.741,"Booker":18.487,"Buttigieg":17.774,"Klobuchar":18.953,"Sanders":22.28,"Steyer":20.528,"Warren":19.901,"Yang":22.632,"Gbbard":20},{"state":"Colorado","Biden":17.174,"Bloomberg":19.815,"Booker":17.443,"Buttigieg":20.475,"Klobuchar":20.578,"Sanders":27.952,"Steyer":21.07,"Warren":20.438,"Yang":21.253,"Gbbard":20},{"state":"Connecticut","Biden":17.986,"Bloomberg":22.58,"Booker":18.716,"Buttigieg":23.867,"Klobuchar":21.113,"Sanders":21.899,"Steyer":21.869,"Warren":23.327,"Yang":20.068,"Gbbard":20},{"state":"Delaware","Biden":38.337,"Bloomberg":22.998,"Booker":18.787,"Buttigieg":24.168,"Klobuchar":21.369,"Sanders":21.47,"Steyer":21.792,"Warren":22.934,"Yang":19.887,"Gbbard":20},{"state":"Democrats Abroad","Biden":20,"Bloomberg":20,"Booker":20,"Buttigieg":20,"Klobuchar":20,"Sanders":20,"Steyer":20,"Warren":20,"Yang":20,"Gbbard":20},{"state":"District of Columbia","Biden":28.552,"Bloomberg":22.827,"Booker":26.199,"Buttigieg":12.978,"Klobuchar":16.019,"Sanders":15.516,"Steyer":21.505,"Warren":15.884,"Yang":18.464,"Gbbard":20},{"state":"Florida","Biden":22.998,"Bloomberg":23.927,"Booker":21.696,"Buttigieg":17.068,"Klobuchar":20.234,"Sanders":15.833,"Steyer":20.351,"Warren":24.061,"Yang":19.402,"Gbbard":20},{"state":"Georgia","Biden":28.046,"Bloomberg":24.304,"Booker":24.08,"Buttigieg":16.051,"Klobuchar":18.728,"Sanders":14.745,"Steyer":21.079,"Warren":16.488,"Yang":18.452,"Gbbard":20},{"state":"Hawaii","Biden":15.369,"Bloomberg":18.628,"Booker":17.966,"Buttigieg":17.518,"Klobuchar":18.807,"Sanders":21.917,"Steyer":20.36,"Warren":20.316,"Yang":23.434,"Gbbard":20},{"state":"Idaho","Biden":21.687,"Bloomberg":21.155,"Booker":16.436,"Buttigieg":23.141,"Klobuchar":22.647,"Sanders":31.552,"Steyer":21.326,"Warren":16.828,"Yang":20.674,"Gbbard":20},{"state":"Illinois","Biden":19.961,"Bloomberg":20.225,"Booker":19.363,"Buttigieg":23.989,"Klobuchar":22.608,"Sanders":20.197,"Steyer":19.804,"Warren":19.987,"Yang":19.567,"Gbbard":20},{"state":"Indiana","Biden":19.31,"Bloomberg":20.603,"Booker":18.185,"Buttigieg":30.335,"Klobuchar":23.684,"Sanders":21.013,"Steyer":19.865,"Warren":20.92,"Yang":20.007,"Gbbard":20},{"state":"Iowa","Biden":18.518,"Bloomberg":21.142,"Booker":16.165,"Buttigieg":27.784,"Klobuchar":25.807,"Sanders":21.413,"Steyer":24.897,"Warren":21.891,"Yang":20.219,"Gbbard":20},{"state":"Kansas","Biden":18.632,"Bloomberg":20.901,"Booker":16.39,"Buttigieg":27.305,"Klobuchar":25.502,"Sanders":26.489,"Steyer":19.893,"Warren":21.665,"Yang":20.096,"Gbbard":20},{"state":"Kentucky","Biden":20.539,"Bloomberg":25.331,"Booker":19.807,"Buttigieg":20.798,"Klobuchar":22.893,"Sanders":23.997,"Steyer":21.21,"Warren":19.58,"Yang":20.133,"Gbbard":20},{"state":"Louisiana","Biden":28.878,"Bloomberg":24.603,"Booker":25.076,"Buttigieg":15.444,"Klobuchar":18.174,"Sanders":14.709,"Steyer":21.199,"Warren":15.713,"Yang":18.252,"Gbbard":20},{"state":"Maine","Biden":17.507,"Bloomberg":22.819,"Booker":17.485,"Buttigieg":25.167,"Klobuchar":22.399,"Sanders":22.196,"Steyer":21.855,"Warren":23.696,"Yang":20.237,"Gbbard":20},{"state":"Maryland","Biden":25.405,"Bloomberg":22.239,"Booker":22.484,"Buttigieg":20.471,"Klobuchar":18.055,"Sanders":20.335,"Steyer":22.133,"Warren":21.133,"Yang":19.01,"Gbbard":20},{"state":"Massachusetts","Biden":17.063,"Bloomberg":22.911,"Booker":17.399,"Buttigieg":25.115,"Klobuchar":22.229,"Sanders":22.431,"Steyer":21.713,"Warren":26.071,"Yang":20.669,"Gbbard":20},{"state":"Michigan","Biden":19.597,"Bloomberg":20.873,"Booker":18.394,"Buttigieg":25.14,"Klobuchar":23.688,"Sanders":20.485,"Steyer":19.602,"Warren":20.173,"Yang":19.755,"Gbbard":20},{"state":"Minnesota","Biden":18.574,"Bloomberg":20.758,"Booker":16.928,"Buttigieg":26.496,"Klobuchar":39.7,"Sanders":21.31,"Steyer":19.775,"Warren":21.568,"Yang":20.24,"Gbbard":20},{"state":"Mississippi","Biden":29.801,"Bloomberg":24.393,"Booker":26.392,"Buttigieg":14.37,"Klobuchar":17.169,"Sanders":14.011,"Steyer":21.416,"Warren":15.139,"Yang":17.757,"Gbbard":20},{"state":"Missouri","Biden":25.576,"Bloomberg":30.704,"Booker":20.274,"Buttigieg":19.481,"Klobuchar":21.736,"Sanders":16.586,"Steyer":20.926,"Warren":18.747,"Yang":19.731,"Gbbard":20},{"state":"Montana","Biden":28.303,"Bloomberg":21.881,"Booker":16.827,"Buttigieg":23.698,"Klobuchar":23.168,"Sanders":21.575,"Steyer":21.535,"Warren":20.691,"Yang":20.877,"Gbbard":20},{"state":"Nebraska","Biden":19.182,"Bloomberg":21.336,"Booker":16.941,"Buttigieg":27.288,"Klobuchar":25.343,"Sanders":25.891,"Steyer":19.879,"Warren":21.209,"Yang":19.919,"Gbbard":20},{"state":"Nevada","Biden":23.4,"Bloomberg":19.454,"Booker":17.97,"Buttigieg":19.928,"Klobuchar":20.091,"Sanders":22.033,"Steyer":26.287,"Warren":20.345,"Yang":21.299,"Gbbard":20},{"state":"New Hampshire","Biden":17.168,"Bloomberg":23.282,"Booker":16.957,"Buttigieg":25.925,"Klobuchar":22.841,"Sanders":22.47,"Steyer":26.818,"Warren":24.264,"Yang":20.54,"Gbbard":20},{"state":"New Jersey","Biden":23.71,"Bloomberg":22.89,"Booker":24.591,"Buttigieg":23.259,"Klobuchar":20.595,"Sanders":21.391,"Steyer":21.809,"Warren":22.475,"Yang":19.845,"Gbbard":20},{"state":"New Mexico","Biden":16.456,"Bloomberg":19.547,"Booker":16.975,"Buttigieg":20.3,"Klobuchar":20.675,"Sanders":22.024,"Steyer":20.683,"Warren":20.359,"Yang":21.76,"Gbbard":20},{"state":"New York","Biden":28.309,"Bloomberg":32.071,"Booker":19.856,"Buttigieg":22.092,"Klobuchar":19.827,"Sanders":21.629,"Steyer":21.623,"Warren":22.332,"Yang":19.993,"Gbbard":20},{"state":"North Carolina","Biden":26.808,"Bloomberg":25.152,"Booker":21.8,"Buttigieg":18.823,"Klobuchar":21.132,"Sanders":15.839,"Steyer":21.108,"Warren":17.986,"Yang":19.392,"Gbbard":20},{"state":"North Dakota","Biden":18.937,"Bloomberg":21.502,"Booker":16.439,"Buttigieg":27.305,"Klobuchar":25.707,"Sanders":28.158,"Steyer":19.185,"Warren":20.369,"Yang":19.537,"Gbbard":20},{"state":"Northern Marinas","Biden":20,"Bloomberg":20,"Booker":20,"Buttigieg":20,"Klobuchar":20,"Sanders":20,"Steyer":20,"Warren":20,"Yang":20,"Gbbard":20},{"state":"Ohio","Biden":19.392,"Bloomberg":20.444,"Booker":17.687,"Buttigieg":25.192,"Klobuchar":23.547,"Sanders":19.883,"Steyer":19.274,"Warren":19.858,"Yang":18.848,"Gbbard":20},{"state":"Oklahoma","Biden":17.151,"Bloomberg":25.156,"Booker":19.465,"Buttigieg":19.834,"Klobuchar":22.527,"Sanders":27.732,"Steyer":20.041,"Warren":17.746,"Yang":19.493,"Gbbard":20},{"state":"Oregon","Biden":21.875,"Bloomberg":20.275,"Booker":16.249,"Buttigieg":22.336,"Klobuchar":21.738,"Sanders":22.597,"Steyer":21.47,"Warren":21.595,"Yang":21.277,"Gbbard":20},{"state":"Pennsylvania","Biden":24.502,"Bloomberg":20.354,"Booker":18.292,"Buttigieg":25.073,"Klobuchar":23.647,"Sanders":20.58,"Steyer":19.8,"Warren":20.548,"Yang":19.648,"Gbbard":20},{"state":"Puerto Rico","Biden":20,"Bloomberg":20,"Booker":20,"Buttigieg":20,"Klobuchar":20,"Sanders":20,"Steyer":20,"Warren":20,"Yang":20,"Gbbard":20},{"state":"Rhode Island","Biden":17.703,"Bloomberg":23.075,"Booker":18.133,"Buttigieg":24.521,"Klobuchar":21.675,"Sanders":21.743,"Steyer":21.577,"Warren":23.197,"Yang":20.255,"Gbbard":20},{"state":"South Carolina","Biden":26.122,"Bloomberg":24.439,"Booker":25.123,"Buttigieg":15.545,"Klobuchar":18.25,"Sanders":14.429,"Steyer":26.378,"Warren":15.881,"Yang":17.893,"Gbbard":20},{"state":"South Dakota","Biden":18.582,"Bloomberg":21.111,"Booker":16.392,"Buttigieg":26.944,"Klobuchar":25.255,"Sanders":24.786,"Steyer":19.318,"Warren":20.768,"Yang":19.935,"Gbbard":20},{"state":"Tennessee","Biden":26.958,"Bloomberg":25.208,"Booker":21.925,"Buttigieg":19.058,"Klobuchar":21.287,"Sanders":16.166,"Steyer":21.423,"Warren":18.425,"Yang":19.547,"Gbbard":20},{"state":"Texas","Biden":18.795,"Bloomberg":23.201,"Booker":21.282,"Buttigieg":16.214,"Klobuchar":19.924,"Sanders":20.796,"Steyer":19.948,"Warren":22.377,"Yang":20.345,"Gbbard":20},{"state":"Utah","Biden":17.768,"Bloomberg":21.468,"Booker":16.63,"Buttigieg":23.358,"Klobuchar":22.388,"Sanders":25.345,"Steyer":21.655,"Warren":21.324,"Yang":21.073,"Gbbard":20},{"state":"Vermont","Biden":17.112,"Bloomberg":23.353,"Booker":16.738,"Buttigieg":26.555,"Klobuchar":23.185,"Sanders":62.411,"Steyer":22.062,"Warren":24.836,"Yang":20.528,"Gbbard":20},{"state":"Virgin Islands","Biden":20,"Bloomberg":20,"Booker":20,"Buttigieg":20,"Klobuchar":20,"Sanders":20,"Steyer":20,"Warren":20,"Yang":20,"Gbbard":20},{"state":"Virginia","Biden":25.615,"Bloomberg":24.347,"Booker":20.942,"Buttigieg":18.522,"Klobuchar":23.843,"Sanders":24.36,"Steyer":20.856,"Warren":21.456,"Yang":20.768,"Gbbard":20},{"state":"Washington","Biden":16.733,"Bloomberg":20.073,"Booker":16.214,"Buttigieg":22.229,"Klobuchar":21.643,"Sanders":22.763,"Steyer":21.529,"Warren":21.797,"Yang":21.336,"Gbbard":20},{"state":"West Virginia","Biden":25.046,"Bloomberg":25.847,"Booker":18.191,"Buttigieg":21.964,"Klobuchar":24.223,"Sanders":28.603,"Steyer":20.378,"Warren":12.726,"Yang":19.593,"Gbbard":20},{"state":"Wisconsin","Biden":18.66,"Bloomberg":20.879,"Booker":16.95,"Buttigieg":26.56,"Klobuchar":24.757,"Sanders":21.21,"Steyer":19.74,"Warren":21.447,"Yang":20.205,"Gbbard":20},{"state":"Wyoming","Biden":27.937,"Bloomberg":21.502,"Booker":16.439,"Buttigieg":23.305,"Klobuchar":22.707,"Sanders":27.158,"Steyer":21.185,"Warren":20.369,"Yang":20.537,"Gbbard":20},{"state":"Guam","Biden":20,"Bloomberg":20,"Booker":20,"Buttigieg":20,"Klobuchar":20,"Sanders":20,"Steyer":20,"Warren":20,"Yang":20,"Gbbard":20}]
console.log(states_info.length)
console.log(states_demographic.length)
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
            Buttigieg: d3.sum(res.polls, d => d.Biden_adj),
            Buttigieg_tot: d3.sum(res.polls.filter(d => d.Biden_adj != "n/a"), d => d.time_weighted_weight),
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




    console.log(us_polling_average)

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
            Yang_tot: d3.sum(res.polls.filter(d => d.Yang_adj != "n/a"), d => d.time_weighted_weight),
            weight: d3.sum(res.polls, d => d.time_weighted_weight)
        }

        var averages = {
            state: res.state,
            Biden: drop_out[0] == "" ? k.Biden / k.Biden_tot : drop_out[0] < simulation_date ? 0 : k.Biden / k.Biden_tot,
            Bloomberg: entrance[1] > simulation_date ? 0 : drop_out[1] == "" ? k.Bloomberg / k.Bloomberg_tot : drop_out[1] < simulation_date ? 0 : k.Bloomberg / k.Bloomberg_tot,
            Booker: drop_out[2] == "" ? k.Booker / k.Booker_tot : drop_out[2] < simulation_date ? 0 : k.Booker / k.Booker_tot,
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
            Biden: states_demographic[i].Biden/20 *us_polling_average.Biden,
            Bloomberg: states_demographic[i].Bloomberg/20 *us_polling_average.Bloomberg,
            Booker : states_demographic[i].Booker/20 *us_polling_average.Booker,
            Buttigieg :states_demographic[i].Buttigieg/20 *us_polling_average.Buttigieg,
            Klobuchar: states_demographic[i].Klobuchar/20 *us_polling_average.Klobuchar,
            Sanders: states_demographic[i].Sanders/20 *us_polling_average.Sanders,
            Steyer: states_demographic[i].Steyer/20 *us_polling_average.Steyer,
            Warren:states_demographic[i].Warren/20 *us_polling_average.Warren,
            Yang:states_demographic[i].Yang/20 *us_polling_average.Yang,
    }

        var proj ={
            state: res.state,
            Biden: k.Biden_tot == 0 ? regression.Biden : (regression.Biden * 20 + averages.Biden * k.weight) / (k.weight +20) 
        }


        raw_states_data.push(k)
        state_polling_averages.push(averages)
        state_demographic_regression.push(regression)
        projected_vote.push(proj)
    }


    console.log(raw_states_data)
    console.log(state_polling_averages)
    console.log(state_demographic_regression)
    console.log(projected_vote)
     //dont go past here
})