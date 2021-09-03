
class Chess{

    constructor(stats, attackedPositions = null, parent = null){
        
        // this.fen = fen;
        
        // [this.board, this.turn, this.castlingInfo, this.enPassantTarget, this.halfmoveClock, this.fullMoveNumber] = Utils.parseFen(this.fen);
        
        //
        this.board = stats.board;
        this.turn = stats.turn;
        this.castlingInfo = stats.castlingInfo;
        this.enPassantTarget = stats.enPassantTarget;
        this.halfmoveClock = stats.halfmoveClock;
        this.fullMoveNumber = stats.fullMoveNumber;
        //
        // this.enPassantTarget = SQUARES[this.enPassantTarget.toUpperCase()];

        this.setIndexAndPieces();

        // this.castlingInfo = this.castlingInfo.split("");

        if(attackedPositions == null){
            var clone = Object.assign(Object.create(this), this); 
            this.attackedPositions = Utils.calculateAttackedPositions(clone);
        }
        else{
            this.attackedPositions = attackedPositions;
        }

        this.isChecked = this.getKingCheck();

        this.moves = [];

        this.latestState = {};
        //this.currentBoardScore = 0;
        //this.evaluateBoard();

        //this.isCheckMate
        //this.isDraw
    }

    getKingCheck(){

        var check = false;

        if(this.attackedPositions.has(this.kingIndex)){
            check = true;
        }
        
        return check;
    }


    getPseudoLegalMoves(){
        var moves = [];

        moves.push.apply(moves , this.getPawnMoves());
        moves.push.apply(moves , this.getRookMoves());
        moves.push.apply(moves , this.getKnightMoves());
        moves.push.apply(moves , this.getBishopMoves());
        moves.push.apply(moves , this.getQueenMoves());
        moves.push.apply(moves , this.getKingMoves());
        moves.push.apply(moves , this.getCastleMoves());

        return moves;
    }

    getAllMovesExceptPawnAndCastle(){
        var moves = [];

        moves.push.apply(moves , this.getRookMoves());
        moves.push.apply(moves , this.getKnightMoves());
        moves.push.apply(moves , this.getBishopMoves());
        moves.push.apply(moves , this.getQueenMoves());
        moves.push.apply(moves , this.getKingMoves());
        
        return moves;
    }

    getPawnMoves(){

        // implement pawn attacks below
        var pawnMoves = [];
        var currentIndex;
        var nextIndex;

        for(var i = RANKS.RANK_1; i <= RANKS.RANK_8; i++){
            for(var j = FILES.FILE_A; j <= FILES.FILE_H; j++){

                currentIndex = 20 + i * 10 + j + 1;

                if(this.board[currentIndex] == this.currentPieces[0]){
                    // check for white pawns
                    if(this.currentPieces[0] == PIECES.w_p){

                        // checking attack moves and enPassant 
                        for(var k = 0; k < WHITE_PAWN_ATTACKS.length; k++){
                            nextIndex = currentIndex + WHITE_PAWN_ATTACKS[k];
                            
                            if(this.opponentPieces.includes(this.board[nextIndex]) || nextIndex == this.enPassantTarget){
                                pawnMoves.push([currentIndex, nextIndex]);
                            }
                        }
                        
                        // checking normal moves
                        nextIndex = currentIndex - 10;
                        if(this.board[nextIndex] == PIECES.EMPTY){
                            pawnMoves.push([currentIndex, nextIndex]);
                        }

                        // check double moves
                        if(parseInt(currentIndex / 10) == 8){
                            nextIndex = currentIndex - 20;
                            if(this.board[nextIndex] == PIECES.EMPTY && this.board[nextIndex + 10] == PIECES.EMPTY){
                                pawnMoves.push([currentIndex, nextIndex]);
                            }
                        }
                    }
                    // check for black pawns
                    else{

                        // checking attack moves and enPassant
                        for(var k = 0; k < BLACK_PAWN_ATTACKS.length; k++){
                            nextIndex = currentIndex + BLACK_PAWN_ATTACKS[k];
                            
                            if(this.opponentPieces.includes(this.board[nextIndex]) || nextIndex == this.enPassantTarget){
                                pawnMoves.push([currentIndex, nextIndex]);
                            }
                        }
                        
                        // checking normal moves
                        nextIndex = currentIndex + 10;
                        if(this.board[nextIndex] == PIECES.EMPTY){
                            pawnMoves.push([currentIndex, nextIndex]);
                        }

                        // check double moves
                        if(parseInt(currentIndex / 10) == 3){
                            nextIndex = currentIndex + 20;
                            if(this.board[nextIndex] == PIECES.EMPTY && this.board[nextIndex - 10] == PIECES.EMPTY){
                                pawnMoves.push([currentIndex, nextIndex]);
                            }
                        }
                    }
                } 
            }
        }
        
        return pawnMoves;
    }

    getPawnAttacksOnly(){

        // gives the positions that can be attacked by pawns regardless of opponent pieces

        var pawnAttacks = [];
        var currentIndex;
        var nextIndex;

        for(var i = RANKS.RANK_1; i <= RANKS.RANK_8; i++){
            for(var j = FILES.FILE_A; j <= FILES.FILE_H; j++){

                currentIndex = 20 + i * 10 + j + 1;

                if(this.board[currentIndex] == this.currentPieces[0]){
                    // check for white pawns
                    if(this.currentPieces[0] == PIECES.w_p){
                        for(var k = 0; k < WHITE_PAWN_ATTACKS.length; k++){
                            nextIndex = currentIndex + WHITE_PAWN_ATTACKS[k];
                            
                            if(this.board[nextIndex] != PIECES.OFF_BOARD && !this.currentPieces.includes(this.board[nextIndex])){
                                pawnAttacks.push([currentIndex, nextIndex]);
                            }
                        }
                    }
                    // check for black pawns
                    else{
                        for(var k = 0; k < BLACK_PAWN_ATTACKS.length; k++){
                            nextIndex = currentIndex + BLACK_PAWN_ATTACKS[k];
                            
                            if(this.board[nextIndex] != PIECES.OFF_BOARD && !this.currentPieces.includes(this.board[nextIndex])){
                                pawnAttacks.push([currentIndex, nextIndex]);
                            }
                        }
                    }
                } 
            }
        }
        
        return pawnAttacks;
    }

    getRookMoves(){
        var rookMoves = [];
        var currentIndex;

        for(var i = RANKS.RANK_1; i <= RANKS.RANK_8; i++){
            for(var j = FILES.FILE_A; j <= FILES.FILE_H; j++){

                currentIndex = 20 + i * 10 + j + 1;

                if(this.board[currentIndex] == this.currentPieces[3]){
                    rookMoves.push.apply(rookMoves, this.getSlidingPiecesMoves(currentIndex, ROOK_MOVES));
                }
            }
        }

        return rookMoves;
    }

    getKnightMoves(){
        var knightMoves = [];
        var nextIndex;
        var currentIndex;

        for(var i = RANKS.RANK_1; i <= RANKS.RANK_8; i++){
            for(var j = FILES.FILE_A; j <= FILES.FILE_H; j++){

                currentIndex = 20 + i * 10 + j + 1;

                if(this.board[currentIndex] == this.currentPieces[2]){
                 
                    for(var k = 0; k < KNIGHT_MOVES.length; k++){
                        nextIndex = currentIndex + KNIGHT_MOVES[k];
                       
                        if(this.board[nextIndex] != PIECES.OFF_BOARD && !this.currentPieces.includes(this.board[nextIndex])){
                            knightMoves.push([currentIndex, nextIndex]);
                        }
                    }
                }
            }
        }

        return knightMoves;
    }

    getBishopMoves(){
        var bishopMoves = [];
        var currentIndex;

        for(var i = RANKS.RANK_1; i <= RANKS.RANK_8; i++){
            for(var j = FILES.FILE_A; j <= FILES.FILE_H; j++){

                currentIndex = 20 + i * 10 + j + 1;

                if(this.board[currentIndex] == this.currentPieces[1]){
                    bishopMoves.push.apply(bishopMoves, this.getSlidingPiecesMoves(currentIndex, BISHOP_MOVES));
                }
            }
        }

        return bishopMoves;
    }

    getQueenMoves(){
        var queenMoves = [];
        var currentIndex;

        for(var i = RANKS.RANK_1; i <= RANKS.RANK_8; i++){
            for(var j = FILES.FILE_A; j <= FILES.FILE_H; j++){

                currentIndex = 20 + i * 10 + j + 1;

                if(this.board[currentIndex] == this.currentPieces[4]){
                    queenMoves.push.apply(queenMoves, this.getSlidingPiecesMoves(currentIndex, QUEEN_MOVES));
                }
            }
        }

        return queenMoves;
    }
    
    getKingMoves(){

        var kingMoves = [];
        var nextIndex;
        
        // generate normal king moves

        for(var i = 0; i < KING_MOVES.length; i++){
            nextIndex = this.kingIndex + KING_MOVES[i];

             // checking if next index falls off board and doesnot contain same piece
             if(this.board[nextIndex] != PIECES.OFF_BOARD && !this.currentPieces.includes(this.board[nextIndex])){
                kingMoves.push([this.kingIndex, nextIndex]);
            }
        }

        return kingMoves;
    }

    getCastleMoves(){
        var kingMoves = [];

        // Castling move
        if(!this.isChecked){

            if(this.turn == COLORS.WHITE){
                
                for(var i = 0; i < this.castlingInfo.length; i++){
                    if(this.castlingInfo[i] == PIECES.w_k){
                        var blocked = false;

                        for(var j = 0; j < CASTLE_WHITE_KING_SIDE.length; j++){
                            if(this.attackedPositions.has(CASTLE_WHITE_KING_SIDE[j]) || 
                            this.board[CASTLE_WHITE_KING_SIDE[j]] != PIECES.EMPTY){
                                blocked = true;
                                break;
                            }
                        }

                        if(!blocked){
                            kingMoves.push([this.kingIndex, this.kingIndex + 2]);
                        }
                    }
                    else if(this.castlingInfo[i] == PIECES.w_q){
                        var blocked = false;

                        for(var j = 0; j < CASTLE_WHITE_QUEEN_SIDE.length; j++){
                            if(this.attackedPositions.has(CASTLE_WHITE_QUEEN_SIDE[j]) || 
                            this.board[CASTLE_WHITE_QUEEN_SIDE[j]] != PIECES.EMPTY){
                                blocked = true;
                                break;
                            }
                        }

                        if(!blocked){
                            kingMoves.push([this.kingIndex, this.kingIndex - 2]);
                        }
                    }
                }
            }
            else{
                
                for(var i = 0; i < this.castlingInfo.length; i++){
                    if(this.castlingInfo[i] == PIECES.b_k){
                        var blocked = false;

                        for(var j = 0; j < CASTLE_BLACK_KING_SIDE.length; j++){
                            if(this.attackedPositions.has(CASTLE_BLACK_KING_SIDE[j]) || 
                            this.board[CASTLE_BLACK_KING_SIDE[j]] != PIECES.EMPTY){
                                blocked = true;
                                break;
                            }
                        }

                        if(!blocked){
                            kingMoves.push([this.kingIndex, this.kingIndex + 2]);
                        }
                    }
                    else if(this.castlingInfo[i] == PIECES.b_q){
                        var blocked = false;

                        for(var j = 0; j < CASTLE_BLACK_QUEEN_SIDE.length; j++){
                            if(this.attackedPositions.has(CASTLE_BLACK_QUEEN_SIDE[j]) || 
                            this.board[CASTLE_BLACK_QUEEN_SIDE[j]] != PIECES.EMPTY){
                                blocked = true;
                                break;
                            }
                        }

                        if(!blocked){
                            kingMoves.push([this.kingIndex, this.kingIndex - 2]);
                        }
                    }
                }
            }
        }

        return kingMoves;
    }

    getSlidingPiecesMoves(currentIndex, pieceMoves){

        var moves = [];
        var nextIndex;

        for(var k = 0; k < pieceMoves.length; k++){

            nextIndex = currentIndex + pieceMoves[k];

            while(true){
                if(this.board[nextIndex] == PIECES.OFF_BOARD || this.currentPieces.includes(this.board[nextIndex])){
                    break;
                }
                else if(this.opponentPieces.includes(this.board[nextIndex])){
                    moves.push([currentIndex, nextIndex]);
                    break;
                }
                else{
                    moves.push([currentIndex, nextIndex]);
                    nextIndex += pieceMoves[k];
                }
            }
           
        }

        return moves;
    }

    getNextAttackedPositions(){

        var moves = this.getAllMovesExceptPawnAndCastle();
        moves.push.apply(moves, this.getPawnAttacksOnly());

        var attackedPositions = new Set();

        for(var i = 0; i < moves.length; i++){
             attackedPositions.add(moves[i][1]);
        }

        return attackedPositions;
    }

    makeMove(move){
        this.latestState.board = [...this.board];
        this.latestState.turn = this.turn;
        this.latestState.castlingInfo = [...this.castlingInfo];
        this.latestState.enPassantTarget = this.enPassantTarget;
        this.latestState.halfmoveClock = this.halfmoveClock;
        this.latestState.fullMoveNumber = this.fullMoveNumber;
        this.latestState.attackedPositions = new Set([...this.attackedPositions]);
        this.latestState.isChecked = this.isChecked;
        this.latestState.kingIndex = this.kingIndex;
        this.latestState.currentPieces = this.currentPieces;
        this.latestState.opponentPieces = this.opponentPieces;

        var src = move[0];
        var dest = move[1];
        var moved = false;
        var pawnpromote = false;

        if(this.board[src] != this.currentPieces[0] && this.board[dest] == PIECES.EMPTY){
            this.halfmoveClock++;
        }
        else{
            this.halfmoveClock = 0;
        }

        if(this.board[src] != this.currentPieces[0]){
            this.enPassantTarget = '-';
        }

        // update pawn en passant, pawn promotion
        if(this.board[src] == PIECES.w_p){
            if((dest - src) % 10 != 0){
                this.board[dest] = this.board[src];
                this.board[src] = PIECES.EMPTY;
                this.board[dest + 10] = PIECES.EMPTY;

                moved = true;
            }
            if(parseInt(dest / 10) == 2){
                this.board[dest] = PIECES.w_q;
                this.board[src] = PIECES.EMPTY;
                moved = true;
                pawnpromote = true;
            }

            // en passant update
            if(Math.abs(dest - src) == 20){
                this.enPassantTarget = dest + 10;
            }
            else{
                this.enPassantTarget = '-';
            }
        }
        
        if(this.board[src] == PIECES.b_p){
            if((dest - src) % 10 != 0){
                this.board[dest] = this.board[src];
                this.board[src] = PIECES.EMPTY;
                this.board[dest - 10] = PIECES.EMPTY;
                moved = true;
            }
            if(parseInt(dest / 10) == 9){
                this.board[dest] = PIECES.b_q;
                this.board[src] = PIECES.EMPTY;
                moved = true;
                pawnpromote = true;
            }
            
            // en passant update
            if(Math.abs(dest - src) == 20){
                this.enPassantTarget = dest - 10;
            }
            else{
                this.enPassantTarget = '-';
            }
        }
        
        // check castling
        var castleDir = dest - src;
        if(src == this.kingIndex && Math.abs(castleDir) == 2){

            this.board[dest] = this.board[src];
            this.board[src] = PIECES.EMPTY;
            moved = true;

            if(castleDir > 0){
                this.board[dest - 1] = this.currentPieces[3];
                this.board[dest + 1] = PIECES.EMPTY;
            }
            else{
                this.board[dest + 1] = this.currentPieces[3];
                this.board[dest - 2] = PIECES.EMPTY;
            }
        }

        // make move if not already moved
        if(!moved){
            this.board[dest] = this.board[src];
            this.board[src] = PIECES.EMPTY;
        }

        // update other info
        if(this.turn == COLORS.WHITE){
            if(this.castlingInfo[0] != '-' || this.castlingInfo[1] != '-'){
                
                if(src == this.kingIndex){
                    this.castlingInfo[0] = '-';
                    this.castlingInfo[1] = '-';
                }

                if(src == 91 && this.board[src] == PIECES.w_r){
                    this.castlingInfo[1] = '-';
                }
                
                if(src == 98 && this.board[src] == PIECES.w_r){
                    this.castlingInfo[0] = '-';
                }
            }
        }
        else{
            if(this.castlingInfo[2] != '-' || this.castlingInfo[3] != '-'){
                
                if(src == this.kingIndex){
                    this.castlingInfo[2] = '-';
                    this.castlingInfo[3] = '-';
                }

                if(src == 21 && this.board[src] == PIECES.b_r){
                    this.castlingInfo[3] = '-';
                }
                
                if(src == 28 && this.board[src] == PIECES.b_r){
                    this.castlingInfo[2] = '-';
                }
            }
        }

        this.fullMoveNumber += 0.5;
        
        this.attackedPositions = this.getNextAttackedPositions(); // check this method for pawn promotion

        this.turn = Utils.changeTurn(this.turn);
        this.setIndexAndPieces();
        this.isChecked = this.getKingCheck();

    }

    undoLastMove(){
        this.board = this.latestState.board;
        this.turn = this.latestState.turn;
        this.castlingInfo = this.latestState.castlingInfo;
        this.enPassantTarget = this.latestState.enPassantTarget;
        this.halfmoveClock = this.latestState.halfmoveClock;
        this.fullMoveNumber = this.latestState.fullMoveNumber;
        this.attackedPositions = this.latestState.attackedPositions;
        this.isChecked = this.latestState.isChecked;
        this.kingIndex = this.latestState.kingIndex;
        this.currentPieces = this.latestState.currentPieces;
        this.opponentPieces = this.latestState.opponentPieces;

    }

    setIndexAndPieces(){
        
        if(this.turn == COLORS.WHITE){
            this.kingIndex = this.board.indexOf(PIECES.w_k);
            this.currentPieces = WHITE_PIECES;
            this.opponentPieces = BLACK_PIECES;
        }
        else{
            this.kingIndex = this.board.indexOf(PIECES.b_k);
            this.currentPieces = BLACK_PIECES;
            this.opponentPieces = WHITE_PIECES;
        }
    }

}
