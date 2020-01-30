const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

/* @TODO: Set Up Map via Leaflet and Mapbox
   @TODO: Set Up Fetch
   @TODO: Plot USGS Earthquakes
*/

function makeMap(features) {
  var map = L.map("map").setView([39.828, -98.579], 13)

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    accessToken: API_KEY
}).addTo(map);


};



/* Perform fetch */

function getFeatures(url) {};


/* Function Calls */
makeMap();
