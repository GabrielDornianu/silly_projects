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
	this_move = "player",
	actual_symbol = "X",
	difficulty = "easy",
	frees_quares = [],
	game_difficulty = 1;

function set_difficulty(difficulty){
	game_difficulty = difficulty;
}

function scan_table(){
	var winner;
	if(actual_symbol == "X"){
		winner = "player";
	}else if(actual_symbol == "0"){
		winner = "computer";
	}
	if(squares[0].value == actual_symbol && squares[1].value == actual_symbol && squares[2].value == actual_symbol){
		alert("The " + winner + " has won!");
	}else if(squares[3].value == actual_symbol && squares[4].value == actual_symbol && squares[5].value == actual_symbol){
		alert("The " + winner + " has won!");
	}else if(squares[6].value == actual_symbol && squares[7].value == actual_symbol && squares[8].value == actual_symbol){
		alert("The " + winner + " has won!");
	}else if(squares[0].value == actual_symbol && squares[3].value == actual_symbol && squares[6].value == actual_symbol){
		alert("The " + winner + " has won!");
	}else if(squares[1].value == actual_symbol && squares[4].value == actual_symbol && squares[7].value == actual_symbol){
		alert("The " + winner + " has won!");
	}else if(squares[2].value == actual_symbol && squares[5].value == actual_symbol && squares[8].value == actual_symbol){
		alert("The " + winner + " has won!");
	}else if(squares[0].value == actual_symbol && squares[4].value == actual_symbol && squares[8].value == actual_symbol){
		alert("The " + winner + " has won!");
	}else if(squares[2].value == actual_symbol && squares[4].value == actual_symbol && squares[6].value == actual_symbol){
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
		if(actual_symbol == "X"){
			draw_symbol(actual_square_data, actual_symbol);
			actual_square_data.value = actual_symbol;
			squares[actual_square_data.square_number-1].value = "0";
			actual_symbol = "0";
			//scan_table();
			if(game_difficulty == 1){
				easy_AI_move();
			}
			console.log(actual_square_data.value);
		}
	}
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
			actual_square_data = squares[square];
		}
	}
}

highlight_actual_square();

}

function easy_AI_move(){
	frees_quares = squares.filter(function(square){
		if(square.value==null){
			return true;
		}
	});
	let random_number = Math.floor(Math.random()*frees_quares.length);
	draw_symbol(frees_quares[random_number], "0");
	squares[frees_quares[random_number].square_number-1].value = "0";
	actual_symbol = "X";
	scan_table();
}

function medium_AI_move(){

}

function hard_AI_move(){

}
