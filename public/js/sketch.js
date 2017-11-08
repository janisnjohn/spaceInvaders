
var scoreBoard;
var gameSounds;

var gameOn = true;
var enemySpeed = 0;
var ship;
var enemies = [];
var shots = [];


function preload() {
    soundFormats('mp3', 'wav', 'ogg');

    gameSounds = {
        laserSound: loadSound('/sounds/laser_gun.wav'),
        blast: loadSound('/sounds/bomb.mp3'),
        song: loadSound('/sounds/trimbackground.wav'),
    }
    
    gameImages = {
        background: loadImage('/img/invader.jpg'),
    }
    
}


function setup(){
    var canvas = createCanvas(800, 600);
    canvas.parent('sketch-holder');
    frameRate(60);

    scoreBoard = new scoreBoard();
    ship = new Ship();
    resetEnemies();

    gameSounds.song.loop();
    gameSounds.song.setVolume(0.5);
    makeRestartButton();
}


function makeRestartButton(){
    var button = createButton("restart");
    button.position(810, 570);
    button.parent('sketch-holder');
    button.mousePressed(restartSketch); 
}


function restartSketch(){
    enemies = [];
    shots = [];
    ship = new Ship();
    scoreBoard.reset();
    resetEnemies();
    gameOn = true;
}


function resetEnemies(){
    var max_enemy_cols = 9;
    var max_enemies = 75;
    var enemySpeed = Math.max(scoreBoard.level * .25, 1);
    var numberOfEnemies = Math.min(scoreBoard.level + 6, max_enemies);

    enemies = [];
    for (var i=0; i < numberOfEnemies; i++) {
        var col = i % max_enemy_cols;
        var row = Math.floor(i/max_enemy_cols)
        enemy = new Enemy(col *80 +80, row *60 +60);
        enemy.xdir = enemySpeed
        enemies.push(enemy)
    }
}


function draw () {
    if (gameOn){
        background(gameImages.background);
        checkGameStatus();
        checkShip();
        moveShots();
        checkShots();
        moveEnemies();
        checkEnemies();
    }
}


// Updates shots positions
function moveShots(){    
    for (var i=0; i < shots.length; i++){
        shots[i].move();
        shots[i].show();
        for (var j=0; j < enemies.length; j++) {
            if (shots[i].hits(enemies[j])) {
                enemies[j].evap();
                shots[i].evaporate();
            }
        }
    }
}

// Removes shots that have collided or passed off screen
function checkShots(){   
    for (var i = shots.length-1; i >= 0; i--) {
        if (shots[i].toDelete){
            shots.splice(i,1);
        }
    }
}

// Updates enemies positions
function moveEnemies(){
    var edge = false;
    
    for (var i = 0; i < enemies.length; i++){
        enemies[i].show();
        enemies[i].move();
        if (enemies[i].x > 760 || enemies[i].x <0){
            edge = true;
        }
        if (enemies[i].y > 550){
            gameOver();
        }
    }

    if (edge) {
        for (var i=0; i< enemies.length; i++){
            enemies[i].shiftDown();
        }
    }
}


// Removes dead enemies
function checkEnemies(){
    for (var i= enemies.length-1; i >= 0; i--) {
        if (enemies[i].toDelete){
            gameSounds.blast.play();
            scoreBoard.increaseScore(1);
            enemies.splice(i,1);
        }
    }
}

//check to see if any enemies are left
function checkGameStatus() {
    if (enemies.length == 0) {
        scoreBoard.increaseLevel(1);
        ship.reduceRecharge(10);
        resetEnemies();
    }
}

function checkShip(){
    if(keyIsDown(LEFT_ARROW) & keyIsDown(RIGHT_ARROW)){
        ship.setDir(0);
    } else if(keyIsDown(LEFT_ARROW)){
        ship.setDir(-1);
    } else if(keyIsDown(RIGHT_ARROW)){
        ship.setDir(1);
    } else {
        ship.setDir(0);
    }
    ship.move();
    ship.show();
}

function gameOver(){
    gameOn = false;
    window.location.href = "/gameOver/"+String(scoreBoard.score);   
}

function keyPressed () {
    if (key === " " && gameOn) {
        if (ship.ready){
            ship.shoot();
            var shot = new Shot(ship.x, height);
            gameSounds.laserSound.play();
            shots.push(shot);
        }
    }
}
