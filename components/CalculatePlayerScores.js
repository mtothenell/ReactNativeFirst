export const calculatePlayerScores = (tournamentData) => {
    const roundData = tournamentData.roundData;
    const playerScores = {};

    roundData.forEach((round) => {

        const typeOfPlayerNames = tournamentData.type === "Americano" ? round.playerTest : round.playerNames;
        typeOfPlayerNames.forEach((player, index) => {

            const playerName = player.name;
            let score = player.score || 0;
            let wins = player.wins || 0;

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

            let winnerIndex;
            if (index % 2 === 0) {
                winnerIndex = value1 > value2 ? index : index + 1;
            } else {
                winnerIndex = value1 > value2 ? index - 1 : index;
            }

            if (winnerIndex === index) {
                wins++;
            }

            if (index === 0 || index === 2 || index === 4 || index === 6 || index === 8 || index === 10 || index === 12 || index === 14) {
                score = value1;
            }
            if (index === 1 || index === 3 || index === 5 || index === 7 || index === 9 || index === 11 || index === 13 || index === 15) {
                score = value2;
            }

            if (playerScores[playerName]) {
                playerScores[playerName].score += score;
                playerScores[playerName].wins = wins;
            } else {
                playerScores[playerName] = {name: playerName, score, wins};
            }
        });
    });

    // Convert player scores to an array of objects with names and scores
    const sortedPlayerScores = Object.values(playerScores);

    // Sort player scores based on scores
    sortedPlayerScores.sort((a, b) => b.score - a.score);

    return sortedPlayerScores;
};
