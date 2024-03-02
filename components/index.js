import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import commonStyles from "../commonStyles";
import SelectDropdown from 'react-native-select-dropdown'
import bg from '../assets/img.png'
import Addplayers from "./Addplayers";

const Index = () => {

    const points = ["11", "15", "17", "21", "25"]
    const players = ["4", "8", "12", "16", "20", "24"]
    const type = ["Mangoricano", "Mexicano", "Americano"]
    const [showContent, setShowContent] = useState(true);
    const [showPlayers, setShowPlayers] = useState(false);

    const [tournamentData, setTournamentData] = useState({
        name: '',
        type: 'Mangoricano',
        players: '8',
        points: '21'
    });

    const addPlayers = () => {
        setShowContent(false);
        setShowPlayers(true);
    }

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover" style={commonStyles.backgroundImage}>
            {showContent && (<View style={commonStyles.container}>
                    {/*<Text style={[commonStyles.headlines]}>Smash of a mango!</Text>*/}
                    <View style={commonStyles.rowContainer}>
                        <Text style={commonStyles.label}>Name </Text>
                        <TextInput placeholder="Tournament" placeholderTextColor="black"
                                   style={commonStyles.textField}
                                   onChangeText={(text) => setTournamentData({...tournamentData, name: text})}/>
                    </View>
                    <View style={commonStyles.rowContainer}>
                        <Text style={commonStyles.label}>Type</Text>
                        <SelectDropdown
                            data={type}
                            buttonStyle={commonStyles.selectDropdown}
                            defaultButtonText="Mangoricano"
                            onSelect={(selectedItem, index) => setTournamentData({
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
                            defaultButtonText="8"
                            buttonStyle={commonStyles.selectDropdown}
                            onSelect={(selectedItem, index) => setTournamentData({ ...tournamentData, players: selectedItem })}
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
                            defaultButtonText="11"
                            buttonStyle={commonStyles.selectDropdown}
                            onSelect={(selectedItem, index) => setTournamentData({ ...tournamentData, points: selectedItem })}

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
            {showPlayers && <Addplayers tournamentData={tournamentData}/>}
        </ImageBackground>
    );
}

export default Index;
