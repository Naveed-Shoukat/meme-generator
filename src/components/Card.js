import React from 'react';
import '../Style/Card.css';
// import memeImg from '../Assets/memeimg.png';

export default function Card() {
  return (
    <div className="card">
      <div className="card--inputs">
        <input
          id="topText"
          type="text"
          className="input-text"
          placeholder="Shut up"
        />

        <input
          id="botomText"
          type="text"
          className="input-text"
          placeholder="and take my money"
        />
      </div>
      <button className="getImg-btn">Get a new meme image 🖼</button>
      <div className="memeImg"></div>
      {/* <img className="memeImg" src={memeImg} alt="Meme cartoon" /> */}
    </div>
  );
}
