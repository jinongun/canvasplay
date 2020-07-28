import React from 'react';
import './Palette.scss';
import { FaLock,FaUnlock, FaRedoAlt } from 'react-icons/fa';


interface Props{
  [key: string]: any;
}

const MAX = 5;

export default function Palette(props:Props){
  const [locked, setLocked] = React.useState<any>({});
  const [colors, setColors] = React.useState<any>([]);
  const [selected, setSelected] = React.useState<number | null>(null);
  React.useEffect(()=>{
    setColors(generateColor(MAX));
  },[]);
  function lock(color:string){
    
    setLocked((prev:any)=>{
      if(prev[color]){
        const { [color]:removed, ...rest} = prev;
        return {...rest};
      }else{
        if(Object.keys(locked).length > 2){
          return {...prev}
        }
        return {...prev, [color]: true};
      }
    });
    console.log(locked);
  }
  function reset(){
    setColors([...Object.keys(locked), ...generateColor(MAX - Object.keys(locked).length)]);
    setSelected(null);
  }
  function select(idx:number){
    setSelected(idx);
  }
  return (
    <div className="Palette">
      <div className="box">
        <button onClick={reset}>
          <FaRedoAlt />
        </button>
        <span>3/3</span>
      </div>

      {
        colors.map((color:string, index: number)=>{
          return <Color onClick={()=>select(index)} lock={()=>lock(color)} color={color} key={index} locked={locked[color]} selected={selected === index} />
        })
      }
    </div>
  )
}

function Color(props:any){
  return (
    <div className={`box ${props.locked ? '--locked' : ''}`}>
      <div className={`Color ${props.selected ? '--selected' : ''}`} onClick={props.onClick} style={{background: props.color}} />
      <button onClick={props.lock}>
        {props.locked ? <FaLock /> : <FaUnlock />}
      </button>
    </div>
  )
}

function generateColor(n: number){
  let arr = [];
  for(let i = 0 ; i < n; i++){
    //arr.push(`hsla(${Math.random() * 360}, 100%, 50%, 1)`);
    arr.push(`#${((1<<24)*Math.random()|0).toString(16).padStart(6,"0")}`);
  }
  return arr;
}