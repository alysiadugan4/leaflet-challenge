var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(queryUrl).then(function (data) {
    console.log(data.features);
    createFeatures(data.features);
});

function changeColor(feature) {
   

    if (feature.geometry.coordinates[2] > 90) {
      return "darkred";
    }
    else if (feature.geometry.coordinates[2] > 70) {
      return "red";
    }
    else if (feature.geometry.coordinates[2] > 50) {
        return "orange";
    }
    else if (feature.geometry.coordinates[2] > 30) {
        return "yellow";
    } 
    else if (feature.geometry.coordinates[2] > 10) {
        return "darkgreen";
    } 
    else {
      return "lightgreen";
    }
  }

  function createFeatures(earthquakeData) {
  
    
    function onEachFeature(feature, layer) {
  
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>Magnitude: ${feature.properties.mag}<br> Depth: ${feature.geometry.coordinates[2]}`)
    }
  
    let earthquakes = L.geoJson(earthquakeData, {
  
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
      style: function(feature) {
        return {
          color: "white",
          weight: 0.3,
          radius: feature.properties.mag * 5,
          fillOpacity: .5,
          fillColor: changeColor(feature)
        }
      },
      onEachFeature: onEachFeature
    })
  
    // Pass the earthquake data to a createMap() function.
    createMap(earthquakes);
  }

  function createMap(earthquakes) {
    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    
    var baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Creat an overlays object.
    var overlayMaps = {
      "Earthquakes": earthquakes,
    };
    
    
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [street, earthquakes]
    });
  
    
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10, 30, 50, 70, 90],
          colors = ['lightgreen','darkgreen','yellow','orange','red','darkred'];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + colors[i] + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };

  legend.addTo(myMap);


}