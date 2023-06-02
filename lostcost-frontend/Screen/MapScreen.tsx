import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, TouchableOpacity, Text } from "react-native";
import Map from "../components/Map";
import tw from "tailwind-react-native-classnames";
import InputTextField from "../components/InputTextField";
import RidesButtons from "../components/RidesButtons";
import Cost from "../components/Cost";
import DetailsPopup from "../components/DetailsPopup";
import DataView from "../components/DataView";

const MainScreen: React.FC = () => {
    const [color, setColor] = useState("");
    const [boardStatus, setBoardStatus] = useState(false);
    const [filteredData, setFilteredData] = useState<any[]>([]);

    useEffect(() => {
        filteredData.length > 0 ? setBoardStatus(true) : setBoardStatus(false);
    }, [filteredData]);

    const [fromLongitude, setFromLongitude] = useState<number>(0);
    const [fromLatitude, setFromLatitude] = useState<number>(0);
    const [toLongitude, setToLongitude] = useState<number>(0);
    const [toLatitude, setToLatitude] = useState<number>(0);

    return (
        <SafeAreaView style={tw`bg-white h-full w-full`}>
            <View style={boardStatus ? tw`h-0` : tw`h-1/2`}>
                <Map fromLongitude={fromLongitude} fromLatitude={fromLatitude} toLongitude={toLongitude} toLatitude={toLatitude} />
                {/* <DetailsPopup /> */}
            </View>
            <View style={boardStatus ? tw`h-1/2` : tw`h-0`}>
                <DataView setBoardStatus={setBoardStatus} filteredData={filteredData} setToLongitude={setToLongitude} setToLatitude={setToLatitude} />
            </View>
            <View style={tw`h-1/2`}>
                <RidesButtons color={color} setColor={setColor} />
                <Cost />
                <InputTextField setFilteredData={setFilteredData} setFromLongitude={setFromLongitude} setFromLatitude={setFromLatitude} />
            </View>
        </SafeAreaView>
    );
};

export default MainScreen;
