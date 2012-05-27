(function( $ ){
	$.fn.qrcode = function(options) {
		// if options is string, 
		if( typeof options === 'string' ){
			options	= { text: options };
		}

		// set default values
		// typeNumber < 1 for automatic calculation
		options	= $.extend( {}, {
			render		: "canvas",
			width		: 512,
			height		: 512,
			typeNumber	: -1,
			correctLevel	: QRErrorCorrectLevel.H,
                        background      : "#ffff00",
                        foreground      : "#47008F"
		}, options);

		var createCanvas	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();

			// create canvas element
			var canvas	= document.createElement('canvas');
			canvas.width	= options.width;
			canvas.height	= options.height;
			var ctx		= canvas.getContext('2d');

			// compute tileW/tileH based on options.width/options.height
			var tileW	= options.width  / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the canvas
			for( var row = 0; row < qrcode.getModuleCount(); row++ ){
				for( var col = 0; col < qrcode.getModuleCount(); col++ ){
				    var num = qrcode.drawNumber(row, col);
				    var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
				    var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
				    var x = Math.round(col*tileW);
				    var y = Math.round(row*tileH);
				    var scp = 1.5; //short control point distance
				    var lcp = 18; //long control point distance
				    ctx.fillStyle = options.background;
				    ctx.fillRect(x,y,w,h);
				    ctx.fillStyle = options.foreground;
				    ctx.beginPath();
				    if (num%32 == 1) {
					ctx.arc(x+tileW/2, y+tileH/2, tileW/2, 0, Math.PI*2);
					ctx.fill();
				    }
				    else if (num == 2 || num == 258 || num == 130 || num == 386) {
					ctx.moveTo(x,y);
					ctx.bezierCurveTo(x+scp, y, x+scp, y+tileH, x, y+tileH);
					ctx.lineTo(x,y);
					//					ctx.fill();
				    }
				    else if (num%32 == 11 || num%32 == 15 || num%32 == 21 || num%32 == 23 || num%32==27 || num%32 == 29 || num%32 == 31) {
					ctx.fillRect(x,y,w,h);
				    }
				    else if (num%32 == 3) {
					ctx.moveTo(x,y);
					ctx.bezierCurveTo(x+lcp, y, x+lcp, y+tileH, x, y+tileH);
					ctx.lineTo(x,y);
					ctx.fill();
				    }
				    else if (num == 4 || num == 36 || num == 260 || num == 292) {
					ctx.moveTo(x,y+tileH);
					ctx.bezierCurveTo(x+scp, y+tileH-scp, x+tileW-scp, y+tileH-scp, x+tileW, y+tileH);
					ctx.lineTo(x,y);
					//					ctx.fill();
				    }
				    else if (num%32 == 5) {
					ctx.moveTo(x,y+tileH);
					ctx.bezierCurveTo(x, y+tileH-lcp, x+tileW, y+tileH-lcp, x+tileW, y+tileH);
					ctx.lineTo(x, y+tileH);
					ctx.fill();
				    }
				    else if (num == 8 || num == 40 || num == 72 || num == 104) {
					ctx.moveTo(x+tileW,y);
					ctx.bezierCurveTo(x+tileW-scp, y, x+tileW-scp, y+tileH, x+tileW, y+tileH);
					ctx.lineTo(x+tileW,y);
					//					ctx.fill();
				    }
				    else if (num%32 == 9) {
					ctx.moveTo(x+tileW,y);
					ctx.bezierCurveTo(x+tileW-lcp, y, x+tileW-lcp, y+tileH, x+tileW, y+tileH);
					ctx.lineTo(x+tileW,y);
					ctx.fill();
				    }
				    else if (num == 16 || num == 80 || num == 144 || num == 208) {
					ctx.moveTo(x,y);
					ctx.bezierCurveTo(x, y+lcp, x+tileW, y+lcp, x+tileW, y);
					ctx.lineTo(x,y);
					ctx.fill();
				    } 
				    else if (num%32 == 17) {
					ctx.moveTo(x,y);
					ctx.bezierCurveTo(x, y+lcp, x+tileW, y+lcp, x+tileW, y);
					ctx.lineTo(x,y);
					ctx.fill();
				    }
				    else if (num%32 == 19) {
					ctx.moveTo(x, y+tileH);
					ctx.bezierCurveTo(x+tileW*(3/4), y+tileH, x+tileW, y+tileH*(3/4), x+tileW, y);
					ctx.lineTo(x, y);
					ctx.lineTo(x, y+tileH);
					ctx.fill();
				    }
				    else if (num%32 == 25) {
					ctx.moveTo(x, y);
					ctx.bezierCurveTo(x, y+tileH*(3/4), x+tileW*(1/4), y+tileH, x+tileW, y+tileH);
					ctx.lineTo(x+tileW, y);
					ctx.lineTo(x, y);
					ctx.fill();
				    }
				    else if (num%32 == 13) {
					ctx.moveTo(x, y + tileH);
					ctx.bezierCurveTo(x, y+tileH*(1/4), x+tileW*(1/4), y, x+tileW, y);
					ctx.lineTo(x+tileW, y+tileH);
					ctx.lineTo(x, y+tileH);
					ctx.fill();
				    }
				    else if (num%32 == 7) {
					ctx.moveTo(x,y);
					ctx.bezierCurveTo(x+tileW*(3/4), y, x+tileW, y+tileH*(1/4), x+tileW, y+tileH);
					ctx.lineTo(x, y+tileH);
					ctx.lineTo(x,y);
					ctx.fill();
				    }
				    else if (num%64 == 50) {
					ctx.moveTo(x, y + tileH);
					ctx.bezierCurveTo(x, y+tileH*(1/4), x+tileW*(1/4), y, x+tileW, y);
					ctx.lineTo(x,y);
					ctx.lineTo(x, y+tileH);
					ctx.fill();
				    }
				    else if (num > 256 && num%32 == 24) {
					ctx.moveTo(x,y);
					ctx.bezierCurveTo(x+tileW*(3/4), y, x+tileW, y+tileH*(1/4), x+tileW, y+tileH);
					ctx.lineTo(x+tileW, y);
					ctx.lineTo(x,y);
					ctx.fill();
				    }
				    else if (num%32 == 12 && num%128 != num%256 && num >128) {
					ctx.moveTo(x, y+tileH);
					ctx.bezierCurveTo(x+tileW*(3/4), y+tileH, x+tileW, y+tileH*(3/4), x+tileW, y);
					ctx.lineTo(x+tileW, y+tileH);
					ctx.lineTo(x, y+tileH);
					ctx.fill();
				    }
				    else if (num%32==6 && num%64 != num%128 && num>64) {
					ctx.moveTo(x, y);
					ctx.bezierCurveTo(x, y+tileH*(3/4), x+tileW*(1/4), y+tileH, x+tileW, y+tileH);
					ctx.lineTo(x, y+tileH);
					ctx.lineTo(x, y);
					ctx.fill();
				    }
				}	
				ctx.fillStyle = options.background;
				ctx.fillRect(options.width*(3/8), options.height*(3/8), options.width*(1/4), options.height*(1/4));
			}
			// return just built canvas
			return canvas;
		}

		// from Jon-Carlos Rivera (https://github.com/imbcmdth)
		var createTable	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();
			
			// create table element
			var $table	= $('<table></table>')
				.css("width", options.width+"px")
				.css("height", options.height+"px")
				.css("border", "0px")
				.css("border-collapse", "collapse")
				.css('background-color', options.background);
		  
			// compute tileS percentage
			var tileW	= options.width / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the table
			for(var row = 0; row < qrcode.getModuleCount(); row++ ){
				var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);
				
				for(var col = 0; col < qrcode.getModuleCount(); col++ ){
					$('<td></td>')
						.css('width', tileW+"px")
						.css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
						.appendTo($row);
				}	
			}
			// return just built canvas
			return $table;
		}
  

		return this.each(function(){
			var element	= options.render == "canvas" ? createCanvas() : createTable();
			jQuery(element).appendTo(this);
		});
	};
})( jQuery );
