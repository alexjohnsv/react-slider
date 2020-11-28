import React from 'react';
import Slider from './Slider';
import './App.css';

function App() {
  return (
    <div className="App">
      <Slider defaultValue={10} marks={[10,55,100]} />
    </div>
  );
}

export default App;
