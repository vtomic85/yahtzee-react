import { useEffect, useState } from "react";
import ScoreBoard from "../score-board/ScoreBoard";
import CurrentAttempt from "../current-attempt/CurrentAttempt";
import KeepArray from "../keep-array/KeepArray";
import CommandButton from "../roll-button/CommandButton";
import "./Game.css";

const Game = () => {
  const [ones, setOnes] = useState(0);
  const [twos, setTwos] = useState(0);
  const [threes, setThrees] = useState(0);
  const [fours, setFours] = useState(0);
  const [fives, setFives] = useState(0);
  const [sixes, setSixes] = useState(0);
  const [threeOfKind, setThreeOfKind] = useState(0);
  const [fourOfKind, setFourOfKind] = useState(0);
  const [fullHouse, setFullHouse] = useState(0);
  const [smallStraight, setSmallStraight] = useState(0);
  const [largeStraight, setLargeStraight] = useState(0);
  const [yahtzee, setYahtzee] = useState(0);
  const [chance, setChance] = useState(0);
  const [total, setTotal] = useState(0);
  const [attempt, setAttempt] = useState(0);

  const calculateAndSetTotal = () => {
    setTotal(
      ones +
        twos +
        threes +
        fours +
        fives +
        sixes +
        threeOfKind +
        fourOfKind +
        fullHouse +
        smallStraight +
        largeStraight +
        yahtzee +
        chance
    );
  };

  const resetAll = () => {
    setOnes(0);
    setTwos(0);
    setThrees(0);
    setFours(0);
    setFives(0);
    setSixes(0);
    setThreeOfKind(0);
    setFourOfKind(0);
    setFullHouse(0);
    setSmallStraight(0);
    setLargeStraight(0);
    setYahtzee(0);
    setChance(0);
    calculateAndSetTotal();
  };

  const newGame = () => {
    resetAll();
    setCurrentValues([0, 0, 0, 0, 0, 0]);
    setKeepValues([0, 0, 0, 0, 0, 0]);
    setTotal(0);
    setAttempt(0);
  };

  useEffect(() => {
    resetAll();
  }, []);

  const [currentValues, setCurrentValues] = useState([0, 0, 0, 0, 0, 0]);
  const [keepValues, setKeepValues] = useState([0, 0, 0, 0, 0, 0]);

  const rollDices = () => {
    let newValues = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 6; i++) {
      if (keepValues[i] === 0) {
        newValues[i] = Math.floor(Math.random() * 6) + 1;
      }
    }
    setCurrentValues([...newValues]);
    setAttempt((prev) => prev + 1);
  };

  const moveCurrentToKeep = (index) => {
    if (currentValues[index] > 0) {
      let curr = [...currentValues];
      let keep = [...keepValues];
      let valueToSwitch = curr[index];
      curr[index] = 0;
      keep[index] = valueToSwitch;
      setCurrentValues(curr);
      setKeepValues(keep);
    }
  };

  const moveKeepToCurrent = (index) => {
    if (keepValues[index] > 0) {
      let curr = [...currentValues];
      let keep = [...keepValues];
      let valueToSwitch = keep[index];
      keep[index] = 0;
      curr[index] = valueToSwitch;
      setCurrentValues(curr);
      setKeepValues(keep);
    }
  };

  useEffect(() => {
    const calculatePossibleScores = () => {
      let allValues = [0, 0, 0, 0, 0, 0];
      let counter = [0, 0, 0, 0, 0, 0];
      for (let i = 0; i < 6; i++) {
        if (currentValues[i] > 0) {
          allValues[i] = currentValues[i];
          counter[allValues[i] - 1]++;
        }
        if (keepValues[i] > 0) {
          allValues[i] = keepValues[i];
          counter[allValues[i] - 1]++;
        }
      }

      // Check individual values
      setOnes(counter[0]);
      setTwos(counter[1] * 2);
      setThrees(counter[2] * 3);
      setFours(counter[3] * 4);
      setFives(counter[4] * 5);
      setSixes(counter[5] * 6);

      // Check three of kind
      for (let i = 0; i < 6; i++) {
        if (counter[i] >= 3) {
          setThreeOfKind(3 * (i + 1));
        }
      }
      // Check four of kind
      for (let i = 0; i < 6; i++) {
        if (counter[i] >= 4) {
          setFourOfKind(4 * (i + 1));
        }
      }

      // Check full house
      for (let i = 0; i < 6; i++) {
        if (counter[i] >= 3) {
          for (let j = 0; j < 6; j++) {
            if (j !== i && counter[j] >= 2) {
              setFullHouse(25);
            }
          }
        }
      }

      // Check small straight
      if (
        (counter[0] >= 1 &&
          counter[1] >= 1 &&
          counter[2] >= 1 &&
          counter[3] >= 1) ||
        (counter[1] >= 1 &&
          counter[2] >= 1 &&
          counter[3] >= 1 &&
          counter[4] >= 1) ||
        (counter[2] >= 1 &&
          counter[3] >= 1 &&
          counter[4] >= 1 &&
          counter[5] >= 1)
      ) {
        setSmallStraight(30);
      }

      // Check large straight
      if (
        (counter[0] >= 1 &&
          counter[1] >= 1 &&
          counter[2] >= 1 &&
          counter[3] >= 1 &&
          counter[4] >= 1) ||
        (counter[1] >= 1 &&
          counter[2] >= 1 &&
          counter[3] >= 1 &&
          counter[4] >= 1 &&
          counter[5] >= 1)
      ) {
        setLargeStraight(40);
      }

      // Check yahtzee
      for (let i = 0; i < 6; i++) {
        if (counter[i] >= 5) {
          setYahtzee(50);
        }
      }

      // Check chance
      setChance(
        allValues[0] +
          allValues[1] +
          allValues[2] +
          allValues[3] +
          allValues[4] +
          allValues[5]
      );
    };
    calculatePossibleScores();
  }, [currentValues, keepValues, resetAll]);

  return (
    <div className="game">
      <div className="pane">
        <CurrentAttempt
          values={currentValues}
          onDiceClicked={moveCurrentToKeep}
        />
        <KeepArray values={keepValues} onDiceClicked={moveKeepToCurrent} />
        <CommandButton onClick={rollDices} attempt={attempt} type="roll" />
        <CommandButton onClick={newGame} attempt={attempt} type="new-game" />
      </div>
      <div className="pane">
        <ScoreBoard
          ones={ones}
          twos={twos}
          threes={threes}
          fours={fours}
          fives={fives}
          sixes={sixes}
          threeOfKind={threeOfKind}
          fourOfKind={fourOfKind}
          fullHouse={fullHouse}
          smallStraight={smallStraight}
          largeStraight={largeStraight}
          yahtzee={yahtzee}
          chance={chance}
          total={total}
        />
      </div>
    </div>
  );
};

export default Game;
