import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import React from "react";

interface CostProps extends React.HTMLAttributes<HTMLDivElement> {
    data: {
        length: number;
        time: number;
        distance: number;
    };
}

const Cost: React.FC<CostProps> = ({ data }) => {
    console.log(data);
    const [cost, setCost] = useState<number>(0);

    useEffect(() => {
        setCost(data.distance * 10);
    }, [data]);

    return (
        <View>
            <View style={tw`flex flex-row justify-between py-5 px-5`}>
                <Text style={tw`text-base`}>
                    {data.length > 0 ? data.time : 0} ({data.length > 0 ? data.distance : 0} km)
                </Text>
                <Text style={tw`text-3xl`}>৳{data.length > 0 ? cost : 0}</Text>
            </View>
        </View>
    );
};

export default Cost;
