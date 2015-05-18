angular
  .module('ticTacs')
  .controller('TicTacController', TicTacController);

TicTacController.$inject = ["$firebaseObject", "$firebaseArray"];


function TicTacController($firebaseObject, $firebaseArray) {

  //Initialize variables that will be used throughout

  var self = this;
  self.playerOne = playerOne;
  self.playerTwo = playerTwo;
  self.gameMove = gameMove;
  self.newGame = newGame;
  self.checkWinner = checkWinner;
  self.addChat = addChat;
  self.clearPlayerOneChat = clearPlayerOneChat;
  self.clearPlayerTwoChat = clearPlayerTwoChat;
  self.players = getPlayers();
  self.pieces = getPieces();
  self.gameData = getGameData();
  self.playerOneMessages = getPlayerOneMessages();
  self.playerTwoMessages = getPlayerTwoMessages();

  //Local varibales that will determine if there are people playing from multiple
  //devices or just locally.

  self.localPlayerOneTurn = false;
  self.localPlayerTwoTurn = false;

  //Variable that will be modified to true when a winner occurs, which will
  //add a winner animation class to the gameboard.

  self.winner = false;

  //Create getGameData function that will initialize a firebaseObject that will
  //store game information that will update throughout game play

  function getGameData() {
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

  //Create getPlayers function that will initialize a firebaseObject to store the
  //player icons.

  function getPlayers() {
    var ref = new Firebase("https://tictacstoe.firebaseio.com/players");
    var players = $firebaseObject(ref);

    players.tictacs = [];
    players.tictacs.push({
      type: "spearmint",
      image: "images/green-tic.png",
      alt: "green"
    });
    players.tictacs.push({
      type: "orange",
      image: "images/orange-tic.png",
      alt: "orange"
    });
    players.tictacs.push({
      type: "wild cherry",
      image: "images/red-tic.png",
      alt: "red"
    });
    players.tictacs.push({
      type: "freshmints",
      image: "images/white-tic.png",
      alt: "white"
    });

    players.$save();

    return players;
  }

  //Create getPieces function to initialize a firebaseObject that will store the
  //gameboard and the pieces within.

  function getPieces() {
    var ref = new Firebase("https://tictacstoe.firebaseio.com/pieces");
    var pieces = $firebaseObject(ref);

    pieces.spaces = [];

    for (var i = 1; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        pieces.spaces.push({
          row: i,
          column: j,
          player: 0,
          ticTacClass: ""
        });
      }
    }
    pieces.$save();
    return pieces;
  }

  //Create getPlayerOneMessages function to initialize a firebaseArray to store the messages
  //that are typed within the chat window of player one

  function getPlayerOneMessages() {
    var ref = new Firebase("https://tictacstoe.firebaseio.com/playerOneMessages");
    var playerOneMessages = $firebaseArray(ref);

    return playerOneMessages;
  }

  //Create getPlayerTwoMessages function to initialize a firebaseArray to store the messages
  //that are typed within the chat window of player two

  function getPlayerTwoMessages() {
    var ref = new Firebase("https://tictacstoe.firebaseio.com/playerTwoMessages");
    var playerTwoMessages = $firebaseArray(ref);

    return playerTwoMessages;
  }


  //Create playerOne function to store player one data upon selection of tic tac and
  //splices selected tic tac. param i represents the index of the logo selected, which
  //allows the proper array element to be modified.

  function playerOne(i) {
    if (self.gameData.playerOneTurn === false) {
      self.gameData.playerOneClass = this.players.tictacs[i].alt;
      self.gameData.playerOneFlavor = this.players.tictacs[i].type;
      self.gameData.playerOneTurn = true;
      self.playerOneObject = this.players.tictacs.splice(i, 1);
      self.players.$save();
      self.gameData.$save();
      self.localPlayerOneTurn = true;
    }
  }

  //Create playerTwo function to store player two data upon selection of tic tac and
  //splices selected tic tac. param i represents the index of the logo selected, which
  //allows the proper array element to be modified.

  function playerTwo(i) {
    if (self.gameData.playerTwoTurn === false) {
      self.gameData.playerTwoClass = this.players.tictacs[i].alt;
      self.gameData.playerTwoFlavor = this.players.tictacs[i].type;
      self.gameData.playerTwoTurn = true;
      self.playerTwoObject = this.players.tictacs.splice(i, 1);
      self.players.$save();
      self.gameData.$save();
      self.localPlayerTwoTurn = true;
    }
  }

  //Create clearPlayerOneChat function to clear the messages array when user types 'clear'
  //in chat window of player one. Param i represents text entered into the text box field within
  //the chat.

  function clearPlayerOneChat(i) {
    if (i.toLowerCase() == "clear") {
      for (var j = 0; j < self.playerOneMessages.length + 1; j++) {
        self.playerOneMessages.$remove(j);
      }
    }
  }

  //Create clearPlayerTwoChat function to clear the messages array when user types 'clear'
  //in chat window of player two. Param i represents text entered into the text box field within
  //the chat.

  function clearPlayerTwoChat(i) {
    if (i.toLowerCase() == "clear") {
      for (var j = 0; j < self.playerTwoMessages.length + 1; j++) {
        self.playerTwoMessages.$remove(j);
      }
    }
  }

  //Create addChat function that will add messages to the message array when user
  //enters a new message. Param x represents the text input in the chat, and param y
  //represents which player entered this particular message. Bypasses this if the
  //user enters 'clear'

  function addChat(x, y) {
    if (x.toLowerCase() !== 'clear') {
      self.playerOneMessages.$add({
        message: x,
        id: y
      });
      self.playerTwoMessages.$add({
        message: x,
        id: y
      });
      self.playerOneMessages.$save();
      self.playerTwoMessages.$save();
    }
  }

  //Create newGame function in order to reset game by setting all variables/objects to default

  function newGame() {
    if (self.localPlayerOneTurn == true || self.localPlayerTwoTurn == true) {
      self.gameData.playerOneTurn = false;
      self.gameData.playerTwoTurn = false;
      self.gameData.turn = 1;
      self.gameData.winner = "good luck!";
      self.gameData.playerOneFlavor = "Pick your flavor.";
      self.gameData.playerTwoFlavor = "Pick your flavor.";
      self.gameData.playerOneClass = "";
      self.gameData.playerTwoClass = "";
      self.winner = false;

      //Pushes objects back into tictacs that had previously been spliced

      self.players.tictacs = [];
      self.players.tictacs.push({
        type: "spearmint",
        image: "images/green-tic.png",
        alt: "green"
      });
      self.players.tictacs.push({
        type: "orange",
        image: "images/orange-tic.png",
        alt: "orange"
      });
      self.players.tictacs.push({
        type: "wild cherry",
        image: "images/red-tic.png",
        alt: "red"
      });
      self.players.tictacs.push({
        type: "freshmints",
        image: "images/white-tic.png",
        alt: "white"
      });


      self.pieces.spaces = [];

      for (var i = 1; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
          self.pieces.spaces.push({
            row: i,
            column: j,
            player: 0,
            ticTacClass: ""
          });
        }
      }

      self.pieces.$save();
      self.players.$save();
      self.gameData.$save();
    }

  }

  //Create gameMove function that will make checks to verify that the move they are making is a
  //legal game move, and then checks for winners each move.

  function gameMove(i) {

    //Determines if it is player 1's turn by taking the result of turn % 2

    if (self.gameData.turn % 2 == 1 && this.pieces.spaces[i].ticTacClass == "" && self.gameData.winner == "good luck!" && self.gameData.playerTwoClass != "" && self.gameData.playerOneClass != "" && self.localPlayerOneTurn == true) {
      self.gameData.turn++;
      this.pieces.spaces[i].player = 1;
      this.pieces.spaces[i].ticTacClass = self.gameData.playerOneClass;
      self.checkWinner();
      self.pieces.$save();
      self.gameData.$save();
    }

    //Determines if it is player 2's turn by taking the result of turn % 2
    else if (this.pieces.spaces[i].ticTacClass == "" && self.gameData.winner == "good luck!" && self.gameData.playerOneClass != "" && self.gameData.playerTwoClass != "" && self.localPlayerTwoTurn == true && self.gameData.turn % 2 == 0) {
      self.gameData.turn++;
      this.pieces.spaces[i].player = 2;
      this.pieces.spaces[i].ticTacClass = self.gameData.playerTwoClass;
      self.checkWinner();
      self.pieces.$save();
      self.gameData.$save();
    }

  }

  //Create checkWinner function that will loop through rows/columns/diagnals to see if there is a
  //game winner, or a tie game. A game winner is determined if 3 of the same player icon
  //is displayed horizontally, veritcally or diagnoally within the 3 by 3 gameboard.

  function checkWinner(i) {

    //For loop to run through game board to determine if three of the same icons are
    //selected horizontally.

    for (var i = 0; i < self.pieces.spaces.length; i += 3) {
      if (self.pieces.spaces[i].player == self.pieces.spaces[i + 1].player && self.pieces.spaces[i].player == self.pieces.spaces[i + 2].player && self.pieces.spaces[i].player != 0) {
        self.gameData.winner = "player " + self.pieces.spaces[i].player + " wins!";
        self.winner = true;
      }
    }

    //For loop to run through game board to determine if three of the same icons are
    //selected vertically.

    for (var i = 0; i < 3; i++) {
      if (self.pieces.spaces[i].player == self.pieces.spaces[i + 3].player && self.pieces.spaces[i].player == self.pieces.spaces[i + 6].player && self.pieces.spaces[i].player != 0) {
        self.gameData.winner = "player " + self.pieces.spaces[i].player + " wins!";
        self.winner = true;
      }
    }

    //Checks to see if three of the same icons are displayed diagonally in if/else if
    //statements.

    if (self.pieces.spaces[0].player == self.pieces.spaces[4].player && self.pieces.spaces[0].player == self.pieces.spaces[8].player && self.pieces.spaces[0].player != 0) {
      self.gameData.winner = "player " + self.pieces.spaces[0].player + " wins!";
      self.winner = true;
    } else if (self.pieces.spaces[2].player == self.pieces.spaces[4].player && self.pieces.spaces[2].player == self.pieces.spaces[6].player && self.pieces.spaces[2].player != 0) {
      self.gameData.winner = "player " + self.pieces.spaces[2].player + " wins!";
      self.winner = true;
    }


    //Checks to see if the turn count is 10 with no winner, thus declaring a tie game.
    else if (self.gameData.turn == 10) {
      self.gameData.winner = "Tic Tac Tie!";
      self.winner = true;
    }

  }

}
