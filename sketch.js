var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup=createGroup();
  climbersGroup=createGroup();
  invisibleBlockGroup=createGroup();

  ghost=createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
 ghost.scale=0.3;
}

function draw() {
  background(200);
  if(gameState==="play"){
     if(tower.y > 400){
      tower.y = 300
    }
    
    if(keyDown("right")){
      ghost.x=ghost.x+3;
    }
    if(keyDown("left")){
      ghost.x=ghost.x-3;
    }

    if(keyDown("space")){
      ghost.velocityY=-5;
    }
    ghost.velocityY=ghost.velocityY+0.8;
    spawnDoors();
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    if(ghost.y>600|| invisibleBlockGroup.isTouching(ghost)){
      gameState="end"
    }
    drawSprites();
  }
  else{
    fill("red");
    textSize(40);
    textAlign(CENTER,CENTER);
    tower.velocityY=0;
    text("GAME OVER",300,300);
  }
 
    
}
function spawnDoors(){
  if(frameCount%250===0){
    var door=createSprite(200,-50);
    door.addImage("door",doorImg);
    door.velocityY=1;
    door.x=random(100,500);
    door.lifetime=600;
    ghost.depth=door.depth
    ghost.depth+=1;
    doorsGroup.add(door);
    
    var climber=createSprite(door.x,10);
    climber.addImage("climber",climberImg);
    climber.velocityY=1;
    climber.lifetime=600;
    climbersGroup.add(climber);
    var invisibleBlock=createSprite(door.x,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.velocityY=1;
    invisibleBlock.lifetime=600;
    invisibleBlock.visible=false;
    invisibleBlockGroup.add(climber);
  }
}
