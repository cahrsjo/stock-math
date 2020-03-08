import React from 'react';
import './App.css';
import { StockMath } from './StockMath';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <span className="title" role="img" aria-label="money-with-wings">💸Stock Math💸</span>
          <StockMath />
      </header>
    </div>
  );
}

export default App;
