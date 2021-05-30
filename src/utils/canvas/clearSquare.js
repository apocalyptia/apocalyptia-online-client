export default (map, square) => {
	map.context.beginPath()
	map.context.fillRect(square.x, square.y, square.w, square.h)
	map.context.stroke()
}
