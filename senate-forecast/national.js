//APPEND DOM FEATURES
d3.select("#topline").append("h1")
    .text("Win Senate...")
    .style("font-size", "2vw")
    .style("font-weight", 900)
    .style("margin-left", "2%")
    .style("border-bottom", "solid black .2vw")

d3.select("#toplinePhone").append("h1")
    .text("Win Senate...")
    .style("font-size", "2vw")
    .style("font-weight", 900)
    .style("margin-left", "2%")
    .style("margin-left", "2%")
    .style("border-bottom", "solid black .2vw")

d3.select("#histogram").append("h1")
    .text("The Uncertainty of the Race")
    .style("font-size", "3vw")
    .style("font-weight", 900)
    .style("margin-left", "2%")

d3.select("#histogram").append("h1")
    .text("The race for the Senate majority can be uncertain at times. The distribution below shows the most likely senate compostions")
    .style("font-size", "2vw")
    .style("font-weight", 400)
    .style("margin-left", "5%")

d3.select("#histogramPhone").append("h1")
    .text("The Uncertainty of the Race")
    .style("font-size", "3vw")
    .style("font-weight", 900)
    .style("margin-left", "2%")

d3.select("#histogramPhone").append("h1")
    .text("The race for the Senate majority can be uncertain at times. The distribution below shows the most likely senate compostions")
    .style("font-size", "2vw")
    .style("font-weight", 400)
    .style("margin-left", "5%")

d3.select("#congress").append("h1")
    .text("What the Chamber might look like")
    .style("font-size", "3vw")
    .style("font-weight", 900)
    .style("margin-left", "2%")

d3.select("#congress").append("h1")
    .text("The Senate Race is all about getting and building a majority. The graphic below show which party is most likely to get a majority, and how strong the majority is.")
    .style("font-size", "2vw")
    .style("font-weight", 400)
    .style("margin-left", "5%")

d3.select("#congressPhone").append("h1")
    .text("What the Chamber might look like")
    .style("font-size", "3vw")
    .style("font-weight", 900)
    .style("margin-left", "2%")

d3.select("#congressPhone").append("h1")
    .text("The Senate Race is all about getting and building a majority. The graphic below show which party is most likely to get a majority, and how strong the majority is.")
    .style("font-size", "2vw")
    .style("font-weight", 400)
    .style("margin-left", "5%")

d3.select("#timeText").append("h1")
    .text("The Zigs and Zags of the Race")
    .style("font-size", "3vw")
    .style("font-weight", 900)
    .style("margin-left", "2%")

d3.select("#timeText").append("h1")
    .text("The Senate race can change in an instant. Below shows the change in each party's chance of winnning a majority have changed over time.")
    .style("font-size", "2vw")
    .style("font-weight", 400)
    .style("margin-left", "5%")

d3.select("#tippingpoint").append("h1")
    .text("The Races That Will Decide the Majority")
    .style("font-size", "3vw")
    .style("font-weight", 900)
    .style("margin-left", "2%")

d3.select("#tippingpoint").append("h1")
    .text("Most Senate Elections aren't really that competitive and worth watching. Below shows the Senate Elections that will decide the election, along with the possible outcomes in that state (80% confidence intervals).")
    .style("font-size", "2vw")
    .style("font-weight", 400)
    .style("margin-left", "5%")

d3.select("#tippingpointPhone").append("h1")
    .text("The Races That Will Decide the Majority")
    .style("font-size", "3vw")
    .style("font-weight", 900)
    .style("margin-left", "2%")

d3.select("#tippingpointPhone").append("h1")
    .text("Most Senate Elections aren't really that competitive and worth watching. Below shows the Senate Elections that will decide the election, along with the possible outcomes in that state (80% confidence intervals).")
    .style("font-size", "2vw")
    .style("font-weight", 400)
    .style("margin-left", "5%")

var histogram = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", '0 0 1000 600');

var mapPhone = d3.select("#usmap")
    .append("svg")
    .attr("viewBox", '75 -40 900 500');

var tool_tipPhone = d3.tip()
    .attr("class", "d3-tip")
    .offset([-200, -150])
    .html("<div id='tipDiv'></div>");

var margin = { top: 20, right: 40, bottom: 20, left: 20 }

var congress = d3.select('#congress').append("svg")
    .attr("viewBox", "0 0 1100 550")
    .append("g")
    .attr("transform", "translate(" + 550 + "," + 350 + ")");
var tip = d3.select('#tippingpoint').append("svg")
    .attr("viewBox", "0 0 1000 1800")
var time = d3.select("#time").append("svg")
    .attr("viewBox", "0 0 1400 600")
    .append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var toplinePhone = d3.select("#toplinePhone").append("svg")
    .attr("viewBox", "0 0 1000 100")

var congressPhone = d3.select('#congressPhone').append("svg")
    .attr("viewBox", "0 0 1100 550")
    .append("g")
    .attr("transform", "translate(" + 550 + "," + 550 + ")");
var histogramPhone = d3.select("#histogramPhone")
    .append("svg")
    .attr("viewBox", '0 0 1000 685');
var tipPhone = d3.select('#tippingpointPhone').append("svg")
    .attr("viewBox", "0 0 1000 1800")


mapPhone.call(tool_tipPhone);

var colors = ["#FF6060", "#0091FF", "#FFE130", "#C473F6", "#31DE70"]

var category = ["REP", "DEM", "LIB", "IND", "GREEN"]

var cand_colors = d3.scaleOrdinal()
    .domain(category)
    .range(colors)
var widthmap = 1020
var heightmap = 500;
var projection = d3.geoAlbersUsa()
    .translate([widthmap / 2, heightmap / 2])
    .scale([900]);
var path = d3.geoPath()
    .projection(projection);

var current_seats = d3.scaleLinear()
    .domain([2, 1, 0])
    .range(["#0091FF", "white", "#FF6060"]);

var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#0091FF", "white", "#FF6060"]);



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
var state_boxes = [{ "candidate": "Alexander, Lamar (R-TN)", "state": "Tennessee", "class": "Class II", "state_index": "Tennessee: Class II", "election": "UP" }, { "candidate": "Baldwin, Tammy (D-WI)", "state": "Wisconsin", "class": "Class III", "state_index": "Wisconsin: Class III", "election": "DEM" }, { "candidate": "Barrasso, John (R-WY)", "state": "Wyoming", "class": "Class III", "state_index": "Wyoming: Class III", "election": "REP" }, { "candidate": "Bennet, Michael F. (D-CO)", "state": "Colorado", "class": "Class III", "state_index": "Colorado: Class III", "election": "DEM" }, { "candidate": "Blackburn, Marsha (R-TN)", "state": "Tennessee", "class": "Class III", "state_index": "Tennessee: Class III", "election": "REP" }, { "candidate": "Blumenthal, Richard (D-CT)", "state": "Connecticut", "class": "Class III", "state_index": "Connecticut: Class III", "election": "DEM" }, { "candidate": "Blunt, Roy (R-MO)", "state": "Missouri", "class": "Class III", "state_index": "Missouri: Class III", "election": "REP" }, { "candidate": "Booker, Cory A. (D-NJ)", "state": "New Jersey", "class": "Class II", "state_index": "New Jersey: Class II", "election": "UP" }, { "candidate": "Boozman, John (R-AR)", "state": "Arkansas", "class": "Class III", "state_index": "Arkansas: Class III", "election": "REP" }, { "candidate": "Braun, Mike (R-IN)", "state": "Indiana", "class": "Class III", "state_index": "Indiana: Class III", "election": "REP" }, { "candidate": "Brown, Sherrod (D-OH)", "state": "Ohio", "class": "Class III", "state_index": "Ohio: Class III", "election": "DEM" }, { "candidate": "Burr, Richard (R-NC)", "state": "North Carolina", "class": "Class III", "state_index": "North Carolina: Class III", "election": "REP" }, { "candidate": "Cantwell, Maria (D-WA)", "state": "Washington", "class": "Class III", "state_index": "Washington: Class III", "election": "DEM" }, { "candidate": "Capito, Shelley Moore (R-WV)", "state": "West Virginia", "class": "Class II", "state_index": "West Virginia: Class II", "election": "UP" }, { "candidate": "Cardin, Benjamin L. (D-MD)", "state": "Maryland", "class": "Class III", "state_index": "Maryland: Class III", "election": "DEM" }, { "candidate": "Carper, Thomas R. (D-DE)", "state": "Delaware", "class": "Class III", "state_index": "Delaware: Class III", "election": "DEM" }, { "candidate": "Casey, Robert P., Jr. (D-PA)", "state": "Pennsylvania", "class": "Class III", "state_index": "Pennsylvania: Class III", "election": "DEM" }, { "candidate": "Cassidy, Bill (R-LA)", "state": "Louisiana", "class": "Class II", "state_index": "Louisiana: Class II", "election": "UP" }, { "candidate": "Collins, Susan M. (R-ME)", "state": "Maine", "class": "Class II", "state_index": "Maine: Class II", "election": "UP" }, { "candidate": "Coons, Christopher A. (D-DE)", "state": "Delaware", "class": "Class II", "state_index": "Delaware: Class II", "election": "UP" }, { "candidate": "Cornyn, John (R-TX)", "state": "Texas", "class": "Class II", "state_index": "Texas: Class II", "election": "UP" }, { "candidate": "Cortez Masto, Catherine (D-NV)", "state": "Nevada", "class": "Class III", "state_index": "Nevada: Class III", "election": "DEM" }, { "candidate": "Cotton, Tom (R-AR)", "state": "Arkansas", "class": "Class II", "state_index": "Arkansas: Class II", "election": "UP" }, { "candidate": "Cramer, Kevin (R-ND)", "state": "North Dakota", "class": "Class III", "state_index": "North Dakota: Class III", "election": "REP" }, { "candidate": "Crapo, Mike (R-ID)", "state": "Idaho", "class": "Class III", "state_index": "Idaho: Class III", "election": "REP" }, { "candidate": "Cruz, Ted (R-TX)", "state": "Texas", "class": "Class III", "state_index": "Texas: Class III", "election": "REP" }, { "candidate": "Daines, Steve (R-MT)", "state": "Montana", "class": "Class II", "state_index": "Montana: Class II", "election": "UP" }, { "candidate": "Duckworth, Tammy (D-IL)", "state": "Illinois", "class": "Class III", "state_index": "Illinois: Class III", "election": "DEM" }, { "candidate": "Durbin, Richard J. (D-IL)", "state": "Illinois", "class": "Class II", "state_index": "Illinois: Class II", "election": "UP" }, { "candidate": "Enzi, Michael B. (R-WY)", "state": "Wyoming", "class": "Class II", "state_index": "Wyoming: Class II", "election": "UP" }, { "candidate": "Ernst, Joni (R-IA)", "state": "Iowa", "class": "Class II", "state_index": "Iowa: Class II", "election": "UP" }, { "candidate": "Feinstein, Dianne (D-CA)", "state": "California", "class": "Class III", "state_index": "California: Class III", "election": "DEM" }, { "candidate": "Fischer, Deb (R-NE)", "state": "Nebraska", "class": "Class III", "state_index": "Nebraska: Class III", "election": "REP" }, { "candidate": "Gardner, Cory (R-CO)", "state": "Colorado", "class": "Class II", "state_index": "Colorado: Class II", "election": "UP" }, { "candidate": "Gillibrand, Kirsten E. (D-NY)", "state": "New York", "class": "Class III", "state_index": "New York: Class III", "election": "DEM" }, { "candidate": "Graham, Lindsey (R-SC)", "state": "South Carolina", "class": "Class II", "state_index": "South Carolina: Class II", "election": "UP" }, { "candidate": "Grassley, Chuck (R-IA)", "state": "Iowa", "class": "Class III", "state_index": "Iowa: Class III", "election": "REP" }, { "candidate": "Harris, Kamala D. (D-CA)", "state": "California", "class": "Class III", "state_index": "California: Class III", "election": "DEM" }, { "candidate": "Hassan, Margaret Wood (D-NH)", "state": "New Hampshire", "class": "Class III", "state_index": "New Hampshire: Class III", "election": "DEM" }, { "candidate": "Hawley, Josh (R-MO)", "state": "Missouri", "class": "Class III", "state_index": "Missouri: Class III", "election": "REP" }, { "candidate": "Heinrich, Martin (D-NM)", "state": "New Mexico", "class": "Class III", "state_index": "New Mexico: Class III", "election": "DEM" }, { "candidate": "Hirono, Mazie K. (D-HI)", "state": "Hawaii", "class": "Class III", "state_index": "Hawaii: Class III", "election": "DEM" }, { "candidate": "Hoeven, John (R-ND)", "state": "North Dakota", "class": "Class III", "state_index": "North Dakota: Class III", "election": "REP" }, { "candidate": "Hyde-Smith, Cindy (R-MS)", "state": "Mississippi", "class": "Class II", "state_index": "Mississippi: Class II", "election": "UP" }, { "candidate": "Inhofe, James M. (R-OK)", "state": "Oklahoma", "class": "Class II", "state_index": "Oklahoma: Class II", "election": "UP" }, { "candidate": "Johnson, Ron (R-WI)", "state": "Wisconsin", "class": "Class III", "state_index": "Wisconsin: Class III", "election": "REP" }, { "candidate": "Jones, Doug (D-AL)", "state": "Alabama", "class": "Class II", "state_index": "Alabama: Class II", "election": "UP" }, { "candidate": "Kaine, Tim (D-VA)", "state": "Virginia", "class": "Class III", "state_index": "Virginia: Class III", "election": "DEM" }, { "candidate": "Kennedy, John (R-LA)", "state": "Louisiana", "class": "Class III", "state_index": "Louisiana: Class III", "election": "REP" }, { "candidate": "King, Angus S., Jr. (I-ME)", "state": "Maine", "class": "Class III", "state_index": "Maine: Class III", "election": "DEM" }, { "candidate": "Klobuchar, Amy (D-MN)", "state": "Minnesota", "class": "Class III", "state_index": "Minnesota: Class III", "election": "DEM" }, { "candidate": "Lankford, James (R-OK)", "state": "Oklahoma", "class": "Class III", "state_index": "Oklahoma: Class III", "election": "REP" }, { "candidate": "Leahy, Patrick J. (D-VT)", "state": "Vermont", "class": "Class III", "state_index": "Vermont: Class III", "election": "DEM" }, { "candidate": "Lee, Mike (R-UT)", "state": "Utah", "class": "Class III", "state_index": "Utah: Class III", "election": "REP" }, { "candidate": "Loeffler, Kelly (R-GA)", "state": "Georgia", "class": "Class III", "state_index": "Georgia: Class III", "election": "UP" }, { "candidate": "Manchin, Joe, III (D-WV)", "state": "West Virginia", "class": "Class III", "state_index": "West Virginia: Class III", "election": "DEM" }, { "candidate": "Markey, Edward J. (D-MA)", "state": "Massachusetts", "class": "Class II", "state_index": "Massachusetts: Class II", "election": "UP" }, { "candidate": "McConnell, Mitch (R-KY)", "state": "Kentucky", "class": "Class II", "state_index": "Kentucky: Class II", "election": "UP" }, { "candidate": "McSally, Martha (R-AZ)", "state": "Arizona", "class": "Class III", "state_index": "Arizona: Class III", "election": "UP" }, { "candidate": "Menendez, Robert (D-NJ)", "state": "New Jersey", "class": "Class III", "state_index": "New Jersey: Class III", "election": "DEM" }, { "candidate": "Merkley, Jeff (D-OR)", "state": "Oregon", "class": "Class II", "state_index": "Oregon: Class II", "election": "UP" }, { "candidate": "Moran, Jerry (R-KS)", "state": "Kansas", "class": "Class III", "state_index": "Kansas: Class III", "election": "REP" }, { "candidate": "Murkowski, Lisa (R-AK)", "state": "Alaska", "class": "Class III", "state_index": "Alaska: Class III", "election": "REP" }, { "candidate": "Murphy, Christopher (D-CT)", "state": "Connecticut", "class": "Class III", "state_index": "Connecticut: Class III", "election": "DEM" }, { "candidate": "Murray, Patty (D-WA)", "state": "Washington", "class": "Class III", "state_index": "Washington: Class III", "election": "DEM" }, { "candidate": "Paul, Rand (R-KY)", "state": "Kentucky", "class": "Class III", "state_index": "Kentucky: Class III", "election": "REP" }, { "candidate": "Perdue, David (R-GA)", "state": "Georgia", "class": "Class II", "state_index": "Georgia: Class II", "election": "UP" }, { "candidate": "Peters, Gary C. (D-MI)", "state": "Michigan", "class": "Class II", "state_index": "Michigan: Class II", "election": "UP" }, { "candidate": "Portman, Rob (R-OH)", "state": "Ohio", "class": "Class III", "state_index": "Ohio: Class III", "election": "REP" }, { "candidate": "Reed, Jack (D-RI)", "state": "Rhode Island", "class": "Class II", "state_index": "Rhode Island: Class II", "election": "UP" }, { "candidate": "Risch, James E. (R-ID)", "state": "Idaho", "class": "Class II", "state_index": "Idaho: Class II", "election": "UP" }, { "candidate": "Roberts, Pat (R-KS)", "state": "Kansas", "class": "Class II", "state_index": "Kansas: Class II", "election": "UP" }, { "candidate": "Romney, Mitt (R-UT)", "state": "Utah", "class": "Class III", "state_index": "Utah: Class III", "election": "REP" }, { "candidate": "Rosen, Jacky (D-NV)", "state": "Nevada", "class": "Class III", "state_index": "Nevada: Class III", "election": "DEM" }, { "candidate": "Rounds, Mike (R-SD)", "state": "South Dakota", "class": "Class II", "state_index": "South Dakota: Class II", "election": "UP" }, { "candidate": "Rubio, Marco (R-FL)", "state": "Florida", "class": "Class III", "state_index": "Florida: Class III", "election": "REP" }, { "candidate": "Sanders, Bernard (I-VT)", "state": "Vermont", "class": "Class III", "state_index": "Vermont: Class III", "election": "DEM" }, { "candidate": "Sasse, Ben (R-NE)", "state": "Nebraska", "class": "Class II", "state_index": "Nebraska: Class II", "election": "UP" }, { "candidate": "Schatz, Brian (D-HI)", "state": "Hawaii", "class": "Class III", "state_index": "Hawaii: Class III", "election": "DEM" }, { "candidate": "Schumer, Charles E. (D-NY)", "state": "New York", "class": "Class III", "state_index": "New York: Class III", "election": "DEM" }, { "candidate": "Scott, Rick (R-FL)", "state": "Florida", "class": "Class III", "state_index": "Florida: Class III", "election": "REP" }, { "candidate": "Scott, Tim (R-SC)", "state": "South Carolina", "class": "Class III", "state_index": "South Carolina: Class III", "election": "REP" }, { "candidate": "Shaheen, Jeanne (D-NH)", "state": "New Hampshire", "class": "Class II", "state_index": "New Hampshire: Class II", "election": "UP" }, { "candidate": "Shelby, Richard C. (R-AL)", "state": "Alabama", "class": "Class III", "state_index": "Alabama: Class III", "election": "REP" }, { "candidate": "Sinema, Kyrsten (D-AZ)", "state": "Arizona", "class": "Class III", "state_index": "Arizona: Class III", "election": "UP" }, { "candidate": "Smith, Tina (D-MN)", "state": "Minnesota", "class": "Class II", "state_index": "Minnesota: Class II", "election": "UP" }, { "candidate": "Stabenow, Debbie (D-MI)", "state": "Michigan", "class": "Class III", "state_index": "Michigan: Class III", "election": "DEM" }, { "candidate": "Sullivan, Dan (R-AK)", "state": "Alaska", "class": "Class II", "state_index": "Alaska: Class II", "election": "UP" }, { "candidate": "Tester, Jon (D-MT)", "state": "Montana", "class": "Class III", "state_index": "Montana: Class III", "election": "DEM" }, { "candidate": "Thune, John (R-SD)", "state": "South Dakota", "class": "Class III", "state_index": "South Dakota: Class III", "election": "REP" }, { "candidate": "Tillis, Thom (R-NC)", "state": "North Carolina", "class": "Class II", "state_index": "North Carolina: Class II", "election": "UP" }, { "candidate": "Toomey, Patrick J. (R-PA)", "state": "Pennsylvania", "class": "Class III", "state_index": "Pennsylvania: Class III", "election": "REP" }, { "candidate": "Udall, Tom (D-NM)", "state": "New Mexico", "class": "Class II", "state_index": "New Mexico: Class II", "election": "UP" }, { "candidate": "Van Hollen, Chris (D-MD)", "state": "Maryland", "class": "Class III", "state_index": "Maryland: Class III", "election": "DEM" }, { "candidate": "Warner, Mark R. (D-VA)", "state": "Virginia", "class": "Class II", "state_index": "Virginia: Class II", "election": "UP" }, { "candidate": "Warren, Elizabeth (D-MA)", "state": "Massachusetts", "class": "Class III", "state_index": "Massachusetts: Class III", "election": "DEM" }, { "candidate": "Whitehouse, Sheldon (D-RI)", "state": "Rhode Island", "class": "Class III", "state_index": "Rhode Island: Class III", "election": "DEM" }, { "candidate": "Wicker, Roger F. (R-MS)", "state": "Mississippi", "class": "Class III", "state_index": "Mississippi: Class III", "election": "REP" }, { "candidate": "Wyden, Ron (D-OR)", "state": "Oregon", "class": "Class III", "state_index": "Oregon: Class III", "election": "DEM" }, { "candidate": "Young, Todd (R-IN)", "state": "Indiana", "class": "Class III", "state_index": "Indiana: Class III", "election": "REP" }]
var event_odds = [
    { event: "hflipping a coin", odds: 50 },
    { event: "getting a one pair", odds: 43.8 },
    { event: "NBA player makes a three", odds: 36 },
    { event: "MLB batter getting on base", odds: 30.8 },
    { event: "getting a two pair", odds: 23.5 },
    { event: "rolling a six on a die", odds: 16.666 },
    { event: "picking a random digit", odds: 10 },
    { event: "picking an ace", odds: 7.69 },
    { event: "getting a blackjack", odds: 4.8 },
    { event: "getting a full house", odds: 2.8 },
    { event: "getting a four of a kind", odds: 0.168 },
    { event: "getting a royal flush", odds: 0 },
]

var events = event_odds.map((d, i) => {
    return d.event
})

var odds = event_odds.map((d, i) => {
    return d.odds
})
var odds_scale = d3.scaleLinear()
    .domain(odds)
    .range([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])

queue()
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-senate-input.csv")
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-senate.csv")
    .defer(d3.json, "us-states.json")
    .await(ready);

function ready(error, input_data, data, json) {
    if (error) throw error;
    var state = json.features.filter(d => d.properties.name == "Georgia")[0];
    var states = input_data.map(d => {
        return {
            state: d.state,
            state_index: d.state_index
        }
    })

    states.forEach((d, i) => {
        var state = d.state
        var map_lab = map_labels.filter(d => d.state == state)[0]
        d.label = map_lab.label
        d.cx = map_lab.xValue
        d.cy = map_lab.yValue
    })
    states[34].state = "Georgia*"
    states[34].label = "GA*"
    states[34].cx = -1000
    states[34].cy = -1000

    data.forEach((d, i) => {
        d.date = dateparse(d.forecast_date)
    })
    var maxDate = timeformat(d3.max(data, d => d.date))
    var today = data.filter(d => d.forecast_date == maxDate)
    var updated = today[0].tipping_point
    var updated = updated.split(".")[0].toUpperCase() + updated.split(".")[1]
    document.getElementById("updated").innerHTML = "UPDATED: " + updated

    var rep_win_senate = today[0].win
    var rep_seats = today[0].p_90
    var dem_seats = today[1].p_90
    var dem_win_senate = today[1].win
    var upset_odds = Math.min(rep_win_senate, dem_win_senate)

    mapPhone.append("image")
    .attr("href", "https://jhkforecasts.com/elephant-01.png")
    .attr("x", 890)
    .attr("y", -50)
    .attr("height", 75)
    .attr("width", 75)

mapPhone.append("image")
    .attr("href", "https://jhkforecasts.com/donkey-01.png")
    .attr("x", 85)
    .attr("y", -50)
    .attr("height", 75)
    .attr("width", 75)

mapPhone.append("text")
    .text("Democrats")
    .attr("x", 165)
    .attr("y", -30)
    .attr("dominant-baseline", "central")
    .attr("text-anchor", "start")
    .attr("font-size", "23")

mapPhone.append("text")
    .text("Republicans")
    .attr("x", 885)
    .attr("y", -30)
    .attr("dominant-baseline", "central")
    .attr("text-anchor", "end")
    .attr("font-size", "23")


mapPhone.append("text")
    .text(nf(rep_win_senate) + "%")
    .attr("x", 885)
    .attr("y", 0)
    .attr("dominant-baseline", "central")
    .attr("text-anchor", "end")
    .attr("font-size", "23")
    .attr("fill", colors[0])
    .attr("font-weight", 500)

mapPhone.append("text")
    .text(nf(rep_seats))
    .attr("x", 560)
    .attr("y", 0)
    .attr("dominant-baseline", "central")
    .attr("text-anchor", "start")
    .attr("font-size", "23")
    .attr("fill", colors[0])
    .attr("font-weight", 500)

mapPhone.append("text")
    .text("Seats")
    .attr("x", 525)
    .attr("y", 0)
    .attr("dominant-baseline", "central")
    .attr("text-anchor", "middle")
    .attr("font-size", "23")
    .attr("fill", "black")
    .attr("font-weight", 500)

mapPhone.append("text")
    .text(nf(dem_seats))
    .attr("x", 490)
    .attr("y", 0)
    .attr("dominant-baseline", "central")
    .attr("text-anchor", "end")
    .attr("font-size", "23")
    .attr("fill", colors[1])
    .attr("font-weight", 500)

mapPhone.append("text")
    .text(nf(dem_win_senate) + "%")
    .attr("x", 165)
    .attr("y", 0)
    .attr("dominant-baseline", "central")
    .attr("text-anchor", "start")
    .attr("font-size", "23")
    .attr("fill", colors[1])
    .attr("font-weight", 500)



    for (var i = 0; i < states.length - 1; i++) {

        var dataState = states[i].state;
        var state_index = states[i].state_index

        var cands = today.filter(d => d.state_index == state_index)
        cands.sort((a, b) => b.vote - a.vote)
        var tipping_point = +cands[0].tipping_point

        for (var j = 0; j < json.features.length; j++) {
            var jsonState = json.features[j].properties.name;

            if (dataState == jsonState) {
                json.features[j].properties.tipping_point = tipping_point
                json.features[j].properties.cands = cands
                json.features[j].properties.state_index = state_index
                break;
            }
        }
    }
    mapPhone.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "states")
        .attr("d", path)
        .style("stroke", "white")
        .style("stroke-width", "1")
        .style("fill", (d, i) => d.properties.cands == undefined ? "#cfcfcf" : color(d3.sum(d.properties.cands.filter(d => d.party == "REP"), d => d.win)))

    mapPhone.selectAll("label")
        .data(states)
        .enter()
        .append("text")
        .text(d => d.label)
        .attr("x", d => d.cx)
        .attr("y", d => d.cy)
        .style("font-family", "sf-mono")
        .attr("font-size", "9")
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("font-weight", "500")

    mapPhone.selectAll("path2")
        .data(json.features)
        .enter()
        .append("a")
        .attr("xlink:href", (d, i) => d.properties.cands == undefined ? "" : d.properties.name)
        .append("path")
        .attr("class", "statesover")
        .attr("d", path)
        .style("stroke", d => d.properties.tipping_point >= 3 ? "black" : "none")
        .style("stroke-width", "1.5")
        .on('mouseover', function (d) {


            d.properties.cands == undefined ? "" : tool_tipPhone
                .offset([-170, -150]).show()
            var tipSVG = d3.select("#tipDiv")
                .append("svg")
                .attr("width", 300)
                .attr("height", 170)

            tipSVG.append("rect")
                .attr("y", 1.5)
                .attr("x", 1.5)
                .attr("width", 297)
                .attr("height", 167)
                .attr("rx", 8)
                .attr("fill", "white")
                .attr("stroke", "black")
                .attr("stroke-width", 2)

            tipSVG.append("text")
                .text(d.properties.name)
                .attr("y", 25)
                .attr("x", 150)
                .attr("fill", "black")
                .attr("font-weight", "700")
                .style("font-size", "20")
                .attr("text-anchor", "middle")

            tipSVG.append("text")
                .text("Candidate")
                .attr("y", 50)
                .attr("x", 10)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "start")

            tipSVG.append("text")
                .text("Vote")
                .attr("y", 50)
                .attr("x", 220)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")

            tipSVG.append("text")
                .text("Win")
                .attr("y", 50)
                .attr("x", 270)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")

            tipSVG.selectAll("cands")
                .data(d.properties.cands)
                .enter()
                .append("text")
                .text(d => d.candidate + " (" + d.party.split("")[0] + ")")
                .attr("y", (d, i) => 80 + i * 40)
                .attr("x", 10)
                .attr("fill", d => cand_colors(d.party))
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "start")

            tipSVG.selectAll("cands")
                .data(d.properties.cands)
                .enter()
                .append("text")
                .text(d => nf(d.vote))
                .attr("y", (d, i) => 80 + i * 40)
                .attr("x", 220)
                .attr("fill", d => cand_colors(d.party))
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")

            tipSVG.selectAll("cands")
                .data(d.properties.cands)
                .enter()
                .append("text")
                .text(d => d.win > 99 ? 100 : d.win < 1 ? 0 : nf(d.win))
                .attr("y", (d, i) => 80 + i * 40)
                .attr("x", 270)
                .attr("fill", d => cand_colors(d.party))
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")

        })
        .on('mouseout',
            function (d) {


                tool_tipPhone.hide()
            });
    mapPhone.append("rect")
        .attr("x", 880)
        .attr("y", 420)
        .attr("width", 20)
        .attr("height", 20)
        .style("stroke", "black")
        .style("stroke-width", 2)
        .attr("ry", "6")
        .style("fill", "none");

    mapPhone.append("text")
        .text("Tipping Points")
        .attr("x", 790)
        .attr("y", 430)
        .attr("fill", "black")
        .style("font-weight", "500")
        .style("font-size", "15");
    var pct = [60, 70, 80, 90, 100]

    mapPhone.selectAll("pct")
        .data(pct)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("cy", (d, i) => 340)
        .attr("cx", (d, i) => 800 + i * 25)
        .attr("fill", d => color(d))


    mapPhone.selectAll("pct")
        .data(pct)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("cy", (d, i) => 370)
        .attr("cx", (d, i) => 800 + i * 25)
        .attr("fill", d => color(100 - d))


    mapPhone.selectAll("pct")
        .data(pct)
        .enter()
        .append("text")
        .text(d => d)
        .attr("y", 400)
        .attr("x", (d, i) => 800 + i * 25)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("font-size", 12)
        .attr("font-weight", "500")


    mapPhone.append("text")
        .text("Win State")
        .attr("y", 310)
        .attr("x", 850)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("font-size", 15)
        .attr("font-weight", "500")

    

    var width = 50,
        height = 50;
    var projection2 = d3.geoAlbers();

    var path2 = d3.geoPath()
        .projection(projection2);
   

        

        projection2
            .scale(1)
            .translate([0, 0]);

        var b = path2.bounds(state),
            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [((width - s * (b[1][0] + b[0][0])) / 2), ((height - s * (b[1][1] + b[0][1])) / 2) + 50];

        projection2
            .scale(s)
            .translate(t);
        var ga_special = today.filter(d => d.state_index == "Georgia: Class III")

        mapPhone.append("path")
            .datum(state)
            .attr("fill", color(d3.sum(ga_special.filter(d => d.party == "REP"), d => d.win)))
            .attr("d", path2)
            .style("stroke", "grey")
            .attr("transform", "translate(725,280)")

        mapPhone.append("text")
            .text("GA*")
            .attr("x", 750)
            .attr("y", 360)
            .style("font-family", "sf-mono")
            .attr("font-size", "9")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("font-weight", "500")

        mapPhone
            .append("a")
            .attr("xlink:href", "Georgia-Special")
            .append("path")
            .datum(state)
            .attr("class", "statesover")
            .attr("fill", "none")
            .attr("d", path2)
            .style("stroke", ga_special[0].tipping_point > 3 ? "black" : "grey")
            .attr("transform", "translate(725,280)").style("stroke-width", "1.5")
            .on('mouseover', function (d) {


                tool_tipPhone
                    .offset([-250, -150]).show()
                var tipSVG = d3.select("#tipDiv")
                    .append("svg")
                    .attr("width", 300)
                    .attr("height", 250)



                tipSVG.append("rect")
                    .attr("y", 1.5)
                    .attr("x", 1.5)
                    .attr("width", 297)
                    .attr("height", 247)
                    .attr("rx", 8)
                    .attr("fill", "white")
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)

                tipSVG.append("text")
                    .text("Georgia*")
                    .attr("y", 25)
                    .attr("x", 150)
                    .attr("fill", "black")
                    .attr("font-weight", "700")
                    .style("font-size", "20")
                    .attr("text-anchor", "middle")

                tipSVG.append("text")
                    .text("Candidate")
                    .attr("y", 50)
                    .attr("x", 10)
                    .attr("fill", "black")
                    .attr("font-weight", "500")
                    .style("font-size", "18")
                    .attr("text-anchor", "start")

                tipSVG.append("text")
                    .text("Vote")
                    .attr("y", 50)
                    .attr("x", 220)
                    .attr("fill", "black")
                    .attr("font-weight", "500")
                    .style("font-size", "18")
                    .attr("text-anchor", "middle")

                tipSVG.append("text")
                    .text("Win")
                    .attr("y", 50)
                    .attr("x", 270)
                    .attr("fill", "black")
                    .attr("font-weight", "500")
                    .style("font-size", "18")
                    .attr("text-anchor", "middle")

                tipSVG.selectAll("cands")
                    .data(ga_special)
                    .enter()
                    .append("text")
                    .text(d => d.candidate + " (" + d.party.split("")[0] + ")")
                    .attr("y", (d, i) => 80 + i * 40)
                    .attr("x", 10)
                    .attr("fill", d => cand_colors(d.party))
                    .attr("font-weight", "500")
                    .style("font-size", "18")
                    .attr("text-anchor", "start")

                tipSVG.selectAll("cands")
                    .data(ga_special)
                    .enter()
                    .append("text")
                    .text(d => nf(d.vote))
                    .attr("y", (d, i) => 80 + i * 40)
                    .attr("x", 220)
                    .attr("fill", d => cand_colors(d.party))
                    .attr("font-weight", "500")
                    .style("font-size", "18")
                    .attr("text-anchor", "middle")

                tipSVG.selectAll("cands")
                    .data(ga_special)
                    .enter()
                    .append("text")
                    .text(d => d.win > 99 ? 100 : d.win < 1 ? 0 : nf(d.win))
                    .attr("y", (d, i) => 80 + i * 40)
                    .attr("x", 270)
                    .attr("fill", d => cand_colors(d.party))
                    .attr("font-weight", "500")
                    .style("font-size", "18")
                    .attr("text-anchor", "middle")

            })
            .on('mouseout',
                function (d) {


                    tool_tipPhone.hide()
                });



        d3.csv("https://data.jhkforecasts.com/2020-senate-histogram.csv", hist => {

            var hist = hist.slice(5, 26)
            console.log(hist)


            var rep_hist = d3.scaleLinear()
                .domain([40, 60])
                .range(["white", "#FF6060"]);

            var dem_hist = d3.scaleLinear()
                .domain([40, 60])
                .range(["white", "#0091FF"]);

            var hist_scale = d3.scaleLinear()
                .domain([0, 20])
                .range([0, 600]);

            var tie_length = hist_scale(hist[10].prob)
            var biden_win = +today[1].poll_avg * tie_length / 100
            console.log(tie_length)
            var pct = [0, 5, 10, 15, 20]

            histogram.selectAll("seats")
                .data(pct)
                .enter()
                .append("line")
                .attr("x1", d => 350 + hist_scale(d))
                .attr("x2", d => 350 + hist_scale(d))
                .attr("y1", 57.5)
                .attr("y2", 57.5 + 525)
                .attr("stroke", "lightgrey")

            histogram.selectAll("seats")
                .data(hist)
                .enter()
                .append("line")
                .attr("x1", 50)
                .attr("x2", 950)
                .attr("y1", (d, i) => 57.5 + i * 25)
                .attr("y2", (d, i) => 57.5 + i * 25)
                .attr("stroke", "lightgrey")

            histogram.selectAll("seats")
                .data(hist)
                .enter()
                .append("rect")
                .attr("y", (d, i) => 60 + i * 25)
                .attr("x", 60)
                .attr("fill", d => rep_hist(d.rep_seats))
                .attr("height", 20)
                .attr("width", 20)

            histogram.selectAll("seats")
                .data(hist)
                .enter()
                .append("rect")
                .attr("y", (d, i) => 60 + i * 25)
                .attr("x", 140)
                .attr("fill", d => dem_hist(d.dem_seats))
                .attr("height", 20)
                .attr("width", 20)

            histogram.append("text")
                .text("GOP")
                .attr("y", 40)
                .attr("x", 70)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "15")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")
                .style("font-family", "sf-mono")

            histogram.append("text")
                .text("DEM")
                .attr("y", 40)
                .attr("x", 150)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "15")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")
                .style("font-family", "sf-mono")


            histogram.append("text")
                .text("Seats")
                .attr("y", 10)
                .attr("x", 115)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")

            histogram.append("text")
                .text("Probability")
                .attr("y", 10)
                .attr("x", 250)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")

            histogram.selectAll("seats")
                .data(hist)
                .enter()
                .append("text")
                .text(d => d.rep_seats)
                .attr("y", (d, i) => 70 + i * 25)
                .attr("x", 70)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "15")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")

            histogram.selectAll("seats")
                .data(hist)
                .enter()
                .append("text")
                .text(d => d.dem_seats)
                .attr("y", (d, i) => 70 + i * 25)
                .attr("x", 150)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "15")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")

            histogram.selectAll("seats")
                .data(hist)
                .enter()
                .append("text")
                .text(d => nf(d.prob))
                .attr("y", (d, i) => 70 + i * 25)
                .attr("x", 250)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "15")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")

            histogram.selectAll("seats")
                .data(hist)
                .enter()
                .append("rect")
                .attr("y", (d, i) => 60 + i * 25)
                .attr("x", 350)
                .attr("fill", (d, i) => i > 10 ? colors[0] : colors[1])
                .attr("height", 20)
                .attr("width", d => hist_scale(d.prob))

            histogram.append("rect")
                .attr("y", 310)
                .attr("x", 350 + biden_win)
                .attr("fill", colors[0])
                .attr("height", 20)
                .attr("width", tie_length - biden_win)


            histogram.selectAll("seats")
                .data(pct)
                .enter()
                .append("text")
                .text(d => d)
                .attr("y", 40)
                .attr("x", d => 350 + hist_scale(d))
                .attr("fill", "#afafaf")
                .attr("font-weight", "500")
                .style("font-size", "15")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")



            var dem_seats = [{ state: "DEM", state_index: "", abbrev: "", win: 0, seats: 35 }]
            var rep_seats = [{ state: "REP", state_index: "", abbrev: "", win: 100, seats: 30 }]
            var seats = []
            var elSeats = []
            states.forEach((d, i) => {
                var state = d.state
                var abbrev = d.label
                var state_index = d.state_index
                var win = d3.sum(today.filter(d => d.state_index == state_index && d.party == "REP"), d => d.win)
                var ps = {
                    state: state,
                    state_index: state_index,
                    abbrev: abbrev,
                    win: win,
                    seats: 1
                }
                elSeats.push(ps)
            })
            elSeats.sort((a, b) => a.win - b.win)
            seats.push(dem_seats)
            seats.push(elSeats)
            seats.push(rep_seats)
            var seats = seats.flat()

            console.log(seats)

            var arc = d3.arc()
                .outerRadius(300)
                .innerRadius(200)
                ;

            var pie = d3.pie()
                .sort(null)
                .value(function (d) {
                    return d.seats;
                })
                .startAngle(-2.2)
                .endAngle(2.2);



            congress.selectAll(".arc")
                .data(pie(seats))
                .enter().append("path")
                .attr("d", arc)
                .style("fill", d => color(d.data.win))
                .attr("stroke", "white");

            congress.selectAll(".arc")
                .data(pie(seats))
                .enter().append("text")
                .attr("transform", function (d) {
                    var _d = arc.centroid(d);
                    _d[0] *= 1.21;
                    _d[1] *= 1.21;
                    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
                    return "translate(" + _d + ")rotate(" + a + ")";
                })
                .style("text-anchor", "start")
                .style("dominant-baseline", "central")
                .text(d => d.data.abbrev)
                .style("font-family", "sf-mono")
                .attr("font-size", 10);

            congress.append("line")
                .attr("x1", 0)
                .attr("x2", 0)
                .attr("y1", -150)
                .attr("y2", -500)
                .attr("stroke", "black")

            congress.append("text")
                .text("50-50 SPLIT")
                .attr("y", -120)
                .attr("x", 0)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "top")

            congress.append("text")
                .text("30 Repbulican Seats")
                .attr("y", -120)
                .attr("x", 400)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "top")
            congress.append("text")
                .text("not up for Re-election")
                .attr("y", -120)
                .attr("x", 400)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "top")
                .attr("dy", "1em")

            congress.append("text")
                .text("35 Democrat Seats")
                .attr("y", -120)
                .attr("x", -400)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "top")
            congress.append("text")
                .text("not up for Re-election")
                .attr("y", -120)
                .attr("x", -400)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "top")
                .attr("dy", "1em")


            var bars = states.map((d, i) => {
                return {
                    state: d.state,
                    state_index: d.state_index,
                }
            })
            bars.forEach((d, i) => {
                var state_index = d.state_index
                cands = today.filter(d => d.state_index == state_index).filter(d => d.party == "REP" || d.party == "DEM")
                cands.sort((a, b) => b.vote - a.vote)
                d.margin = cands.length == 1 ? 100 : cands.filter(d => d.party == "REP")[0].vote - cands.filter(d => d.party == "DEM")[0].vote
                d.stdev = (cands.filter(d => d.party == "REP")[0].vote - cands.filter(d => d.party == "REP")[0].p_10) * 2
                d.tipping_point = +cands[0].tipping_point
            })
            bars[34].stdev *= 1.5
            bars.sort((a, b) => Math.abs(a.margin) - Math.abs(b.margin))
            bars.sort((a, b) => b.tipping_point - a.tipping_point)
            console.log(bars)

            var x2 = d3.scaleLinear()
                .domain([-50, 50])
                .range([0, 600]);

            tip.append("text")
                .text("Margin")
                .attr("x", 880)
                .attr("y", 20)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "middle")
                .attr("font-weight", 500)
                .attr("font-size", 15)

            tip.append("text")
                .text("Tipping Point")
                .attr("x", 990)
                .attr("y", 20)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "end")
                .attr("font-weight", 500)
                .attr("font-size", 15)

            tip.append("text")
                .text("Proj. Margin")
                .attr("x", 500)
                .attr("y", 20)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "middle")
                .attr("font-weight", 500)
                .attr("font-size", 20)


            var pct = [-50, -25, 0, 25, 50]

            tip.selectAll("seats")
                .data(pct)
                .enter()
                .append("line")
                .attr("x1", d => 200 + x2(d))
                .attr("x2", d => 200 + x2(d))
                .attr("y1", 50)
                .attr("y2", 1800)
                .attr("stroke", "#afafaf")

            tip.selectAll("seats")
                .data(bars)
                .enter()
                .append("line")
                .attr("x1", 10)
                .attr("x2", 990)
                .attr("y1", (d, i) => 50 + 50 * i)
                .attr("y2", (d, i) => 50 + 50 * i)
                .attr("stroke", "#afafaf")

            tip.selectAll("seats")
                .data(pct)
                .enter()
                .append("text")
                .text(d => d == 0 ? 0 : d > 0 ? "R+" + d : "D+" + -d)
                .attr("y", 40)
                .attr("x", d => 200 + x2(d))
                .attr("fill", d => d == 0 ? "#afafaf" : d > 0 ? colors[0] : colors[1])
                .attr("font-weight", "500")
                .style("font-size", "15")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")

            tip.selectAll("bars")
                .data(bars)
                .enter()
                .append("a")
                .attr("xlink:href", d => d.state == "Georgia*" ? "Georgia-Special" : d.state)
                .append("text")
                .text(d => d.state)
                .attr("x", 10)
                .attr("y", (d, i) => 75 + i * 50)
                .attr("dominant-baseline", "central")
                .attr("text-amchor", "middle")
                .attr("font-weight", 500)

            tip.selectAll("bars")
                .data(bars)
                .enter()
                .append("rect")
                .attr("x", d => 200 + x2(d.margin - d.stdev))
                .attr("y", (d, i) => 55 + i * 50)
                .attr("height", 40)
                .attr("width", d =>
                    d.margin - d.stdev < 0 ? d.margin + d.stdev < 0 ?
                        x2(d.margin + d.stdev) - x2(d.margin - d.stdev) : x2(0) - x2(d.margin - d.stdev) : 0
                )
                .attr("fill", colors[1])
                .attr("opacity", .5)

            tip.selectAll("bars")
                .data(bars)
                .enter()
                .append("rect")
                .attr("x", d => d.margin - d.stdev > 0 ? 200 + x2(d.margin - d.stdev) : x2(0) + 200)
                .attr("y", (d, i) => 55 + i * 50)
                .attr("height", 40)
                .attr("width", d =>
                    d.margin > 0 ? d.margin - d.stdev > 0 ?
                        x2(d.margin + d.stdev) - x2(d.margin - d.stdev) : x2(d.margin + d.stdev) - x2(0) : x2(d.margin + d.stdev) - x2(0)
                )
                .attr("fill", colors[0])
                .attr("opacity", .5)

            tip.selectAll("bars")
                .data(bars)
                .enter()
                .append("text")
                .text(d => d.margin == 0 ? 0 : d.margin > 0 ? "R+" + nf(d.margin) : "D+" + nf(-d.margin))
                .attr("x", 880)
                .attr("y", (d, i) => 75 + i * 50)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "middle")
                .attr("font-weight", 500)
                .attr("fill", d => d.margin == 0 ? "#afafaf" : d.margin > 0 ? colors[0] : colors[1])

            tip.selectAll("bars")
                .data(bars)
                .enter()
                .append("text")
                .text(d => nf(d.tipping_point))
                .attr("x", 990)
                .attr("y", (d, i) => 75 + i * 50)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "end")
                .attr("font-weight", 500)

            tip.selectAll("bars")
                .data(bars)
                .enter()
                .append("rect")
                .attr("x", d => 200 + x2(d.margin) - 5)
                .attr("y", (d, i) => 70 + i * 50)
                .attr("height", 10)
                .attr("width", 10)
                .attr("fill", d => d.margin > 0 ? colors[0] : colors[1])
                .attr("stroke", "white")
                .attr("stroke-width", 2)
                .attr("ry", 3)

            var time_data = data.filter(d => d.state == key_state)


            console.log(data)
            var time_data = time_data.map((d, i) => {
                return {
                    date: d.date,
                    party: d.party,
                    win: d.win,
                    seats: d.p_90,
                }
            })
            console.log(time_data)

            var data_length = time_data.filter(d => d.party == "REP").length
            var max_date = d3.max(time_data, d => d.date)

            var line_data = []
            for (let j = 0; j < data_length; j++) {
                var ld = {
                    date: time_data.filter(d => d.party == "REP")[j].date,
                    repwin: time_data.filter(d => d.party == "REP")[j].win,
                    demwin: time_data.filter(d => d.party == "DEM")[j].win,
                    repseats: time_data.filter(d => d.party == "REP")[j].seats,
                    demseats: time_data.filter(d => d.party == "DEM")[j].seats,
                }
                line_data.push(ld)
            }
            console.log(line_data)
            var width = 1400 - margin.left - margin.right
            var height = 600 - margin.top - margin.bottom
            var axisPad = 12
            var parseTime = d3.timeParse("%Y-%m-%d"),
                formatDate = d3.timeFormat("%b - %d"),
                formatMonth = d3.timeFormat("%Y-%m-%d"),
                bisectDate = d3.bisector(d => d.date).left,
                wholevalue = d3.format(".0f"),
                onevalue = d3.format(".1f")


            var x = d3.scaleTime()
                .rangeRound([margin.left, width - margin.right])
                .domain([new Date(2020, 3, 1), new Date(2020, 10, 3)])

            var y = d3.scaleLinear()
                .rangeRound([600 - margin.bottom, margin.top]);


            var z = d3.scaleOrdinal()
                .range(colors)
                ;

            var line = d3.line()
                .curve(d3.curveLinear)
                .x(d => x(d.date))
                .y(d => y(d.pct));

            time.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + (height - margin.bottom) + ")")
                .call(d3.axisBottom(x).tickSize(-520).ticks(5)
                    .tickFormat(d3.timeFormat("%b")))
                .call(g => {
                    var years = x.ticks(d3.timeYear.every(1))
                    var xshift = 0
                    g.selectAll("text")
                        .style("text-anchor", "right")
                        .attr("y", 15)
                        .attr('fill', 'black')
                        .attr('font-size', 20)
                        .attr('font-weight', 800)
                    g.selectAll("line")
                        .attr("opacity", .2)
                        .attr("stroke", "grey")


                    g.select(".domain")
                        .attr("opacity", 0)


                })

            time.append("line")
                .attr("x1", x(new Date(2020, 10, 3)))
                .attr("x2", x(new Date(2020, 10, 3)))
                .attr("y1", 20)
                .attr("y2", (height - margin.bottom))
                .attr("stroke", "black")
                .attr("stroke-width", 3)

            time.append("text")
                .text("Nov. 3rd")
                .attr("x", x(new Date(2020, 10, 3)))
                .attr("y", 10)
                .attr("font-weight", "500")
                .attr("font-size", 20)



            time.append("g")
                .attr("class", "y-axis")
                .attr("transform", "translate(" + margin.left + ",0)");

            var focus = time.append("g")
                .attr("class", "focus")
                .style("display", "none");

            focus.append("line").attr("class", "lineHover")
                .style("stroke", "#999")
                .attr("stroke-width", 1)
                .style("shape-rendering", "crispEdges")
                .style("opacity", 0)
                .attr("y1", -height)
                .attr("y2", -40);

            focus.append("text").attr("class", "lineHoverDate")
                .attr("text-anchor", "middle")
                .attr("font-size", 12);

            var overlay = time.append("rect")
                .attr("class", "overlay")
                .attr("x", margin.left)
                .attr("width", x(max_date) - margin.left)
                .attr("height", height)

            var keys = ["repwin", "demwin", "repseats", "demseats"]
            update("win", 0);


            function update(input, speed) {

                var copy = keys.filter(f => f.includes(input))
                var cities = copy.map(function (id) {
                    return {
                        party: id.substring(0, 3).toUpperCase(),
                        values: line_data.map(d => { return { date: d.date, pct: +d[id] } })
                    };
                });
                console.log(cities)
                y.domain([
                    0,
                    100
                ]).nice();

                time.selectAll(".y-axis").transition()
                    .duration(speed)
                    .call(d3.axisLeft(y).tickSize(-1280).ticks(5)).call(g => {
                        var years = x.ticks(d3.timeYear.every(1))
                        var xshift = 0
                        g.selectAll("text")
                            .style("text-anchor", "right")
                            .attr("y", 0)
                            .attr('fill', 'black')
                            .attr('font-size', 20)
                            .attr('font-weight', 500)
                        g.selectAll("line")
                            .attr("opacity", .2)
                            .attr("stroke", "grey")


                        g.select(".domain")
                            .attr("opacity", 0)


                    })

                var city = time.selectAll(".cities")
                    .data(cities);

                city.exit().remove();

                city.enter().insert("g", ".focus").append("path")
                    .attr("class", "line cities")
                    .style("stroke", (d, i) => cand_colors(d.party))
                    .style("stroke-width", 3)
                    .style("opacity", .9)
                    .style("stroke-linecap", "round")
                    .attr("stroke-linejoin", "round")
                    .merge(city)
                    .transition().duration(speed)
                    .attr("d", d => line(d.values))





                tooltip(copy);

                function tooltip(copy) {
                    var rect = focus.selectAll(".lineHoverRect")
                        .data(copy)

                    var labels2 = focus.selectAll(".lineHoverText2")
                        .data(copy)

                    labels2.enter().append("text")
                        .attr("class", "lineHoverText2")
                        .attr("font-size", 25)
                        .style("fill", "white")
                        .style("stroke", "white")
                        .style("stroke-width", 5)
                        .merge(labels2)

                    var labels = focus.selectAll(".lineHoverText")
                        .data(copy)

                    labels.enter().append("text")
                        .attr("class", "lineHoverText")
                        .attr("text-anchor", "middle")
                        .attr("font-size", 25)
                        .merge(labels)

                    var circles = focus.selectAll(".hoverCircle")
                        .data(copy)

                    circles.enter().append("circle")
                        .attr("class", "hoverCircle")
                        .style("stroke", d => z(d))
                        .style("stroke-width", 3)
                        .style("fill", "white")
                        .attr("r", 3)
                        .merge(circles);

                    time.selectAll(".overlay")
                        .on("mouseover", () => focus.style("display", null))
                        .on("mouseout", () => focus.style("display", "none"))
                        .on("mousemove", mousemove);

                    function mousemove() {

                        var x0 = x.invert(d3.mouse(this)[0]),
                            i = bisectDate(line_data, x0, 1),
                            d0 = line_data[i - 1],
                            d1 = line_data[i],
                            d = x0 - d0.date > d1.date - x0 ? d1 : d0;

                        focus.select(".lineHoverDate")
                            .attr("x", x(d.date))
                            .attr("y", 0)
                            .attr("text-anchor", "middle")
                            .style("font-size", 18)
                            .attr("font-weight", "500")
                            .text(formatDate(d.date));

                        focus.selectAll(".hoverCircle")
                            .attr("cy", e => y(d[e]))
                            .attr("cx", x(d.date));



                        focus.selectAll(".lineHoverText")
                            .attr("font-weight", "500")
                            .attr("x", x(d.date) + 10)
                            .text((e, i) => i == 0 ? "REP " + nf(d[e]) : "DEM " + nf(d[e]))
                            .attr("fill", (e, i) => colors[i])
                            .attr("y", e => d[e] == d["rep" + input] ? y(d["rep" + input]) > y(d["dem" + input]) ? y(d["rep" + input]) + 15 : y(d["rep" + input]) - 15 : d[e] == d["dem" + input] ? y(d["dem" + input]) > y(d["rep" + input]) ? y(d["dem" + input]) + 15 : y(d["dem" + input]) - 15 : y(d[e]) - 15)
                            .attr("text-anchor", (e, i) => i == 2 ? "end" : "start")
                            .attr("dominant-baseline", "middle")
                    }
                }
                var winbutton = d3.select("#winbutton")
                    .on("click", function () {
                        update("win", 500)
                    })

                var seatsbutton = d3.select("#seatsbutton")
                    .on("click", function () {
                        update("seats", 500)
                    })

            }
            //phone layouts



            toplinePhone.append("image")
                .attr("href", "https://jhkforecasts.com/elephant-01.png")
                .attr("x", 890)
                .attr("y", 0)
                .attr("height", 100)
                .attr("width", 100)

            toplinePhone.append("image")
                .attr("href", "https://jhkforecasts.com/donkey-01.png")
                .attr("x", 10)
                .attr("y", 0)
                .attr("height", 100)
                .attr("width", 100)

            toplinePhone.append("text")
                .text("Democrats")
                .attr("x", 120)
                .attr("y", 40)
                .attr("dominant-baseline", "top")
                .attr("text-anchor", "start")
                .attr("font-size", "40")

            toplinePhone.append("text")
                .text("Republicans")
                .attr("x", 880)
                .attr("y", 40)
                .attr("dominant-baseline", "top")
                .attr("text-anchor", "end")
                .attr("font-size", "40")


            toplinePhone.append("text")
                .text(nf(rep_win_senate) + "%")
                .attr("x", 880)
                .attr("y", 80)
                .attr("dominant-baseline", "bottom")
                .attr("text-anchor", "end")
                .attr("font-size", "35")
                .attr("fill", colors[0])
                .attr("font-weight", 500)

            toplinePhone.append("text")
                .text(nf(dem_win_senate) + "%")
                .attr("x", 120)
                .attr("y", 80)
                .attr("dominant-baseline", "bottom")
                .attr("text-anchor", "start")
                .attr("font-size", "35")
                .attr("fill", colors[1])
                .attr("font-weight", 500)
            var mapPhone = d3.select("#usmapPhone")
                .append("svg")
                .attr("viewBox", '75 20 900 460');

            var tool_tipPhone = d3.tip()
                .attr("class", "d3-tip")
                .offset([-200, -150])
                .html("<div id='tipDiv2'></div>");

            mapPhone.call(tool_tipPhone);
            mapPhone.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("class", "states")
                .attr("d", path)
                .style("stroke", "white")
                .style("stroke-width", "1")
                .style("fill", d => d.properties.cands == undefined ? "#cfcfcf" : color(d3.sum(d.properties.cands.filter(d => d.party == "REP"), d => d.win)))

            mapPhone.selectAll("label")
                .data(states)
                .enter()
                .append("text")
                .text(d => d.label)
                .attr("x", d => d.cx)
                .attr("y", d => d.cy)
                .style("font-family", "sf-mono")
                .attr("font-size", "16")
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", "500")

            mapPhone.selectAll("path2")
                .data(json.features)
                .enter()
                //.append("a")
                //.attr("xlink:href", d => d.properties.name)
                .append("path")
                .attr("class", "statesover")
                .attr("d", path)
                .style("stroke", d => d.properties.tipping_point >= 3 ? "black" : "none")
                .style("stroke-width", "1.5")

            mapPhone.append("rect")
                .attr("x", 880)
                .attr("y", 420)
                .attr("width", 20)
                .attr("height", 20)
                .style("stroke", "black")
                .style("stroke-width", 2)
                .attr("ry", "6")
                .style("fill", "none");

            mapPhone.append("text")
                .text("Tipping Points")
                .attr("x", 790)
                .attr("y", 430)
                .attr("fill", "black")
                .style("font-weight", "500")
                .style("font-size", "15");
            var pct = [60, 70, 80, 90, 100]

            mapPhone.selectAll("pct")
                .data(pct)
                .enter()
                .append("circle")
                .attr("r", 10)
                .attr("cy", (d, i) => 340)
                .attr("cx", (d, i) => 800 + i * 25)
                .attr("fill", d => color(d))


            mapPhone.selectAll("pct")
                .data(pct)
                .enter()
                .append("circle")
                .attr("r", 10)
                .attr("cy", (d, i) => 370)
                .attr("cx", (d, i) => 800 + i * 25)
                .attr("fill", d => color(100 - d))


            mapPhone.selectAll("pct")
                .data(pct)
                .enter()
                .append("text")
                .text(d => d)
                .attr("y", 400)
                .attr("x", (d, i) => 800 + i * 25)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-size", 12)
                .attr("font-weight", "500")


            mapPhone.append("text")
                .text("Win State")
                .attr("y", 310)
                .attr("x", 850)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-size", 15)
                .attr("font-weight", "500")
            var width = 50,
                height = 50;
            var projection2 = d3.geoAlbers();

            var path2 = d3.geoPath()
                .projection(projection2);

            var state = us.features.filter(d => d.properties.name == "Georgia")[0];

            projection2
                .scale(1)
                .translate([0, 0]);

            var b = path2.bounds(state),
                s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
                t = [((width - s * (b[1][0] + b[0][0])) / 2), ((height - s * (b[1][1] + b[0][1])) / 2) + 50];

            projection2
                .scale(s)
                .translate(t);
            var ga_special = today.filter(d => d.state_index == "Georgia: Class III")

            mapPhone.append("path")
                .datum(state)
                .attr("fill", color(d3.sum(ga_special.filter(d => d.party == "REP"), d => d.win)))
                .attr("d", path2)
                .style("stroke", "grey")
                .attr("transform", "translate(725,280)")

            mapPhone.append("text")
                .text("GA*")
                .attr("x", 750)
                .attr("y", 360)
                .style("font-family", "sf-mono")
                .attr("font-size", "16")
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", "500")

            mapPhone.append("path")
                .datum(state)
                .attr("class", "statesover")
                .attr("fill", "none")
                .attr("d", path2)
                .style("stroke", ga_special[0].tipping_point > 3 ? "black" : "grey")
                .attr("transform", "translate(725,280)").style("stroke-width", "1.5")


            var arcPhone = d3.arc()
                .outerRadius(500)
                .innerRadius(300)
                ;

            var piePhone = d3.pie()
                .sort(null)
                .value(function (d) {
                    return d.seats;
                })
                .startAngle(-3)
                .endAngle(3);



            congressPhone.selectAll(".arc")
                .data(piePhone(seats))
                .enter().append("path")
                .attr("d", arcPhone)
                .style("fill", d => color(d.data.win))
                .attr("stroke", "white");

            congressPhone.selectAll(".arc")
                .data(piePhone(seats))
                .enter().append("text")
                .attr("transform", function (d) {
                    var _d = arcPhone.centroid(d);
                    _d[0] *= 1.27;
                    _d[1] *= 1.27;
                    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
                    return "translate(" + _d + ")rotate(" + a + ")";
                })
                .style("text-anchor", "start")
                .style("dominant-baseline", "central")
                .text(d => d.data.abbrev)
                .style("font-family", "sf-mono")
                .attr("font-size", 18);

            congressPhone.append("line")
                .attr("x1", 0)
                .attr("x2", 0)
                .attr("y1", -150)
                .attr("y2", -500)
                .attr("stroke", "black")

            congressPhone.append("text")
                .text("50-50 SPLIT")
                .attr("y", -120)
                .attr("x", 0)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "top")

            congressPhone.append("text")
                .text("30 Repbulican Seats")
                .attr("y", -100)
                .attr("x", 400)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "top")
            congressPhone.append("text")
                .text("not up for Re-election")
                .attr("y", -100)
                .attr("x", 400)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "top")
                .attr("dy", "1em")

            congressPhone.append("text")
                .text("35 Democrat Seats")
                .attr("y", -120)
                .attr("x", -400)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "top")
            congressPhone.append("text")
                .text("not up for Re-election")
                .attr("y", -120)
                .attr("x", -400)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "top")
                .attr("dy", "1em")


            var hist_scale = d3.scaleLinear()
                .domain([0, 20])
                .range([0, 600]);

            var tie_length = hist_scale(hist[10].prob)
            var biden_win = +today[1].poll_avg * tie_length / 100
            console.log(tie_length)
            var pct = [0, 5, 10, 15, 20]
            histogramPhone.selectAll("seats")
                .data(pct)
                .enter()
                .append("line")
                .attr("x1", d => 350 + hist_scale(d))
                .attr("x2", d => 350 + hist_scale(d))
                .attr("y1", 57.5)
                .attr("y2", 800)
                .attr("stroke", "lightgrey")

            histogramPhone.selectAll("seats")
                .data(hist)
                .enter()
                .append("line")
                .attr("x1", 50)
                .attr("x2", 950)
                .attr("y1", (d, i) => 57.5 + i * 30)
                .attr("y2", (d, i) => 57.5 + i * 30)
                .attr("stroke", "lightgrey")

            histogramPhone.selectAll("seats")
                .data(hist)
                .enter()
                .append("rect")
                .attr("y", (d, i) => 60 + i * 30)
                .attr("x", 57.5)
                .attr("fill", d => rep_hist(d.rep_seats))
                .attr("height", 25)
                .attr("width", 25)

            histogramPhone.selectAll("seats")
                .data(hist)
                .enter()
                .append("rect")
                .attr("y", (d, i) => 60 + i * 30)
                .attr("x", 137.5)
                .attr("fill", d => dem_hist(d.dem_seats))
                .attr("height", 25)
                .attr("width", 25)

            histogramPhone.append("text")
                .text("GOP")
                .attr("y", 40)
                .attr("x", 70)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "20")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")
                .style("font-family", "sf-mono")

            histogramPhone.append("text")
                .text("DEM")
                .attr("y", 40)
                .attr("x", 150)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "20")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")
                .style("font-family", "sf-mono")


            histogramPhone.append("text")
                .text("Seats")
                .attr("y", 10)
                .attr("x", 115)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "25")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")

            histogramPhone.append("text")
                .text("Probability")
                .attr("y", 10)
                .attr("x", 250)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "25")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")

            histogramPhone.selectAll("seats")
                .data(hist)
                .enter()
                .append("text")
                .text(d => d.rep_seats)
                .attr("y", (d, i) => 72.5 + i * 30)
                .attr("x", 70)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")

            histogramPhone.selectAll("seats")
                .data(hist)
                .enter()
                .append("text")
                .text(d => d.dem_seats)
                .attr("y", (d, i) => 72.5 + i * 30)
                .attr("x", 150)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "18")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")

            histogramPhone.selectAll("seats")
                .data(hist)
                .enter()
                .append("text")
                .text(d => nf(d.prob))
                .attr("y", (d, i) => 70 + i * 30)
                .attr("x", 250)
                .attr("fill", "black")
                .attr("font-weight", "500")
                .style("font-size", "15")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")

            histogramPhone.selectAll("seats")
                .data(hist)
                .enter()
                .append("rect")
                .attr("y", (d, i) => 60 + i * 30)
                .attr("x", 350)
                .attr("fill", (d, i) => i > 10 ? colors[0] : colors[1])
                .attr("height", 25)
                .attr("width", d => hist_scale(d.prob))

            histogramPhone.append("rect")
                .attr("y", 360)
                .attr("x", 350 + biden_win)
                .attr("fill", colors[0])
                .attr("height", 25)
                .attr("width", tie_length - biden_win)


            histogramPhone.selectAll("seats")
                .data(pct)
                .enter()
                .append("text")
                .text(d => d)
                .attr("y", 40)
                .attr("x", d => 350 + hist_scale(d))
                .attr("fill", "#afafaf")
                .attr("font-weight", "500")
                .style("font-size", "15")
                .attr("text-anchor", "middle")


            var x2 = d3.scaleLinear()
                .domain([-50, 50])
                .range([0, 600]);

            tipPhone.append("text")
                .text("Margin")
                .attr("x", 880)
                .attr("y", 20)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "middle")
                .attr("font-weight", 500)
                .attr("font-size", 15)

            tipPhone.append("text")
                .text("Tipping Point")
                .attr("x", 990)
                .attr("y", 20)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "end")
                .attr("font-weight", 500)
                .attr("font-size", 15)

            tipPhone.append("text")
                .text("Proj. Margin")
                .attr("x", 500)
                .attr("y", 20)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "middle")
                .attr("font-weight", 500)
                .attr("font-size", 20)


            var pct = [-50, -25, 0, 25, 50]

            tipPhone.selectAll("seats")
                .data(pct)
                .enter()
                .append("line")
                .attr("x1", d => 200 + x2(d))
                .attr("x2", d => 200 + x2(d))
                .attr("y1", 50)
                .attr("y2", 1800)
                .attr("stroke", "#afafaf")

            tipPhone.selectAll("seats")
                .data(bars)
                .enter()
                .append("line")
                .attr("x1", 10)
                .attr("x2", 990)
                .attr("y1", (d, i) => 50 + 50 * i)
                .attr("y2", (d, i) => 50 + 50 * i)
                .attr("stroke", "#afafaf")

            tipPhone.selectAll("seats")
                .data(pct)
                .enter()
                .append("text")
                .text(d => d == 0 ? 0 : d > 0 ? "R+" + d : "D+" + -d)
                .attr("y", 40)
                .attr("x", d => 200 + x2(d))
                .attr("fill", d => d == 0 ? "#afafaf" : d > 0 ? colors[0] : colors[1])
                .attr("font-weight", "500")
                .style("font-size", "15")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")

            tipPhone.selectAll("bars")
                .data(bars)
                .enter()
                .append("a")
                .attr("xlink:href", d => d.state == "Georgia*" ? "Georgia-Special" : d.state)
                .append("text")
                .text(d => d.state)
                .attr("x", 10)
                .attr("y", (d, i) => 75 + i * 50)
                .attr("dominant-baseline", "central")
                .attr("text-amchor", "middle")
                .attr("font-weight", 500)

            tipPhone.selectAll("bars")
                .data(bars)
                .enter()
                .append("rect")
                .attr("x", d => 200 + x2(d.margin - d.stdev))
                .attr("y", (d, i) => 55 + i * 50)
                .attr("height", 40)
                .attr("width", d =>
                    d.margin - d.stdev < 0 ? d.margin + d.stdev < 0 ?
                        x2(d.margin + d.stdev) - x2(d.margin - d.stdev) : x2(0) - x2(d.margin - d.stdev) : 0
                )
                .attr("fill", colors[1])
                .attr("opacity", .5)

            tipPhone.selectAll("bars")
                .data(bars)
                .enter()
                .append("rect")
                .attr("x", d => d.margin - d.stdev > 0 ? 200 + x2(d.margin - d.stdev) : x2(0) + 200)
                .attr("y", (d, i) => 55 + i * 50)
                .attr("height", 40)
                .attr("width", d =>
                    d.margin > 0 ? d.margin - d.stdev > 0 ?
                        x2(d.margin + d.stdev) - x2(d.margin - d.stdev) : x2(d.margin + d.stdev) - x2(0) : x2(d.margin + d.stdev) - x2(0)
                )
                .attr("fill", colors[0])
                .attr("opacity", .5)

            tipPhone.selectAll("bars")
                .data(bars)
                .enter()
                .append("text")
                .text(d => d.margin == 0 ? 0 : d.margin > 0 ? "R+" + nf(d.margin) : "D+" + nf(-d.margin))
                .attr("x", 880)
                .attr("y", (d, i) => 75 + i * 50)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "middle")
                .attr("font-weight", 500)
                .attr("fill", d => d.margin == 0 ? "#afafaf" : d.margin > 0 ? colors[0] : colors[1])

            tipPhone.selectAll("bars")
                .data(bars)
                .enter()
                .append("text")
                .text(d => nf(d.tipping_point))
                .attr("x", 990)
                .attr("y", (d, i) => 75 + i * 50)
                .attr("dominant-baseline", "central")
                .attr("text-anchor", "end")
                .attr("font-weight", 500)

            tipPhone.selectAll("bars")
                .data(bars)
                .enter()
                .append("rect")
                .attr("x", d => 200 + x2(d.margin) - 5)
                .attr("y", (d, i) => 70 + i * 50)
                .attr("height", 10)
                .attr("width", 10)
                .attr("fill", d => d.margin > 0 ? colors[0] : colors[1])
                .attr("stroke", "white")
                .attr("stroke-width", 2)
                .attr("ry", 3)

        })
    
}