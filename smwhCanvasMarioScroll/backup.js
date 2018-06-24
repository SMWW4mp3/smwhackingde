draw = document.getElementById("smwhCanvas").getContext("2d")
width = document.getElementById("smwhCanvas").width
height = document.getElementById("smwhCanvas").height
/*
draw.mozImageSmoothingEnabled = false;
draw.webkitImageSmoothingEnabled = false;
draw.imageSmoothingEnabled = false;
*/

//hdma based on hour of day

hdmaColorsTop = [
									"#000000","#000000","#000000","#000000","#000000","#000000",
									"#000732","#00127E","#0060CB","#006DD8","#0087F2","#0094FF",
									"#0094FF","#0094FF","#0094FF","#0094FF","#008FE7","#008ACF",
									"#0080A0","#006078","#002028","#000000","#000000","#000000"
								]
hdmaColorsBottom = [
										"#000000","#000000","#000000","#000000","#000000","#00137F",
										"#65354C","#FE6900","#BBA698","#AFB0B1","#99C5E5","#8ED0FF",
										"#8ED0FF","#8ED0FF","#8ED0FF","#8ED0FF","#A99CF6","#C668ED",
										"#FF00DC","#BF03BD","#3F0A7F","#000E60","#000000","#000000"
									]
showStars = [
							true,true,true,true,true,true,
							false,false,false,false,false,false,
							false,false,false,false,false,false,
							true,true,true,true,true,true
						]									
									
x = new Date()
h = x.getHours()


bg = hdma(hdmaColorsTop[h],hdmaColorsBottom[h])

img = null
imgBG = null
objects = new Array()
bgScrollXpos = 0
bgScrollXspeed = 0.66
fgScrollXpos = 0
fgScrollXspeed = 1
l3ScrollXpos = 0
l3ScrollXspeed = 0.33
frames = 0

quotes = [
					"So Zuf\x1Bllig, wow!",
					"Jetzt mit 10% extra!",
					"Markus riecht!",
					"<Hier Text einf\x1Fgen>",
					"Tipp: Lesen hilft!",
					"\xC8\xE1\xE8\xE1\xAC \xE4\xE9\xE5\xF3\xE5\xF2 \xD4\xE5\xF8\xF4 \xE9\xF3\xF4 \xE7\xE5\xEC\xE2\xA1",
					"DA IST CUTOFF!!1!elf1!",
					"Sorry, der Text war zu lang :(",
					">:D",
					"Robju riecht mehr als Markus!",
					"???",
					"!!!",
					"Und jetzt: Werbung.",
					"Generic Grassland "+Math.floor(Math.random()*8+1),
					"Aha! Da ist es wieder!",
					"Demetra approves!"
				]

berryX = [1,2,14]
berryY = [7,6,7]

mapCollisionRects = [
											[0,144,512,192],
											[112,16,160,32],
											[368,64,480,80],
											[304,16,320,32],
											[352,0,360,64],
											[488,0,496,64]
										]

function init() {
	draw.fillStyle = "#000000"
	draw.fillText("Lade Daten...",width/2,height/2)
	imgBG = new Image()
	imgBG.src = 'bg.png'
	imgBG.addEventListener("load",function () {
		img = new Image()
		img.src = 'overlay.png'
		img.addEventListener("load",function () {
			marioImg = new Image()
			marioImg.src = 'marioSpiteSheet.png'
			marioImg.addEventListener("load",function () {
				imgFG = new Image()
				imgFG.src = 'fg.png'
				imgFG.addEventListener("load",function () {
					imgL3 = new Image()
					imgL3.src = 'l3.png'
					imgL3.addEventListener("load",function () {
						imgBerry = new Image()
						imgBerry.src = 'berrySprite.png'
						imgBerry.addEventListener("load",function () {
							imgKoopa = new Image()
							imgKoopa.src = 'koopa.png'
							imgKoopa.addEventListener("load",function () {
								font = new Image()
								font.src = 'font.png'
								font.addEventListener("load",function () {
									starsImg = new Image()
									starsImg.src = 'star.png'
									starsImg.addEventListener("load",function () {
										
										if (showStars[h]) {
											objects.push(new starCluster())
										}
										
										objects.push(new layer1(imgFG,0,0))
										
										for (var i = 0; berryX.length > i; i++) {
											objects.push(new berrySprite(berryX[i],berryY[i]))
										}
										
										objects.push(new marioSprite())
										objects.push(new koopa(384,32,1))
										objects.push(new textObject(338,180,"W4mp3",1))
										objects.push(new textObject(8,180,quotes[Math.floor(Math.random()*quotes.length)],0))
										objects.push(new textObject(306,8,"time",0))

										window.requestAnimationFrame(loop)
										window.setTimeout("tick()",16)
									})
								})
							})
						})
					})
				})
			})
		})
	})
	
}

function loop(timestamp) {
	draw.fillStyle=bg
	draw.fillRect(0,0,width,height)
	
	bgScrollXpos+=bgScrollXspeed
	
	if (bgScrollXpos > 512) {
		bgScrollXpos = 0
	}
	
	fgScrollXpos+=fgScrollXspeed
	
	if (fgScrollXpos > 512) {
		fgScrollXpos = 0
	}
	
	l3ScrollXpos+=l3ScrollXspeed
	
	if (l3ScrollXpos > 512) {
		l3ScrollXpos = 0
	}
	
	draw.drawImage(imgL3,l3ScrollXpos-512,0)
	draw.drawImage(imgL3,l3ScrollXpos,0)
	draw.drawImage(imgL3,l3ScrollXpos+512,0)
	
	draw.drawImage(imgBG,bgScrollXpos-512,0)
	draw.drawImage(imgBG,bgScrollXpos,0)
	draw.drawImage(imgBG,bgScrollXpos+512,0)
	
	for (var i = 0; i < objects.length; i++) {
		objects[i].draw()
	}
	
	draw.shadowColor ="rgba(0,0,0,0)"
	draw.drawImage(img,0,0)
	//debug()
	
	frames++
  window.requestAnimationFrame(loop);
}

function tick() {
	for (var i = 0; i < objects.length; i++) {
		objects[i].tick()
	}
	window.setTimeout("tick()",16) // 1000/16 = 60 ticks pro sekunde
}

function marioSprite() {
	this.x = 300
	this.y = 124
	this.tick = function () {

	}
	this.draw = function () {
		if (frames % 12 >= 6) {
			draw.drawImage(marioImg,0,0,16,20,this.x,this.y,16,20)
		} else {
			draw.drawImage(marioImg,16,0,16,20,this.x-1,this.y+1,16,20)
		}
	}
	this.debug = function () {
		return "marioSprite(): x: " + this.x + "|y: " + this.y
	}
}

function berrySprite(x,y) {
	this.x = x
	this.y = y
	this.color = Math.floor(Math.random()*3)
	this.debugColorNames = ["red","pink","green"]
	this.debugColor = ["rgba(255,0,0,0.25)","rgba(255,192,192,0.25)","rgba(0,255,0,0.25)"]
	this.tick = function () {

	}
	this.draw = function () {
		var temp = Math.floor(frames % 32 / 8)
		draw.drawImage(imgBerry,this.color*16,temp*16,16,16,this.x*16+fgScrollXpos,this.y*16,16,16)
		draw.drawImage(imgBerry,this.color*16,temp*16,16,16,this.x*16+fgScrollXpos-512,this.y*16,16,16)
	}
	this.debug = function () {
		
		draw.fillStyle = this.debugColor[this.color]
		draw.fillRect(this.x*16+fgScrollXpos,this.y*16,16,16)
		draw.fillRect(this.x*16+fgScrollXpos-512,this.y*16,16,16)
		
		return "berrySprite(): x: " + this.x + "|y: " + this.y + "|color: " + this.debugColorNames[this.color]
	}
}

function koopa(x,y,colorId) {
	this.x = x
	this.y = y
	this.xSpeed = 1
	this.ySpeed = 0
	this.face = 1
	this.turningFrame = 0
	this.color = colorId%4 // Colors: Green, Red, Blue, Yellow
	this.debugColor = ["rgba(0,255,0,0.25)","rgba(255,0,0,0.25)","rgba(0,0,255,0.25)","rgba(255,255,0,0.25)"]
	this.debugColorNames = ["green","red","blue","yellow"]
	this.spriteSheet = [64,0,16] // Face left, empty, Face right
	this.stayOnLedge = [false,true,true,false]
	
	this.tick = function () {
		if (frames % 4) {
			var touch = collision(this.x,this.y,16,32)
			
			if (touch[0]) {
				this.face *= -1
				this.turningFrame = 8
			}
			this.x+=this.xSpeed*this.face
			if (this.x >= 512) {
				this.x -= 512
			}
			
			if(touch[1]) {
				this.ySpeed = 0
			} else {
				this.ySpeed = 1
			}
			this.y+=this.ySpeed*this.face
			
		}		
	}
	this.draw = function () {
		if (frames % 16 > 8 && this.turningFrame == 0) {
			draw.drawImage(imgKoopa,this.spriteSheet[this.face+1],this.color*32,16,32,fgScrollXpos+this.x,this.y,16,32)
			draw.drawImage(imgKoopa,this.spriteSheet[this.face+1],this.color*32,16,32,fgScrollXpos+this.x-512,this.y,16,32)
		} else {
			draw.drawImage(imgKoopa,this.spriteSheet[this.face+1]+16,this.color*32,16,32,fgScrollXpos+this.x,this.y,16,32)
			draw.drawImage(imgKoopa,this.spriteSheet[this.face+1]+16,this.color*32,16,32,fgScrollXpos+this.x-512,this.y,16,32)
		}
		
		if (this.turningFrame>0) {
			this.turningFrame--
			draw.drawImage(imgKoopa,this.spriteSheet[this.face+1]-16,this.color*32,16,32,fgScrollXpos+this.x,this.y,16,32)
			draw.drawImage(imgKoopa,this.spriteSheet[this.face+1]-16,this.color*32,16,32,fgScrollXpos+this.x-512,this.y,16,32)
		}
		

	}
	this.debug = function () {
	
		draw.fillStyle = this.debugColor[this.color]
		
		draw.fillRect(fgScrollXpos+this.x,this.y,16,32)
		draw.fillRect(fgScrollXpos+this.x-512,this.y,16,32)
		
		draw.fillStyle = "#FFFFFF"
		draw.font = "8px monospace"
		// X pos
		draw.fillText(this.x,fgScrollXpos+this.x+16,this.y+8)
		draw.fillText(this.x,fgScrollXpos+this.x+16-512,this.y+8)
		
		// Y pos
		draw.fillText(this.y,fgScrollXpos+this.x+16,this.y+16)
		draw.fillText(this.y,fgScrollXpos+this.x+16-512,this.y+16)

		// Face
		draw.fillStyle = "#FFFFFF"
		draw.beginPath()
		draw.moveTo(fgScrollXpos+this.x+8-512,this.y+8)
		draw.lineTo(fgScrollXpos+this.x+8-512+this.face*8,this.y+16)
		draw.lineTo(fgScrollXpos+this.x+8-512,this.y+24)
		draw.fill()
		
		draw.beginPath()
		draw.moveTo(fgScrollXpos+this.x+8,this.y+8)
		draw.lineTo(fgScrollXpos+this.x+8+this.face*8,this.y+16)
		draw.lineTo(fgScrollXpos+this.x+8,this.y+24)
		draw.fill()
		
		// Turning Frame
		draw.fillText(this.turningFrame,fgScrollXpos+this.x+16,this.y+24)
		draw.fillText(this.turningFrame,fgScrollXpos+this.x+16-512,this.y+24)
		
		return "koopa(): x: " + this.x + "|y: " + this.y + "|color: " + this.debugColorNames[this.color]
	}
}

function doNothing() {
	this.tick = function () {
	
	}
	this.draw = function () {
	
	}
	this.debug = function () {
		return "doNothing()"
	}
}

function hdma() {
	var temp = draw.createLinearGradient(0,0,0,height)
	var pointCount = arguments.length
	
	if (pointCount <= 1) {
		return arguments[0]
	}
	
	for (var i = 0; i < pointCount; i++) {
		temp.addColorStop(1/(pointCount-1)*i,arguments[i])
	}
	return temp
}

function debug() {
	// Draw collision
	draw.fillStyle = "rgba(255,0,255,0.25)"
	for (var i = 0; mapCollisionRects.length > i; i++) {
		var temp = mapCollisionRects[i]
		draw.fillRect(temp[0]+fgScrollXpos,temp[1],temp[2]-temp[0],temp[3]-temp[1])
		draw.fillRect(temp[0]+fgScrollXpos -512,temp[1],temp[2]-temp[0],temp[3]-temp[1])
	}
	
	// draw ObjectDebug data
	var x = 4
	var y = 8
	
	draw.shadowColor = "rgba(0,0,0,1)"
	draw.font = "8px monospace"
	
	for (var i = 0; i < objects.length; i++) {
		var temp = objects[i].debug()
		draw.fillStyle = "#FFFFFF"
		draw.fillText(i+">"+temp,x,y+i*8)
	}
	draw.shadowColor = "rgba(0,0,0,0)"
}

function collision(x,y,w,h) {
	var hColision = false
	var vColision = false
	for (var i = 0; mapCollisionRects.length > i; i++) {
		var c = mapCollisionRects[i]
		if ((	x == c[2] || x+w == c[0]) &&
				(	y+h <= c[3] && y >= c[1]
				)
			) {
			hColision = true
		}
		if (
				(	x+w >= c[0] &&	x <= c[2]	) &&
				(	y+h == c[1] ||	y == c[3]	)
			) {
			vColision = true
		}
	}
	return [hColision,vColision]
}

function textObject(x,y,text,color) {
	this.offsetX = x
	this.offsetY = y
	this.text = text
	this.special = ""
	this.color = color // moves the offset by 0x7F
	this.charCodes = []
	this.draw = function () {
		if (this.special == "time") {
			this.text = time()
		}
		this.charCodes = []
		for(var i = 0; this.text.length > i; i++) {
			var charPos = this.text.charCodeAt(i)
			var charPosCol = charPos % 16
			var charPosRow = (charPos-charPosCol)/16
			draw.drawImage(font,charPosCol*8,charPosRow*8+this.color*64,8,8,i*8+this.offsetX,this.offsetY,8,8)
			this.charCodes[i] = charPosCol+"|"+charPosRow
		}
	}
	this.tick = function (){
		
	}
	this.debug = function (){
		draw.fillStyle = "rgba(0,0,0,0.25)"
		draw.fillRect(this.offsetX,this.offsetY,this.text.length*8,8)
		return "textObject(): color: " + this.color + "|text.length: "+ this.text.length
	}
	if (this.text == "time") {
		this.special = "time"
	}
}

function time() {
	x = new Date()
	var hours = x.getHours()
	if (hours < 10) {
		hours = "0"+hours
	}
	var minutes = x.getMinutes()
	if (minutes < 10) {
		minutes = "0"+minutes
	}
	var seconds = x.getSeconds()
	if (seconds < 10) {
		seconds = "0"+seconds
	}
	
	
	
	return "\xFF"+hours+":"+minutes+":"+seconds
}

function starCluster() {
	this.starCount = 16+Math.floor(Math.random()*8)
	this.starSize = []
	this.starXpos = []
	this.starYpos = []
	this.starTileMap = [0,1,2,3,4,2,5,1] // Big star, medium star, small star tilemap, vertical
	
	this.tick = function () {}
	
	this.draw = function () {
		for (var i = 0; this.starCount > i; i++) {
			var frame = Math.floor(frames % 64 / 8)
			draw.drawImage(starsImg,this.starSize[i]*16,this.starTileMap[frame]*16,16,16,this.starXpos[i]*16+bgScrollXpos,this.starYpos[i]*16,16,16)
			draw.drawImage(starsImg,this.starSize[i]*16,this.starTileMap[frame]*16,16,16,this.starXpos[i]*16+bgScrollXpos-512,this.starYpos[i]*16,16,16)
		}
	}
	
	this.debug = function () {
		for (var i = 0; this.starCount > i; i++) {
			draw.fillStyle="rgba(255,255,255,0.25)"
			draw.fillText(this.starSize[i]+" ",this.starXpos[i]*16+bgScrollXpos,this.starYpos[i]*16)
			draw.fillText(this.starSize[i]+" ",this.starXpos[i]*16+bgScrollXpos-512,this.starYpos[i]*16)
		}
		return "starCluster(): starCount: "+this.starCount
	}
	
	for (var i = 0; this.starCount > i; i++) {
		this.starXpos[i] = Math.floor(Math.random()*32)
		this.starYpos[i] = Math.floor(Math.random()*8)
		this.starSize[i] = Math.floor(Math.random()*3)
	}
}

function layer1(img,x,y) {
	this.img = img
	this.x = x
	this.y = y
	this.tick = function() {
		this.x = fgScrollXpos
	}
	this.draw = function () {
		draw.drawImage(this.img,this.x,this.y)
		draw.drawImage(this.img,this.x-512,this.y)
	}
	this.debug = function () {
		return "layer1(): x: "+this.x+"|y: "+this.y
	}
}