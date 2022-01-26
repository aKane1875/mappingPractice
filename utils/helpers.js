import AsyncStorage from "@react-native-async-storage/async-storage";
import hexGrid from "@turf/hex-grid";
import pointsWithinPolygon from "@turf/points-within-polygon";
import multiPolygon from "@turf/helpers";
import multiPoint from "@turf/helpers";
import isPointInPolygon from "geolib/es/isPointInPolygon";

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
		console.log("update tracker array error", e);
	}
};

//converts polyArray to objects with long and lat, for MapView to use
export const createBoard = (_lon, _lat) => {
	const board_size = 0.01;
	const board_h = board_size * 2;
	const bbox = [
		_lon - board_h,
		_lat - board_size,
		_lon + board_h,
		_lat + board_size,
	];

	const cellSide = 0.12;
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

	return board;
};

export const checkPathIsInPolys = (pointsArray, hexArray, setHexBoard) => {
	const newArray = [...hexArray];

	pointsArray.forEach((point) => {
		for (const hex of newArray) {
			if (isPointInPolygon(point, hex.coords)) {
				hex.col = "rgba(235, 210, 52, 0.3)"; //yellow
				break;
			}
		}
	});
	setHexBoard(newArray);
};
