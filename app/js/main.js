
function setup() {
 	createCanvas( window.innerWidth, window.innerHeight );
 	world = {};
 	world.dragon = new Dragon(window.innerWidth/2, window.innerHeight/2);
}


function draw() {
	background(255);
	var dragon = world.dragon;
	dragon.draw();
	dragon.move();

}