import React, {createContext, useContext, useState} from 'react';

const TournamentDataContext = createContext(null);

export const useTournamentData = () => useContext(TournamentDataContext);

export const TournamentDataProvider = ({children}) => {

    const [tournamentData, setTournamentData] = useState({
        name: 'Tournament',
        type: 'TGIF',
        players: 4,
        points: 21,
        playerNames: [],
        round: 1,
        roundData: [],
        settingsClickable: true,
        tournamentClickable: true,
        topboardClickable: true,
    });

    return (
        <TournamentDataContext.Provider value={{tournamentData, setTournamentData}}>
            {children}
        </TournamentDataContext.Provider>
    );
};
