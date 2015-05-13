angular
    .module('ticTacs')
		.controller('TicTacController', TicTacController);

		TicTacController.$inject = ["$firebaseObject"];


function TicTacController($firebaseObject){

	var self = this;
	self.playerOne = playerOne;
	self.playerTwo = playerTwo;
	self.gameMove = gameMove;
	self.newGame = newGame;
	self.checkWinner = checkWinner;
	self.playerOneObject;
	self.playerTwoObject;
	self.players = getPlayers();
	self.pieces = getPieces();
	self.gameData = getGameData();

	function getGameData(){
		var ref = new Firebase("https://tictacstoe.firebaseio.com/gameData");
		var gameData = $firebaseObject(ref);

		gameData.playerOneTurn = false;
		gameData.playerTwoTurn = false;
		gameData.turn = 1;
		gameData.winner = "good luck!";
		gameData.playerOneFlavor = "Pick your flavor.";
		gameData.playerTwoFlavor = "Pick your flavor.";
		gameData.playerOneClass = "";
		gameData.playerTwoClass = "";

		gameData.$save();
		return gameData;
	}


function getPlayers(){
	var ref = new Firebase("https://tictacstoe.firebaseio.com/players");
	var players = $firebaseObject(ref);

	players.tictacs = [];
	players.tictacs.push({type: "spearmint", image: "images/green-tic.png", alt: "green"});
	players.tictacs.push({type: "orange", image: "images/orange-tic.png", alt: "orange"});
	players.tictacs.push({type: "wild cherry", image: "images/red-tic.png", alt: "red"});
	players.tictacs.push({type: "freshmints", image: "images/white-tic.png", alt: "white"});

	players.$save();

	return players;
}

function getPieces(){
	var ref = new Firebase("https://tictacstoe.firebaseio.com/pieces");
	var pieces = $firebaseObject(ref);

	pieces.spaces = [];

	for(var i = 1; i < 4; i++){
		for(var j = 1; j < 4; j++){
			pieces.spaces.push({row: i, column: j, player: 0, ticTacClass: ""})
		}
	}
	pieces.$save();
	return pieces;
}


//Create playerOne function to store player one data upon selection of tic tac and
//splices selected tic tac

	function playerOne(i){
		if(self.gameData.playerOneTurn == false){
		self.gameData.playerOneClass = this.players.tictacs[i].alt;
		self.gameData.playerOneFlavor = this.players.tictacs[i].type;
		self.gameData.playerOneTurn = true;
		self.playerOneObject = this.players.tictacs.splice(i, 1);
		self.players.$save();
		self.gameData.$save();
	};
};

//Create playerTwo function to store player two data upon selection of tic tac and
//splices selected tic tac

	function playerTwo(i){
		if(self.gameData.playerTwoTurn == false){
			self.gameData.playerTwoClass = this.players.tictacs[i].alt;
			self.gameData.playerTwoFlavor = this.players.tictacs[i].type;
			self.gameData.playerTwoTurn = true;
			self.playerTwoObject = this.players.tictacs.splice(i, 1);
			self.players.$save();
			self.gameData.$save();
	};
};


//Create games spaces objects


//Create newGame function in order to reset game by setting all variables/objects to default

		function newGame(){

			self.gameData.playerOneTurn = false;
			self.gameData.playerTwoTurn = false;
			self.gameData.turn = 1;
			self.gameData.winner = "good luck!";
			self.gameData.playerOneFlavor = "Pick your flavor.";
			self.gameData.playerTwoFlavor = "Pick your flavor.";
			self.gameData.playerOneClass = "";
			self.gameData.playerTwoClass = "";

//Pushes objects back into tictacs that had previously been spliced

			self.players.tictacs = [];
			self.players.tictacs.push({type: "spearmint", image: "images/green-tic.png", alt: "green"});
			self.players.tictacs.push({type: "orange", image: "images/orange-tic.png", alt: "orange"});
			self.players.tictacs.push({type: "wild cherry", image: "images/red-tic.png", alt: "red"});
			self.players.tictacs.push({type: "freshmints", image: "images/white-tic.png", alt: "white"});


			self.pieces.spaces = [];

			for(var i = 1; i < 4; i++){
				for(var j = 1; j < 4; j++){
					self.pieces.spaces.push({row: i, column: j, player: 0, ticTacClass: ""})
				}
			}

						self.pieces.$save();
						self.players.$save();
						self.gameData.$save();

};

//Create gameMove function that will make checks to verify that the move they are making is a
//legal game move, and then checks for winners each move.

	function gameMove(i){
		if(self.gameData.turn % 2 == 1 && this.pieces.spaces[i].ticTacClass == "" && self.gameData.winner == "good luck!" &&
			self.gameData.playerTwoClass != "" && self.gameData.playerOneClass != ""){
			self.gameData.turn++;
			this.pieces.spaces[i].player = 1;
			this.pieces.spaces[i].ticTacClass = self.gameData.playerOneClass;
			self.checkWinner();
			self.pieces.$save();
			self.gameData.$save();
		} else if(this.pieces.spaces[i].ticTacClass == "" && self.gameData.winner == "good luck!" &&
			self.gameData.playerOneClass != "" && self.gameData.playerTwoClass != "") {
			self.gameData.turn++;
			this.pieces.spaces[i].player = 2;
			this.pieces.spaces[i].ticTacClass = self.gameData.playerTwoClass;
			self.checkWinner();
			self.pieces.$save();
			self.gameData.$save();
		};

	};

//Create checkWinner function that will loop through rows/columns/diagnals to see if there is a
//game winner, or a tie game.

	function checkWinner(i){
		for(var i = 0; i < self.pieces.spaces.length; i+=3){
			if(self.pieces.spaces[i].player == self.pieces.spaces[i+1].player &&
				self.pieces.spaces[i].player == self.pieces.spaces[i+2].player &&
				self.pieces.spaces[i].player != 0){
				self.gameData.winner = "player " + self.pieces.spaces[i].player + " wins!";
			};
		};
		for(var i = 0; i < 3; i++){
			if(self.pieces.spaces[i].player == self.pieces.spaces[i+3].player &&
				self.pieces.spaces[i].player == self.pieces.spaces[i+6].player &&
				self.pieces.spaces[i].player != 0){
				self.gameData.winner = "player " + self.pieces.spaces[i].player + " wins!";
			};
		};
		if(self.pieces.spaces[0].player == self.pieces.spaces[4].player &&
				self.pieces.spaces[0].player == self.pieces.spaces[8].player &&
				self.pieces.spaces[0].player != 0){
				self.gameData.winner = "player " + self.pieces.spaces[0].player + " wins!";
			}
			else if(self.pieces.spaces[2].player == self.pieces.spaces[4].player &&
				self.pieces.spaces[2].player == self.pieces.spaces[6].player &&
				self.pieces.spaces[2].player != 0){
				self.gameData.winner = "player " + self.pieces.spaces[2].player + " wins!";
			}
			else if(self.turn == 10){
				self.gameData.winner = "it's a tie!";
			};

	};

};
