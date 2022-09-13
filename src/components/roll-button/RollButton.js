import "./RollButton.css";

const RollButton = ({ onClick, attempt }) => {
  return (
    <div className="roll-button">
      <button onClick={onClick} disabled={attempt === 3}>
        <p>Roll</p>
        {attempt < 3 && <p>Attempt #{attempt + 1}</p>}
        {attempt >= 3 && <p>No more attempts</p>}
      </button>
    </div>
  );
};

export default RollButton;
