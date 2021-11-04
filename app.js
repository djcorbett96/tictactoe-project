let playerOne;
let playerTwo;
class Player {
    constructor(playerNumber, name, token) {
        this.playerNumber = playerNumber;
        this.name = name;
        this.token = token;
    }
}

const gameBoard = (() => {
    const gameSquaresSelector = document.querySelectorAll('.square');
    const gameArray = Array.from(gameSquaresSelector);
    const activateSquares = function () {
        gameArray.forEach(square => {
            square.addEventListener("click", gameController.clickFunction, {once : true});
        })
    };

    return {
      gameArray,
      activateSquares  
    };
})();

const gameController = (function () {
    let currentPlayer;
    const nameForm = document.querySelector('form');
    const startButton = document.querySelector('#startBtn');
    const restartButton = document.querySelector('.startOver');
    const homeButton = document.querySelectorAll('.returnHomeBtn');
    const startScreen = document.querySelector('.startScreen');
    const currentTurnTextSelector = document.querySelector('.turnText');
    const winScreenSelector = document.querySelector('.winScreen');
    const winTextSelector = document.querySelector('.winText');
    const playAgainBtnSelector = document.querySelector('.playAgainBtn')
    const gameArray = gameBoard.gameArray;
    const restartButtonActive = function () {
        restartButton.addEventListener('click', () => {
            clearBoard();
        });
    };
    const triggerWin = function () {
        winScreenSelector.classList.remove("hideScreen");
        winTextSelector.innerText = `${currentPlayer.name} is the winner!`;
        clearBoard();
    };
    const clearBoard = function () {
        for (let square of gameBoard.gameArray) {
            square.innerText = '';
            gameBoard.activateSquares();
            currentTurnTextSelector.innerText = `${playerOne.name} to Move`;
        }
    };
    const startFunction = () => {
        startButton.onclick = () => {
            let oneInput = document.getElementById('oneName').value;
            let twoInput = document.getElementById('twoName').value;
            playerOne = new Player(1, oneInput, 'X');
            playerTwo = new Player(2, twoInput, 'O');
            currentPlayer = playerOne;
            startScreen.classList.add('hideScreen');
            currentTurnTextSelector.innerText = `${playerOne.name} to Move`
            gameBoard.activateSquares();
        };
    };
    const activateRestartButton = function () {
        homeButton.forEach(button => {
            button.addEventListener('click', () => {
                clearBoard();
                startScreen.classList.remove('hideScreen');
                winScreenSelector.classList.add('hideScreen');
                nameForm.reset();
            });
        });
    };
    const checkWin = function () {
        // check for row win
        for (let i = 0; i < gameArray.length; i+=3) {
            if (gameArray[i].innerText === gameArray[i+1].innerText && gameArray[i].innerText === gameArray[i+2].innerText && gameArray[i].innerText !== '') {
                triggerWin();
            }
        }
        // check for  column win
        for (let i = 0; i < 3; i++) {
            if (gameArray[i].innerText === gameArray[i+3].innerText && gameArray[i].innerText === gameArray[i+6].innerText && gameArray[i].innerText !== '') {
                triggerWin();
            }
        }
        // check for right diagonal win
        if (gameArray[0].innerText === gameArray[4].innerText && gameArray[0].innerText === gameArray[8].innerText && gameArray[0].innerText !== '') {
            triggerWin();
        }
        // check for left diagonal win
        if (gameArray[2].innerText === gameArray[4].innerText && gameArray[2].innerText === gameArray[6].innerText && gameArray[2].innerText !== '') {
            triggerWin();
        }
        // check for a tie
        const gameArrayText = gameArray.map(square => square.innerText);
        if (gameArrayText.indexOf('') === -1) {
            winScreenSelector.classList.remove("hideScreen");
            winTextSelector.innerText = "It's a tie!";
        }
    };
    const clickFunction = function (square) {
        // assign the current turn token value to the square and change the current turn text
        if (currentPlayer.playerNumber === 1) {
            this.innerText = playerOne.token;
            checkWin();
            currentPlayer = playerTwo;
            currentTurnTextSelector.innerText = `${currentPlayer.name} to Move`;
        } else {
            this.innerText = playerTwo.token;
            checkWin();
            currentPlayer = playerOne;
            currentTurnTextSelector.innerText = `${currentPlayer.name} to Move`;
        }
    };
    const restartSquareListeners = function () {
        playAgainBtnSelector.addEventListener('click', () => {
            for (let square of gameBoard.gameArray) {
                square.innerText = '';
                playerOneTurn = true;
                winScreenSelector.classList.add('hideScreen');
                square.addEventListener("click", clickFunction, {once : true});
            }
        })
    }

    return {
        restartSquareListeners,
        activateRestartButton,
        clickFunction,
        startFunction,
        restartButtonActive
    };
})();

gameController.startFunction();

gameController.activateRestartButton();

gameController.restartButtonActive();

gameBoard.activateSquares();

gameController.restartSquareListeners();

