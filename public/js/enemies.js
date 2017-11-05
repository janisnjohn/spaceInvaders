function Enemy(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = 30;
    this.graphic = loadImage("/img/smallinvader.png");

    this.xdir = 1;
    this.ydir = 0;
    this.toDelete = false;

    this.evap = function() {
        this.toDelete = true;
    }

    this.shiftDown = function(){
        this.xdir *= -1;
        this.y += this.r;
        console.log(this.y)
    }

    this.move =function(){
        this.x = this.x + this.xdir;
        this.y = this.y + this.ydir;
    }

    this.show = function(){
        image(this.graphic, this.x, this.y, this.r, this.r);
        //fill(255, 0, 200);
        //ellipse(this.x, this.y, this.r*2, this.r*2);
    }
};


function EnemyGroup(rows) {
    this.rows = rows

    this.totalWidth = 300

    for (var i=0; i < n; i++) {
        enemies[i] = new Enemy(i *80 +80, 60);
    }

}
