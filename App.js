<<<<<<< HEAD
import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Map from "./components/Map";
import Turf from "./components/Turf";
import { Ionicons } from "@expo/vector-icons";

function HomeScreen() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Home!</Text>
		</View>
	);
}

function AccountScreen() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Account!</Text>
		</View>
	);
}

const Tab = createBottomTabNavigator();

function MyTabs() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarActiveTintColor: "tomato",
				tabBarInactiveTintColor: "gray",
			})}
		>
			<Tab.Screen
				name="Turf"
				component={Turf}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="turf" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Account"
				component={AccountScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Map"
				component={Map}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="map" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<MyTabs />
		</NavigationContainer>
	);
}

// screenOptions={({ route }) => ({
// 	tabBarIcon: ({ focused, color, size }) => {
// 		let iconName;

// 		if (route.name === "Home") {
// 			iconName = focused ? "md-checkmark-circle" : "md-checkmark-circle";
// 		} else if (route.name === "Settings") {
// 			iconName = focused ? "md-checkmark-circle" : "md-checkmark-circle";
// 		}

// 		// You can return any component that you like here!
// 		return <Ionicons name={iconName} size={size} color={color} />;
// 	},
// 	tabBarActiveTintColor: "tomato",
// 	tabBarInactiveTintColor: "gray",
// })}
=======
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
>>>>>>> 8e144934db79e124fbc5dd14b619e24fd3a013f9
