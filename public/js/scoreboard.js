
function scoreBoard(){
    this.level = 1;
    this.score = 0;

    this.container = createDiv('');
    this.id = 'scoreBoard';
    this.container.position(20, 20);
  
    this.levelDisplay = createDiv("Level: ");
    this.levelDisplay.id = 'levelDisplay';
    this.levelDisplay.parent(this.container);

    this.levelElem = createSpan("1");
    this.levelElem.id = 'levelElem';
    this.levelElem.parent(this.levelDisplay);

	this.scoreDisplay = createDiv("Score: ");
	this.scoreDisplay.id = 'scoreDisplay';
    this.scoreDisplay.parent(this.container);

	this.scoreElem = createSpan("0");
	this.scoreElem.id = 'scoreElem';
	this.scoreElem.parent(this.scoreDisplay);

    this.message = createDiv("");
    this.id = 'scoreBoardMessage';
    this.message.parent(this.container);

	this.increaseScore = function(amount){
		this.score += amount;
		this.scoreElem.html(this.score);
	};

    this.increaseLevel = function(amount){
        this.level += amount;
        this.levelElem.html(this.level);
    };
}