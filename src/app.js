import {Vector, Rectangle, CanvasSpace, Form, Const, Line, Curve} from 'ptjs';
import LerpObj from './lerpObj';
import Maths from './maths';
const GLOBAL = 20;
const NUMBER = 100;
const LINES = 25;
const MULTIPLY = 6;
const OFFSET_LINE = 25;

document.addEventListener('DOMContentLoaded', function(){ 
    
    let canvas = document.getElementById('stage');	
	let download = document.getElementById('download');	
	let space = new CanvasSpace("stage").setup( {bgcolor: "black", resize : true} );
	let form = new Form(space);
	form.fill(false);

	let unit, center;
	let pts = [], lines = [];
	let point, x, y, multiply, lerpX, lerpY, update, curve, points = [], line;
	let lineNumber, pointNumber, randomAltitude;
	
	let setupPoints = () => {
		lines = [];
		points = [];
		for (let j = 0; j < lineNumber; j++) {
			pts = [];
			randomAltitude = Maths.randomFloor(0.5,1.5);
			for (let i = 0 ; i < pointNumber; i++) {
				if (i > Math.round(0.3*pointNumber) && i < Math.round(0.7*pointNumber)) {
					multiply = 1*MULTIPLY*randomAltitude;
					update = true;
				}
				else {
					multiply = 0.5;
					update = false;
				}

				x = (center.x - pointNumber*unit.x/2) + unit.x * i;
				y = (center.y - OFFSET_LINE * lineNumber / 2)- Math.abs(Math.random() * multiply) * unit.y + j * OFFSET_LINE;
				
				if (i === 0 || i === pointNumber-1) {
					y = (center.y - OFFSET_LINE * lineNumber / 2)+ j * OFFSET_LINE;
				}
				
				
				lerpX = new LerpObj(x);
				lerpY = new LerpObj(y);

				pts.push({x: lerpX, y: lerpY, multiply : multiply});
			}	
			lines.push(pts);
		}
	}
	
	
	let lineLength;
	space.add( {
	  animate: function ( time, fps, context ) {
		let i = 0;
		points = [];
		for(i; i < lineNumber; i++) {
			line = lines[i];
			points[i] = [];
			lineLength = line.length;
			let j = 0;
			for (j; j < lineLength; j++) {
				point = line[j];
				point.y.update(0.1);
				point.y.wiggle(point.multiply);
				points[i].push(new Vector(point.x.current, point.y.current));
			}
			curve = new Curve().to(points[i]);
			form.fill( "black" ).stroke( "white", 2 ).polygon(curve.cardinal(10, 0.4), false);	
		}
	  }
	});

	download.addEventListener('click',() => {
		window.open(canvas.toDataURL("image/png"),'_blank');
	});
	
	let resize = () => {
		lineNumber = Math.round(window.innerHeight * LINES / 1200);
		pointNumber = Math.round(window.innerWidth * NUMBER / 1500);
		unit = space.size.$divide(GLOBAL*pointNumber/15);
		center = space.size.$divide(2);
		setupPoints();
	};

	resize();

	space.bindMouse();
	space.bindTouch();
	space.play();

	window.addEventListener('resize', resize);	
}, false);


