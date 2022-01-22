import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
	// console.warn("CLIVE IS AWESOME");
	const [currentLongitude, setCurrentLongitude] = useState(0);
	const [currentLatitude, setCurrentLatitude] = useState(0);
	const [markers, setMarkers] = useState([]);
	const [polys, setPolys] = useState([]);
	const mapRef = useRef();

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let loc = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Balanced,
				enableHighAccuracy: true,
				timeInterval: 5,
				distanceInterval: 0,
			});
			setCurrentLongitude(loc.coords.longitude);
			setCurrentLatitude(loc.coords.latitude);
			setMarkers[{}];
		})();
	}, []);

	const myLoc = async () => {
		mapRef.current.animateCamera({
			center: { latitude: currentLatitude, longitude: currentLongitude },
		});
	};
	const placeNode = () => {
		const randScale = 0.003;
		const mark = {
			latitude: currentLatitude + Math.random() * randScale,
			longitude: currentLongitude + Math.random() * randScale,
		};

		setMarkers((currMarkers) => [...currMarkers, mark]);
	};
	const nodes = [
		{
			latitude: 53.958626024974606,
			longitude: -1.0759610737684961,
		},
		{
			latitude: 53.96040004789593,
			longitude: -1.076530158671897,
		},
		{
			latitude: 53.959562378299985,
			longitude: -1.0774774309120674,
		},
	];
	const endRun = () => {
		const polyMarks = [...markers];
		const poly = {
			coordinates: polyMarks,
		};
		console.warn(poly);
		setPolys((currPolys) => [...currPolys, poly]);
		setMarkers([]);
	};

	return (
		<View style={StyleSheet.absoluteFillObject}>
			<MapView
				ref={mapRef}
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
				<></>
				{markers.map((marker, index) => (
					<Marker key={index} coordinate={marker} />
				))}
				{polys.map((poly, index) => (
					<Polygon
						key={index}
						coordinates={poly.coordinates}
						strokeColor="rgb(0, 0, 155)"
						fillColor="rgba(0, 0, 155, 0.2)"
						strokeWidth={5}
					/>
				))}
			</MapView>
			{markers.length > 2 ? <Button title="End Run" onPress={endRun} /> : null}
			<Button title="Drop Node" onPress={placeNode} />
			<Button title="Centre" onPress={myLoc} />
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
