//===================================
// _____|IMPORT MODULE FILES| _____// 
//===================================

let canvas = document.getElementById('canvas')

import {c, ctx} from "./modules/canvas.js";
import {DisplayNumber} from "./tools/numberDisplay.js";
import { collisionCheck } from "./tools/collisionCheck.js";
import { random } from "./tools/random.js";
import { Blob } from "./modules/blob.js";
import { Food } from "./modules/food.js";


//=================================
// _____|DECLARE VARIABLES| _____// 
//=================================

let fps = 30
let frame = 0

//==============================
// _____|HANDLE OBJECTS| _____// 
//==============================
let blobs = []
for (let max = 0;max<1;max++){
  blobs.push(new Blob(400,400))
}

let foods = []
for (let max = 0;max<50;max++){
  foods.push(new Food(400,400))
}

//let blobs = new Array(10).fill(new Blob(400,400));
function handleBlobs(frame){
    blobs.forEach(blob => {
      blob.update(frame,foods)
      blob.draw()
    });
}

function handleFoods(frame){
  for (let i = 0;i<foods.length;i++){
    foods[i].update(frame)
    foods[i].draw()
    if (foods[i].eat){
      foods.splice(i,1)
      i --
    }
  }
}

//=========================
// _____|GAME LOOP| _____// 
//=========================

function animate(){
    ctx.clearRect(0,0,c.width,c.height)
    handleFoods(frame)
    handleBlobs(frame)
    frame ++
    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 1000 / fps);
}

animate()
//===========================
// _____|INTERACTION| _____// 
//===========================

canvas.addEventListener("click", function (e) { 
    let mousePos = getMousePos(canvas, e) 
}) 

function  getMousePos(canvas, evt) { 
    var rect = canvas.getBoundingClientRect(), // abs. size of element 
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x 
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y 

    return {
      x: Math.ceil((evt.clientX - rect.left) * scaleX),   // scale mouse coordinates after they have 
      y: Math.ceil((evt.clientY - rect.top) * scaleY )    // been adjusted to be relative to element 
    }
}
