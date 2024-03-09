import {View, Text, ImageBackground, TextInput, TouchableOpacity} from "react-native";
import React, {useContext, useEffect, useRef, useState} from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";
import {useTournamentData} from "./TournamentDataContext";
import SelectDropdown from "react-native-select-dropdown";

const Tournament = () => {

    const tourContext = useTournamentData();
    const {tournamentData, setTournamentData, updateRoundData} = tourContext;
    const [selectedValue1, setSelectedValue1] = useState('0');
    const [selectedValue2, setSelectedValue2] = useState('0');
    const isFirstRender = useRef(true);

    const chunkedPlayers = [];
    for (let i = 0; i < tournamentData.playerNames.length; i += 4) {
        chunkedPlayers.push(tournamentData.playerNames.slice(i, i + 4));
    }

    const updateSelectedValue1 = (value) => {
        setSelectedValue1(value);
        const diff = tournamentData.points - parseInt(value);
        setSelectedValue2(diff.toString());
    }

    const updateSelectedValue2 = (value) => {
        setSelectedValue2(value);
        const diff = tournamentData.points - parseInt(value);
        const updateValue1 = diff.toString();
        setSelectedValue1(updateValue1);
    }

    useEffect(() => {
        // console.log("värdet på 1: " + selectedValue1);
        // console.log("värdet på 2: " + selectedValue2);
    }, [selectedValue1, selectedValue2]);

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

    const handleNextRound = () => {
        const players = chunkedPlayers.map((chunk) => [
            { name: chunk[0].name, selectedValue: selectedValue1 },
            { name: chunk[1].name, selectedValue: selectedValue1 },
            { name: chunk[2].name, selectedValue: selectedValue2 },
            { name: chunk[3].name, selectedValue: selectedValue2 },
        ]);

        updateRoundData(players, [selectedValue1, selectedValue2]);
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
                    {/*<Text style={commonStyles.headlines}>{tournamentData.name}</Text>*/}
                    <Text style={commonStyles.headlines}>Round {tournamentData.round}</Text>
                    {chunkedPlayers.map((chunk, index) => (
                        <View key={index} style={commonStyles.rowContainer}>
                            <SelectDropdown
                                defaultValue={selectedValue1}
                                data={pointsToPlayFor()}
                                defaultButtonText={selectedValue1}
                                buttonStyle={[commonStyles.selectDropdown, {width: 60}]}
                                onSelect={(selectedItem, index) => updateSelectedValue1(selectedItem)}
                            />
                            <Text style={commonStyles.label}>{chunk[0].name} {chunk[1].name}</Text>
                            <Text style={{fontSize: 14, color: "orange"}}>VS</Text>
                            <Text style={commonStyles.label}>{chunk[2].name} {chunk[3].name}</Text>
                            <SelectDropdown
                                defaultValue={selectedValue2}
                                data={pointsToPlayFor()}
                                defaultButtonText={selectedValue2}
                                buttonStyle={[commonStyles.selectDropdown, {width: 60}]}
                                onSelect={(selectedItem, index) => updateSelectedValue2(selectedItem)}
                            />
                        </View>
                    ))}
                    <View style={[commonStyles.rowContainer, {paddingTop: 20}]}>
                        <View style={{margin: 10}}>
                            <TouchableOpacity style={[{}, commonStyles.button]} onPress={handleNextRound}>
                                <Text style={commonStyles.label}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>) : (<View style={commonStyles.container}><Text style={commonStyles.headlines}></Text></View>)}
        </ImageBackground>
    );
};

export default Tournament;
