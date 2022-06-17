import React from 'react';
import '../diceFaceStyle.css';

function DiceFace(props) {
  const diceFaceOne = () => {
    return (
      <div className="dice-dot-container">
        <div className="dice-dot middel"></div>
      </div>
    );
  };

  const diceFaceTwo = () => {
    return (
      <div className="dice-dot-container">
        <div className="dice-dot top-lef"></div>
        <div className="dice-dot botom-right"></div>
      </div>
    );
  };

  const diceFaceThree = () => {
    return (
      <div className="dice-dot-container">
        <div className="dice-dot top-lef"></div>
        <div className="dice-dot middel"></div>
        <div className="dice-dot botom-right"></div>
      </div>
    );
  };

  const diceFaceFour = () => {
    return (
      <div className="dice-dot-container">
        <div className="dice-dot top-lef"></div>
        <div className="dice-dot top-right"></div>
        <div className="dice-dot botom-left"></div>
        <div className="dice-dot botom-right"></div>
      </div>
    );
  };

  const diceFaceFive = () => {
    return (
      <div className="dice-dot-container">
        <div className="dice-dot top-lef"></div>
        <div className="dice-dot top-right"></div>
        <div className="dice-dot middel"></div>
        <div className="dice-dot botom-left"></div>
        <div className="dice-dot botom-right"></div>
      </div>
    );
  };

  const diceFaceSix = () => {
    return (
      <div className="dice-dot-container">
        <div className="dice-dot top-lef"></div>
        <div className="dice-dot top-right"></div>
        <div className="dice-dot middel-left"></div>
        <div className="dice-dot middel-right"></div>
        <div className="dice-dot botom-left"></div>
        <div className="dice-dot botom-right"></div>
      </div>
    );
  };

  let diceElement;
  switch (props.faceValue) {
    case 1:
      diceElement = diceFaceOne();
      break;
    case 2:
      diceElement = diceFaceTwo();
      break;
    case 3:
      diceElement = diceFaceThree();
      break;
    case 4:
      diceElement = diceFaceFour();
      break;
    case 5:
      diceElement = diceFaceFive();
      break;
    case 6:
      diceElement = diceFaceSix();
      break;

    default:
      break;
  }
  return <div>{diceElement}</div>;
}

export default DiceFace;
