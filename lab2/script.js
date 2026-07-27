// Example from Murray

var w = 500;
var h = 100;
var barPadding = 1;

function barChart(wombatSightings) {

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
        .data(wombatSightings)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * (w / wombatSightings.length);
        })
        .attr("y", function(d) {
            return h - (d.wombats * 4);
        })
        .attr("width", (w / wombatSightings.length) - barPadding)
        .attr("height", function(d) {
            return d.wombats * 4;
        })
        .attr("fill", function(d) {
            if (d.wombats > 20) {
                return "orange";
            } else {
                return "steelblue";
            }
        });
}

function init() {

    d3.csv("Task_2.7_data.csv").then(function(data) {

        console.log(data);

        barChart(data);

    });

}

window.onload = init;