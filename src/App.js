import React from 'react';
import './App.css';
import Dia from './Components/Dia';
import Confetti from 'react-confetti';

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

function setInitialState() {
  const localSavedGameObj = JSON.parse(localStorage.getItem('tenziesGameData'));

  const savedValues = {
    isTenzies: localSavedGameObj.isTenzies || '',
    isTimeActive: localSavedGameObj.isTimeActive || false,
    timeInSeconds: localSavedGameObj.timeInSeconds || 0,
    allDiceStates: localSavedGameObj.allDiceStates || getInitialDiceValues(),
    diceRoolCount: localSavedGameObj.diceRoolCount || 0,
  };

  return savedValues;
}
const reducer = (prevState, gameAction) => {
  switch (gameAction.type) {
    case 'GAME_START':
      return {
        ...prevState,
        isTenzies: false,
        isTimeActive: true,
      };
    case 'TENZIES':
      return {
        ...prevState,
        isTenzies: !prevState.isTenzies,
      };
    case 'TIME_ACTIVE':
      return {
        ...prevState,
        isTimeActive: prevState.isTimeActive,
      };
    case 'TIME_CALCULATE':
      return {
        ...prevState,
        timeInSeconds: prevState.timeInSeconds + 1,
      };
    case 'DICE_ROLL_COUNT':
      return {
        ...prevState,
        diceRoolCount: prevState.diceRoolCount + 1,
      };
    case 'RESET':
      return {
        isTenzies: '',
        isTimeActive: false,
        timeInSeconds: 0,
        allDiceStates: getInitialDiceValues(),
        diceRoolCount: 0,
      };
    case 'SET_DICE_VALUES':
      const newDiceValues = prevState.allDiceStates.map((dice) => {
        return dice.isFreez ? dice : { ...dice, value: getDiceRandumValue() };
      });
      return {
        ...prevState,
        allDiceStates: newDiceValues,
      };
    case 'HANDLE_DICE_FRIZE':
      const newDiceState = prevState.allDiceStates.map((dice) => {
        return dice.id === gameAction.id
          ? { ...dice, isFreez: !dice.isFreez }
          : dice;
      });

      return {
        ...prevState,
        allDiceStates: newDiceState,
      };
    case 'WIN':
      return {
        ...prevState,
        isTenzies: true,
        isTimeActive: false,
      };
    default:
      return prevState;
  }
};

function App() {
  const [gameState, dispatchGameState] = React.useReducer(
    reducer,
    setInitialState()
  );

  React.useEffect(() => {
    const firstDiceValue = gameState.allDiceStates[0].value;
    const freezDices = gameState.allDiceStates.every((dice) => dice.isFreez);
    const matchedValuesDices = gameState.allDiceStates.every(
      (dice) => dice.value === firstDiceValue
    );

    if (freezDices && matchedValuesDices) {
      dispatchGameState({ type: 'WIN' });
    }

    // localStorage.setItem('tenziesGameData', JSON.stringify(gameState));

    // Timer Function details
    let interval;
    if (gameState.isTimeActive) {
      interval = setInterval(() => {
        dispatchGameState({ type: 'TIME_CALCULATE' });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [gameState]);

  function handleDiceClick(diceId) {
    if (gameState.isTimeActive) {
      dispatchGameState({ type: 'HANDLE_DICE_FRIZE', id: diceId });
    }
  }

  function handleRoolBtnClick() {
    if (gameState.isTenzies) {
      dispatchGameState({ type: 'RESET' });
    } else if (gameState.isTenzies === '') {
      dispatchGameState({ type: 'GAME_START' });
    } else {
      dispatchGameState({ type: 'SET_DICE_VALUES' });
      dispatchGameState({ type: 'DICE_ROLL_COUNT' });
    }
  }
  const diaElements = gameState.allDiceStates.map((dice) => (
    <Dia
      key={dice.id}
      diceValue={dice.value}
      diceFreez={dice.isFreez}
      onDiceClick={() => handleDiceClick(dice.id)}
    />
  ));

  const rollBtnText =
    gameState.isTenzies === ''
      ? 'Start Game'
      : gameState.isTenzies
      ? 'Rest Game'
      : 'Roll';

  return (
    <div className="App">
      <main>
        {gameState.isTenzies && <Confetti />}
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
              {('0' + Math.floor(gameState.timeInSeconds / 60 / 60)).slice(-2)}
              &nbsp;
            </span>
            <span>M:</span>
            <span>
              {('0' + Math.floor(gameState.timeInSeconds / 60)).slice(-2)}
              &nbsp;
            </span>
            <span>S:</span>
            <span>
              {('0' + Math.floor(gameState.timeInSeconds % 60)).slice(-2)}
            </span>
          </div>
          <button className="roll-btn" onClick={handleRoolBtnClick}>
            {rollBtnText}
          </button>
          <h1>Rool Count:&nbsp;{gameState.diceRoolCount}</h1>
        </div>
      </main>
    </div>
  );
}

export default App;
