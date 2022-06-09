import React from 'react';
import TrollFace from '../Assets/TrollFace.svg';
import '../Style/Navbar.css';

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar--logo">
        <img src={TrollFace} alt="TrollFace cartoon" />
        <p>Meme Generator</p>
      </div>
      <div className="navbar--items">
        <p>React Course - Project 3</p>
      </div>
    </div>
  );
}
