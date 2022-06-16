import React from 'react';
import './App.css';
import Dia from './Components/Dia';

function App() {
  const [dice, setDice] = React.useState(() => getInitialDiceValues());

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

    console.log(checkGameWin() ? 'Pending' : 'Not Pending');
  }

  function checkGameWin() {
    const remainingUnFreezDice = dice.filter((item) => item.isFreez === false);
    return remainingUnFreezDice.length;
  }

  function handleRoolBtnClick() {
    setDice((prevDiceState) => {
      return prevDiceState.map((item) => {
        return item.isFreez ? item : { ...item, value: getDiceRollValue() };
      });
    });
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
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diaElements}</div>
        <button className="roll-btn" onClick={handleRoolBtnClick}>
          Roll
        </button>
      </main>
    </div>
  );
}

export default App;
