import React, { useState, useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import Map from "../components/Map";
import tw from "tailwind-react-native-classnames";
import InputTextField from "../components/InputTextField";
import RidesButtons from "../components/RidesButtons";
import Cost from "../components/Cost";
import DetailsPopup from "../components/DetailsPopup";
import DataView from "../components/DataView";
import axios from "axios";

const MainScreen: React.FC = () => {
    const [fromLongitude, setFromLongitude] = useState<number>(0);
    const [fromLatitude, setFromLatitude] = useState<number>(0);
    const [toLongitude, setToLongitude] = useState<number>(0);
    const [toLatitude, setToLatitude] = useState<number>(0);

    const [color, setColor] = useState("");
    const [boardStatus, setBoardStatus] = useState(false);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [data, setData] = useState<any>(undefined);
    const [polyline, setPolyline] = useState<string>();
    const [points, setPoints] = useState<String>("");
    const [nameA, setNameA] = useState<string>("");
    const [nameB, setNameB] = useState<string>("");

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const url1 = "http://192.168.1.207:8080/route/calculate";
                const url2 = "http://192.168.1.207:8080/route/polyline";
                const data = {
                    fromLat: fromLatitude,
                    fromLon: fromLongitude,
                    toLat: toLatitude,
                    toLon: toLongitude,
                };

                const response = await axios.post(url1, data);
                const response2 = await axios.post(url2, data);
                setData(response.data.all[0]);
                setPolyline(response2.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLocationData();
    }, [fromLatitude, fromLongitude, toLatitude, toLongitude]);

    useEffect(() => {
        filteredData.length > 0 ? setBoardStatus(true) : setBoardStatus(false);
    }, [filteredData]);

    return (
        <SafeAreaView style={tw`bg-white h-full w-full`}>
            <View style={boardStatus ? tw`h-0` : tw`h-1/2`}>
                <Map
                    fromLongitude={fromLongitude}
                    fromLatitude={fromLatitude}
                    toLongitude={toLongitude}
                    toLatitude={toLatitude}
                    polyline={polyline || ""}
                />
                <DetailsPopup />
            </View>
            <View style={boardStatus ? tw`h-1/2` : tw`h-0`}>
                <DataView
                    setBoardStatus={setBoardStatus}
                    filteredData={filteredData}
                    setToLongitude={setToLongitude}
                    setToLatitude={setToLatitude}
                    setFromLongitude={setFromLongitude}
                    setFromLatitude={setFromLatitude}
                    points={points}
                    setNameA={setNameA}
                    setNameB={setNameB}
                />
            </View>
            <View style={tw`h-1/2`}>
                <RidesButtons color={color} setColor={setColor} />
                <Cost data={data} color={color} />
                <InputTextField
                    setFilteredData={setFilteredData}
                    setPoints={setPoints}
                    setFromLongitude={setFromLongitude}
                    setFromLatitude={setFromLatitude}
                    nameA={nameA}
                    nameB={nameB}
                />
            </View>
        </SafeAreaView>
    );
};

export default MainScreen;
