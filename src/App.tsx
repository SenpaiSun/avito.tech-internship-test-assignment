import React from 'react';
import logo from './logo.svg';
import './App.css';
const { REACT_APP_API_TOKEN } = process.env;

function App() {
  const asd = REACT_APP_API_TOKEN
  console.log(asd)
  console.log(process.env.API_TOKEN)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
