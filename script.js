function createPlayer(name, token) {

    let active = false;

    const getActive = () => active;

    const setActive = (isActive) => active = isActive; 
    
    return { name, token, getActive, setActive };
}

const gameManager = (function () {

    const players = [
        createPlayer('player1', 'X'),
        createPlayer('player2', 'O')
    ]

    let activePlayer = null;
    const board = gameboard.getBoard()

    const startGame = () => {
        players[0].setActive(true);
        activePlayer = players[0];
        console.log("Player 1 make your turn...")
    }

    const switchPlayer = () => {
        players.forEach(player => player.setActive(!player.getActive()));
        activePlayer = getActivePlayer();
    }

    const printNewRound = () => {
        console.log(`${activePlayer.name} make your turn...`)
    }

    const getActivePlayer = () => {
       return players.find(player => player.getActive() === true);
    }


    return { startGame, playRound, getPlayerTokens };
})();

