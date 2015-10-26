function isTouchDevice() {
    var msTouchEnabled = window.navigator.msMaxTouchPoints;
    var generalTouchEnabled = "ontouchstart" in document.createElement("div");
 
    if (msTouchEnabled || generalTouchEnabled) {
        return true;
    }
    return false;
}

var isTouchEnabled=isTouchDevice(),frame,theCanvas;
window.addEventListener('load', eventWindowLoaded, false);
(function () {
  function CustomEvent ( event, params ) {
	params = params || { bubbles: false, cancelable: false, detail: undefined };
	var evt = document.createEvent( 'CustomEvent' );
	evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
	return evt;
   };
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();
function eventWindowLoaded() {
 looper = false;
 theCanvas = document.getElementById('canvasOne');
 context = theCanvas.getContext('2d');
 context.fillStyle = '#EEEEEE';
 context.fillRect(0, 0, theCanvas.width, theCanvas.height);
 //Box
 context.strokeStyle = '#000000';
 context.strokeRect(1,  1, theCanvas.width-2, theCanvas.height-2);
 function onImagesLoaded(e)
 {
 
  blueBallImg = imgLoader.getImageAtIndex(0);
  redBallImg = imgLoader.getImageAtIndex(1);
  StageImg = imgLoader.getImageAtIndex(2);
  //getStart();
  //runExample();
  showPopup();
 }
 imgLoader = new BulkImageLoader();
 imgLoader.addImage("Image/blueBall.png", "blueBall");
 imgLoader.addImage("Image/redBall.png", "redBall");
 imgLoader.addImage("Image/bg.png", "stage");
 imgLoader.onReadyCallback = onImagesLoaded;
 imgLoader.loadImages();
 startUp();
 theCanvas.onmousedown=mousedown;
 theCanvas.addEventListener("touchstart",mousedown);
 document.onmouseup=mouseup;
 document.addEventListener("touchend",mouseup);
 theCanvas.addEventListener("oponentChance",function(e){
 hitTheBall();
});
theCanvas.addEventListener("go",function(e){
 tempSpeed=(presentBall.dist/10);
 if(tempSpeed>maxSpeed) tempSpeed=maxSpeed;
 var index=e.detail.index;
 tempAngle = findAngle( balls[index].y-e.detail.originalEvent.offsetY,
balls[index].x-e.detail.originalEvent.offsetX );//Math.floor(Math.random()*360);
 tempRadians = tempAngle; //* Math.PI/ 180;
 tempAngle=tempAngle*(180/Math.PI);
 tempvelocityx = Math.cos(tempRadians) * tempSpeed;
 tempvelocityy = Math.sin(tempRadians) * tempSpeed;
 tempX = balls[index].x;//tempRadius*3 +
 type=balls[index].type;
(Math.floor(Math.random()*theCanvas.width)-tempRadius*3);
 tempY = balls[index].y;//tempRadius*3 +
(Math.floor(Math.random()*theCanvas.height)-tempRadius*3);
 balls[index] = {x:tempX,y:tempY,radius:tempRadius, speed:tempSpeed,
angle:tempAngle, velocityx:tempvelocityx, velocityy:tempvelocityy, mass:tempRadius*8, nextx:
tempX, nexty:tempY,type:type};
hitCount++;
},false);
}
function runExample(evt) {
  //removeEventHandler(theCanvas,evt,letsPlay);
  // clearTimeout(looper);
   canvasApp();
}
function removeEventHandler(elem,eventType,handler) {
 if (elem.removeEventListener) 
    elem.removeEventListener (eventType,handler,false);
 if (elem.detachEvent)
    elem.detachEvent ('on'+eventType,handler); 
}
function getStart(){
theCanvas.width=320;
theCanvas.height=480;
//context.fillStyle = '#EEEEEE';
 context.fillRect(0, 0, theCanvas.width, theCanvas.height);
 //Box
 //context.strokeStyle = '#000000';
 context.strokeRect(1,  1, theCanvas.width-2, theCanvas.height-2);
  context.fillRect(10,50,100,75);


context.beginPath();
context.rect(50,50,100,50);
context.fillStyle="yellow";
context.fill();
context.strokeStyle="red";
context.fillStyle="red";
context.font = '40pt Calibri';
context.fillText("play",50,90);
context.stroke();

theCanvas.addEventListener("touchstart",letsPlay);
theCanvas.addEventListener("mousedown",letsPlay);

}
function letsPlay(event){
event.preventDefault();
 var x,y,evt,scale = POP.currentWidth / POP.WIDTH;
if(isTouchEnabled){
  
   x=(event.touches[0].pageX-theCanvas.offsetLeft)/scale;
   y=(event.touches[0].pageY-theCanvas.offsetTop)/scale;
   evt="touchstart";
     
}else{
  x = event.pageX!=undefined?event.pageX:(event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
  y = event.pageY!=undefined?event.pageY:(event.clientY + document.body.scrollTop + document.documentElement.scrollTop);
  x = (x-theCanvas.offsetLeft)/scale;
  y = (y-theCanvas.offsetTop)/scale;
  evt="mousedown";
}

  if(x > 50 && y > 50 && x < 150 && y < 100){
 
    runExample(evt);
  }

}
function canvasSupport () {
 return true;
}
var canvasApp=function(){};

 
  function  drawScreen () {
 context.fillStyle = '#EEEEEE';
 context.fillRect(0, 0, theCanvas.width, theCanvas.height);
 //Box
 context.strokeStyle = '#000000';
 context.strokeRect(1,  1, theCanvas.width-2, theCanvas.height-2);
 update();
 testWalls();
 collide();
 render();
}
function update() {
 for (var i =0; i <balls.length; i++) {
 ball = balls[i];
 //Friction
  if(!(Math.abs(ball.velocityy)<minSpeed&&Math.abs(ball.velocityx)<minSpeed )){
   ball.velocityx = ball.velocityx - ( ball.velocityx*friction);
   ball.velocityy = ball.velocityy - ( ball.velocityy*friction); 
   idle_flag=false;
  }else{
  ball.velocityx=0;
  ball.velocityy=0;
  }
  ball.nextx = (ball.x += ball.velocityx);
  ball.nexty = (ball.y += ball.velocityy);
 }

 
}
function testWalls() {
   var ball;
   var testBall;
  
   for (var i =0; i <balls.length; i++) {
	ball = balls[i];
	
	if((ball.nextx+ball.radius > theCanvas.width-theCanvas.score_width)||(ball.nextx-ball.radius < 0 )||(ball.nexty+ball.radius > theCanvas.height ) ||(ball.nexty-ball.radius < 0)){
    var removedBall=balls.splice(i,1);
    if(removedBall[0].type=="red"){
     blueMenScore+=100;
    
    }else{
     redMenScore+=100;
     
    }
	}
  }
}
function render() {

context.drawImage(StageImg,0,0,theCanvas.width,theCanvas.height);
 var ball;
 
 context.fillStyle = "#000000";
 for (var i =0; i <balls.length; i++) {
 ball = balls[i];
 if(ball.nextx){
 ball.x = ball.nextx;
 ball.y = ball.nexty;
 }
 var balltoload;
 if(ball.type=="red"){
  balltoload=redBallImg;
 }else{
  balltoload=blueBallImg;
 }
 context.drawImage(balltoload,ball.x-ball.radius,ball.y-ball.radius);
 }
 if(line){
  drawLineArrow(line.fromX,line.fromY,line.toX,line.toY);
 }
 if( idle_flag ){
 	var flag=hasBothBall();
  if( flag && hitCount%2 ){
   var myEvent = new CustomEvent("oponentChance", {
   detail: presentBall
   });
   theCanvas.dispatchEvent(myEvent);  
  }else if(!flag){
    //initialize();
    showPopup();
  //console.log(balls[0].type+" team won game");
  }
 }else{
  
 }updateScore();
 idle_flag=true;
 //document.getElementById("red").innerHTML=redMenScore;
 //document.getElementById("blue").innerHTML=blueMenScore;
}
 var showPopup=function(){

	  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame;
	  cancelAnimationFrame(frame);
	  var popupele=document.getElementsByClassName("popup");
	  var btns=document.getElementsByTagName("button");
	  while(btns.length){
	  
		btns[btns.length-1].remove();
	  }
	  
	  //btns.remove();
	  if(!level){
			var play=document.createElement('img');
			play.value="Play";
			//play.textContent="Play";
			play.className="play";
			play.src="Image/play.png"
			play.addEventListener("touchstart",initialize);
			play.onclick=initialize;
			var Help=document.createElement('img');
			Help.value="Help";
			//Help.textContent="Help";
			Help.className="help";
			Help.src="Image/help.png"
			popupele[0].appendChild(play);
			popupele[0].appendChild(Help);
			
	  }else{
			
			var play=document.createElement('img');
			play.value="Play";
			play.textContent="Go for next level";
			play.onclick=initialize;
			popupele[0].appendChild(play);			
	  }
	  level++;
	  document.getElementsByClassName("popup")[0].style.display="block";
}
function updateScore(){
  //console.log("score have to update");

context.beginPath();
context.moveTo(theCanvas.width-theCanvas.score_width,0);
context.lineTo(theCanvas.width-theCanvas.score_width,theCanvas.height);
//context.rect(50,50,100,50);

//context.fillStyle="yellow";
//context.fill();
context.strokeStyle="red";
//context.fillStyle="red";
//context.font = '7pt Calibri';
//context.fillText("Computer",theCanvas.width-theCanvas.score_width,90);
//context.fillText(redMenScore,theCanvas.width-theCanvas.score_width,100);
context.stroke();

context.beginPath();
//context.rect(50,50,100,50);
//context.fillStyle="yellow";
//context.fill();
//context.strokeStyle="red";
//context.fillStyle="red";
context.font = '7pt Calibri';
context.fillText("Computer",theCanvas.width-theCanvas.score_width+10,90);
context.fillText(redMenScore,theCanvas.width-theCanvas.score_width+10,100);
context.stroke();

context.beginPath();
//context.rect(50,50,100,50);
//context.fillStyle="yellow";
//context.fill();
//context.strokeStyle="red";
//context.fillStyle="red";
context.font = '7pt Calibri';
context.fillText("Your's",theCanvas.width-theCanvas.score_width+10,290);
context.fillText(blueMenScore,theCanvas.width-theCanvas.score_width+10,300);
context.stroke();

}
function collide() {
 var ball;
 var testBall;
 for (var i =0; i <balls.length; i++) {
  ball = balls[i];
  for (var j = i+1; j < balls.length; j++) {
   testBall = balls[j];
   if (hitTestCircle(ball,testBall)) {
   collideBalls(ball,testBall);
   }
  }
 }
}
function hitTestCircle(ball1,ball2) {
 var retval = false;
 var dx = ball1.nextx - ball2.nextx;
 var dy = ball1.nexty - ball2.nexty;
 var distance = (dx * dx + dy * dy);
 if (distance <= (ball1.radius + ball2.radius) * (ball1.radius + ball2.radius) ) {
 retval = true;
 }
 return retval;
}
function collideBalls(ball1,ball2) {
 hitSound.play();
 var dx = ball1.nextx - ball2.nextx;
 var dy = ball1.nexty - ball2.nexty;
 
 var collisionAngle = Math.atan2(dy, dx);
 
 var speed1 = Math.sqrt(ball1.velocityx * ball1.velocityx + ball1.velocityy * ball1.velocityy);
 var speed2 = Math.sqrt(ball2.velocityx * ball2.velocityx + ball2.velocityy * ball2.velocityy);
 
 var direction1 = Math.atan2(ball1.velocityy, ball1.velocityx);
 var direction2 = Math.atan2(ball2.velocityy, ball2.velocityx);
 
 var velocityx_1 = speed1 * Math.cos(direction1 - collisionAngle);
 var velocityy_1 = speed1 * Math.sin(direction1 - collisionAngle);
 var velocityx_2 = speed2 * Math.cos(direction2 - collisionAngle);
 var velocityy_2 = speed2 * Math.sin(direction2 - collisionAngle);
 
 var final_velocityx_1 = ((ball1.mass - ball2.mass) * velocityx_1 + (ball2.mass +
ball2.mass) * velocityx_2)/(ball1.mass + ball2.mass);
 var final_velocityx_2 = ((ball1.mass + ball1.mass) * velocityx_1 + (ball2.mass -
ball1.mass) * velocityx_2)/(ball1.mass + ball2.mass);
 
 var final_velocityy_1 = velocityy_1;
 var final_velocityy_2 = velocityy_2;
 
 ball1.velocityx = Math.cos(collisionAngle) * final_velocityx_1 + Math.cos(collisionAngle +
Math.PI/2) * final_velocityy_1;
 ball1.velocityy = Math.sin(collisionAngle) * final_velocityx_1 + Math.sin(collisionAngle +
Math.PI/2) * final_velocityy_1;
 ball2.velocityx = Math.cos(collisionAngle) * final_velocityx_2 + Math.cos(collisionAngle +
Math.PI/2) * final_velocityy_2;
 ball2.velocityy = Math.sin(collisionAngle) * final_velocityx_2 + Math.sin(collisionAngle +
Math.PI/2) * final_velocityy_2;
 
 ball1.nextx = (ball1.nextx += ball1.velocityx);
 ball1.nexty = (ball1.nexty += ball1.velocityy);
 ball2.nextx = (ball2.nextx += ball2.velocityx);
 ball2.nexty = (ball2.nexty += ball2.velocityy);
}
var arrow = [
	[ 2, 0 ],
	[ -10, -4 ],
	[ -10, 4]
];
function drawLineArrow(x1,y1,x2,y2) {
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineTo(x2,y2);
	context.stroke();
	var ang = Math.atan2(y2-y1,x2-x1);
	drawFilledPolygon(translateShape(rotateShape(arrow,ang),x2,y2));
};
function drawFilledPolygon(shape) {
	context.beginPath();
	context.moveTo(shape[0][0],shape[0][1]);
	for(p in shape)
    	if (p > 0) context.lineTo(shape[p][0],shape[p][1]);
	context.lineTo(shape[0][0],shape[0][1]);
	context.fill();
};
function translateShape(shape,x,y) {
	var rv = [];
	for(p in shape)
    	rv.push([ shape[p][0] + x, shape[p][1] + y ]);
	return rv;
};
function rotateShape(shape,ang) {
	var rv = [];
	for(p in shape)
    	rv.push(rotatePoint(ang,shape[p][0],shape[p][1]));
	return rv;
};
function rotatePoint(ang,x,y) {
	return [
    	(x * Math.cos(ang)) - (y * Math.sin(ang)),
    	(x * Math.sin(ang)) + (y * Math.cos(ang))
	];
};
function startUp(){
	theCanvas.width=320;
	theCanvas.score_width=60;
	theCanvas.height=480;
}
var numBalls = 12 ;
var maxSize = 30;
var minSize = 3;
var maxSpeed =10;// maxSize+5;
var minSpeed=0.5;
var balls = new Array();
var idle_flag=true;
var hitCount=0;
var line={};
var tempBall;
var tempX;
var tempY;
var tempSpeed;
var tempAngle;
var tempRadius=12;
var tempRadians;
var tempvelocityx;
var tempvelocityy;
var friction = .01;
var blueMenScore=0,redMenScore=0;
var imgLoader;
var numRedBalls=6;
var numBlueBalls=6;
var marginX=20;
var marginY=70;
var ballGap=10;
var presentBall={};
var drag_flag=false;
var mouse_moved=false;
var type;
var level=0;
//var isTouchEnabled=isTouchDevice();
//getStart();
//initialize();

function initialize(){

  document.getElementsByClassName("popup")[0].style.display="none";
  levelSound.play();
  balls=[];
  redX=marginX,redY=marginY,blueX=marginX,blueY=theCanvas.height-marginY;
  for (var i = 0; i < numBalls; i++) {
   if( i < numRedBalls ){
	tempX = redX;
	tempY = redY;
	redX+=((tempRadius*2)+ballGap);
	type="red";
   }else{
	tempX=blueX;
	tempY=blueY;
	blueX+=((tempRadius*2)+ballGap);
	type="blue";
   }
  
   tempBall = {x:tempX,y:tempY,radius:tempRadius, speed:0, angle:0, velocityx:0,
   velocityy:0, mass:tempRadius*8, nextx: tempX, nexty:tempY,type:type};
   balls.push(tempBall);
  }
  gameLoop();
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function hasBothBall( ){
  var redObj=balls.filter(function(obj){
  return obj.type=="red";
  });
  var blueObj=balls.filter(function(obj){
  return obj.type=="blue";
  });
 return (redObj.length && blueObj.length);
}
function hitTheBall(){
  tempSpeed=maxSpeed;
  var target_index,source_index;
  while(true){
  target_index=getRandomInt(0,balls.length-1);
  if(balls[target_index].type=="blue") break;
  }
  while(true){
  source_index=getRandomInt(0,balls.length-1);
  if(balls[source_index].type=="red") break;
  } 
  tempAngle = findAngle( balls[target_index].y-balls[source_index].y,
  balls[target_index].x-balls[source_index].x );//Math.floor(Math.random()*360);
  tempRadians = tempAngle; //* Math.PI/ 180;
  tempAngle=tempAngle*(180/Math.PI);
  tempvelocityx = Math.cos(tempRadians) * tempSpeed;
  tempvelocityy = Math.sin(tempRadians) * tempSpeed;
  tempX = balls[source_index].x;//tempRadius*3 +
  type=balls[source_index].type;
 (Math.floor(Math.random()*theCanvas.width)-tempRadius*3);
  tempY = balls[source_index].y;//tempRadius*3 +
 (Math.floor(Math.random()*theCanvas.height)-tempRadius*3);
  balls[source_index] = {x:tempX,y:tempY,radius:tempRadius, speed:tempSpeed,
 angle:tempAngle, velocityx:tempvelocityx, velocityy:tempvelocityy, mass:tempRadius*8, nextx:
 tempX, nexty:tempY,type:type};
 hitCount++;
}

function mousedown(event){
 event.preventDefault();
 for(var i=0;i<balls.length;i++){
  if(isPointInTheCircle()){
  drag_flag=true;
  presentBall=balls[i];
  presentBall.index=i;
  }
 }
 function isPointInTheCircle(){
  
 return ( balls[i].type=="blue" && balls[i].radius >= getDistance() ) ? true:false;
 }
 function getDistance(){
  var x,y,scale = POP.currentWidth / POP.WIDTH;
 
 if(isTouchEnabled){
   x=(event.touches[0].pageX-theCanvas.offsetLeft)/scale;
   y=(event.touches[0].pageY-theCanvas.offsetTop)/scale;  
 }else{
   x = event.pageX?event.pageX:(event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
   y = event.pageY?event.pageY:(event.clientY + document.body.scrollTop + document.documentElement.scrollTop);
   x = (x-theCanvas.offsetLeft)/scale;
   y = (y-theCanvas.offsetTop)/scale;  
 }

 var diff_x=x-balls[i].x;
 var diff_y=y-balls[i].y;
 return Math.sqrt((diff_x*diff_x)+(diff_y*diff_y));
 }
};

function mouseup(event){
  event.preventDefault();

 if(drag_flag && mouse_moved){
 drag_flag=false;
 mouse_moved=false;
 line={};

 drawScreen();

	var x,y,scale = POP.currentWidth / POP.WIDTH;
 
 if(isTouchEnabled){
   x=(event.changedTouches[0].pageX-theCanvas.offsetLeft)/scale;
   y=(event.changedTouches[0].pageY-theCanvas.offsetTop)/scale;
 }else{
   x = event.pageX!=undefined?event.pageX:(event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
   y = event.pageY!=undefined?event.pageY:(event.clientY + document.body.scrollTop + document.documentElement.scrollTop);
   x = (x-theCanvas.offsetLeft)/scale;
   y = (y-theCanvas.offsetTop)/scale;
 }
 presentBall.originalEvent={"offsetX":x,"offsetY":y};
 var myEvent = new CustomEvent("go", {
 detail: presentBall
 });
 theCanvas.dispatchEvent(myEvent);
 }
}


function findAngle(dy, dx) {
 var angle = Math.atan2(dy, dx);
 return angle;
}
document.onmousemove=mousemove;
document.addEventListener("touchmove",mousemove);
function mousemove(event){
   event.preventDefault();
 // drag_flag=true;
 if(drag_flag){  
  context.clearRect ( 0 , 0 , theCanvas.width , theCanvas.height );
  drawScreen();
  drawLine(event);
  mouse_moved=true;
 }
}
function drawLine(event){
  line.fromX=presentBall.x;
  line.fromY=presentBall.y;
var x,y,scale = POP.currentWidth / POP.WIDTH;
if(isTouchEnabled){
 x=(event.touches[0].pageX-theCanvas.offsetLeft)/scale;
 y=(event.touches[0].pageY-theCanvas.offsetTop)/scale;  
}else{
  x = event.pageX!=undefined?event.pageX:(event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
  y = event.pageY!=undefined?event.pageY:(event.clientY + document.body.scrollTop + document.documentElement.scrollTop);
  x = (x-theCanvas.offsetLeft)/scale;
  y = (y-theCanvas.offsetTop)/scale;
}
  var tempx=presentBall.x-(x-presentBall.x),tempy=presentBall.y-(y-presentBall.y);
  presentBall.dist=getDist(line.fromX-tempx,line.fromY-tempy);
  /*if(presentBall.dist > 100){
   var dist=100,m=findAngle(tempx-line.fromX,tempy-line.fromY);
   line.toX=(dist/(Math.sqrt(1+Math.pow(m,2))))+line.fromX;
   line.toY=((dist*m)/(Math.sqrt(1+Math.pow(m,2))))+line.fromY;
  }else{*/
   line.toX=tempx;
   line.toY=tempy;
  //}
}
function getDist(diff_x,diff_y){
 return Math.sqrt((diff_x*diff_x)+(diff_y*diff_y));
}
function canStartHere(ball) {
 var retval = true;
 for (var i =0; i <balls.length; i++) {
 if (hitTestCircle(ball, balls[i])) {
 retval = false;
 }
 }
 return retval;
}
function gameLoop() {
	reqAnimFrame = window.mozRequestAnimationFrame	||
               	window.webkitRequestAnimationFrame ||
               	window.msRequestAnimationFrame 	||
               	window.oRequestAnimationFrame
               	;
	frame=reqAnimFrame(gameLoop);
	drawScreen();
}
//gameLoop();

//ending
// namespace our game
var POP = {

    // set up some initial values
    WIDTH: 320, 
    HEIGHT:  480, 
    // we'll set the rest of these
    // in the init function
    RATIO:  null,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,

    init: function() {

        // the proportion of width to height
        POP.RATIO = POP.WIDTH / POP.HEIGHT;
        // these will change when the screen is resized
        POP.currentWidth = POP.WIDTH;
        POP.currentHeight = POP.HEIGHT;
        // this is our canvas element
        POP.canvas = document.getElementsByTagName('canvas')[0];
        // setting this is important
        // otherwise the browser will
        // default to 320 x 200
        POP.canvas.width = POP.WIDTH;
        POP.canvas.height = POP.HEIGHT;
        // the canvas context enables us to 
        // interact with the canvas api
        POP.ctx = POP.canvas.getContext('2d');
        // we need to sniff out Android and iOS
        // so that we can hide the address bar in
        // our resize function
        POP.ua = navigator.userAgent.toLowerCase();
        POP.android = POP.ua.indexOf('android') > -1 ? true : false;
        POP.ios = ( POP.ua.indexOf('iphone') > -1 || POP.ua.indexOf('ipad') > -1  ) ? 
            true : false
        // we're ready to resize
        POP.resize();

    },

    resize: function() {

        POP.currentHeight = window.innerHeight;
        // resize the width in proportion
        // to the new height
        POP.currentWidth = POP.currentHeight * POP.RATIO;

        // this will create some extra space on the
        // page, allowing us to scroll past
        // the address bar, thus hiding it.
        if (POP.android || POP.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }

        // set the new canvas style width and height
        // note: our canvas is still 320 x 480, but
        // we're essentially scaling it with CSS
        POP.canvas.style.width = POP.currentWidth + 'px';
        POP.canvas.style.height = POP.currentHeight + 'px';

        // we use a timeout here because some mobile
        // browsers don't fire if there is not
        // a short delay
        window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);
    }

};

window.addEventListener('load', POP.init, false);
window.addEventListener('resize', POP.resize, false);