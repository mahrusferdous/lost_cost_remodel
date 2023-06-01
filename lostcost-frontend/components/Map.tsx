import React from "react";
import { View } from "react-native";
import MapView, { Marker, Polyline, LatLng } from "react-native-maps";
import tw from "tailwind-react-native-classnames";

const MapScreen: React.FC = () => {
    function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg: number) {
        return deg * (Math.PI / 180);
    }

    var distance = getDistance(24.580115, 90.397142, 24.576491, 90.3948);

    const pointA: LatLng = { latitude: 24.580115, longitude: 90.397142 };
    const pointB: LatLng = { latitude: 24.576491, longitude: 90.3948 };

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
                    latitudeDelta: distance / 95,
                    longitudeDelta: distance / 95,
                }}
            >
                <Marker coordinate={pointA} title="Start" />
                <Marker coordinate={pointB} title="End" />
                <Polyline coordinates={routeCoordinates} strokeWidth={12} strokeColor="#000000" />
            </MapView>
        </View>
    );
};

export default MapScreen;
