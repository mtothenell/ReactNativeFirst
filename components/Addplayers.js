import commonStyles from "../commonStyles";
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {useTournamentData} from "./TournamentDataContext";

const Addplayers = ({resetIndex, isLandscape}) => {

    const tourContext = useTournamentData();
    const {tournamentData, setTournamentData} = tourContext;

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
            name: `badguys${index + 1}`,
            score: 0
        }));
    });
    useEffect(() => {
        setTournamentData({...tournamentData, playerNames});
    }, [playerNames/*, setTournamentData*/]);

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
        const shuffledPlayerNames = shuffleArray([...playerNames]);
        setPlayerNames(shuffledPlayerNames);
        handleNext(shuffledPlayerNames)
        resetIndex();
    };

    return (
        <View
            style={[commonStyles.container, isLandscape && tournamentData.playerNames.length >= 16 && commonStyles.containerLand]}>
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
