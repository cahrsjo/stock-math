import React from 'react';
import './App.css';
import { StockMath } from './StockMath';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <span className="money" role="img" aria-label="money-with-wings">💸</span>
          <StockMath />
      </header>
    </div>
  );
}

export default App;
