import React from 'react';
import './ColorPicker.scss';

interface Props{
  width: number;
  height: number;
}

export default function ColorPicker({width = 200, height = 200}:any){
  const colorpickerRef = React.useRef<any>(null);
  const bgRef = React.useRef<any>(null);
  const [config, setConfig] = React.useState({lightness: 1, saturation: 1});
  const [baseColor, setBaseColor] = React.useState([0,0,0]);

  React.useEffect(()=>{
    generateColor();
  },[]);
  function degreesToRadians(degrees:number) {
    return degrees * (Math.PI / 180);
}
  function generateColor(){
    const canvas = colorpickerRef.current;
    const ctx = canvas.getContext('2d');
    const size = width;
    const centerColor =  '#fff';
    //Generate main canvas to return
    canvas.width = canvas.height = width;
    //Generate canvas clone to draw increments on
    let canvasClone = document.createElement("canvas");
    canvasClone.width = canvasClone.height = width;
    let canvasCloneCtx:any = canvasClone.getContext("2d");
    //Initiate variables
    var angle = 0;
    var hexCode = [255, 0, 0];
    var pivotPointer = 0;
    var colorOffsetByDegree = 4.322;
    //For each degree in circle, perform operation
    while (angle++ < 360) {
        //find index immediately before and after our pivot
        var pivotPointerbefore = (pivotPointer + 3 - 1) % 3;
        var pivotPointerAfter = (pivotPointer + 3 + 1) % 3;
        //Modify colors
        if (hexCode[pivotPointer] < 255) {
            //If main points isn't full, add to main pointer
            hexCode[pivotPointer] = (hexCode[pivotPointer] + colorOffsetByDegree > 255 ? 255 : hexCode[pivotPointer] + colorOffsetByDegree);
        }
        else if (hexCode[pivotPointerbefore] > 0) {
            //If color before main isn't zero, subtract
            hexCode[pivotPointerbefore] = (hexCode[pivotPointerbefore] > colorOffsetByDegree ? hexCode[pivotPointerbefore] - colorOffsetByDegree : 0);
        }
        else if (hexCode[pivotPointer] >= 255) {
            //If main color is full, move pivot
            hexCode[pivotPointer] = 255;
            pivotPointer = (pivotPointer + 1) % 3;
        }
        //clear clone
        canvasCloneCtx.clearRect(0, 0, size, size);
        //Generate gradient and set as fillstyle
        var grad = canvasCloneCtx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        grad.addColorStop(0, centerColor);
        grad.addColorStop(1, "rgb(" + hexCode.map(function (h) { return Math.floor(h); }).join(",") + ")");
        canvasCloneCtx.fillStyle = grad;
        //draw full circle with new gradient
        canvasCloneCtx.globalCompositeOperation = "source-over";
        canvasCloneCtx.beginPath();
        canvasCloneCtx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        canvasCloneCtx.closePath();
        canvasCloneCtx.fill();
        //Switch to "Erase mode"
        canvasCloneCtx.globalCompositeOperation = "destination-out";
        //Carve out the piece of the circle we need for this angle
        canvasCloneCtx.beginPath();
        canvasCloneCtx.arc(size / 2, size / 2, 0, degreesToRadians(angle + 1), degreesToRadians(angle + 1));
        canvasCloneCtx.arc(size / 2, size / 2, size / 2 + 1, degreesToRadians(angle + 1), degreesToRadians(angle + 1));
        canvasCloneCtx.arc(size / 2, size / 2, size / 2 + 1, degreesToRadians(angle + 1), degreesToRadians(angle - 1));
        canvasCloneCtx.arc(size / 2, size / 2, 0, degreesToRadians(angle + 1), degreesToRadians(angle - 1));
        canvasCloneCtx.closePath();
        canvasCloneCtx.fill();
        //Draw carved-put piece on main canvas
        ctx.drawImage(canvasClone, 0, 0);
    }
  }
  function selectColor(e:any){
    const canvas = bgRef.current;
    const ctx = canvas.getContext('2d');
    console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    // let x = e.nativeEvent.pageX - canvas.offsetLeft;
    // let y = e.nativeEvent.pageY - canvas.offsetTop;
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;
    let pixel = colorpickerRef.current.getContext("2d").getImageData(x, y, 1, 1).data;
    let pixelColor = "rgb(" + pixel[0] + ", " + pixel[1]+", "+ pixel[2]+ ")";
    console.log(colorpickerRef.current.getContext("2d").getImageData(x, y, 1, 1));
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = pixelColor;
    ctx.beginPath();
    ctx.arc(e.nativeEvent.offsetX,e.nativeEvent.offsetY,10,0,2*Math.PI);
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.4)"
    ctx.stroke();


  }
  return (
    <div className="ColorPicker">
      <div className="wrap">
        <canvas width={width} height={height} ref={colorpickerRef} />
        <canvas className="canvas" ref={bgRef} onClick={selectColor} onMouseDown={selectColor} onMouseMove={selectColor} width={width} height={height} style={{background: 'transparent'}} />

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