function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const putMarker = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
    } else return;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const getBoard = () => board;
  return { getBoard, putMarker, resetBoard };
})();

const GameController = (function () {
  const playerX = new Player("Player X", "X");
  const playerO = new Player("Player O", "O");
  let currentPlayer = playerX;
  let isGameOver = false;
  let winner = null;
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const playRound = (index) => {
    const board = Gameboard.getBoard();

    if (isGameOver) return;
    if (board[index] !== "") return "Spot Already Taken!";

    Gameboard.putMarker(index, currentPlayer.marker);

    // console.log(board);
    // Check for a win
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
        isGameOver = true;
        winner = `${currentPlayer.name} Wins!`;
        return;
      }
    }
    // Check for a Tie
    if (board.every((cell) => cell !== "")) {
      isGameOver = true;
      winner = "It's a Tie!";
      return;
    }
    // Switch Player
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const getCurrentPlayer = () => currentPlayer;
  const getWinner = () => winner;
  const resetGame = () => {
    Gameboard.resetBoard();
    currentPlayer = playerX;
    isGameOver = false;
    winner = null;
  };

  return { playRound, getCurrentPlayer, resetGame, getWinner };
})();

const DisplayGame = function () {
  const cells = document.querySelectorAll(".cell");
  const resetBtn = document.querySelector(".reset");
  const statusText = document.querySelector(".status");

  function renderContent() {
    const board = Gameboard.getBoard();
    for (let i = 0; i < board.length; i++) {
      cells[i].textContent = board[i];
    }
  }

  function addMarker() {
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener("click", () => {
        let gameStatus = GameController.playRound(i);

        if (gameStatus) {
          statusText.textContent = gameStatus; // "Spot Already Taken" status
        } else if (GameController.getWinner()) {
          statusText.textContent = GameController.getWinner();
        } else {
          statusText.textContent = `${
            GameController.getCurrentPlayer().name
          } Turn`;
        }

        renderContent();
      });
    }
  }

    resetBtn.addEventListener("click", () => {
      GameController.resetGame();
      renderContent();
      statusText.textContent = `${GameController.getCurrentPlayer().name} Turn`;
    });

  addMarker();
};

DisplayGame();