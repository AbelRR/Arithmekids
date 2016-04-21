//creates a GameScreen object
var GameScreen2 = {
    //the preload method runs first
    //it is where we load our assets
    preload : function() {
        //load images
        game.load.image('logo', '/assets/images/mission_bit_logo.png');
        game.load.image('confetti', '/assets/images/confetti.gif')
        game.load.image('restartButton', '/assets/images/restart.png');
        game.load.image('winner', '/assets/images/Winner.jpg');
    },
    
    //the create method is run after the preload method
    //it is where we set up the basics of the game, essentially what it will look like when we start the game
    create: function () {
        
       this.add.image(150, 100 , 'winner'); 
        
        this.add.button(210,500, 'restartButton', this.restartGame, this);
        //add a button, when clicked will call "restart game"
        
        
    },
    
    //function that is called 60 times per second
    //where we put the logic of the game
    update: function() {
    
    
    },
    
    restartGame: function() {
    // restarts game
     level = 0
     this.state.start('TitleScreen');
    }
};