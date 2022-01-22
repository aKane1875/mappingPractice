import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View, Button } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Polygon } from "react-native-maps";
import { useState, useEffect } from "react";

export default function App() {
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setCurrentLongitude(location.coords.longitude);
      setCurrentLatitude(location.coords.latitude);
    })();
  }, [location]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Text>SECTIONING</Text>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
          location,
        }}
        showUserLocation={true}
      >
        <Polygon
          coordinates={[
            { latitude: 53.804277, longitude: -1.548567 },
            { latitude: currentLatitude, longitude: currentLongitude },
            { latitude: 53.809277, longitude: -1.559067 },
            { latitude: 53.804277, longitude: -1.558567 },
          ]}
          strokeColor="rgb(155, 0, 0)"
          fillColor="rgba(155, 0, 0, 0.2)"
          strokeWidth={5}
        />
        <Polygon
          coordinates={[
            { latitude: 53.804278, longitude: -1.548567 },
            { latitude: 53.799277, longitude: -1.548567 },
            { latitude: 53.799277, longitude: -1.559067 },
            { latitude: 53.804278, longitude: -1.558567 },
          ]}
          strokeColor="rgb(0, 155, 0)"
          fillColor="rgba(0, 155, 0, 0.2)"
          strokeWidth={5}
        />
        <Polygon
          coordinates={[
            { latitude: 53.804278, longitude: -1.538567 },
            { latitude: 53.799277, longitude: -1.538567 },
            { latitude: 53.799277, longitude: -1.549067 },
            { latitude: 53.804278, longitude: -1.549001 },
          ]}
          strokeColor="rgb(0, 0, 155)"
          fillColor="rgba(0, 0, 155, 0.2)"
          strokeWidth={5}
        />

        <Marker
          coordinate={{
            latitude: currentLatitude,
            longitude: currentLongitude,
          }}
        />
      </MapView>
      <Button
        title="Drop Node"
        onPress={() => {
          // location = await Location.getCurrentPositionAsync({});
          // setLocation(location);
          // setCurrentLongitude(location.coords.longitude);
          // setCurrentLatitude(location.coords.latitude);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
