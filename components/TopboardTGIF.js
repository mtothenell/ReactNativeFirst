import {View, Text, ImageBackground, FlatList} from "react-native";
import React, {useEffect, useState} from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";
import {useTournamentData} from "./TournamentDataContext";
import Counter from "react-native-counters";

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
                                style={[commonStyles.tableRow, isLandscape && tournamentData.playerNames.length >= 12 && {height: 22}]}>
                                <Text style={commonStyles.cell}>{item.name}</Text>
                                <Text style={commonStyles.cell}>
                                    <View style={commonStyles.counterContainer}>
                                        <Counter onChange={() => {
                                        }}
                                                 buttonStyle={{
                                                     borderColor: '#333',
                                                     borderWidth: 2,
                                                 }} buttonTextStyle={{
                                            color: '#333'
                                        }} countTextStyle={{
                                            color: '#333',
                                        }} start={0}/>
                                        <Text></Text>
                                    </View>
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

