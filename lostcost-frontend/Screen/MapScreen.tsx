import React from "react";
import { View } from "react-native";
import MapView, { Marker, Polyline, LatLng } from "react-native-maps";

const MapScreen: React.FC = () => {
    const myLatLng: LatLng = { latitude: 23.7104, longitude: 90.40744 };

    const routeCoordinates: LatLng[] = [
        { latitude: 23.7104, longitude: 90.40744 },
        { latitude: 40.9204, longitude: 90.40044 },
        { latitude: 50.033448, longitude: 90.399384 },
        { latitude: 24.743448, longitude: 90.398384 },
    ];

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
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
