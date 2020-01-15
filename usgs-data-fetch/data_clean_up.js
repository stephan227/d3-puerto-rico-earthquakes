// This file will parse pr-earthquakes.geojson into a smaller file with the required properties to build the d3 chart
var fs = require('fs');

// Earthquakes API:
// https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-12-01&endtime=2020-01-14&catalog=pr


var prQuakes = JSON.parse(fs.readFileSync('./pr-earthquakes.geojson'));

/**
 * 
{ type: 'Feature',
  properties:
   { mag: 3.8,
     place: '8km S of Indios, Puerto Rico',
     time: 1578955256620,
     updated: 1578967356953,
     tz: -240,
     url:
      'https://earthquake.usgs.gov/earthquakes/eventpage/pr2020013022',
     detail:
      'https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=pr2020013022&format=geojson',
     felt: 7,
     cdi: 2.7,
     mmi: null,
     alert: null,
     status: 'reviewed',
     tsunami: 0,
     sig: 224,
     net: 'pr',
     code: '2020013022',
     ids: ',us70006zf6,pr2020013022,',
     sources: ',us,pr,',
     types: ',dyfi,geoserve,origin,phase-data,',
     nst: 13,
     dmin: 0.0628,
     rms: 0.26,
     gap: 198,
     magType: 'ml',
     type: 'earthquake',
     title: 'M 3.8 - 8km S of Indios, Puerto Rico' },
  geometry: { type: 'Point', coordinates: [ -66.8223, 17.9486, 8 ] },
  id: 'pr2020013022' }
 */

 // Flatten dataset and remove unnessesary properties
var slim_dataset = prQuakes.features.map(item => {

    var feature = item //prQuakes.features[0];
    var slim_feature = {
        mag: feature.properties.mag,
        time: feature.properties.time,    
        coordinates: feature.geometry.coordinates,
        id: feature.id
    }
    return slim_feature
})

console.log(slim_dataset)
fs.writeFileSync('./processed_earthquake_data.json', JSON.stringify(slim_dataset))