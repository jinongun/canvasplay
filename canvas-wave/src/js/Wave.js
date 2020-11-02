import { Point } from './Point';
export class Wave{
  constructor(){

  }
  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    this.init();
  }
  init() {
    this.point = new Point(150, 150);
  }

  draw(ctx){
    console.log('draw')
    ctx.beginPath();
    ctx.fillStyle = '#ff0000';
    this.point.update();

    ctx.arc(this.point.x, this.point.y, 10, 0, 2*Math.PI);
    ctx.fill();
  }
}