import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Dimensions, Modal} from 'react-native';
import commonStyles from "../commonStyles";
import SelectDropdown from 'react-native-select-dropdown'
import bg from '../assets/img.png'
import Addplayers from "./Addplayers";
import {useTournamentData} from "./TournamentDataContext";
import {useNavigation} from "@react-navigation/native";
import mangopadel from "../assets/mangopadel10.png"
import {useFonts} from "expo-font";
import * as Font from "expo-font";
import MyModal from "./MyModal";
import TournamentPointModal from "./TournamentPointModal";

const Index = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);
    const tourContext = useTournamentData();
    const {tournamentData} = tourContext;
    const [point, setPoint] = useState(21);
    const players = ["4", "8", "12", "16"]
    const type = ["TGIF", "Mexicano"]
    const [showContent, setShowContent] = useState(true);
    const [showPlayers, setShowPlayers] = useState(false);
    const textInputRef = useRef(null);

    // Load fonts
    useFonts({
        Bauhaus_93: require('../assets/fonts/bauhaus_93.ttf'),
        JosefinSans: require('../assets/fonts/JosefinSans.ttf'),
    });

    useEffect(() => {
        if (Font) {
            setIsFontLoaded(true);
        }
    }, []);

    useEffect(() => {
        const {width, height} = Dimensions.get('window');
        setIsLandscape(width > height);
    }, []);

    const addPlayers = () => {

        tourContext.setTournamentData({
            ...tourContext.tournamentData,
            points: point
        })

        setShowContent(false);
        setShowPlayers(true);
    }

    const reset = () => {
        tourContext.resetTournamentData();
    }

    const resetIndex = () => {
        setShowContent(true);
        setShowPlayers(false);
    };

    const handleTextInputFocus = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleNumberSelection = (number) => {
        console.log(number)
        setPoint(number);
        setIsModalVisible(false);
        textInputRef.current.blur();
    };

    const navigation = useNavigation();

    if (!isFontLoaded) {
        return null; // Return a loading indicator or placeholder
    }

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover" style={commonStyles.backgroundImage}
        >
            {!tournamentData.gameOn && showContent && (
                <View style={isLandscape ? commonStyles.containerLandscape : commonStyles.container}>
                    <View style={commonStyles.headerContainer}>
                        <View style={commonStyles.indexImage}>
                            <Image style={{width: 200, height: 200, resizeMode: 'contain'}}
                                   source={mangopadel}></Image>
                        </View>
                    </View>
                    <View style={commonStyles.bottomContainer}>
                        <View style={[commonStyles.rowContainer, {}]}>
                            <Text style={[commonStyles.label, {}]}>       Name</Text>
                            <TextInput placeholder="Tournament" placeholderTextColor="black"
                                       style={[commonStyles.textField, {}]}
                                       onChangeText={(text) => tourContext.setTournamentData({
                                           ...tourContext.tournamentData,
                                           name: text
                                       })}/>
                        </View>
                        <View style={commonStyles.rowContainer}>
                            <Text style={commonStyles.label}>       Type</Text>
                            <SelectDropdown
                                data={type}
                                rowTextStyle={commonStyles.selectDropDownText}
                                buttonTextStyle={commonStyles.selectDropDownText}
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
                            <Text style={commonStyles.label}>       Players</Text>
                            <SelectDropdown
                                rowTextStyle={commonStyles.selectDropDownText}
                                buttonTextStyle={commonStyles.selectDropDownText}
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
                            <Text style={commonStyles.label}>       Points</Text>
                            <Text
                                ref={textInputRef}
                                style={commonStyles.textField}
                                value={point.toString()}
                                onPress={handleTextInputFocus}
                            >
                                {point ? point.toString() : 'Placeholder Text'}
                            </Text>
                            <Modal
                                visible={isModalVisible}
                                transparent={true}
                                onRequestClose={handleCloseModal}
                                animationType="fade"
                            >
                                <TournamentPointModal onClose={handleCloseModal}
                                         onSelectNumber={handleNumberSelection} pointsPlaying={tournamentData.points}
                                isLandscape={isLandscape}></TournamentPointModal>
                            </Modal>
                        </View>}
                        <View style={commonStyles.fullWidthContainer}>
                            <Text> </Text>
                            <TouchableOpacity style={commonStyles.button} onPress={addPlayers}>
                                <Text style={commonStyles.label}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
            {!tournamentData.gameOn && showPlayers && <Addplayers resetIndex={resetIndex} isLandscape={isLandscape}/>}
            {tournamentData.gameOn && (<View style={commonStyles.container}>
                <Text style={[commonStyles.headlines]}>Tournament <Text
                    style={{color: "#a9ec50"}}>ongoing..</Text></Text>
                <TouchableOpacity style={commonStyles.button} onPress={reset}>
                    <Text style={[commonStyles.label, {}]}>Restart</Text>
                </TouchableOpacity>
            </View>)}
        </ImageBackground>
    );
}

export default Index;
