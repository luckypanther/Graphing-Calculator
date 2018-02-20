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
let tick_mark_height = 0.4
let tick_mark_thickness = 0.2
let x_ticks = 1
let y_ticks = 1
let CIRCLE_FILL = "black"
let POINT_RADIUS = 1
let LINE_WEIGHT = 2.5

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
  clear()
  let func_string = document.getElementById("function").value
  let f = generate(func_string)
  x_min = parseFloat(document.getElementById("x-min").value)
  x_max = parseFloat(document.getElementById("x-max").value)
  y_min = parseFloat(document.getElementById("y-min").value)
  y_max = parseFloat(document.getElementById("y-max").value)
  tick_marks = document.getElementById("tick-marks").checked
  x_ticks = parseFloat(document.getElementById("x-ticks").value)
  y_ticks = parseFloat(document.getElementById("y-ticks").value)
  drawAxes()
  if(tick_marks){
    drawTickMarks()
  }
  if(f){
    drawGraph(f)
  }  
}

function drawAxes(){
  // let top = convert_to_draw(0, y_max)
  // let bottom = convert_to_draw(0, y_min)
  // let right = convert_to_draw(x_max, 0)
  // let left = convert_to_draw(x_min, 0)
  conv_line(0, y_max, 0, y_min)
  conv_line(x_min, 0, x_max, 0)
}

function drawTickMarks(){
  let x_low = Math.ceil(x_min/x_ticks)*x_ticks
  // let x_high = Math.floor(x_max/x_ticks)*x_ticks
  let y_low = Math.ceil(y_min/y_ticks)*y_ticks
  // let y_high = Math.floor(y_max/y_ticks)*y_ticks
  for(let i = x_low; i < x_max; i += x_ticks){
    conv_line(i, -tick_mark_height, i, tick_mark_height, tick_mark_thickness)
  }
  for(let i = y_low; i < y_max; i += y_ticks){
    conv_line(-tick_mark_height, i, tick_mark_height, i, tick_mark_thickness)
  }
}

function drawGraph(func){
  let x_start = convert_to_graph(0, 0).x
  let y_start = func(x_start)
  // let current_p = convert_to_draw(x_start, y_start)
  for(let i = 0; i < width; i++){
    let x = convert_to_graph(i, 0).x
    let y = func(x)
    // let p = convert_to_draw(x, y)
    // let d_squared = (current_p.x-p.x)*(current_p.x-p.x) + (current_p.y-p.y)*(current_p.y-p.y)
    // let w = LINE_WEIGHT+Math.pow(d_squared, 0.85)*0.00004
    // point(p.x, p.y)
    // line(current_p.x, current_p.y, p.x, p.y)
    conv_point(x, y)
    conv_line(x_start, y_start, x, y)
    // current_p = p
    x_start = x
    y_start = y
  }
}

function generate(func_string){
  // func_string = func_string.replace(/\s/g, "")
  let f = (x) => {}
  if(func_string.charAt(0) == 'x' && func_string.charAt(1) == '^'){
    f = (x) => Math.pow(x, parseInt(func_string.substring(2)))
    return f
  }
  return demo  
}

function loadPixels(){
  pixels = ctx.getImageData()
}

function setPixels(){
  ctx.putImageData(pixels, 0, 0, width, height);
}

function demo(x){
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

function conv_point(x, y){
  let p = convert_to_draw(x, y)
  point(p.x, p.y)
}

function conv_line(x1, y1, x2, y2){
  let p1 = convert_to_draw(x1, y1)
  let p2 = convert_to_draw(x2, y2)
  line(p1.x, p1.y, p2.x, p2.y)
}

function point(x, y){
  circle(x, y, POINT_RADIUS)
}

function line(x1, y1, x2, y2, width){
  if(width){
    ctx.lineWidth = width
  }
  else {
    ctx.lineWidth = LINE_WEIGHT
  }
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.lineWidth = 0
}

function noLoop(){
  loop = false
}

function reloop(){
  loop = true
}

function clear(){
  ctx.fillStyle = "white"
  ctx.rect(0, 0, width, height)
  ctx.fill()
}

function clearGraph(){
  clear()
  drawAxes()
}

function clearAxes(){
  clear()
  drawGraph(f)
}