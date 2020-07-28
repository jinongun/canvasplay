import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Palette from 'components/Palette';


const width = 8;
const color = '#000';
function App() {
  const lineRef = React.useRef<any>(null)
  const canvasRef = React.useRef<any>(null);
  let pos = {
    drawable: false,
    X: -1,
    Y: -1,
  }  
  React.useEffect(()=>{
    drawBoard();
  },[])
  function init(e:any){
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    pos = { drawable: true, ...getPosition(e.nativeEvent)}
    ctx.moveTo(pos.X, pos.Y);
  }
  const draw = (e:any)=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if(pos.drawable){
      pos = { ...pos, ...getPosition(e.nativeEvent)}
      // ctx.strokeStyle = "#ff0000";
      // ctx.lineCap = 'round';

      // ctx.lineTo(pos.X,pos.Y);
      // ctx.lineWidth=10;
      // ctx.stroke();
      ctx.fillRect(  ~~(pos.X/width) * width, ~~(pos.Y/width)*width, width, width);
    }
  }
  const dot = (e:any)=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    pos = { ...pos, ...getPosition(e.nativeEvent)}
    ctx.fillRect(  ~~(pos.X/width) * width, ~~(pos.Y/width)*width, width, width);


  }
  function getPosition(e:any){
    return {X: e.offsetX, Y: e.offsetY}
  }
  function finishDraw(){
    pos={drawable: false, X: -1, Y: -1}
  }
  function drawBoard(){
    const canvas = lineRef.current;


    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled =false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    // var imageObj1 = new Image();
    // imageObj1.src = 'https://bonanzagolfcourse.com/wp-content/uploads/2020/04/HOTEL_8-400x400-pixels.jpg'

      for (var x = 0; x <= 1200; x += width) {
          ctx.moveTo(0.5 + x + 0, 0);
          ctx.lineTo(0.5 + x + 0, 800 + 0);
      }
  
      for (var x = 0; x <= 800; x += width) {
          ctx.moveTo(0, 0.5 + x + 0);
          ctx.lineTo(1200 + 0, 0.5 + x + 0);
      }
      ctx.strokeStyle = "rgba(128,128,128,0.5)";
      ctx.stroke();

}
  return (
    <div className="App">
      <div className="canvasWrap">
      <canvas ref={lineRef} style={{background: 'white'}} width={1200} height={800} />

        <canvas onMouseDown={init} style={{background: 'transparent'}} onMouseMove={draw} onClick={dot}  onMouseUp={finishDraw} ref={canvasRef} width={1200} height={800} />
     
      </div>
      
      <Palette />
    </div>
  );
}

export default App;
