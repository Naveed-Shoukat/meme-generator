import React from 'react';
import './App.css';
import Dia from './Components/Dia';
import Confetti from 'react-confetti';

/*
For an extra credit work do following 
-Save Best Time or Minimum rools into local storage

*/

function App() {
  const [gameControlers, setGameControlers] = React.useState(() => {
    return setInitialState();
  });

  function setInitialState() {
    const localSavedGameObj = JSON.parse(
      localStorage.getItem('tenziesGameData')
    );

    const savedValues = {
      isTenzies: localSavedGameObj.isTenzies || '',
      isTimeActive: localSavedGameObj.isTimeActive || false,
      timeInSeconds: localSavedGameObj.timeInSeconds || 0,
      allDiceStates: localSavedGameObj.allDiceStates || getInitialDiceValues(),
      diceRoolCount: localSavedGameObj.diceRoolCount || 0,
    };

    return savedValues;
  }

  React.useEffect(() => {
    const firstDiceValue = gameControlers.allDiceStates[0].value;
    const freezDices = gameControlers.allDiceStates.every(
      (dice) => dice.isFreez
    );
    const matchedValuesDices = gameControlers.allDiceStates.every(
      (dice) => dice.value === firstDiceValue
    );

    if (freezDices && matchedValuesDices) {
      setGameControlers((prevValues) => {
        return {
          ...prevValues,
          isTenzies: true,
          isTimeActive: false,
        };
      });
    }

    localStorage.setItem('tenziesGameData', JSON.stringify(gameControlers));

    // Timer Function details
    let interval;
    if (gameControlers.isTimeActive) {
      interval = setInterval(() => {
        setGameControlers((prevValues) => {
          return {
            ...prevValues,
            timeInSeconds: prevValues.timeInSeconds + 1,
          };
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [gameControlers]);

  function getDiceRandumValue() {
    return Math.ceil(Math.random() * 6);
  }

  function getInitialDiceValues() {
    const diceValues = [];
    for (let i = 0; i < 10; i++) {
      const diceState = {
        id: i,
        value: getDiceRandumValue(),
        isFreez: false,
      };
      diceValues.push(diceState);
    }
    return diceValues;
  }

  function handleDiceClick(diceId) {
    if (gameControlers.isTimeActive) {
      setGameControlers((prevValues) => {
        const newDiceState = prevValues.allDiceStates.map((dice) => {
          return dice.id === diceId
            ? { ...dice, isFreez: !dice.isFreez }
            : dice;
        });
        return {
          ...prevValues,
          allDiceStates: newDiceState,
        };
      });
    }
  }

  function handleRoolBtnClick() {
    if (gameControlers.isTenzies) {
      setGameControlers((prevValues) => {
        return {
          isTenzies: '',
          isTimeActive: false,
          timeInSeconds: 0,
          allDiceStates: getInitialDiceValues(),
          diceRoolCount: 0,
        };
      });
    } else {
      setGameControlers((prevValues) => {
        const newDiceState = prevValues.allDiceStates.map((dice) => {
          return dice.isFreez ? dice : { ...dice, value: getDiceRandumValue() };
        });
        return {
          ...prevValues,
          allDiceStates: newDiceState,
          diceRoolCount: prevValues.diceRoolCount + 1,
          isTimeActive: true,
          isTenzies: false,
        };
      });
    }
  }
  const diaElements = gameControlers.allDiceStates.map((dice) => (
    <Dia
      key={dice.id}
      diceValue={dice.value}
      diceFreez={dice.isFreez}
      onDiceClick={() => handleDiceClick(dice.id)}
    />
  ));

  const rollBtnText =
    gameControlers.isTenzies === ''
      ? 'Start Game'
      : gameControlers.isTenzies
      ? 'Rest Game'
      : 'Roll';

  return (
    <div className="App">
      <main>
        {gameControlers.isTenzies && <Confetti />}
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
            <span>
              {('0' + Math.floor(gameControlers.timeInSeconds / 60 / 60)).slice(
                -2
              )}
              &nbsp;
            </span>
            <span>M:</span>
            <span>
              {('0' + Math.floor(gameControlers.timeInSeconds / 60)).slice(-2)}
              &nbsp;
            </span>
            <span>S:</span>
            <span>
              {('0' + Math.floor(gameControlers.timeInSeconds % 60)).slice(-2)}
            </span>
          </div>
          <button className="roll-btn" onClick={handleRoolBtnClick}>
            {rollBtnText}
          </button>
          <h1>Rool Count:&nbsp;{gameControlers.diceRoolCount}</h1>
        </div>
      </main>
    </div>
  );
}

export default App;
