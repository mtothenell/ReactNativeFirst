import {View, Text, ImageBackground, FlatList} from "react-native";
import React, {useEffect, useState} from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";
import {useTournamentData} from "./TournamentDataContext";
import {calculatePlayerScores} from "./calculatePlayerScores";

const Topboard = () => {

    const tourContext = useTournamentData();
    const {tournamentData} = tourContext;

    useEffect( () => {
        console.log(calculatePlayerScores(tournamentData));
    })

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={commonStyles.backgroundImage}
        >
            < View style={commonStyles.container}>
                <Text style={commonStyles.headlines}>Topboard</Text>
                <View style={commonStyles.table}>
                    <View style={[commonStyles.tableRow, commonStyles.headerRow]}>
                        <Text style={commonStyles.cell}>Name</Text>
                        <Text style={commonStyles.cell}>Score</Text>
                    </View>
                    <FlatList
                        data={tournamentData.playerNames}
                        renderItem={({item}) => (
                            <View style={commonStyles.tableRow}>
                                <Text style={commonStyles.cell}>{item.name}</Text>
                                <Text style={commonStyles.cell}>{item.score}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

export default Topboard;

