import "./CommandButton.css";

const CommandButton = ({ onClick, attempt, type }) => {
  return (
    <div className="command-button">
      <button
        onClick={onClick}
        disabled={type === "roll" ? attempt === 3 : false}
      >
        <p>{type === "roll" ? "Roll" : "New Game"}</p>
        <p>
          {type === "roll"
            ? attempt < 3
              ? `Attempt ${attempt + 1}/3`
              : `No more attempts`
            : null}
        </p>
      </button>
    </div>
  );
};

export default CommandButton;
