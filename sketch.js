//the objects have been created using this code.
var cloudimage;
var trex, trex_running;
var groundImage;
var Floor;
var gamescore = 0;
var o1, o2, o3, o4, o5, o6;
var gameState = "play",
  ogrp, cgrp;
var collide
var cp,jump,die;
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png ")
  o1 = loadImage("obstacle1.png")
  o2 = loadImage("obstacle2.png")
  o3 = loadImage("obstacle3.png")
  o4 = loadImage("obstacle4.png")
  o5 = loadImage("obstacle5.png")
  o6 = loadImage("obstacle6.png")
  cp=loadSound("checkPoint.mp3")
  jump=loadSound("jump.mp3")
  die=loadSound("die.mp3")
  collide = loadAnimation("trex_collided.png")
  
}

function setup() {

  //The frame gets created and the ground for the trex to run on gets created too
  createCanvas(600, 200);
  Floor = createSprite(59, 160)
  Floor.addImage(groundImage);
  Floor2 = createSprite(300, 160, 600, 1)
  Floor2.visible = false

  // creating trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide", collide);
  //trex.debug  = true;
  trex.setCollider("circle", 0, 0, 55);
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50;

  ogrp = new Group();
  cgrp = new Group();
}



function draw() {
  //set background color 
  background(180);
  console.log(trex.y)
  if (gameState === "play") {
    spawnClouds();
   if (gamescore%100===0 && gamescore>0 ){
    cp.play()
     
   }
    
    
    
    spawnObstacles();
    gamescore = gamescore + 1
    floor.velocityY = -(9+3*gamescore/100)
    if (keyDown("space") && trex.y > 131) {
      trex.velocityY = -9;
      jump.play()
    }
    trex.velocityY = trex.velocityY + 0.5;
    if (ogrp.isTouching(trex)) {
      gameState = "end";
      die.play()
    }

  } else if (gameState === "end") {
    floor.velocityX = 0;
    trex.velocityY = 0;
    cgrp.setVelocityXEach(0);
    ogrp.setVelocityXEach(0)
    cgrp.setLifetimeEach(-1)
    ogrp.setLifetimeEach(-1)
    trex.changeAnimation("collide", collide)






  }

  text(gamescore, 500, 50, textSize(20));
  
  drawSprites();
  trex.collide(Floor2);


}




function spawnClouds() {
  if (frameCount % 70 === 0) {

    var Clouds = createSprite(600, 27);
    Clouds.y = Math.round(random(13, 40));
    Clouds.addImage(cloudImage);
    Clouds.velocityX = -9;
    Clouds.depth = trex.depth;
    trex.depth = trex.depth + 1;
    Clouds.lifetime = 100;
    cgrp.add(Clouds);
  }
}

function spawnObstacles() {
  if (frameCount % 50 === 0) {

    var Obstacle = createSprite(600, 136)
    var r = Math.round(random(1, 6))
    Obstacle.velocityX = -9
    Obstacle.depth = trex.depth
    trex.depth = trex.depth + 1
    Obstacle.lifetime = 100
    Obstacle.scale = 0.6
    switch (r) {
      case 1:
        Obstacle.addImage(o1)
        break;
      case 2:
        Obstacle.addImage(o2)
        break;
      case 3:
        Obstacle.addImage(o3)
        break;
      case 4:
        Obstacle.addImage(o4)  
        break;
      case 5:
        Obstacle.addImage(o5)
        break;
      case 6:
        Obstacle.addImage(o6)
        break;
      default:
        break;

    }
    ogrp.add(Obstacle);
  }

}