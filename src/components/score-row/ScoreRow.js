import ScoreRowValue from "./score-row-value/ScoreRowValue";
import ScoreRowLabel from "./score-row-label/ScoreRowLabel";
import "./ScoreRow.css";

const ScoreRow = ({ label, value, isTotal }) => {
  return (
    <div className={`score-row ${isTotal ? "total" : ""}`}>
      <ScoreRowLabel label={label} />
      <ScoreRowValue value={value ?? 0} />
    </div>
  );
};

export default ScoreRow;
