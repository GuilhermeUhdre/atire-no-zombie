var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie
var zombieGroup
var bullets = 70

var life = 3
var score = 0
var gameState = "fight"

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadAnimation("assets/Zombie1.png","assets/Zombie2.png","assets/Zombie3.png")
  heart1img = loadImage("assets/heart_1.png")
  heart2img = loadImage("assets/heart_2.png")
  heart3img = loadImage("assets/heart_3.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
 /* bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1 */
  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
  heart1.addImage("heart1",heart1img)
  heart1.scale = 0.4
  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.visible = false
  heart2.addImage("heart2",heart2img)
  heart2.scale = 0.4
  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage("heart3",heart3img)
  heart3.scale = 0.4

   zombieGroup = new Group()
   bulletGroup = new Group()
}

function draw() {
  background(0); 

  image(bgImg,0,0,width,height)

if (gameState === "fight"){

  if(life ===3){
    heart1.visible = false
    heart2.visible = false
    heart3.visible = true
  }
  if(life ===2){
    heart1.visible = false
    heart2.visible = true
    heart3.visible = false
  }
  if(life ===1){
    heart1.visible = true
    heart2.visible = false
    heart3.visible = false
  }

  if(life === 0){
    gameState = "lost"
    heart1.visible = false
  }

  if(bullets === 0){
    gameState = "bullet"
  }
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }
  if ( score ===100){

    gameState = "won"

  }

  if(keyWentDown("space")){
 
    player.addImage(shooter_shooting)
    bullet = createSprite(displayWidth - 1150,player.y - 30,20,10)
    bullet.velocityX = 20
    bulletGroup.add(bullet)
    bullets = bullets-1
   
  }
  
  else if(keyWentUp("space")){
    player.addImage(shooterImg)
  }

  if(zombieGroup.isTouching(bulletGroup)){
    for(var i =0; i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        for (var i = 0; i<bulletGroup.length; i++){
          bulletGroup[i].destroy()
         score = score+2
          
        }
      }
    }
  }
  if(zombieGroup.isTouching(player)){
  
    for(var i =0; i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(player))
      zombieGroup[i].destroy()
      life -=1
    }

  }
  gerarZombie()
}
drawSprites();

if(gameState === "lost"){
  textSize(150) 
  text("você perdeu",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
else if(gameState ==="won"){
  textSize(100)
  fill("yellow")
  text("você ganhou",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
else if(gameState === "bullet"){

  textSize(150) 
  text("você não tem mais bala!",400,400)
  zombieGroup.destroyEach()
  player.destroy()
  bulletGroup.destroyEach()
}


textSize(20)
fill("white") 
text("Balas = " + bullets,displayWidth-180,displayHeight/2-250)
text("Pontuação = " + score,displayWidth-180,displayHeight/2-220) 
text("Vidas = " + life,displayWidth-180,displayHeight/2-280)
}
function gerarZombie(){

  if(frameCount%60 ===0){

  zombie = createSprite(width,random(250,800),40,40)
  zombie.addAnimation("zombie",zombieImg)
  zombie.velocityX = -8
  zombie.debug = true
  zombie.scale = 0.5

  zombieGroup.add(zombie)
  }

  
}