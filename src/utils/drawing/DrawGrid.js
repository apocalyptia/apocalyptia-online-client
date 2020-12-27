export default (map) => {

	map.ctx.beginPath()
	map.ctx.fillStyle = 'black'
	map.ctx.fillRect(0, 0, map.canvas.width,map.canvas.height)
	map.ctx.stroke()

	map.square = Math.round(50 * (map.mag * 1))
	map.canvas.height = Math.round(map.pixelSize())
	map.canvas.width = Math.round(map.pixelSize())

	map.ctx.strokeStyle = map.color

	if (map.dashPattern) map.ctx.setLineDash(map.dashPattern)

	for (let r = 0; r < map.gridSize; r++) {
		map.ctx.beginPath()
		map.ctx.moveTo(0, (r * map.square))
		map.ctx.lineTo(map.pixelSize(), (r * map.square))
		map.ctx.stroke()
	}
	map.ctx.beginPath()
	map.ctx.moveTo(0, map.pixelSize())
	map.ctx.lineTo(map.pixelSize(), map.pixelSize())
	map.ctx.stroke()

	for (let c = 0; c < map.gridSize; c++) {
		map.ctx.beginPath()
		map.ctx.moveTo((c * map.square), 0)
		map.ctx.lineTo((c * map.square), map.pixelSize())
		map.ctx.stroke()
	}
	map.ctx.beginPath()
	map.ctx.moveTo(map.pixelSize(), 0)
	map.ctx.lineTo(map.pixelSize(), map.pixelSize())
	map.ctx.stroke()

}