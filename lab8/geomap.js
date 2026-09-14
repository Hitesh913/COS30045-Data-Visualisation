// Width and height
var w = 500;
var h = 300;

// Set up the projection
var projection = d3.geoMercator()
    .center([145, -36.5])
    .translate([w / 2, h / 2])
    .scale(2450);

// Set up the path
var path = d3.geoPath()
    .projection(projection);

// Set up the SVG
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "grey");

// Read the GeoJSON file
d3.json("LGA_VIC.json").then(function(json) {

    // Bind GeoJSON data to paths
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path);

});