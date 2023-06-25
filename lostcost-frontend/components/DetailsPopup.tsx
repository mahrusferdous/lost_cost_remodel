import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View, TouchableOpacity, Linking, Image } from "react-native";
import { Icon } from "@rneui/base";
import tw from "tailwind-react-native-classnames";

const DetailsPopup: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return modalVisible ? (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalRedText}>Disclaimer!</Text>
                        <Text style={styles.modalCenterText}>
                            This app gives estimate price for vehicles listed. This is NOT an exact cost. This is to help you get an idea.
                        </Text>
                        {/* <Text style={styles.modalText}>Feel Free to Donate</Text>
                        <Image source={require("../assets/qr.png")} style={tw`w-52 h-52 mx-auto`} /> */}
                        <Text style={styles.modalText}>More Information</Text>
                        <Text style={styles.modalCenterTextBlue} onPress={() => Linking.openURL("https://lostcost-site.web.app/")}>
                            https://lostcost-site.web.app/
                        </Text>
                        <TouchableOpacity style={tw`mt-3`} onPress={() => setModalVisible(!modalVisible)}>
                            <Icon name="close" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    ) : (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={tw`bg-gray-100 absolute top-16 right-8 z-50 p-3 rounded-full shadow-lg`}>
            <Icon name="info-outline" />
        </TouchableOpacity>
    );
};

export default DetailsPopup;

const styles = StyleSheet.create({
    centeredView: {
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontWeight: "bold",
        marginBottom: 15,
        marginTop: 15,
        textAlign: "center",
    },
    modalRedText: {
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        color: "red",
    },
    modalCenterText: {
        textAlign: "center",
    },
    modalCenterTextBlue: {
        textAlign: "center",
        color: "blue",
    },
});
