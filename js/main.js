var ticTacsToe = angular.module("ticTacs",[]);

ticTacsToe.controller("TicTacController", function(){
	var self = this;
	self.turn = 1;

	self.playerOneTurn = false;
	self.playerTwoTurn = false;
	self.winner = "good luck!";
	self.playerOnePick = "";
	self.playerTwoPick = "";
	self.playerOneFlavor = "Pick your flavor.";
	self.playerTwoFlavor = "Pick your flavor.";
	self.playerOneClass = "";
	self.playerTwoClass = "";

	self.players = {
		tictacs: [
				{
					type: "spearmint",
					image: "images/green-tic.png",
					alt: "green"
				},
				{
					type: "orange",
					image: "images/orange-tic.png",
					alt: "orange"
				},
				{
					type: "wild cherry",
					image: "images/red-tic.png",
					alt: "red"
				},
				{
					type: "freshmints",
					image: "images/white-tic.png",
					alt: "white"
				}
			
		]
	}

	self.pieces = {
		spaces: [
				{
					row: 1, column: 1 , image: "", player: 0
				},
				{
					row: 1, column: 2 , image: "", player: 0
				},
				{
					row: 1, column: 3 , image: "", player: 0
				},
				{
					row: 2, column: 1 , image: "", player: 0
				},
				{
					row: 2, column: 2 , image: "", player: 0
				},
				{
					row: 2, column: 3 , image: "", player: 0
				},
				{
					row: 3, column: 1 , image: "", player: 0
				},
				{
					row: 3, column: 2 , image: "", player: 0
				},
				{
					row: 3, column: 3 , image: "", player: 0
				},
		]
	}

	self.playerOne = function(i){
		if(self.playerOnePick == ""){
		self.playerOneClass = this.players.tictacs[i].alt;
		self.playerOneFlavor = this.players.tictacs[i].type;
		self.playerOnePick = this.players.tictacs[i].image;
		this.players.tictacs.splice(i, 1);
	} 
	}

	self.playerTwo = function(i){
		if(self.playerTwoPick == ""){
			self.playerTwoClass = this.players.tictacs[i].alt;
			self.playerTwoFlavor = this.players.tictacs[i].type;
			self.playerTwoPick = this.players.tictacs[i].image;
			this.players.tictacs.splice(i, 1);
	}
}

	self.gameMove = function(i){
		if(self.turn % 2 == 1 && this.pieces.spaces[i].image == "" && self.winner == "good luck!"){
			self.turn++;
			this.pieces.spaces[i].image = self.playerOnePick;
			this.pieces.spaces[i].player = 1;
			self.checkWinner();
		} else if(this.pieces.spaces[i].image == "" && self.winner == "good luck!") {
			self.turn++;
			this.pieces.spaces[i].image = self.playerTwoPick;
			this.pieces.spaces[i].player = 2;
			self.checkWinner();
		}

	}

	self.checkWinner = function(i){
		for(var i = 0; i < self.pieces.spaces.length; i+=3){
			if(self.pieces.spaces[i].player == self.pieces.spaces[i+1].player && 
				self.pieces.spaces[i].player == self.pieces.spaces[i+2].player &&
				self.pieces.spaces[i].player != 0){
				self.winner = "player " + self.pieces.spaces[i].player + " wins!";

			}
		}
		for(var i = 0; i < 3; i++){
			if(self.pieces.spaces[i].player == self.pieces.spaces[i+3].player && 
				self.pieces.spaces[i].player == self.pieces.spaces[i+6].player &&
				self.pieces.spaces[i].player != 0){
				self.winner = "player " + self.pieces.spaces[i].player + " wins!";
			}
		}
		if(self.pieces.spaces[0].player == self.pieces.spaces[4].player && 
				self.pieces.spaces[0].player == self.pieces.spaces[8].player &&
				self.pieces.spaces[0].player != 0){
				self.winner = "player " + self.pieces.spaces[0].player + " wins!";
			} 
			else if(self.pieces.spaces[2].player == self.pieces.spaces[4].player && 
				self.pieces.spaces[2].player == self.pieces.spaces[6].player &&
				self.pieces.spaces[2].player != 0){
				self.winner = "player " + self.pieces.spaces[2].player + " wins!";
			}
			else if(self.turn == 10){
				self.winner = "it's a tie!";
			}

	}

	self.resetGame = function(){
		for(var i = 0; i < self.pieces.spaces.length; i++){
			self.pieces.spaces[i].player = 0;
			self.pieces.spaces[i].image = "";
		}
	}


});