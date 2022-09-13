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
}) => {
  return (
    <div className="score-board">
      <div className="score-board-group">
        <ScoreRow label={"Ones"} value={ones} />
        <ScoreRow label={"Twos"} value={twos} />
        <ScoreRow label={"Threes"} value={threes} />
        <ScoreRow label={"Fours"} value={fours} />
        <ScoreRow label={"Fives"} value={fives} />
        <ScoreRow label={"Sixes"} value={sixes} />
      </div>
      <div className="score-board-group">
        <ScoreRow label={"Three of kind"} value={threeOfKind} />
        <ScoreRow label={"Four of kind"} value={fourOfKind} />
        <ScoreRow label={"Full house"} value={fullHouse} />
        <ScoreRow label={"Small straight"} value={smallStraight} />
        <ScoreRow label={"Large straight"} value={largeStraight} />
        <ScoreRow label={"Yahtzee"} value={yahtzee} />
        <ScoreRow label={"Chance"} value={chance} />
      </div>
      <div className="score-board-group">
        <ScoreRow label={"TOTAL"} value={total} isTotal={true} />
      </div>
    </div>
  );
};
export default ScoreBoard;
