export const calculatePlayerScores = (tournamentData) => {
    const roundData = tournamentData.roundData;
    console.log(JSON.stringify(roundData));

    const playerScores = {};

    roundData.forEach((round) => {
        const selectedValues = round.selectedValues[0];
        const value1 = parseInt(selectedValues.value1); // playerIndex = 0,1
        const value2 = parseInt(selectedValues.value2); // playerIndex = 2,3

        round.playerNames.forEach((player, playerIndex) => {
            const playerName = player.name;

            let score;
            if (playerIndex < 2) {
                score = value1;
            } else {
                score = value2;
            }

            if (playerScores[playerName]) {
                playerScores[playerName] += score;
            } else {
                playerScores[playerName] = score;
            }
        });
    });
    return playerScores;
}
