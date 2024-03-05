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
    });

    return (
        <TournamentDataContext.Provider value={{tournamentData, setTournamentData}}>
            {children}
        </TournamentDataContext.Provider>
    );
};
