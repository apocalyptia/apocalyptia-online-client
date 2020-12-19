export default (options) => {          
	const { ctx, x, y, w, h, c } = options
	ctx.strokeStyle = c
	ctx.setLineDash([1, 6])
	ctx.strokeRect(x, y, w, h)
}