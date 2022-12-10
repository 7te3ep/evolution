import {c, ctx} from "./canvas.js";
import {random} from "../tools/random.js";

class Food {

    constructor(x,y){
        this.margin = 30

        this.x = random(0+this.margin,c.width-this.margin)
        this.y = random(0+this.margin,c.height-this.margin)

        this.width = 10
        this.height = 10

        this.eat = false
    }
    update(gameFrame){
        //if (gameFrame%100 ==0){
        //    this.x = random(0+this.margin,c.width-this.margin)
        //    this.y = random(0+this.margin,c.height-this.margin)
        //}
    }

    draw(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x,this.y-this.height,this.width,this.height)
    }
}

export {Food};
