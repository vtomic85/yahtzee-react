import "./ScoreBoard.css";
import ScoreRow from "../score-row/ScoreRow";

const ScoreBoard = ({
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance,
  total,
  storedResults,
  storeResult,
  isResultStored,
}) => {
  return (
    <div className="score-board">
      <div className="score-board-group">
        <ScoreRow
          label={"Ones"}
          value={ones}
          storedResult={storedResults[0]}
          storeResult={
            isResultStored || storedResults[0] ? null : () => storeResult(0)
          }
        />
        <ScoreRow
          label={"Twos"}
          value={twos}
          storedResult={storedResults[1]}
          storeResult={
            isResultStored || storedResults[1] ? null : () => storeResult(1)
          }
        />
        <ScoreRow
          label={"Threes"}
          value={threes}
          storedResult={storedResults[2]}
          storeResult={
            isResultStored || storedResults[2] ? null : () => storeResult(2)
          }
        />
        <ScoreRow
          label={"Fours"}
          value={fours}
          storedResult={storedResults[3]}
          storeResult={
            isResultStored || storedResults[3] ? null : () => storeResult(3)
          }
        />
        <ScoreRow
          label={"Fives"}
          value={fives}
          storedResult={storedResults[4]}
          storeResult={
            isResultStored || storedResults[4] ? null : () => storeResult(4)
          }
        />
        <ScoreRow
          label={"Sixes"}
          value={sixes}
          storedResult={storedResults[5]}
          storeResult={
            isResultStored || storedResults[5] ? null : () => storeResult(5)
          }
        />
      </div>
      <div className="score-board-group">
        <ScoreRow
          label={"Three of kind"}
          value={threeOfKind}
          storedResult={storedResults[6]}
          storeResult={
            isResultStored || storedResults[6] ? null : () => storeResult(6)
          }
        />
        <ScoreRow
          label={"Four of kind"}
          value={fourOfKind}
          storedResult={storedResults[7]}
          storeResult={
            isResultStored || storedResults[7] ? null : () => storeResult(7)
          }
        />
        <ScoreRow
          label={"Full house"}
          value={fullHouse}
          storedResult={storedResults[8]}
          storeResult={
            isResultStored || storedResults[8] ? null : () => storeResult(8)
          }
        />
        <ScoreRow
          label={"Small straight"}
          value={smallStraight}
          storedResult={storedResults[9]}
          storeResult={
            isResultStored || storedResults[9] ? null : () => storeResult(9)
          }
        />
        <ScoreRow
          label={"Large straight"}
          value={largeStraight}
          storedResult={storedResults[10]}
          storeResult={
            isResultStored || storedResults[10] ? null : () => storeResult(10)
          }
        />
        <ScoreRow
          label={"Yahtzee"}
          value={yahtzee}
          storedResult={storedResults[11]}
          storeResult={
            isResultStored || storedResults[11] ? null : () => storeResult(11)
          }
        />
        <ScoreRow
          label={"Chance"}
          value={chance}
          storedResult={storedResults[12]}
          storeResult={
            isResultStored || storedResults[12] ? null : () => storeResult(12)
          }
        />
      </div>
      <div className="score-board-group">
        <ScoreRow label={"TOTAL"} value={total} isTotal={true} />
      </div>
    </div>
  );
};
export default ScoreBoard;
