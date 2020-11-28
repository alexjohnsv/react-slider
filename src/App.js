import React from 'react';
import Slider from './Slider';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <Slider defaultValue={20} marks={[20,30]} />
      </div>
      <div>
        <Slider defaultValue={0} marks={[0,10,20,30,40,50,60,70,80,90,100]} />
      </div>
    </div>
  );
}

export default App;
