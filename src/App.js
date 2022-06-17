import React from 'react';
import './App.css';
import Dia from './Components/Dia';
import Confetti from 'react-confetti';

/*
For an extra credit work do following 
1. Add DOTs instead of number = DONE
2. Track the number of rools = DONE
3. Track the time took to Win the game
4. Save Best Time or Minimum rools into local storage
5. Add levels based on Max number of rools or Time based
game = {
  dice,
  tenzies,
  numRools,
  Time,
}
*/

function App() {
  const [dice, setDice] = React.useState(() => {
    const localDiceData = localStorage.getItem('tenziesGameData');
    const saveGameState = JSON.parse(localDiceData).game;

    return saveGameState || getInitialDiceValues();
  });

  const [tenzies, setTenzies] = React.useState(() => false);
  const [roolCount, setRoolCount] = React.useState(() => 0);

  React.useEffect(() => {
    const firstDiceValue = dice[0].value;
    const freezDices = dice.every((dia) => dia.isFreez);
    const matchedValuesDices = dice.filter(
      (dia) => dia.value === firstDiceValue
    );

    if (freezDices && matchedValuesDices) {
      setTenzies(true);
    }

    localStorage.setItem(
      'tenziesGameData',
      JSON.stringify({ game: dice, win: tenzies })
    );
  }, [dice, tenzies]);

  function getDiceRollValue() {
    return Math.ceil(Math.random() * 6);
  }

  function getInitialDiceValues() {
    const diceValues = [];
    for (let i = 0; i < 10; i++) {
      const diceState = {
        id: i,
        value: getDiceRollValue(),
        isFreez: false,
      };
      diceValues.push(diceState);
    }
    return diceValues;
  }

  function handleDiceClick(diceId) {
    setDice((prevDiceState) => {
      return prevDiceState.map((item) => {
        return item.id === diceId ? { ...item, isFreez: !item.isFreez } : item;
      });
    });
  }

  function handleRoolBtnClick() {
    if (tenzies) {
      setDice(getInitialDiceValues());
      setTenzies(false);
      setRoolCount(0);
    } else {
      setDice((prevDiceState) => {
        return prevDiceState.map((item) => {
          return item.isFreez ? item : { ...item, value: getDiceRollValue() };
        });
      });
      setRoolCount((prevCount) => {
        return prevCount + 1;
      });
    }
  }

  const diaElements = dice.map((item) => (
    <Dia
      key={item.id}
      diceValue={item.value}
      diceFreez={item.isFreez}
      onDiceClick={() => handleDiceClick(item.id)}
    />
  ));

  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <div className="text-container">
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="dice-container">{diaElements}</div>
        <div className="lower-container">
          <h1>Timer: 00:00:00</h1>
          <button className="roll-btn" onClick={handleRoolBtnClick}>
            {tenzies ? 'Rest Game' : 'Roll'}
          </button>
          <h1>Rool Count:&nbsp;{roolCount}</h1>
        </div>
      </main>
    </div>
  );
}

export default App;
