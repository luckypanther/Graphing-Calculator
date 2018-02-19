let canvas
let ctx
let pixels
let width, height
let fps = 60
let loop = true
let x_min = -10
let x_max = 10
let y_min = -10
let y_max = 10
let CIRCLE_FILL = "black"
let POINT_RADIUS = 1
let LINE_WEIGHT = 2

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
  drawAxes()
  drawGraph(f)
  noLoop()
}

function drawAxes(){
  let top = convert_to_draw(0, y_max)
  let bottom = convert_to_draw(0, y_min)
  let right = convert_to_draw(x_max, 0)
  let left = convert_to_draw(x_min, 0)
  line(top.x, top.y, bottom.x, bottom.y)
  line(left.x, left.y, right.x, right.y)
}

function drawGraph(func){
  let x_start = convert_to_graph(0, 0).x
  let y_start = func(x_start)
  let current_p = convert_to_draw(x_start, y_start)
  for(let i = 0; i < width; i++){
    let x = convert_to_graph(i, 0).x
    let y = func(x)
    let p = convert_to_draw(x, y)
    point(p.x, p.y)
    line(current_p.x, current_p.y, p.x, p.y)
    current_p = p
    // console.log(p)
  }
}

function loadPixels(){
  pixels = ctx.getImageData()
}

function setPixels(){
  ctx.putImageData(pixels, 0, 0, width, height);
}

function f(x){
  return x + Math.sin(x)
}

function convert_to_draw(x, y){
  //Convert x in (x_min, x_max) to x in (0, width)
  //Convert y in (y_min, y_max) to (height, 0)
  let x_range = x_max - x_min
  let y_range = y_max - y_min
  return {x: (x-x_min)*width/x_range, y: height - (y-y_min)*height/y_range}
}

function convert_to_graph(x, y){
  //Convert x ranging from 0 to width to x ranging from x_min to x_max
  //Convert y in (0, height) to (y_max, y_min)
  let x_range = x_max - x_min
  let y_range = y_max - y_min
  return {x: x_range*x/width + x_min, y: (height-y)*y_range/height + y_min}
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
  ctx.lineWidth = LINE_WEIGHT
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}

function noLoop(){
  loop = false
}
