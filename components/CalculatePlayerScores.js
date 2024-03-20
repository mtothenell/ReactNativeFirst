export const calculatePlayerScores = (tournamentData) => {
    const roundData = tournamentData.roundData;
    const playerScores = {};

    roundData.forEach((round) => {
        round.playerNames.forEach((player, index) => {
            const playerName = player.name;
            let score = player.score || 0;
            const amountOfSelectedValues = round.selectedValues.length-1;
            let selectedValues;
            if (index === 0 || index === 1 || index === 2 || index === 3) {
                selectedValues = round.selectedValues[0];
            }

            if (index === 4 || index === 5 || index === 6 || index === 7) {
                selectedValues = round.selectedValues[1];
            }

            if (index === 8 || index === 9 || index === 10 || index === 11) {
                selectedValues = round.selectedValues[2];
            }
            if (index === 12 || index === 13 || index === 14 || index === 15) {
                selectedValues = round.selectedValues[3];
            }

            const value1 = parseInt(selectedValues.value1);
            const value2 = parseInt(selectedValues.value2);

            //let score;
            if (index === 0 || index === 1 || index === 4 || index === 5 || index === 8 || index === 9 || index === 12 || index === 13) {
                score = value1;
            }
            if (index === 2 || index === 3 || index === 6 || index === 7 || index === 10 || index === 11 || index === 14 || index === 15) {
                score = value2;
            }

            if (playerScores[playerName]) {
                playerScores[playerName] += score;
            } else {
                playerScores[playerName] = score;
            }
        });
    });

    // Convert player scores to an array of objects with names and scores
    const sortedPlayerScores = Object.keys(playerScores).map(playerName => ({ name: playerName, score: playerScores[playerName] }));

    // Sort player scores based on scores
    sortedPlayerScores.sort((a, b) => b.score - a.score);

    return sortedPlayerScores;
};
