var cacador1, cacador2, cacador3, cacador;
var zoombie, zoombieImage;
var coracao1,coracao1Image, coracao2,coracao2Image, coracao3,coracao3Image;
var gameOver;
var background,backgroundImage;
var grupozoombie;
var bala

function preload() {
  coracao1Image = loadImage("assets/heart_1.png")
  coracao2Image = loadImage("assets/heart_2.png")
  coracao3Image = loadImage("assets/heart_3.png")
  backgroundImage = loadImage("assets/bg.jpeg")
  cacador1 = loadImage("assets/shooter_1.png")
  cacador2 = loadImage("assets/shooter_2.png")
  cacador3 = loadImage("assets/shooter_3.png")
  zoombieImage = loadImage("assets/zombie.png")
  //gameOver = loadSound("morreu", "assets/lose.mp3")
  bala = loadImage("assets/munição.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background = createSprite(1280,600)
  background = addImage(backgroundImage)
  grupozoombie = new Group()
  cacador = createSprite(0, 600)
  cacador.addImage(cacador2)
  coracao3 = createSprite(1000, 0)
  coracao3.addImage(coracao3Image)
  coracao3.visible = true
  coracao3.scale = 0.4
  coracao2.addImage(coracao2Image)
  coracao2 = createSprite(1050, 0)
  coracao2.visible = false
  coracao2.scale = 0.4
  coracao1.addImage(coracao1Image)
  coracao1 = createSprite(1100, 0)
  coracao1.visible = false
  coracao1.scale = 0.4
}

function draw() {
  background(0);

  //mova o jogador para cima e para baixo e torne o jogo compatível com dispositivos móveis usando touches (toques)
  if (keyDown("UP_ARROW")) {
    cacador.addImage(cacador2)
    cacador.y = cacador.y - 30
  }
  if (keyDown("DOWN_ARROW")) {
    cacador.addImage(cacador2)
    cacador.y = cacador.y + 30
  }
  if (keyWentDown("space")) {

    cacador.addImage(cacador3)
    bala = createSprite(cacador.x, cacador.y, 50, 30)
    bala.velocityX = 6
    bala.scale = 0.5
    bala.lifetime = displayHeight + 20
    bala.setCollider(0, 0, 50, 30)
  }

  if (grupozoombie.isTouching(cacador)) {
    coracao3.visible = false
    coracao2.visible = true
    if (coracao2.visible = true && grupozoombie.isTouching(cacador)) {
      coracao2.visible = false
      coracao1.visible = true
    }
    if (coracao1.visible = true && grupozoombie.isTouching(cacador)) {
      cacador.addImage(cacador1)
      cacador.velocityX = 0
      cacador.velocityY = 0
      zoombie.lifetime = 0

    }
    for (var i = 0; i < grupozoombie.length; i++) {

      if (grupozoombie[i].isTouching(cacador)) {
        grupozoombie[i].destroy()
      }
    }
  }
  if (grupozoombie.isTouching(bala)) {


    for (var i = 0; i < grupozoombie.length; i++) {

      if (grupozoombie[i].isTouching(bala)) {
        grupozoombie[i].destroy()
      }
    }
  }
  //o jogador volta à imagem original quando pararmos de pressionar a tecla espaço
  if (keyWentUp("space")) {
    player.addImage(cacador2)
  }

  drawSprites();
  spawnZoombie()
}
function spawnZoombie() {
  if (frameCount % 60 == 0) { //a cada tempo executar
    tempoZoombie = Math.round(random(60, 300));
    zoombie = createSprite(Math.round(random));
    grupozoombie.add(zoombie);
    zoombie.addImage( zoombieImage);
    zoombie.velocityX = -2;
    zoombie.lifetime = 600;

  }
}