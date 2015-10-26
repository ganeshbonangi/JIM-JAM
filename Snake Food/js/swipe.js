function Swipe(element,onLeft,onRight,onUp,onDown) {

    this.onLeft = onLeft;
    this.onRight = onRight;
    this.onUp = onUp;
    this.onDown = onDown;
	this.reset();
	this.touchMove=false;
	
    // Local variable to pass ourself to event callbacks
    var _self = this;
    
	
	var SwipeAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
							
	window.SwipeAnimFrame = SwipeAnimFrame;
	SwipeAnimFrame(update);
	
	function update()
	{ 
		//document.getElementById("changedata").innerHTML=_self.touchMove;
		 if( _self.curX != 0 && _self.touchMove) {
				
		
                // Only trigger an event if the swipe is long enough 
				
				
                if (_self.getSwipeLength() >= Swipe.MIN_LENGTH) {
					
                    var angle = _self.getSwipeAngle();
					
                    var direction = _self.getSwipeDirection(angle);
					_self.dispatchEvent(direction);
                    _self.reset();
                } 
				
            } 
			
		SwipeAnimFrame(update)
	}
 

	
    element.addEventListener(
        "touchstart",
        function(event){
		
            // check that only one finger was used
            if( event.touches.length == 1 ) {
			 _self.reset();
			// event.preventDefault();
            // get the coordinates of the touch
			 _self.startX = event.touches[0].pageX;
              _self.startY = event.touches[0].pageY;
            } else {
                // more than one finger touched so cancel
                _self.reset();
            }
        },
        false
    );
    // Capture touchmove event
    element.addEventListener(
        "touchmove",
        function(event){
            // check that only one finger was used
			event.preventDefault();
            if( event.touches.length == 1 ) {
			
                event.preventDefault();
                _self.curX = event.touches[0].pageX;
                _self.curY = event.touches[0].pageY;
				_self.eventName = event;
				_self.touchMove=true;
				
            } else {
                _self.reset();
            }
        },
        false
    );
   
    // Capture touchcancel event
	this.touchCancel = function (event) {
		_self.reset();
	};
	
}



// The minimum length of a swipe
Swipe.MIN_LENGTH =50;

// The Swipe direction (deduced from the Swipe angle)
Swipe.DIRECTION = {
LEFT:0,
RIGHT:1,
UP:2,
DOWN:3
};

// Reset the Swipe internals
Swipe.prototype.reset = function () {
	this.touchMove=false;
    this.startX = 0;
    this.startY = 0;
    this.curX = 0;
    this.curY = 0;
};

// Get the Swipe Length
Swipe.prototype.getSwipeLength = function (){
    var dX = this.curX - this.startX;
    var dY = this.curY - this.startY;
    return Math.round(Math.sqrt(Math.pow(dX,2) + Math.pow(dY,2)));
};

// Get the Swipe Angle
Swipe.prototype.getSwipeAngle = function (){
    var dX = this.startX-this.curX;
    var dY = this.curY-this.startY;
    // Get the angle (-PI <= angle <= PI)
    return Math.atan2(dY,dX);
};

/*
 * Get the direction of the Swipe based on its angle
 * 
 * Parameters:
 * - angle : the Swipe angle expressed in radians 
 * 
 */
Swipe.prototype.getSwipeDirection = function (swipeAngle) {
    if ((swipeAngle >= -Math.PI/4) 
     && (swipeAngle <= Math.PI/4) ) {
        swipeDirection = Swipe.DIRECTION.LEFT;
    } else if ((swipeAngle >= Math.PI/4)
     && (swipeAngle <= 3*Math.PI/4) ) {
        swipeDirection = Swipe.DIRECTION.DOWN;
    } else if ((swipeAngle < -Math.PI/4)
     && (swipeAngle >= -3*Math.PI/4) ) {
        swipeDirection = Swipe.DIRECTION.UP;
    } else {
        swipeDirection = Swipe.DIRECTION.RIGHT;
    }
    return swipeDirection;
};

/*
 * Call the relevant callback based on the Swipe direction
 * 
 * Parameters:
 * - direction : the Swipe direction expressed in Swipe.DIRECTION 
 * 
 */
Swipe.prototype.dispatchEvent = function (direction) {
    switch (direction){
        case Swipe.DIRECTION.LEFT:
            this.onLeft();
            break;
        case Swipe.DIRECTION.RIGHT:
            this.onRight();
            break;
        case Swipe.DIRECTION.UP:
            this.onUp();
            break;
        case Swipe.DIRECTION.DOWN:
            this.onDown();
            break;
        default:
            break;
    }
};

		

