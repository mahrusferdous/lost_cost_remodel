import React, { useState } from "react";

import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import tw from "tailwind-react-native-classnames";

const DataView = ({ setBoardStatus, filteredData }: { setBoardStatus: any; filteredData: any[] }) => {
    return (
        <View>
            <ScrollView style={tw`bg-white`}>
                <View style={tw`p-4`}>
                    {filteredData.map((item: any) => (
                        <TouchableOpacity
                            key={item.id}
                            style={tw`mb-2 p-3 bg-gray-200 rounded`}
                            onPress={() => {
                                setBoardStatus(false);
                            }}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default DataView;
