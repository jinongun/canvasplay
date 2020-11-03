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
    ctx.beginPath();
    ctx.fillStyle = 'red';
    this.point.update();
    ctx.arc(this.point.x, this.point.y, 5, 0, 2*Math.PI);
    ctx.fill();
  }
  drawX(ctx){
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    this.point.updateX();
    ctx.arc(this.point.x, this.point.y, 5, 0, 2*Math.PI);
    ctx.fill();
  }
  drawL2R(ctx){
    ctx.beginPath();
    ctx.fillStyle = 'green';
    this.point.updateL2R();
    ctx.arc(this.point.x, this.point.y, 5, 0, 2*Math.PI);
    ctx.fill();
  }
  drawR2L(ctx){
    ctx.beginPath();
    ctx.fillStyle = 'black';
    this.point.updateR2L();
    ctx.arc(this.point.x, this.point.y, 5, 0, 2*Math.PI);
    ctx.fill();
  }
  circle(ctx){
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    this.point.circle();
    ctx.arc(this.point.x, this.point.y, 5, 0, 2*Math.PI);
    ctx.fill();
  }
}