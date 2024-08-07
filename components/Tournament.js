import {View, Text, ImageBackground, TouchableOpacity, Dimensions, Modal} from "react-native";
import React, {useContext, useEffect, useRef, useState} from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";
import {useTournamentData} from "./TournamentDataContext";
import SelectDropdown from "react-native-select-dropdown";
import MyModal from "./MyModal";
import TournamentPointModal from "./TournamentPointModal";

const Tournament = () => {

    const [indexOfSelectedValues, setIndexOfSelectedValues] = useState(null);
    const [selectedTextboxIndex, setSelectedTextboxIndex] = useState(null); // Add this line
    const [isLandscape, setIsLandscape] = useState(false);

    const [valuesEntered, setValuesEntered] = useState(false);
    const tourContext = useTournamentData();
    const {tournamentData, setTournamentData, updateRoundData, sortPlayers} = tourContext;
    const [selectedValues, setSelectedValues] = useState(Array(Math.ceil(tournamentData.playerNames.length / 4)).fill({
        value1: '0',
        value2: '0'
    }));
    const [isModalVisible, setIsModalVisible] = useState(false);

    const textInputRef1 = useRef(null);
    const textInputRef2 = useRef(null);

    useEffect(() => {
        const {width, height} = Dimensions.get('window');
        setIsLandscape(width > height);
    }, []);

    useEffect(() => {
        setTournamentData(prevState => ({
            ...prevState,
            tournamentClickable: true,
        }));
    }, []);

    useEffect(() => {
        let isValid = true; // Assume all pairs are valid initially
        for (const item of selectedValues) {
            const sum = parseInt(item.value1) + parseInt(item.value2);
            if (sum !== tournamentData.points) {
                isValid = false;
                break;
            }
        }
        setValuesEntered(isValid);
    }, [selectedValues, tournamentData.points]);


    const handleDropdownChange1 = (index, value) => {
        const newSelectedValues = [...selectedValues];
        const totalPoints = parseInt(tournamentData.points);
        const selectedPoints1 = parseInt(value);
        const selectedPoints2 = totalPoints - selectedPoints1;
        newSelectedValues[index] = {value1: value, value2: selectedPoints2.toString()};
        setSelectedValues(newSelectedValues);
    }

    const handleDropdownChange2 = (index, value) => {
        const newSelectedValues = [...selectedValues];
        const totalPoints = parseInt(tournamentData.points);
        const selectedPoints2 = parseInt(value);
        const selectedPoints1 = totalPoints - selectedPoints2;
        newSelectedValues[index] = {value1: selectedPoints1.toString(), value2: value};
        setSelectedValues(newSelectedValues);
    }

    const isFirstRender = useRef(true);

    const handleNext = async () => {
        await setValuesEntered(false);
        // Update the round data, tournament data, selected values, and sort players
        updateRoundData(tournamentData.round, selectedValues);
        setTournamentData(prevState => ({
            ...prevState,
            round: prevState.round + 1,
            medalistClickable: true,
        }));
        setSelectedValues(Array(Math.ceil(tournamentData.playerNames.length / 4)).fill({value1: '0', value2: '0'}));
        sortPlayers();
    };


    const handleTextInputFocus = (textboxIndex, index) => {
        setIsModalVisible(true);
        setSelectedTextboxIndex(textboxIndex);
    };


    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleNumberSelection = (number, index) => {
        setIsModalVisible(false);
        if (selectedTextboxIndex === 0) {
            handleDropdownChange1(index, number);
        } else if (selectedTextboxIndex === 1) {
            handleDropdownChange2(index, number);
        }
    };

    useEffect(() => {

        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            setValuesEntered(true);
        }
    }, [tournamentData.round]);

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={commonStyles.backgroundImage}
        >
            {tournamentData.gameOn && tournamentData.type !== "TGIF" ? (
                <View style={[
                    commonStyles.contentContainer,
                    commonStyles.contentContainer && isLandscape,
                    isLandscape && tournamentData.playerNames.length > 12 && commonStyles.contentContainerLandscape2,
                ]}>
                    <View style={[{justifyContent: 'center', alignSelf: 'center'}, isLandscape && {flex: 0.3},
                        isLandscape && tournamentData.playerNames.length > 12 && {alignSelf: 'flex-start'}]}>
                        {isLandscape && (
                            <>
                                <Text style={[commonStyles.headlines]}>ROUND {tournamentData.round}</Text>
                                <TouchableOpacity
                                    style={[commonStyles.button, {alignSelf: 'center'}, {backgroundColor: valuesEntered ? 'orange' : 'grey'}]}
                                    onPress={handleNext}
                                    disabled={!valuesEntered}>
                                    <Text style={commonStyles.label}>Next</Text>
                                </TouchableOpacity>

                            </>
                        )}
                    </View>
                    <View style={commonStyles.container}>
                        <View
                            style={isLandscape ? commonStyles.rowContainerTournamentLandscape : commonStyles.rowContainer}>
                            {!isLandscape && <Text style={commonStyles.headlines}>ROUND {tournamentData.round}</Text>}

                        </View>
                        {selectedValues.map((selectedValue, index) => {
                            return (
                                <View key={index * 4} style={commonStyles.rowContainer}>
                                    <View>
                                        <Text
                                            style={commonStyles.courtLabel}>{index + 1}</Text>
                                    </View>
                                    <Text
                                        //ref={textInputRef1}
                                        style={commonStyles.textFieldForTournament}
                                        value={selectedValue.value1}
                                        onPress={() => {
                                            setIndexOfSelectedValues(index)
                                            handleTextInputFocus(0, indexOfSelectedValues)
                                        }}
                                    >
                                        {selectedValue.value1}
                                    </Text>
                                    <Modal
                                        visible={isModalVisible}
                                        transparent={true}
                                        onRequestClose={handleCloseModal}
                                        animationType="fade"
                                    >
                                        <TournamentPointModal
                                            onClose={handleCloseModal}
                                            onSelectNumber={(number) => {
                                                handleNumberSelection(number, indexOfSelectedValues)
                                            }}
                                            pointsPlaying={tournamentData.points}></TournamentPointModal>
                                    </Modal>
                                    <View><Text style={commonStyles.label}>
                                        {tournamentData.playerNames.length !== 0 &&
                                            (tournamentData.type === "Americano"
                                                ? (tournamentData.playerTest[index * 4].name + '  ' + tournamentData.playerTest[index * 4 + 2].name)
                                                : tournamentData.playerNames[index * 4].name + '  ' + tournamentData.playerNames[index * 4 + 2].name)
                                        }
                                    </Text>
                                    </View>
                                    {isLandscape && <Text style={commonStyles.labelVS}>VS</Text>}
                                    <Text
                                        // ref={textInputRef2}
                                        style={commonStyles.textFieldForTournament}
                                        value={selectedValue.value2}
                                        onPress={() => {
                                            setIndexOfSelectedValues(index)
                                            handleTextInputFocus(1, indexOfSelectedValues)
                                        }}
                                    >
                                        {selectedValue.value2}
                                    </Text>
                                    <Modal
                                        visible={isModalVisible}
                                        transparent={true}
                                        onRequestClose={handleCloseModal}
                                        animationType="fade"
                                    >
                                        <TournamentPointModal onClose={handleCloseModal}
                                                              onSelectNumber={(number) => handleNumberSelection(number, indexOfSelectedValues)}
                                                              pointsPlaying={tournamentData.points}></TournamentPointModal>
                                    </Modal>
                                    <View><Text style={commonStyles.label}>
                                        {tournamentData.playerNames.length !== 0 &&
                                            (tournamentData.type === "Americano"
                                                ? (tournamentData.playerTest[index * 4 + 1].name + '  ' + tournamentData.playerTest[index * 4 + 3].name)
                                                : tournamentData.playerNames[index * 4 + 1].name + '  ' + tournamentData.playerNames[index * 4 + 3].name)
                                        }
                                    </Text>
                                    </View>
                                </View>)
                        })}
                        {!isLandscape && (<View style={[commonStyles.rowContainer, {paddingTop: 20}]}>
                                <View style={{margin: 10}}>
                                    <TouchableOpacity
                                        style={[commonStyles.button, {backgroundColor: valuesEntered ? 'orange' : 'grey'}]}
                                        onPress={handleNext} disabled={!valuesEntered}>
                                        <Text style={commonStyles.label}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            ) : null}
        </ImageBackground>
    );
};

export default Tournament;
