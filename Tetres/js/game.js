var POP = {
    WIDTH: 320, 
    HEIGHT:  480,
    RATIO:null,
    bRATIO: null,
    imgLoader:null,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,
    prevTime:0,
    curTime:0,
    blockImg:null,
	bgImg:null,
	gameOverImg:null,
	baseBg:null,
	frontBg : null,
	menuBtn : null,
	ROWS : 20,
	COLS :10,
	SIZE :20,
	curPiece : null,
	nextPiece:null,
	gameData : null,
	isGameOver: false,
	curLines : 0,
	touchX : null,
	touchY :null,
	touchId : null,
	playBtn : null,
	helpBtn : null,
	soundBtn : null,
	muteBtn : null,
	resumeBtn : null,
	pauseBtn : null,
	pauseBtn : null,
	isSound : true,
	isResume : true,
	gameOptions : null,
	ncanvas : null,
	nctx : null,
	blockSpeed : 600,
	prevSpeed : 600,
	singleLine :0,
	doubleLine :0,
	tripleLine : 0,
	totalPoint : 0,
	level : 1,
	mCord : null,
	isClick : false,
	isPause:false,
	isMute :false,
	gameRow : null,
	gameCol :  null,
	pRow : null,
	pCol : null,
	posCol : null,
	posRow : null,
	cBlock : null,
	posPositionData : null,
	posCorData : null,
	posIndex : 0,
	scale : 1,
	isFrontPage : true,
	offset: {top: 0, left: 0},
    init: function() {

        // the proportion of width to height
        POP.RATIO = POP.WIDTH / POP.HEIGHT;
        // these will change when the screen is resized
        POP.currentWidth = POP.WIDTH;
        POP.currentHeight = POP.HEIGHT;
        
        POP.bCurrentWidth = POP.bWIDTH;
        //alert(POP.bCurrentWidth);
        //POP.bCurrentHeight = POP.bHEIGHT;
        // this is our canvas element
        POP.canvas = document.getElementById('gameCanvas');
        // setting this is important
        // otherwise the browser will
        // default to 320 x 200
        POP.canvas.width = POP.WIDTH;
        POP.canvas.height = POP.HEIGHT;
      
        // the canvas context enables us to 
        // interact with the canvas api
        POP.ctx = POP.canvas.getContext('2d');
		
		POP.prevTime = POP.curTime = 0;
		
        // we're ready to resize
        
        POP.initGame();
        // we need to sniff out Android and iOS
		// so that we can hide the address bar in
		// our resize function
		POP.ua = navigator.userAgent.toLowerCase();
		POP.android = POP.ua.indexOf('android') > -1 ? true : false;
		POP.ios = ( POP.ua.indexOf('iphone') > -1 || POP.ua.indexOf('ipad') > -1  ) ? 
			true : false;
    
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
		
		// the amount by which the css resized canvas
        // is different to the actual (480x320) size.
        
		POP.scale = POP.currentWidth / POP.WIDTH;
		POP.offset.top = POP.canvas.offsetTop;
		POP.offset.left = POP.canvas.offsetLeft;

        // we use a timeout here because some mobile
        // browsers don't fire if there is not
        // a short delay
        window.setTimeout(function() {
			window.scrollTo(0,1);
        }, 1);
        
    },
	
	onReady:function(){
			POP.imgLoader = new BulkImageLoader();
			POP.imgLoader.addImage("./assets/image/blocks.png", "blocks");
			POP.imgLoader.addImage("./assets/image/bg.png", "bg");
			POP.imgLoader.addImage("./assets/image/over.png", "gameover");
			POP.imgLoader.addImage("./assets/image/Base.png", "baseBg");
			POP.imgLoader.addImage("./assets/image/frontbg.png", "frontbg");
			POP.imgLoader.addImage("./assets/image/play.png", "playBtn");
			POP.imgLoader.addImage("./assets/image/help.png", "helpBtn");
			POP.imgLoader.addImage("./assets/image/menu.png", "menuBtn");
			POP.imgLoader.addImage("./assets/image/mute.png", "sound");
			POP.imgLoader.addImage("./assets/image/resume.png", "resume");
			POP.imgLoader.addImage("./assets/image/pause.png", "pause");
			POP.imgLoader.addImage("./assets/image/rotate.png", "rotate");
			POP.imgLoader.addImage("./assets/image/sound.png", "mute");
			
			POP.imgLoader.onReadyCallback = POP.onImagesLoaded;
			POP.imgLoader.loadImages();
			POP.imgLoader.loadImages();
	},

	onImagesLoaded:function(e)
		{
			POP.blockImg = POP.imgLoader.getImageAtIndex(0);
			POP.bgImg = POP.imgLoader.getImageAtIndex(1);
			POP.gameOverImg = POP.imgLoader.getImageAtIndex(2);
			POP.baseBg = POP.imgLoader.getImageAtIndex(3);
			POP.frontBg = POP.imgLoader.getImageAtIndex(4);
			POP.playBtn = POP.imgLoader.getImageAtIndex(5);
			POP.helpBtn = POP.imgLoader.getImageAtIndex(6);
			POP.menuBtn = POP.imgLoader.getImageAtIndex(7);
			POP.soundBtn = POP.imgLoader.getImageAtIndex(8);
			POP.resumeBtn = POP.imgLoader.getImageAtIndex(9);
			POP.pauseBtn = POP.imgLoader.getImageAtIndex(10);
			POP.rotateBtn = POP.imgLoader.getImageAtIndex(11);
			POP.muteBtn = POP.imgLoader.getImageAtIndex(12);
			
			POP.init();
		},
		
		initGame:function(){
				
				POP.ctx.drawImage(POP.frontBg, 0, 0, 320,480, 0, 0, POP.WIDTH, POP.HEIGHT);
				POP.ctx.drawImage(POP.playBtn,0, 0, 200, 165, 50, 100, 200, 165);
				POP.ctx.drawImage(POP.helpBtn,0, 0, 200, 165, 50, 200, 200, 165);
				
			},
		getInput:function(e)
		{
			if(!e) { var e = window.event; }
			
			e.preventDefault();
			
			if(POP.isGameOver != true)
			{
				switch(e.keyCode)
				{
					case 37:
					{
						if( POP.checkMove(POP.curPiece.gridx - 1, POP.curPiece.gridy, POP.curPiece.curState) )
							POP.curPiece.gridx=POP.curPiece.gridx-1;
					}
					break;
					
					case 39:
					{
						if( POP.checkMove(POP.curPiece.gridx + 1, POP.curPiece.gridy, POP.curPiece.curState) )
							POP.curPiece.gridx=POP.curPiece.gridx+1;
					}
					break;
					
					case 38:
					{
						var newState = POP.curPiece.curState - 1;
						if(newState < 0)
							newState = POP.curPiece.states.length - 1;
							
						if( POP.checkMove(POP.curPiece.gridx, POP.curPiece.gridy, newState) )
							POP.curPiece.curState = newState;
					}
					break;
					
					case 40:
					{
						if( POP.checkMove(POP.curPiece.gridx, POP.curPiece.gridy + 1, POP.curPiece.curState) )
							POP.curPiece.gridy++;
					}
					break;
				}
			}
		},
		startClassicGame : function(){
			POP.ctx.clearRect(0, 0, POP.WIDTH, POP.HEIGHT);
			plaYStart();
			
			var r, c;
			POP.curLines = 0;
			POP.isGameOver = false;
			POP.isFrontPage=false;
			if(POP.gameData == null)
			{
				POP.gameData = new Array();
				
				for(r = 0; r < POP.ROWS; r++)
				{
					POP.gameData[r] = new Array();
					for(c = 0; c < POP.COLS; c++)
					{
						POP.gameData[r].push(0);
					}
				}		
			}
			else
			{
				for(r = 0; r < POP.ROWS; r++)
				{
					for(c = 0; c < POP.COLS; c++)
					{
						POP.gameData[r][c] = 0;
					}
				}
			}
			
			//alert("1");
			POP.curPiece = getRandomPiece();
			POP.nextPiece = getRandomPiece();
			POP.drawNextPiece(POP.nextPiece);
			
			
			
			var requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
									window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
									
			window.requestAnimationFrame = requestAnimFrame;

			requestAnimationFrame(POP.update);
		},
		update:function()
		{
			POP.curTime = new Date().getTime();
			
			if(POP.isClick){
					//alert("1");
					POP.prevSpeed=POP.blockSpeed;
					POP.blockSpeed=0;
					POP.isClick=false;
					
				}else{
						POP.blockSpeed=POP.prevSpeed;
					}
			if(POP.curTime - POP.prevTime > POP.blockSpeed)
			{
				// update the game piece
				if( POP.checkMove(POP.curPiece.gridx, POP.curPiece.gridy + 1, POP.curPiece.curState) )
				{
					POP.curPiece.gridy += 1;
				}
				else
				{
					POP.copyData(POP.curPiece);
					POP.curPiece=POP.nextPiece;
					POP.nextPiece = getRandomPiece();	
				}
				
				// update time
				POP.prevTime = POP.curTime;
			}
			
			POP.ctx.clearRect(0, 0, POP.WIDTH, POP.HEIGHT);
			POP.drawBoard();
			//debugger;
			POP.drawNextPiece(POP.nextPiece);
			POP.drawStatus();
			POP.drawPiece(POP.curPiece);
			POP.drawPosiblePosition(POP.curPiece);
			if(POP.isGameOver == false && !POP.isPause){
				requestAnimationFrame(POP.update);
			}
			else{
					if(POP.isPause==false){
							sound3.play();
							POP.ctx.drawImage(POP.gameOverImg, 0, 0, 320,480, 0, 0, POP.WIDTH, POP.HEIGHT);
						}
				}
				
		},
		pause:function(){
			if(POP.isPause){
					POP.isPause=false;
					requestAnimationFrame(POP.update);
				}
				else{
						POP.isPause= true;
					}
		},
		muteUnmute : function(){
			if(POP.isMute){
					Howler.unmute();
					POP.isMute=false;
				}else{
						Howler.mute()
						POP.isMute=true;
					}
		},
		goToMenu : function(){
				location.reload();
		},
		drawNextPiece: function(p){	
			//alert("1");	
			var drawX = 0;//p.gridx;
			var drawY = 3;//p.gridy;
			var state = p.curState;
			
			for(var r = 0, len = p.states[state].length; r < len; r++)
			{
				for(var c = 0, len2 = p.states[state][r].length; c < len2; c++)
				{
					if(p.states[state][r][c] == 1 && drawY >= 0)
					{
						POP.ctx.drawImage(POP.blockImg, p.color * 32, 0, 32, 32, (drawX+12) * POP.SIZE, drawY * POP.SIZE, POP.SIZE, POP.SIZE);
					}
					
					drawX += 1;
				}
				
				drawX = 0;
				drawY += 1;
			}
		},
		drawStatus : function(){
				  POP.ctx.font = '15pt Calibri';
				  POP.ctx.fillStyle = 'black';
				  POP.ctx.fillText(POP.totalPoint.toString(),POP.SIZE*12, POP.SIZE*10);
				  POP.ctx.fillText(POP.singleLine.toString(),POP.SIZE*12, POP.SIZE*13);
				  POP.ctx.fillText(POP.doubleLine.toString(),POP.SIZE*12, POP.SIZE*16);
				  POP.ctx.fillText(POP.tripleLine.toString(),POP.SIZE*12, POP.SIZE*19);
				  POP.ctx.drawImage(POP.menuBtn,0, 0, 40, 40, 10, 420, 40, 40);
				  
				  
				  if(POP.isSound){
							POP.ctx.drawImage(POP.muteBtn,0, 0, 40, 40, 70, 420, 40, 40);
					  }else{
							POP.ctx.drawImage(POP.soundBtn,0, 0, 40, 40, 70, 420, 40, 40);
						  }
						  
				  if(POP.isResume){
						POP.ctx.drawImage(POP.pauseBtn,0, 0, 40, 40,130, 420, 40, 40);
					  }else{
							POP.ctx.drawImage(POP.resumeBtn,0,0, 40, 40, 130, 420, 40, 40);
						  }
				  
				  POP.ctx.drawImage(POP.rotateBtn,0, 0, 40, 40, 250, 420, 40, 40);
			},
		copyData : function(p)
		{
			var xpos = p.gridx;
			var ypos = p.gridy;
			var state = p.curState;
			
			for(var r = 0, len = p.states[state].length; r < len; r++)
			{
				for(var c = 0, len2 = p.states[state][r].length; c < len2; c++)
				{
					if(p.states[state][r][c] == 1 && ypos >= 0)
					{
						POP.gameData[ypos][xpos] = (p.color + 1);
					}
					
					xpos += 1;
				}
				
				xpos = p.gridx;
				ypos += 1;
			}
			
			POP.checkLines();
			if(p.gridy <= 0)
			{
				POP.isGameOver = true;
			}
		},
		checkLines : function()
		{
			var lineFound = false;
			var fullRow = true;
			var r = POP.ROWS - 1;
			var c = POP.COLS - 1;
			var totalLineFound=0;
			while(r >= 0)
			{
				while(c >= 0)
				{
					if(POP.gameData[r][c] == 0)
					{
						fullRow = false;
						c = -1;
					}
					c--;
				}
				
				if(fullRow == true)
				{
					//sound3.play();
					POP.zeroRow(r);
					r++;
					lineFound = true;
					totalLineFound++;
					POP.curLines=POP.curLines+totalLineFound;
				}
				
				fullRow = true;
				c = POP.COLS - 1;
				r--;
			}
			
			if(lineFound)
			{
				sound2.play();
				if(totalLineFound==1){
						POP.singleLine++;
					}else if(totalLineFound==2){
							POP.doubleLine++;
						}else if(totalLineFound>=3){
								POP.tripleLine++;
							}	
				POP.totalPoint 	= POP.curLines*100;	
				
				if(POP.totalPoint%1000==0){
						POP.blockSpeed=POP.blockSpeed-20;
						POP.level++;
					}
				
			}
		},
		zeroRow : function(row)
		{
			var r = row;
			var c = 0;
			
			while(r >= 0)
			{
				while(c < POP.COLS)
				{
					if(r > 0)
						POP.gameData[r][c] = POP.gameData[r-1][c];
					else
						POP.gameData[r][c] = 0;
						
					c++;
				}
				
				c = 0;
				r--;
			}
		},
		drawBoard : function()
		{
			POP.ctx.drawImage(POP.baseBg, 0, 0, POP.WIDTH, POP.HEIGHT, 0, 0, POP.WIDTH, POP.HEIGHT);
			
			for(var r = 0; r < POP.ROWS; r++)
			{
				for(var c = 0; c < POP.COLS; c++)
				{
					if(POP.gameData[r][c] != 0)
					{
						POP.ctx.drawImage(POP.blockImg, (POP.gameData[r][c] - 1) * 32, 0, 32, 32, c* POP.SIZE, r * POP.SIZE, POP.SIZE, POP.SIZE);
					}
				}
			}
		},
		drawPiece : function(p)
		{
			var drawX = p.gridx;
			var drawY = p.gridy;
			var state = p.curState;
			
			for(var r = 0, len = p.states[state].length; r < len; r++)
			{
				for(var c = 0, len2 = p.states[state][r].length; c < len2; c++)
				{
					if(p.states[state][r][c] == 1 && drawY >= 0)
					{
						POP.ctx.drawImage(POP.blockImg, p.color * 32, 0, 32, 32, drawX* POP.SIZE,drawY*POP.SIZE, POP.SIZE, POP.SIZE);
					}
					
					drawX += 1;
				}
				
				drawX = p.gridx;
				drawY += 1;
			}
		},
		drawPosiblePosition :function(p){	
			var cPiece = p;
			POP.cBlock = cPiece.states[cPiece.curState];
			
			POP.posPositionData=[];
			
			POP.posPositionData = POP.gameData.map(function(arr) {
				return arr.slice();
			});
			POP.trackArrayInfo(POP.cBlock);
					
		},
		trackArrayInfo : function(p){
						
						POP.gameRow = POP.posPositionData.length;
						POP.gameCol = POP.posPositionData[0].length;
						
						POP.pRow = p.length;
						POP.pCol = p[0].length;
						
						POP.posRow = POP.gameRow-1;
						POP.posCol = 0;
						POP.posIndex=0;
						POP.posCorData={};
						while (POP.posCol<POP.gameCol && POP.posRow <POP.gameRow){
								var pr = POP.checkPossibleRow(POP.posCol);
								
								if(pr!=-1){
										POP.posRow=pr;
										var f= POP.getPossiblePositions(POP.posRow,POP.posCol);
										
										if(f==0){
												POP.drawDownward(POP.posRow,POP.posCol)
											}else{
													POP.drawUpward(POP.posRow,POP.posCol);
												}
										POP.posCol = POP.posCol+POP.pCol;
									}else{
											if(POP.gameCol>=(POP.posCol+POP.pCol)){
													POP.drawUpward(POP.posRow,POP.posCol);
												}
											POP.posCol = POP.posCol+POP.pCol;
										}
							}												
				},
		checkPossibleRow : function(pc){
						var c=-1;
						for(var i=0;i<POP.gameRow;i++){
								for(var j=pc;j<(pc+POP.pCol);j++){
										if(POP.posPositionData[i][j]!=0){
												if(c==-1){
														c=Number(i-1);
													}
											}
									}
							}
							
						 if(c==-1 && i==POP.gameRow){
								return i-1;
							}else{
									return c;
								}
							
						
						
			},
		getPossiblePositions : function(pR,pC){
						var c=0;
						if((pR+1)<POP.pRow){
								for(var i=pR,i1=0;i1<POP.pRow;i++,i1++){
										for(j=pC,j1=0;j1<POP.pCol;j++,j1++){
												if(!(POP.posPositionData[i][j]!=POP.cBlock[i1][j1])){
														if(!(POP.posPositionData[i][j]==0 && POP.cBlock[i1][j1]==0)){
															c++;
														}
													}
											}
									}
							}else{
									c=-1;
								}
							
							return c;
					},
		drawUpward : function(row,col){
							for(var i=row,i1=POP.pRow-1;i1>=0 && i>0;i--,i1--){
									for(var j=col,j1=0;j1<POP.pCol;j++,j1++){
											POP.posPositionData[i][j]=POP.cBlock[i1][j1];
											if(POP.cBlock[i1][j1]==1){
													POP.ctx.beginPath();
													POP.ctx.rect(j*20,i*20,20,20);
													POP.ctx.lineWidth = 1;
													POP.ctx.strokeStyle = 'red';
													POP.ctx.stroke();
												}
										}
						}
						
						var pCord ={};
						pCord.x1=col;
						pCord.y1=row;
						pCord.y2=i;
						pCord.x2=j;
						
						POP.posCorData[POP.posIndex++]=pCord;
				   },
		drawDownward : function(row,col){
			for(var i=row,i1=0;i1<POP.pRow;i++,i1++){
				for(var j=col,j1=0;j1<POP.pCol;j++,j1++){
						POP.posPositionData[i][j]=POP.cBlock[i1][j1];
					}
				}
				
				var pCord ={};
						var pCord ={};
						pCord.x1=col;
						pCord.y1=row;
						pCord.y2=i;
						pCord.x2=j;
						
						POP.posCorData[POP.posIndex++]=pCord;
		},
		checkMove : function(xpos, ypos, newState)
		{
			var result = true;
			var newx = xpos;
			var newy = ypos;
			
			for(var r = 0, len = POP.curPiece.states[newState].length; r < len; r++)
			{
				for(var c = 0, len2 = POP.curPiece.states[newState][r].length; c < len2; c++)
				{
					if(newx < 0 || newx >= POP.COLS)
					{
						result = false;
						c = len2;
						r = len;
					}
					
					if(POP.gameData[newy] != undefined && POP.gameData[newy][newx] != 0
						&& POP.curPiece.states[newState][r] != undefined && POP.curPiece.states[newState][r][c] != 0)
					{
						result = false;
						c = len2;
						r = len;
					}
					
					newx += 1;
				}
				
				newx = xpos;
				newy += 1;
				
				if(newy > POP.ROWS)
				{
					r = len;
					result = false;
				}
			}
			
			return result;
		},
		
		Cell : function(row, column) {
			this.row = row;
			this.column = column;
		},
		getCursorPosition: function(e){
			/* returns Cell with .row and .column properties */
			var x;
			var y;
			if (e.pageX != undefined && e.pageY != undefined) {
			x = e.pageX;
			y = e.pageY;
			}
			else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
			x -= POP.canvas.offsetLeft;
			y -= POP.canvas.offsetTop;
			x/=POP.scale;
			y/=POP.scale;
			x = Math.min(x, POP.WIDTH * POP.SIZE);
			y = Math.min(y, POP.HEIGHT * POP.SIZE);
			var cell = new POP.Cell(Math.floor(y/POP.SIZE), Math.floor(x/POP.SIZE));
			
			return cell;
		},
		getTouchPosition : function(e){
			/* returns Cell with .row and .column properties */
			var x;
			var y;
			var touch = isTouchEnabled?e.changedTouches.item(0):e;
			x = (touch.pageX-touch.target.offsetLeft)/POP.scale;
			y = (touch.pageY-touch.target.offsetTop)/POP.scale;
			
			var cell = new POP.Cell(Math.floor(y/POP.SIZE), Math.floor(x/POP.SIZE));
			//alert( Math.floor(x/POP.SIZE));
			return cell;
		}
		
	};

document.getElementById("gameCanvas").addEventListener("click",function(e){
		
		e.preventDefault();
		POP.mCord=POP.getCursorPosition(e);
		var f1=0;
		var piecCord;
		for (var index in POP.posCorData) {
			index= Number(index);
			if(f1==0 && POP.posCorData[index]["x2"]>POP.mCord.column && POP.posCorData[index]["x1"]<=POP.mCord.column && POP.posCorData[index]["y1"]>=POP.mCord.row && POP.posCorData[index]["y2"]<POP.mCord.row){
					f1++;
					piecCord=index;
				}
		}
		
		if(f1>0){
				POP.curPiece.gridx =POP.posCorData[piecCord]["x1"];
				POP.curPiece.gridy =POP.posCorData[piecCord]["y2"];
				POP.isClick=true;
			}
		
	});

document.getElementById("gameCanvas").addEventListener('touchstart', touchStart);
document.getElementById("gameCanvas").addEventListener("click",touchStart);
document.getElementById("gameCanvas").addEventListener('click',touchEnd);
function touchStart(e){

	e.preventDefault();
	var offsetTop=POP.offset.top;
	var offsetLeft=POP.offset.left;	
	if(isTouchEnabled){
		POP.touchX = (e.touches[0].pageX-offsetLeft)/POP.scale;
		POP.touchY = (e.touches[0].pageY-offsetTop)/POP.scale;
		POP.touchId = e.touches[0].identifier;		
	}else{
		POP.touchX = event.pageX!=undefined?event.pageX:(event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
		POP.touchY = event.pageY!=undefined?event.pageY:(event.clientY + document.body.scrollTop + document.documentElement.scrollTop);
		POP.touchId = "";//e.touches[0].identifier;
	    POP.touchX = (POP.touchX-POP.canvas.offsetLeft)/POP.scale;
	    POP.touchY = (POP.touchY-POP.canvas.offsetTop)/POP.scale;	
	}
	
	
	if(POP.isFrontPage&&(POP.touchX>=50&&POP.touchX<250)&&(POP.touchY>=100&&POP.touchY<=165)){
			POP.startClassicGame();
		}	
}

document.getElementById("gameCanvas").addEventListener('touchmove', function(e)
{
	e.preventDefault();
	if(!POP.isFrontPage && !POP.isPause){
			var difY = e.touches[0].pageY-POP.touchY;
	
			if(difY > 60)
			{
				if( POP.checkMove(POP.curPiece.gridx, POP.curPiece.gridy + 1, POP.curPiece.curState) ){
						POP.curPiece.gridy++;
						sound3.play();
					}				
			}
		}	
} );

function touchEnd( e ){

	e.preventDefault();
	if(!POP.isFrontPage && !POP.isPause && (POP.touchX>=0&&POP.touchX<201)&&(POP.touchY>=0&&POP.touchY<=401)){
			if(POP.blockSpeed>0 && !POP.isClick){
			
				var touchEndX;
				var touchEndY;
				var touch;
				if(isTouchEnabled){
					touch = e.changedTouches.item(0);
				}else{
					touch = e;
				}								
				var offsetTop=POP.offset.top;
				var offsetLeft=POP.offset.left;
				
				try
				{
					touchEndX = (touch.pageX-offsetLeft)/POP.scale;
					touchEndY = (touch.pageY-offsetTop)/POP.scale;
				}
				catch(err)
				{
					alert(err);
					return;
				}
				
				var difX = Math.abs(touchEndX - POP.touchX);
				var difY = Math.abs(touchEndY - POP.touchY);
				//alert("x"+touchEndX+"Y :"+touchEndY);
				POP.mCord=POP.getTouchPosition(e);
				var f1=0;
				var piecCord;
				for (var index in POP.posCorData) {
					index= Number(index);
					if(f1==0 && POP.posCorData[index]["x2"]>POP.mCord.column && POP.posCorData[index]["x1"]<=POP.mCord.column && POP.posCorData[index]["y1"]>=POP.mCord.row && POP.posCorData[index]["y2"]<POP.mCord.row){
							f1++;
							piecCord=index;
						}
				}
				
				if(f1>0){
						POP.curPiece.gridx =POP.posCorData[piecCord]["x1"];
						POP.curPiece.gridy =POP.posCorData[piecCord]["y2"];
						POP.isClick=true;
						e.stopImmediatePropagation();
					}else
					 {
						if(difX < 10 && difY < 10)
						{
							sound3.play();	
							var newState = POP.curPiece.curState - 1;
							if(newState < 0)
								newState = POP.curPiece.states.length - 1;
								
							if( POP.checkMove(POP.curPiece.gridx, POP.curPiece.gridy, newState) )
								POP.curPiece.curState = newState;
						}
						else
						if(difX > difY)
						{
							if(touchEndX < POP.touchX)
							{
								if( POP.checkMove(POP.curPiece.gridx - 1, POP.curPiece.gridy, POP.curPiece.curState) ){
										POP.curPiece.gridx--;
										sound3.play();
										
									}
									
							}	
							else
							{
								if( POP.checkMove(POP.curPiece.gridx + 1, POP.curPiece.gridy, POP.curPiece.curState) ){
										POP.curPiece.gridx++;
										sound3.play();
										
									}
									
							}
						}
					}
			}
		}else if(!POP.isFrontPage && (POP.touchX>=0&&POP.touchX<320)&&(POP.touchY>=401&&POP.touchY<=480)){
				if((POP.touchX>=10&&POP.touchX<=50)&&(POP.touchY>=420&&POP.touchY<=460)){
						POP.goToMenu();
					}else if((POP.touchX>=70&&POP.touchX<=120)&&(POP.touchY>=420&&POP.touchY<=460)){
							if(POP.isSound){
										POP.muteUnmute();
										POP.isSound=false;
								}else{
										POP.muteUnmute();
										POP.isSound=true;
									}
						}else if((POP.touchX>=130&&POP.touchX<=170)&&(POP.touchY>=420&&POP.touchY<=460)){
								if(POP.isPause){
										
										POP.pause();
										POP.isPause=false;
										POP.isResume=true;
									}else{
											POP.pause();
											POP.isPause=true;
											POP.isResume=false;
										}
							}else if(!POP.isPause&&(POP.touchX>=250&&POP.touchX<=290)&&(POP.touchY>=420&&POP.touchY<=460)){
									sound3.play();
									var newState = POP.curPiece.curState - 1;
									if(newState < 0)
										newState = POP.curPiece.states.length - 1;
										
									if( POP.checkMove(POP.curPiece.gridx, POP.curPiece.gridy, newState) )
										POP.curPiece.curState = newState;
								}
				
			}
}
document.getElementById("gameCanvas").addEventListener('touchend',touchEnd);

window.addEventListener('load', POP.onReady, false);
window.addEventListener('resize', POP.resize, false);
document.onkeydown = POP.getInput;
function isTouchDevice() {
    var msTouchEnabled = window.navigator.msMaxTouchPoints;
    var generalTouchEnabled = "ontouchstart" in document.createElement("div");
 
    if (msTouchEnabled || generalTouchEnabled) {
        return true;
    }
    return false;
}

var isTouchEnabled=isTouchDevice();