import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Group from "../assets/images/Group.png";
import ToyFaces_Tansparent_BG_29 from "../assets/images/ToyFaces_Tansparent_BG_29.png";
import ToyFaces_Tansparent_BG_49 from "../assets/images/ToyFaces_Tansparent_BG_49.png";
import { useNavigation } from '@react-navigation/native';

const ModalScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image source={Group} style={styles.backgroundImage} />

            <Text style={styles.title}>Food for</Text>
            <Text style={styles.title}>Everyone</Text>
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image source={ToyFaces_Tansparent_BG_49} style={styles.avatarLarge} />
                    <Image source={ToyFaces_Tansparent_BG_29} style={styles.avatarSmall} />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
                    <Text style={styles.buttonText}>Get started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FA4A0C",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
    },
    backgroundImage: {
        position: "absolute",
        top: 60,
        left: 20,
        width: 50,
        height: 50,
        resizeMode: "contain",
        borderRadius: 30,
        backgroundColor: "white"
    },
    content: {
        alignItems: "center",
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#fff",
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    imageContainer: {
        flexDirection: "row",
        marginVertical: 20,
        width: "100%",
        justifyContent: "center",
        overflow: "visible",
    },
    avatarLarge: {
        width: "60%",
        height: 350,

        opacity: 0.9,
    },
    avatarSmall: {
        width: "40%",
        height: 180,
        resizeMode: "cover",
    },
    button: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FA4A0C",
        width: 150,
        textAlign: "center",
    },
});

export default ModalScreen;
