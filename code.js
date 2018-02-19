let canvas
let ctx
let pixels
let width, height
let fps = 60
let loop = true
let x_min = -10
let x_max = 10
let y_min = 10
let y_max = 10
let CIRCLE_FILL = "black"
let POINT_RADIUS = 2

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
  for(let i = 0; i < width; i++){
    let x = convert_to_graph(i)
    let y = f(x)
    let p = convert_to_draw(x, y)
    console.log(p)
    point(p.x, p.y)
  }
  noLoop()
}

function loadPixels(){
  pixels = ctx.getImageData()
}

function setPixels(){
  ctx.putImageData(pixels, 0, 0, width, height);
}

function f(x){
  return 200*Math.sin(x/200)
}

function convert_to_draw(x, y){
  return {x: x+width/2, y: height/2-y}
}

function convert_to_graph(x, y){
  if(y){
    return {x: x-width/2, y: height/2-y}
  }
  return x-width/2
}

function circle(x, y, r){
  ctx.beginPath()
  ctx.fillStyle = CIRCLE_FILL
  ctx.arc(x, y, r, 0, 2*Math.PI)
  ctx.fill()
}

function point(x, y){
  circle(x, y, POINT_RADIUS)
}

function line(x1, y1, x2, y2){
  ctx.beginPath()
  let p1 = convert_to_draw(x1, y1)
  let p2 = convert_to_draw(x2, y2)
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
}

function noLoop(){
  loop = false
}
