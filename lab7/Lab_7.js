function init() {

    // Set the size of the SVG canvas
    var w = 600;
    var h = 300;

    // Set padding for the axes
    var padding = 40;

    // Create the dataset variable
    var dataset;

    // Load the unemployment data from the CSV file
    d3.csv("Unemployment_78-95.csv", function(d) {

        // Convert the year and month into a JavaScript Date object
        return {
            date: new Date(+d.year, +d.month - 1),
            number: +d.number
        };

    }).then(function(data) {

        // Store the imported data
        dataset = data;

        // Send the data to the line chart function
        lineChart(dataset);

    });


    function lineChart(dataset) {

        // Set up the time scale for the x axis
        var xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, function(d) {
                    return d.date;
                }),
                d3.max(dataset, function(d) {
                    return d.date;
                })
            ])
            .range([padding, w]);


        // Set up the linear scale for the y axis
        var yScale = d3.scaleLinear()
            .domain([
                0,
                d3.max(dataset, function(d) {
                    return d.number;
                })
            ])
            .range([h - padding, padding]);


        // Create the line using the date and number values
        var line = d3.line()
            .x(function(d) {
                return xScale(d.date);
            })
            .y(function(d) {
                return yScale(d.number);
            });


        // Create the area under the line
        var area = d3.area()
            .x(function(d) {
                return xScale(d.date);
            })
            .y0(function() {
                return yScale.range()[0];
            })
            .y1(function(d) {
                return yScale(d.number);
            });


        // Create the SVG canvas
        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);


        // Draw the area
        svg.append("path")
            .datum(dataset)
            .attr("d", area);


        // Draw the line
        svg.append("path")
            .datum(dataset)
            .attr("class", "line")
            .attr("d", line);


        // Create the x axis
        var xAxis = d3.axisBottom(xScale);


        // Create the y axis
        var yAxis = d3.axisLeft(yScale);


        // Add the x axis
        svg.append("g")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);


        // Add the y axis
        svg.append("g")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);


        // Add the half a million unemployment line
        svg.append("line")
            .attr("class", "line halfMilMark")
            .attr("x1", padding)
            .attr("y1", yScale(500000))
            .attr("x2", w)
            .attr("y2", yScale(500000));


        // Add the annotation text
        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 7)
            .text("Half a million unemployed");
    }
}

window.onload = init;