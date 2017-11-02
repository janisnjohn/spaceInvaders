var ship;
var enemies =[];
var shots = [];
var song;
var laserSound;
var blast;

function preload() {
    soundFormats('mp3', 'wav');
    song = loadSound('sounds/background.mp3');
    // laserSound = loadSound('sounds/laserSound.mp3');
    // laserSound = loadSound('sounds/fast_zap.mp3');
    laserSound = loadSound('sounds/laser_gun.wav');
    blast = loadSound('sounds/medium_blast.mp3');
}

function setup(){
    createCanvas(600, 400);
    song.play();
    song.setVolume(0.5);
    ship = new Ship();
    for (var i=0; i < 6; i++) {
        enemies[i] = new Enemy(i *80 +80, 60);
    }
}

function draw () {
    background(51);
    ship.show();
    ship.move();

    for (var i=0; i<shots.length; i++){
        shots[i].show();
        shots[i].move();
        for (var j=0; j<enemies.length; j++) {
            if (shots[i].hits(enemies[j])) {
                enemies[j].grow();
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
