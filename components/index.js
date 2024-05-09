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
import TournamentPointModal from "./TournamentPointModal";
import {Audio} from "expo-av";
import {PlaybackMixin as soundObject} from "expo-av/src/AV";

const Index = () => {

    const [isPointsModalVisible, setIsPointsModalVisible] = useState(false);
    const [isPlayersModalVisible, setIsPlayersModalVisible] = useState(false);

    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);
    const tourContext = useTournamentData();
    const {tournamentData} = tourContext;
    const [point, setPoint] = useState(21);
    const [players, setPlayers] = useState(8);
    const type = ["TGIF", "Mexicano"]
    const [showContent, setShowContent] = useState(true);
    const [showPlayers, setShowPlayers] = useState(false);
    const textInputRef = useRef(null);

    const [musicPlaying, setMusicPlaying] = useState(false);
    const [soundObject, setSoundObject] = useState(null);

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

    const toggleMusic = async () => {
        if (musicPlaying) {
            // Stop the music
            await soundObject.stopAsync();
            await soundObject.unloadAsync();
            setSoundObject(null);
        } else {
            // Start playing the music
            const newSoundObject = new Audio.Sound();
            try {
                await newSoundObject.loadAsync(require('../assets/sounds/Mango_x3.mp3'));
                await newSoundObject.playAsync();
                setSoundObject(newSoundObject);
            } catch (error) {
                console.error('Failed to play sound', error);
            }
        }
        setMusicPlaying(!musicPlaying);
    };

    const addPlayers = () => {

        tourContext.setTournamentData({
            ...tourContext.tournamentData,
            points: point,
            players: players
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

    const handleTextInputFocusPlayers = () => {
        setIsPlayersModalVisible(true);
    };

    const handleCloseModalPlayers = () => {
        setIsPlayersModalVisible(false);
    };

    const handleTextInputFocus = () => {
        setIsPointsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsPointsModalVisible(false);
    };

    const handleNumberSelection = (number) => {
        setPoint(number);
        setIsPointsModalVisible(false);
        //textInputRef.current.blur();
    };

    const handleNumberSelectionPlayers = (number) => {
        setPlayers(number);
        setIsPlayersModalVisible(false);
        //textInputRef.current.blur();
    };

    const navigation = useNavigation();

    if (!isFontLoaded) {
        return null;
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
                            <TouchableOpacity onPress={toggleMusic}>
                                <Image style={{width: 200, height: 200, resizeMode: 'contain'}}
                                       source={mangopadel}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={commonStyles.bottomContainer}>
                        <View style={[commonStyles.rowContainer, {}]}>
                            <Text style={[commonStyles.label, {}]}> Name</Text>
                            <TextInput placeholder="Tournament" placeholderTextColor="black"
                                       style={[commonStyles.textField, {}]}
                                       onChangeText={(text) => tourContext.setTournamentData({
                                           ...tourContext.tournamentData,
                                           name: text
                                       })}/>
                        </View>
                        <View style={commonStyles.rowContainer}>
                            <Text style={commonStyles.label}> Type</Text>
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
                            <Text style={commonStyles.label}> Players</Text>
                            <Text
                                ref={textInputRef}
                                style={commonStyles.textField}
                                value={players.toString()}
                                onPress={handleTextInputFocusPlayers}
                            >
                                {players ? players.toString() : 'Placeholder Text'}
                            </Text>
                            <Modal
                                visible={isPlayersModalVisible}
                                transparent={true}
                                onRequestClose={handleCloseModalPlayers}
                                animationType="fade"
                            >
                                <TournamentPointModal onClose={handleCloseModalPlayers}
                                                      onSelectNumber={handleNumberSelectionPlayers}
                                                      pointsPlaying={tournamentData.points}
                                                      isLandscape={isLandscape}
                                                      playerTextfield={true}></TournamentPointModal>
                            </Modal>
                            {/*<SelectDropdown*/}
                            {/*    rowTextStyle={commonStyles.selectDropDownText}*/}
                            {/*    buttonTextStyle={commonStyles.selectDropDownText}*/}
                            {/*    data={players}*/}
                            {/*    defaultButtonText="4"*/}
                            {/*    buttonStyle={commonStyles.selectDropdown}*/}
                            {/*    onSelect={(selectedItem, index) => tourContext.setTournamentData({*/}
                            {/*        ...tourContext.tournamentData,*/}
                            {/*        players: selectedItem*/}
                            {/*    })}*/}
                            {/*    buttonTextAfterSelection={(selectedItem, index) => {*/}
                            {/*        return selectedItem*/}
                            {/*    }}*/}
                            {/*    rowTextForSelection={(item, index) => {*/}
                            {/*        return item*/}
                            {/*    }}*/}
                            {/*/>*/}
                        </View>
                        {tournamentData.type !== "TGIF" && <View style={commonStyles.rowContainer}>
                            <Text style={commonStyles.label}> Points</Text>
                            <Text
                                ref={textInputRef}
                                style={commonStyles.textField}
                                value={point.toString()}
                                onPress={handleTextInputFocus}
                            >
                                {point ? point.toString() : 'Placeholder Text'}
                            </Text>
                            <Modal
                                visible={isPointsModalVisible}
                                transparent={true}
                                onRequestClose={handleCloseModal}
                                animationType="fade"
                            >
                                <TournamentPointModal onClose={handleCloseModal}
                                                      onSelectNumber={handleNumberSelection}
                                                      pointsPlaying={tournamentData.points}
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
