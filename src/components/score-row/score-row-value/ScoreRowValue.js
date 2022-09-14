import "./ScoreRowValue.css";

const ScoreRowValue = ({ value, isTotal, storedResult }) => {
  return (
    <div
      className={`score-row-value ${
        isTotal ? "" : storedResult ? "stored" : "not-stored"
      }`}
    >
      {value}
    </div>
  );
};

export default ScoreRowValue;
