//
// // Create a new context
// import React, {createContext, useContext, useState} from 'react';
//
// const defaultPlayersContextValue = {
//     players: [],
//     addPlayer: () => {},
// };
//
// export const PlayersContext = createContext(defaultPlayersContextValue);
//
// // Provider component to manage player names and points scores
// export const PlayersProvider = ({ children }) => {
//     const [players, setPlayers] = useState([]);
//
//     const addPlayer = (playerName, pointsScore) => {
//         setPlayers([...players, { name: playerName, points: pointsScore }]);
//     };
//
//     return (
//         <PlayersContext.Provider value={{ players, addPlayer }}>
//             {children}
//         </PlayersContext.Provider>
//     );
// };
//
// // Custom hook to access player names and points scores from any component
// export const usePlayers = () => {
//     return useContext(PlayersContext);
// };
