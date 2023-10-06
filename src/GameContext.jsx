import { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext();

function GameProvider({ children }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlayer, setXPlayer] = useState(true);
  const [scores, setScores] = useState(function () {
    const xScore = JSON.parse(localStorage.getItem("xScore") || 0);
    const oScore = JSON.parse(localStorage.getItem("oScore") || 0);
    return { xScore, oScore };
  });

  useEffect(
    function () {
      localStorage.setItem("xScore", JSON.stringify(scores.xScore));
      localStorage.setItem("oScore", JSON.stringify(scores.oScore));
    },
    [scores]
  );
  const [gameOver, setGameOver] = useState(false);
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

  function resetBoard() {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  }
  function checkWinner(board) {
    for (let i = 0; i < winConditions.length; i++) {
      const [x, y, z] = winConditions[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  }
  function handleBoxClick(indexId) {
    const updatedBoard = board.map((value, boxIndexId) => {
      if (boxIndexId === indexId) {
        return xPlayer ? "X" : "O";
      } else {
        return value;
      }
    });
    const winner = checkWinner(updatedBoard);
    if (winner) {
      if (winner === "X") {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore });
      } else {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
      }
    }
    setBoard(updatedBoard);
    setXPlayer(!xPlayer);
  }

  return (
    <GameContext.Provider
      value={{ board, handleBoxClick, scores, xPlayer, gameOver, resetBoard }}
    >
      {children}
    </GameContext.Provider>
  );
}

function useGame() {
  const context = useContext(GameContext);
  if (context === undefined)
    throw new Error("GameContext used outside of the provider");
  return context;
}
export { GameProvider, useGame };
