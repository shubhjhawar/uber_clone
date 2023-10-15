import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import MapView, {Marker} from "react-native-maps";
import tw from 'tailwind-react-native-classnames';
import * as Location from "expo-location";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons
import { parkings } from '../parking';
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";


const NewMap = ({latitude, longitude}) => {
    const mapRef = useRef(null);

    const [isNavigating, setIsNavigating] = useState(false);

    const handleButtonPress = () => {
      setIsNavigating(true);
    }

    // useEffect(() => {
    //   if(isNavigating) {
    //     mapRef.current.animateToRegion({
    //         latitude: latitude,
    //         longitude: longitude,
    //         latitudeDelta: 0.001,
    //         longitudeDelta: 0.001,
    //       }, 1000);
    //   }
    // }, [isNavigating])

    useEffect(() => {
      if (isNavigating) {
        // Calculate the direction angle from your current location to the destination
        const direction = calculateDirection(
          latitude,
          longitude,
          parseFloat(destination.latitude),
          parseFloat(destination.longitude)
        );
  
        // Animate the camera to your current location with rotation
        mapRef.current.animateCamera(
          {
            center: {
              latitude: latitude,
              longitude: longitude,
            },
            heading: direction,
          },
          { duration: 1000 }
        );
      }
    }, [isNavigating, destination, latitude, longitude]);
  

    useEffect(() => {
      if(!latitude || !closestParking) return;
  
      //zoom % fit the markers
      mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: { top:50, right:50, bottom:50, left:50},
      });
    }, [latitude, closestParking])


    // Function to calculate the Haversine distance between two points
     function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

    // Function to find the closest parking spot
    function findClosestParking(currentLat, currentLon, parkingSpots) {
      let closestParking = null;
      let minDistance = Number.MAX_VALUE;

      for (const parkingSpot of parkingSpots) {
        const distance = calculateHaversineDistance(
          currentLat, currentLon,
          parseFloat(parkingSpot.latitude), parseFloat(parkingSpot.longitude)
        );

        if (distance < minDistance) {
          minDistance = distance;
          closestParking = parkingSpot;
        }
      }

      return closestParking;
    }

    // Example usage
    const currentLat = latitude; // Replace with your current latitude
    const currentLon = longitude; // Replace with your current longitude
    const closestParking = findClosestParking(currentLat, currentLon, parkings);
    const destination = closestParking

    console.log("Closest parking spot:", closestParking)
    console.log("lat-",latitude)
    console.log("long-", longitude)
    console.log(isNavigating)
    console.log(latitude)
    console.log(longitude)

  return (
    <MapView 
      ref = {mapRef}
      style={tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: latitude ,
        longitude: longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }} 
    >
        <Marker 
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title="Origin"
          description="current location"
          identifier='origin'
        //   customMapStyle={mapStyle} 
        >
            {/* <View style={tw`flex items-center justify-center rounded-full bg-white shadow-xl p-2 w-8 h-8`} />
            <View style={tw`flex items-center justify-center rounded-full bg-blue-500 p-2 w-6 h-6`} /> */}
            <MaterialIcons name="my-location" size={32} color="blue" />

        </Marker>

        {/* {parkings.map((parking, index) => (
          <Marker
          key = {index}
          coordinate={{
            latitude: parking.latitude,
            longitude: parking.longitude,
          }}
          title={index}
          description={index}
          identifier={index}
          >
            <MaterialIcons name="my-location" size={32} color="red" />
          </Marker>
        ))} */}


        <Marker
        coordinate={{
          latitude: closestParking.latitude,
          longitude: closestParking.longitude,
        }}
        title="destination"
        description="destination"
        identifier="destination"
        >
          <MaterialIcons name="my-location" size={32} color="red" />
        </Marker>
        
        {isNavigating && destination && (
          <MapViewDirections
            origin={{
              latitude: latitude,
              longitude: longitude,
            }}
            destination={{
              latitude: parseFloat(destination.latitude),
              longitude: parseFloat(destination.longitude),
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="black"
          />
        )}
        
        
        <TouchableOpacity
          style={tw`bg-blue-500 p-3 rounded-md`}
          onPress={handleButtonPress}
        >
          <Text style={tw`text-white`}>Start Navigation</Text>
        </TouchableOpacity>
        
    </MapView>
  )
}

export default NewMap











