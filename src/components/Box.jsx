import { useGame } from "../GameContext";
import styles from "./Box.module.css";
function Box() {
  const {
    board,
    handleBoxClick,
    xPlayer,
    gameOver,
    resetBoard,
    scores: { xScore, oScore },
  } = useGame();
  console.log(xScore, oScore);
  return (
    <div>
      <div className={styles.scoreBoard}>
        <span className={`${styles.xScore} ${xPlayer && styles.xActive}`}>
          (X Score - {xScore})
        </span>
        <span className={`${styles.oScore} ${!xPlayer && styles.oActive}`}>
          (O Score - {oScore})
        </span>
      </div>
      <div className={styles.mainBox}>
        {board.map((value, index) => (
          <button
            key={index}
            className={`${styles.box} ${
              value === "X" ? styles.xbox : styles.obox
            }`}
            onClick={() =>
              gameOver ? resetBoard : value === null && handleBoxClick(index)
            }
          >
            {value}
          </button>
        ))}
      </div>
      <div className={styles.resetBox}>
        <button className={styles.resetBtn} onClick={resetBoard}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Box;
