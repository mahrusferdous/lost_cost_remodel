import { View, TouchableOpacity } from "react-native";
import React from "react";
import * as Location from "expo-location";
import DirectionField from "./DirectionField";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/MaterialIcons";

interface DirectionTextInputProps {
    setFilteredData: React.Dispatch<React.SetStateAction<any[]>>;
    setPoints: React.Dispatch<React.SetStateAction<String>>;
    setFromLongitude: React.Dispatch<React.SetStateAction<number>>;
    setFromLatitude: React.Dispatch<React.SetStateAction<number>>;
    nameA: string;
    nameB: string;
}

const InputTextField = ({
    setFilteredData,
    setPoints,
    setFromLongitude,
    setFromLatitude,
    nameA,
    nameB,
}: DirectionTextInputProps) => {
    const myLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setFromLatitude(location.coords.latitude);
        setFromLongitude(location.coords.longitude);
        setTimeout(() => location, 100);
    };

    return (
        <View>
            <View style={tw`flex rounded-full mb-4`}>
                <DirectionField setFilteredData={setFilteredData} setPoints={setPoints} point={"from"} name={nameA} />
                <TouchableOpacity
                    onPress={() => {
                        myLocation();
                    }}
                    style={tw`bg-black absolute top-0 right-0 z-50 mr-4 p-2 rounded`}
                >
                    <Icon name="my-location" color="white" size={27} />
                </TouchableOpacity>
            </View>
            <DirectionField setFilteredData={setFilteredData} setPoints={setPoints} point={"to"} name={nameB} />
        </View>
    );
};

export default InputTextField;
