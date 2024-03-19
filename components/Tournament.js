import {View, Text, ImageBackground, TouchableOpacity} from "react-native";
import React, {useContext, useEffect, useRef, useState} from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";
import {useTournamentData} from "./TournamentDataContext";
import SelectDropdown from "react-native-select-dropdown";

const Tournament = () => {
    const [valuesEntered, setValuesEntered] = useState(true);
    const tourContext = useTournamentData();
    const {tournamentData, setTournamentData, updateRoundData} = tourContext;
    const [selectedValues, setSelectedValues] = useState(Array(Math.ceil(tournamentData.playerNames.length / 4)).fill({
        value1: '0',
        value2: '0'
    }));

    console.log("+_+_" +JSON.stringify(tournamentData.playerNames))

    const handleDropdownChange1 = (index, value) => {
        const newSelectedValues = [...selectedValues];
        const totalPoints = parseInt(tournamentData.points);
        const selectedPoints1 = parseInt(value);
        if (selectedPoints1 > 0) {
            setValuesEntered(false)
        }
        const selectedPoints2 = totalPoints - selectedPoints1;
        newSelectedValues[index] = {value1: value, value2: selectedPoints2.toString()};
        setSelectedValues(newSelectedValues);
    }

    const handleDropdownChange2 = (index, value) => {
        const newSelectedValues = [...selectedValues];
        const totalPoints = parseInt(tournamentData.points);
        const selectedPoints2 = parseInt(value);
        if (selectedPoints2 > 0) {
            setValuesEntered(false)
        }
        const selectedPoints1 = totalPoints - selectedPoints2;
        newSelectedValues[index] = {value1: selectedPoints1.toString(), value2: value};
        setSelectedValues(newSelectedValues);
    }

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
    });

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
    };

    useEffect(() => {

        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            setValuesEntered(true); // Reset valuesEntered to true after pushing "Next"
        }
    }, [tournamentData.round]);


    useEffect(() => {
    }, [tournamentData.roundData, updateRoundData, selectedValues]);

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={commonStyles.backgroundImage}
        >
            {tournamentData.gameOn && tournamentData.type !== "TGIF" ? (
                <View style={commonStyles.container}>
                    <View style={commonStyles.rowContainer}>
                    <Text style={commonStyles.headlines}>Round {tournamentData.round}</Text>
                </View>
                    {selectedValues.map((selectedValue, index) => (
                        <View key={index * 4} style={commonStyles.rowContainer}>
                            <View>
                                <Text
                                    style={commonStyles.courtLabel}>{index+1}</Text>
                            </View>
                            <SelectDropdown
                                defaultValue={selectedValue.value1}
                                data={pointsToPlayFor()}
                                defaultButtonText={selectedValue.value1}
                                buttonStyle={[commonStyles.selectDropdown, {width: 60}]}
                                onSelect={(selectedItem, selectedIndex) => handleDropdownChange1(index, selectedItem)}
                            />
                            <View>
                                <Text
                                    style={commonStyles.label}>{tournamentData.playerNames[index * 4].name} {' '} {tournamentData.playerNames[index * 4 + 1].name}</Text>
                            </View>
                            <SelectDropdown
                                defaultValue={selectedValue.value2}
                                data={pointsToPlayFor()}
                                defaultButtonText={selectedValue.value2}
                                buttonStyle={[commonStyles.selectDropdown, {width: 60}]}
                                onSelect={(selectedItem, selectedIndex) => handleDropdownChange2(index, selectedItem)}
                            />
                            <View>
                                <Text
                                    style={commonStyles.label}>{tournamentData.playerNames[index * 4 + 2].name} {' '} {tournamentData.playerNames[index * 4 + 3].name}</Text>
                            </View>
                        </View>
                    ))}
                    <View style={[commonStyles.rowContainer, {paddingTop: 20}]}>
                        <View style={{margin: 10}}>
                            <TouchableOpacity
                                style={[commonStyles.button, !valuesEntered ? {backgroundColor: 'orange'} : {backgroundColor: 'grey'}]}
                                onPress={handleNext} disabled={valuesEntered}
                            >
                                <Text style={commonStyles.label}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>) : null}
        </ImageBackground>
    );
};

export default Tournament;
