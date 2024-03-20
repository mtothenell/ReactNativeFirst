import {View, Text, ImageBackground, FlatList} from "react-native";
import React, {useEffect, useState} from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";
import {useTournamentData} from "./TournamentDataContext";
import {calculatePlayerScores} from "./CalculatePlayerScores";
import TopboardTGIF from "./TopboardTGIF";

const Topboard = () => {

    const tourContext = useTournamentData();
    const {tournamentData, sortPlayers} = tourContext;

    useEffect(() => {
        sortPlayers();

        console.log(tournamentData.playerNames)
        console.log(tournamentData.sortedPlayerScores)
    }, [tournamentData.roundData]);

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={commonStyles.backgroundImage}>
            {tournamentData.roundData.length !== 0 && tournamentData.type !== "TGIF" ? (
                <View style={commonStyles.container}>
                    <Text style={commonStyles.headlines}></Text>
                    <View style={commonStyles.table}>
                        <View style={[commonStyles.tableRow, commonStyles.headerRow]}>
                            <Text style={commonStyles.cellHeader}>Name</Text>
                            <Text style={commonStyles.cellHeader}>Score</Text>
                        </View>
                        <FlatList
                            data={tournamentData.sortedPlayerScores}
                            renderItem={({item}) => (
                                <View style={commonStyles.tableRow}>
                                    <Text style={commonStyles.cell}>{item.name}</Text>
                                    <Text style={commonStyles.cell}>{item.score || 0}</Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            ) : (
                tournamentData.type === "TGIF" && <TopboardTGIF/>
            )}
        </ImageBackground>
    );
};

export default Topboard;

