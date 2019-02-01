	
var canvas, c, time, bubbles = {}, bubbleIndex = 0, bubbleNum = 0;
var amountRed = 255, amountGreen = 255, amountBlue = 255, amountRadius = 5;
var controlNumber = 1, emitter = false;
var emmitionIndex = 0, emmitions = {}, emmitionAmount = 15;
var scatterIndex = 0, scatters = {};
document.onkeydown = checkKey;

function init() {
  canvas = document.getElementById("gameCanvas");
  c = canvas.getContext("2d");
  setInterval(draw, 18);
  canvas.addEventListener("click", getClickPosition, false);
  document.getElementById( "gameCanvas" ).onmousedown = function(event){
    event.preventDefault();
  };}
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38' && emitter === true) {
        emitter = false;}
    else if (e.keyCode == '38' && emitter === false){
        emitter = true;}}

// --- CONSTRUCTOR --- //

	function Scatter(x,y,r) {
		this.x = x;
		this.y = y;
		this.vx = Math.random()*5-2.5;
	  	this.vy = Math.random()*5-2.5;
	  	this.radius = r + r;
	  	scatterIndex++;
	  	scatters[scatterIndex] = this;
	  	this.id = scatterIndex;
	  	this.life = 0;
	  	this.maxLife = 50;}
	function Emmition(x,y,vx,vy,r) {
		this.x = x;
		this.y = y;
		this.vx = vx;
	  	this.vy = vy;
	  	this.radius = r * 0.66;
	  	this.cRed = 255; this.cGreen = 165; this.cBlue = 0;
	  	this.color = 'rgb('+ this.cRed +','+ this.cGreen + ',' + this.cBlue +')';
	  	emmitionIndex++;
	  	emmitions[emmitionIndex] = this;
	  	this.id = emmitionIndex;
	  	this.life = 0;
	  	this.maxLife = 300;}
	function Bubble() {
	    this.x = Math.random()*(canvas.width);
	    this.y = Math.random()*(canvas.height);
	    this.vx = Math.random() * 2 - 1;
	    this.vy = Math.random() * 2 - 1;
	    this.radius = Math.random() * 25 + 8;
	    bubbleIndex++;
	    bubbles[bubbleIndex] = this;
	    this.id = bubbleIndex;
	    this.color = 'rgb('+amountRed+','+amountGreen+','+amountBlue+')';}


// --- DRAW --- //

	Bubble.prototype.draw = function() {
	    c.beginPath();
	    c.arc(this.x, this.y, this.radius -0.5, 0, 2 * Math.PI, false);
	    c.fillStyle = this.color;
	    c.fill();
	    c.strokeStyle = '#ccc';
	    c.lineWidth = '5';
	    c.stroke();
	    this.x += this.vx;
	    this.y += this.vy;};
	Emmition.prototype.draw = function() {
		if (this.life > this.maxLife || this.radius < 0 || this.red < 5) {
			delete emmitions[this.id];}
		else {
			c.beginPath();
	    	c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
	    	c.fillStyle = this.color;
	    	c.fill();
	    	this.color = 'rgb('+ this.cRed + ',' + this.cGreen + ',' + this.cBlue +')';
	    	this.radius *= 0.995;
	  	  	this.vy *=0.99; this.vx *= 0.99;
	    	this.x += this.vx;
	    	this.y += this.vy;
			this.life++;
			if (this.cGreen < 5) {
				this.cRed -= 2;
				this.cGreen = 0;}
			else {
				this.cGreen -= 2;}}};
	Scatter.prototype.draw = function() {
		if (this.life > this.maxLife || this.radius < 0.2) {
			delete scatters[this.id];}
		else {
			c.beginPath();
	    	c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
	    	c.fillStyle = 'rgb(75,250,150)';
	    	c.fill();
	    	this.radius *= 0.92;
	    	this.x += this.vx;
	    	this.y += this.vy;}};


// --- COLLISION --- //

	Bubble.prototype.checkCollision = function() {
	  for (let j in bubbles) {
	    if (bubbles[j].id != this.id) {
	      var dx = bubbles[j].x - this.x;
	      var dy = bubbles[j].y - this.y;
	      var trueDis = Math.sqrt(dx * dx + dy * dy);
	      var minDis = bubbles[j].radius + this.radius;
	      if (trueDis < minDis) {
	        var v = Math.atan2(dy, dx);
	        spread = minDis - trueDis;
	        ax = spread * Math.cos(v);
	        ay = spread * Math.sin(v);
	        this.x -= ax;
	        this.y -= ay;            
	        this.vx -= Math.cos(v) ;
	        this.vy -= Math.sin(v);
	        bubbles[j].vx += Math.cos(v);
	        bubbles[j].vy += Math.sin(v);}}}}
	Bubble.prototype.canvasCollision = function() {
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {this.vx = -this.vx;}
	    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {this.vy = -this.vy;}
	    if (this.x + this.radius > canvas.width +3) {this.x = canvas.width - this.radius;}
	    if (this.x - this.radius < 0) {this.x = this.radius ;}
	    if (this.y + this.radius > canvas.height +3) {this.y = canvas.height - this.radius;}
	    if (this.y - this.radius < 0) {this.y = this.radius;}}
	Emmition.prototype.checkCollision = function() {
		for (let j in bubbles) {
		   let bj = bubbles[j];
		   let bjr = bj.radius;
		   var dx = bj.x - this.x;
		   var dy = bj.y - this.y;
		   var trueDis = Math.sqrt(dx * dx + dy * dy);
		   var minDis = bjr + this.radius;
		   if (trueDis < minDis) {
	    	  new Emmition(bj.x, bj.y, 5, 5, bjr);
	    	  new Emmition(bj.x, bj.y, -5, 5, bjr);
	    	  new Emmition(bj.x, bj.y, 5, -5, bjr);
	    	  new Emmition(bj.x, bj.y, -5, -5, bjr);
	    	  new Emmition(bj.x, bj.y, 7.5, 0, bjr);
	    	  new Emmition(bj.x, bj.y, 0, 7.5, bjr);
	    	  new Emmition(bj.x, bj.y, -7.5, 0, bjr);
	    	  new Emmition(bj.x, bj.y, 0, -7.5, bjr);
	    	  for (let i=0; i<bjr; i++) {
			     new Scatter(bj.x,bj.y,bjr);}
	    	  if (bjr > 22) {
	    	  	let audio = new Audio('ExplosionXl.wav');
	    	  	audio.play();}
	    	  else if (bjr > 18) {
	    	  	let audio = new Audio('ExplosionXlLarge.wav');
	    	  	audio.play();}
	    	  else if (bjr > 16) {
	    	  	let audio = new Audio('ExplosionLarge.wav');
	    	  	audio.play();}
	    	  else if (bjr > 14) {
	    	  	let audio = new Audio('ExplosionLargeMed.wav');
	    	  	audio.play();}
	    	  else if (bjr > 12) {
	    	  	let audio = new Audio('ExplosionMed.wav');
	    	  	audio.play();}
	    	  else if (bjr > 10) {
	    	  	let audio = new Audio('ExplosionMedSmall.wav');
	    	  	audio.play();}
	    	  else {
	    	 	let audio = new Audio('ExplosionSmall.wav');
	    	 	audio.play();}
			  delete bubbles[j];}}}


// --- DRAW --- //

	function draw(){
	    canvas.width = window.innerWidth - 2;
	    canvas.height = window.innerHeight -2;
	    c.globalCompositeOperation = "source-over";
	    c.fillStyle = 'rgba(0,0,0,1)';
	    c.fillRect(0, 0, canvas.width, canvas.height);
	    if (emitter === true) {
	    	new Bubble();
	  	    emitter = false;}
	    c.globalCompositeOperation = "lighter";
	    for (let i in bubbles){
	  	    bubbles[i].canvasCollision();
	  	    bubbles[i].checkCollision();
	        bubbles[i].draw();}
	    for (let i in emmitions){
	    	emmitions[i].checkCollision();
	  	    emmitions[i].draw();}
	    for (let i in scatters){
	    	scatters[i].draw();}}


// --- CONTROLS --- //

	function addBubble() {
	  if (bubbleNum === 0) {
	  	bubbleNum++;}
	  for (let i=0; i<bubbleNum; i++) {
	  	new Bubble();}}
	function subBubble() {
	  for (let i in bubbles) {
		delete bubbles[i];}}
	function toggleControls() {
	  if (controlNumber%2 === 0) {
	  	document.getElementById('canvasInterface').style.opacity = '0';
	  	document.getElementById('controlBTN').style.opacity = '0.5';
	  	document.getElementById('controlOPACITY').style.opacity = '0';
	  	document.getElementById('canvasInterface').style.left = '-250px';
	  	controlNumber++;}
	  else {
	  	document.getElementById('canvasInterface').style.opacity = '1';
	  	document.getElementById('controlBTN').style.opacity = '1';
	  	document.getElementById('controlOPACITY').style.opacity = '1';
	  	document.getElementById('canvasInterface').style.left = '0px';
	  	document.getElementById('controlOPACITY').style.left = '0px';
	  	controlNumber--;}}
	function toggleOpacity() {
	  	document.getElementById('canvasInterface').style.opacity = '0.2';
	  	document.getElementById('controlBTN').style.opacity = '0.5';
	  	document.getElementById('controlOPACITY').style.opacity = '0';
	  	document.getElementById('controlOPACITY').style.left = '-250px';
	  	controlNumber++;}


// --- CLICK POSITION --- //

	function getClickPosition(e) {
	var rect = canvas.getBoundingClientRect();
	let currPos = {x: e.clientX - rect.left, y: e.clientY - rect.top};
	for (let i in bubbles) {
		let rad = Math.round(bubbles[i].radius);
	    let len = Math.sqrt(Math.pow(currPos.x - bubbles[i].x, 2) + Math.pow(currPos.y - bubbles[i].y, 2));
	    let activeArea = len - bubbles[i].radius;
	    if (activeArea < 0) {
	    	new Emmition(currPos.x, currPos.y, 5,5, rad);
	    	new Emmition(currPos.x, currPos.y, -5,5, rad);
	    	new Emmition(currPos.x, currPos.y, 5,-5, rad);
	    	new Emmition(currPos.x, currPos.y, -5,-5, rad);
	    	new Emmition(currPos.x, currPos.y, 7.5,0, rad);
	    	new Emmition(currPos.x, currPos.y, 0,7.5, rad);
	    	new Emmition(currPos.x, currPos.y, 0,-7.5, rad);
	    	new Emmition(currPos.x, currPos.y, -7.5,0, rad);
	    	for (let j=0; j<rad; j++) {
			    new Scatter(currPos.x,currPos.y,rad);}
	        if (rad > 22) {
    	  	  let audio = new Audio('ExplosionXl.wav');
    	  	  audio.play();}
	    	else if (rad > 18) {
	    	  let audio = new Audio('ExplosionXlLarge.wav');
	    	  audio.play();}
	    	else if (rad > 16) {
	    	  let audio = new Audio('ExplosionLarge.wav');
	    	  audio.play();}
	    	else if (rad > 14) {
	    	  let audio = new Audio('ExplosionLargeMed.wav');
	    	  audio.play();}
	    	else if (rad > 12) {
	    	  let audio = new Audio('ExplosionMed.wav');
	    	  audio.play();}
	    	else if (rad > 10) {
	    	  let audio = new Audio('ExplosionMedSmall.wav');
	    	  audio.play();}
	    	else {
	    	  let audio = new Audio('ExplosionSmall.wav');
	    	  audio.play();}
			delete bubbles[i];}}}


function play() {
	let x = document.getElementById('atom').style;
	let y = document.getElementById('how_to_play').style;
	x.opacity = y.opacity = '0';
	x.display = y.display = 'hidden';
	x.zIndex = y.zIndex = '-1';
	document.getElementById('gameCanvas').style.opacity = '1';
	document.getElementById('gameCanvas').style.zIndex = '10000';
	for (let i=0; i<15; i++) {
		new Bubble();}}
function instructions() {
	let x = document.getElementById('atom').style;
	x.left = '10vw';
	x.opacity = '0';
	x.transitionDelay = '0s';
	let z = document.getElementById('how_to_play').style;
	z.opacity = '1';
	z.display = 'block';
	z.zIndex = '5';
	z.left = '0';
	z.transitionDelay = '0.8s';}