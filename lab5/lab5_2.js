var w = 500;
var h = 100;
var maxValue = 25;

var dataset = [14, 5, 26, 23, 9];

// Create a scaleBand for positioning the bars across the SVG
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

// Create a linear scale for converting data values to pixel heights
var yScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([0, h]);

// Create the SVG canvas
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Create the initial bars using the dataset
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("y", function(d) {
        return h - yScale(d);
    })
    .attr("height", function(d) {
        return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("fill", "steelblue");

// Generate new random data and animate the bars to their new heights
d3.select("#update")
    .on("click", function() {
        var numValues = dataset.length;

        dataset = [];

        // Generate random values between 0 and 24
        for (var i = 0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);
        }

        // Update the bars with a staggered transition
        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .delay(function(d, i) {
                return i / dataset.length * 1000;
            })
            .duration(2000)
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .attr("height", function(d) {
                return yScale(d);
            });
    });

// Demonstrate an elastic easing transition
d3.select("#elastic")
    .on("click", function() {
        var numValues = dataset.length;

        dataset = [];

        for (var i = 0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);
        }

        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .delay(function(d, i) {
                return i * 100;
            })
            .duration(2000)
            .ease(d3.easeElasticOut)
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .attr("height", function(d) {
                return yScale(d);
            });
    });
// Demonstrate a circular easing transition
d3.select("#circle")
    .on("click", function() {
        var numValues = dataset.length;

        dataset = [];

        for (var i = 0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);
        }

        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .delay(function(d, i) {
                return i * 100;
            })
            .duration(2000)
            .ease(d3.easeCircleOut)
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .attr("height", function(d) {
                return yScale(d);
            });
    });