import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polygon, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Tracker from "./Tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBoard } from "../utils/helpers";

export default function Map() {
	const leeds_lat = 53.7999506;
	const leeds_long = -1.5497128;
	const [userLoc, setUserLoc] = useState({
		latitude: leeds_lat,
		longitude: leeds_long,
	});
	const [track, setTrack] = useState([]);
	const [hexBoard, setHexBoard] = useState(createBoard(leeds_long, leeds_lat));
	const mapRef = useRef(null);

	useEffect(() => {
		// findUser();
		AsyncStorage.setItem("trackerArray", JSON.stringify([]));
	}, []);

	const findUser = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			console.log("Permission to access location was denied");
			setErrorMsg("Permission to access location was denied");
			return;
		} else {
			console.log("Permission to access location granted");
		}

		const loc = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.Balanced,
			enableHighAccuracy: true,
			timeInterval: 5000,
			distanceInterval: 0,
		});

		setUserLoc({
			latitude: loc.coords.latitude,
			longitude: loc.coords.longitude,
		});
	};

	const tappedPoly = (index) => {
		const newBoard = JSON.parse(JSON.stringify(hexBoard));
		const tapped = newBoard[index];
		tapped.col = "rgba(42, 181, 0, 0.5)"; //pale green
		newBoard[index] = tapped;
		setHexBoard(newBoard);
	};

	const panToUser = async () => {
		findUser();
		mapRef.current.animateCamera({
			center: userLoc,
		});
	};

	const getStoredTrackerData = async () => {
		try {
			let jsonValue = await AsyncStorage.getItem("trackerArray");
			const parsedArray = jsonValue != null ? JSON.parse(jsonValue) : null;
			setTrack((currTrack) => [...currTrack, ...parsedArray]);
			jsonValue = JSON.stringify([]);
			await AsyncStorage.setItem("trackerArray", jsonValue);
		} catch (e) {
			console.log("error in get stored tracker data", e);
		}
	};

	return (
		<View style={StyleSheet.absoluteFillObject}>
			<MapView
				ref={mapRef}
				style={{ flex: 1 }}
				provider={PROVIDER_GOOGLE}
				region={{
					latitude: userLoc.latitude,
					longitude: userLoc.longitude,
					latitudeDelta: 0.009,
					longitudeDelta: 0.009,
				}}
				showsUserLocation={true}
				showsMyLocationButton={true}
				followsUserLocation={true}
			>
				{hexBoard.map((poly, index) => (
					<Polygon
						key={index}
						coordinates={poly.coords}
						strokeColor="rgba(0,0,0,0.1)"
						fillColor={poly.col}
						// fillColor="rgba(156, 194, 255, 0.3)"
						strokeWidth={1}
						tappable
						onPress={() => tappedPoly(index)}
					/>
				))}
				{track.length > 1 ? (
					<Polyline
						coordinates={track}
						strokeColor="rgb(229, 0, 0)"
						fillColor="rgba(229, 0, 0, 0.2)"
						strokeWidth={3}
					/>
				) : null}
			</MapView>
			<Text>
				Path Points: {track.length} Hex Count: {hexBoard.length}
			</Text>
			<Button title="UPDATE TRACK" onPress={getStoredTrackerData} />
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
