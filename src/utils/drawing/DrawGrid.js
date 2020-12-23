export default (map, dash, color) => {
	map.ctx.strokeStyle = color
	if (dash) map.ctx.setLineDash(dash)
	for (let r = 0; r < map.rows; r++) {
		map.ctx.moveTo(0, (r * map.squareW()))
		map.ctx.lineTo(map.w, (r * map.squareW()))
		map.ctx.stroke()
	}
	map.ctx.moveTo(0, map.h)
	map.ctx.lineTo(map.w, map.h)
	map.ctx.stroke()
	for (let c = 0; c < map.cols; c++) {
		map.ctx.moveTo((c * (map.w / map.cols)), 0)
		map.ctx.lineTo((c * (map.w / map.cols)), map.h)
		map.ctx.stroke()
	}
	map.ctx.moveTo(map.w, 0)
	map.ctx.lineTo(map.w, map.h)
	map.ctx.stroke()
	return map
}