const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon;
var balls = []

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);
  
  tower = Bodies.rectangle(160,350,160,310,options); 
  World.add(world, tower);

  cannon = new Cannon(180,110,130,100,angle);

  cannonball = new Cannonball(cannon.x,cannon.y);
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x,tower.position.y,160,310);
  pop();
  for (var i = 0;i<balls.length;i++){
    showcannonball(balls[i])
  }
  cannon.display(); 
  cannonball.display();
}
function keyReleased(){
  if(keyCode === DOWN_ARROW){
    balls[balls.length-1].shoot()
  }
}
function showcannonball(ball){
  if(ball){
    ball.display();
  }
}
function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var cannonball = new Cannonball(cannon.x,cannon.y);
    cannonball.trajectory = [];
    Matter.Body.setAngle(cannonball.body,cannon.angle);
    balls.push(cannonball)
  }
}