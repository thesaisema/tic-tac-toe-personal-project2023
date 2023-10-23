const statusDisplay = document.querySelector('.game--status');

let gameActive = true;

// This is presumed if the current player is X.
let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

// If the player (X or O) has won, this automated message will pop up
const winningMessage = () => `Player ${currentPlayer} has won!`; 

// This message will pop up depending on who's turn it is
const drawMessage = () => `It is ${currentPlayer}'s turn`;

// FIX THIS LATER statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

// A function created to handle navigation actions
function handleCellClick(clickedCellEvent) {
    console.log('hello world');
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt (
        clickedCell.getAttribute('data-cell-index')
    );

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML= drawMessage();
        gameActive = false;
        return;
    }
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = drawMessage(); // Fixed the function call here
}


function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = drawMessage();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

