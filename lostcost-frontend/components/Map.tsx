import React, { useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker, Polyline, LatLng } from "react-native-maps";
import tw from "tailwind-react-native-classnames";

interface MapScreenProps {
    fromLongitude: number;
    fromLatitude: number;
    toLongitude: number;
    toLatitude: number;
    polyline: string;
}

const MapScreen: React.FC<MapScreenProps> = ({ fromLongitude, fromLatitude, toLongitude, toLatitude, polyline }) => {
    const [routeCoordinates, setRouteCoordinates] = React.useState<any[]>([]);
    const [pointA, setPointA] = React.useState<LatLng | undefined>(undefined);
    const [pointB, setPointB] = React.useState<LatLng | undefined>(undefined);
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

    useEffect(() => {
        // Update pointA and pointB
        const newPointA = { latitude: fromLatitude, longitude: fromLongitude };
        setPointA(newPointA);
    }, [fromLatitude, fromLongitude]);

    useEffect(() => {
        const newPointB = { latitude: toLatitude, longitude: toLongitude };
        setPointB(newPointB);
    }, [toLatitude, toLongitude]);

    useEffect(() => {
        let timeoutId = null;
        if (pointA === undefined && pointB === undefined) return;

        const lat = pointA?.latitude && pointB?.latitude ? pointA.latitude / 2 + pointB.latitude / 2 : undefined;
        const long = pointA?.longitude && pointB?.longitude ? pointA.longitude / 2 + pointB.longitude / 2 : undefined;

        const delayFetchLocationData = () => {
            clearTimeout(timeoutId!);
            timeoutId = setTimeout(() => {
                if (mapRef.current && distance !== 0 && lat && long) {
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

    useEffect(() => {
        const polylineCoordinates = polyline.split(";").map((point) => {
            const [latitude, longitude] = point.split(",");
            return {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            };
        });
        if (polyline !== "") setRouteCoordinates(polylineCoordinates);
    }, [polyline]);

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
                {pointA !== undefined && <Marker coordinate={pointA} title="Start" />}
                {pointB !== undefined && <Marker coordinate={pointB} title="End" />}
                {polyline !== "" && <Polyline coordinates={routeCoordinates} strokeWidth={12} strokeColor="#000000" />}
            </MapView>
        </View>
    );
};

export default MapScreen;
