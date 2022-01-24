// export const roundGPS = (num, places) => {
// 	num = num.toString();
// 	num = num.slice(0, num.indexOf(".") + places);
// 	return Number(num);
// };

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
