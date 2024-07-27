import {View, Text, ImageBackground, FlatList} from "react-native";
import React, {useEffect, useState} from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";
import {useTournamentData} from "./TournamentDataContext";
import CustomCounter from "./CustomCounter";

const TopboardTGIF = ({isLandscape}) => {

    const tourContext = useTournamentData();
    const {tournamentData} = tourContext;


    return (
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={commonStyles.backgroundImage}>
            < View style={commonStyles.container}>
                {tournamentData.playerNames.length < 12 &&
                    <Text style={commonStyles.headlines}>{tournamentData.name}</Text>}
                <View style={commonStyles.table}>
                    {!isLandscape &&
                        <View
                            style={[commonStyles.tableRow, commonStyles.headerRow, tournamentData.playerNames.length >= 12 && {height: 20}]}>
                            <Text style={commonStyles.cellHeader}>NAME</Text>
                            <Text style={commonStyles.cellHeader}>WINS</Text>
                        </View>}
                    <FlatList
                        data={tournamentData.playerNames}
                        renderItem={({item}) => (
                            <View
                                style={[commonStyles.tableRow, isLandscape && tournamentData.playerNames.length >= 12 && {height: 22},!isLandscape && {height: 30},
                                    isLandscape & tournamentData.playerNames.length >= 16 && {height: 16}]}>
                                <Text style={[commonStyles.cell, tournamentData.playerNames.length > 12 && {fontSize: 12}]}>{item.name}</Text>
                                <Text style={commonStyles.cell}>
                                    <CustomCounter tournamentData={tournamentData} isLandscape={isLandscape}
                                        initialValue={0} // Initial value for each player
                                        onIncrement={(count) => {
                                            // Handle increment
                                            // For example: Update the count in your data
                                        }}
                                        onDecrement={(count) => {
                                            // Handle decrement
                                            // For example: Update the count in your data
                                        }}
                                    />
                                </Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

export default TopboardTGIF;

