export class Point {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.fixedX = x;
    this.speed = 0.1;
    this.cur = 0;
    this.max = Math.random() * 100 + 25;
  }

  update(){
    this.cur += this.speed;
    this.y = this.fixedY + (Math.sin(this.cur) * this.max);
  }
  updateX(){
    this.cur += this.speed;
    this.x = this.fixedX + (Math.cos(this.cur) * this.max)
  }
  updateL2R(){
    this.cur += this.speed;
    this.x = this.fixedX + (Math.sin(this.cur) * this.max)

    this.y = this.fixedY + (Math.sin(this.cur) * this.max);
  }
  updateR2L(){
    this.cur += this.speed;
    this.x = this.fixedX + (Math.sin(this.cur) * this.max)
    this.y = this.fixedY + (Math.sin(this.cur) * this.max)  * -1 ;
  }
  circle(){
    this.cur += this.speed;
    this.x = this.fixedX + (Math.cos(this.cur) * this.max)
    this.y = this.fixedY + (Math.sin(this.cur) * this.max);
  }
}