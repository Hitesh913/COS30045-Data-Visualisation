var w = 500;
var h = 100;
var barPadding = 1;
var dataset = [14, 5, 26, 23, 9];
var maxValue = 25;
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

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

d3.select("button")
    .on("click", function() {
        var numValues = dataset.length;

dataset = [];

for (var i = 0; i < numValues; i++) {
    var newNumber = Math.floor(Math.random() * maxValue);
    dataset.push(newNumber);
}

        svg.selectAll("rect")
            .data(dataset)
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .attr("height", function(d) {
                return yScale(d);
            });
    });