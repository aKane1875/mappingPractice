import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
