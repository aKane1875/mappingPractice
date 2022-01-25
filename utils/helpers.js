import AsyncStorage from "@react-native-async-storage/async-storage";
import hexGrid from "@turf/hex-grid";
import pointsWithinPolygon from "@turf/points-within-polygon";
// import isPointInPolygon from "geolib/es/getDistance";

export const roundGPS = (num, places) => {
	let pow = Math.pow(10, places);
	const flooredNum = Math.ceil(num * pow) / pow;
	return flooredNum;
};

export const updateTrackerArray = async (newValue) => {
	try {
		let jsonValue = await AsyncStorage.getItem("trackerArray");
		const parsedArray = jsonValue != null ? JSON.parse(jsonValue) : null;
		const newArray = [...parsedArray, newValue];
		jsonValue = JSON.stringify(newArray);
		await AsyncStorage.setItem("trackerArray", jsonValue);
	} catch (e) {
		// console.log("update tracker array error", e);
	}
};

//converts polyArray to objects with long and lat, for MapView to use
export const createBoard = (_lon, _lat) => {
	const board_size = 0.02;
	const board_h = 0.04;
	const bbox = [
		_lon - board_h,
		_lat - board_size,
		_lon + board_h,
		_lat + board_size,
	];

	const cellSide = 0.1;
	const options = { units: "kilometres" };

	const grid = hexGrid(bbox, cellSide, options);

	//leaves an array of arrays
	const board = grid.features.map((feature) => feature.geometry.coordinates[0]);

	//convert arrays to objects
	board.forEach((poly, index) => {
		const _coords = poly.map((coordArr) => {
			return {
				longitude: coordArr[0],
				latitude: coordArr[1],
			};
		});

		board[index] = {
			col: "rgba(3, 90, 252, 0.4)",
			coords: _coords,
		};
	});

	// //convert arrays to objects
	// board.forEach((poly) => {

	// 	poly.forEach((coord, index) => {
	// 		poly[index] = {
	// 			col: "rgba(3, 90, 252, 0.4)",
	// 			coords: {
	// 				longitude: coord[0],
	// 				latitude: coord[1],
	// 			},
	// 		};
	// 	});
	// });

	return board;
};

export const MapviewArrayToTurfArray = (arr) => {
	return arr.map((point) => [point.longitude, point.latitude]);
};

export const checkPathIsInPolys = (pointsArray, hexArray) => {
	//CHANGE MAPVIEW POINT ARRAY TO TURF POINT ARRAY - ACTUALLY HOW ARE WE COLLECTING THEM?
	const turfPoints = MapviewArrayToTurfArray(pointsArray);

	//DEEP COPY THE HEX ARRAY AS WILL UPDATE IT
	const hexArrayCopy = JSON.parse(JSON.stringify(hexArray));

	//LOOP THROUGH HEXES
	hexArrayCopy.forEach((hex) => {
		//CONVERT HEX TO TURFSTYLE
		const turfHex = MapviewArrayToTurfArray(hex);
		//SEE IF ANY OF POINTS ARE INSIDE THE HEX
		const pointsToCheck = pointsWithinPolygon(turfPoints, turfHex);

		//IF ANY POINTS ARE IN THE HEX, CHANGE ITS COLOUR
		if (pointsToCheck.features.length > 0) {
			hex.col = "rgba(236, 66, 245, 0.3)";
		}
	});
	setHexBoard(hexArrayCopy);
};
