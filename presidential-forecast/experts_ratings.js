var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FC474E"]);
var experts = ["cook", "bitecofer", "inside", "politico", "sabato"]
var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934 }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400 }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801 }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387 }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 253.9219 }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 245.5645 }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000 }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000 }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154 }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354 }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465 }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155 }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 231.2954 }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 228.4214 }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 202.6782 }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 259.1592 }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 264.9658 }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135 }, { "state": "Maine", "label": "ME", "xValue": 807.3105, "yValue": 109.855 }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000 }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000 }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647 }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874 }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514 }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 261.123 }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705 }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527 }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957 }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000 }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210 }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035 }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 163.2588 }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 284.5029 }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 117.3823 }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 219.4883 }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418 }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654 }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 200.856 }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000 }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 315.6387 }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 163.5166 }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 294.8193 }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 374.2861 }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 234.978 }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000 }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 252.7842 }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762 }, { "state": "West Virginia", "label": "WV", "xValue": 701, "yValue": 243 }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588 }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 179.6255 }, { "state": "District of Columbia", "label": "DC", "xValue": -1000, "yValue": -1000 }]




var widthmap = 1020
var heightmap = 500;

var projection = d3.geoAlbersUsa()
    .translate([widthmap / 2, heightmap / 2])
    .scale([900]);

var path = d3.geoPath()
    .projection(projection);

d3.csv("simdata.csv", data => {

    var experts_rating = data.map((d, i) => {
        return {
            state: d.state,
            ev: +d.ev,
            pvi: +d.pvi,
            sabato: d.sabato,
            cook: d.cook,
            inside: d.inside,
            bitecofer: d.bitecofer,
            politico: d.politico
        }
    })
    var sd2 = experts_rating.slice(0, 50)
    var ratings_nested = []
    for (let j = 0; j < experts.length; j++) {
        var datas = sd2.map((d, i) => {
            return {
                state: d.state,
                expert: experts[j],
                ev: d.ev,
                pvi: d.pvi,
                rating: d[experts[j]],
            }
        })
        console.log(datas)
        ratings_nested.push(datas)
    }
    var map = d3.select("#map")
        .append("svg")
        .attr("viewBox", '0 50 1000 450');

    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-180, -90])
        .html("<div id='tipDiv'></div>");

    map.call(tool_tip);
    var sd3 = ratings_nested.flat()

    console.log(sd3)
    update(d3.select("#experts-select").property("value"))
    function update(expert) {
        d3.json("us-states.json", json => {

            var experts_colors = [
                { rating: "Solid D", color: color(-30) },
                { rating: "Likely D", color: color(5) },
                { rating: "Lean D", color: color(25) },
                { rating: "Tilt D", color: color(45) },
                { rating: "Tossup", color: "white" },
                { rating: "Tilt R", color: color(55) },
                { rating: "Lean R", color: color(75) },
                { rating: "Likely R", color: color(95) },
                { rating: "Solid R", color: color(130) },
            ]
            var ratings = experts_colors.map(d => {
                return d.rating
            })
            
            var colorsratings = experts_colors.map(d => {
                return d.color
            })
            var ratings_colors = d3.scaleOrdinal()
                .domain(ratings)
                .range(colorsratings)
            console.log(experts_rating)




            var sd = sd3.filter(d => d.expert == expert)
            console.log(sd)

            for (var i = 0; i < sd.length; i++) {

                var dataState = sd[i].state;
                var ev = sd[i].ev
                var rating = sd[i].rating;
                var xv = map_labels[i].xValue
                var yv = map_labels[i].yValue
                var label = map_labels[i].label



                for (var j = 0; j < json.features.length; j++) {
                    var jsonState = json.features[j].properties.name;

                    if (dataState == jsonState) {
                        json.features[j].properties.rating = rating

                        json.features[j].properties.ev = ev
                        json.features[j].properties.label = label
                        json.features[j].properties.yv = yv
                        json.features[j].properties.xv = xv
                        break;
                    }
                }
            }

            map.append("rect")
                .attr("width", 2000)
                .attr("height", 500)
                .attr("x", 0)
                .attr("y", 0)
                .attr("fill", "white")

            map.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("class", "states")
                .attr("d", path)
                .style("stroke", "white")
                .style("stroke-width", "1")
                .style("fill", d => ratings_colors(d.properties.rating))



            map.selectAll("label")
                .data(json.features)
                .enter()
                .append("text")
                .text(d => d.properties.label)
                .attr("x", d => d.properties.xv)
                .attr("y", d => d.properties.yv)
                .style("font-family", "source-code-pro")
                .attr("font-size", "12")
                .attr("fill", "black")
                .attr("text-anchor", "middle")


            map.selectAll("path2")
                .data(json.features)
                .enter()
                .append("a")
                .attr("xlink:href", d => d.properties.name)
                .append("path")
                .attr("class", "statesover")
                .attr("d", path)
                .style("stroke", d => d.properties.rating == "Tossup" ? "black" : "none")
                .style("stroke-width", "1.5")
                .on('mouseover', function (d) {


                    tool_tip.show();
                    var tipSVG = d3.select("#tipDiv")
                        .append("svg")
                        .attr("width", 175)
                        .attr("height", 175)
                        ;
                    tipSVG.append("rect")
                        .attr("y", 1.5)
                        .attr("x", 1.5)
                        .attr("width", 172)
                        .attr("height", 172)
                        .attr("rx", 8)
                        .attr("fill", "white")
                        .attr("stroke", "black")
                        .attr("stroke-width", 2)



                    tipSVG.append("text")
                        .text(d.properties.name)
                        .attr("y", 20)
                        .attr("x", 87.5)
                        .attr("fill", "#black")
                        .style("font-weight", "600")
                        .style("font-size", "20")
                        .attr("text-anchor", "middle")

                    tipSVG.append("text")
                        .text(d.properties.ev + " Electoral Votes")
                        .attr("y", 40)
                        .attr("x", 87.5)
                        .attr("fill", "#black")
                        .style("font-weight", "400")
                        .style("font-size", "15")
                        .attr("text-anchor", "middle")

                    tipSVG.append("image")
                        .attr("xlink:href", d => "https://jhkforecasts.com/Trump-01.png")
                        .attr("x", 90)
                        .attr("y", 50)
                        .attr("width", 82)
                        .attr("height", 82)

                })
                .on('mouseout',
                    function (d) {


                        tool_tip.hide()
                    });


            var selectbox = d3.select("#experts-select")
                .on("change", function () {
                    update(this.value);
                })

        })

    }
})