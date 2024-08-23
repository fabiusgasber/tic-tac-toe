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

    const playRound = (row, col) => {
            console.log(`Inserting at row ${row} and column ${col}...`);
            gameboard.insertToken(row, col, activePlayer);
            console.table(board);
            if(!isWinner(activePlayer) && !isTie()){
                switchPlayer();
                printNewRound();
            }
            else if(isWinner(activePlayer)) {
               console.log(`${activePlayer.name} has won the game`);
               return;
            }
            else {
                console.log(`It's a tie game`);
                return;
            }
    }

    const getActivePlayer = () => {
       return players.find(player => player.getActive() === true);
    }

    const getPlayerTokens = () => {
        return players.map(player => player.token);
    }

    const isTie = () => {
        const playerTokens = getPlayerTokens();
        return board.every(innerArr => innerArr.every(cell => playerTokens.includes(cell)));
    }

    const isWinner = (activePlayer) => {
        let flatArr = board.flat()
        
        let tokenArr = flatArr.map((cell, index) => cell === activePlayer.token ? index : -1).filter(index => index !== -1).sort();

        let winningIndexes = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7], 
            [2, 5, 8], 
            [0, 4, 8],
            [2, 4, 6],
        ];
        
        return winningIndexes.some(subArr => subArr.every(value => tokenArr.includes(value)));
    }


    return { startGame, playRound, getPlayerTokens };
})();

