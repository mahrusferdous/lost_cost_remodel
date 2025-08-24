import React, { useEffect, useRef } from "react";
import tw from "tailwind-react-native-classnames";
import { View } from "react-native";
import { MapView, PointAnnotation, ShapeSource, LineLayer, Camera } from "@maplibre/maplibre-react-native";

interface MapScreenProps {
	fromLongitude: number;
	fromLatitude: number;
	toLongitude: number;
	toLatitude: number;
	polyline: string;
}

const MapScreen = ({ fromLongitude, fromLatitude, toLongitude, toLatitude, polyline }: MapScreenProps) => {
	const [routeCoordinates, setRouteCoordinates] = React.useState<number[][]>([]);
	const [pointA, setPointA] = React.useState<[number, number] | null>(null);
	const [pointB, setPointB] = React.useState<[number, number] | null>(null);

	const cameraRef = useRef<any>(null);

	useEffect(() => {
		setPointA([fromLongitude, fromLatitude]);
		setPointB([toLongitude, toLatitude]);
	}, [fromLongitude, fromLatitude, toLongitude, toLatitude]);

	useEffect(() => {
		if (!polyline) return;
		const coords: number[][] = polyline
			.split(";")
			.map((point) => {
				const [lat, lon] = point.split(",");
				const latNum = parseFloat(lat);
				const lonNum = parseFloat(lon);
				if (isNaN(latNum) || isNaN(lonNum)) return null;
				return [lonNum, latNum]; // MapLibre expects [longitude, latitude]
			})
			.filter(Boolean) as number[][];
		setRouteCoordinates(coords);
	}, [polyline]);

	useEffect(() => {
		if (!cameraRef.current) return;

		let allCoords: number[][] = [];
		if (pointA) allCoords.push(pointA);
		if (pointB) allCoords.push(pointB);
		allCoords = allCoords.concat(routeCoordinates);

		if (allCoords.length === 0) return;

		const lons = allCoords.map((c) => c[0]);
		const lats = allCoords.map((c) => c[1]);
		const minLon = Math.min(...lons);
		const maxLon = Math.max(...lons);
		const minLat = Math.min(...lats);
		const maxLat = Math.max(...lats);

		cameraRef.current.fitBounds([minLon, minLat], [maxLon, maxLat], 50, 1000);
	}, [pointA, pointB, routeCoordinates]);

	return (
		<View style={tw`h-full`}>
			<MapView
				style={{ flex: 1 }}
				mapStyle="https://tiles.openfreemap.org/styles/liberty" // OpenFreeMap tiles for roads & features
			>
				<Camera
					ref={cameraRef}
					centerCoordinate={[90.3563, 23.685]} // [longitude, latitude]
					zoomLevel={5} // adjust zoom as needed
				/>

				{routeCoordinates.length > 0 && (
					<ShapeSource
						id="routeLine"
						shape={{
							type: "Feature",
							geometry: {
								type: "LineString",
								coordinates: routeCoordinates,
							},
							properties: {},
						}}
					>
						<LineLayer
							id="routeLineLayer"
							style={{
								lineWidth: 4,
								lineJoin: "round",
								lineCap: "round",
							}}
						/>
					</ShapeSource>
				)}

				{pointA && !(pointA[0] === 0 && pointA[1] === 0) && (
					<PointAnnotation id="marker-1" coordinate={pointA}>
						<View />
					</PointAnnotation>
				)}
				{pointB && !(pointB[0] === 0 && pointB[1] === 0) && (
					<PointAnnotation id="marker-2" coordinate={pointB}>
						<View />
					</PointAnnotation>
				)}
			</MapView>
		</View>
	);
};

export default MapScreen;
