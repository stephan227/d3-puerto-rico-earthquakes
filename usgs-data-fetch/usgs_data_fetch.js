// Running:
// Using node v11.6
//  $ node usgs_data_fetch.js
// Earthquakes API:
// https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-12-01&endtime=2020-01-14&catalog=pr

// This file will parse pr-earthquakes.geojson into a smaller file with the required properties to build the d3 chart
var fs = require('fs');
const https = require('https');

https.get('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-12-26&endtime=2020-01-16&catalog=pr', (resp) => {
  let data = '';
  
  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    transformEarthquakeData(JSON.parse(data))
    fs.writeFile('./pr-earthquakes.geojson', data, () => {})
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

// var prQuakes = JSON.parse(fs.readFileSync('./pr-earthquakes.geojson'));

/* Remove unwanted properties from usgs earthquakes data */
const transformEarthquakeData = (usgsEarthquakes) => {
    // Flatten dataset and remove unnessesary properties
    const slimDataset = usgsEarthquakes.features.map(feature => {
        const slimFeature = {
            mag: feature.properties.mag,
            time: feature.properties.time,    
            coordinates: feature.geometry.coordinates,
            id: feature.id
        }
        return slimFeature
    })

    fs.writeFileSync('../data-files/processed_earthquake_data.json', JSON.stringify(slimDataset))
}

 