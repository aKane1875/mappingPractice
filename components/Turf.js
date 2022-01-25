import React, { useState } from "react";
import MapView, { Polygon } from "react-native-maps";
import { createBoard } from "../utils/helpers";

export default function Turf() {
	const leeds_lat = 53.7999506;
	const leeds_long = -1.5497128;
	const [hexBoard, setHexBoard] = useState(createBoard(leeds_lat, leeds_long));

	const tappedPoly = (index) => {
		const tapped = hexBoard[index];
		const newBoard = [...hexBoard];
		tapped.col = "rgba(50, 168, 82, 0.3)";
		newBoard[index] = tapped;
		// setHexBoard(newBoard);
		console.warn(`poly ${index} was tapped`);
	};

	return (
		<MapView
			style={{ flex: 1 }}
			region={{
				latitude: leeds_lat,
				longitude: leeds_long,
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
					coordinates={poly}
					strokeColor="rgba(0,0,0,0.1)"
					fillColor={poly.col}
					// fillColor="rgba(156, 194, 255, 0.3)"
					strokeWidth={1}
					tappable
					onPress={() => tappedPoly(index)}
				/>
			))}
		</MapView>
	);
}
