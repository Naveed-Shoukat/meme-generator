import React from 'react';
import './Nav.css';

export default function Nav(props) {
  return (
    <div>
      <nav className={props.darkMode ? 'dark' : ''}>
        <h2 className="nav--logo_text">NavBar with them Selector</h2>
        <div className="toggler">
          <p className="toggler--light">Light</p>
          <div className="toggler--slider" onClick={props.toggleDarkMode}>
            <div className="toggler--slider--circle"></div>
          </div>
          <p className="toggler--dark">Dark</p>
        </div>
      </nav>
    </div>
  );
}
