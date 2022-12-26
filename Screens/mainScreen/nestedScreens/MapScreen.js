import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
const MapScreen = ({ route }) => {
  const [location, setLocation] = useState(null);
  const [photoLocation, setPhotoLocation] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let userlocation = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: userlocation.coords.latitude,
        longitude: userlocation.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  let { coords } = route.params.location;
  const photoCoords = {
    latitude: coords.latitude,
    longitude: coords.longitude,
  };

  useEffect(() => {
    if (route.params) {
      setPhotoLocation(photoCoords);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
        showsUserLocation={true}
        onMapReady={() => console.log("Map is ready")}
        // onRegionChange={() => console.log("Region change")}
      >
        {location && (
          <Marker title="I am here" coordinate={location} description="Hello" />
        )}
        {photoLocation && (
          <Marker
            title="photo was taken here"
            coordinate={photoLocation}
            description="Hello"
          />
        )}
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
export default MapScreen;
