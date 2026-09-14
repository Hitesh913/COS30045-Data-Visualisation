function init() {

    // Set the size of the SVG
    var w = 300;
    var h = 300;

    // Create a dataset with 7 values
    var dataset1 = [10, 20, 30, 40, 50, 60, 70];

    // Set the outer and inner radius of the pie chart
    var outerRadius = w / 2;
    var innerRadius = 0;

    // Create the arc generator
    var arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

    // Create the pie generator
    var pie = d3.pie();

    // Create a colour scale
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Set up the SVG canvas
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // Create the arcs for the pie chart
    var arcs = svg.selectAll("g.arc")
        .data(pie(dataset1))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

    // Draw the arcs and add colours
    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", function(d, i) {
            return arc(d, i);
        });

    // Add the data values as labels
    arcs.append("text")
        .text(function(d) {
            return d.value;
        })
        .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
        });
}

// Run the init function when the page loads
window.onload = init;
