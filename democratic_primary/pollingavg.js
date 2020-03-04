  /**
 * Gaussian kernel - applied within the smoothKernel function
 * @param {number} x1 - point being adjusted
 * @param {number} x2 - point used to make adjustment
 * @param {number} b - scaling parameter
 * @returns {number} result of expression
 */
function k_G(x1 , x2 , b ) {
    return (1/Math.sqrt(2*Math.PI))*Math.exp(-(Math.pow((x1 - x2),2) / (2*Math.pow(b,2))));
}

/**
 * Epanechnikov kernel - applied within the smoothKernel function
 * @param {number} x1 - point being adjusted
 * @param {number} x2 - point used to make adjustment
 * @param {number} b - scaling parameter
 * @returns {number} result of expression
 */
function k_E(x1 , x2 , b ) {
    if (Math.abs((x1 - x2) / b) > 1) {
        return 0;
    } else {
        return (3 / 4) * (1 - Math.pow(((x1 - x2) / b), 2));
    }
}

/**
 * Logistic kernel - applied within the smoothKernel function
 * @param {number} x1 - point being adjusted
 * @param {number} x2 - point used to make adjustment
 * @param {number} b - scaling parameter
 * @returns {number} result of expression
 */
function k_L(x1 , x2 , b ) {
    return 1 / (Math.exp((x1 - x2) / b) + Math.exp(-(x1 - x2) / b));
}

/**
 * Uniform kernel - applied within the smoothKernel function
 * @param {number} x1 - point being adjusted
 * @param {number} x2 - point used to make adjustment
 * @param {number} b - scaling parameter
 * @returns {number} result of expression
 */
function k_U(x1 , x2 , b ) {
    if (Math.abs((x1 - x2) / b) > 1) {
        return 0;
    } else {
        return 1 / 2;
    }
}

/**
 * Triangular kernel - applied within the smoothKernel function
 * @param {number} x1 - point being adjusted
 * @param {number} x2 - point used to make adjustment
 * @param {number} b - scaling parameter
 * @returns {number} result of expression
 */
function k_T(x1 , x2 , b ) {
    if (Math.abs((x1 - x2) / b) > 1) {
        return 0;
    } else {
        return (1 - Math.abs((x1 - x2) / b));
    }
}

/**
 * Quartic kernel - applied within the smoothKernel function
 * @param {number} x1 - point being adjusted
 * @param {number} x2 - point used to make adjustment
 * @param {number} b - scaling parameter
 * @returns {number} result of expression
 */
function k_Q(x1 , x2 , b ) {
    if (Math.abs((x1 - x2) / b) > 1) {
        return 0;
    } else {
        return (15 / 16) * Math.pow((1 - Math.pow(((x1 - x2) / b), 2)), 2);
    }
}

/**
 * Triweight kernel - applied within the smoothKernel function
 * @param {number} x1 - point being adjusted
 * @param {number} x2 - point used to make adjustment
 * @param {number} b - scaling parameter
 * @returns {number} result of expression
 */
function k_TW(x1 , x2 , b ) {
    if (Math.abs((x1 - x2) / b) > 1) {
        return 0;
    } else {
        return (35 / 32) * Math.pow((1 - Math.pow(((x1 - x2) / b), 2)), 3);
    }
}

/**
 * Cosine kernel - applied within the smoothKernel function
 * @param {number} x1 - point being adjusted
 * @param {number} x2 - point used to make adjustment
 * @param {number} b - scaling parameter
 * @returns {number} result of expression
 */
function k_Co(x1 , x2 , b) {
    if (Math.abs((x1 - x2) / b) > 1) {
        return 0;
    } else {
        return (Math.PI / 4) * Math.cos((Math.PI / 2) * ((x1 - x2) / b));
    }
}

/**
 * Tricube kernel - applied within the smoothKernel function
 * @param {number} x1 - point being adjusted
 * @param {number} x2 - point used to make adjustment
 * @param {number} b - scaling parameter
 * @returns {number} result of expression
 */
function k_TC(x1 , x2 , b) {
    if (Math.abs((x1 - x2) / b) > 1) {
        return 0;
    } else {
        return (70 / 81) * Math.pow((1 - Math.pow(Math.abs((x1 - x2) / b), 3)), 3);
    }
}

/**
 * Silverman kernel - applied within the smoothKernel function
 * @param {number} x1 - point being adjusted
 * @param {number} x2 - point used to make adjustment
 * @param {number} b - scaling parameter
 * @returns {number} result of expression
 */
function k_S(x1, x2, b){
    var u = Math.abs((x2-x1)/b);
    
    return 0.5 * Math.exp(-u/Math.SQRT2) * Math.sin(u/Math.SQRT2 + Math.PI/4);
}
    /** 
 * Take an array of points and returns a set of smoothed points by applying a filter (specified by the kernel function) to the data
 * This function cuts off the kernel calculations after the kernel decreases beyond a certain level
 * @returns {array} - an array with the new points
 */

var ssci = ssci || {};
ssci.smooth = {};

ssci.smooth.kernel2 = function(){

    var output=[];
    var kernels = {
        'Uniform': k_U,
        'Triangle': k_T,
        'Epanechnikov': k_E,
        'Quartic': k_Q,
        'Triweight': k_TW,
        'Logistic': k_L,
        'Cosine': k_Co,
        'Gaussian': k_G,
        'Tricube': k_TC,
        'Silverman': k_S
    };
    var max_diff = 0.001;   //Maximum difference to calculate kernel - equivalent to 0.1%
    var scale = [];
    var data = [];
    var kernel = "Gaussian";
    var i, j;               //Iterators
    var x_conv = function(d){ return d[0]; };
    var y_conv = function(d){ return d[1]; };
    
    function sk() {
        var dataArray = [];
        
        //Clear output array
	output = [];
        
        //Create array of data using accessors
        dataArray = data.map( function(d){
            return [x_conv(d), y_conv(d)];
        });
        
        //Deal with scale
        var scales = [];
        
        if(typeof scale === 'number'){
            //Create an array of length dataArray and populate with scale parameter
            for(i=0;i<dataArray.length;i++){
                scales.push(scale);
            }
        } else if (typeof scale === 'object' && Array.isArray(scale)){
            //Does the length of the scale array match the number of points fed to the function
            if(scale.length === dataArray.length){
                scales = scale.slice();
            } else {
                //Put in for completeness but will almost never be what is intended
                var counter=0;
                for(i=0;i<dataArray.length;i++){
                    scales.push(scale[counter]);
                    if(i<scale.length){
                        counter++;
                    } else {
                        counter=0;
                    }
                }
            }
        } else {
            //What else can it be?
            console.log(scale);
            throw new Error('Invalid scale parameter');
        }
        
        //Calculate smoothed values
        for(i=0;i<dataArray.length;i++){
            var tot_ker1 = 0;
            var tot_ker2 = 0;
            var temp_ker = 0;
            
            //Kernel for point=i
            var self_ker = kernels[kernel](dataArray[i][0], dataArray[i][0], scales[i]);
            tot_ker1 = tot_ker1 + self_ker * dataArray[i][1];
            tot_ker2 = tot_ker2 + self_ker;
            
            //Kernel for lower points
            for(j=i-1; j>-1; j--){
                temp_ker = kernels[kernel](dataArray[i][0], dataArray[j][0], scales[i]);
                if(temp_ker/self_ker<max_diff){
                    break;
                }
                tot_ker1 = tot_ker1 + temp_ker * dataArray[j][1];
                tot_ker2 = tot_ker2 + temp_ker;
            }
            
            //Kernel for higher points
            for(j=i+1; j<dataArray.length; j++){
                temp_ker = kernels[kernel](dataArray[i][0], dataArray[j][0], scales[i]);
                if(temp_ker/self_ker<max_diff){
                    break;
                }
                tot_ker1 = tot_ker1 + temp_ker * dataArray[j][1];
                tot_ker2 = tot_ker2 + temp_ker;
            }
            
            output.push([dataArray[i][0],(tot_ker1 / tot_ker2)]);
        }
    }
    
    sk.scale = function(value){
        if(!arguments.length){ return scale; }
        scale = value;
        
        return sk;
    };
    
    sk.kernel = function(value){
        if(!arguments.length){ return kernel; }
        //Check that the kernel is valid
        if(typeof kernels[value] !== 'function'){
            throw new Error('Invalid kernel');
        }
        
        kernel = value;
        
        return sk;
    };
    
    sk.x = function(value){
        if(!arguments.length){ return x_conv; }
        x_conv = value;
        return sk;
    };
    
    sk.y = function(value){
        if(!arguments.length){ return y_conv; }
        y_conv = value;
        return sk;
    };
    
    sk.output = function(){
        return output;
    };
    
    sk.diff = function(value){
        if(!arguments.length){ return max_diff; }
        max_diff = value;
        
        return sk;
    };
    
    sk.data = function(value){
		data = value;
		
		return sk;
	};
    
    return sk;
};

    var svg;
    var sm_temp1;
    var slines;
    var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]
    
    var color = d3.scaleOrdinal()
      .domain(category)
      .range(["#00C181", "#FF6060", "#a4b1b5", "#FFE130", "#FF8D32", "#0077FF", "#FF2EF0", "#AF0BFF", "#a4b1b5"])


    d3.csv("Sheet2.csv", function (data) {
      var temp1 = data.map(function (e) {
        var temp = [];
        temp.push(e["Biden"]);
        temp.push(e["date"]);
        return temp;
      });
      console.log(temp1)
      temp1 = temp1.map(function (d) {
        var temp_time = d[1].split("-");
        return [new Date(temp_time[0], temp_time[1] - 1, temp_time[2]), +d[0]];
      });
      sm_temp1 = ssci.smooth.kernel2()
        .kernel("Gaussian")
        .data(temp1)
        .scale(1200000000);
      sm_temp1();
      //bloomberg
      var temp2 = data.map(function (e) {
        var temp = [];
        temp.push(e["Bloomberg"]);
        temp.push(e["date"]);
        return temp;
      });

      temp2 = temp2.map(function (d) {
        var temp_time2 = d[1].split("-");
        return [new Date(temp_time2[0], temp_time2[1] - 1, temp_time2[2]), +d[0]];
      });
      sm_temp2 = ssci.smooth.kernel2()
        .kernel("Gaussian")
        .data(temp2)
        .scale(1200000000);
      sm_temp2();
      //booker
      var temp3 = data.map(function (e) {
        var temp = [];
        temp.push(e["Booker"]);
        temp.push(e["date"]);
        return temp;
      });

      temp3 = temp3.map(function (d) {
        var temp_time3 = d[1].split("-");
        return [new Date(temp_time3[0], temp_time3[1] - 1, temp_time3[2]), +d[0]];
      });
      sm_temp3 = ssci.smooth.kernel2()
        .kernel("Gaussian")
        .data(temp3)
        .scale(1200000000);
      sm_temp3();

      //buttigieg
      var temp4 = data.map(function (e) {
        var temp = [];
        temp.push(e["Buttigieg"]);
        temp.push(e["date"]);
        return temp;
      });

      temp4 = temp4.map(function (d) {
        var temp_time = d[1].split("-");
        return [new Date(temp_time[0], temp_time[1] - 1, temp_time[2]), +d[0]];
      });
      sm_temp4 = ssci.smooth.kernel2()
        .kernel("Gaussian")
        .data(temp4)
        .scale(1200000000);
      sm_temp4();

      //buttigieg
      var temp5 = data.map(function (e) {
        var temp = [];
        temp.push(e["Klobuchar"]);
        temp.push(e["date"]);
        return temp;
      });

      temp5 = temp5.map(function (d) {
        var temp_time = d[1].split("-");
        return [new Date(temp_time[0], temp_time[1] - 1, temp_time[2]), +d[0]];
      });
      sm_temp5 = ssci.smooth.kernel2()
        .kernel("Gaussian")
        .data(temp5)
        .scale(1200000000);
      sm_temp5();

      //buttigieg
      var temp6 = data.map(function (e) {
        var temp = [];
        temp.push(e["Sanders"]);
        temp.push(e["date"]);
        return temp;
      });

      temp6 = temp6.map(function (d) {
        var temp_time = d[1].split("-");
        return [new Date(temp_time[0], temp_time[1] - 1, temp_time[2]), +d[0]];
      });
      sm_temp6 = ssci.smooth.kernel2()
        .kernel("Gaussian")
        .data(temp6)
        .scale(1200000000);
      sm_temp6();

      //buttigieg
      var temp7 = data.map(function (e) {
        var temp = [];
        temp.push(e["Steyer"]);
        temp.push(e["date"]);
        return temp;
      });

      temp7 = temp7.map(function (d) {
        var temp_time = d[1].split("-");
        return [new Date(temp_time[0], temp_time[1] - 1, temp_time[2]), +d[0]];
      });
      sm_temp7 = ssci.smooth.kernel2()
        .kernel("Gaussian")
        .data(temp7)
        .scale(1200000000);
      sm_temp7();

      //buttigieg
      var temp8 = data.map(function (e) {
        var temp = [];
        temp.push(e["Warren"]);
        temp.push(e["date"]);
        return temp;
      });

      temp8 = temp8.map(function (d) {
        var temp_time = d[1].split("-");
        return [new Date(temp_time[0], temp_time[1] - 1, temp_time[2]), +d[0]];
      });
      sm_temp8 = ssci.smooth.kernel2()
        .kernel("Gaussian")
        .data(temp8)
        .scale(1200000000);
      sm_temp8();

      //buttigieg
      var temp9 = data.map(function (e) {
        var temp = [];
        temp.push(e["Yang"]);
        temp.push(e["date"]);
        return temp;
      });

      temp9 = temp9.map(function (d) {
        var temp_time = d[1].split("-");
        return [new Date(temp_time[0], temp_time[1] - 1, temp_time[2]), +d[0]];
      });
      sm_temp9 = ssci.smooth.kernel2()
        .kernel("Gaussian")
        .data(temp9)
        .scale(1200000000);
      sm_temp9();





      //Define charting variables
      var chart_width = 960;
      var chart_height = 400;
      var margin_top = 30;
      var margin_bottom = 30;
      var margin_left = 80;
      var margin_right = 100;
      var tf = d3.timeFormat("%H:%M");

      //Create SVG object
      svg = d3.select("#example")
        .append("svg")
        .attr("viewBox", "0 0 960 400");



      var svgLegend = svg.append('g')
        .attr("transform", "translate(" + (chart_width - 80) + "," + 80 + ")")

      var legend = svgLegend.selectAll('.legend')
        .data(category)
        .enter()
        .append('g')

        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")" })

      legend.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 7)
        .style("fill", d => color(d))

      legend.append("text")
        .attr("x", 7 * 2)
        .attr("y", 7 / 2)
        .style("fill", d => color(d))
        .style("font-size", 12)
        .style("font-weight", 500)
        .text(d => d)

      //Scales
      var x_scale = d3.scaleTime()
        .domain([new Date(2019, 0, 1), d3.max(temp1, function (d) { return d[0] })])
        .range([margin_left, chart_width - margin_right]);
      var y_scale = d3.scaleLinear()
        .domain([0, 40])
        .range([chart_height - margin_bottom, margin_top]);

      //X Axis


      //Lines


      //Add smoothed line
      slines = d3.line()
        .x(function (d) { return x_scale(d[0]); })
        .y(function (d) { return y_scale(d[1]); })
        .curve(d3.curveCatmullRom);

      svg.append("path")
        .data(sm_temp1.output())
        .attr("d", slines(sm_temp1.output()))
        .attr("class", "pollline")
        .attr("stroke", "#00C181")
        .attr("fill", "none")


      slines2 = d3.line()
        .x(function (d) { return x_scale(d[0]); })
        .y(function (d) { return y_scale(d[1]); })
        .curve(d3.curveCatmullRom);

      svg.append("path")
        .data(sm_temp2.output())
        .attr("d", slines(sm_temp2.output()))
        .attr("class", "pollline")
        .attr("stroke", "#00B050")
        .attr("fill", "none")

      slines3 = d3.line()
        .x(function (d) { return x_scale(d[0]); })
        .y(function (d) { return y_scale(d[1]); })
        .curve(d3.curveCatmullRom);

      svg.append("path")
        .data(sm_temp3.output())
        .attr("d", slines(sm_temp3.output()))
        .attr("class", "pollline")
        .attr("stroke", "#a4b1b5")
        .attr("fill", "none")

      slines4 = d3.line()
        .x(function (d) { return x_scale(d[0]); })
        .y(function (d) { return y_scale(d[1]); })
        .curve(d3.curveCatmullRom);

      svg.append("path")
        .data(sm_temp4.output())
        .attr("d", slines(sm_temp4.output()))
        .attr("class", "pollline")
        .attr("stroke", "#98d2f8")
        .attr("fill", "none")

      slines5 = d3.line()
        .x(function (d) { return x_scale(d[0]); })
        .y(function (d) { return y_scale(d[1]); })
        .curve(d3.curveCatmullRom);

      svg.append("path")
        .data(sm_temp5.output())
        .attr("d", slines(sm_temp5.output()))
        .attr("class", "pollline")
        .attr("stroke", "#0077FF")
        .attr("fill", "none")

      slines6 = d3.line()
        .x(function (d) { return x_scale(d[0]); })
        .y(function (d) { return y_scale(d[1]); })
        .curve(d3.curveCatmullRom);

      svg.append("path")
        .data(sm_temp6.output())
        .attr("d", slines(sm_temp6.output()))
        .attr("class", "pollline")
        .attr("stroke", "#002E66")
        .attr("fill", "none")


      slines7 = d3.line()
        .x(function (d) { return x_scale(d[0]); })
        .y(function (d) { return y_scale(d[1]); })
        .curve(d3.curveCatmullRom);

      svg.append("path")
        .data(sm_temp7.output())
        .attr("d", slines(sm_temp7.output()))
        .attr("class", "pollline")
        .attr("stroke", "#E7B5FF")
        .attr("fill", "none")

      slines8 = d3.line()
        .x(function (d) { return x_scale(d[0]); })
        .y(function (d) { return y_scale(d[1]); })
        .curve(d3.curveCatmullRom);

      svg.append("path")
        .data(sm_temp8.output())
        .attr("d", slines(sm_temp8.output()))
        .attr("class", "pollline")
        .attr("stroke", "#B722FF")
        .attr("fill", "none")

      slines9 = d3.line()
        .x(function (d) { return x_scale(d[0]); })
        .y(function (d) { return y_scale(d[1]); })
        .curve(d3.curveCatmullRom);

      svg.append("path")
        .data(sm_temp9.output())
        .attr("d", slines(sm_temp9.output()))
        .attr("class", "pollline")
        .attr("stroke", "purple")
        .attr("fill", "none")
      svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 80)
        .attr("height", 500)
        .attr("fill", "white")


      var xAxis = d3.axisBottom(x_scale);

      svg.append("g")
        .attr("class", "c_x_axis")
        .attr("transform", "translate(0," + (chart_height - margin_bottom) + ")")
        .call(xAxis.ticks(8)
          .tickFormat(d3.timeFormat("%b")));

      //Y Axis
      var yAxis = d3.axisLeft(y_scale);

      svg.append("g")
        .attr("class", "c_y_axis")
        .attr("transform", "translate(" + margin_left + ",0)")
        .call(yAxis);

      
      
          
    });