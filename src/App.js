import React from 'react';
import './App.css';
import SquareData from './SquaresData';
import Square from './Square';

function App() {
  const [isBgOnState, setIsBgOnState] = React.useState(SquareData);

  function handleClick(id) {
    setIsBgOnState((preVal) =>
      preVal.map((item) => {
        return item.id === id ? { ...item, isBgOn: !item.isBgOn } : item;
      })
    );
  }

  const squaresElement = isBgOnState.map((item) => (
    <Square
      key={item.id}
      isBgOn={item.isBgOn}
      squareClick={() => handleClick(item.id)}
    />
  ));

  return <div className="App">{squaresElement}</div>;
}

export default App;
