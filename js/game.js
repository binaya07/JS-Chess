
class Game{
    constructor(chess, players = null, playerColor = null){
        this.chess = chess;

        this.players = players;
        this.playerColor = playerColor;

        this.boardContainer = document.getElementsByClassName('board')[0];
        this.infoDiv = document.getElementsByClassName('info-div')[0];
        this.infoDiv.style.minWidth = '80px';

        this.addTurn();
        this.boardContainer.onclick = this.checkClick.bind(this);
    }

    addTurn(){
      
        this.exitButton = document.createElement('button');
        this.exitButton.style.backgroundImage = 'radial-gradient(circle, #0007a1, #0035b3, #0051be, #006ac3, #0381c4)';
        this.exitButton.style.color = 'white';
        this.exitButton.style.border = 'none';
        this.exitButton.style.borderRadius = '5%';
        this.exitButton.style.padding = '10px';
        this.exitButton.style.fontSize = '20px';
        this.exitButton.innerHTML = 'Exit';
        this.exitButton.style.marginTop = '50px';

        this.infoDiv.appendChild(this.exitButton);

        this.turnInfoDiv = document.createElement('div');
        this.turnInfoDiv.style.marginTop = '50px';
        this.turnInfoDiv.style.color = 'white';
        this.infoDiv.appendChild(this.turnInfoDiv);

        this.endgameInfoDiv = document.createElement('div');
        this.endgameInfoDiv.style.marginTop = '50px';
        this.endgameInfoDiv.style.color = 'white';
        this.infoDiv.appendChild(this.endgameInfoDiv);

        this.exitButton.onclick = function(){
            this.infoDiv.innerHTML = '';
            this.infoDiv.style.minWidth = '0px';
            var m = new Main();
        }.bind(this);
    }

    addBoard(boardArray){
        for(var i = RANKS.RANK_1; i <= RANKS.RANK_8; i++ ){

            var row = document.createElement('div');
            var rank = 8 - i;
            var rankId = 'rank-' + rank;
            row.classList.add('rank-row');
            row.setAttribute('id', rankId);
                        
            this.boardContainer.appendChild(row);

            for(var j = FILES.FILE_A; j <= FILES.FILE_H; j++){

                var col = document.createElement('div');
                col.classList.add('square');
                var fileId = FILE_REPR[j] + rank;
                col.setAttribute('id', fileId);

                if((i+j) % 2 == 0){
                    col.classList.add('light-square');
                }
                else{
                    col.classList.add('dark-square');
                }

                row.appendChild(col);
                
                if(j == 0){
                    var rankInfo = document.createElement('span');
                    rankInfo.classList.add('rank-info');
                    rankInfo.innerHTML = rank;

                    col.appendChild(rankInfo);
                }

                if(i == RANKS.RANK_8){
                    var fileInfo = document.createElement('span');
                    fileInfo.classList.add('file-info');
                    fileInfo.innerHTML = FILE_REPR[j];

                    col.appendChild(fileInfo);                
                }

                var boardIndex = i * 8 + j;
                
                switch(boardArray[boardIndex]){
                    case PIECES.b_p:
                        this.addPiece('black', 'pawn', 'images/bP.png', boardIndex);
                        break;

                    case PIECES.w_p:
                        this.addPiece('white', 'pawn', 'images/wP.png', boardIndex);
                        break;

                    case PIECES.b_r:
                        this.addPiece('black', 'rook', 'images/bR.png', boardIndex);
                        break;

                    case PIECES.w_r:
                        this.addPiece('white', 'rook', 'images/wR.png', boardIndex);
                        break;

                    case PIECES.b_b:
                        this.addPiece('black', 'bishop', 'images/bB.png', boardIndex);
                        break;

                            
                    case PIECES.w_b:
                        this.addPiece('white', 'bishop', 'images/wB.png', boardIndex);
                        break;
                    
                    case PIECES.b_n:                        
                        this.addPiece('black', 'knight', 'images/bN.png', boardIndex);
                        break;
                    
                    case PIECES.w_n:
                        this.addPiece('white', 'knight', 'images/wN.png', boardIndex);
                        break;
                
                    case PIECES.b_q:
                        this.addPiece('black', 'queen', 'images/bQ.png', boardIndex);
                        break;
                            
                    case PIECES.w_q:
                        this.addPiece('white', 'queen', 'images/wQ.png', boardIndex);
                        break;

                    case PIECES.b_k:
                        this.addPiece('black', 'king', 'images/bK.png', boardIndex);
                        break;
                            
                    case PIECES.w_k:
                        this.addPiece('white', 'king', 'images/wK.png', boardIndex);
                        break;
        
                    default: break;
                }
            }
        }
    }

    addPiece(class1, class2, imgSrc, index){
        var img = document.createElement('img');
        
        img.classList.add(class1);
        img.classList.add(class2);
        img.setAttribute('src', imgSrc);
        img.style.width = '60px';
        img.style.height = '60px';
        img.style.position = 'absolute';
        img.style.left = this.getLeft(index) + 'px';
        img.style.top = this.getTop(index) + 'px';
        img.style.zIndex = '10';

        this.boardContainer.appendChild(img);
    }

    getLeft(index){
        var offset = 5;
        var left = (index % 8) * 70 + offset;
        return left;
    }

    getTop(index){
        var offset = 5;
        var top = parseInt(index / 8) * 70 + offset;
        return top;
    }

    removeBoard(){
        this.boardContainer.innerHTML = "";
    }

    checkClick(e){
        
        if(this.chess.turn == this.playerColor){
           
            var el = e.target;
            var pieceColor = el.getAttribute('class').split(" ")[0];

            if(this.playerColor == COLORS.WHITE){
                
                if(pieceColor == 'white'){
                    this.removeSuggestions();

                    this.pieceChosen = true;

                    var leftPos = (parseInt(el.style.left) - 5) / 70;
                    var topPos = (parseInt(el.style.top) - 5) / 70;
                    this.pieceIndex = 20 + topPos * 10 + leftPos + 1;
                    
                    this.pieceDest = [];

                    for(var i = 0; i < this.validMoves.length; i++){
                        if(this.validMoves[i][0] == this.pieceIndex){
                            this.pieceDest.push(this.validMoves[i][1]);

                            this.drawPossibleMoves(this.validMoves[i][1]);
                        }
                    }
                    // console.log(this.pieceIndex, this.pieceDest);
                }
                else{
                    if(this.pieceChosen){
                        var removeDotsFlag = false;

                        if(pieceColor == 'black'){
                            var leftPos = (parseInt(el.style.left) - 5) / 70;
                            var topPos = (parseInt(el.style.top) - 5) / 70;
                            var index = 20 + topPos * 10 + leftPos + 1;
                            
                            if(this.pieceDest.includes(index)){

                                this.currentMove = [this.pieceIndex, index];
                                this.chess.makeMove(this.currentMove);

                                this.turnOverflag = true;
                                
                                if(this.players == 2){
                                    this.playerColor = COLORS.BLACK;
                                }
                                this.play();
                            }
                            else{
                                removeDotsFlag = true;
                            }
                        }
                        else{
                            
                            var leftPos = parseInt(el.style.left) / 70;
                            var topPos = parseInt(el.style.top) / 70;
                            var index = 20 + topPos * 10 + leftPos + 1;
                                                        
                            if(this.pieceDest.includes(index)){

                                this.currentMove = [this.pieceIndex, index];
                                this.chess.makeMove(this.currentMove);

                                this.turnOverflag = true;
                                
                                if(this.players == 2){
                                    this.playerColor = COLORS.BLACK;
                                }

                                this.play();
                            }
                            else{
                                removeDotsFlag = true;
                            }
                        }

                        if(removeDotsFlag){
                            this.removeSuggestions();   
                        }
                        
                        this.pieceChosen = false;
                    }
                    else{
                        this.pieceChosen = false;
                    }
                }
            }
            else{
                if(pieceColor == 'black'){
                    this.removeSuggestions();
                    this.pieceChosen = true;

                    var leftPos = (parseInt(el.style.left) - 5) / 70;
                    var topPos = (parseInt(el.style.top) - 5) / 70;
                    this.pieceIndex = 20 + topPos * 10 + leftPos + 1;
                    
                    this.pieceDest = [];

                    for(var i = 0; i < this.validMoves.length; i++){
                        if(this.validMoves[i][0] == this.pieceIndex){
                            this.pieceDest.push(this.validMoves[i][1]);

                            this.drawPossibleMoves(this.validMoves[i][1]);
                        }
                    }
                    // console.log(this.pieceIndex, this.pieceDest);
                }
                else{
                    if(this.pieceChosen){

                        var removeDotsFlag = false;

                        if(pieceColor == 'white'){
                            var leftPos = (parseInt(el.style.left) - 5) / 70;
                            var topPos = (parseInt(el.style.top) - 5) / 70;
                            var index = 20 + topPos * 10 + leftPos + 1;
                            
                            if(this.pieceDest.includes(index)){

                                this.currentMove = [this.pieceIndex, index];
                                this.chess.makeMove(this.currentMove);
                                this.turnOverflag = true;
                                
                                if(this.players == 2){
                                    this.playerColor = COLORS.WHITE;
                                }
                                this.play();
                            }
                            else{
                                removeDotsFlag = true;
                            }
                        }
                        else{

                            var leftPos = parseInt(el.style.left) / 70;
                            var topPos = parseInt(el.style.top) / 70;
                            var index = 20 + topPos * 10 + leftPos + 1;             
                                           
                            if(this.pieceDest.includes(index)){

                                this.currentMove = [this.pieceIndex, index];
                                this.chess.makeMove(this.currentMove);
                                this.turnOverflag = true;
                                
                                if(this.players == 2){
                                    this.playerColor = COLORS.WHITE;
                                }
                                this.play();
                            }
                            else{
                                removeDotsFlag = true;
                            }
                        }
                        
                        if(removeDotsFlag){
                            this.removeSuggestions();
                        }

                        this.pieceChosen = false;
                    }
                    else{
                        this.pieceChosen = false;
                    }
                }
            }
        }

     }

    removeSuggestions(){

        var dots = document.getElementsByClassName('possible-moves');

        while(dots.length > 0){
            dots[0].parentNode.removeChild(dots[0]);
        }
        
    }

    play(){

        if(this.chess.fullMoveNumber == 1){
            var b = Utils.convertArray120To64(this.chess.board);
            this.addBoard(b);
        }

        if(this.players == 2){
            this.turnInfoDiv.innerHTML = "Turn : " + this.chess.turn;
        }

        var pmoves = this.chess.getPseudoLegalMoves();
        var lMoves = [];

        if(this.players != 2){
            this.turnOverflag = false;
        }

        // validate moves
        for(var i = 0; i < pmoves.length; i++){
            if(Utils.validateMove(pmoves[i], [...this.chess.board], this.chess.turn, this.chess.kingIndex, this.chess.currentPieces, this.chess.opponentPieces)){
                lMoves.push(pmoves[i]);
            }
        }

        this.validMoves = lMoves;

        // check for win and draw conditions
        if(this.chess.isChecked && lMoves.length == 0){

            if(this.chess.turn == COLORS.BLACK){
                this.endgameInfoDiv.innerHTML = 'CHECK MATE<br><br>White WINS!!';
            }
            else{
                this.endgameInfoDiv.innerHTML = 'CHECK MATE<br><br>Black WINS!!';
            }
            this.boardContainer.onclick = false;
            // console.log('check mate');
        }

        else if(!this.chess.isChecked && lMoves.length == 0){
            
            this.endgameInfoDiv.innerHTML = 'STALE MATE';
            this.boardContainer.onclick = false;
            // console.log('stale mate');
        }

        else if(this.chess.halfmoveClock == 50){
            this.endgameInfoDiv.innerHTML = 'DRAW';
            this.boardContainer.onclick = false;
            // console.log('50 move draw');
        }

        // check bot turn
        if(this.playerColor != this.chess.turn && this.players != 2){
    
        //
            // var moves = this.chess.getPseudoLegalMoves();
            // var vMoves = [];
            // var scores = [];
        
            // for(var i = 0; i < moves.length; i++){
            //     if(Utils.validateMove(moves[i], [...this.chess.board], this.chess.turn, this.chess.kingIndex, this.chess.currentPieces, this.chess.opponentPieces)){
            //         var obj = {};			
            //         this.chess.makeMove(moves[i]);
            //         obj.score = Utils.evaluateBoard(this.chess.board, Utils.changeTurn(this.chess.turn));
            //         obj.move = moves[i];
            //         this.chess.undoLastMove();
        
            //         scores.push(obj.score);
            //         vMoves.push(obj);
            //     }
            // }
        
            // scores.sort(function(a,b){ return b - a; });
            // console.log(scores);
            // console.log(vMoves);
            // var orderedMoves = mapOrder(vMoves, scores, 'score');

            // console.log(orderedMoves);

            // this.chess.makeMove(orderedMoves[0].move);
            // this.currentMove = orderedMoves[0].move;
        //
        
            // console.log(lMoves);
            
            var chessStat = {};
            chessStat.board = [...this.chess.board];
            chessStat.turn = this.chess.turn;
            chessStat.castlingInfo = [...this.chess.castlingInfo];
            chessStat.enPassantTarget = this.chess.enPassantTarget;
            chessStat.halfmoveClock = this.chess.halfmoveClock;
            chessStat.fullMoveNumber = this.chess.fullMoveNumber;

            var ch = new Chess(chessStat);

            // var bMove = minMaxRoot(2, ch, true);
            
            var bMove = searchPosition(ch);
            // var bMove = searchTwoSteps(ch);
            // console.log(bMove);
            this.chess.makeMove(bMove);
            this.currentMove = bMove;

            // // var ind = parseInt(Math.random() * lMoves.length - 1);
            // // this.chess.makeMove(lMoves[ind]);
            
            // // this.currentMove = lMoves[ind];
            this.turnOverflag = true;
        }


        // query selector for animation
            
        if(this.turnOverflag){ 
            var b = Utils.convertArray120To64(this.chess.board);
    
            this.removeBoard();
            this.addBoard(b);
            this.drawPath(this.currentMove);

            if(this.players != 2){
                this.play();
            }
        }
        
    }

    drawPossibleMoves(dest){
        
        var destX = (dest % 10) * 70 - 70;
        var destY = ( parseInt(dest / 10) % 10 ) * 70 - 140;

        // if(dest - src)
        var dots = document.createElement('div');
        dots.style.width = '70px';
        dots.style.height = '70px';
        dots.style.border = '1px solid black';
        dots.style.backgroundColor = 'orange';
        dots.style.position = 'absolute';
        dots.style.top = destY + 'px';
        dots.style.left = destX + 'px';
        dots.style.zIndex = '1';

        dots.setAttribute('class', 'possible-moves');
        this.boardContainer.appendChild(dots);
    }

    drawPath(move){
        var src = move[0];
        var dest = move[1];

        var srcX = (src % 10) * 70 - 15;
        var srcY = ( parseInt(src / 10) % 10 ) * 70 - 85;

        var destX = (dest % 10) * 70 - 15;
        var destY = ( parseInt(dest / 10) % 10 ) * 70 - 85;

        // if(dest - src)
        var dots = document.createElement('div');
        dots.style.width = '10px';
        dots.style.height = '10px';
        dots.style.borderRadius = '50%';
        dots.style.backgroundColor = 'red';
        dots.style.position = 'absolute';
        dots.style.top = srcY + 'px';
        dots.style.left = srcX + 'px';
        dots.style.zIndex = '1';
        this.boardContainer.appendChild(dots);

        var dots = document.createElement('div');
        dots.style.width = '10px';
        dots.style.height = '10px';
        dots.style.borderRadius = '50%';
        dots.style.backgroundColor = 'green';
        dots.style.position = 'absolute';
        dots.style.top = destY + 'px';
        dots.style.left = destX + 'px';
        dots.style.zIndex = '1';

        this.boardContainer.appendChild(dots);
    }
}