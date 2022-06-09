import './App.css';
import Card from './components/Card';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <section>
        <Card />
      </section>
      <footer>Developed by Navi's Lab @ 2022</footer>
    </div>
  );
}

export default App;
