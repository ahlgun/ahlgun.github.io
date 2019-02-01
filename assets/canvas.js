
// ----- ---------- ----- \\
// ----- ---------- ----- \\
// ----- | CANVAS | ----- \\
// ----- ---------- ----- \\
// ----- ---------- ----- \\



// ---------------------------------------------- \\
// ----- |||          VARIABLES         ||| ----- \\
// ---------------------------------------------- \\
let canvas = document.getElementById("canvas"),
	c = canvas.getContext("2d"),
	H = canvas.height = window.innerHeight,
	W = canvas.width = window.innerWidth,
	mouseX = null,
	mouseY = null,
	particleCount = W/30 + 15,
	particles = [],
	minDist = 150,
	dist,
	drag = 0.9;



// ---------------------------------------------- \\
// ----- |||     ANIMATION REQUESTS     ||| ----- \\
// ----- |||     &  EVENT LISTENERS     ||| ----- \\
// ---------------------------------------------- \\


// ----- | Animation frame request | ----- \\
window.requestAnimationFrame = (() => {
  return window.requestAnimationFrame       || 
         window.webkitRequestAnimationFrame || 
         window.mozRequestAnimationFrame    || 
         window.oRequestAnimationFrame      || 
         window.msRequestAnimationFrame     ||  
	function(){
		window.setTimeout(callback, 1000 / 60);}})();

// ----- | Eventlistener for particle movement | ----- \\


document.body.addEventListener("mousemove", e => {eventMove(e)});
/* document.body.addEventListener("click",     e => {eventIntersect(e)}); */





// ---------------------------------------------- \\
// ----- |||           REGULAR          ||| ----- \\
// ----- |||          FUNCTIONS         ||| ----- \\
// ---------------------------------------------- \\


// ----- | Clears canvas | ----- \\
let updateCanvas = () => {
	c.clearRect(0,0,W,H);
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;}

// ----- | Updates particles | ----- \\
let updateParticles = () => {
	for (let a = 0; a < particles.length; a++) {
		let p1 = particles[a];
		p1.updatePosition();
		for (let b = a+1; b < particles.length; b++) {
			let p2 = particles[b];
			if(p1.distanceTo(p2)) {
				p1.drawLineTo(p2);
				p1.applyForces(p2);}}
		p1.draw();}}

// ----- | Creates new particles | ----- \\
let pushNewParticles = () => {
	for(let i=0; i<particleCount; i++) {
		particles.push(new Particle());}}

// ----- | Handles event actions | ----- \\

let eventMove = e => {
  if(mouseX == null || mouseY == null) {
  	mouseX = e.screenX; mouseY = e.screenY;}
	let posDiff = {x:e.screenX - mouseX, y:e.screenY - mouseY};
  mouseX = e.screenX; 
  mouseY = e.screenY;
	for(let i in particles) {
  	particles[i].applyParallax(posDiff);
	}
}
  
let eventIntersect = e => {
 	let rect = canvas.getBoundingClientRect();
	let intersectionObject = {x: e.clientX - rect.left, y: e.clientY - rect.top};
 	for(let i in particles) {
  	particles[i].checkClickIntersection(intersectionObject);
	}
}






// ---------------------------------------------- \\
// ----- |||        CONSTRUCTOR         ||| ----- \\
// ----- |||         FUNCTIONS          ||| ----- \\
// ---------------------------------------------- \\


// ----- | Particle constructor | ----- \\
function Particle() {
	this.x = Math.random() * W;
	this.y = Math.random() * H;
	this.vx = -0.5 + Math.random() * 1;
	this.vy = -0.5 + Math.random() * 1;
	this.aVector = {x:null, y:null};
	this.bVector = {x:0, y:0};
	this.index = Math.round(Math.random()*2 + 1);
	this.radius = this.index ;
	this.minDist = minDist + (Math.random()*(minDist/2)-(minDist/2));
	this.clicked = false;

	// ----- | Draws the particle | ----- \\
	this.draw = () => {
		c.fillStyle = "rgb(255,255,255)";
		c.beginPath();
		if(this.clicked == true) c.arc(this.x, this.y, this.radius * 4 , 0, Math.PI * 2);
		else c.arc(this.x, this.y, this.radius * 2 , 0, Math.PI * 2);
		c.fill();
		c.fillStyle = "rgb(30,30,30)";
		c.beginPath();
		if(this.clicked == true) c.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
		else c.arc(this.x, this.y, this.radius * 1.3, 0, Math.PI * 2);
		c.fill();}

	// ----- | Updates the position of the particle | ----- \\
	this.updatePosition = () => {
		if(!this.clicked) {
			this.x += this.vx;
			this.y += this.vy;
			if      (this.x + this.radius > W) this.x =     this.radius;
			else if (this.x - this.radius < 0) this.x = W - this.radius;
			if      (this.y + this.radius > H) this.y =     this.radius;
			else if (this.y - this.radius < 0) this.y = H - this.radius;
		}
	}

	// ----- | Checks distance between this and another particle | ----- \\
	this.distanceTo = other => {
		let trueDistance = this.distanceBetween(other);
		if (trueDistance <= this.minDist) return true; else return false;}

	// ----- | Pythagoras theorem | ----- \\
	this.distanceBetween = other => {
		let a = this.x - other.x;
		let b = this.y - other.y;
		return Math.sqrt(a*a + b*b);}

	// ----- | Draws line between this and another particle | ----- \\
	this.drawLineTo = other => {
		let dist = this.distanceBetween(other);
		let trueDist = dist - this.minDis;
		c.beginPath();
		c.strokeStyle = "rgba(255,255,255," + (1.2-dist/this.minDist) + ")";
		c.lineWidth = this.minDist/(dist*5 - 0.05);
		c.moveTo(this.x, this.y);
		c.lineTo(other.x, other.y);
		c.stroke();
		c.closePath();
		c.lineWidth = 1;}

	// ----- | Applies forces to this and another particle | ----- \\
	this.applyForces = other => {
		let	dx = this.x - other.x;
		let dy = this.y - other.y;
		let ax = dx/200000;
		let ay = dy/200000;
		this.vx -= ax;
		this.vy -= ay;
		other.vx += ax;
		other.vy += ay;}

	// ----- | Applies parallax | ----- \\
	this.applyParallax = obj => {
		switch(this.index) {
  	  case 1:
  			this.x -= obj.x/50;
  			this.y -= obj.y/50;
  			break; 
  		case 2:
	  		this.x -= obj.x/35;
	  		this.y -= obj.y/35;
  			break;
  		case 3:
	  		this.x -= obj.x/20;
	  		this.y -= obj.y/20;
  			break;}}
  this.checkClickIntersection = obj => {
  	if(Math.sqrt((this.x-obj.x)*(this.x-obj.x) + (this.y-obj.y)*(this.y-obj.y)) < this.radius * 5) this.clicked = true; else this.clicked = false;}}




// ---------------------------------------------- \\
// ----- |||          ANIMATIONS        ||| ----- \\
// ----- |||          &    LOOPS        ||| ----- \\
// ---------------------------------------------- \\


// ----- | Main animation loop | ----- \\
let animationLoop = () => {
	updateCanvas();
	updateParticles();
	requestAnimationFrame(animationLoop);}

// ----- | Push new particles | ----- \\
pushNewParticles();
// ----- | Initialize loop | ----- \\
animationLoop();