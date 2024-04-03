import commonStyles from "../commonStyles";
import {View, Text, TextInput, TouchableOpacity, Dimensions} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {useTournamentData} from "./TournamentDataContext";
import { Audio } from 'expo-av';

const Addplayers = ({resetIndex, isLandscape}) => {

    const tourContext = useTournamentData();
    const {tournamentData, setTournamentData} = tourContext;
    const [width, setWidth] = useState(0);

    const playSound = async () => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(require('../assets/sounds/let_the_games_begin.mp3'));
            await soundObject.playAsync();
        } catch (error) {
            console.error('Failed to play sound', error);
        }
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const navigation = useNavigation();
    const [playerNames, setPlayerNames] = useState(() => {
        // Generate automatic player names like player1, player2, ...
        return Array.from({length: parseInt(tournamentData.players)}, (_, index) => ({
            name: `player${index + 1}`,
            score: 0
        }));
    });

    useEffect(() => {
        setTournamentData({...tournamentData, playerNames});
    }, [playerNames/*, setTournamentData*/]);

    useEffect(() => {
        const {width: screenWidth} = Dimensions.get('window');
        setWidth(screenWidth);
    }, []);


    const handleNext = (shuffledPlayerNames) => {
        const updatedTourData = {
            ...tournamentData,
            settingsClickable: true,
            gameOn: true,
            playerNames: shuffledPlayerNames,
        };
        setTournamentData(updatedTourData);

        if (tournamentData.type === "TGIF") {
            navigation.reset({
                index: 0,
                routes: [{name: 'Topboard'}]
            });
        } else {
            navigation.reset({
                index: 0,
                routes: [{name: 'Tournament'}]
            });
        }
    }

    const handlePlayerNameChange = (index, playerName) => {
        const updatedPlayerNames = [...playerNames];
        updatedPlayerNames[index] = {...updatedPlayerNames[index], name: playerName}
        setPlayerNames(updatedPlayerNames);
    };

    const handleFocus = (index) => {
        const updatedPlayerNames = [...playerNames];
        updatedPlayerNames[index] = {...updatedPlayerNames[index], name: ''}
        setPlayerNames(updatedPlayerNames);
    };

    const handleSmash = () => {
        playSound().then(r => {})
        const shuffledPlayerNames = shuffleArray([...playerNames]);
        setPlayerNames(shuffledPlayerNames);
        handleNext(shuffledPlayerNames)
        resetIndex();
    };

    return (
        <View
            style={[commonStyles.container, isLandscape && tournamentData.playerNames.length >= 16 && commonStyles.containerLand,
                isLandscape && tournamentData.playerNames.length >= 16 && commonStyles.containerLandBigScreen]}>
            {!isLandscape ? (
                <View>
                    {playerNames.map((playerName, index) => (
                        <View key={index} style={[commonStyles.rowContainer, {}]}>
                            <TextInput
                                placeholderTextColor="black"
                                style={commonStyles.textField}
                                value={playerName.name}
                                onChangeText={(text) => handlePlayerNameChange(index, text)}
                                onFocus={() => handleFocus(index)}
                            />
                        </View>
                    ))}
                </View>
            ) : (
                <View style={commonStyles.rowContainer}>
                    <View>
                        {playerNames.slice(0, playerNames.length / 2).map((playerName, index) => (
                            <View key={index} style={commonStyles.rowContainer}>
                                <TextInput
                                    placeholderTextColor="black"
                                    style={[commonStyles.textField, {height: 23}]}
                                    value={playerName.name}
                                    onChangeText={(text) => handlePlayerNameChange(index, text)}
                                    onFocus={() => handleFocus(index)}
                                />
                            </View>
                        ))}
                    </View>
                    <View>
                        {playerNames.slice(playerNames.length / 2, playerNames.length).map((playerName, index) => (
                            <View key={index} style={commonStyles.rowContainer}>
                                <TextInput
                                    placeholderTextColor="black"
                                    style={[commonStyles.textField, {height: 23}]}
                                    value={playerName.name}
                                    onChangeText={(text) => handlePlayerNameChange(index, text)}
                                    onFocus={() => handleFocus(index)}
                                />
                            </View>
                        ))}
                    </View>
                    <View style={commonStyles.rowContainer}>
                        <TouchableOpacity style={commonStyles.button} onPress={handleSmash}>
                            <Text style={commonStyles.label}>Smash</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
            }
            {!isLandscape && <View style={commonStyles.rowContainer}>
                <TouchableOpacity style={commonStyles.button} onPress={handleSmash}>
                    <Text style={commonStyles.label}>Smash</Text>
                </TouchableOpacity>
            </View>}
        </View>
    );
};

export default Addplayers;
