import React from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import tw from "tailwind-react-native-classnames";

const DataView = ({
    setBoardStatus,
    filteredData,
    setToLongitude,
    setToLatitude,
    setFromLongitude,
    setFromLatitude,
    points,
    setNameA,
    setNameB,
}: {
    setBoardStatus: any;
    filteredData: any[];
    setToLongitude: React.Dispatch<React.SetStateAction<number>>;
    setToLatitude: React.Dispatch<React.SetStateAction<number>>;
    setFromLongitude: React.Dispatch<React.SetStateAction<number>>;
    setFromLatitude: React.Dispatch<React.SetStateAction<number>>;
    points: String;
    setNameA: React.Dispatch<React.SetStateAction<string>>;
    setNameB: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return (
        <View>
            <ScrollView style={tw`bg-white`}>
                <View style={tw`p-4`}>
                    {points === "from"
                        ? filteredData.map((item: any) => (
                              <TouchableOpacity
                                  key={item.id}
                                  style={tw`mb-2 p-3 bg-gray-200 rounded`}
                                  onPress={() => {
                                      setBoardStatus(false);
                                      setFromLatitude(item.latitude / 10000000);
                                      setFromLongitude(item.longitude / 10000000);
                                      setNameA(item.name);
                                  }}
                              >
                                  <Text>{item.name}</Text>
                              </TouchableOpacity>
                          ))
                        : filteredData.map((item: any) => (
                              <TouchableOpacity
                                  key={item.id}
                                  style={tw`mb-2 p-3 bg-gray-200 rounded`}
                                  onPress={() => {
                                      setBoardStatus(false);
                                      setToLatitude(item.latitude / 10000000);
                                      setToLongitude(item.longitude / 10000000);
                                      setNameB(item.name);
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
