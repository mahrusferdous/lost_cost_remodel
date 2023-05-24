import React from "react";
import { View } from "react-native";
import MapView, { Marker, Polyline, LatLng } from "react-native-maps";
import tw from "tailwind-react-native-classnames";

const MapScreen: React.FC = () => {
    const myLatLng: LatLng = { latitude: 23.7104, longitude: 90.40744 };

    const routeCoordinates: LatLng[] = [
        { latitude: 23.7104, longitude: 90.40744 },
        { latitude: 24.244968, longitude: 89.9113051 },
        { latitude: 24.743448, longitude: 90.398384 },
    ];

    return (
        <View style={tw`h-full`}>
            <MapView
                style={tw`flex-1`}
                initialRegion={{
                    latitude: myLatLng.latitude,
                    longitude: myLatLng.longitude,
                    latitudeDelta: 10,
                    longitudeDelta: 10,
                }}
            >
                <Marker coordinate={myLatLng} title="Your Location" />
                <Polyline coordinates={routeCoordinates} strokeWidth={2} strokeColor="#0000FF" />
            </MapView>
        </View>
    );
};

export default MapScreen;
