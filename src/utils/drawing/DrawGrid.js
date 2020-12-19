import DrawSquare from 'utils/drawing/DrawSquare.js'

export default (ctx, rows, cols, square, color) => {
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			DrawSquare({
				ctx,
				'x': c * square.w,
				'y': r * square.h,
				'w': square.w,
				'h': square.h,
				'c': color
			})
		}
	}
}