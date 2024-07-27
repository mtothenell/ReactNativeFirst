import {View, Text, ImageBackground, FlatList, Dimensions} from "react-native";
import React, {useEffect, useState} from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";
import {useTournamentData} from "./TournamentDataContext";
import TopboardTGIF from "./TopboardTGIF";

const Topboard = () => {

    const tourContext = useTournamentData();
    const {tournamentData} = tourContext;
    const [isLandscape] = useState(false);
    const typeOfPlayerNames = tournamentData.type === "Americano" ? tournamentData.playerNamesAmericano : tournamentData.playerNames;

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={commonStyles.backgroundImage}
        >
            {tournamentData.roundData.length !== 0 && tournamentData.type !== "TGIF" ? (
                <View style={[{flex: 1}, !isLandscape && {justifyContent: 'center'}, isLandscape && {justifyContent: 'flex-start'}]}>
                    <View style={[
                        commonStyles.container && {justifyContent: 'flex-start',},
                        isLandscape && typeOfPlayerNames.length >= 12 && commonStyles.containerLandscape,
                    ]}>
                        <View style={[{
                            width: '100%',
                            borderColor: 'black',
                            marginLeft: 0,
                        }, isLandscape && typeOfPlayerNames.length < 12 && {width: '100%'},
                            , isLandscape && typeOfPlayerNames.length >= 12 && {width: '50%', }]}>
                            <View style={[commonStyles.tableRow, commonStyles.headerRow]}>
                                <Text style={[commonStyles.cellHeader]}>Rank</Text>
                                <Text style={commonStyles.cellHeader}>Name</Text>
                                <Text style={commonStyles.cellHeader}>Score</Text>
                                <Text style={commonStyles.cellHeader}>Wins</Text>
                            </View>
                            <FlatList
                                data={(!isLandscape || isLandscape && typeOfPlayerNames.length < 12) ? typeOfPlayerNames : typeOfPlayerNames.slice(0, typeOfPlayerNames.length / 2)}
                                renderItem={({item, index}) => (
                                    <View
                                        style={[
                                            commonStyles.tableRow,
                                            (index === 99 && {backgroundColor: '#FFD700'}),
                                            (index === 99 && {backgroundColor: '#C0c0c0'}),
                                            (index === 99 && {backgroundColor: '#Cd7f32'}),
                                            (index > 2 && {backgroundColor: '#b8ce9b'})
                                        ]}
                                    >
                                        <Text style={commonStyles.cell}>{index + 1}</Text>
                                        <Text style={commonStyles.cell}>{item.name}</Text>
                                        <Text style={commonStyles.cell}>{item.score || 0}</Text>
                                        <Text style={commonStyles.cell}>{item.wins}</Text>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        {isLandscape && typeOfPlayerNames.length >= 12 && (
                            <View style={[{width: "50%", borderWidth: 0, borderLeftWidth: 1,borderColor: 'black', marginLeft: 0}]}>
                                <View style={[commonStyles.tableRow, commonStyles.headerRow]}>
                                    <Text style={commonStyles.cellHeader}>Rank</Text>
                                    <Text style={commonStyles.cellHeader}>Name</Text>
                                    <Text style={commonStyles.cellHeader}>Score</Text>
                                    <Text style={commonStyles.cellHeader}>Wins</Text>
                                </View>
                                <FlatList
                                    data={typeOfPlayerNames.slice(Math.ceil(typeOfPlayerNames.length / 2))}
                                    renderItem={({item, index}) => (
                                        <View style={[commonStyles.tableRow, commonStyles.notFirst]}>
                                            <Text
                                                style={commonStyles.cell}>{index + Math.ceil(typeOfPlayerNames.length / 2) + 1}</Text>
                                            <Text style={commonStyles.cell}>{item.name}</Text>
                                            <Text style={commonStyles.cell}>{item.score || 0}</Text>
                                            <Text style={commonStyles.cell}>{item.wins}</Text>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        )}
                    </View>
                </View>
            ) : (
                tournamentData.type === "TGIF" && <TopboardTGIF isLandscape={isLandscape}/>
            )}
        </ImageBackground>
    );
};

export default Topboard;

