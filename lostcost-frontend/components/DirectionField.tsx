import { View, TouchableOpacity, TextInput, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

interface DirectionFieldProps {
    setFilteredData: React.Dispatch<React.SetStateAction<any[]>>;
    setPoints: React.Dispatch<React.SetStateAction<String>>;
    point: String;
    name: string;
}

const DirectionField = ({ setFilteredData, setPoints, point, name }: DirectionFieldProps) => {
    const [placeLocation, setPlaceLocation] = useState<String>("");
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        let timeoutId = null;
        if (placeLocation === "") return;
        const fetchLocationData = async () => {
            try {
                const response = await axios.get(`https://poor.bags.move.loca.lt/osm-points/search?name=${placeLocation}`);
                const filteredData = response.data.filter((item: any) => item.name.toLowerCase().startsWith(placeLocation.toLowerCase()));
                const filteredDataWithId = filteredData.map((item: any, index: number) => ({ ...item, id: index }));
                setFilteredData(filteredDataWithId.slice(0, 10)); // sets the first 10 results
                setData(filteredDataWithId.slice(0, 10));
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

    function limitString(str: string) {
        if (str.length <= 30) {
            return str; // Return the original string if it's within the limit
        }
        return str.substring(0, 30) + "..."; // Append "..." if it exceeds the limit
    }

    return (
        <View style={tw`flex rounded-full ml-4 mr-4 mb-4`}>
            <TextInput
                style={tw`p-2 bg-gray-300 text-base rounded-md `}
                placeholder={name !== "" ? limitString(name) : "Where?"}
                onChangeText={(text) => {
                    setPlaceLocation(text);
                    setPoints(point);
                }}
            />
        </View>
    );
};

export default DirectionField;
