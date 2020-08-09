import React from 'react';
import './DrawBoard.scss';



interface Props{
  pointer?: {
    color: string,
    width: number,
  },
  canvas?: {
    width: number,
    height: number,
  }
}
const defaultProps = {
  pointer: {
    color: "#ff0000",
    width: 8
  }
};
export default function DrawBoard({pointer = {color: "rgba(255,0,0,0.1)",width: 16}, canvas = {width: 512, height: 512}}:Props){

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const backgroundRef = React.useRef<any>(null);
  let pos = {
    drawable: false,
    x: -1,
    y: -1,
  }  
  React.useEffect(()=>{
    console.log(pointer);
    drawBackground();
  },[]);

  function drawBackground(){
    const background = backgroundRef.current;
    if(background){
      const ctx = background?.getContext('2d');
      if(ctx){
        const { width } = pointer;
        ctx.imageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled =false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        for(let x = 0; x <= canvas.width; x+=width){
          for(let y = 0; y <= canvas.height; y+=width){

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
    }
  }
  function handleMouseDown(e:any){
    const canvas = canvasRef.current;
    if(canvas){
      const ctx = canvas?.getContext('2d')
      if(ctx){
        console.log('move')

        ctx.beginPath();
        pos = { drawable: true, ...getPosition(e.nativeEvent)}
        ctx.moveTo(pos.x, pos.y);        
      }
    }
  }
  function handleMouseMove(e:any){

    const canvas = canvasRef.current;
    if(canvas){
      const ctx = canvas?.getContext('2d')
      console.log(pointer)

      if(ctx && pos.drawable && pointer){
        console.log('move3')

        const { color, width } = pointer;
         pos = { ...pos, ...getPosition(e.nativeEvent)};
         console.log(pos);
         ctx.fillStyle=color;
         ctx.fillRect(
          ~~(pos.x/width) * width, ~~(pos.y/width)*width, width, width
         )
      }
    }
  }
  function handleMouseUp(){
    pos={drawable:false, x:-1, y:-1}
  }

  function getPosition(e:any){
    return {x: e.offsetX, y: e.offsetY}
  }
  return (
    <div className="DrawBoard">
      <canvas className="background" width={canvas.width} height={canvas.height} ref={backgroundRef} />
      <canvas className="canvas" width={canvas.width} height={canvas.height} ref={canvasRef} onMouseDown={handleMouseDown} onClick={handleMouseMove} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} />
    </div>
  )
}