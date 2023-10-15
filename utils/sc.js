const fs = require('fs');
const path = require('path');

// Get the current directory
const currentDirectory = __dirname;

// Define the relative path to your GeoJSON file
const geojsonFilePath = path.join(currentDirectory, '..', 'assets', 'parking.geojson');

// Read and parse the GeoJSON file
const geojsonData = JSON.parse(fs.readFileSync(geojsonFilePath, 'utf8'));

// Extract individual parking locations
const parkings = [];

geojsonData.features.forEach(feature => {
  const coordinates = feature.geometry.coordinates;
  // Check if coordinates is an array of arrays
  if (Array.isArray(coordinates) && Array.isArray(coordinates[0])) {
    // If there are multiple coordinates, process each one
    coordinates.forEach(coord => {
      parkings.push({
        latitude: coord[1],
        longitude: coord[0],
      });
    });
  } else {
    // If there is only one coordinate, add it directly
    parkings.push({
      latitude: coordinates[1],
      longitude: coordinates[0],
    });
  }
});

// Export the `parkings` array
console.log(parkings)
module.exports = parkings;

