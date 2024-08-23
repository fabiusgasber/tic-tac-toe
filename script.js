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

    return { startGame, playRound, getPlayerTokens };
})();

