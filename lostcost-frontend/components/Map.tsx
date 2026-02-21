import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Polyline, LatLng, UrlTile } from "react-native-maps";
import { MAPTILER_KEY } from "@env";

interface MapScreenProps {
	fromLatitude: number;
	fromLongitude: number;
	toLatitude: number;
	toLongitude: number;
	polyline: string; // "lat,lon;lat,lon;..."
}

const MapScreen = ({ fromLatitude, fromLongitude, toLatitude, toLongitude, polyline }: MapScreenProps) => {
	const mapRef = useRef<MapView>(null);
	const [routeCoordinates, setRouteCoordinates] = useState<LatLng[]>([]);

	useEffect(() => {
		if (!polyline) return;
		const coords: LatLng[] = polyline
			.split(";")
			.map((p) => {
				const [lat, lon] = p.split(",");
				return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
			})
			.filter((c) => !isNaN(c.latitude) && !isNaN(c.longitude));
		setRouteCoordinates(coords);
	}, [polyline]);

	useEffect(() => {
		if (!mapRef.current) return;

		const allCoords: LatLng[] = [
			{ latitude: fromLatitude, longitude: fromLongitude },
			{ latitude: toLatitude, longitude: toLongitude },
			...routeCoordinates,
		].filter((c) => !(c.latitude === 0 && c.longitude === 0));

		if (allCoords.length === 0) return;

		setTimeout(() => {
			mapRef.current?.fitToCoordinates(allCoords, {
				edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
				animated: true,
			});
		}, 100);
	}, [fromLatitude, fromLongitude, toLatitude, toLongitude, routeCoordinates]);

	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.map}
				initialRegion={{
					latitude: 23.685, // Bangladesh center
					longitude: 90.3563,
					latitudeDelta: 10,
					longitudeDelta: 10,
				}}
			>
				<UrlTile
					urlTemplate={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
					maximumZ={20}
				/>
				<Marker coordinate={{ latitude: fromLatitude, longitude: fromLongitude }} title="Start" />
				<Marker coordinate={{ latitude: toLatitude, longitude: toLongitude }} title="End" />
				{routeCoordinates.length > 0 && (
					<Polyline coordinates={routeCoordinates} strokeColor="#3b82f6" strokeWidth={4} zIndex={1} />
				)}
			</MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1 },
	map: { flex: 1 },
});

export default MapScreen;
