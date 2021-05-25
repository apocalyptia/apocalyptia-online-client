import DrawGrid from '/src/utils/canvas/DrawGrid.js'

export default class AreaMapCanvas {
	constructor(
		canvas = null,
		context = null,
		contents = [],
		magnification = 1.0,
		gridSize = 20,
		defaultSquare = 50,
		currentSquare = 50,
		dashPattern = [2,2],
		color = 'rgb(0,255,0)'
	) {
		this.canvas = canvas
		this.context = context
		this.contents = contents
		this.magnification = magnification
		this.gridSize = gridSize
		this.startingSquare = defaultSquare
		this.currentSquare = currentSquare
		this.dashPattern = dashPattern
		this.color = color
		this.init = (canvas) => {
			this.canvas = canvas || null
			this.context = this.canvas.getContext('2d') || null
			this.canvas.width = this.pixelSize() || null
			this.canvas.height = this.pixelSize() || null
			if (canvas) DrawGrid(this)
			this.fillContents()
			return this
		}
		this.pixelSize = () => this.gridSize * this.currentSquare
		this.fillContents = () => {
			for (let r = 0; r < this.gridSize; r++) {
				this.contents.push([])
				for (let c = 0; c < this.gridSize; c++) {
					this.contents[r].push(
						[
							{
								x: c * this.currentSquare,
								y: r * this.currentSquare,
								w: this.currentSquare,
								h: this.currentSquare,
								m: false
							}
						]
					)
				}
			}
			return this
		}
		this.redraw = () => {
			DrawGrid(this)
			for (let r = 0; r < this.gridSize; r++) {
				for (let c = 0; c < this.gridSize; c++) {
					this.contents[r][c].x = c * this.currentSquare
					this.contents[r][c].y = r * this.currentSquare
					this.contents[r][c].w = this.currentSquare
					this.contents[r][c].h = this.currentSquare
					this.contents[r][c].m = false
				}
			}
			return this
		}
		this.mark = (r, c) => {
			this.contents[r][c].m =! this.contents[r][c].m
			return this
		}
	}
}