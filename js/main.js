
class Main{

    constructor(){

        this.addGameContainer();
        this.addBoardContainer();
        this.addFenElements();
        
        this.loadFirstScreen();

        this.fenButton.onclick = function(){

            var fen = this.fenElement.value.trim();

            console.log('start game from fen');

            var stats = Utils.parseFen(fen);

            var chess = new Chess(stats);

            var game = new Game(chess, 1, COLORS.WHITE);
            this.boardContainer.innerHTML = '';
            document.body.style.background = 'rgb(68, 68, 68)';

            game.play();
            
        }.bind(this);

    }

    addBodyGradient(){
        document.body.style.backgroundImage = 'radial-gradient(circle, #f0d9b5, #e1c49f, #d2b08a, #c39c76, #b58863)';
    }

    addGameContainer(){
        this.gameContainer = document.getElementsByClassName('game-container')[0];
        this.infoDiv = document.getElementsByClassName('info-div')[0];

        this.infoDiv.innerHTML = '';
    }
    
    addBoardContainer(){
        this.boardContainer = document.getElementsByClassName('board')[0];
    }

    addPlayOptions(){
        this.singlePlayerButton = document.createElement('button');
        this.singlePlayerButton.style.marginLeft = '219px';
        this.singlePlayerButton.style.backgroundImage = 'radial-gradient(circle, #0007a1, #0035b3, #0051be, #006ac3, #0381c4)';
        this.singlePlayerButton.style.color = 'white';
        this.singlePlayerButton.style.border = 'none';
        this.singlePlayerButton.style.borderRadius = '5%';
        this.singlePlayerButton.style.padding = '25px';
        this.singlePlayerButton.style.fontSize = '20px';
        this.singlePlayerButton.innerHTML = '1 Player';        
        this.singlePlayerButton.style.marginTop = '50px';

        this.boardContainer.appendChild(this.singlePlayerButton);

        
        this.twoPlayerButton = document.createElement('button');
        this.twoPlayerButton.style.marginLeft = '215px';
        this.twoPlayerButton.style.backgroundImage = 'radial-gradient(circle, #0007a1, #0035b3, #0051be, #006ac3, #0381c4)';
        this.twoPlayerButton.style.color = 'white';
        this.twoPlayerButton.style.border = 'none';
        this.twoPlayerButton.style.borderRadius = '5%';
        this.twoPlayerButton.style.padding = '25px';
        this.twoPlayerButton.style.fontSize = '20px';
        this.twoPlayerButton.innerHTML = '2 Players';
        this.twoPlayerButton.style.marginTop = '50px';

        this.boardContainer.appendChild(this.twoPlayerButton);
    }
    
    addGameTitle(){
        this.gameTitle = document.createElement('div');
        this.gameTitle.style.height = '250px';
        this.gameTitle.style.background = 'url(images/chess.png)';
        this.gameTitle.style.backgroundRepeat = 'no-repeat';
        this.gameTitle.style.backgroundSize = 'contain';
        this.gameTitle.style.backgroundPosition = 'center';

        this.boardContainer.appendChild(this.gameTitle);
    }

    loadFirstScreen(){
        this.isFirstScreen = true;

        this.boardContainer.innerHTML = '';
        this.addBodyGradient();
        this.addGameTitle();
        this.addPlayOptions();

        this.singlePlayerButton.onclick = function(){
            this.players = 1;
            this.chooseColor();
        }.bind(this);

        
        this.twoPlayerButton.onclick = function(){
            this.players = 2;
            this.start(false);
        }.bind(this);
        
    }

    chooseColor(){
        this.boardContainer.innerHTML = '';

        this.chooseColor = document.createElement('div');

        this.chooseColor.innerHTML = 'CHOOSE COLOR';
        this.chooseColor.style.fontSize = '70px';
        this.chooseColor.style.textAlign = 'center';
        this.chooseColor.style.color = '#008f47';
        this.chooseColor.style.paddingTop = '50px';

        this.boardContainer.appendChild(this.chooseColor);

        this.blackColorButton = document.createElement('button');
        this.blackColorButton.style.marginLeft = '219px';
        this.blackColorButton.style.background = '#000234';
        this.blackColorButton.style.color = 'white';
        this.blackColorButton.style.border = 'none';
        this.blackColorButton.style.borderRadius = '5%';
        this.blackColorButton.style.padding = '25px';
        this.blackColorButton.style.fontSize = '20px';
        this.blackColorButton.innerHTML = 'Black';        
        this.blackColorButton.style.marginTop = '50px';

        this.boardContainer.appendChild(this.blackColorButton);

        
        this.whiteColorButton = document.createElement('button');
        this.whiteColorButton.style.marginLeft = '219px';
        this.whiteColorButton.style.background = '#BDE8FF';
        this.whiteColorButton.style.color = 'black';
        this.whiteColorButton.style.border = 'none';
        this.whiteColorButton.style.borderRadius = '5%';
        this.whiteColorButton.style.padding = '25px';
        this.whiteColorButton.style.fontSize = '20px';
        this.whiteColorButton.innerHTML = 'White';        
        this.whiteColorButton.style.marginTop = '50px';

        this.boardContainer.appendChild(this.whiteColorButton);

        this.backButton = document.createElement('button');
        this.backButton.style.marginLeft = '233px';
        this.backButton.style.background = 'gray';
        this.backButton.style.color = 'white';
        this.backButton.style.border = 'none';
        this.backButton.style.borderRadius = '5%';
        this.backButton.style.padding = '10px';
        this.backButton.style.fontSize = '14px';
        this.backButton.innerHTML = 'Go Back';        
        this.backButton.style.marginTop = '85px';

        this.boardContainer.appendChild(this.backButton);

        this.blackColorButton.onclick = function(){
            this.start(COLORS.BLACK);
        }.bind(this);

        this.whiteColorButton.onclick = function(){
            this.start(COLORS.WHITE);
        }.bind(this);

        this.backButton.onclick = function(){
            // this.loadFirstScreen();
            var m = new Main();
        }.bind(this);
    }

    addFenElements(){
        this.fenElement = document.getElementsByClassName('fen-input')[0];
        this.fenButton = document.getElementsByClassName('fen-button')[0];

        // TODO: add GET FEN button too
    }

    start(color){
        this.boardContainer.innerHTML = '';
        document.body.style.background = 'rgb(68, 68, 68)';

        if(color == COLORS.WHITE){
            console.log('start game as player white');

            var stats = Utils.parseFen(DEFAULT_POSITION);

            var chess = new Chess(stats);

            var game = new Game(chess, this.players, COLORS.WHITE);
            
            game.play();
        }

        else if(color == COLORS.BLACK){
            console.log('start game as player black');
        
            var stats = Utils.parseFen(DEFAULT_POSITION);

            var chess = new Chess(stats);

            var game = new Game(chess, this.players, COLORS.BLACK);
            
            game.play();
        }

        else{
            // start multiplayer game

            console.log('start multiplayer game');
            

            var stats = Utils.parseFen(DEFAULT_POSITION);

            var chess = new Chess(stats);

            var game = new Game(chess, this.players, COLORS.WHITE);
            
            game.play();
        }
    }

}

var m = new Main();



// var t = performance.now();

//var chess = new Chess(DEFAULT_POSITION1);

//console.log(chess.getKingMoves());

//console.log(chess.getCastleMoves());

// var r = performance.now();

// console.log(r-t);
