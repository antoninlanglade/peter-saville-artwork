import {Vector, Rectangle, CanvasSpace, Form, Const, Line, Curve} from 'ptjs';
import LerpObj from './lerpObj';

const GLOBAL = 20;
const NUMBER = 100;
const LINES = 30;
const OFFSET_LINE = 20;

document.addEventListener('DOMContentLoaded', function(){ 
    let canvas = document.getElementById('stage');	
	let download = document.getElementById('download');	
	let space = new CanvasSpace("stage").setup( {bgcolor: "black", resize : true} );
	let form = new Form( space );
	form.fill(false);

	let unit = space.size.$divide(GLOBAL*NUMBER/15);
	let center = space.size.$divide(2);
	console.log(space.size);

	let tension = 0.5;
	let tensionStep = 0;

	let pts = [], lines = [];
	let point, x, y, multiply, lerpX, lerpY, update;
	for (let j = 0; j < LINES; j++) {
		pts = [];
		for (let i = 0 ; i < NUMBER ; i++) {
			if (i > Math.round(0.3*NUMBER) && i < Math.round(0.7*NUMBER)) {
				multiply = 8;
				update = true;
			}
			else {
				multiply = 1;
				update = false;
			}

			x = (center.x - NUMBER*unit.x/2) + unit.x * i;
			y = (center.y - OFFSET_LINE * LINES / 2)- Math.abs(Math.random() * multiply) * unit.y + j * OFFSET_LINE;
			
			if (i === 0 || i === NUMBER-1) {
				y = (center.y - OFFSET_LINE * LINES / 2)+ j * OFFSET_LINE;
			}
			
			
			lerpX = new LerpObj(x);
			lerpY = new LerpObj(y);

			pts.push({x: lerpX, y: lerpY, multiply : multiply});
		}	
		lines.push(pts);
	}



	let curve = null; 
	let points = [], line;

	space.add( {
	  animate: function ( time, fps, context ) {
	   		
		for(let i = 0; i < LINES; i++) {
			line = lines[i];
			points[i] = [];
			line.forEach((point) => {
				point.y.update(0.1);
				point.y.wiggle(point.multiply);
				points[i].push(new Vector(point.x.current, point.y.current));
			});
		}
		
	    // draw cardinal curve
	    for (let j = 0; j < LINES; j++) {
	    	curve = new Curve().to(points[j]);
	    	form.fill( "black" ).stroke( "white", 2 ).polygon(curve.cardinal(10, 0.3), false);	
	    }

	  }
	});

	// 4. Start playing
	space.bindMouse();
	space.bindTouch();
	space.play();

	download.addEventListener('click',() => {
		window.open(canvas.toDataURL("image/png"),'_blank');
	});
}, false);

