import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

export default function App() {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Text>HIBERNIAN</Text>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 23.259933,
          longitude: 77.412613,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
        showUserLocation={true}
      >
        <Marker coordinate={{ latitude: 23.259933, longitude: 77.412613 }} />
      </MapView>
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
