import React, {createContext, useContext, useEffect, useState} from 'react';
import {calculatePlayerScores} from "./CalculatePlayerScores";
import {SortAmericanoPlayers} from "./sorting/SortAmericanoPlayers";

const TournamentDataContext = createContext(null);

export const useTournamentData = () => useContext(TournamentDataContext);

export const TournamentDataProvider = ({children}) => {

    const initialTournamentData = {
        name: 'Tournament',
        type: 'Americano',
        players: 4,
        points: 21,
        playerNames: [],
        playerNamesAmericano: [],
        playerTest: [],
        round: 1,
        roundData: [],
        settingsClickable: false,
        tournamentClickable: true,
        topboardClickable: true,
        medalistClickable: false,
        gameOn: false
    };

    const [tournamentData, setTournamentData] = useState(initialTournamentData);

    const sortPlayers = () => {
        setTournamentData(prevState => ({
            ...prevState,
            playerNames: calculatePlayerScores(prevState),
            playerNamesAmericano: calculatePlayerScores(prevState), // handle americano score
            playerTest: SortAmericanoPlayers(prevState,initialTournamentData.round) // handle americano order

        }));
    };

    const resetTournamentData = () => {
        setTournamentData(initialTournamentData);
    };

    const updateRoundData = (round, selectedValues) => {
        setTournamentData(prevState => ({
            ...prevState,
            roundData: [
                ...prevState.roundData,
                {
                    round,
                    playerNames: prevState.playerNames,
                    playerNamesAmericano: prevState.playerNamesAmericano,
                    playerTest: prevState.playerTest,
                    selectedValues
                }
            ]
        }));
    };

    return (
        <TournamentDataContext.Provider value={{tournamentData, setTournamentData, updateRoundData, resetTournamentData, sortPlayers}}>
            {children}
        </TournamentDataContext.Provider>
    );
};
