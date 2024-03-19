import commonStyles from "../commonStyles";
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {useTournamentData} from "./TournamentDataContext";

const Addplayers = ( {resetIndex}) => {

    const tourContext = useTournamentData();
    const { tournamentData, setTournamentData} = tourContext;

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
        return Array.from({ length: parseInt(tournamentData.players) }, (_, index) => ({
            name: `player${index + 1}`
        }));
    });
    useEffect(() => {
        setTournamentData({...tournamentData, playerNames});
    }, [playerNames/*, setTournamentData*/]); // This effect runs when playerNames changes

    const handleNext = (shuffledPlayerNames) => {
        const updatedTourData = {
            ...tournamentData,
            settingsClickable: true,
            gameOn: true,
            playerNames: shuffledPlayerNames
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
        <View style={commonStyles.container}>
            {playerNames.map((playerName, index) => (
                <View key={index} style={commonStyles.rowContainer}>
                    <TextInput
                        placeholderTextColor="black"
                        style={commonStyles.textField}
                        value={playerName.name}
                        onChangeText={(text) => handlePlayerNameChange(index, text)}
                        onFocus={() => handleFocus(index)}
                    />
                </View>
            ))}

            <View style={commonStyles.rowContainer}>
                <TouchableOpacity style={commonStyles.button} onPress={handleSmash}>
                    <Text style={commonStyles.label}>Smash</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Addplayers;
