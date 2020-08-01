import React from 'react';
import './ColorPicker.scss';


export default function ColorPicker(props:any){

  const colorPicker = React.useRef<any>(null);
  const [rgb , setRgb] = React.useState<any>({r:255,g:0,b:0});
  const [selected, setSelected] = React.useState<any>('rgb(255,0,0)');
  React.useEffect(()=>{
    const canvas = colorPicker.current;
    const ctx = canvas.getContext('2d');
    console.log(ctx.innerWidth);
    let center_x = (200)/2;
    let center_y = (200)/2;
    let sx = center_x;
    let sy = center_y;
    colorGenerate(center_x,center_y,sx,sy);
  },[]);

  function colorGenerate(center_x:number, center_y:number, sx:number, sy:number){
    const canvas = colorPicker.current;
    const ctx = canvas.getContext('2d');
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

  function selectColor(e:any){
    const canvas = colorPicker.current;

    let x = e.nativeEvent.pageX - canvas.offsetLeft,
    y = e.nativeEvent.pageY - canvas.offsetTop,   
    pixel = canvas.getContext("2d").getImageData(x, y, 1, 1).data,
    pixelColor = "rgb(" + pixel[0] + ", " + pixel[1]+", "+ pixel[2]+ ")";
    setRgb({
      r: pixel[0],
      g: pixel[1],
      b: pixel[2],
    })
    console.log(pixelColor);
    setSelected(pixelColor);
  }
  return (
    <div className="ColorPicker">
      <canvas onMouseDown={selectColor} ref={colorPicker} width={200} height={200} />
      <div style={{background: `rgb(${rgb.r},${rgb.g}, ${rgb.b})`, width: 30, height: 30}} /> 
      <div>
        <ColorRangeBar start={'rgb(255,255,255)'} selected={selected} setSelected={setSelected} />
        <ColorRangeBar start={'rgb(0,0,0)'} selected={selected} setSelected={setSelected} />

      </div>
    </div>
  )
} 

function ColorRangeBar(props:any){

  function handleChange(e:any){
    console.log(props.selected);
    console.log(~~(e.target.value * 255));
    props.setSelected(`rgb(255,${255-~~(e.target.value * 255)},${255-~~(e.target.value * 255)})`)

  }
  return (
    <>
    <p style={{margin: 0}}>TITLE</p>
    <div className="ColorRangeBar">
        <span className="bar"  style={{background: `linear-gradient(to right, ${props.start} 0%, ${props.selected} 100%)`}} />
        <input type="range" defaultValue={1} min={0} max={1} step="any" onChange={handleChange} />
    </div>
    </>
  )
}