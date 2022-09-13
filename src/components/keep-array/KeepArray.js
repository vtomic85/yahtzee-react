import "./KeepArray.css";
import DiceField from "../dice-field/DiceField";

const KeepArray = ({ values, onDiceClicked }) => {
  return (
    <div className="keep-array">
      <p>Dices to keep</p>
      <div className="dices">
        <DiceField value={values[0]} onClick={() => onDiceClicked(0)} />
        <DiceField value={values[1]} onClick={() => onDiceClicked(1)} />
        <DiceField value={values[2]} onClick={() => onDiceClicked(2)} />
        <DiceField value={values[3]} onClick={() => onDiceClicked(3)} />
        <DiceField value={values[4]} onClick={() => onDiceClicked(4)} />
        <DiceField value={values[5]} onClick={() => onDiceClicked(5)} />
      </div>
    </div>
  );
};

export default KeepArray;
