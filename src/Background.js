import React from 'react';
import './App.css';

function App() {

  const SPEED = 150;

  return (
    <div className="App">
      <div id="container">
        <div class="photobanner_walk">
          <img src={require(`./assets/scenes/green.png`)} />
          <img src={require(`./assets/scenes/green.png`)} />
          <img src={require(`./assets/scenes/green.png`)} />
        </div>
      </div>
    </div>
  );
}

export default App;
