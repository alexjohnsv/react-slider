import React from 'react';
import Slider from './Slider';
import './App.css';

const marks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

function App() {
  return (
    <div className="App">
      <Slider marks={marks}/>
    </div>
  );
}

export default App;
