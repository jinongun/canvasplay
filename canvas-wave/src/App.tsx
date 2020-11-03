import React from 'react';
import logo from './logo.svg';
import './App.css';
import WaveCanvas from './WaveCanvas';
import {Wave} from './js/Wave';
import useAnimationFrame from './useAnimationFrame';

function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const waveRef = React.useRef<any>(new Wave());
  const waveRef2 = React.useRef<any>(new Wave());

  const waveRef3 = React.useRef<any>(new Wave());
  const waveRef4 = React.useRef<any>(new Wave());
  const waveRef5 = React.useRef<any>(new Wave());

  React.useEffect(()=>{
    waveRef.current.init();
    waveRef2.current.init();
    waveRef3.current.init();
    waveRef4.current.init();
    waveRef5.current.init();


  },[])
  
  useAnimationFrame(drawBall)
  function drawBall(){
    if(canvasRef.current){
      const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
      ctx.clearRect(0,0,300,300);
      waveRef.current.draw(ctx)
      waveRef2.current.drawX(ctx)

      waveRef3.current.circle(ctx)
      waveRef4.current.drawL2R(ctx)
      waveRef5.current.drawR2L(ctx)

    }
  }


  return (
    <div className="App">
      <canvas ref={canvasRef} width={300} height={300} style={{border: '1px solid red'}} />
    </div>
  );
}

export default App;
