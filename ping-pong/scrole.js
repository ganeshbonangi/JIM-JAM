
window.addEventListener('load', eventWindowLoaded, false);
//$("#run_stop").html("Run the example!");
drawexample = true;//false;
/*
function toggleExample () {
  if (drawexample === false) {
    drawexample = true;
    $("#run_stop").html("Stop the example!");
  } else {
    drawexample = false;
    $("#run_stop").html("Run the example!");
  }
}*/

function eventWindowLoaded() {
     theCanvas = document.getElementById('canvasOne');
	context = theCanvas.getContext('2d');
  	context.fillStyle = '#EEEEEE';
	context.fillRect(0, 0, theCanvas.width, theCanvas.height);
	//Box
	context.strokeStyle = '#000000'; 
	context.strokeRect(1,  1, theCanvas.width-2, theCanvas.height-2);
    canvasApp();
}

function canvasSupport () {
  	return Modernizr.canvas;
}

function canvasApp() {
	
  /*if (!canvasSupport()) {
			 return;
  		}
	*/
  function  drawScreen () {
		context.fillStyle = '#EEEEEE';
		context.fillRect(0, 0, theCanvas.width, theCanvas.height);
		//Box
		context.strokeStyle = '#000000'; 
		context.strokeRect(1,  1, theCanvas.width-2, theCanvas.height-2);
		ball.x += xunits;
		ball.y += yunits;
		context.fillStyle = "#000000";
		context.beginPath();
		context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
		context.closePath();
		context.fill();
		
		context.beginPath();
      	context.rect(bat.x, bat.y, bat.width, bat.height);
	    context.fillStyle = bat.color;
	    context.fill();
	    context.lineWidth = 1;
	    context.strokeStyle = bat.color;
	    context.stroke();


		if ((ball.x+ball.radius) > theCanvas.width || (ball.x-ball.radius) < 0 ) {/*case for right left sides*/
			angle = 180 - angle;
		} else if ((ball.y-ball.radius) < 0) {/*case for top*/
			angle = 360 - angle;
		}else if(bat.x < ball.x && bat.x+bat.width > ball.x && bat.y < ball.y+ball.radius && bat.y+10 > ball.y+ball.radius){/*bat hit*/
			angle = 360 - angle;
		}else if(ball.y > theCanvas.height){/*case for dip*/
			ball.y=15;
			angle = 360 - angle;
		}
		updateBall(); 
  			
	}
	
	function updateBall() {
		radians = angle * Math.PI/ 180;
		xunits = Math.cos(radians) * speed;
		yunits = Math.sin(radians) * speed;
	}
	
	var speed = 4;
	var p1 = {x:20,y:20};
	var angle = 35;
	var radians =0;
	var xunits = 0;
	var yunits = 0; 
	var ball = {x:p1.x, y:p1.y,radius:10};
	var bat = {x:100,y:400,width:75,height:10,color:"black"};
	var isTouchEnabled=isTouchDevice();
	updateBall();
	
	function gameLoop() {

		reqAnimFrame = window.mozRequestAnimationFrame	||
               	window.webkitRequestAnimationFrame ||
               	window.msRequestAnimationFrame 	||
               	window.oRequestAnimationFrame || requestAnimationFrame;
			reqAnimFrame(gameLoop);
      if (drawexample === true) {
			drawScreen();
      }
	}
	POP.init();
	gameLoop();
	
document.onkeydown = keyNavigation;
document.onmousemove = mouseMove;
document.addEventListener("touchmove",mouseMove);
document.addEventListener("touchstart",function(e){
	e.preventDefault();
});
function mouseMove(e){
//alert("touchmove");
      var scale = POP.currentWidth / POP.WIDTH,x,y,tempx;
      if(isTouchEnabled){
      		x=(event.touches[0].pageX-theCanvas.offsetLeft)/scale;
      }else{
			x = event.pageX!=undefined?event.pageX:(event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
		   // y = event.pageY!=undefined?event.pageY:(event.clientY + document.body.scrollTop + document.documentElement.scrollTop);      	
		    x = (x-theCanvas.offsetLeft)/scale;
      }
	  tempx=x-(bat.width/2);
	  if( tempx-5 > 0 && tempx < theCanvas.width-bat.width-5 )
	  	bat.x=tempx;
	  else if( tempx < 0){
	  	bat.x=5;
	  }else if(tempx > theCanvas.width-bat.width){
	  	bat.x=theCanvas.width-bat.width-5;
	  }
	  //y = (y-theCanvas.offsetTop)/scale;
}
function isTouchDevice() {
    var msTouchEnabled = window.navigator.msMaxTouchPoints;
    var generalTouchEnabled = "ontouchstart" in document.createElement("div");
 
    if (msTouchEnabled || generalTouchEnabled) {
        return true;
    }
    return false;
}
function keyNavigation(e){
switch(e.keyCode)
				{
					case 37://left
					
						if( (bat.x-5) > 0 )
							bat.x-=5;					
						break;
					
					case 39://right
						if((bat.x+bat.width+5)<theCanvas.width)
							bat.x+=5;
						break;
					
					case 38://up
					
					break;
					
					case 40://down
					
					break;
				}	
}
	
}
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
