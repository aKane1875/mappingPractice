import AsyncStorage from "@react-native-async-storage/async-storage";
import hexGrid from "@turf/hex-grid";

export const roundGPS = (num, places) => {
	let pow = Math.pow(10, places);
	const flooredNum = Math.ceil(num * pow) / pow;
	return flooredNum;
};

export const createZone = (_lat, _lon) => {
	const lat = roundGPS(_lat, 3);
	const lon = roundGPS(_lon, 3);
	const size = 0.001;
	const newZone = [
		{
			latitude: lat,
			longitude: lon,
		},
		{
			latitude: lat - size,
			longitude: lon,
		},
		{
			latitude: lat - size,
			longitude: lon - size,
		},
		{
			latitude: lat,
			longitude: lon - size,
		},
	];
	return newZone;
};

export const updateTrackerArray = async (newValue) => {
	try {
		let jsonValue = await AsyncStorage.getItem("trackerArray");
		const parsedArray = jsonValue != null ? JSON.parse(jsonValue) : null;
		console.log("upTrAr says:", parsedArray);
		const newArray = [...parsedArray, newValue];
		jsonValue = JSON.stringify(newArray);
		await AsyncStorage.setItem("trackerArray", jsonValue);
	} catch (e) {
		console.log(e);
	}
};

export const createBoard = (_lat, _lon) => {
	const board_size = 0.02;
	const bbox = [
		_lon - board_size,
		_lat - board_size,
		_lon + board_size,
		_lat + board_size,
	];

	var cellSide = 0.1;
	var options = { units: "miles" };

	var grid = hexGrid(bbox, cellSide, options);

	//leaves an array of arrays
	const polyArrays = grid.features.map(
		(feature) => feature.geometry.coordinates[0]
	);

	//convert arrays to objects
	polyArrays.forEach((poly) => {
		poly.forEach((coord, index) => {
			poly[index] = {
				longitude: coord[0],
				latitude: coord[1],
				col: "rgba(156, 194, 255, 0.3)",
			};
		});
	});

	return polyArrays;
};
