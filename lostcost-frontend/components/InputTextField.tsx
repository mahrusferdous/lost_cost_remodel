import { View, TouchableOpacity, TextInput, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

interface DirectionTextInputProps {
    setFilteredData: React.Dispatch<React.SetStateAction<any[]>>;
}

interface DirectionTextInputProps {
    setFilteredData: React.Dispatch<React.SetStateAction<any[]>>;
    setFromLongitude: React.Dispatch<React.SetStateAction<number>>;
    setFromLatitude: React.Dispatch<React.SetStateAction<number>>;
}

const DirectionTextInput: React.FC<DirectionTextInputProps> = ({ setFilteredData, setFromLongitude, setFromLatitude }) => {
    const [location, setLocation] = useState<Location.LocationObject | undefined>();
    const [placeLocation, setPlaceLocation] = useState<String>("");

    const myLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        // console.log(location);
        // setFromLatitude(location.coords.latitude);
        // setFromLongitude(location.coords.longitude);
        setFromLatitude(24.71362);
        setFromLongitude(90.450237);
        setTimeout(() => setLocation(location), 100);
    };

    useEffect(() => {
        let timeoutId = null;
        if (placeLocation === "") return;
        const fetchLocationData = async () => {
            try {
                const response = await axios.get(`http://192.168.1.207:8080/osm-points/search?name=${placeLocation}`);
                const filteredData = response.data.filter((item: any) => item.name.toLowerCase().startsWith(placeLocation.toLowerCase()));
                const filteredDataWithId = filteredData.map((item: any, index: number) => ({ ...item, id: index }));
                setFilteredData(filteredDataWithId.slice(0, 10)); // sets the first 10 results
            } catch (error: any) {
                console.log(error);
            }
        };

        const delayFetchLocationData = () => {
            clearTimeout(timeoutId!);
            timeoutId = setTimeout(fetchLocationData, 500);
        };

        delayFetchLocationData();

        return () => {
            clearTimeout(timeoutId!);
        };
    }, [placeLocation]);

    return (
        <View>
            <View style={tw`flex rounded-full ml-4 mr-4 mb-4`}>
                <TextInput
                    style={tw`p-2 bg-gray-300 text-base rounded-md `}
                    placeholder="Where From?"
                    onChangeText={(text) => setPlaceLocation(text)}
                />
                <TouchableOpacity
                    onPress={() => {
                        myLocation();
                    }}
                    style={tw`bg-black absolute top-0 right-0 z-50 p-2 rounded`}
                >
                    <Icon name="my-location" color="white" size={27} />
                </TouchableOpacity>
            </View>
            <View style={tw`flex rounded-full m-4`}>
                <TextInput
                    style={tw`p-2 bg-gray-300 text-base rounded-md `}
                    placeholder="Where To?"
                    onChangeText={(text) => setPlaceLocation(text)}
                />
            </View>
        </View>
    );
};

export default DirectionTextInput;
