// a glorified linked list with draw/move functions
class Segment {
	constructor(image, startXPosition, startYPosition) {
		this.image = image;
		this.xPosition = startXPosition;
		this.yPosition = startYPosition;
	}

	draw() {
		ellipse(this.xPosition, this.yPosition, 50, 50);
	}

	//move in the direction of the next segment.
	move() {
		let nextX = this.nextSegment.xPosition;
		let nextY = this.nextSegment.yPosition;

		let diffX = nextX - this.xPosition;
		let diffY = nextY - this.yPosition;

		this.xPosition += (diffX/10);
		this.yPosition += (diffY/10);
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