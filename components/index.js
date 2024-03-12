import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, ImageBackground, Image} from 'react-native';
import commonStyles from "../commonStyles";
import SelectDropdown from 'react-native-select-dropdown'
import bg from '../assets/img.png'
import Addplayers from "./Addplayers";
import {useTournamentData} from "./TournamentDataContext";
import {useNavigation} from "@react-navigation/native";
import HeaderComponent from "./HeaderComponent";
import mangopadel from "../assets/mangpadel2.png"

const Index = () => {

    const tourContext = useTournamentData();
    const {tournamentData, setTournamentData} = tourContext;

    const points = ["11", "15", "17", "21", "25"]
    const players = ["4", "8", "12", "16", "20", "24"]
    //const type = ["Mangoricano", "Mexicano", "Americano", "TGIF"]
    const type = ["TGIF", "Mangoricano"]

    useEffect(() => {

    }, [type])

    const [showContent, setShowContent] = useState(true);
    const [showPlayers, setShowPlayers] = useState(false);

    const addPlayers = () => {
        setShowContent(false);
        setShowPlayers(true);
    }

    const reset = () => {
        tourContext.resetTournamentData();
    }

    const navigation = useNavigation();

    const handleNext = () => {

        const updatedTourData = {
            ...tournamentData,
            settingsClickable: true,
            gameOn: true
        };
        setTournamentData(updatedTourData);

        if (tournamentData.type === "TGIF") {
            navigation.reset({
                index: 0,
                routes: [{name: 'Topboard'}] // Go back to the initial screen
            });
        } else {
            navigation.reset({
                index: 0,
                routes: [{name: 'Tournament'}] // Go back to the initial screen
            });
        }
    };

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover" style={commonStyles.backgroundImage}
        >
            {!tournamentData.gameOn && showContent && (<View style={commonStyles.container}>
                    <View style={commonStyles.headerContainer}>
                        <View style={commonStyles.indexImage}>
                            <Image style={{width: 200, height: 200, resizeMode: 'contain'}} source={mangopadel}></Image>
                        </View>
                    </View>
                    <View style={commonStyles.bottomContainer}>
                        <View style={commonStyles.rowContainer}>
                            <Text style={commonStyles.label}>Name </Text>
                            <TextInput placeholder="Tournament" placeholderTextColor="black"
                                       style={commonStyles.textField}
                                       onChangeText={(text) => tourContext.setTournamentData({
                                           ...tourContext.tournamentData,
                                           name: text
                                       })}/>
                        </View>
                        <View style={commonStyles.rowContainer}>
                            <Text style={commonStyles.label}>Type</Text>
                            <SelectDropdown
                                data={type}
                                buttonStyle={commonStyles.selectDropdown}
                                defaultButtonText={tournamentData.type}
                                onSelect={(selectedItem, index) => tourContext.setTournamentData({
                                    ...tournamentData,
                                    type: selectedItem
                                })}

                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />
                        </View>
                        <View style={commonStyles.rowContainer}>
                            <Text style={commonStyles.label}>Players</Text>
                            <SelectDropdown
                                data={players}
                                defaultButtonText="4"
                                buttonStyle={commonStyles.selectDropdown}
                                onSelect={(selectedItem, index) => tourContext.setTournamentData({
                                    ...tourContext.tournamentData,
                                    players: selectedItem
                                })}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />
                        </View>
                        {tournamentData.type !== "TGIF" && <View style={commonStyles.rowContainer}>
                            <Text style={commonStyles.label}>Points</Text>
                            <SelectDropdown
                                data={points}
                                defaultButtonText='21'
                                buttonStyle={commonStyles.selectDropdown}
                                onSelect={(selectedItem, index) => tourContext.setTournamentData({
                                    ...tourContext.tournamentData,
                                    points: selectedItem
                                })}

                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {

                                    return item
                                }}
                            />
                        </View>}
                        <View style={commonStyles.fullWidthContainer}>
                            <TouchableOpacity style={commonStyles.button} onPress={addPlayers}>
                                <Text style={commonStyles.label}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
            {!tournamentData.gameOn && showPlayers && <Addplayers onSmash={handleNext}/>}
            {tournamentData.gameOn && (<View style={commonStyles.headerContainer}>
                <TouchableOpacity style={commonStyles.button} onPress={reset}>
                    <Text style={[commonStyles.label, {width: 200}]}>Start new tournament</Text>
                </TouchableOpacity>
            </View>)}
        </ImageBackground>
    );
}

export default Index;
