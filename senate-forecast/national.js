var colors = ["#FF6060", "#0091FF", "#FFE130", "#C473F6", "#31DE70"]

var category = ["REP", "DEM", "LIB", "IND", "GREEN"]

var cand_colors = d3.scaleOrdinal()
    .domain(category)
    .range(colors)
var tformat = d3.timeFormat("%m/%d/%Y")
var timeformat = d3.timeFormat("%m/%d/%y")
var dateparse = d3.timeParse("%m/%d/%y")
var timeparse = d3.timeParse("%m/%d/%y %H:%M")
var numberformat = d3.format(".1f")
var updated_format = d3.timeFormat("%b. %d %Y %I:%M %p")
var widthmap = 1020
var heightmap = 500;
var bubble_info = [{ "state": "Alabama", "abbrev": "AL", "radius": 16.43, "x": 413, "y": 332 }, { "state": "Alaska", "abbrev": "AK", "radius": 9.49, "x": 41, "y": 19 }, { "state": "Arizona", "abbrev": "AZ", "radius": 18.17, "x": 172, "y": 282 }, { "state": "Arkansas", "abbrev": "AR", "radius": 13.42, "x": 325, "y": 290 }, { "state": "California", "abbrev": "CA", "radius": 40.62, "x": 103, "y": 237 }, { "state": "Colorado", "abbrev": "CO", "radius": 16.43, "x": 224, "y": 249 }, { "state": "Connecticut", "abbrev": "CT", "radius": 14.49, "x": 586, "y": 128 }, { "state": "Delaware", "abbrev": "DE", "radius": 9.49, "x": 557, "y": 183 }, { "state": "District of Columbia", "abbrev": "DC", "radius": 9.49, "x": 536, "y": 193 }, { "state": "Florida", "abbrev": "FL", "radius": 29.5, "x": 483, "y": 380 }, { "state": "Georgia", "abbrev": "GA", "radius": 21.91, "x": 443, "y": 298 }, { "state": "Hawaii", "abbrev": "HI", "radius": 10.95, "x": 88, "y": 372 }, { "state": "Idaho", "abbrev": "ID", "radius": 10.95, "x": 188, "y": 173 }, { "state": "Illinois", "abbrev": "IL", "radius": 24.49, "x": 359, "y": 207 }, { "state": "Indiana", "abbrev": "IN", "radius": 18.17, "x": 413, "y": 207 }, { "state": "Iowa", "abbrev": "IA", "radius": 13.42, "x": 306, "y": 195 }, { "state": "Kansas", "abbrev": "KS", "radius": 13.42, "x": 266, "y": 248 }, { "state": "Kentucky", "abbrev": "KY", "radius": 15.49, "x": 411, "y": 251 }, { "state": "Louisiana", "abbrev": "LA", "radius": 15.49, "x": 326, "y": 335 }, { "state": "Maine", "abbrev": "ME", "radius": 7.75, "x": 628, "y": 26 }, { "state": "Maryland", "abbrev": "MD", "radius": 17.32, "x": 505, "y": 185 }, { "state": "Massachusetts", "abbrev": "MA", "radius": 18.17, "x": 607, "y": 89 }, { "state": "Michigan", "abbrev": "MI", "radius": 21.91, "x": 418, "y": 149 }, { "state": "Minnesota", "abbrev": "MN", "radius": 17.32, "x": 304, "y": 142 }, { "state": "Mississippi", "abbrev": "MS", "radius": 13.42, "x": 373, "y": 324 }, { "state": "Missouri", "abbrev": "MO", "radius": 17.32, "x": 329, "y": 251 }, { "state": "Montana", "abbrev": "MT", "radius": 9.49, "x": 206, "y": 131 }, { "state": "Nebraska", "abbrev": "NE", "radius": 7.75, "x": 258, "y": 209 }, { "state": "Nevada", "abbrev": "NV", "radius": 13.42, "x": 167, "y": 220 }, { "state": "New Hampshire", "abbrev": "NH", "radius": 10.95, "x": 612, "y": 54 }, { "state": "New Jersey", "abbrev": "NJ", "radius": 20.49, "x": 551, "y": 147 }, { "state": "New Mexico", "abbrev": "NM", "radius": 12.25, "x": 215, "y": 303 }, { "state": "New York", "abbrev": "NY", "radius": 29.5, "x": 548, "y": 81 }, { "state": "North Carolina", "abbrev": "NC", "radius": 21.21, "x": 499, "y": 278 }, { "state": "North Dakota", "abbrev": "ND", "radius": 9.49, "x": 257, "y": 136 }, { "state": "Ohio", "abbrev": "OH", "radius": 23.24, "x": 459, "y": 191 }, { "state": "Oklahoma", "abbrev": "OK", "radius": 14.49, "x": 270, "y": 294 }, { "state": "Oregon", "abbrev": "OR", "radius": 14.49, "x": 124, "y": 176 }, { "state": "Pennsylvania", "abbrev": "PA", "radius": 24.49, "x": 498, "y": 132 }, { "state": "Rhode Island", "abbrev": "RI", "radius": 10.95, "x": 619, "y": 126 }, { "state": "South Carolina", "abbrev": "SC", "radius": 16.43, "x": 487, "y": 322 }, { "state": "South Dakota", "abbrev": "SD", "radius": 9.49, "x": 257, "y": 167 }, { "state": "Tennessee", "abbrev": "TN", "radius": 18.17, "x": 379, "y": 284 }, { "state": "Texas", "abbrev": "TX", "radius": 33.76, "x": 271, "y": 355 }, { "state": "Utah", "abbrev": "UT", "radius": 13.42, "x": 204, "y": 218 }, { "state": "Vermont", "abbrev": "VT", "radius": 9.49, "x": 585, "y": 47 }, { "state": "Virginia", "abbrev": "VA", "radius": 19.75, "x": 508, "y": 229 }, { "state": "Washington", "abbrev": "WA", "radius": 18.97, "x": 154, "y": 131 }, { "state": "West Virginia", "abbrev": "WV", "radius": 12.25, "x": 451, "y": 242 }, { "state": "Wisconsin", "abbrev": "WI", "radius": 17.32, "x": 359, "y": 146 }, { "state": "Wyoming", "abbrev": "WY", "radius": 9.49, "x": 214, "y": 177 }, { "state": "Maine-1", "abbrev": 1, "radius": 5.48, "x": 612, "y": 26 }, { "state": "Maine-2", "abbrev": 2, "radius": 5.48, "x": 644, "y": 26 }, { "state": "Nebraska-1", "abbrev": 1, "radius": 5.48, "x": 242, "y": 209 }, { "state": "Nebraska-2", "abbrev": 2, "radius": 5.48, "x": 258, "y": 193 }, { "state": "Nebraska-3", "abbrev": 3, "radius": 5.48, "x": 274, "y": 209 }]
var map_states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
var map_labels = [{ "state": "Alabama", "label": "AL", "xValue": 637, "yValue": 338.6934 }, { "state": "Alaska", "label": "AK", "xValue": 245, "yValue": 400 }, { "state": "Arizona", "label": "AZ", "xValue": 315, "yValue": 306.5801 }, { "state": "Arkansas", "label": "AR", "xValue": 560, "yValue": 315.6387 }, { "state": "California", "label": "CA", "xValue": 223, "yValue": 253.9219 }, { "state": "Colorado", "label": "CO", "xValue": 400, "yValue": 245.5645 }, { "state": "Connecticut", "label": "CT", "xValue": -1000, "yValue": -1000 }, { "state": "Delaware", "label": "DE", "xValue": -1000, "yValue": -1000 }, { "state": "District of Columbia", "label": "DC", "xValue": -1000, "yValue": -1000 }, { "state": "Florida", "label": "FL", "xValue": 714, "yValue": 397.8154 }, { "state": "Georgia", "label": "GA", "xValue": 680.0117, "yValue": 335.2354 }, { "state": "Hawaii", "label": "HI", "xValue": 380, "yValue": 465 }, { "state": "Idaho", "label": "ID", "xValue": 310.1851, "yValue": 155 }, { "state": "Illinois", "label": "IL", "xValue": 596.6602, "yValue": 231.2954 }, { "state": "Indiana", "label": "IN", "xValue": 633.4111, "yValue": 228.4214 }, { "state": "Iowa", "label": "IA", "xValue": 545.8457, "yValue": 202.6782 }, { "state": "Kansas", "label": "KS", "xValue": 487, "yValue": 259.1592 }, { "state": "Kentucky", "label": "KY", "xValue": 655.1484, "yValue": 264.9658 }, { "state": "Louisiana", "label": "LA", "xValue": 561.4404, "yValue": 369.8135 }, { "state": "Maine", "label": "ME", "xValue": 807.3105, "yValue": 109.855 }, { "state": "Maryland", "label": "MD", "xValue": -1000, "yValue": -1000 }, { "state": "Massachusetts", "label": "MA", "xValue": -1000, "yValue": -1000 }, { "state": "Michigan", "label": "MI", "xValue": 645.6465, "yValue": 181.3647 }, { "state": "Minnesota", "label": "MN", "xValue": 530.8594, "yValue": 141.5874 }, { "state": "Mississippi", "label": "MS", "xValue": 598.6016, "yValue": 342.1514 }, { "state": "Missouri", "label": "MO", "xValue": 557, "yValue": 261.123 }, { "state": "Montana", "label": "MT", "xValue": 370.0981, "yValue": 112.7705 }, { "state": "Nebraska", "label": "NE", "xValue": 473.8364, "yValue": 210.0527 }, { "state": "Nevada", "label": "NV", "xValue": 267.8765, "yValue": 219.0957 }, { "state": "New Hampshire", "label": "NH", "xValue": -1000, "yValue": -1000 }, { "state": "New Jersey", "label": "NJ", "xValue": 785, "yValue": 210 }, { "state": "New Mexico", "label": "NM", "xValue": 385.3774, "yValue": 314.1035 }, { "state": "New York", "label": "NY", "xValue": 753.5781, "yValue": 163.2588 }, { "state": "North Carolina", "label": "NC", "xValue": 728.6084, "yValue": 284.5029 }, { "state": "North Dakota", "label": "ND", "xValue": 467.0742, "yValue": 117.3823 }, { "state": "Ohio", "label": "OH", "xValue": 670.7197, "yValue": 219.4883 }, { "state": "Oklahoma", "label": "OK", "xValue": 500.1963, "yValue": 306.418 }, { "state": "Oregon", "label": "OR", "xValue": 240.2783, "yValue": 139.5654 }, { "state": "Pennsylvania", "label": "PA", "xValue": 730.3535, "yValue": 200.856 }, { "state": "Rhode Island", "label": "RI", "xValue": -1000, "yValue": -1000 }, { "state": "South Carolina", "label": "SC", "xValue": 712.4395, "yValue": 315.6387 }, { "state": "South Dakota", "label": "SD", "xValue": 468.0742, "yValue": 163.5166 }, { "state": "Tennessee", "label": "TN", "xValue": 640.8594, "yValue": 290.8193 }, { "state": "Texas", "label": "TX", "xValue": 480.9902, "yValue": 374.2861 }, { "state": "Utah", "label": "UT", "xValue": 330.1084, "yValue": 234.978 }, { "state": "Vermont", "label": "VT", "xValue": -1000, "yValue": -1000 }, { "state": "Virginia", "label": "VA", "xValue": 731.0264, "yValue": 252.7842 }, { "state": "Washington", "label": "WA", "xValue": 256.9365, "yValue": 88.0762 }, { "state": "West Virginia", "label": "WV", "xValue": 701, "yValue": 243 }, { "state": "Wisconsin", "label": "WI", "xValue": 585.2529, "yValue": 163.2588 }, { "state": "Wyoming", "label": "WY", "xValue": 385.9287, "yValue": 179.6255 }]
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
d3.csv("https://data.jhkforecasts.com/2020-senate-input.csv", input_data => {

    var states = input_data.map(d => {
        return d.state
    })

    d3.csv("https://data.jhkforecasts.com/2020-senate.csv", data => {
        data.forEach((d, i) => {
            d.date = dateparse(d.forecast_date)
        })
        var today = data.filter(d => d.forecast_date == timeformat(d3.max(data, d => d.date)))
        console.log(today)



        var rep_win_senate = today[0].win
        var dem_win_senate = today[1].win
        var upset_odds = Math.min(rep_win_senate, dem_win_senate)
        var topline = d3.select("#topline").append("svg")
            .attr("viewBox", "0 0 1000 100")

        topline.append("text")
            .text("Chance of an upset is about the odds of...")
            .attr("y", 20)
            .attr("x", 400)
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("font-size", 12)
            .attr("font-weight", "500")


        topline.append("text")
            .text(events[Math.round(odds_scale(upset_odds))])
            .attr("y", 40)
            .attr("x", 400)
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("font-size", 15)
            .attr("font-weight", "500")


        topline.append("image")
            .attr("href", "https://projects.jhkforecasts.com/presidential-forecast/" + events[Math.round(odds_scale(upset_odds))] + ".svg")
            .attr("x", 562.5)
            .attr("y", 0)
            .attr("height", 75)
            .attr("width", 75)

        topline.append("image")
            .attr("href", "https://jhkforecasts.com/elephant-01.png")
            .attr("x", 900)
            .attr("y", 0)
            .attr("height", 75)
            .attr("width", 75)

        topline.append("image")
            .attr("href", "https://jhkforecasts.com/donkey-01.png")
            .attr("x", 25)
            .attr("y", 0)
            .attr("height", 75)
            .attr("width", 75)

        topline.append("text")
            .text("Democrats")
            .attr("x", 105)
            .attr("y", 20)
            .attr("dominant-baseline", "top")
            .attr("text-anchor", "start")
            .attr("font-size", "23")

        topline.append("text")
            .text("Republicans")
            .attr("x", 895)
            .attr("y", 20)
            .attr("dominant-baseline", "top")
            .attr("text-anchor", "end")
            .attr("font-size", "23")


        topline.append("text")
            .text(numberformat(rep_win_senate) + "%")
            .attr("x", 895)
            .attr("y", 60)
            .attr("dominant-baseline", "bottom")
            .attr("text-anchor", "end")
            .attr("font-size", "23")
            .attr("fill", colors[0])
            .attr("font-weight", 500)

        topline.append("text")
            .text(numberformat(dem_win_senate) + "%")
            .attr("x", 105)
            .attr("y", 60)
            .attr("dominant-baseline", "bottom")
            .attr("text-anchor", "start")
            .attr("font-size", "23")
            .attr("fill", colors[1])
            .attr("font-weight", 500)


        ///map///


        var widthmap = 1020
        var heightmap = 500;
        var projection = d3.geoAlbersUsa()
            .translate([widthmap / 2, heightmap / 2])
            .scale([900]);
        var path = d3.geoPath()
            .projection(projection);

        var color = d3.scaleLinear()
            .domain([0, 50, 100])
            .range(["#0091FF", "white", "#FF6060"]);

        var map = d3.select("#usmap")
            .append("svg")
            .attr("viewBox", '75 20 900 460');


        d3.json("https://projects.jhkforecasts.com/presidential_forecast/us-states.json", function (json) {

            for (var i = 0; i < states.length-1 ; i++) {

                var dataState = map_labels[i].state;
                

                for (var j = 0; j < json.features.length; j++) {
                    var jsonState = json.features[j].properties.name;

                    if (dataState == jsonState) {
                        
                        break;
                    }
                }
            }
            console.log(json.features)
            map.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("class", "states")
                .attr("d", path)
                .style("stroke", "white")
                .style("stroke-width", "1")
                .style("fill", "#cdcdcd")

            map.selectAll("label")
                .data(map_labels)
                .enter()
                .append("text")
                .text(d => d.label)
                .attr("x", d => d.xValue)
                .attr("y", d => d.yValue)
                .style("font-family", "sf-mono")
                .attr("font-size", "9")
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-weight", "500")

            var pct = [60, 70, 80, 90, 100]

            map.selectAll("pct")
                .data(pct)
                .enter()
                .append("circle")
                .attr("r", 10)
                .attr("cy", (d, i) => 340)
                .attr("cx", (d, i) => 800 + i * 25)
                .attr("fill", d => color(d))


            map.selectAll("pct")
                .data(pct)
                .enter()
                .append("circle")
                .attr("r", 10)
                .attr("cy", (d, i) => 370)
                .attr("cx", (d, i) => 800 + i * 25)
                .attr("fill", d => color(100 - d))


            map.selectAll("pct")
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


            map.append("text")
                .text("Win State")
                .attr("y", 310)
                .attr("x", 850)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .attr("font-size", 15)
                .attr("font-weight", "500")

        })
    })
})