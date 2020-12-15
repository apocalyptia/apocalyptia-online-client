<script>
	import DrawHexGrid from 'utils/drawing/DrawHexGrid.js'
	import DrawHexagon from 'utils/drawing/DrawHexagon.js'
	import { onMount } from 'svelte'

	// onMount(_ => {
	// 	(function(){
	// 		let canvas = document.getElementById('hexmap');

	// 		let hexHeight,
	// 			hexRadius,
	// 			hexRectangleHeight,
	// 			hexRectangleWidth,
	// 			hexagonAngle = 0.523598776, // 30 degrees in radians
	// 			sideLength = 36,
	// 			boardWidth = 10,
	// 			boardHeight = 10;

	// 		hexHeight = Math.sin(hexagonAngle) * sideLength;
	// 		hexRadius = Math.cos(hexagonAngle) * sideLength;
	// 		hexRectangleHeight = sideLength + 2 * hexHeight;
	// 		hexRectangleWidth = 2 * hexRadius;

	// 		if (canvas.getContext){
	// 			var ctx = canvas.getContext('2d');

	// 			ctx.fillStyle = "#000000";
	// 			ctx.strokeStyle = "#CCCCCC";
	// 			ctx.lineWidth = 1;

	// 			DrawBoard(ctx, boardWidth, boardHeight);

	// 			canvas.addEventListener("mousemove", function(eventInfo) {
	// 				var x,
	// 					y,
	// 					hexX,
	// 					hexY,
	// 					screenX,
	// 					screenY;

	// 				x = eventInfo.offsetX || eventInfo.layerX;
	// 				y = eventInfo.offsetY || eventInfo.layerY;

	// 				hexY = Math.floor(y / (hexHeight + sideLength));
	// 				hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);

	// 				screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
	// 				screenY = hexY * (hexHeight + sideLength);

	// 				ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 				DrawBoard(ctx, boardWidth, boardHeight);

	// 				// Check if the mouse's coords are on the board
	// 				if(hexX >= 0 && hexX < boardWidth) {
	// 					if(hexY >= 0 && hexY < boardHeight) {
	// 						ctx.fillStyle = "#000000";
	// 						DrawHexagon(ctx, screenX, screenY, true);
	// 					}
	// 				}
	// 			});
	// 		}

	// 		DrawBoard()

	// 		DrawHexagon()

	// 	})()
	// })
</script>


<canvas id="hexmap" width="660" height="624"></canvas>


<style>
	canvas { 
		position: absolute;
		top: var(--square);
		border:0;
		display:block;
		margin:0 auto;
	}
</style>