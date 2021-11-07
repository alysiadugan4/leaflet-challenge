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