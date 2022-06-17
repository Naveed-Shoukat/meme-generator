import React from 'react';
import DiceFace from './DiceFaces';

export default function Dia(props) {
  return (
    <div
      className={props.diceFreez ? 'dice-face dice-face-freez' : 'dice-face'}
      onClick={props.onDiceClick}
    >
      {/* {props.diceValue} */}
      <DiceFace className="dice-inner" faceValue={props.diceValue} />
    </div>
  );
}
