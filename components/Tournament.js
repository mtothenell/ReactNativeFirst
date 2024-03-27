import {View, Text, ImageBackground, TouchableOpacity, Dimensions, Modal} from "react-native";
import React, {useContext, useEffect, useRef, useState} from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";
import {useTournamentData} from "./TournamentDataContext";
import SelectDropdown from "react-native-select-dropdown";
import MyModal from "./MyModal";
import TournamentPointModal from "./TournamentPointModal";

const Tournament = () => {

    const [selectedTextboxIndex, setSelectedTextboxIndex] = useState(null); // Add this line
    const [isLandscape, setIsLandscape] = useState(false);
    const [valuesEntered, setValuesEntered] = useState(true);
    const tourContext = useTournamentData();
    const {tournamentData, setTournamentData, updateRoundData, sortPlayers} = tourContext;
    const [selectedValues, setSelectedValues] = useState(Array(Math.ceil(tournamentData.playerNames.length / 4)).fill({
        value1: '0',
        value2: '0'
    }));
    const [isModalVisible, setIsModalVisible] = useState(false);

    const textInputRef1 = useRef(null);
    const textInputRef2 = useRef(null);

    const [point, setPoint] = useState(21); // ****FOR TEST PURP ONLY!

    useEffect(() => {
        const {width, height} = Dimensions.get('window');
        setIsLandscape(width > height);
    }, []);

    useEffect(() => {
        for (const item of selectedValues) {
            const sum = parseInt(item.value1) + parseInt(item.value2);
            if (sum === tournamentData.points) {
                setValuesEntered(false)
            }
            else {
                setValuesEntered(true)
            }
        }
    }, [selectedValues]);


    const handleDropdownChange1 = (index, value) => {
        const newSelectedValues = [...selectedValues];
        const totalPoints = parseInt(tournamentData.points);
        const selectedPoints1 = parseInt(value);
        // if (selectedPoints1 > 0) {
        //     setValuesEntered(false)
        // }
        const selectedPoints2 = totalPoints - selectedPoints1;
        newSelectedValues[index] = {value1: value, value2: selectedPoints2.toString()};
        setSelectedValues(newSelectedValues);
    }

    const handleDropdownChange2 = (index, value) => {
        const newSelectedValues = [...selectedValues];
        const totalPoints = parseInt(tournamentData.points);
        const selectedPoints2 = parseInt(value);
        // if (selectedPoints2 > 0) {
        //     setValuesEntered(false)
        // }
        const selectedPoints1 = totalPoints - selectedPoints2;
        newSelectedValues[index] = {value1: selectedPoints1.toString(), value2: value};
        setSelectedValues(newSelectedValues);
    }

    const isFirstRender = useRef(true);

    const pointsToPlayFor = () => {
        const pointsArray = [];
        for (let i = 0; i <= tournamentData.points; i++) {
            pointsArray.push(i.toString());
        }
        return pointsArray;
    }

    const handleNext = () => {

        updateRoundData(tournamentData.round, selectedValues);
        setTournamentData(prevState => ({
            ...prevState,
            round: prevState.round + 1
        }));

        setSelectedValues(Array(Math.ceil(tournamentData.playerNames.length / 4)).fill({value1: '0', value2: '0'}));

        sortPlayers();
    };

    const handleTextInputFocus = (textboxIndex) => {
        setIsModalVisible(true);
        setSelectedTextboxIndex(textboxIndex);
    };


    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    // MAKES THIS TWO ONCES TO A SINGLE.
    // const handleNumberSelection = (number) => {
    //     setPoint(number);
    //     setIsModalVisible(false);
    //     textInputRef.current.blur();
    //     handleDropdownChange1(0, number)
    // };
    // const handleNumberSelection2 = (number) => {
    //     setPoint(number);
    //     setIsModalVisible(false);
    //     textInputRef.current.blur();
    //     handleDropdownChange2(0, number)
    // };


    const handleNumberSelection = (number) => {
        setPoint(number);
        setIsModalVisible(false);
        if (selectedTextboxIndex === 0) {
            textInputRef1.current.blur();
            handleDropdownChange1(0, number);
        } else if (selectedTextboxIndex === 1) {
            textInputRef2.current.blur();
            handleDropdownChange2(0, number);
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
                <View style={commonStyles.contentContainer}>
                    <View style={commonStyles.container}>
                        <View
                            style={isLandscape ? commonStyles.rowContainerTournamentLandscape : commonStyles.rowContainer}>
                            <Text style={commonStyles.headlines}>ROUND {tournamentData.round}</Text>
                            {isLandscape && (<View style={[{}]}>
                                    <View style={{}}>
                                        <TouchableOpacity
                                            style={[commonStyles.button, !valuesEntered ? {backgroundColor: 'orange'} : {backgroundColor: 'grey'}]}
                                            onPress={handleNext} disabled={valuesEntered}>
                                            <Text style={commonStyles.label}>Next</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                        {selectedValues.map((selectedValue, index) => {
                            const isLastRow = index === selectedValues.length - 1;
                            return (
                                <View key={index * 4} style={commonStyles.rowContainer}>
                                    <View>
                                        <Text
                                            style={commonStyles.courtLabel}>{index + 1}</Text>
                                    </View>
                                    <Text
                                        ref={textInputRef1}
                                        style={commonStyles.textFieldForTournament}
                                        value={selectedValue.value1}
                                        onPress={() => handleTextInputFocus(0)}
                                    >
                                        {selectedValue.value1}
                                    </Text>
                                    <Modal
                                        visible={isModalVisible}
                                        transparent={true}
                                        onRequestClose={handleCloseModal}
                                        animationType="fade"
                                    >
                                        <TournamentPointModal visible={() => handleTextInputFocus(0)} onClose={handleCloseModal}
                                                              onSelectNumber={(number) => handleNumberSelection(number, 0)} pointsPlaying={tournamentData.points}></TournamentPointModal>
                                    </Modal>
                                    {/*<SelectDropdown*/}
                                    {/*    defaultValue={selectedValue.value1}*/}
                                    {/*    data={pointsToPlayFor()}*/}
                                    {/*    defaultButtonText={selectedValue.value1}*/}
                                    {/*    buttonStyle={[commonStyles.selectDropdown, {width: 60}]}*/}
                                    {/*    onSelect={(selectedItem, selectedIndex) => handleDropdownChange1(index, selectedItem)}*/}
                                    {/*/>*/}
                                    <View><Text style={commonStyles.label}>
                                        {tournamentData.playerNames.length !== 0 && (tournamentData.playerNames[index * 4].name + '  ' + tournamentData.playerNames[index * 4 + 2].name)}
                                    </Text>
                                    </View>
                                    {isLandscape && <Text style={commonStyles.labelVS}>VS</Text>}
                                    <Text
                                        ref={textInputRef2}
                                        style={commonStyles.textFieldForTournament}
                                        value={selectedValue.value2}
                                        onPress={() => handleTextInputFocus(1)}
                                    >
                                        {selectedValue.value2}
                                    </Text>
                                    <Modal
                                        visible={isModalVisible}
                                        transparent={true}
                                        onRequestClose={handleCloseModal}
                                        animationType="fade"
                                    >
                                        <TournamentPointModal visible={() => handleTextInputFocus(1)} onClose={handleCloseModal}
                                                              onSelectNumber={(number) => handleNumberSelection(number, 1)} pointsPlaying={tournamentData.points}></TournamentPointModal>
                                    </Modal>
                                    {/*<SelectDropdown*/}
                                    {/*    defaultValue={selectedValue.value2}*/}
                                    {/*    data={pointsToPlayFor()}*/}
                                    {/*    defaultButtonText={selectedValue.value2}*/}
                                    {/*    buttonStyle={[commonStyles.selectDropdown, {width: 60}]}*/}
                                    {/*    onSelect={(selectedItem, selectedIndex) => handleDropdownChange2(index, selectedItem)}*/}
                                    {/*/>*/}
                                    <View><Text style={commonStyles.label}>
                                        {tournamentData.playerNames.length !== 0 && (tournamentData.playerNames[index * 4 + 1].name + '  ' + tournamentData.playerNames[index * 4 + 3].name)}
                                    </Text>
                                    </View>
                                </View>)
                        })}
                        {!isLandscape && (<View style={[commonStyles.rowContainer, {paddingTop: 20}]}>
                                <View style={{margin: 10}}>
                                    <TouchableOpacity
                                        style={[commonStyles.button, !valuesEntered ? {backgroundColor: 'orange'} : {backgroundColor: 'grey'}]}
                                        onPress={handleNext} disabled={valuesEntered}>
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
