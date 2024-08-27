const gameboard = (function () {
    const board = [];
    const cells = 9;

    const resetBoard = () => {
        for (let i = 0; i < cells; i++) {
                board[i] = null;
        }
    }

    const insertToken = (index, activePlayer) => {
        if(board[index] === null && activePlayer.getToken() && activePlayer.getActive())  {
            board[index] = activePlayer?.getToken();
            return true;
        }
        return false;
    }


    const getBoard = () => board;

    return { getBoard, insertToken, resetBoard };
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
        gameboard.resetBoard();
        displayController.resetBoard();
        players[0].setActive(true);
        players[1].setActive(false);
        activePlayer = players[0];
        displayController.startGame();
        console.log(`${activePlayer.getToken()} make your turn...`)
    }

    const switchPlayer = () => {
        players.forEach(player => player.setActive(!player.getActive()));
        activePlayer = getActivePlayer();
    }

    const playRound = (event, index) => {
            if(gameboard.insertToken(index, activePlayer)){
                displayController.displayToken(event, activePlayer);
                if(!isWinner(activePlayer) && !isTie()){
                    switchPlayer();
                    console.log(`${activePlayer.getToken()} make your turn...`)
                }
                else if(isWinner(activePlayer)) {
                   console.log(`${activePlayer.getToken()} has won the game`);
                   displayController.stopGame();
                }
                else if(isTie()) {
                    console.log(`It's a tie game`);
                    displayController.stopGame();
                }
            }
            else {
                console.log('Already occupied. Choose another row / col');
            }
    }

    const getActivePlayer = () => {
       return players.find(player => player.getActive() === true);
    }

    const isTie = () => {
        return board.every(cell => cell !== null);
    }

    const isWinner = (activePlayer) => {
        
        let tokenArr = board.map((cell, index) => cell === activePlayer.getToken() ? index : -1).filter(index => index !== -1).sort();

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

const displayController = (() => {
    const gameboard = document.querySelector('#gameboard');
    const restartButton = document.querySelector('#restart');
    const cells = Array.from(gameboard.children);

    restartButton.addEventListener('click', gameManager.startGame);

    const handleClick = (event) => {
        const index = cells.indexOf(event.target);
        gameManager.playRound(event, index);
    }
     
    const startGame = () => {
        gameboard.addEventListener('click', handleClick);
    }

    const stopGame = () => {
        gameboard.removeEventListener('click', handleClick);
     }

    const displayToken = (event, activePlayer) => {
        event.target.textContent = activePlayer.getToken();
    }

    const resetBoard = () => {
        cells.forEach(cell => cell.textContent = "");
    }
 
    return { startGame, stopGame, displayToken, resetBoard }
})();

gameManager.startGame();