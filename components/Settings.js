import commonStyles from "../commonStyles";
import {View, Text, ImageBackground, TouchableOpacity, Image, Animated, StyleSheet, Dimensions} from "react-native";
import bg from "../assets/img.png";
import {Audio} from 'expo-av';
import React, {useEffect, useRef, useState} from "react";
import podium from "../assets/podium.png";

const Settings = () => {

    const [musicPlaying, setMusicPlaying] = useState(false);
    const [soundObject, setSoundObject] = useState(null);
    const [isLandscape, setIsLandscape] = useState(false);
    const scaleAnim = useRef(new Animated.Value(0)).current; // Initial value for scale: 0

    const fadeAnim1st = useRef(new Animated.Value(0)).current;
    const fadeAnim2nd = useRef(new Animated.Value(0)).current;
    const fadeAnim3rd = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const {width, height} = Dimensions.get('window');
        setIsLandscape(width > height);
    }, []);

    useEffect(() => {
        // Stagger the start of animations by setting different delays
        Animated.sequence([
            Animated.timing(fadeAnim3rd, { toValue: 1, duration: 3000, delay: 1500, useNativeDriver: true }),
            Animated.timing(fadeAnim2nd, { toValue: 1, duration: 3000, delay: 1500, useNativeDriver: true }),
            Animated.timing(fadeAnim1st, { toValue: 1, duration: 3000, delay: 1500, useNativeDriver: true })

        ]).start();
    }, []);

    const toggleMusic = async () => {
        if (musicPlaying) {
            // Stop the music
            await soundObject.stopAsync();
            await soundObject.unloadAsync();
            setSoundObject(null);
        } else {
            // Start playing the music
            const newSoundObject = new Audio.Sound();
            try {
                await newSoundObject.loadAsync(require('../assets/sounds/new_life_moire.mp3'));
                await newSoundObject.playAsync();
                setSoundObject(newSoundObject);
            } catch (error) {
                console.error('Failed to play sound', error);
            }
        }
        // Toggle the music state
        setMusicPlaying(!musicPlaying);
    };

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={commonStyles.backgroundImage}
        >
            <View style={[commonStyles.container, isLandscape && {flexDirection: 'row'}]}>
                <View style={[{flexDirection: 'row'}, isLandscape && {flexDirection: 'column'}]}>
                <Animated.View style={[styles.animatedView, {marginRight: 40, opacity: fadeAnim3rd}, isLandscape && {marginRight: 0}]}>
                        <Text style={[styles.colors, {backgroundColor: '#CD7F32'}]}>3st place</Text>
                    </Animated.View>
                    <Animated.View style={[styles.animatedView, {opacity: fadeAnim1st}]}>
                        <Text style={[styles.colors, {backgroundColor: '#FFD700'}]}>1rd place</Text>
                    </Animated.View>
                    <Animated.View style={[styles.animatedView, {marginLeft: 40, opacity: fadeAnim2nd}, isLandscape && {marginLeft: 0}]}>
                        <Text style={[styles.colors, {backgroundColor: '#C0C0C0'}]}>2nd place</Text>
                    </Animated.View>
                </View>

                <View style={commonStyles.indexImage}>
                    <Image style={{width: 300, height: 300, resizeMode: 'contain'}}
                           source={podium}></Image>
                </View>
                {/*<TouchableOpacity style={commonStyles.button} onPress={toggleMusic}>*/}
                {/*    <Text style={commonStyles.label}> {musicPlaying ? "Music off" : "Music on"}</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    animatedView: {

    },
    colors: {
        fontFamily: 'JosefinSans',
        fontWeight: 'bold',
        fontSize: 18,
        color: "white",
    },
});

export default Settings;


