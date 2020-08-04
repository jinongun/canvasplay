import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Palette from 'components/Palette';
import ColorPicker from 'components/ColorPicker';
import { ColorContext } from './contexts/useColorContext';

const CANVAS_W = 512;
const CANVAS_H = 512;
const BORDER_COLOR = 'rgba(196,196,196,1)'
const width = 16;



function App() {
  const [{x,y}, setCoords] = React.useState({x:-1, y:-1});
  const [color, setColor] = React.useState('black');
  const lineRef = React.useRef<any>(null);
  const canvasRef = React.useRef<any>(null);
  const originRef = React.useRef<any>(null);
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
    const origin = originRef.current;
    const otx = origin.getContext('2d');
    if(pos.drawable){
      pos = { ...pos, ...getPosition(e.nativeEvent)}

      if(color === 'transparent'){
        ctx.clearRect(~~(pos.X/width) * width, ~~(pos.Y/width) * width, width, width);
        otx.clearRect(  ~~(pos.X/width) * width / 8 , ~~(pos.Y/width) * width / 8, 2, 2);
  
      }else{
        ctx.fillStyle=color;
        ctx.fillRect(  ~~(pos.X/width) * width, ~~(pos.Y/width)*width, width, width);
  
        otx.fillStyle=color;
        otx.fillRect(  ~~(pos.X/width) * width / 8 , ~~(pos.Y/width) * width / 8, 2, 2);
      }

    }
  }
  const dot = (e:any)=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const origin = originRef.current;
    const otx = origin.getContext('2d');

    pos = { ...pos, ...getPosition(e.nativeEvent)}
    if(color === 'transparent'){
      ctx.clearRect(~~(pos.X/width) * width, ~~(pos.Y/width) * width, width, width);
      otx.clearRect(  ~~(pos.X/width) * width / 8 , ~~(pos.Y/width) * width / 8, 2, 2);

    }else{
      ctx.fillStyle=color;
      ctx.fillRect(  ~~(pos.X/width) * width, ~~(pos.Y/width) * width, width, width);
      setCoords({x:pos.X, y:pos.Y});
      otx.fillStyle=color;
      otx.fillRect(  ~~(pos.X/width) * width / 8 , ~~(pos.Y/width) * width / 8, 2, 2);
    }


    // ctx.strokeStyle = "rgba(128,128,128,1)";
    // ctx.strokeRect(~~(pos.X/width) * width, ~~(pos.Y/width)*width, width, width);



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
    for(let x = 0; x <= CANVAS_W; x+=width){
      for(let y = 0; y <= CANVAS_H; y+=width){

        if(x/width %2=== 1 && y/width % 2 ===1){
          ctx.fillStyle="white";
        }else if(x/width % 2 === 0  && y/width % 2 ===0){
          ctx.fillStyle="white";
        }
        else{
          ctx.fillStyle="#f0f0f0"
        }
        ctx.fillRect(x,y,width,width);
      }
    }
  }
  return (
    <ColorContext.Provider value={"#000000"}>
      <div className="App">
        <div className="canvasWrap">
          <canvas ref={lineRef} style={{background: 'white'}} width={CANVAS_W} height={CANVAS_H} />
          <canvas onMouseDown={init} style={{background: 'transparent'}} onMouseMove={draw} onClick={dot}  onMouseUp={finishDraw} ref={canvasRef} width={CANVAS_W} height={CANVAS_H} />
        </div>

        {/* <Palette setColor={setColor} color={color} /> */}
        <div>
        <canvas style={{background: 'white'}} width={CANVAS_W/width} height={CANVAS_H/width} />
        <canvas ref={originRef} style={{background: 'white', border: '2px solid #61dbfb'}} width={CANVAS_W/width *2} height={CANVAS_H/width *2} />

        </div>
        <ColorPicker />
      </div>
    </ColorContext.Provider>

  );
}

export default App;
