import { useEffect, useState } from "react";
import ScoreBoard from "../score-board/ScoreBoard";
import CurrentAttempt from "../current-attempt/CurrentAttempt";
import KeepArray from "../keep-array/KeepArray";
import CommandButton from "../roll-button/CommandButton";
import "./Game.css";

const Game = () => {
  const [storedResults, setStoredResults] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isResultStored, setIsResultStored] = useState(false);
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
      (storedResults[0] ? ones : 0) +
        (storedResults[1] ? twos : 0) +
        (storedResults[2] ? threes : 0) +
        (storedResults[3] ? fours : 0) +
        (storedResults[4] ? fives : 0) +
        (storedResults[5] ? sixes : 0) +
        (storedResults[6] ? threeOfKind : 0) +
        (storedResults[7] ? fourOfKind : 0) +
        (storedResults[8] ? fullHouse : 0) +
        (storedResults[9] ? smallStraight : 0) +
        (storedResults[10] ? largeStraight : 0) +
        (storedResults[11] ? yahtzee : 0) +
        (storedResults[12] ? chance : 0)
    );
  };

  const resetAll = () => {
    setStoredResults([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    setIsResultStored(false);
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
    setIsResultStored(true);
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
    setIsResultStored(false);
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
      if (!isResultStored) {
        // Check individual values
        if (!storedResults[0]) setOnes(counter[0]);
        if (!storedResults[1]) setTwos(counter[1] * 2);
        if (!storedResults[2]) setThrees(counter[2] * 3);
        if (!storedResults[3]) setFours(counter[3] * 4);
        if (!storedResults[4]) setFives(counter[4] * 5);
        if (!storedResults[5]) setSixes(counter[5] * 6);

        // Check three of kind
        if (!storedResults[6]) {
          for (let i = 0; i < 6; i++) {
            if (counter[i] >= 3) {
              setThreeOfKind(3 * (i + 1));
            }
          }
        }

        // Check four of kind
        if (!storedResults[7]) {
          for (let i = 0; i < 6; i++) {
            if (counter[i] >= 4) {
              setFourOfKind(4 * (i + 1));
            }
          }
        }

        // Check full house
        if (!storedResults[8]) {
          for (let i = 0; i < 6; i++) {
            if (counter[i] >= 3) {
              for (let j = 0; j < 6; j++) {
                if (j !== i && counter[j] >= 2) {
                  setFullHouse(25);
                }
              }
            }
          }
        }

        // Check small straight
        if (!storedResults[9]) {
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
        }

        // Check large straight
        if (!storedResults[10]) {
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
        }

        // Check yahtzee
        if (!storedResults[11]) {
          for (let i = 0; i < 6; i++) {
            if (counter[i] >= 5) {
              setYahtzee(50);
            }
          }
        }

        // Check chance
        if (!storedResults[12]) {
          setChance(
            allValues[0] +
              allValues[1] +
              allValues[2] +
              allValues[3] +
              allValues[4] +
              allValues[5]
          );
        }
      } else {
        setOnes(!storedResults[0] ? 0 : ones);
        setTwos(!storedResults[1] ? 0 : twos);
        setThrees(!storedResults[2] ? 0 : threes);
        setFours(!storedResults[3] ? 0 : fours);
        setFives(!storedResults[4] ? 0 : fives);
        setSixes(!storedResults[5] ? 0 : sixes);
        setThreeOfKind(!storedResults[6] ? 0 : threeOfKind);
        setFourOfKind(!storedResults[7] ? 0 : fourOfKind);
        setFullHouse(!storedResults[8] ? 0 : fullHouse);
        setSmallStraight(!storedResults[9] ? 0 : smallStraight);
        setLargeStraight(!storedResults[10] ? 0 : largeStraight);
        setYahtzee(!storedResults[11] ? 0 : yahtzee);
        setChance(!storedResults[12] ? 0 : chance);
      }
    };
    calculatePossibleScores();
  }, [currentValues, keepValues, storedResults, isResultStored, resetAll]);

  const storeResult = (index) => {
    let newStoredResults = [...storedResults];
    newStoredResults[index] = !storedResults[index];
    setStoredResults(newStoredResults);
    setIsResultStored(true);
    setAttempt(0);
    setCurrentValues([0, 0, 0, 0, 0, 0]);
    setKeepValues([0, 0, 0, 0, 0, 0]);
  };

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
          storedResults={storedResults}
          storeResult={storeResult}
          isResultStored={isResultStored}
        />
      </div>
    </div>
  );
};

export default Game;
