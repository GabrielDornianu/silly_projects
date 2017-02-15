//The main variables of the game
var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	currentX = 0,
	currentY = 0,
	game_data = document.getElementById("game_data"),
	position = document.getElementById("position"),
	your_square = document.getElementById("your_square"),
	squares = [];

//This function will build the square objects that will be used in the game
function build_ticTacToe_squares(){

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
	console.log("This square is located between: X* " + this.lower_square_coordX + " - " + this.square_coordX +
	" ;Y* " + this.lower_square_coordY + " - " + this.square_coordY +
	" ;Value* " + this.value +
	" ;Number* " + this.square_number);
	}
}

//The for loop adds the 9 squares
for(i=1; i<10; i++){
	actual_square = new build_square(square_number, null, square_coordX, square_coordY);
	squares.push(actual_square);
	square_number += 1;
	square_coordX += 200;
	if(!(i % 3)){
	square_coordX = 200;
	square_coordY += 200;
	}
}

console.log(squares);

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

for(c=0; c<600; c+=200){
	drawGrid(c, 0, c, 600);
	drawGrid(0, c, 600, c);
}

}

build_grid();

function update_position(e){
	currentX = e.clientX;
	currentY = e.clientY;
	console.log("X: " + currentX.toString() + " Y: " + currentY.toString());
	position.innerHTML = "Actual: " + currentX + "x , " + currentY + "y";
}
