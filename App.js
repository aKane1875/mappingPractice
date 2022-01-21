import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from "react-native-maps";

export default function App() {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Text>SECTIONING</Text>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 53.801277,
          longitude: -1.548567,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
        showUserLocation={true}
      >
        <Polygon
          coordinates={[
            { latitude: 53.804277, longitude: -1.548567 },
            { latitude: 53.809277, longitude: -1.548567 },
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

        <Marker coordinate={{ latitude: 53.801277, longitude: -1.548567 }} />
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
