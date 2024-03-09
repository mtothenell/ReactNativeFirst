import React, {createContext, useContext, useState} from 'react';

const TournamentDataContext = createContext(null);

export const useTournamentData = () => useContext(TournamentDataContext);

export const TournamentDataProvider = ({children}) => {

    const [tournamentData, setTournamentData] = useState({
        name: 'Tournament',
        type: 'Mangoricano',
        players: 4,
        points: 21,
        playerNames: [],
        round: 1,
        roundData: [],
        settingsClickable: true,
        tournamentClickable: true,
        topboardClickable: true,
    });

    const updateRoundData = (players, selectedValues) => {
        const { round, roundData } = tournamentData;
        const updatedRoundData = [...roundData, { round, players, selectedValues }];
        setTournamentData((prevData) => ({
            ...prevData,
            roundData: updatedRoundData,
            round: prevData.round + 1, // Increment the round number for the next round
        }));
    };

    return (
        <TournamentDataContext.Provider value={{tournamentData, setTournamentData, updateRoundData}}>
            {children}
        </TournamentDataContext.Provider>
    );
};
