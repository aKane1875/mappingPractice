import React from "react";
import MapView from "react-native-maps";
import Geojson from "react-native-geojson";
import squareGrid from "@turf/square-grid";
import bboxPolygon from "@turf/bbox-polygon";
import hexGrid from "@turf/hex-grid";

const leeds_lat = 53.7999506;
const leeds_long = -1.5497128;
const board_size = 0.02;
const bbox = [
	leeds_long - board_size,
	leeds_lat - board_size,
	leeds_long + board_size,
	leeds_lat + board_size,
];

// const poly2 = bboxPolygon(bbox);
// const grid = squareGrid(bbox, 0.1, "kilometers");

// const leeds = {
// 	type: "FeatureCollection",
// 	features: [
// 		{
// 			type: "Polygon",
// 			properties: {},
// 			geometry: {
// 				type: "Point",
// 				coordinates: [leeds_long - board_size, leeds_lat - board_size],
// 			},
// 		},

// 	],
// };

// var bbox = [-1.6, 52.9, -1.4, 53.1];
var cellSide = 0.1;
var options = { units: "miles" };

var grid = hexGrid(bbox, cellSide, options);
export default function Turf(props) {
	return (
		<MapView
			style={{ flex: 1 }}
			region={{
				latitude: leeds_lat,
				longitude: leeds_long,
				latitudeDelta: 0.009,
				longitudeDelta: 0.009,
			}}
		>
			<Geojson geojson={grid} />
		</MapView>
	);
}
