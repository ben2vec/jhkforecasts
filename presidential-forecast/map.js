var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934, "region": "south" }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400, "region": "west" }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801, "region": "west" }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387, "region": "south" }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 253.9219, "region": "west" }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 245.5645, "region": "west" }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000, "region": "northeast" }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000, "region": "northeast" }, { "state": "District of Columbia", "label": "DC", "xValue": -1000, "yValue": -1000, "region": "northeast" }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154, "region": "south" }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354, "region": "south" }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465, "region": "west" }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155, "region": "west" }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 231.2954, "region": "midwest" }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 228.4214, "region": "midwest" }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 202.6782, "region": "midwest" }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 259.1592, "region": "midwest" }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 264.9658, "region": "south" }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135, "region": "south" }, { "state": "Maine", "label": "ME", "xValue": 807.3105, "yValue": 109.855, "region": "northeast" }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000, "region": "northeast" }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000, "region": "northeast" }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647, "region": "midwest" }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874, "region": "midwest" }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514, "region": "south" }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 261.123, "region": "midwest" }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705, "region": "west" }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527, "region": "midwest" }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957, "region": "west" }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000, "region": "northeast" }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210, "region": "northeast" }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035, "region": "west" }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 163.2588, "region": "northeast" }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 284.5029, "region": "south" }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 117.3823, "region": "midwest" }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 219.4883, "region": "midwest" }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418, "region": "south" }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654, "region": "west" }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 200.856, "region": "midwest" }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000, "region": "northeast" }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 315.6387, "region": "south" }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 163.5166, "region": "midwest" }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 292.8193, "region": "south" }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 374.2861, "region": "south" }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 234.978, "region": "west" }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000, "region": "northeast" }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 252.7842, "region": "south" }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762, "region": "west" }, { "state": "West Virginia", "label": "WV", "xValue": 701, "yValue": 243, "region": "south" }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588, "region": "midwest" }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 179.6255, "region": "west" }]
var color = d3.scaleLinear()
    .domain([-5, 0, 5])
    .range(["#0091FF", "white", "#FF6060"]),
    dataformat = d3.format(".1f")
d3.csv("apr-4-20-v-16.csv", state => {
    console.log(state)
    var state = state.slice(0, 51);
    state.sort(function (a, b) {
        if (a.state < b.state) { return -1; }
        if (a.state > b.state) { return 1; }
        return 0;
    })
    var map = d3.select("#usmap")
        .append("svg")
        .attr("viewBox", '150 0 750 470');

    var width3 = 1020;
    var height3 = 500;

    var projection = d3.geoAlbersUsa()
        .translate([width3 / 2, height3 / 2])
        .scale([900]);


    var path = d3.geoPath()
        .projection(projection);

    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-180, -90])
        .html("<div id='tipDiv'></div>");

    map.call(tool_tip);
    d3.json("https://projects.jhkforecasts.com/presidential_forecast/us-states.json", function (json) {

        for (var i = 0; i < state.length; i++) {

            var dataState = state[i].state;
            var value = state[i].vote_diff;
            var xv = map_labels[i].xValue
            var yv = map_labels[i].yValue
            var label = map_labels[i].label
            var region = map_labels[i].region
            var margin = state[i].vote_margin

            for (var j = 0; j < json.features.length; j++) {
                var jsonState = json.features[j].properties.name;

                if (dataState == jsonState) {
                    json.features[j].properties.value = value
                    json.features[j].properties.label = label
                    json.features[j].properties.yv = yv
                    json.features[j].properties.xv = xv
                    json.features[j].properties.region = region
                    json.features[j].properties.margin = +margin
                    break;
                }
            }
        }
        var mapdata = json.features
        var boxstates = [mapdata[29], mapdata[45], mapdata[21], mapdata[39], mapdata[6], mapdata[7], mapdata[20], mapdata[8]]
        var midwest = mapdata.filter(d => d.properties.region == "midwest")
        var northeast = mapdata.filter(d => d.properties.region == "northeast")
        var south = mapdata.filter(d => d.properties.region == "south")
        var west = mapdata.filter(d => d.properties.region == "west")
        var battlegrounds = mapdata.filter(d => Math.abs(d.properties.margin) < 10)

        map.append("text")
            .text("Projected 2020 Margin - 2016 Margin")
            .attr("x", 525)
            .attr("y", 30)
            .attr("font-size", "20")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", "800")
        map.append("g")
            .selectAll("path2")
            .data(mapdata)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "lightgray")
            .style("stroke-width", 1)
            .style("fill", d => "white")

        map.append("g")
            .selectAll("path2")
            .data(battlegrounds)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "lightgray")
            .style("stroke-width", 1)
            .style("fill", d => color(d.properties.value))

        map.selectAll("label")
            .data(battlegrounds)
            .enter()
            .append("text")
            .text(d => d.properties.label)
            .attr("x", d => d.properties.xv)
            .attr("y", d => d.properties.yv-5)
            .style("font-family", "source-code-pro")
            .attr("font-size", "10")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", "400")

        map.selectAll("label")
            .data(battlegrounds)
            .enter()
            .append("text")
            .text(d => dataformat(d.properties.value))
            .attr("x", d => d.properties.xv)
            .attr("y", d => d.properties.yv + 5)
            .attr("font-size", "10")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .style("font-weight", "500")

    })
})