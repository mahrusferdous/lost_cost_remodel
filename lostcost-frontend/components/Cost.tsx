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
        }, 1000);
    }, [data]);

    useEffect(() => {
        if (!data) return;

        if (color == "rickshaw") {
            const travelDistanceValue = data.distance;
            const travelPriceFirst = Math.floor(travelDistanceValue / 1000) * 10;
            const rickshawCalculation =
                travelDistanceValue >= 6000
                    ? travelPriceFirst
                    : travelDistanceValue < 500
                    ? 10
                    : travelDistanceValue < 1500
                    ? 20
                    : travelDistanceValue < 2500
                    ? 30
                    : travelDistanceValue < 4000
                    ? 40
                    : 50;

            setCost(rickshawCalculation);
        }
        if (color == "auto") {
            const travelPriceAuto = Math.ceil(data.distance / 1800) * 5;
            setCost(travelPriceAuto);
        }
    }, [data, color]);

    return (
        <View>
            <View style={tw`flex flex-row justify-between py-5 px-5`}>
                <Text style={tw`text-base`}>
                    {data ? (time.hours === 0 ? "" : time.hours + " hr ") + time.minutes + " min" : 0} ({data ? distance : 0} km)
                </Text>
                <Text style={tw`text-3xl`}>৳{cost ? cost.toFixed(0) : 0}</Text>
            </View>
        </View>
    );
};

export default Cost;
