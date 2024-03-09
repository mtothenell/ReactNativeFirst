import {View, Text, ImageBackground, TextInput, TouchableOpacity} from "react-native";
import React, {useContext, useEffect, useRef, useState} from "react";
import bg from "../assets/img.png";
import commonStyles from "../commonStyles";
import {useTournamentData} from "./TournamentDataContext";
import SelectDropdown from "react-native-select-dropdown";

const Tournament = () => {

    const tourContext = useTournamentData();
    const {tournamentData, setTournamentData} = tourContext;
    const [selectedValue1, setSelectedValue1] = useState('0');
    const [selectedValue2, setSelectedValue2] = useState('0');
    const isFirstRender = useRef(true);

    const handleChangeDropdown1 = (selectedItem, index) => {
        setSelectedValue1(selectedItem);
        const remainingPoints = tournamentData.points - parseInt(selectedItem);
        setSelectedValue2(remainingPoints.toString());
    };

    const handleChangeDropdown2 = (selectedItem, index) => {
        setSelectedValue2(selectedItem);
        const remainingPoints = tournamentData.points - parseInt(selectedItem);
        setSelectedValue1(remainingPoints.toString());
    };

    const chunkedPlayers = [];
    for (let i = 0; i < tournamentData.playerNames.length; i += 4) {
        chunkedPlayers.push(tournamentData.playerNames.slice(i, i + 4));
    }

    const nextRound = () => {
        const currentRoundData = {
            roundNumber: tournamentData.round,
            selectedValue1,
            selectedValue2,
            playerNames: chunkedPlayers.map(chunk => ({
                player1: chunk[0].name,
                player2: chunk[1].name,
                player3: chunk[2].name,
                player4: chunk[3].name
            }))
        };

        setTournamentData(prevData => ({
            ...prevData,
            round: prevData.round + 1,
            roundData: [...prevData.roundData, currentRoundData]
        }));

        lala();
    };

    const lala = () => {
        setSelectedValue1('0');
        setSelectedValue2('0');
    }

    useEffect(() => {

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const currentPlayerNames = chunkedPlayers.map(chunk => ({
            player1: chunk[0].name,
            player2: chunk[1].name,
            player3: chunk[2].name,
            player4: chunk[3].name
        }));

        const currentRoundData = {
            roundNumber: tournamentData.round,
            selectedValue1,
            selectedValue2,
            playerNames: currentPlayerNames
        }

        setTournamentData(prevData => {
            const updatedData = {
                ...prevData,
                roundData: [...(prevData.roundData || []), currentRoundData]
            };

            return updatedData;
        });


    }, [selectedValue1, selectedValue2])

    // const previousRound = () => {
    //     if (tournamentData.round >= 2) {
    //         setTournamentData({...tournamentData, round: tournamentData.round - 1})
    //     }
    // }

    const pointsToPlayFor = () => {
        const pointsArray = [];
        for (let i = 0; i <= tournamentData.points; i++) {
            pointsArray.push(i.toString());
        }
        return pointsArray;
    }

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
                                data={pointsToPlayFor()}
                                defaultButtonText={selectedValue1}
                                buttonStyle={[commonStyles.selectDropdown, {width: 60}]}
                                onSelect={(selectedItem, index) => handleChangeDropdown1(selectedItem, index)}
                            />
                            <Text style={commonStyles.label}>{chunk[0].name} {chunk[1].name}</Text>
                            <Text style={{fontSize: 14, color: "orange"}}>VS</Text>
                            <Text style={commonStyles.label}>{chunk[2].name} {chunk[3].name}</Text>
                            <SelectDropdown
                                data={pointsToPlayFor()}
                                defaultButtonText={selectedValue2}
                                buttonStyle={[commonStyles.selectDropdown, {width: 60}]}
                                onSelect={(selectedItem, index) => handleChangeDropdown2(selectedItem, index)}
                            />
                        </View>
                    ))}
                    <View style={[commonStyles.rowContainer, {paddingTop: 20}]}>
                        {/*<TouchableOpacity style={[{}, commonStyles.button]} onPress={previousRound}>*/}
                        {/*    <Text style={commonStyles.label}>Previous</Text>*/}
                        {/*</TouchableOpacity>*/}
                        <View style={{margin: 10}}>
                            <TouchableOpacity style={[{}, commonStyles.button]} onPress={nextRound}>
                                <Text style={commonStyles.label}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>) : ( <View style={commonStyles.container}><Text style={commonStyles.headlines}></Text></View>)}
        </ImageBackground>
    );
};

export default Tournament;
