function Enemy(x,y) {
    this.x = x;
    this.y = y;
    this.r = 30;

    this.xdir =5;
    this.ydir =0;
    this.toDelete = false;

    // this.grow = function() {
    //     this.r = this.r -4;
    //     blast.play();
    // }

    this.evap = function() {
    this.toDelete = true;
    blast.play();
  }

    this.shiftDown = function(){
        this.xdir *=-1;
        this.y +=this.r;
    }

    this.move =function(){
        this.x = this.x + this.xdir;
        this.y = this.y + this.ydir;
    }

    this.show = function(){
        fill(255, 0, 200);
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }

};
