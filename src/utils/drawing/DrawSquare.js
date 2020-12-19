export default (options) => {          
	const { ctx, x, y, w, h, f } = options
	ctx.strokeStyle = f
	ctx.setLineDash([1, 6])
	ctx.strokeRect(x, y, w, h)
}