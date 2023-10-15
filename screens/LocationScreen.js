import { StyleSheet, Text, View, SafeAreaView  } from 'react-native'
import React, {useState, useEffect} from 'react'
import tw from "tailwind-react-native-classnames"
import NewMap from '../components/NewMap'
import * as Location from "expo-location";

const LocationScreen = () => {
  const [currLocation, setCurrLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCurrLocation(location);
        let la = location.coords.latitude;
        let lb = location.coords.longitude;
        setLatitude(la);
        setLongitude(lb);
        // setLatitude(location.coords.latitude); // Set latitude here
        // setLongitude(location.coords.longitude);

      } catch (error) {
        console.error('Error fetching current location', error);
      }
    };

    fetchCurrentLocation();
  }, []);

  // console.log(currLocation.coords.latitude)
  // console.log(currLocation.coords.longitude)
  console.log(latitude);
  console.log(longitude);

  return (
    <SafeAreaView style={tw`bg-gray-300 h-full`}>
        <Text>Location</Text>

        {longitude ? (
          // <Text>{JSON.stringify(longitude)}</Text>
          <NewMap latitude={latitude} longitude={longitude} />
        ) : (
          <Text>No Latitude</Text>
        )}
        
        {/* <NewMap latitude={latitude} longitude={longitude} /> */}
    </SafeAreaView>
  )
}

export default LocationScreen

const styles = StyleSheet.create({})