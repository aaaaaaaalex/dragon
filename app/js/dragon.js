// a glorified linked list with draw/move functions
class Segment {
	constructor(image, startXPosition, startYPosition) {
		this.image = image;
		this.colour = color(0,0,0);

		this.xPosition = startXPosition;
		this.yPosition = startYPosition;

		this.width = 50;
		this.height = 50;

		// any number between 0 and 1
		this.elasticity = 0.0;

		// 1 unit is the diameter of a segment
		this.maxStretch = 1.1;
		this.maxContract = 1;
	}

	draw() {
		fill(this.colour);
		ellipse(this.xPosition, this.yPosition, this.width, this.height);
		fill(255);
	}

	//move in the direction of the next segment.
	move() {
		let nextX = this.nextSegment.xPosition;
		let nextY = this.nextSegment.yPosition;

		let diffX = nextX - this.xPosition;
		let diffY = nextY - this.yPosition;

		let squareDistance = Math.pow(diffX, 2) + Math.pow( diffY, 2);
		let modalDistance = Math.sqrt(squareDistance);
		let distanceInSegments = modalDistance/this.width;


		if (distanceInSegments > this.maxStretch){
			// compensate for overstretch on the x and y axis proportionally
			let overDistance = distanceInSegments - this.maxStretch;
			let overDistanceProportion = overDistance / distanceInSegments;
			let overDistanceX = diffX * overDistanceProportion;
			let overDistanceY = diffY * overDistanceProportion;

			this.xPosition += overDistanceX;
			this.yPosition += overDistanceY;
		}

		this.xPosition += (diffX * this.elasticity);
		this.yPosition += (diffY * this.elasticity);
	}

	setNextSegment(seg) {
		this.nextSegment = seg;
	}

	setPrevSegment(seg) {
		this.prevSegment = seg;
	}
}




class Dragon {
	constructor(startXPosition, startYPosition) {
		this.xPosition = startXPosition;
		this.yPosition = startYPosition;
		this.width = 100;
		this.height = 30;
		this.segmentCount = 10;
		this.segments = [];
		this.imagesBaseDir = "/images/";

		this.populateSegments();
	}


	draw() {
		for (var segment of this.segments) {
			segment.draw();
		}
	}

	move() {
		this.xPosition = mouseX;
		this.yPosition = mouseY;
		for(var segment of this.segments){
			segment.move();
		}
	}

	populateSegments() {
		// initialise segments, with first one following the dragon object
		this.segments[0] = new Segment("heh", this.xPosition, this.yPosition);
		this.segments[0].setNextSegment(this);
		var i = 1;
		while (i < this.segmentCount) {
			var segment = new Segment("heh", this.xPosition+(50*i), this.yPosition );
			this.segments[i] = segment;
			// link each segment to the one before it
			segment.setNextSegment(this.segments[i-1]);
			i++;
		}

	}

}