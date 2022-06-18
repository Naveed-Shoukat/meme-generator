import React from 'react';
import './App.css';
import Dia from './Components/Dia';
import Confetti from 'react-confetti';
// import GameTimer from './Components/GameTimer';

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
  const [isTimeActive, setIsTimeActive] = React.useState(false);
  const [time, setTime] = React.useState(0);

  const [dice, setDice] = React.useState(() => {
    const localSavedGame = localStorage.getItem('tenziesGameData');
    return JSON.parse(localSavedGame).game || getInitialDiceValues();
  });

  const [tenzies, setTenzies] = React.useState(() => false);

  const [roolCount, setRoolCount] = React.useState(() => {
    const localSavedGame = localStorage.getItem('tenziesGameData');
    return JSON.parse(localSavedGame).totalRollCount || 0;
  });

  React.useEffect(() => {
    const firstDiceValue = dice[0].value;
    const freezDices = dice.every((dia) => dia.isFreez);
    const matchedValuesDices = dice.filter(
      (dia) => dia.value === firstDiceValue
    );

    if (freezDices && matchedValuesDices) {
      setTenzies(true);
      setIsTimeActive(false);
    }

    localStorage.setItem(
      'tenziesGameData',
      JSON.stringify({ game: dice, totalRollCount: roolCount })
    );

    // Timer Function details
    let interval = null;
    if (isTimeActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [dice, tenzies, roolCount, isTimeActive]);

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
      setTenzies('');
      setRoolCount(0);
      setIsTimeActive(false);
      setTime(0);
    } else {
      setDice((prevDiceState) => {
        return prevDiceState.map((item) => {
          return item.isFreez ? item : { ...item, value: getDiceRollValue() };
        });
      });
      setRoolCount((prevCount) => {
        return prevCount + 1;
      });
      setIsTimeActive(true);
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

  const rollBtnText =
    tenzies === '' ? 'Start Game' : tenzies ? 'Rest Game' : 'Roll';

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
          <div style={{ fontSize: '22px', fontWeight: 'bolder' }}>
            {' '}
            Time&nbsp;
            <span>H:</span>
            <span>{time.hours}&nbsp;</span>
            <span>M:</span>
            <span>
              {('0' + Math.floor((time / 60000) % 60)).slice(-2)}&nbsp;
            </span>
            <span>S:</span>
            <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>
          </div>
          <button className="roll-btn" onClick={handleRoolBtnClick}>
            {rollBtnText}
          </button>
          <h1>Rool Count:&nbsp;{roolCount}</h1>
        </div>
      </main>
    </div>
  );
}

export default App;
