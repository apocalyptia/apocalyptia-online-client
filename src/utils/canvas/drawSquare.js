export default (options) => {
	const { ctx, x, y, width, height, color, dash } = options
	ctx.strokeStyle = color
	if (dash) ctx.setLineDash(dash)
	ctx.strokeRect(x, y, width, height)
}
