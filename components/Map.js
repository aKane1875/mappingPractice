import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapView, {
	PROVIDER_GOOGLE,
	Marker,
	Polygon,
	Polyline,
} from "react-native-maps";
import * as Location from "expo-location";
import Tracker from "./Tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Map() {
	const [currentLongitude, setCurrentLongitude] = useState(0);
	const [currentLatitude, setCurrentLatitude] = useState(0);
	const [markers, setMarkers] = useState([]);
	const [track, setTrack] = useState([]);
	const mapRef = useRef(null);

	useEffect(() => {
		findUser();
		AsyncStorage.setItem("trackerArray", JSON.stringify([]));
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
	};

	const panToUser = async () => {
		findUser();
		mapRef.current.animateCamera({
			center: { latitude: currentLatitude, longitude: currentLongitude },
		});
	};

	//can probs delete
	const placeNode = () => {
		const mark = {
			latitude: currentLatitude,
			longitude: currentLongitude,
		};
		setMarkers((currMarkers) => [...currMarkers, mark]);
	};

	const getStoredTrackerData = async () => {
		try {
			let jsonValue = await AsyncStorage.getItem("trackerArray");
			const parsedArray = jsonValue != null ? JSON.parse(jsonValue) : null;
			console.log("getStoredData says old array: ", parsedArray);
			setTrack((currTrack) => [...currTrack, ...parsedArray]);
			jsonValue = JSON.stringify([]);
			await AsyncStorage.setItem("trackerArray", jsonValue);
			console.log("getStoredData says track: ", track);
		} catch (e) {
			console.log(e);
		}
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
				showsUserLocation={true}
				showsMyLocationButton={true}
				followsUserLocation={true}
			>
				<Marker
					coordinate={{
						latitude: currentLatitude,
						longitude: currentLongitude,
					}}
				/>
				{markers.map((marker, index) => (
					<Marker key={index} coordinate={marker} />
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
			</MapView>
			<Text>{track.length}</Text>
			<Button title="UPDATE TRACK" onPress={getStoredTrackerData} />
			<Button title="CENTER" onPress={panToUser} />
			<Button title="PLACE NODE" onPress={placeNode} />
			<Tracker />
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
