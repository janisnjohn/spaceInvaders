var ship;
var enemies =[];
var shots = [];
var song;
var laserSound;
var blast;
var scoreElem;

function preload() {
    soundFormats('mp3', 'wav');
    song = loadSound('../public/sounds/background.mp3');
    // laserSound = loadSound('sounds/laserSound.mp3');
    // laserSound = loadSound('sounds/fast_zap.mp3');
    laserSound = loadSound('../public/sounds/laser_gun.wav');
    blast = loadSound('../public/sounds/medium_blast.mp3');
    imgBack = loadImage('../public/img/invader.jpg');
}

function setup(){
    createCanvas(600, 400);
    image(imgBack, 0, 0);
    scoreElem = createDiv("Score = 0");
    scoreElem.position(20, 20);
    scoreElem.id = 'score';
    scoreElem.style('color', 'white');
    song.loop();
    song.setVolume(0.5);
    
    // checkEnemyHitShip();
    ship = new Ship();
    for (var i=0; i < 6; i++) {
        enemies[i] = new Enemy(i *80 +80, 60);
    }
    checkGameStatus();
}

// function resetEnemies(){
//     for (var i=0; i < 12; i++) {
//         enemies[i] = new Enemy(i *80 +80, 60);
//     }
// }

function draw () {
    background(imgBack);
    ship.show();
    ship.move();
    checkGameStatus();
    for (var i=0; i<shots.length; i++){
        shots[i].show();
        shots[i].move();
        for (var j=0; j<enemies.length; j++) {
            if (shots[i].hits(enemies[j])) {
                enemies[j].evap();
                shots[i].evaporate();
            }
        }
    }
var edge = false;

for (var i =0; i < enemies.length; i++){
    enemies[i].show();
    enemies[i].move();
    if (enemies[i].x > width || enemies[i].x <0){
        edge = true;
    }
}

if (edge) {
    for (var i=0; i< enemies.length; i++){
        enemies[i].shiftDown();
    }
}

for (var i= shots.length-1; i>=0; i--) {
    if (shots[i].toDelete){
        shots.splice(i,1);
    }
}
for (var i= enemies.length-1; i>=0; i--) {
    if (enemies[i].toDelete){
        enemies.splice(i,1);
    }
}

}

//check to see if any enemies are left
function checkGameStatus() {
        if (enemies.length == 0) {
        var prevScore = parseInt((scoreElem.html()).substring(8));
        scoreElem.html('You passed a level.  Your score is : ' + (prevScore+1));
        redraw();
    }
}

// check to see if enemy hit the ship
function checkEnemyHitShip (){
    var enemy = new Enemy(ship.x, height);
    var ship = new Ship(enemy.x, height);
    if (enemy === ship) {
        var scoreVal = parseInt(scoreElem.html().substring(8));
        scoreElem.html('Game ended! Your score was : ' + scoreVal);
    }
}

function keyReleased () {
    if (key !=" "){
        ship.setDir(0);
}
}

function keyPressed () {
    if (key === " ") {
        var shot = new Shot(ship.x, height);
        laserSound.play();
        shots.push(shot);
    }
    if (keyCode === RIGHT_ARROW) {
        ship.setDir(1);
    } else if (keyCode === LEFT_ARROW){
        ship.setDir(-1);
    }

}
