import ScoreRowValue from "./score-row-value/ScoreRowValue";
import ScoreRowLabel from "./score-row-label/ScoreRowLabel";
import "./ScoreRow.css";

const ScoreRow = ({ label, value, isTotal, storedResult, storeResult }) => {
  return (
    <div
      className={`score-row ${isTotal ? "total" : ""}`}
      onClick={storeResult}
    >
      <ScoreRowLabel label={label} />
      <ScoreRowValue
        value={value ?? 0}
        isTotal={isTotal}
        storedResult={storedResult}
      />
    </div>
  );
};

export default ScoreRow;
