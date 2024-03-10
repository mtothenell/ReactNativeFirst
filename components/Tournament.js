import {View, Text, ImageBackground, TouchableOpacity} from "react-native";
import React, {useContext, useEffect, useRef, useState} from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";
import {useTournamentData} from "./TournamentDataContext";
import SelectDropdown from "react-native-select-dropdown";

const Tournament = () => {
    const tourContext = useTournamentData();
    const {tournamentData, setTournamentData, updateRoundData} = tourContext;
    const [selectedValues, setSelectedValues] = useState(Array(Math.ceil(tournamentData.playerNames.length / 4)).fill({ value1: '0', value2: '0' }));


    const handleDropdownChange1 = (index, value) => {
        const newSelectedValues = [...selectedValues];
        newSelectedValues[index] = { ...newSelectedValues[index], value1: value };
        setSelectedValues(newSelectedValues);
    }

    const handleDropdownChange2 = (index, value) => {
        const newSelectedValues = [...selectedValues];
        newSelectedValues[index] = { ...newSelectedValues[index], value2: value };
        setSelectedValues(newSelectedValues);
    }


    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
    });

    const pointsToPlayFor = () => {
        const pointsArray = [];
        for (let i = 0; i <= tournamentData.points; i++) {
            pointsArray.push(i.toString());
        }
        return pointsArray;
    }

    useEffect(() => {
        // Log roundData when it changes
        console.log(tournamentData.roundData);
    }, [tournamentData.roundData, updateRoundData]);

    return (
        <ImageBackground
            source={bg}
            resizeMode="cover"
            style={commonStyles.backgroundImage}
        >
            {tournamentData.type !== "TGIF" ? (
                <View style={commonStyles.container}>
                    <Text style={commonStyles.headlines}>Round {tournamentData.round}</Text>
                    {selectedValues.map((selectedValue, index) => (
                        <View key={index * 4} style={commonStyles.rowContainer}>
                            <SelectDropdown
                                defaultValue={selectedValue.value1}
                                data={pointsToPlayFor()}
                                defaultButtonText={selectedValue.value1}
                                buttonStyle={[commonStyles.selectDropdown, { width: 60 }]}
                                onSelect={(selectedItem, selectedIndex) => handleDropdownChange1(index, selectedItem)}
                            />
                            <View>
                                <Text style={commonStyles.label}>{tournamentData.playerNames[index * 4].name} {' '} {tournamentData.playerNames[index * 4 + 1].name}</Text>
                            </View>
                            <SelectDropdown
                                defaultValue={selectedValue.value2}
                                data={pointsToPlayFor()}
                                defaultButtonText={selectedValue.value2}
                                buttonStyle={[commonStyles.selectDropdown, { width: 60 }]}
                                onSelect={(selectedItem, selectedIndex) => handleDropdownChange2(index, selectedItem)}
                            />
                            <View>
                                <Text style={commonStyles.label}>{tournamentData.playerNames[index * 4 + 2].name} {' '} {tournamentData.playerNames[index * 4 + 3].name}</Text>
                            </View>
                        </View>
                    ))}
                    <View style={[commonStyles.rowContainer, {paddingTop: 20}]}>
                        <View style={{margin: 10}}>
                            <TouchableOpacity style={[{}, commonStyles.button]} onPress={(() => {})}>
                                <Text style={commonStyles.label}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>) : (<View style={commonStyles.container}><Text style={commonStyles.headlines}></Text></View>)}
        </ImageBackground>
    );
};

export default Tournament;
