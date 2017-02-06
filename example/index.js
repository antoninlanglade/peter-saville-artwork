import {Vector, Rectangle, CanvasSpace, Form, Const, Line, Curve} from 'ptjs';

const GLOBAL = 20;
const NUMBER = 100;
const LINES = 30;
const OFFSET_LINE = 20;
(function() {
   		
	var space = new CanvasSpace("stage").setup( {bgcolor: "black", resize : true} );
	var form = new Form( space );
	form.fill(false);
	
	//// 2. Create Elements
	var unit = space.size.$divide(GLOBAL*NUMBER/15);
	var center = space.size.$divide(2);
	
	var tension = 0.5;
	var tensionStep = 0;

	// cardinal curve points
	var pts = [], lines = [];
	var point, x, y, multiply;
	for (let j = 0; j < LINES; j++) {
		pts = [];
		for (var i = 0 ; i < NUMBER ; i++) {
			if (i > Math.round(0.3*NUMBER) && i < Math.round(0.7*NUMBER)) {
				multiply = 4;
			}
			else {
				multiply = 1;
			}

			x = (center.x - NUMBER*unit.x/2) + unit.x * i;
			y = (center.y - OFFSET_LINE * LINES / 2)- Math.abs(Math.random() * 2 * multiply) * unit.y + j * OFFSET_LINE;
			
			if (i === 0 || i === NUMBER-1) {
				y = (center.y - OFFSET_LINE * LINES / 2)+ j * OFFSET_LINE;
			}
			
			point = new Vector(x, y);
			pts.push(point);
		}	
		lines.push(pts);
	}
	

	console.log(pts);

	var curve = null; 

	//// 3. Visualize, Animate, Interact
	space.add( {
	  animate: function ( time, fps, context ) {
	    
	    // cardinal curve tension
	    tensionStep++;
	    tension = 0.5 + 0.5 * Math.sin( tensionStep % 360 * Const.deg_to_rad );

	    // draw cardinal curve
	    for (let j = 0; j < LINES; j++) {
	    	curve = new Curve().to(lines[j]);
	    	form.fill( "black" ).stroke( "white", 2 ).polygon(curve.cardinal(10, 0.4), false);	
	    }
	
	  },

	  onMouseAction: function ( type, x, y, evt ) {
	    // var d = space.size.$divide( 2 ).subtract( x, y );

	    // var angle = Const.two_pi * (d.y / (unit.y * 5));

	    // calculate curve amplitude by sine wave
	    // for (var i = 0; i < pts.length; i++) {
	    //   // sizes[i] = Math.sin( angle + i * Const.half_pi ) * unit.x * (i / pts.length);
	    // }
	  },

	  onTouchAction: function(type, x, y, evt) {
	    this.onMouseAction( type, x, y );
	  }
	});

	// 4. Start playing
	space.bindMouse();
	space.bindTouch();
	space.play();
})();