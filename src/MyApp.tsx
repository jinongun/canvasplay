import React from 'react';
import './App.scss';
import { ColorContext } from 'contexts/useColorContext';


function MyApp(){
  const [color, setColor] = React.useState('#000000');

  function handleColor(){
    setColor('g');
  }
  return (
    <ColorContext.Provider value={[color,setColor]}>
      <div className="App">
        {color}
        <Btn />
      </div>
    </ColorContext.Provider>

  )
}

function Btn(){
  const [color, setColor ] = React.useContext(ColorContext);

  return (
    <button onClick={()=>setColor("#fff")}>
      {color}
    </button>
  )
}

export default MyApp;