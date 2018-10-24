// Store our API endpoint inside queryUrl
var queryUrl = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  // layers: [streetmap, earthquakes]
});
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);


// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function

  for (var i = 0; i < data.features.length; i++) {
    console.log(data.features[i]);
    var color = "";
  
    if (data.features[i].properties.mag > 5) {
      color = "rgb(224,115,111)";
      var color1 = color;
    } else if (data.features[i].properties.mag > 4) {
      color = "rgb(230,169,117)";
      var color2 = color;
    } else if (data.features[i].properties.mag > 3) {
      color = "rgb(235,187,97)";
      var color3 = color;
    } else if (data.features[i].properties.mag > 2) {
      color = "rgb(240,218,103)";
      var color4 = color;
    } else if (data.features[i].properties.mag > 1) {
      color = "rgb(229,241,106)";
      var color5 = color;
    } else {
      color = "rgb(196,239,105)";
      var color6 = color;
    }
    lnglat = [data.features[i].geometry.coordinates[1] , data.features[i].geometry.coordinates[0]];
    console.log(lnglat);
    console.log(data.features[i].properties.mag);
    var timequacke = new Date(data.features[i].properties.time * 1000);

    L.circle(lnglat, {
      fillOpacity: 1,
      color: "black",
      weight: 0.5,
      fillColor: color,
      // Adjust radius
      radius: data.features[i].properties.mag * 10500
      // radius: 11500
    }).bindPopup("<h1>" + data.features[i].properties.place + "</h1> <hr> <h3>Points: " + data.features[i].properties.mag + "</h3> <hr> <h3>Time: " + timequacke + "</h3>").addTo(myMap);

  }

  colors = (color1, color2, color3, color4, color5, color6);

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          grades = ['0', '1', '2', '3', '4', '5'],
          labels = [];
  
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
          "<ul style=\"background-color: " + color1 + "\">" +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+')+'</ul>';
      }
  
      return div;
  };
  
  legend.addTo(myMap);

    // Set up the legend
    // var legend = L.control({ position: "bottomright" });
    // legend.onAdd = function() {
    //   var div = L.DomUtil.create("div", "info legend");
    //   var limits = ['0', '1', '2', '3', '4', '5'];
    //   // var colors = geojson.options.colors;
    //   var labels = [];
  
    //   // Add min & maxcolors
    //   var legendInfo = "<h1>Scale</h1>" +
    //     "<div class=\"labels\">" +
    //       "<div class=\"min\">" + limits[0] + "</div>" +
    //       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    //     "</div>";
  
    //   div.innerHTML = legendInfo;
  
    //   limits.forEach(function(limit, index) {
    //     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    //   });
  
    //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    //   return div;
    // };
  
    // // Adding legend to the map
    // legend.addTo(myMap);

});


