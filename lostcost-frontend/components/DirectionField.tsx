import { View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import axios from "axios";

interface DirectionFieldProps {
    setFilteredData: React.Dispatch<React.SetStateAction<any[]>>;
    setPoints: React.Dispatch<React.SetStateAction<String>>;
    point: String;
    name: string;
}

const DirectionField = ({ setFilteredData, setPoints, point, name }: DirectionFieldProps) => {
    const [placeLocation, setPlaceLocation] = useState<String>("");

    useEffect(() => {
        let timeoutId = null;
        if (placeLocation === "") return;
        // const fetchLocationData = async () => {
        //     try {
        //         const response = await axios.get(`https://tangy-results-tell.loca.lt/osm-points/search?name=${placeLocation}`);
        //         const filteredData = response.data.filter((item: any) => item.name.toLowerCase().startsWith(placeLocation.toLowerCase()));
        //         const filteredDataWithId = filteredData.map((item: any, index: number) => ({ ...item, id: index }));
        //         setFilteredData(filteredDataWithId.slice(0, 10));
        //     } catch (error: any) {
        //         console.log(error);
        //     }
        // };

        const fetchLocationData = async () => {
            try {
                const response = await axios.get(`https://c8a2-96-246-230-48.ngrok-free.app/osm-points/search?name=${placeLocation}`);
                const filteredData = response.data.filter((item: { name: string }) => item.name.toLowerCase());
                const shuffledData = shuffleArray(filteredData);
                const randomSelection = shuffledData.slice(0, 10);
                const filteredDataWithId = randomSelection.map((item: any, index: any) => ({ ...item, id: index }));
                setFilteredData(filteredDataWithId);
            } catch (error) {
                console.log(error);
            }
        };

        // Fisher-Yates shuffle algorithm
        function shuffleArray(array: any[]) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        const delayFetchLocationData = () => {
            clearTimeout(timeoutId!);
            timeoutId = setTimeout(fetchLocationData, 1000);
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
