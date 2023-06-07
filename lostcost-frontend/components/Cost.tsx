import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import React from "react";

const Cost: React.FC<any> = ({ data }) => {
    const [cost, setCost] = useState<number>(0);
    interface TimeFormat {
        hours: number;
        minutes: number;
    }

    const [time, setTime] = useState<TimeFormat>({ hours: 0, minutes: 0 });
    const [distance, setDistance] = useState<number>(0);

    // Time format converter
    function convertToTimeFormat(totalSeconds: any) {
        const totalHours = Math.floor(totalSeconds / 3600);
        let hours = (totalHours % 24) - 11; // Subtract 11 hours to adjust time
        if (hours < 0) {
            hours += 24; // Add 24 if hours is negative to ensure it's within 0 to 23
        }
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);

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
            const timeResult = convertToTimeFormat(data.time | 0);
            setTime(timeResult);
            const kilometerResult = convertToKilometers(data.distance);
            setDistance(parseFloat(kilometerResult));
            setCost(data.distance * 0.001);
        }, 1000);
    }, [data]);

    console.log(distance);

    return (
        <View>
            <View style={tw`flex flex-row justify-between py-5 px-5`}>
                <Text style={tw`text-base`}>
                    {data ? time.hours + " hr " + time.minutes + " min" : 0} ({data ? distance : 0} km)
                </Text>
                <Text style={tw`text-3xl`}>৳{data ? cost.toFixed(0) : 0}</Text>
            </View>
        </View>
    );
};

export default Cost;
