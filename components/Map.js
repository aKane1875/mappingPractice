import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapView, {
	PROVIDER_GOOGLE,
	Marker,
	Polygon,
	Polyline,
} from "react-native-maps";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { createZone, roundGPS } from "../utils/helpers";

const LOCATION_TRACKING = "location-tracking";

let trackVar = [];

export default function Map() {
	const [currentLongitude, setCurrentLongitude] = useState(0);
	const [currentLatitude, setCurrentLatitude] = useState(0);
	const [markers, setMarkers] = useState([]);
	const [polys, setPolys] = useState([]);
	const [zone, setZone] = useState([]);
	const [track, setTrack] = useState([]);
	const mapRef = useRef(null);

	const startLocationTracking = async () => {
		const { status } = await Location.requestBackgroundPermissionsAsync();

		if (status === "granted") {
			await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
				accuracy: Location.Accuracy.Highest,
				timeInterval: 5000, //adjust both of these
				distanceInterval: 2,
				foregroundService: {
					notificationTitle: "Using your location",
					notificationBody:
						"To turn off, go back to the app and switch something off.",
				},
			});
		}
	};

	useEffect(() => {
		findUser();
	}, []);

	const findUser = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			console.log("Permission to access location was denied");
			setErrorMsg("Permission to access location was denied");
			return;
		} else {
			console.log("Permission to access location granted");
		}

		let loc = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.Balanced,
			enableHighAccuracy: true,
			timeInterval: 5000,
			distanceInterval: 0,
		});
		setCurrentLongitude(loc.coords.longitude);
		setCurrentLatitude(loc.coords.latitude);
		createZone(loc.coords.latitude, loc.coords.longitude);
	};

	const panToUser = async () => {
		findUser();
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

	const endRun = () => {
		const polyMarks = [...markers];
		const poly = {
			coordinates: polyMarks,
		};
		setPolys((currPolys) => [...currPolys, poly]);
		setMarkers([]);
		Location.stopLocationUpdatesAsync(LOCATION_TRACKING); //need to be async?
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
				showsMyLocationButton={true}
				followsUserLocation={true}
			>
				<Marker
					coordinate={{
						latitude: currentLatitude,
						longitude: currentLongitude,
					}}
				/>
				<Marker
					coordinate={{
						latitude: roundGPS(currentLatitude, 3),
						longitude: roundGPS(currentLongitude, 3),
					}}
				/>
				{markers.map((marker, index) => (
					<Marker key={index} coordinate={marker} />
				))}

				{polys.map((poly, index) => (
					<Polygon
						key={index}
						coordinates={poly.coordinates}
						strokeColor="rgb(0, 0, 155)"
						fillColor="rgba(0, 0, 155, 0.1)"
						strokeWidth={5}
					/>
				))}
				{markers.length > 1 ? (
					<Polyline
						coordinates={markers}
						strokeColor="rgb(0, 0, 155)"
						fillColor="rgba(0, 0, 155, 0.2)"
						strokeWidth={5}
					/>
				) : null}
				{track.length > 1 ? (
					<Polyline
						coordinates={track}
						strokeColor="rgb(229, 0, 0)"
						fillColor="rgba(229, 0, 0, 0.2)"
						strokeWidth={3}
					/>
				) : null}
				{zone.length > 1 ? (
					<Polygon
						coordinates={zone}
						strokeColor="rgb(0, 0, 155)"
						fillColor="rgba(0, 0, 155, 0.2)"
						strokeWidth={5}
					/>
				) : null}
			</MapView>
			{markers.length > 2 ? <Button title="End Run" onPress={endRun} /> : null}
			<Button title="Drop Node" onPress={placeNode} />
			<Button title="Centre" onPress={panToUser} />
			<Button title="Start Tracking" onPress={startLocationTracking} />
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

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
	if (error) {
		console.log("an error with the taskmanager thing", error);
		return;
	}
	if (data) {
		const { locations } = data;
		const newTrack = {
			latitude: locations[0].coords.latitude,
			longitude: locations[0].coords.longitude,
		};

		trackVar = [...trackVar, newTrack];
		console.log(trackVar);
	}
});
