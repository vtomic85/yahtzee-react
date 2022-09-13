import "./DiceField.css";

const DiceField = ({ value, onClick }) => {
  return (
    <button className={`dice-field background${value}`} onClick={onClick} />
  );
};

export default DiceField;
