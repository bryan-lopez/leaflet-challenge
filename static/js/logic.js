const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
const colorList = ['#762a83','#9970ab','#c2a5cf','#e7d4e8','#f7f7f7','#d9f0d3','#a6dba0','#5aae61','#1b7837']
const map = L.map("map").setView([39.828, -98.579], 4)

/* @TODO: Set Up Map via Leaflet and Mapbox
   @TODO: Set Up Fetch
   @TODO: Plot USGS Earthquakes
*/


function makeMap(map = NONE, features = []) {

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    accessToken: API_KEY
}).addTo(map);

  features.forEach( (curr) => plotFeatures(curr, map));

};



/* Perform fetch */
function plotFeatures(feature, map) {
  // Plots Features for given URL

  function popUpDetail(feature, layer) {
    // Set Popup to title
    if (feature.properties.title) {
      layer.bindPopup(feature.properties.title);
    }
  };

  function getColor(d) {
    // returns hex color
    return d >= 8 ? '#762a83' :
           d >= 7 ? '#9970ab' :
           d >= 6 ? '#c2a5cf' :
           d >= 5 ? '#e7d4e8' :
           d >= 4 ? '#f7f7f7' :
           d >= 3 ? '#d9f0d3' :
           d >= 2 ? '#a6dba0' :
           d >= 1 ? '#5aae61' : '#1b7837'
  };

  function getSize(d) {
    // 10 * mag => meters => km => mi*miRatio

    return 1609*Math.pow(d,2) + 1609*d + 16090
  };

  function getMarker(feature, latlng) {
    // Size and Color based on "mag"
    var mag = feature.properties.mag
    let style = {
      radius : getSize(mag),
      color: '#000000',
      fillColor: getColor(mag),
      fill: true,
      stroke: 1,
      weight: 1,
      opacity: 1,
      fillOpacity: 1
    };

    return L.circle(latlng, style)
  };

  d3.json(feature, function(data) {
    // More Here
    L.geoJSON(data.features, {
      pointToLayer: getMarker,
      onEachFeature: popUpDetail
    }).addTo(map)
  });
};


/* Function Calls */
makeMap(map, [url]);
