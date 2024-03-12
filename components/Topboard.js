import {View, Text, ImageBackground, FlatList} from "react-native";
import React, {useEffect, useState} from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";
import {useTournamentData} from "./TournamentDataContext";
import {calculatePlayerScores} from "./CalculatePlayerScores";
import TopboardTGIF from "./TopboardTGIF";

const Topboard = () => {

    const [playerScores, setPlayerScores] = useState({});
    const tourContext = useTournamentData();
    const {tournamentData} = tourContext;

    useEffect(() => {
        const scores = calculatePlayerScores(tournamentData);
        setPlayerScores(scores);
    }, [tournamentData]);

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={commonStyles.backgroundImage}>
            {tournamentData.type !== "TGIF" ? (
                <View style={commonStyles.container}>
                    <Text style={commonStyles.headlines}></Text>
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
                                    <Text style={commonStyles.cell}>{playerScores[item.name] || 0}</Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>) : (<TopboardTGIF/>)}
        </ImageBackground>
    );
};

export default Topboard;

