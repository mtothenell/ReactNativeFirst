import React, {useEffect, useState} from "react";
import {Dimensions, ImageBackground, View, StyleSheet, Text, Image, TouchableOpacity} from "react-native";
import commonStyles from "../commonStyles";
import bg from "../assets/img.png";
import podium from "../assets/podium2.png";
import {useTournamentData} from "./TournamentDataContext";


const Medalist = () => {

    const tourContext = useTournamentData();
    const {tournamentData} = tourContext;
    const [isLandscape, setIsLandscape] = useState(false);
    const [isBronze, setIsBronze] = useState(false);
    const [isSilver, setIsSilver] = useState(false);
    const [isGold, setIsGold] = useState(false);

    useEffect(() => {
        const {width, height} = Dimensions.get('window');
        setIsLandscape(width > height);

        return () => {
            setIsBronze(false);
            setIsSilver(false);
            setIsGold(false);
        };
    }, [tournamentData.roundData]);

    const setBronze = () => {
        setIsBronze(!isBronze);
    }
    const setSilver = () => {
        setIsSilver(!isSilver);
    }
    const setGold = () => {
        setIsGold(!isGold);
    }


    return (
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={commonStyles.backgroundImage}
        >
            {tournamentData.gameOn &&
                <>
                    <View style={[commonStyles.container, isLandscape && {flexDirection: 'row'}]}>
                        <View style={[{flexDirection: 'row'}, isLandscape && {flexDirection: 'column'}]}>
                            {isLandscape && <>
                                <TouchableOpacity onPress={setGold}>
                                    <Text style={[styles.colors, {
                                        backgroundColor: '#FFD700',
                                        margin: 10,
                                        width: 300,
                                    }]}>
                                        {!isGold ? "1:st place" : "1:st place, with " + tournamentData.playerNames[0].score + " points: " + tournamentData.playerNames[0].name.toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={setSilver}>
                                    <Text style={[styles.colors, {
                                        backgroundColor: '#C0C0C0',
                                        margin: 10,
                                        width: 300,
                                    }]}>
                                        {!isSilver ? "2:nd place" : "2:nd place, with " + tournamentData.playerNames[1].score + " points: " + tournamentData.playerNames[1].name.toUpperCase()}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={setBronze}>
                                    <Text style={[styles.colors, {
                                        backgroundColor: '#CD7F32',
                                        margin: 10,
                                        width: 300,
                                    }]}>
                                        {!isBronze ? "3:rd place" : "3:rd place, with " + tournamentData.playerNames[2].score + " points: " + tournamentData.playerNames[2].name.toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            </>
                            }
                            {!isLandscape && <>
                                <TouchableOpacity onPress={setBronze}>
                                    <Text style={[styles.colors, {
                                        backgroundColor: '#CD7F32',
                                        marginLeft: 30,
                                        width: 100,
                                    }]}>
                                        {!isBronze ? "3:rd place" : "3:rd place: " +tournamentData.playerNames[2].name.toUpperCase()}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={setGold}>
                                    <Text style={[styles.colors, {
                                        backgroundColor: '#FFD700',
                                        width: 100,
                                        marginLeft: 10,
                                        marginRight: 10,
                                    }]}>
                                        {!isGold ? "1:st place" : "1:st place: " +tournamentData.playerNames[0].name.toUpperCase()}
                                    </Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={setSilver}>
                                    <Text style={[styles.colors, {
                                        backgroundColor: '#C0C0C0',
                                        marginRight: 30,
                                        width: 100,
                                    }]}>
                                        {!isSilver ? "2:nd place" : "2:nd place: " +tournamentData.playerNames[1].name.toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            </>
                            }
                        </View>
                        <View style={commonStyles.indexImage}>
                            <Image style={{width: 300, height: 300, resizeMode: 'contain'}}
                                   source={podium}></Image>
                        </View>
                    </View>
                </>}
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

export default Medalist;


