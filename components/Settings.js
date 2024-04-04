import commonStyles from "../commonStyles";
import {View, Text, ImageBackground, TouchableOpacity, Image, Animated, StyleSheet, Dimensions} from "react-native";
import bg from "../assets/img.png";
import React, {useEffect, useRef, useState} from "react";
import podium from "../assets/podium.png";

const Settings = () => {


    return (
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={commonStyles.backgroundImage}
        >
            {/*<View style={commonStyles.container}>*/}
            {/*    <TouchableOpacity style={commonStyles.button} onPress={toggleMusic}>*/}
            {/*        <Text style={commonStyles.label}> {musicPlaying ? "Music off" : "Music on"}</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    animatedView: {},
    colors: {
        fontFamily: 'JosefinSans',
        fontWeight: 'bold',
        fontSize: 18,
        color: "white",
    },
});

export default Settings;


