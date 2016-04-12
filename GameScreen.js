var UserResult = [];
var ExpectedResults = [];
//creates a GameScreen object
var GameScreen = {
    //the preload method runs first
    //it is where we load our assets
    preload : function() {
        //loads an image named 'logo'
        game.load.image('logo', '/assets/images/mission_bit_logo.png');
        game.load.image('square', '/assets/images/square-game.jpg');
    },
    
    //the create method is run after the preload method
    //it is where we set up the basics of the game, essentially what it will look like when we start the game
    create: function () {
//makes the background color of the whole screen black
        game.stage.backgroundColor = '#000000';
        
        //starts the physics system for the game
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //creates a variable that handles the arrow keys
        this.cursor = game.input.keyboard.createCursorKeys();
        
        //creates a sprite with the 'logo' image at (200, 400) and assigns it to a variable
        this.mc = game.add.sprite(200, 400, 'logo');
        
        //enables the physics system for the mc
        game.physics.arcade.enable(this.mc);
        
        //makes sure the mc can't be moved by other sprites
        this.mc.body.immovable = true;
        
        //make it so the mc can't leave the screen
        this.mc.body.collideWorldBounds = true;
        
        game.add.plugin(Fabrique.Plugins.InputField); 
        var style = { font: '50px Arial', fill:'black', align: 'center'};
        var Board = [];
        for (var i=0; i < 10; i++) {
            var randomNum = 0;
            for (var j=0; j < 5; j++){
                
                //if this is the first OR the 3rd element in the row- if yes generate a number in a white squeer
                if ((j===0)||(j===2)){
                    randomNum = Math.floor((Math.random() * 9)+1);
                    console.log(randomNum);
                    this.temp = this.add.image(20+j*100, 25+i*50, 'square');
                    this.temp.scale.x = 0.05;
                    this.temp.scale.y = 0.05;
                    game.add.text(25+j*100,25+i*50,randomNum, style);
                    ExpectedResults.push(randomNum);
                }
                //if this the second generate "+" sign
                else if(j===1){
                    this.temp = this.add.image(20+j*100, 25+i*50, 'square');
                    this.temp.scale.x = 0.05;
                    this.temp.scale.y = 0.05;
                    game.add.text(25+j*100,25+i*50,"+", style);
                }
                //if the 4th generate "=" sign
                else if (j===3){
                    this.temp = this.add.image(20+j*100, 25+i*50, 'square');
                    this.temp.scale.x = 0.05;
                    this.temp.scale.y = 0.05;
                    game.add.text(25+j*100,25+i*50,"=", style);   
                }
                //if the 5th generate blanck 
                else if (j===4){
//                    this.temp = this.add.image(20+j*100, 25+i*50, 'square');
//                    this.temp.scale.x = 0.05;
//                    this.temp.scale.y = 0.05;
                    this.temp = game.add.inputField(20+j*100, 25+i*50, {placeHolder: 'test'});
                    UserResult.push(this.temp);
                }
               
            } 
            Board.push(ExpectedResults);
          
        } 
        console.log(UserResult);
        this.add.button(375,550, 'logo', this.check, this)
        ;
        
            
    },
    
    //function that is called 60 times per second
    //where we put the logic of the game
    update: function() {
    
        //if the right arrow is pressed, move to the right
        if (this.cursor.right.isDown) {
            this.mc.body.velocity.x = 350;
        } else if (this.cursor.left.isDown) { //if the left arrow is pressed, move to the left
            this.mc.body.velocity.x = -350;
        } else if (this.cursor.up.isDown){ //if the up arrow is pressed, move upwards
            this.mc.body.velocity.y = -350;
        } else if (this.cursor.down.isDown) { //if the down arrow is pressed, move downwards
            this.mc.body.velocity.y = 350;
        } else { //if no arrow keys are being pressed, stop moving
            this.mc.body.velocity.x = 0;
            this.mc.body.velocity.y = 0;
        }
    
    },
//    
    check: function() {
       if(parseInt(ExpectedResults[0]+ExpectedResults[1])===parseInt(UserResult[0].value)) {
        //for (var i = 0; i < UserResult.length; i++) {
             console.log("true");
       }
       //}
        else {
             console.log("false");
        }
        
//            this.check.log
//         for (var i = 0; i < UserResult.length; i++) {
//             console.log(UserResult[i].value);
//         }
//        for(var i=0; i<10; i++){
//            console.log(this.input.value);
//        }
//        console.log(UserResult);
    }

    
};