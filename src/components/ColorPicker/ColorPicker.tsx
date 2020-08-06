import React from 'react';
import './ColorPicker.scss';

interface Props{
  width: number;
  height: number;
}

export default function ColorPicker({width = 200, height = 200}:any){
  const colorpickerRef = React.useRef<any>(null);
  const [config, setConfig] = React.useState({lightness: 1, saturation: 1});
  const [baseColor, setBaseColor] = React.useState([0,0,0]);

  React.useEffect(()=>{
    generateColor();
  },[]);

  function generateColor(){
    const canvas = colorpickerRef.current;
    const ctx = canvas.getContext('2d');
    let center_x = width/2;
    let center_y = height/2;
    let sx = center_x;
    let sy = center_y;

    for(let i = 0; i < 360; i+=0.1)
		{
			let rad = (i-45) * (Math.PI) / 180;
			ctx.strokeStyle = "hsla("+i+", 100%, 50%, 1.0)";
			ctx.beginPath();
			ctx.moveTo(center_x, center_y);
			ctx.lineTo(center_x + sx * Math.cos(-rad), center_y + sy * Math.sin(-rad));
			ctx.stroke();	
    }
    ctx.beginPath();
    ctx.arc(center_x,center_y,60,0,2*Math.PI,false);
    ctx.fillStyle = '#282c34';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(center_x, center_y, 100, 0, 2 * Math.PI);
    ctx.strokeStyle = "#282c34";
    ctx.lineWidth=2;
    ctx.stroke();
  }
  return (
    <div className="ColorPicker">
      <div className="warp">
        <canvas width={width} height={height} ref={colorpickerRef} style={{background:'transparent'}} />
      </div>
      <div className="config">
        <div className="row">
          <input type="range" />
        </div>
        <div className="row">
          <input type="range" />
        </div>
        <div className="row">
          <span>RGB</span>
          <span>{baseColor.join(",")}</span>
        </div>
        <div className="row">
          <span>HEX</span>
          <span>{rgbToHex(baseColor)}</span>
        </div>
      </div>
    </div>
  )
}


function componentToHex(c:number) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex([r,g,b]:any) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}