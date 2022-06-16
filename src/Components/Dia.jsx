import React from 'react';

export default function Dia(props) {
  return (
    <div
      className={props.diceFreez ? 'dice-face dice-face-freez' : 'dice-face'}
      onClick={props.onDiceClick}
    >
      {props.diceValue}
    </div>
  );
}
