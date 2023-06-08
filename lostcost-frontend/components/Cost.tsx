import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import React from "react";

const Cost: React.FC<any> = ({ data, color }) => {
    const [cost, setCost] = useState<number>(0);
    interface TimeFormat {
        hours: number;
        minutes: number;
    }

    const [time, setTime] = useState<TimeFormat>({ hours: 0, minutes: 0 });
    const [distance, setDistance] = useState<number>(0);

    // Time format converter
    function scaleTime(seconds: number) {
        const scaleFactor = 10 / 5226.32;

        const scaledMinutes = (seconds / 60) * scaleFactor;

        const hours = Math.floor(scaledMinutes / 60);
        const minutes = Math.round(scaledMinutes % 60);

        return { hours, minutes };
    }

    //Distance format converter
    function convertToKilometers(meters: number) {
        const kilometers = meters / 1000;
        return kilometers.toFixed(2);
    }

    useEffect(() => {
        if (!data) return;
        setTimeout(() => {
            const timeResult = scaleTime(data.time | 0);
            setTime(timeResult);
            const kilometerResult = convertToKilometers(data.distance);
            setDistance(parseFloat(kilometerResult));
            setCost(data.distance * 0.001);
        }, 1000);
    }, [data]);

    useEffect(() => {
        if (color == "rickshaw") {
            setCost(data.distance * 0.002);
        }

        if (color == "auto") {
            setCost(data.distance * 0.001);
        }
    }, [data, color]);

    return (
        <View>
            <View style={tw`flex flex-row justify-between py-5 px-5`}>
                <Text style={tw`text-base`}>
                    {data ? (time.hours === 0 ? "" : time.hours + " hr ") + time.minutes + " min" : 0} ({data ? distance : 0} km)
                </Text>
                <Text style={tw`text-3xl`}>৳{data ? cost.toFixed(0) : 0}</Text>
            </View>
        </View>
    );
};

export default Cost;
