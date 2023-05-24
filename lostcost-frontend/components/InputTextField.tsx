import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import * as Location from "expo-location";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/MaterialIcons";
// import "intl";
// import "intl/locale-data/jsonp/en";

const DirectionTextInput: React.FC = () => {
    const [location, setLocation] = useState<Location.LocationObject | undefined>();

    const myLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setTimeout(() => setLocation(location), 100);
    };

    return (
        <View>
            <View style={tw`flex rounded-full ml-4 mr-4 mb-4`}>
                <TextInput style={tw`p-2 bg-gray-300 text-base rounded-md `} placeholder="Where From?" />
                <TouchableOpacity
                    onPress={() => {
                        myLocation();
                    }}
                    style={tw`bg-black absolute top-0 right-0 z-50 p-2 rounded`}
                >
                    <Icon name="my-location" color="white" size={27} />
                </TouchableOpacity>
            </View>
            <View style={tw`flex rounded-full m-4`}>
                <TextInput style={tw`p-2 bg-gray-300 text-base rounded-md `} placeholder="Where To?" />
            </View>
        </View>
    );
};

export default DirectionTextInput;
