let canvas
let ctx
let pixels
let width, height
let fps = 60
let loop = true
let x_min = -400
let x_max = 400

function init(){
  canvas = document.getElementById("canvas")
  ctx = canvas.getContext("2d")
  window.setInterval(draw, 1000/fps)
  width = canvas.width
  height = canvas.height
}

function draw(){
  if(!loop){
    return
  }
  for(let x = x_min; x <=x_max; x++){
    let y = x*x
    circle(x, y, 0.1, "#000000")
  }
}

function loadPixels(){
  pixels = ctx.getImageData()
}

function setPixels(){
  ctx.putImageData(pixels, 0, 0, width, height);
}

function convert_coord(x, y){
  return {x: x+width/2, y: height/2-y}
}

function circle(x, y, r, fill){
  ctx.fillStyle = fill
  let p = convert_coord(x, y)
  ctx.arc(p.x, p.y, r, 0, 2*Math.PI)
  ctx.stroke()
}

function line(x1, y1, x2, y2){
  ctx.beginPath()
  let p1 = convert_coord(x1, y1)
}

function noLoop(){
  loop = false
}
