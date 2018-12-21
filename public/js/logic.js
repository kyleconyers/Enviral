$(document).ready(function(){

    var br = document.createElement("br");

    var map = new Datamap({
    element: document.getElementById("container"),
    // 'projection' options are mercator (rectangular map) and orthographic (spherical globe)
    projection: "mercator",
    // height: 200px,
    responsive: true,
    // Zoom in on Africa
    // setProjection: function(element) {
    //   var projection = d3.geo.equirectangular()
    //     .center([23, -3])
    //     .rotate([4.4, 0])
    //     .scale(400)
    //     .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
    //   var path = d3.geo.path()
    //     .projection(projection);

    //   return {path: path, projection: projection};
    // },
    fills: {
        defaultFill: "#ABDDA4",
        GlobalEnergyProfile: "#fa0fa0"
    },
    data: {
        // US, China, Brazil, India, Russia, Australia, France, Democratic Republic of Congo
        USA: { fillKey: "GlobalEnergyProfile" },
        CHN: { fillKey: "GlobalEnergyProfile" },
        // BRA: { fillKey: "GlobalEnergyProfile" },
        IND: { fillKey: "GlobalEnergyProfile" },
        // RUS: { fillKey: "GlobalEnergyProfile" },
        AUS: { fillKey: "GlobalEnergyProfile" },
        FRA: { fillKey: "GlobalEnergyProfile" },
        COD: { fillKey: "GlobalEnergyProfile" }
    },
    geographyConfig: {
        popupTemplate: function(geo, data) {
        return [
            '<div class="hoverinfo"><strong>',
            geo.properties.name,
            "</strong></div>"
        ].join("");
        },
        borderColor: "#444",
        borderWidth: 1,
        borderOpacity: 1,
        dataUrl: null,
        hideAntarctica: false
    },
    done: function(datamap) {
        datamap.svg.selectAll(".datamaps-subunit").on("click", function(geography) {
        $("#globe_div").append(br);
        drawChart(geography.id);
        console.log("TEST", geography);
        });
    }
    });

    // Draw a legend for this map
    map.legend({ legendTitle: "Legend:" });

    // Use d3 to make the map responsive in case the screen size changes
    d3.select(window).on("resize", function() {
    map.resize();
    });

    // When the 'Mercator' button is clicked
    $("#mercator").on("click", function() {
    // Clear the 'container' div
    $("#container").html("");
    // Display mercator projection
    var map = new Datamap({
        element: document.getElementById("container"),
        // 'projection' options are mercator (rectangular map) and orthographic (spherical globe)
        projection: "mercator",
        responsive: true,
        fills: {
        defaultFill: "#ABDDA4",
        GlobalEnergyProfile: "#fa0fa0"
        },
        data: {
        // US, China, Brazil, India, Russia, Australia, France, Democratic Republic of Congo
        USA: { fillKey: "GlobalEnergyProfile" },
        CHN: { fillKey: "GlobalEnergyProfile" },
        // BRA: { fillKey: "GlobalEnergyProfile" },
        IND: { fillKey: "GlobalEnergyProfile" },
        // RUS: { fillKey: "GlobalEnergyProfile" },
        AUS: { fillKey: "GlobalEnergyProfile" },
        FRA: { fillKey: "GlobalEnergyProfile" },
        COD: { fillKey: "GlobalEnergyProfile" }
        },
        geographyConfig: {
        popupTemplate: function(geo, data) {
            return [
            '<div class="hoverinfo"><strong>',
            geo.properties.name,
            "</strong></div>"
            ].join("");
        },
        borderColor: "#444",
        borderWidth: 1,
        borderOpacity: 1,
        dataUrl: null,
        hideAntarctica: false
        },
        done: function(datamap) {
        datamap.svg
            .selectAll(".datamaps-subunit")
            .on("click", function(geography) {
            $("#globe_div").append(br);
            drawChart(geography.id);
            console.log("TEST", geography);
            });
        }
    });

    // Draw a legend for this map
    map.legend({ legendTitle: "Legend:" });

    // Use d3 to make the map responsive in case the screen size changes
    d3.select(window).on("resize", function() {
        map.resize();
    });
    });

    // When the 'Orthographic' button is clicked
    $("#orthographic").on("click", function() {
    // Clear the 'container' div
    $("#container").html("");
    var map = new Datamap({
        element: document.getElementById("container"),
        // 'projection' options are mercator (rectangular map) and orthographic (spherical globe)
        projection: "orthographic",
        responsive: true,
        fills: {
        defaultFill: "#ABDDA4",
        GlobalEnergyProfile: "#fa0fa0"
        },
        data: {
        // US, China, Brazil, India, Russia, Australia, France, Democratic Republic of Congo
        USA: { fillKey: "GlobalEnergyProfile" },
        CHN: { fillKey: "GlobalEnergyProfile" },
        // BRA: { fillKey: "GlobalEnergyProfile" },
        IND: { fillKey: "GlobalEnergyProfile" },
        // RUS: { fillKey: "GlobalEnergyProfile" },
        AUS: { fillKey: "GlobalEnergyProfile" },
        FRA: { fillKey: "GlobalEnergyProfile" },
        COD: { fillKey: "GlobalEnergyProfile" }
        },
        // For the orthographic projection
        projectionConfig: {
        rotation: [97, -30]
        },
        geographyConfig: {
        popupTemplate: function(geo, data) {
            return [
            '<div class="hoverinfo"><strong>',
            geo.properties.name,
            "</strong></div>"
            ].join("");
        },
        borderColor: "#444",
        borderWidth: 1,
        borderOpacity: 1,
        dataUrl: null,
        hideAntarctica: false
        },
        done: function(datamap) {
        datamap.svg
            .selectAll(".datamaps-subunit")
            .on("click", function(geography) {
            $("#globe_div").append(br);
            drawChart(geography.id);
            console.log("TEST", geography);
            });
        }
    });

    //Display lines of latitude and longitude
    map.graticule();

    // Draw a legend for this map
    map.legend({ legendTitle: "Legend:" });

    // Use d3 to make the map responsive in case the screen size changes
    d3.select(window).on("resize", function() {
        map.resize();
    });
    });
});
