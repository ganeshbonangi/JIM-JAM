
var numberofredballs=6,canvas,numberofblueballs=7,context,redBall,blueBall,stage,ballStore=new Array(),presentBall,drag_flag=false;
var Ball=function(){};
Ball.gap=10;
var PlayerPosition=function(){};
PlayerPosition.myx=50;
PlayerPosition.myy=65;
PlayerPosition.oponentx=50;
PlayerPosition.oponenty=275;
function makeStage(){

	loadImages();
	canvas=document.getElementById("mycanvas");
	context=canvas.getContext("2d");
	redBall= new Image();
	redBall.src = 'Image/redBall.png';
	redBall.onload=function(){
    	Ball.width=redBall.width;
	};
	blueBall=new Image();
	blueBall.src='Image/blueBall.png';
	stage=new Image();
	stage.src='Image/stage.jpg';
	stage.onload=function(){
    	canvas.width=stage.width;
    	canvas.height=stage.height;
    	context.drawImage(stage,0,0);
    	window.setTimeout(initialize(),1000);
	};

	// add an appropriate event listener

	var pullEvent = new Event('pull');

	// Listen for the ball pulling event.
	canvas.addEventListener('pull', function (e) { 
	
		console.log("pull event"+e)	;

	}, false);

	canvas.addEventListener("drag",function(e){

		console.log("drag event");


	},false);

	canvas.addEventListener("go",function(e){

		console.log("go");
		var acceleration=0.1,x=e.detail.originalEvent.offsetX-presentBall.radius,y=e.detail.originalEvent.offsetX-presentBall.radius;
		while(0.01!=acceleration){
			//ballStore[presentBall.index].position.x=
			//ballStore[presentBall.index].position.y=
			acceleration-=0.01;
		}



	},false);

	canvas.onmousemove=function(event){
		
		if(drag_flag){

				var myEvent = new CustomEvent("drag", {
					detail: presentBall
				});
				// Dispatch the event.l
				drag_flag=true;
				canvas.dispatchEvent(myEvent);
				context.clearRect ( 0 , 0 , canvas.width , canvas.height );
				repaint();
				drawLine(event);

		}
		
	}
	function drawLine(event){

			context.beginPath();
			context.moveTo(presentBall.center.x,presentBall.center.y);
			context.lineTo(presentBall.center.x-(event.offsetX-presentBall.center.x),presentBall.center.y-(event.offsetY-presentBall.center.y));
			//context.strokeStyle="red";
			context.stroke();

	}

	canvas.onmouseup=function(event){
		if(drag_flag){
			drag_flag=false;
			repaint();
			presentBall.originalEvent=event;
			var myEvent = new CustomEvent("go", {
				detail: presentBall
			});
			canvas.dispatchEvent(myEvent);
		}
	}
	canvas.onmousedown=function(event){

    	for(var i=0;i<ballStore.length;i++){
        	if(isPointInTheCircle()){

				var myEvent = new CustomEvent("pull", {
					detail: ballStore[i]
				});
				// Dispatch the event.
				drag_flag=true;presentBall=ballStore[i];
				presentBall.index=i;
				canvas.dispatchEvent(myEvent);

        	}        	

    	}
		function isPointInTheCircle(){

			 return (ballStore[i].radius >= getDistance()) ? true:false;			

		}
 		function getDistance(){

 			var diff_x=event.offsetX-ballStore[i].center.x;
 			var diff_y=event.offsetY-ballStore[i].center.y;
 			//alert("dist:"+Math.sqrt((diff_x*diff_x)-(diff_y*diff_y)));
 			return Math.sqrt((diff_x*diff_x)+(diff_y*diff_y));

 		}

	};

}
 
function repaint(){
	
	context.drawImage(stage,0,0);
	for(var i=0;i<ballStore.length;i++){
		if(ballStore[i].type=="red"){
			context.drawImage(redBall,ballStore[i].position.x,ballStore[i].position.y);
		}else{
			context.drawImage(blueBall,ballStore[i].position.x,ballStore[i].position.y);
		}
	}

}

function loadImages(){
}

function initialize(){
    	var myx=PlayerPosition.myx,oponentx=PlayerPosition.oponentx;
    	for(i=0;i<numberofredballs || i<numberofblueballs ;i++){
        	if(i<numberofblueballs){
            	context.drawImage(blueBall,oponentx,PlayerPosition.oponenty);
            	ballStore.push({center:new point(oponentx+blueBall.width/2,PlayerPosition.oponenty+blueBall.height/2),radius:blueBall.width/2,position:new point(oponentx,PlayerPosition.oponenty),type:"blue"});	
            	/*ballStore[i].addEventListener("pull", function(e) {
                    	debugger;
                	});  */          	
            	myx+=Ball.width+Ball.gap;
        	}if(i<numberofredballs){
            	context.drawImage(redBall,myx,PlayerPosition.myy);            	
            	ballStore.push({center:new point(myx+redBall.width/2,PlayerPosition.myy+redBall.height/2),radius:redBall.width/2,position:new point(myx,PlayerPosition.myy),type:"red"});	
            	oponentx+=Ball.width+Ball.gap;            	
        	}
    	}
}
var point=function(x,y){this.x=x;this.y=y};

 


