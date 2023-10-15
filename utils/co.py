import json
import os

# Get the current directory
current_directory = os.path.dirname(os.path.realpath(__file__ ))

# Define the relative paths to your GeoJSON file
geojson_file_path = os.path.join(current_directory, "..", "assets", "parking.geojson")

# Open and read the GeoJSON file
with open(geojson_file_path, "r") as file:
    geojson_data = json.load(file)

# Extract latitude and longitude pairs
coordinates_array = []

for feature in geojson_data["features"]:
    coordinates = feature["geometry"]["coordinates"][0]
    coordinates_array.append(coordinates)

# Print the array of latitude and longitude pairs
for coordinates in coordinates_array:
    print(coordinates)
    print(',')
# print(len(coordinates_array))