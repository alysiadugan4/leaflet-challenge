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