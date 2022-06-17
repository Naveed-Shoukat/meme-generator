import React from 'react';
import './App.css';
import Dia from './Components/Dia';
import Confetti from 'react-confetti';

/*
For an extra credit work do following 
1. Add DOTs instead of number
2. Track the number of rools
3. Track the time took to Win the game
4. Save Best Time or Minimum rools into local storage
5. Add levels based on Max number of rools or Time based
*/

function App() {
  const [dice, setDice] = React.useState(() => getInitialDiceValues());
  const [tenzies, setTenzies] = React.useState(() => false);

  React.useEffect(() => {
    const firstDiceValue = dice[0].value;
    const freezDices = dice.every((dia) => dia.isFreez);
    const matchedValuesDices = dice.filter(
      (dia) => dia.value === firstDiceValue
    );

    if (freezDices && matchedValuesDices) {
      setTenzies(true);
    }
    console.log(tenzies);
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
    } else {
      setDice((prevDiceState) => {
        return prevDiceState.map((item) => {
          return item.isFreez ? item : { ...item, value: getDiceRollValue() };
        });
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
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diaElements}</div>
        <button className="roll-btn" onClick={handleRoolBtnClick}>
          {tenzies ? 'Rest Game' : 'Roll'}
        </button>
      </main>
    </div>
  );
}

export default App;
