import {c, ctx} from "./canvas.js";
import {random} from "../tools/random.js";

class Blob {

    constructor(x,y){
        this.x = x
        this.y = y

        this.speed = 20

        this.width = 20
        this.height = 20

        this.dx = 0
        this.dy = 0

        this.speed = 3

        this.margin = 30

        this.vision = 100

        this.xCenter = this.x+ this.width/2
        this.yCenter = this.y- this.height/2

        this.closeFoods = []
    }
    changeDirection(){
        let spd = this.speed
        let Nspd = this.speed * -1
        this.dx += random(Nspd,spd)
        this.dy += random(Nspd,spd)
        if (this.dx > spd){this.dx=spd}
        if (this.dx < Nspd){this.dx=Nspd}
        if (this.dy > spd){this.dy=spd}
        if (this.dy < Nspd){this.dy=Nspd}
        if (this.x + this.dx >= c.width -this.margin || this.x + this.dx <= 0 + this.margin){this.dx = this.dx*-1}
        if (this.y + this.dy >= c.height -this.margin || this.y + this.dy <= 0 + this.margin){this.dy = this.dy*-1}
    }

    goToFood(objective){
        this.obj = objective
        var diff = {x:this.x-this.obj.x,y:this.y-this.obj.y}
        var dist = Math.sqrt((diff.x ** 2) + (diff.y ** 2))

        var dir = {x:Math.ceil((diff.x/dist)*this.speed), y:Math.ceil((diff.y/dist)*this.speed)}
        this.x -= dir.x 
        this.y -= dir.y
    }

    drawVision(){
        ctx.beginPath();
        ctx.arc(this.xCenter, this.yCenter, this.vision, 0, 2 * Math.PI);
        ctx.fill();
    }

    foodToGo(foods){
        this.closeFoods = []
        foods.forEach(element => {
            let x = this.xCenter
            let y = this.yCenter
            if (this.x < element.x){
                x = element.x
            }else {
                if (this.x > element.x + element.width){
                    x = element.x + element.width
                }
            }
            if (this.y < element.y){
                y = element.y
            }else {
                if (this.y > element.y + element.height){
                    y = element.y + element.height
                }
            }
            let distX = this.x - x
            let distY = this.y - y
            let dist = Math.sqrt(distX*distX+distY*distY)
            if (dist < this.vision){
                this.closeFoods.push({food:element,dist:dist})
            }
            if (dist < this.width || dist < this.height ){
                element.eat = true
            }
        });
    }

    update(gameFrame,foods){
        this.xCenter = this.x+ this.width/2
        this.yCenter = this.y- this.height/2
        this.foodToGo(foods)
        if (this.closeFoods.length != 0){
            this.closeFoods.sort(function(a, b) {
                return a.dist - b.dist;
            });
            this.goToFood({x:this.closeFoods[0].food.x,y:this.closeFoods[0].food.y})
        }else {
            if (gameFrame%10 == 0){
                this.changeDirection()
            }
        }

        this.x += this.dx
        this.y += this.dy
    }

    draw(){
        ctx.fillStyle = "rgba(0, 0, 255, 0.1)"
        this.drawVision()
        ctx.fillStyle = "green";
        ctx.fillRect(this.x,this.y-this.height,this.width,this.height)
    }
}

export {Blob};
