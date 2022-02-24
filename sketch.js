var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300, 300)
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4;
  ghost.debug = true
  ghost.setCollider( "rectangle",0,0,130,240)
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
 if(gameState=== "play"){

 
  if (tower.y > 400) {
    tower.y = 300
  }
  createwindows();
  if (keyDown("space")) {
    ghost.velocityY = -9
  }
  ghost.velocityY= ghost.velocityY+0.5
 if (keyDown(RIGHT_ARROW)){
   ghost.x = ghost.x+2
 }
 if (keyDown(LEFT_ARROW)){
  ghost.x = ghost.x-2
}
if(ghost.isTouching (climbersGroup)){
  ghost.velocityY = 0
}

if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
  gameState = "end"
}
  drawSprites();
}
else{
  textSize  (30)
  fill ("white")
  text ( "GAMEOVER",200,300)

}
}
function createwindows() {
  if (frameCount % 150 === 0) {
    door = createSprite(200, -50);
    door.addImage("door", doorImg)
    door.velocityY = 1
    door.x = random(120, 400);
    climber = createSprite(200, 10);
    climber.addImage("climber", climberImg);
    climber.velocityY = 1
    climber.x = door.x;
    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    invisibleBlock.velocityY = 1;
    invisibleBlock.x = door.x
    invisibleBlock.visible = false
    invisibleBlock.debug = false
    ghost.depth  = door.depth;
    ghost.depth =ghost.depth + 1

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

  }
}