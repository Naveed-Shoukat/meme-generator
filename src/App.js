import React from 'react';
import './App.css';
import Form from './Form';
import Nav from './Nav';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  const bgColor = darkMode ? '#2e2e2e' : '#ffffff';
  const bgStyle = { backgroundColor: bgColor };
  return (
    <div className="App" style={bgStyle}>
      <Nav toggleDarkMode={handleThemeChange} darkMode={darkMode} />
      <Form darkMode={darkMode} />
    </div>
  );
}

export default App;
