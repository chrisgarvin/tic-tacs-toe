var ticTacsToe = angular.module("ticTacs",[]);

ticTacsToe.controller("TicTacController", function(){
	var self = this;
	self.turn = 1;

//Initializing variables

	self.playerOneTurn = false;
	self.playerTwoTurn = false;
	self.winner = "good luck!";
	self.playerOneFlavor = "Pick your flavor.";
	self.playerTwoFlavor = "Pick your flavor.";
	self.playerOneClass = "";
	self.playerTwoClass = "";
	self.colorBackground = "";
	self.playerOneObject;
	self.playerTwoObject;

//Create tictacs objects

	self.players = {
		tictacs: [
				{
					type: "spearmint",
					image: "images/green-tic.png",
					alt: "green",
					bgcolor: "rgb(204,255,153)"
				},
				{
					type: "orange",
					image: "images/orange-tic.png",
					alt: "orange",
					bgcolor: "rgb(255,204,153)"
				},
				{
					type: "wild cherry",
					image: "images/red-tic.png",
					alt: "red",
					bgcolor: "rgb(255,153,153)"
				},
				{
					type: "freshmints",
					image: "images/white-tic.png",
					alt: "white",
					bgcolor: "rgb(224,224,224)"
				}
			
		]
	}

//Create games spaces objects

	self.pieces = {
		spaces: [
				{
					row: 1, column: 1, player: 0, ticTacClass: ""
				},
				{
					row: 1, column: 2, player: 0, ticTacClass: ""
				},
				{
					row: 1, column: 3, player: 0, ticTacClass: ""
				},
				{
					row: 2, column: 1, player: 0, ticTacClass: ""
				},
				{
					row: 2, column: 2, player: 0, ticTacClass: ""
				},
				{
					row: 2, column: 3, player: 0, ticTacClass: ""
				},
				{
					row: 3, column: 1, player: 0, ticTacClass: ""
				},
				{
					row: 3, column: 2, player: 0, ticTacClass: ""
				},
				{
					row: 3, column: 3, player: 0, ticTacClass: ""
				}
		]
	}

//Create newGame function in order to reset game by setting all variables/objects to default

		self.newGame = function(){
		self.playerOneClass = "";
		self.playerTwoClass = "";
		self.winner = "good luck!";
		self.turn = 1;
		self.playerOneTurn = false;
		self.playerTwoTurn = false;
		self.playerOneFlavor = "Pick your flavor.";
		self.playerTwoFlavor = "Pick your flavor.";

//Pushes objects back into tictacs that had previously been spliced

		self.players.tictacs.push(self.playerOneObject[0]);
		self.players.tictacs.push(self.playerTwoObject[0]);
		self.pieces = {
		spaces: [
					{
						row: 1, column: 1 , player: 0, ticTacClass: ""
					},
					{
						row: 1, column: 2 , player: 0, ticTacClass: ""
					},
					{
						row: 1, column: 3 , player: 0, ticTacClass: ""
					},
					{
						row: 2, column: 1 , player: 0, ticTacClass: ""
					},
					{
						row: 2, column: 2 , player: 0, ticTacClass: ""
					},
					{
						row: 2, column: 3 , player: 0, ticTacClass: ""
					},
					{
						row: 3, column: 1 , player: 0, ticTacClass: ""
					},
					{
						row: 3, column: 2 , player: 0, ticTacClass: ""
					},
					{
						row: 3, column: 3 , player: 0, ticTacClass: ""
					}
			]
		}
}

//Create playerOne function to store player one data upon selection of tic tac and
//splices selected tic tac

	self.playerOne = function(i){
		if(self.playerOneTurn == false){
		self.playerOneClass = this.players.tictacs[i].alt;
		self.playerOneFlavor = this.players.tictacs[i].type;
		self.playerOneTurn = true;
		self.playerOneObject = this.players.tictacs.splice(i, 1);
	} 
}

//Create playerTwo function to store player two data upon selection of tic tac and
//splices selected tic tac

	self.playerTwo = function(i){
		if(self.playerTwoTurn == false){
			self.playerTwoClass = this.players.tictacs[i].alt;
			self.playerTwoFlavor = this.players.tictacs[i].type;
			self.playerTwoTurn = true;
			self.playerTwoObject = this.players.tictacs.splice(i, 1);
	}
}

//Create gameMove function that will make checks to verify that the move they are making is a
//legal game move, and then checks for winners each move.

	self.gameMove = function(i){
		if(self.turn % 2 == 1 && this.pieces.spaces[i].ticTacClass == "" && self.winner == "good luck!" &&
			self.playerTwoClass != "" && self.playerOneClass != ""){
			self.turn++;
			this.pieces.spaces[i].player = 1;
			this.pieces.spaces[i].ticTacClass = self.playerOneClass;
			self.colorBackground = self.playerTwoObject[0].bgcolor;
			self.checkWinner();
		} else if(this.pieces.spaces[i].ticTacClass == "" && self.winner == "good luck!" &&
			self.playerOneClass != "" && self.playerTwoClass != "") {
			self.turn++;
			this.pieces.spaces[i].player = 2;
			this.pieces.spaces[i].ticTacClass = self.playerTwoClass;
			self.colorBackground = self.playerOneObject[0].bgcolor;
			self.checkWinner();
		}

	}

//Create checkWinner function that will loop through rows/columns/diagnals to see if there is a 
//game winner, or a tie game.

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

});
