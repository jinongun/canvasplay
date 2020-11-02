import React from 'react';
import logo from './logo.svg';
import './App.css';
import WaveCanvas from './WaveCanvas';
import {Wave} from './js/Wave';

function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const waveRef = React.useRef<any>(new Wave());
  React.useEffect(()=>{
    waveRef.current.init();
    if(canvasRef.current){
      const ctx = canvasRef.current.getContext('2d');
      requestAnimationFrame(() => waveRef.current.draw(ctx));
    }
  },[])
  
  function drawBall(){
    if(canvasRef.current){
      const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
      ctx.clearRect(0,0,300,300);
      waveRef.current.draw(ctx)
      requestAnimationFrame(drawBall);
    }
  }
  drawBall();


  return (
    <div className="App">
      <canvas ref={canvasRef} width={300} height={300} />
    </div>
  );
}

export default App;
