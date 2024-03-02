import commonStyles from "../commonStyles";
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";

const Addplayers = ({tournamentData}) => {

    const {name, type, players, points} = tournamentData;
    const navigation = useNavigation();
    const [playerNames, setPlayerNames] = useState(Array.from({ length: parseInt(players) }, () => ({ name: 'player', score: 0 })));

    useEffect(() => {
        console.log("Updated playerNames:", playerNames);
    }, [playerNames]); // This effect runs when playerNames changes

    const handleNext = () => {
        console.log(playerNames[0])
        navigation.navigate('Topboard', { playerInputs: playerNames });

    }

    const handlePlayerNameChange = (index, playerName) => {
        const updatedPlayerNames = [...playerNames];
        updatedPlayerNames[index] = playerName;
        setPlayerNames(updatedPlayerNames);
    };

    return (
        <View style={commonStyles.container}>
            {playerNames.map((playerName, index) => (
                <View key={index} style={commonStyles.rowContainer}>
                    <TextInput
                        placeholder={`Player ${index + 1}..`}
                        placeholderTextColor="black"
                        style={commonStyles.textField}
                        value={playerName}
                        onChangeText={(text) => handlePlayerNameChange(index, text)}
                    />
                </View>
            ))}

            <View style={commonStyles.rowContainer}>
                <TouchableOpacity style={commonStyles.button} onPress={handleNext}>
                    <Text style={commonStyles.label}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Addplayers;
