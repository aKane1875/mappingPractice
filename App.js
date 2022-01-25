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
            <Ionicons name="map" color={color} size={size} />
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
//  tabBarIcon: ({ focused, color, size }) => {
//      let iconName;
//      if (route.name === "Home") {
//          iconName = focused ? "md-checkmark-circle" : "md-checkmark-circle";
//      } else if (route.name === "Settings") {
//          iconName = focused ? "md-checkmark-circle" : "md-checkmark-circle";
//      }
//      // You can return any component that you like here!
//      return <Ionicons name={iconName} size={size} color={color} />;
//  },
//  tabBarActiveTintColor: "tomato",
//  tabBarInactiveTintColor: "gray",

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
						<Ionicons name="map" color={color} size={size} />
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
