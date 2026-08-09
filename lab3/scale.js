// Example from Murray

var w = 100;
var h = 300;
var padding = 25;

var dataset = [
    [5,20],
    [480,90],
    [250,50],
    [100,33],
    [330,95],
    [410,12],
    [475,44],
    [25,67],
    [85,21],
    [220,88],
   [1000,200],
   [1000,201],
   [1000,202]
];

// Create x scale
var xScale = d3.scaleLinear()
    .domain([
        d3.min(dataset, function(d) {
            return d[0];
        }),
        d3.max(dataset, function(d) {
            return d[0];
        })
    ])
    .range([padding, w - padding]);

// Create y scale
var yScale = d3.scaleLinear()
    .domain([
        d3.min(dataset, function(d) {
            return d[1];
        }),
        d3.max(dataset, function(d) {
            return d[1];
        })
    ])
    .range([h - padding, padding]);

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return xScale(d[0]);
    })
    .attr("cy", function(d) {
        return yScale(d[1]);
    })
    .attr("r", 5)
    .attr("fill", "slategrey");

// Add labels

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d[0] + "," + d[1];
    })
    .attr("x", function(d) {
        return xScale(d[0]);
    })
    .attr("y", function(d) {
        return yScale(d[1]);
    });