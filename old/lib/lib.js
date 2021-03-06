//HTML elements functions
function s(x){
    return document.querySelector(x)
};
function css(x,y){
    return window.getComputedStyle(x).getPropertyValue(y);
};
HTMLElement.prototype.setProps = function(obj){
	if(obj){
		let keys = obj.getKeys();
		for(let i of keys){
			this[i] = obj[i];
		}
	}
};
function fullscreen(el){
	if(el.webkitRequestFullScreen) {
		el.webkitRequestFullScreen();
	}
	else {
		el.mozRequestFullScreen();
	}            
}
HTMLElement.prototype.setStyle = function(obj){
	if(obj){
		let keys = obj.getKeys();
		for(let i of keys){
			this.style[i] = obj[i];
		}
	}
};
HTMLElement.prototype.setAttr = function(obj){
	if(obj){
		let keys = obj.getKeys();
		for(let i of keys){
			this.setAttribute(i,obj[i]);
		}
	}
};
function createElm(type,obj){
	if(type){
		let elm = document.createElement(type);
		if(obj.attribute){
			elm.setAttr(obj.attribute);
		};
		if(obj.property){
			elm.setProps(obj.property);
		};
		if(obj.style){
			elm.setStyle(obj.style);
		}
		return elm;
	}
};

//Strings functions
function small(x){
    return x.toLowerCase()
};
function big(x){
    return x.toUpperCase()
};
function jsonS(x){
	return JSON.stringify(x);
};
function jsonP(x){
	return JSON.parse(x);
};


//Maths functions
function getCords(R,r,X,Y,angle){
	var x=(R-r)*Math.cos(rad(angle))+X;
	var y=(R-r)*Math.sin(rad(angle))+Y;	
	var cords=new Object();
		cords.x=x;
		cords.y=y;	
	return cords;
};
function rad(x){
    return (Math.PI/180)*x;
};
function deg(x){
    return (180/Math.PI)*x;
};
function dist(xa,ya,xb,yb){return Math.sqrt(((xb-xa)**2)+((yb-ya)**2))};
function slope(x1,y1,x2,y2){
	var diffY = (y2-y1),
		diffX = (x2-x1);
	return deg(Math.atan2((diffY),(diffX)));
};
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
};
function map_range(inMin, inMax, outMin, outMax) {
	return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};
function root(n){return Math.sqrt(n)};
function sin(n){return Math.sin(n)};
function cos(n){return Math.cos(n)};
function tan(n){return Math.tan(n)};
function cosec(n){return 1/sin(n)};
function sec(n){return 1/cos(n)};
function cot(n){return 1/tan(n)};
function random(x,y){
	return x+Math.random()*(y-x);
}
//Vectors
function Vector(x,y){
	this.x = x || 0;
	this.y = y || 0;	
	//Operators:
	this.add = function(v){		
		return new Vector(this.x+v.x,this.y+v.y);
	};
	this.sub = function(v){
		return new Vector(this.x-v.x,this.y-v.y);
	};
	this.mult = function(v){
		if(v instanceof Vector){
			return new Vector(this.x*v.x,this.y*v.y);
		}else {
			return new Vector(this.x*v,this.y*v);
		}
	};
	this.div = function(v){
		if(v instanceof Vector){
			return new Vector(this.x/v.x,this.y/v.y);
		}else {
			return new Vector(this.x/v,this.y/v);
		}
	};
	this.dot = function(v) {
		return this.x * v.x + this.y * v.y;
	};
	//Properties:
	this.magSq = function(){
		return	(this.x**2) + (this.y**2);
	};
	this.mag = function(){
		return Math.sqrt(this.magSq());
	};
	this.heading = function(){
		return Math.atan2(this.y,this.x);
	};
	this.dir = this.heading;
	//Controls
	this.unit = function() {
		return this.div(this.mag());
	};
	this.normalize = function(){
		return this.unit();
	}
	this.setMag = function(m){
		return this.unit().mult(m);
	};
	this.invert = function(){
		return new Vector(-this.x,-this.y);
	};
	this.limit = function(lim){
		var a = this;
		if(this.mag() >= lim){
			a = this.setMag(lim);
		}
		return a;
	};
	this.set = function(x,y){
		x = x || this.x || 0;
		y = y || this.y || 0;
		this.x = x;
		this.y = y;
	};
	this.setHeading = function(a){
		let m = this.mag();
		this.x = m*Math.cos(a);
		this.y = m*Math.sin(a);
		return this;
	};
	this.rotate = function(a){
		let newHeading = this.heading() + a,
			mag = this.mag();		
		return new Vector(Math.cos(newHeading) * mag,Math.sin(newHeading) * mag);
	};
	this.lerp = function(x,y,amt){
		if (x instanceof p5.Vectortor) {
			return this.lerp(x.x, x.y, x.z, y);
		}
		var x = this.x + (x - this.x) * amt || 0;
		var y = this.y + (y - this.y) * amt || 0;
		return new Vector(x,y);
	}
	//Utils
	this.equal = function(v){
		return this.x == v.x && this.y == v.y;
	};
	this.toStr = function() {
		return `[${this.x},${this.y}]`;
	};
	this.copy = function(v){
		return new Vector(v.x,v.y);
	};
}
function vectorFromAngle(angle,length){
  	if(typeof length === 'undefined') {
    	length = 1;
 	}
  	return new Vector(length*Math.cos(angle),length*Math.sin(angle));
};
function randomVector(len){
	return vectorFromAngle(rad(Math.random()*360),len || 1);
}
function circle_collision(x1,y1,r1,x2,y2,r2){
	var circle1 = {radius:r1,x:x1,y:y1};
	var circle2 = {radius:r2,x:x2,y:y2};
	var dx = circle1.x - circle2.x;
	var dy = circle1.y - circle2.y;
	var distance = Math.sqrt(dx * dx + dy * dy);

	if (distance < circle1.radius + circle2.radius) {
		return true;
	}else {
		return false;
	}
}

//Canvas functions
CanvasRenderingContext2D.prototype.line=function(x1,y1,x2,y2,color,width,dashed,dashArr){
	var ctx=this;
	ctx.beginPath();
		var c = color || "black";
		var w = width || 1;
		ctx.strokeStyle = c;
		ctx.lineWidth = w;
		if(dashed){
			ctx.setLineDash(dashArr || [5,2])
		}
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.stroke();
		ctx.setLineDash([0,0])
	ctx.closePath();
};
CanvasRenderingContext2D.prototype.box = function(x,y,w,h,c,str){
	ctx.beginPath();
	if(str){
		ctx.strokeStyle = c || "black";
		ctx.rect(x,y,w,h);
		ctx.stroke();
	}else {
		ctx.fillStyle = c || "black";
		ctx.fillRect(x,y,w,h);
	}
	ctx.closePath();
};
CanvasRenderingContext2D.prototype.circle = function(x,y,r,start,end,color,width,dashed,dashArr){
	var ctx=this;
	ctx.beginPath();
		var c = color || "black";
		var w = width || 1;
		ctx.strokeStyle = c;
		ctx.lineWidth = w;
		if(dashed){
			ctx.setLineDash(dashArr || [5,2])
		}
		ctx.arc(x,y,r,start,end);
		ctx.stroke();
		ctx.setLineDash([0,0])
	ctx.closePath();
}

//Objects and array functions
Object.prototype.getKeys = function(){
	return Object.getOwnPropertyNames(this);
};
Object.prototype.getValues = function(){
	let keys = this.getKeys();
	let arr = [];
	for(let n of keys){arr.push(this[n])};
	return arr;
};
Array.prototype.max = function() {
	return Math.max.apply(null,this);
};
Array.prototype.min = function() {
	return Math.min.apply(null, this);
};
Array.prototype.randomItem = function(){
	return this[Math.floor(Math.random()*this.length)];
};
Object.prototype.randomItem = function(){
	let keys = this.getValues();
	return keys.randomItem();
};
