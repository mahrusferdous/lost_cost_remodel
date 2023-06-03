import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import React from "react";

interface CostProps extends React.HTMLAttributes<HTMLDivElement> {
    data: any;
}

const Cost: React.FC<CostProps> = ({ data }) => {
    return (
        <View>
            <View style={tw`flex flex-row justify-between py-5 px-5`}>
                <Text style={tw`text-base`}>
                    {data.time} ({data.distance} km)
                </Text>
                <Text style={tw`text-3xl`}>৳{data.distance * 0.05}</Text>
            </View>
        </View>
    );
};

export default Cost;
