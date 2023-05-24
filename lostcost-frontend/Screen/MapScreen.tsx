import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import Map from "../components/Map";
import tw from "tailwind-react-native-classnames";
import InputTextField from "../components/InputTextField";
import RidesButtons from "../components/RidesButtons";
import Cost from "../components/Cost";
import DetailsPopup from "../components/DetailsPopup";

const MainScreen: React.FC = () => {
    const [color, setColor] = useState("");
    const [boardStatus, setBoardStatus] = useState(false);

    return (
        <SafeAreaView style={tw`bg-white h-full w-full`}>
            <View style={boardStatus ? tw`h-0` : tw`h-1/2`}>
                <DetailsPopup />
                <Map />
            </View>
            <View style={tw`h-1/2`}>
                <RidesButtons color={color} setColor={setColor} />
                <Cost />
                <InputTextField />
            </View>
        </SafeAreaView>
    );
};

export default MainScreen;
