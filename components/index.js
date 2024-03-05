import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import commonStyles from "../commonStyles";
import SelectDropdown from 'react-native-select-dropdown'
import bg from '../assets/img.png'
import Addplayers from "./Addplayers";
import {useTournamentData} from "./TournamentDataContext";
import {useNavigation} from "@react-navigation/native";
const Index = () => {

    const tourContext = useTournamentData();
    const { tournamentData } = tourContext;

    const points = ["11", "15", "17", "21", "25"]
    const players = ["4", "8", "12", "16", "20", "24"]
    const type = ["Mangoricano", "Mexicano", "Americano", "TGIF"]

    const [showContent, setShowContent] = useState(true);
    const [showPlayers, setShowPlayers] = useState(false);

    const addPlayers = () => {
        setShowContent(false);
        setShowPlayers(true);
    }

    const navigation = useNavigation();

    const handleNext = () => {
        navigation.reset({
            index: 0,
            routes: [{name: 'Tournament'}] // Go back to the initial screen
        });
    };

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover" style={commonStyles.backgroundImage}>
            {showContent && (<View style={commonStyles.container}>
                    <Text style={[commonStyles.headlines]}>Mangoricano</Text>
                    <View style={commonStyles.rowContainer}>
                        <Text style={commonStyles.label}>Name </Text>
                        <TextInput placeholder="Tournament" placeholderTextColor="black"
                                   style={commonStyles.textField}
                                   onChangeText={(text) => tourContext.setTournamentData({...tourContext.tournamentData, name: text})}/>
                    </View>
                    <View style={commonStyles.rowContainer}>
                        <Text style={commonStyles.label}>Type</Text>
                        <SelectDropdown
                            data={type}
                            buttonStyle={commonStyles.selectDropdown}
                            defaultButtonText="Mangoricano"
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
                            onSelect={(selectedItem, index) => tourContext.setTournamentData({ ...tourContext.tournamentData, players: selectedItem })}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        />
                    </View>
                    <View style={commonStyles.rowContainer}>
                        <Text style={commonStyles.label}>Points</Text>
                        <SelectDropdown
                            data={points}
                            defaultButtonText='21'
                            buttonStyle={commonStyles.selectDropdown}
                            onSelect={(selectedItem, index) => tourContext.setTournamentData({ ...tourContext.tournamentData, points: selectedItem })}

                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {

                                return item
                            }}
                        />
                    </View>
                    <View style={commonStyles.rowContainer}>
                        <TouchableOpacity style={commonStyles.button} onPress={addPlayers}>
                            <Text style={commonStyles.label}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {showPlayers && <Addplayers onSmash={handleNext}/>}
        </ImageBackground>
    );
}

export default Index;
