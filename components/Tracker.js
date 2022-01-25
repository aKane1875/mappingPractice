import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { updateTrackerArray } from "../utils/helpers";

const LOCATION_TRACKING = "location-tracking";

function Tracker() {
	const [locationStarted, setLocationStarted] = useState(false);

	//Function to begin the tracker function running
	const startLocationTracking = async () => {
		await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
			accuracy: Location.Accuracy.Highest,
			timeInterval: 3000,
			distanceInterval: 0,
			// foregroundService: {
			//     notificationTitle: "Using your location",
			//     notificationBody:
			//         "To turn off, go back to the app and switch something off.",
			// },
		});
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(
			LOCATION_TRACKING
		);
		setLocationStarted(hasStarted);
		console.log("tracking started?", hasStarted);
	};

	//ask permissions on component mount
	useEffect(() => {
		const config = async () => {
			let resf = await Location.requestForegroundPermissionsAsync();
			let resb = await Location.requestBackgroundPermissionsAsync();
			if (resf.status != "granted" && resb.status !== "granted") {
				console.log("Permission to access location was denied");
			} else {
				console.log("Permission to access location granted");
			}
		};
		config();
	}, []);

	//Start tracker
	const startLocation = () => {
		startLocationTracking();
	};

	//stop tracker
	const stopLocation = () => {
		setLocationStarted(false);
		TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING).then((tracking) => {
			if (tracking) {
				Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
				console.log("tracking Stopped");
			}
		});
	};

	return (
		<View>
			{locationStarted ? (
				<Button title="Stop Tracking" onPress={stopLocation} />
			) : (
				<Button title="Start Tracking" onPress={startLocation} />
			)}
		</View>
	);
}

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
	if (error) {
		console.log("LOCATION_TRACKING task ERROR:", error);
		return;
	}
	if (data) {
		const { locations } = data;
		const newPoint = {
			latitude: locations[0].coords.latitude,
			longitude: locations[0].coords.longitude,
		};
		// console.log("Tracker found new point", newPoint);
		updateTrackerArray(newPoint);
	}
});
export default Tracker;
