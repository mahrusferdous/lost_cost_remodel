import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import React from "react";

const Cost: React.FC = () => {
    const [travelPrice, setTravelPrice] = useState(0);
    const [travelTime, setTravelTime] = useState(0);
    const [travelDistance, setTravelDistance] = useState(0);

    return (
        <View>
            <View style={tw`flex flex-row justify-between py-5 px-5`}>
                <Text style={tw`text-base`}>
                    {!travelTime ? 0 : travelTime} ({!travelDistance ? 0 : travelDistance} km)
                </Text>
                <Text style={tw`text-3xl`}>৳{!travelPrice ? 0 : travelPrice}</Text>
            </View>
        </View>
    );
};

export default Cost;
