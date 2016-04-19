var UserResult = [];
var ExpectedResults = [];

var temp = new Array(10);
for (var i = 0; i < 11; i++) {
  temp[i] = new Array(2);
}

var correct = 0;
//creates a GameScreen object
var GameScreen2 = {
    //the preload method runs first
    //it is where we load our assets
    preload : function() {
        //loads an image named 'logo'
        game.load.image('logo', '/assets/images/mission_bit_logo.png');
        game.load.image('square', '/assets/images/square-game.jpg');
        game.load.image('correct', '/assets/images/greencorrect.png');
        game.load.image('incorrect', '/assets/images/Red-Wrong.png');
        game.load.image('nextLevel', '/assets/images/NextLevel.png');
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
                    this.temp = game.add.inputField(20+j*100, 45+i*50, {placeHolder: 'test'});
                    UserResult.push(this.temp);
                }
               
            } 
            Board.push(ExpectedResults);
          
        } 
        console.log(UserResult);
        this.add.button(375,550, 'logo', this.check, this);
        
        for (var i = 0; i < 11; i++){
            temp[i][0] = game.add.image(580, 30+i*50, 'correct');
            temp[i][0].visible = false;
            temp[i][1] = game.add.image(580, 30+i*50, 'incorrect');
            temp[i][1].visible = false;
        }
        
            
    },
    
    //function that is called 60 times per second
    //where we put the logic of the game
    update: function() {
    
    
    },
//    
    check: function() {
        correct = 0;
        var leftIndex = function (idx) {
            return idx*2; 
        };
        var rightIndex = function (idx) {
            return idx*2+1;
        };
        for (var i = 0; i < UserResult.length; i++) {
            //console.log('BLAH: ' + parseInt(UserResult[0].value));
            //console.log('ExpLeft: ' +ExpectedResults[leftIndex(i)]);
            if(ExpectedResults[leftIndex(i)]-ExpectedResults[rightIndex(i)] === parseInt(UserResult[i].value)) {
                temp[i][0].visible = true;
                temp[i][1].visible = false;
                correct = correct +1;
            } else {
                temp[i][1].visible = true;
                temp[i][0].visible = false;
            }
        }
        
        if (correct >= 8) {
            this.add.button(450,520, 'nextLevel', this.check, this);
        }
        console.log(correct);
        
        
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