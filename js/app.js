//Initialize variables to use throughout JS

var turn = 1;
var r1c1;
var r1c2;
var r1c3;
var r2c1;
var r2c2;
var r2c3;
var r3c1;
var r3c2;
var r3c3;

//Add event listeners to each board position that %2 to keep track of which players
//turn it is. Assign class based on color to set background to proper image, and
//check to see if a winner exists.

document.getElementById('r1c1').addEventListener('click', function(){
	if(turn % 2 == 1 && document.getElementById('r1c1').className == ""){
	document.getElementById('r1c1').className = "green";
	r1c1 = "green";
	turn++;
} else if(document.getElementById('r1c1').className == ""){
	document.getElementById('r1c1').className = "white";
	r1c1 = "white";
	turn++;
}
	checkWinner();
});

document.getElementById('r1c2').addEventListener('click', function(){
	if(turn % 2 == 1 && document.getElementById('r1c2').className == ""){
	document.getElementById('r1c2').className = "green";
	r1c2 = "green";
	turn++;
} else if (document.getElementById('r1c2').className == ""){
	document.getElementById('r1c2').className = "white";
	r1c2 = "white";
	turn++;
}
	checkWinner();
});

document.getElementById('r1c3').addEventListener('click', function(){
	if(turn % 2 == 1 && document.getElementById('r1c3').className == ""){
	document.getElementById('r1c3').className = "green";
	r1c3 = "green";
	turn++;
} else if (document.getElementById('r1c3').className == ""){
	document.getElementById('r1c3').className = "white";
	r1c3 = "white";
	turn++;
}
	checkWinner();
});

document.getElementById('r2c1').addEventListener('click', function(){
	if(turn % 2 == 1 && document.getElementById('r2c1').className == ""){
	document.getElementById('r2c1').className = "green";
	r2c1 = "green";
	turn++;
} else if (document.getElementById('r2c1').className == ""){
	document.getElementById('r2c1').className = "white";
	r2c1 = "white";
	turn++;
}
	checkWinner();
});

document.getElementById('r2c2').addEventListener('click', function(){
	if(turn % 2 == 1 && document.getElementById('r2c2').className == ""){
	document.getElementById('r2c2').className = "green";
	r2c2 = "green";
	turn++;
} else if(document.getElementById('r2c2').className == ""){
	document.getElementById('r2c2').className = "white";
	r2c2 = "white";
	turn++;
}
	checkWinner();
});

document.getElementById('r2c3').addEventListener('click', function(){
	if(turn % 2 == 1 && document.getElementById('r2c3').className == ""){
	document.getElementById('r2c3').className = "green";
	r2c3 = "green";
	turn++;
} else if(document.getElementById('r2c3').className == ""){
	document.getElementById('r2c3').className = "white";
	r2c3 = "white";
	turn++;
}
	checkWinner();
});

document.getElementById('r3c1').addEventListener('click', function(){
	if(turn % 2 == 1 && document.getElementById('r3c1').className == ""){
	document.getElementById('r3c1').className = "green";
	r3c1 = "green";
	turn++;
} else if(document.getElementById('r3c1').className == ""){
	document.getElementById('r3c1').className = "white";
	r3c1 = "white";
	turn++;
}
	checkWinner();
});

document.getElementById('r3c2').addEventListener('click', function(){
	if(turn % 2 == 1 && document.getElementById('r3c2').className == ""){
	document.getElementById('r3c2').className = "green";
	r3c2 = "green";
	turn++;
} else if(document.getElementById('r3c2').className == ""){
	document.getElementById('r3c2').className = "white";
	r3c2 = "white";
	turn++;
}
	checkWinner();
});

document.getElementById('r3c3').addEventListener('click', function(){
	if(turn % 2 == 1 && document.getElementById('r3c3').className == ""){
	document.getElementById('r3c3').className = "green";
	r3c3 = "green";
	turn++;
} else if(document.getElementById('r3c3').className == "") {
	document.getElementById('r3c3').className = "white";
	r3c3 = "white";
	turn++;
}
	checkWinner();
});

//Add event listener to reset button in order to reset the game

document.getElementById('reset').addEventListener('click', function() {
	resetGame();
});

//checkWinner function to see if a winner exists, if so, adds a gameover
//class to overlay the game board so that any click on the board will 
//automatically reset the game instead of continuing to play

function checkWinner(){
	if(r1c1 == "green" && r1c2 == "green" && r1c3 == "green"){
		document.getElementById("winner").innerHTML = "green wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} else if(r2c1 == "green" && r2c2 == "green" && r2c3 == "green"){
		document.getElementById("winner").innerHTML = "green wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} else if(r3c1 == "green" && r3c2 == "green" && r3c3 == "green"){
		document.getElementById("winner").innerHTML = "green wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} else if(r1c1 == "green" && r2c1 == "green" && r3c1 == "green"){
		document.getElementById("winner").innerHTML = "green wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} else if(r1c2 == "green" && r2c2 == "green" && r3c2 == "green"){
		document.getElementById("winner").innerHTML = "green wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} else if(r1c3 == "green" && r2c3 == "green" && r3c3 == "green"){
		document.getElementById("winner").innerHTML = "green wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} else if(r1c3 == "green" && r2c2 == "green" && r3c1 == "green"){
		document.getElementById("winner").innerHTML = "green wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} else if(r1c1 == "green" && r2c2 == "green" && r3c3 == "green"){
		document.getElementById("winner").innerHTML = "green wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} else if(r1c1 == "white" && r1c2 == "white" && r1c3 == "white"){
		document.getElementById("winner").innerHTML = "white wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} else if(r2c1 == "white" && r2c2 == "white" && r2c3 == "white"){
		document.getElementById("winner").innerHTML = "white wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} else if(r3c1 == "white" && r3c2 == "white" && r3c3 == "white"){
		document.getElementById("winner").innerHTML = "white wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} else if(r1c1 == "white" && r2c1 == "white" && r3c1 == "white"){
		document.getElementById("winner").innerHTML = "white wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} else if(r1c2 == "white" && r2c2 == "white" && r3c2 == "white"){
		document.getElementById("winner").innerHTML = "white wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} else if(r1c3 == "white" && r2c3 == "white" && r3c3 == "white"){
		document.getElementById("winner").innerHTML = "white wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} else if(r1c3 == "white" && r2c2 == "white" && r3c1 == "white"){
		document.getElementById("winner").innerHTML = "white wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} else if(r1c1 == "white" && r2c2 == "white" && r3c3 == "white"){
		document.getElementById("winner").innerHTML = "white wins!";
		document.getElementById("gameover").style.display = "block";
		document.getElementById("gameover").addEventListener('click', function() {
	resetGame();
		document.getElementById("gameover").style.display = "none";
});
	} 
};

//resetGame function to set all pieces back to default

function resetGame(){
	document.getElementById('r1c1').className = "";
	document.getElementById('r1c2').className = "";
	document.getElementById('r1c3').className = "";
	document.getElementById('r2c1').className = "";
	document.getElementById('r2c2').className = "";
	document.getElementById('r2c3').className = "";
	document.getElementById('r3c1').className = "";
	document.getElementById('r3c2').className = "";
	document.getElementById('r3c3').className = "";
	document.getElementById("winner").innerHTML = "good luck!";
	r1c1 = "";
	r1c2 = "";
	r1c3 = "";
	r2c1 = "";
	r2c2 = "";
	r2c3 = "";
	r3c1 = "";
	r3c2 = "";
	r3c3 = "";
}
