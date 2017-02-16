"use strict";

//The main variables of the game
var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	currentX = 0,
	currentY = 0,
	game_data = document.getElementById("game_data"),
	position = document.getElementById("position"),
	your_square = document.getElementById("your_square"),
	squares = [],
	actual_square_data,
	player_starts = true,
	this_move = "player",
	actual_symbol = "X",
	difficulty = "easy";

function scan_table(symbol){
	var winner;
	if(symbol != "X"){
		winner = "player1";
	}else if(symbol != "0"){
		winner = "player2";
	}
	if(squares[0].value == symbol && squares[1].value == symbol && squares[2].value == symbol){
		alert("The " + winner + " has won!");
	}else if(squares[3].value == symbol && squares[4].value == symbol && squares[5].value == symbol){
		alert("The " + winner + " has won!");
	}else if(squares[6].value == symbol && squares[7].value == symbol && squares[8].value == symbol){
		alert("The " + winner + " has won!");
	}else if(squares[0].value == symbol && squares[3].value == symbol && squares[6].value == symbol){
		alert("The " + winner + " has won!");
	}else if(squares[1].value == symbol && squares[4].value == symbol && squares[7].value == symbol){
		alert("The " + winner + " has won!");
	}else if(squares[2].value == symbol && squares[5].value == symbol && squares[8].value == symbol){
		alert("The " + winner + " has won!");
	}else if(squares[0].value == symbol && squares[4].value == symbol && squares[8].value == symbol){
		alert("The " + winner + " has won!");
	}else if(squares[2].value == symbol && squares[4].value == symbol && squares[6].value == symbol){
		alert("The " + winner + " has won!");
	}
}

function draw_X(obj, color){
	context.beginPath();
	context.moveTo(obj.lower_square_coordX + 50, obj.lower_square_coordY + 50);
	context.lineTo(obj.lower_square_coordX + 150, obj.lower_square_coordY + 150);
	context.lineTo(obj.lower_square_coordX + 100, obj.lower_square_coordY + 100);
	context.closePath()
	context.lineWidth = 3;
	context.strokeStyle = color;
	context.stroke();
	context.beginPath();
	context.moveTo(obj.lower_square_coordX + 50, obj.lower_square_coordY + 150);
	context.lineTo(obj.lower_square_coordX + 150, obj.lower_square_coordY + 50);
	context.closePath();
	context.stroke();
}

function draw_0(obj, color){
	context.beginPath();
	context.arc(obj.lower_square_coordX + 100, obj.lower_square_coordY + 100, 50,0 ,2*Math.PI);
	context.lineWidth = 3;
	context.strokeStyle = color;
	context.stroke();
}

function draw_symbol(square, symbol){
	if(symbol == "X"){
		draw_X(square, "yellow");
	}else if(symbol == "0"){
		draw_0(square, "blue");
	}
}

//Each time the player or the computer makes a move , this function will get used
function select_square(){
	if(actual_square_data.value == null){
		console.log("square number " + actual_square_data.square_number + " selected");
		actual_square_data.value = actual_symbol;
		draw_symbol(actual_square_data, actual_symbol);
		console.log(squares[actual_square_data.square_number-1].value);
		if(actual_symbol == "X"){
			squares[actual_square_data.square_number-1].value = "0";
			actual_symbol = "0";
		}else{
			squares[actual_square_data.square_number-1].value = "X";
			actual_symbol = "X";
		}
	}
	scan_table(actual_symbol);
}



//This function will build the square objects that will be used in the game
(function build_ticTacToe_squares(){

//The variables incremented in the for loop
var square_number = 1,
	square_coordX = 200,
	square_coordY = 200,
	actual_square;

//The constructor function for each square
function build_square(number, value, coordX, coordY){
	this.square_number = number;
	this.value = value;
	this.square_coordX = coordX;
	this.square_coordY = coordY;
	this.lower_square_coordX = this.square_coordX - 199;
	this.lower_square_coordY = this.square_coordY - 199;
	this.get_data = function(){
	console.log("This square is located between X: " + this.lower_square_coordX + " - " + this.square_coordX
	+ " Y: " + this.lower_square_coordY + " - " + this.square_coordY
	+ " Has the value of: " + this.value
	+ " and the Number: " + this.square_number);
	}
}

//The for loop adds the 9 squares
for(let i=1; i<10; i++){
	actual_square = new build_square(square_number, null, square_coordX, square_coordY);
	squares.push(actual_square);
	square_number += 1;
	square_coordX += 200;
	if(!(i % 3)){
	square_coordX = 200;
	square_coordY += 200;
	}
}

//console.log(squares);

})();

//This function will draw the lines of the game
(function build_grid(){

function drawGrid(startx, starty, endx, endy){
	context.beginPath();
	context.moveTo(startx, starty);
	context.lineTo(endx, endy);
	context.strokeStyle="red";
	context.lineWidth=1;
	context.stroke();
}

for(let c=0; c<600; c+=200){
	drawGrid(c, 0, c, 600);
	drawGrid(0, c, 600, c);
}

})();

//This function gets your position dinamically
function update_position(e){
	currentX = e.clientX;
	currentY = e.clientY;
	//console.log("X: " + currentX.toString() + " Y: " + currentY.toString());
	position.innerHTML = "Actual: " + currentX + "x , " + currentY + "y";

//The function that dinamically gets the square you are on
function highlight_actual_square(){
	for(let square in squares){
		if((currentY >= squares[square].lower_square_coordY && currentY <= squares[square].square_coordY) && (currentX >= squares[square].lower_square_coordX && currentX <= squares[square].square_coordX)){
			your_square.innerHTML = squares[square].square_number;
			//console.log(squares[square].lower_square_coordX + " " + squares[square].lower_square_coordY);
			actual_square_data = squares[square];
		}
	}
}

highlight_actual_square();

}

function AI_move(){

}
