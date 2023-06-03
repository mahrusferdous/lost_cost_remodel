import React, { useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker, Polyline, LatLng } from "react-native-maps";
import tw from "tailwind-react-native-classnames";

interface MapScreenProps {
    fromLongitude: number;
    fromLatitude: number;
    toLongitude: number;
    toLatitude: number;
}

const MapScreen: React.FC<MapScreenProps> = ({ fromLongitude, fromLatitude, toLongitude, toLatitude }) => {
    const [routeCoordinates, setRouteCoordinates] = React.useState<any[]>([]);
    const [pointA, setPointA] = React.useState<LatLng>({ latitude: 0, longitude: 0 });
    const [pointB, setPointB] = React.useState<LatLng>({ latitude: 0, longitude: 0 });
    const [distance, setDistance] = React.useState<number>(0);

    const mapRef = React.useRef<MapView | null>(null);

    useEffect(() => {
        function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2 - lat1);
            var dLon = deg2rad(lon2 - lon1);
            var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            return d;
        }

        function deg2rad(deg: number) {
            return deg * (Math.PI / 180);
        }

        setDistance(getDistance(fromLatitude, fromLongitude, toLatitude, toLongitude));
    }, [fromLatitude, fromLongitude, toLatitude, toLongitude]);

    const lat = pointA.latitude / 2 + pointB.latitude / 2;
    const long = pointA.longitude / 2 + pointB.longitude / 2;

    useEffect(() => {
        // Update pointA and pointB
        const newPointA = { latitude: fromLatitude, longitude: fromLongitude };
        const newPointB = { latitude: toLatitude, longitude: toLongitude };
        setPointA(newPointA);
        setPointB(newPointB);

        // Update routeCoordinates
        // setRouteCoordinates([newPointA, ...generateDetour(newPointA, newPointB), newPointB]);
    }, [fromLatitude, fromLongitude, toLatitude, toLongitude]);

    useEffect(() => {
        let timeoutId = null;
        setRouteCoordinates([pointA, pointB]);
        // Animate map to new region

        const delayFetchLocationData = () => {
            clearTimeout(timeoutId!);
            timeoutId = setTimeout(() => {
                if (mapRef.current && distance !== 0) {
                    mapRef.current.animateToRegion(
                        {
                            latitude: lat,
                            longitude: long,
                            latitudeDelta: distance / 85,
                            longitudeDelta: distance / 85,
                        },
                        1000
                    );
                }
            }, 500);
        };

        delayFetchLocationData();

        return () => {
            clearTimeout(timeoutId!);
        };
    }, [pointA, pointB, distance]);

    return (
        <View style={tw`h-full`}>
            <MapView
                ref={mapRef}
                style={tw`flex-1`}
                initialRegion={{
                    latitude: 24.580115,
                    longitude: 90.397142,
                    latitudeDelta: 10,
                    longitudeDelta: 10,
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
