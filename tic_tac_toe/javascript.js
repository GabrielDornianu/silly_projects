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
	actual_symbol = "X",
	game_difficulty = 1,
	winner_exists = false;

function restart_table(){
	context.clearRect(0, 0, 600, 600);
	squares = [];
	actual_square_data = {};
	winner_exists = false;
	build_grid();
	build_ticTacToe_squares();
}

function set_difficulty(num){
	restart_table();
	game_difficulty = num;
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

function test_winner(actual_symbol){
	if(!winner_exists){
	if(squares[0].square_value == actual_symbol && squares[1].square_value == actual_symbol && squares[2].square_value == actual_symbol){
		alert("The " + actual_symbol + " has won!");
		winner_exists = true;
	}else if(squares[3].square_value == actual_symbol && squares[4].square_value == actual_symbol && squares[5].square_value == actual_symbol){
		alert("The " + actual_symbol + " has won!");
		winner_exists = true;
	}else if(squares[6].square_value == actual_symbol && squares[7].square_value == actual_symbol && squares[8].square_value == actual_symbol){
		alert("The " + actual_symbol + " has won!");
		winner_exists = true;
	}else if(squares[0].square_value == actual_symbol && squares[3].square_value == actual_symbol && squares[6].square_value == actual_symbol){
		alert("The " + actual_symbol + " has won!");
		winner_exists = true;
	}else if(squares[1].square_value == actual_symbol && squares[4].square_value == actual_symbol && squares[7].square_value == actual_symbol){
		alert("The " + actual_symbol + " has won!");
		winner_exists = true;
	}else if(squares[2].square_value == actual_symbol && squares[5].square_value == actual_symbol && squares[8].square_value == actual_symbol){
		alert("The " + actual_symbol + " has won!");
		winner_exists = true;
	}else if(squares[0].square_value == actual_symbol && squares[4].square_value == actual_symbol && squares[8].square_value == actual_symbol){
		alert("The " + actual_symbol + " has won!");
		winner_exists = true;
	}else if(squares[2].square_value == actual_symbol && squares[4].square_value == actual_symbol && squares[6].square_value == actual_symbol){
		alert("The " + actual_symbol + " has won!");
		winner_exists = true;
	}
	}
}

function scan_table(){
	if(actual_symbol == "X"){
		test_winner(actual_symbol);
	}else if(actual_symbol == "0"){
		test_winner(actual_symbol);
	}
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
	if(actual_square_data.square_value == null){

		//your move
			draw_symbol(actual_square_data, actual_symbol);
			actual_square_data.square_value = actual_symbol;
			squares[actual_square_data.square_number-1].square_value = actual_symbol;
			scan_table();

		//computer's move
			if(game_difficulty == 1){
			easy_AI_move();
		}else if(game_difficulty == 2){
			medium_AI_move();
		}else if(game_difficulty == 3){
			hard_AI_move();
		}
	}
}



//This function will build the square objects that will be used in the game
function build_ticTacToe_squares(){

//The variables incremented in the for loop
var square_number = 1,
	square_coordX = 200,
	square_coordY = 200,
	actual_square;

//The constructor function for each square
function build_square(number, square_value, coordX, coordY){
	this.square_number = number;
	this.square_value = square_value;
	this.square_coordX = coordX;
	this.square_coordY = coordY;
	this.lower_square_coordX = this.square_coordX - 199;
	this.lower_square_coordY = this.square_coordY - 199;
	this.get_data = function(){
	console.log("This square is located between X: " + this.lower_square_coordX + " - " + this.square_coordX
	+ " Y: " + this.lower_square_coordY + " - " + this.square_coordY
	+ " Has the square_value of: " + this.square_value
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

}

build_ticTacToe_squares();

//This function will draw the lines of the game
function build_grid(){

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

}

build_grid();

//This function gets your position dinamically
function update_position(e){
	currentX = e.clientX;
	currentY = e.clientY;
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

function test_and_draw(symbol){
		let null_squares = [];
		console.log("LOOP STARTS");
		for(let i=0; i<squares.length; i++){
			if(squares[i].square_value == null){
				null_squares.push(squares[i]);
				console.log(squares[i].square_number);
			}
		}
		console.log("LOOP ENDS");

		let random_square = null_squares[Math.floor(Math.random() * null_squares.length)];
		draw_symbol(random_square, symbol);
		squares[random_square.square_number - 1].square_value = symbol;
		test_winner(actual_symbol);
}

function analyse_paths(){
	let paths = {};
	for(let i=0; i<squares.length+1; i++){
		if(squares[i].square_value == actual_symbol && )
	}
	return paths;
}

function easy_AI_move(){
	console.log("Difficulty set to easy");
	actual_symbol = "0";
	test_and_draw(actual_symbol);
	actual_symbol = "X";
	scan_table();
}

function medium_AI_move(){
	console.log("Difficulty set to medium");
	actual_symbol = "0";
	analyse_paths();
	try_to_stop();
	test_and_draw(actual_symbol);
	actual_symbol = "X";
	scan_table();
}

function hard_AI_move(){
	console.log("Difficulty set to hard");
	actual_symbol = "0";
	analyse_paths();
	try_to_stop();
	try_to_win();
	test_and_draw(actual_symbol);
	actual_symbol = "X";
	scan_table();
}
