import React from 'react';

export default function Square(props) {
  const bgColor = {
    backgroundColor: props.isBgOn ? '#223344' : '#ddeeff',
    border: '2px solid black',
    width: '100px',
    height: '100px',
    borderRadius: '15px',
  };

  return (
    <div className="square" onClick={props.squareClick} style={bgColor}></div>
  );
}
