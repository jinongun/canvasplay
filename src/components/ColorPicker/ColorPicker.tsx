import React from 'react';
import './ColorPicker.scss';


export default function ColorPicker(props:any){

  const colorPicker = React.useRef<any>(null);
  const [rgb , setRgb] = React.useState<any>({r:255,g:0,b:0});
  const [ lightness, setLightness ] = React.useState(0.5);
  const [ saturation, setSaturation] = React.useState(0.5);
  const [baseColor, setBaseColor] = React.useState<any>({r:255,g:128,b:0});
  const [resultColor, setResultColor] = React.useState<any>(baseColor);

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

  React.useEffect(()=>{
    let answer = {...baseColor};
    const gap = {
      r: 255 - baseColor.r,
      g: 255 - baseColor.g,
      b: 255 - baseColor.b,
    };

    //채도 적용
    answer ={
      r: answer.r + (1 - saturation) * gap.r,
      g: answer.g + ( 1 - saturation) * gap.g,
      b: answer.b + (1 - saturation) * gap.b
    }

    //명도 적용
    answer = {
      r: answer.r * (lightness),
      g: answer.g * (lightness),
      b: answer.b * (lightness)
    }
    setResultColor(answer);
  
  },[lightness,saturation, baseColor]);

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
    setBaseColor({
      r: pixel[0],
      g: pixel[1],
      b: pixel[2],
    })
    console.log(pixelColor);
    // setResultColor({
    //   r: pixel[0],
    //   g: pixel[1],
    //   b: pixel[2],
    // });
  }

  return (
    <div className="ColorPicker">
      <canvas onMouseDown={selectColor} ref={colorPicker} width={200} height={200} />
      <div style={{ color: 'red',fontSize: '10px',background: `rgb(${resultColor.r},${resultColor.g}, ${resultColor.b})`, width: 24, height: 24}} >
      </div> 
      <div>
        <ColorRangeBar title="Saturation" setValue={setSaturation} value={saturation} start={`rgb(255,255,255)`} end={`rgb(${baseColor.r},${baseColor.g},${baseColor.b})`} />
        <ColorRangeBar title="Lightness" setValue={setLightness} value={lightness} start={`rgb(0,0,0)`} end={`rgb(${baseColor.r},${baseColor.g},${baseColor.b})`}/>
      </div>
    </div>
  )
} 




function ColorRangeBar(props:any){
  const { setValue } = props;
  function handleChange(e:any){
    const val = Number(Number(e.target.value).toFixed(2));
    setValue(val);
  }
  return (
    <>
    <p className="title">
      {props.title || 'default'}
    </p>
    <div className="ColorRangeBar">
        <span className="bar"  style={{background: `linear-gradient(to right, ${props.start} 0%, ${props.end} 100%)`}} />
        <input type="range" defaultValue={1} value={props.value} min={0} max={1} step="any" onChange={handleChange} />
    </div>
    </>
  )
}