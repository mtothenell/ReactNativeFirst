import React, {createContext, useContext, useState} from 'react';

const TournamentDataContext = createContext(null);

export const useTournamentData = () => useContext(TournamentDataContext);

export const TournamentDataProvider = ({children}) => {

    const initialTournamentData = {
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
        gameOn: false
    };

    const [tournamentData, setTournamentData] = useState(initialTournamentData);



    // const [tournamentData, setTournamentData] = useState({
    //     name: 'Tournament',
    //     type: 'Mangoricano',
    //     players: 4,
    //     points: 21,
    //     playerNames: [],
    //     round: 1,
    //     roundData: [],
    //     settingsClickable: true,
    //     tournamentClickable: true,
    //     topboardClickable: true,
    //     gameOn: false
    // });

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
                    selectedValues
                }
            ]
        }));
    };


    return (
        <TournamentDataContext.Provider value={{tournamentData, setTournamentData, updateRoundData, resetTournamentData }}>
            {children}
        </TournamentDataContext.Provider>
    );
};
