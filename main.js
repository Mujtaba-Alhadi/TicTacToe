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
    if (isGameOver) return;
    Gameboard.putMarker(index, currentPlayer.marker);
    const board = Gameboard.getBoard();

    console.log(currentPlayer.name);
    console.log(board);
    // Check for a win
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
        console.log(`${currentPlayer.name} wins!`);
        isGameOver = true;
        return;
      }
    }
    // Check for a Tie
    let isTie = true;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        isTie = false;
        break;
      }
    }
    if (isTie) {
      console.log("It's a Tie!");
      isGameOver = true;
      return;
    }
    // Switch Player
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  return { playRound, currentPlayer };
})();

GameController.playRound(0);
GameController.playRound(1);
GameController.playRound(2);
GameController.playRound(4);
GameController.playRound(3);
GameController.playRound(5);
GameController.playRound(7);
GameController.playRound(6);
GameController.playRound(8);
GameController.playRound(8);