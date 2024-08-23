const gameboard = (function () {
    const board = [];
    const rows = 3;
    const cols = 3;

    const initializeBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = []
            for (let j = 0; j < cols; j++) {
                board[i][j] = null;
            }
        }
    }

    const insertToken = (row, col, activePlayer) => {
        if(row <= 2 && row >= 0 && col <= 2 && col >= 0 && board[row][col] === null && activePlayer.getToken() && activePlayer.getActive())  {
            board[row][col] = activePlayer?.getToken();
            return true;
        }
        return false;
    }


    const getBoard = () => board;

    return { getBoard, insertToken, initializeBoard };
})();

const createPlayer = (token) => {

    let active = false;

    const getActive = () => active;

    const setActive = (isActive) => active = isActive; 

    const getToken = () => token;
    
    return { getToken, getActive, setActive };
}

const gameManager = (function () {

    const players = [
        createPlayer('X'),
        createPlayer('O')
    ]

    let activePlayer = null;
    const board = gameboard.getBoard()

    const startGame = () => {
        gameboard.initializeBoard();
        players[0].setActive(true);
        activePlayer = players[0];
        console.log("X make your turn...")
    }

    const switchPlayer = () => {
        players.forEach(player => player.setActive(!player.getActive()));
        activePlayer = getActivePlayer();
    }

    const printNewRound = () => {
        console.log(`${activePlayer.getToken()} make your turn...`)
    }

    const playRound = (row, col) => {
            console.log(`Inserting at row ${row} and column ${col}...`);
            if(gameboard.insertToken(row, col, activePlayer)){
                console.table(board);
                if(!isWinner(activePlayer) && !isTie()){
                    switchPlayer();
                    printNewRound();
                }
                else if(isWinner(activePlayer)) {
                   console.log(`${activePlayer.getToken()} has won the game`);
                   gameboard.initializeBoard();
                }
                else if(isTie()) {
                    console.log(`It's a tie game`);
                    gameboard.initializeBoard();
                }
            }
            else {
                console.log('Already occupied. Choose another row / col');
                printNewRound();
            }
    }

    const getActivePlayer = () => {
       return players.find(player => player.getActive() === true);
    }

    const getPlayerTokens = () => {
        return players.map(player => player.getToken());
    }

    const isTie = () => {
        const playerTokens = getPlayerTokens();
        return board.every(innerArr => innerArr.every(cell => playerTokens.includes(cell)));
    }

    const isWinner = (activePlayer) => {
        let flatArr = board.flat()
        
        let tokenArr = flatArr.map((cell, index) => cell === activePlayer.getToken() ? index : -1).filter(index => index !== -1).sort();

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


    return { startGame, playRound };
})();

gameManager.startGame();