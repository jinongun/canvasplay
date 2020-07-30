import React from 'react';
import './ColorPicker.scss';


export default function ColorPicker(props:any){
  const canvasRef = React.useRef<any>(null);

  React.useEffect(()=>{
    if(canvasRef.current){
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let r = 255 , g = 0 , b = 0;
      const unit = 5;
      for(let x = 0; x <306; x++){
          /*
            255,0,0
            255,255,0

            0,255,0
            0,255,255

            0,0,255
            255,0,255

            255,0, 0
          */
          ctx.fillStyle=`rgb(${r},${g},${b})`;
          console.log(`rgb(${r},${g},${b})`);
          ctx.fillRect(0,x,50,1);
          if(r === 255 && g < 255 && b === 0){
            g+=unit;
          }
          else if(r > 0 && g === 255 && b === 0){
            r-=unit;
          }
          else if(r === 0 && g === 255 && b < 255){
            b+=unit;
          }
          else if(r === 0 && g > 0 &&b === 255 ){
            g-=unit;
          }
          else if(r < 255 && g === 0 && b === 255){
            r+=unit;
          }
          else if(r === 255 && g === 0 &&  b > 0){
            b-=unit;
          }
      }
    }
  },[]);

  return (
    <div className="ColorPicker">
      <canvas ref={canvasRef} width={30} height={306} />
    </div>
  )
} 