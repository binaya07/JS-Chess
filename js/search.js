var SearchController = {};

SearchController.nodes;
SearchController.fh;
SearchController.fhf;
SearchController.depth;
SearchController.time;
SearchController.start;
SearchController.stop;
SearchController.best;
SearchController.thinking;

function checkTimeUp(){
    if((performance.now() - SearchController.start) > SearchController.time){
        SearchController.stop = true;
    }
}

function mapOrder (array, order, key) {
  
	array.sort( function (a, b) {
	  var A = a[key], B = b[key];
	  
	  if (order.indexOf(A) > order.indexOf(B)) {
		return 1;
	  } else {
		return -1;
	  }
	  
	});
	
	return array;
}

function alphaBeta(chess, alpha, beta, depth) {

	if(depth <= 0) {
        /* return Evaluate() */
        return Utils.evaluateBoard(chess.board, Utils.changeTurn(chess.turn));
	}
	
	/* Check Time Up */
    
    // if(SearchController.nodes % 5000 == 0){
    //     checkTimeUp();
    // }

	// SearchController.nodes++;
	
    /* Check Rep() Fifty Move Rule */  
    if(chess.halfmoveClock == 50){
        return 0;
	}
	
	if(chess.isChecked){
		depth++;
	}
	
	var score = -INFINITE;
		
	var legal = 0;
	var oldAlpha = alpha;
	var bestMove = null;
	var move = null;
	
    /* Get and order moves */
	var moves = chess.getPseudoLegalMoves();
	var vMoves = [];
	var scores = [];

	for(var i = 0; i < moves.length; i++){
		if(Utils.validateMove(moves[i], [...chess.board], chess.turn, chess.kingIndex, chess.currentPieces, chess.opponentPieces)){
			var obj = {};			
			chess.makeMove(moves[i]);
			obj.score = Utils.evaluateBoard(chess.board, Utils.changeTurn(chess.turn));
			obj.move = moves[i];
			chess.undoLastMove();

			scores.push(obj.score);
			vMoves.push(obj);
		}
	}

	scores.sort(function(a,b){ return b - a; });
	var orderedMoves = mapOrder(vMoves, scores, 'score');

    // loop through valid sorted moves
	for(var i = 0; i < orderedMoves.length; i++) {
	
		/* Pick Next Best Move */
	
		move = orderedMoves[i].move;	
		
		chess.makeMove(move);

		legal++;
		score = -alphaBeta(chess, -beta, -alpha, depth-1);
        
        // undo move 
		chess.undoLastMove();
		
		if(score > alpha) {
			if(score >= beta) {
				
				return beta;
			}
			alpha = score;
			bestMove = move;
		}		
	}
	
	/* Mate Check */
	if(legal == 0){
		if(chess.isChecked){
			return -CHECKMATE + chess.fullMoveNumber * 2;
		}
		else{
			return 0;
		}
	}	

	if(alpha != oldAlpha) {
		/* Store bestMove */
		SearchController.best = bestMove;
	}
	
	return alpha;
}

function clearForSearch(){
	SearchController.nodes = 0;
	// SearchController.fh;
	// SearchController.fhf;
	// SearchController.depth;
	// SearchController.time;
	// SearchController.start;
	SearchController.stop = false;
}

function searchPosition(chess) {

	var bestMove = null;
	var bestScore = -INFINITE;
	var currentDepth = 0;
	
	clearForSearch();

	// for( currentDepth = 1; currentDepth <= /*SearchController.depth */ 3; currentDepth++) {
		
		/* AB */
		bestScore = alphaBeta(chess, -INFINITE, INFINITE, 3); 

		// if(SearchController.stop == true) {
		// 	break;
		// }
		
	// }
	
	return SearchController.best;
	// SearchController.best = bestMove;
	// SearchController.thinking = false;

}


/*The "AI" part starts here */
function minMaxRoot(depth, chess, isMaximisingPlayer) {

    // var newGameMoves = game.ugly_moves();
    var bestMove = -9999;
	var bestMoveFound;
	
	/* Get and order moves */
	var moves = chess.getPseudoLegalMoves();
	var vMoves = [];
	var scores = [];

	for(var i = 0; i < moves.length; i++){
		if(Utils.validateMove(moves[i], [...chess.board], chess.turn, chess.kingIndex, chess.currentPieces, chess.opponentPieces)){
			var obj = {};			
			chess.makeMove(moves[i]);
			obj.score = Utils.evaluateBoard(chess.board, Utils.changeTurn(chess.turn));
			obj.move = moves[i];
			chess.undoLastMove();

			scores.push(obj.score);
			vMoves.push(obj);
		}
	}

	scores.sort(function(a,b){ return b - a; });
	var orderedMoves = mapOrder(vMoves, scores, 'score');


    for(var i = 0; i < orderedMoves.length; i++) {
		var newGameMove = orderedMoves[i].move;
		
		chess.makeMove(newGameMove);
        var value = minimax(depth - 1, chess, -10000, 10000, !isMaximisingPlayer);
        chess.undoLastMove();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
	}
	// console.log('b', bestMove);
    return bestMoveFound;
}

function minimax(depth, chess, alpha, beta, isMaximisingPlayer) {
    // positionCount++;
    if (depth == 0) {
		// console.log(Utils.evaluateBoard(chess.board, Utils.changeTurn(chess.turn)));

		return Utils.evaluateBoard(chess.board, Utils.changeTurn(chess.turn));
    }

    	/* Get and order moves */
	var moves = chess.getPseudoLegalMoves();
	var vMoves = [];
	var scores = [];

	for(var i = 0; i < moves.length; i++){
		if(Utils.validateMove(moves[i], [...chess.board], chess.turn, chess.kingIndex, chess.currentPieces, chess.opponentPieces)){
			var obj = {};			
			chess.makeMove(moves[i]);
			obj.score = Utils.evaluateBoard(chess.board, Utils.changeTurn(chess.turn));
			obj.move = moves[i];
			chess.undoLastMove();

			scores.push(obj.score);
			vMoves.push(obj);
		}
	}

	scores.sort(function(a,b){ return b - a; });
	var orderedMoves = mapOrder(vMoves, scores, 'score');


    if (isMaximisingPlayer) {
        var bestMove = -9999;
        for (var i = 0; i < orderedMoves.length; i++) {
			
            chess.makeMove(orderedMoves[i].move);
            bestMove = Math.max(bestMove, minimax(depth - 1, chess, alpha, beta, !isMaximisingPlayer));
            chess.undoLastMove();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    } else {
        var bestMove = 9999;
        for (var i = 0; i < orderedMoves.length; i++) {
		
            chess.makeMove(orderedMoves[i].move);
            bestMove = Math.min(bestMove, minimax(depth - 1, chess, alpha, beta, !isMaximisingPlayer));
            chess.undoLastMove();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
}

function searchTwoSteps(chess){
	var turn = chess.turn;

	/* Get and order moves */
	var moves = chess.getPseudoLegalMoves();

	var best = {};
	best.score = -INFINITE;
	best.move = [];

	for(var i = 0; i < moves.length; i++){
		// console.log(1);
		if(Utils.validateMove(moves[i], [...chess.board], chess.turn, chess.kingIndex, chess.currentPieces, chess.opponentPieces)){
			
			// make move 
			var chessStat = {};
			chessStat.board = chess.board;
			chessStat.turn = chess.turn;
			chessStat.castlingInfo = chess.castlingInfo;
			chessStat.enPassantTarget = chess.enPassantTarget;
			chessStat.halfmoveClock = chess.halfmoveClock;
			chessStat.fullMoveNumber = chess.fullMoveNumber;
			
			var chess1 = new Chess(chessStat);
			chess1.makeMove(moves[i]);
			
			var moves1 = chess1.getPseudoLegalMoves();
			

			for(var j = 0; j < moves1.length; j++){
				// console.log(moves1);
				// console.log(2);

				if(Utils.validateMove(moves1[j], [...chess1.board], chess1.turn, chess1.kingIndex, chess1.currentPieces, chess1.opponentPieces)){

					chess1.makeMove(moves1.length);
					var score = Utils.evaluateBoard(chess1.board, turn);
					chess1.undoLastMove();
					if(score > best.score){
						best.score = score;
						best.move = moves[i];
					}
				}	
			}
			// chess.undoLastMove();
		}
	}
	

	return best.move;
}