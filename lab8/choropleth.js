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
// Set the colour range
var color = d3.scaleQuantize()
    .range(["#E0F3FF", "#80D4FF", "#00A8E8", "#0077B6", "#023E8A"]);
// Set up the SVG
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Load the unemployment data
d3.csv("VIC_LGA_unemployment.csv").then(function(data) {

    // Set the colour domain
    color.domain([
        d3.min(data, function(d) {
            return +d.unemployed;
        }),
        d3.max(data, function(d) {
            return +d.unemployed;
        })
    ]);

    // Load the GeoJSON data
    d3.json("LGA_VIC.json").then(function(json) {
console.log(json.features[0].properties);
        // Merge the unemployment data and GeoJSON
        for (var i = 0; i < data.length; i++) {

            // Grab the LGA name
            var dataLGA = data[i].LGA;

            // Grab the unemployment value
            var dataValue = parseFloat(data[i].unemployed);

            // Find the corresponding LGA in the GeoJSON
            for (var j = 0; j < json.features.length; j++) {

              var jsonLGA = json.features[j].properties.LGA_name;

                if (dataLGA == jsonLGA) {

                    // Copy the unemployment value into the GeoJSON
                    json.features[j].properties.unemployed = dataValue;

                    // Stop looking through the GeoJSON
                    break;
                }
            }
        }

        // Draw the LGA paths
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function(d) {
                return color(d.properties.unemployed);
            });

        // Load the city data
        d3.csv("VIC_city.csv").then(function(cities) {

            // Add circles for the cities
            svg.selectAll("circle")
                .data(cities)
                .enter()
                .append("circle")
                .attr("cx", function(d) {
                    return projection([d.lon, d.lat])[0];
                })
                .attr("cy", function(d) {
                    return projection([d.lon, d.lat])[1];
                })
                .attr("r", 3)
                .style("fill", "black");

        });

    });

});