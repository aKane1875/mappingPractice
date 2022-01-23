export const roundGPS = (num, places) => {
	num = num.toString();
	num = num.slice(0, num.indexOf(".") + places);
	return Number(num);
};

export const createZone = (_lat, _lon) => {
	const lat = roundGPS(_lat, 3);
	const lon = roundGPS(_lon, 3);
	const size = 0.1;
	const newZone = [
		{
			latitude: lat,
			longitude: lon,
		},
		{
			latitude: lat + size,
			longitude: lon,
		},
		{
			latitude: lat + size,
			longitude: lon - size,
		},
		{
			latitude: lat,
			longitude: lon - size,
		},
	];
	return newZone;
};
