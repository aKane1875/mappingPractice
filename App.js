import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
<<<<<<< HEAD
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
const StyledMarker = () => (
	<View
		style={{
			width: 60,
			height: 60,
			borderRadius: 30,
			backgroundColor: "#ffc600",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		}}
	>
		<Text style={{ color: "black" }}>Bhopal</Text>
	</View>
);

export default function App() {
	console.warn("CLIVE IS AWESOME");
	const [currentLongitude, setCurrentLongitude] = useState(0);
	const [currentLatitude, setCurrentLatitude] = useState(0);
	const [location, setLocation] = useState(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let loc = await Location.getCurrentPositionAsync({});
			setLocation(loc);
			setCurrentLongitude(loc.coords.longitude);
			setCurrentLatitude(loc.coords.latitude);
		})();
	}, []);

	return (
		<View style={StyleSheet.absoluteFillObject}>
			<MapView
				style={{ flex: 1 }}
				provider={PROVIDER_GOOGLE}
				region={{
					latitude: currentLatitude,
					longitude: currentLongitude,
					latitudeDelta: 0.009,
					longitudeDelta: 0.009,
				}}
				showUserLocation={true}
			>
				<Marker
					coordinate={{
						latitude: currentLatitude,
						longitude: currentLongitude,
					}}
				>
					<StyledMarker />
				</Marker>
			</MapView>
		</View>
	);
=======

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
>>>>>>> fdf1da83e250bb1cf29be13d8fad2272f4deb60f
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
