import {View, Text, ImageBackground, TextInput} from "react-native";
import React, { useState } from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";

const Tournament = ({ route }) => {
    const { playerInputs } = route.params || [];
    const [started, setStarted] = useState(true);

    // Chunk the playerInputs array into smaller arrays containing two elements each
    const chunkedPlayers = [];
    for (let i = 0; i < playerInputs.length; i += 4) {
        chunkedPlayers.push(playerInputs.slice(i, i + 4));
    }

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={commonStyles.backgroundImage}
        >
            {started ? (
                <View style={commonStyles.container}>
                    <Text style={commonStyles.headlines}>Round 1</Text>
                    {chunkedPlayers.map((chunk, index) => (
                        <View key={index} style={commonStyles.rowContainer}>
                            <Text style={commonStyles.label}>{chunk[0].name} & {chunk[1].name}</Text>
                            <Text style={commonStyles.label}>VS</Text>
                            <Text style={commonStyles.label}>{chunk[2].name} & {chunk[3].name}</Text>
                            <TextInput style={[commonStyles.textField, { width: 50, height: 45 }]} />

                        </View>
                    ))}
                </View>
            ) : (
                <View style={commonStyles.container}>
                    <Text style={commonStyles.headlines}>Tournament not started</Text>
                </View>
            )}
        </ImageBackground>
    );
};

export default Tournament;
