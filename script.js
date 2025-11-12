//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const inputSection = document.getElementById("input-section");
const gameSection = document.getElementById("game-section");
const messageDiv = document.getElementById("message");
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameActive = true;

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter both player names!");
    return;
  }

  inputSection.style.display = "none";
  gameSection.style.display = "block";
  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up!`;
});

board.addEventListener("click", (e) => {
  const target = e.target;
  if (!gameActive) return;
  if (!target.classList.contains("cell") || target.textContent !== "") return;

  target.textContent = currentSymbol;

  if (checkWinner()) {
    messageDiv.textContent = `${currentPlayer}, congratulations you won! 🎉`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    messageDiv.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  switchPlayer();
});

function switchPlayer() {
  if (currentSymbol === "X") {
    currentSymbol = "O";
    currentPlayer = player2;
  } else {
    currentSymbol = "X";
    currentPlayer = player1;
  }
  messageDiv.textContent = `${currentPlayer}, you're up!`;
}

function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return document.getElementById(index).textContent === currentSymbol;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

