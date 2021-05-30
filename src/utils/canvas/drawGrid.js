// function drawGrid(map) {
// 	// Clear canvas
// 	map.context.beginPath()
// 	map.context.fillRect(0, 0, map.canvas.width, map.canvas.height)
// 	map.context.stroke()

// 	// Resize canvas to current map magnification
// 	map.currentSquare = Math.round(map.startingSquare * map.magnification)
// 	map.canvas.height = Math.round(map.pixelSize())
// 	map.canvas.width = Math.round(map.pixelSize())

// 	// Set stroke styles
// 	map.context.strokeStyle = map.color
// 	if (map.dashPattern) map.context.setLineDash(map.dashPattern)

// 	// Draw rows
// 	for (let r = 0; r < map.gridSize; r++) {
// 		const rPoint = r * map.currentSquare
// 		map.context.beginPath()
// 		map.context.moveTo(0, rPoint)
// 		map.context.lineTo(map.pixelSize(), rPoint)
// 		map.context.stroke()
// 	}
// 	map.context.beginPath()
// 	map.context.moveTo(0, map.pixelSize())
// 	map.context.lineTo(map.pixelSize(), map.pixelSize())
// 	map.context.stroke()

// 	// Draw columns
// 	for (let c = 0; c < map.gridSize; c++) {
// 		const cPoint = c * map.currentSquare
// 		map.context.beginPath()
// 		map.context.moveTo(cPoint, 0)
// 		map.context.lineTo(cPoint, map.pixelSize())
// 		map.context.stroke()
// 	}
// 	map.context.beginPath()
// 	map.context.moveTo(map.pixelSize(), 0)
// 	map.context.lineTo(map.pixelSize(), map.pixelSize())
// 	map.context.stroke()
// }

// export default drawGrid
