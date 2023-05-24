import React from "react";
import { View } from "react-native";
import MapView, { Marker, Polyline, LatLng } from "react-native-maps";
import tw from "tailwind-react-native-classnames";

const MapScreen: React.FC = () => {
    const pointA: LatLng = { latitude: 24.580115, longitude: 90.397142 };
    const pointB: LatLng = { latitude: 24.743448, longitude: 90.398384 };

    const generateDetour = (start: { latitude: any; longitude: any }, end: { latitude: any; longitude: any }) => {
        const dx = end.longitude - start.longitude;
        const dy = end.latitude - start.latitude;

        const r = Math.sqrt(dx * dx + dy * dy) / 10; // radius of the detour
        const cx = start.longitude + dx / 2; // center of the detour
        const cy = start.latitude + dy / 2;

        const points = [];
        const segments = 100;

        // generate semi-circle for the detour
        for (let i = 0; i < segments; i++) {
            const theta = Math.PI * (i / (segments - 1));
            points.push({
                latitude: cy + r * Math.sin(theta),
                longitude: cx + r * Math.cos(theta),
            });
        }

        return points;
    };

    const routeCoordinates = [pointA, ...generateDetour(pointA, pointB), pointB];

    const lat = pointA.latitude / 2 + pointB.latitude / 2;
    const long = pointA.longitude / 2 + pointB.longitude / 2;

    return (
        <View style={tw`h-full`}>
            <MapView
                style={tw`flex-1`}
                initialRegion={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.20014433238437272 * 1.1,
                    longitudeDelta: 0.20014433238437272 * 1.1,
                }}
            >
                <Marker coordinate={pointA} title="Start" />
                <Marker coordinate={pointB} title="End" />
                <Polyline coordinates={routeCoordinates} strokeWidth={10} strokeColor="#000000" />
            </MapView>
        </View>
    );
};

export default MapScreen;
