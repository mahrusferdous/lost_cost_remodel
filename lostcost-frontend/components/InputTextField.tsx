import { View, TouchableOpacity, TextInput, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import DirectionField from "./DirectionField";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

interface DirectionTextInputProps {
    setFilteredData: React.Dispatch<React.SetStateAction<any[]>>;
    setPoints: React.Dispatch<React.SetStateAction<String>>;
    setFromLongitude: React.Dispatch<React.SetStateAction<number>>;
    setFromLatitude: React.Dispatch<React.SetStateAction<number>>;
}

const InputTextField: React.FC<DirectionTextInputProps> = ({ setFilteredData, setPoints, setFromLongitude, setFromLatitude }) => {
    const myLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        // console.log(location);
        // setFromLatitude(location.coords.latitude);
        // setFromLongitude(location.coords.longitude);
        setFromLatitude(23.9324);
        setFromLongitude(90.7147);
        setTimeout(() => location, 100);
    };

    return (
        <View>
            <View style={tw`flex rounded-full mb-4`}>
                <DirectionField setFilteredData={setFilteredData} setPoints={setPoints} point={"from"} />
                <TouchableOpacity
                    onPress={() => {
                        myLocation();
                    }}
                    style={tw`bg-black absolute top-0 right-0 z-50 mr-4 p-2 rounded`}
                >
                    <Icon name="my-location" color="white" size={27} />
                </TouchableOpacity>
            </View>
            <DirectionField setFilteredData={setFilteredData} setPoints={setPoints} point={"to"} />
        </View>
    );
};

export default InputTextField;
