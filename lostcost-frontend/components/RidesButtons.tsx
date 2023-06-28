import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "@rneui/base";

interface RidesButtonsProps {
    color: string;
    setColor: (color: string) => void;
}

const RidesButtons: React.FC<RidesButtonsProps> = ({ color, setColor }) => {
    console.log(color);
    return (
        <View style={tw`flex-row bg-transparent justify-evenly pt-6`}>
            <TouchableOpacity disabled={true} style={tw`bg-gray-300 w-20 py-2 rounded-lg`}>
                <View style={styles.crossLine1}></View>
                <Icon name="bus" type="font-awesome" color="white" size={16} />
                <Text style={tw`text-white text-center`}>Bus</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    setColor("rickshaw");
                }}
                style={tw`${color == "rickshaw" ? "bg-black" : "bg-gray-300"} w-20 py-2 rounded-lg`}
            >
                <Image source={require("../assets/rickshaw.png")} style={tw`w-5 h-4 mx-auto`} />
                <Text style={tw`text-white text-center`}>Rickshaw</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    setColor("auto");
                }}
                style={tw`${color == "auto" ? "bg-black" : "bg-gray-300"} w-20 py-2 rounded-lg`}
            >
                <Image source={require("../assets/auto.png")} style={tw`w-4 h-4 mx-auto`} />
                <Text style={tw`text-white text-center`}>Auto</Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={true} style={tw`bg-gray-300 w-20 py-2 rounded-lg`}>
                <View style={styles.crossLine1}></View>
                <Image source={require("../assets/CNG.png")} style={tw`w-4 h-4 mx-auto`} />
                <Text style={tw`text-white text-center`}>CNG</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RidesButtons;

const styles = StyleSheet.create({
    crossLine1: {
        height: 2,
        width: 91,
        backgroundColor: "white",
        marginVertical: 25,
        marginHorizontal: -6,
        transform: [{ rotate: "30deg" }],
        position: "absolute", //add this
    },
});
