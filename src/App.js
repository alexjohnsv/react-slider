import React from 'react';
import Slider from './Slider';
import './App.css';

function App() {
  return (
    <div className="App">
      <Slider defaultValue={10} marks={[0, 10, 20, 30, 40, 50, 60, 100]} />
    </div>
  );
}

export default App;
