
function setup() {
 	createCanvas( window.innerWidth -20, window.innerHeight -20);
 	world = {};
 	world.dragon = new Dragon(window.innerWidth/2, window.innerHeight/2);
}


function draw() {
	background(255);
	var dragon = world.dragon;
	dragon.draw();
	dragon.move();
}