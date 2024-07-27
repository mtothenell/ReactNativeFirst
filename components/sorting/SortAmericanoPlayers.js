export const SortAmericanoPlayers = (tournamentData,round) => {
    const americanoPlayers = tournamentData.playerTest;

    const allPairs = [];

    // OBS: Americano funkar bara för 4 spelare just nu!

    allPairs.push([americanoPlayers[0],americanoPlayers[1],americanoPlayers[2],americanoPlayers[3]]);
    allPairs.push([americanoPlayers[0],americanoPlayers[2],americanoPlayers[1],americanoPlayers[3]]);
    allPairs.push([americanoPlayers[0],americanoPlayers[3],americanoPlayers[1],americanoPlayers[2]]);

    return allPairs[round+1]
};
