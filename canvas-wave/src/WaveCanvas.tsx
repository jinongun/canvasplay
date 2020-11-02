import React from 'react';

function WaveCanvas(props: any){
  console.log(props.size);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(()=>{
    if(canvasRef.current){
      const context = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
      context.scale(2,2);
    }
  },[props.size]);
  React.useEffect(()=>{
    if(canvasRef.current){
      const context = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
      draw(context);
    }
  },[]);
  function draw(ctx:CanvasRenderingContext2D){
    ctx.beginPath();
    ctx.fillStyle = '#ff0000';

    ctx.arc(150,150,30,0, 2*Math.PI);
    ctx.fill();
  }
  function animate(ctx: CanvasRenderingContext2D){
    ctx.clearRect(0, 0, 300, 300);
  }
  return (
    <div>
      <canvas ref={canvasRef} width={props.size[0] * 2 } height={props.size[1] * 2} />
    </div>
  )
};

export default WaveCanvas;