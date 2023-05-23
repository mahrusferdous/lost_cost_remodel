import React from "react";
import { View, SafeAreaView } from "react-native";
import Map from "../components/Map";
import tw from "tailwind-react-native-classnames";
// import GoogleAds from "../components/GoogleAds";

const MainScreen: React.FC = () => {
    return (
        <SafeAreaView style={tw`bg-white h-full w-full`}>
            <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2`}>
                <Map />
                {/* <GoogleAds /> */}
            </View>
        </SafeAreaView>
    );
};

export default MainScreen;
