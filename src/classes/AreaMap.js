export class AreaMapDOM {
	constructor(
		gridRows = 100,
		gridColumns = 100,
		startingCellSize = 50,
		currentCellSize = 50,
		magnification = 1,
		contents = []
	) {
		this.gridRows = gridRows
		this.gridColumns = gridColumns
		this.startingCellSize = startingCellSize
		this.currentCellSize = currentCellSize
		this.magnification = magnification
		this.contents = contents
	}
	getStartingMapHeight() {
		return this.gridRows * this.startingCellSize
	}
	getStartingMapWidth() {
		return this.gridColumns * this.startingCellSize
	}
	getCurrentMapHeight() {
		return this.gridRows * this.currentCellSize
	}
	getCurrentMapWidth() {
		return this.gridColumns * this.currentCellSize
	}
	setCurrentMapHeight(mapHeight) {
		this.currentCellSize = mapHeight / this.gridRows
		return this
	}
	setCurrentMapWidth(mapWidth) {
		this.currentCellSize = mapWidth / this.gridColumns
		return this
	}
	setCurrentMapSize(mapWidth, mapHeight) {
		this.setCurrentMapWidth(mapWidth)
		this.setCurrentMapHeight(mapHeight)
		return this
	}


	fillContents() {
		for (let r = 0; r < this.gridSize; r++) {
			this.contents.push([])
			for (let c = 0; c < this.gridSize; c++) {
				this.contents[r].push(
					[
						{
							x: c * this.currentCellSize,
							y: r * this.currentCellSize,
							m: false
						}
					]
				)
			}
		}
		return this
	}
	findItem(term) {
		for (let r = 0; r < this.gridSize; r++) {
			for (let c = 0; c < this.gridSize; c++) {
				if (this.contents[r][c].name == term) {
					return this.contents[r][c]
				}
			}
		}
	}
	mark(r, c) {
		this.contents[r][c].m =! this.contents[r][c].m
		return this
	}
}



// import DrawGrid from 'utils/canvas/DrawGrid.js'
//
// class AreaMapCanvas {
// 	constructor(
// 		canvas = null,
// 		context = null,
// 		contents = [],
// 		magnification = 1,
// 		gridSize = 100,
// 		defaultSquare = 50,
// 		currentSquare = 50,
// 		dashPattern = [2,2],
// 		color = 'rgb(0,255,0)'
// 	) {
// 		this.canvas = canvas
// 		this.context = context
// 		this.contents = contents
// 		this.magnification = magnification
// 		this.gridSize = gridSize
// 		this.startingSquare = defaultSquare
// 		this.currentSquare = currentSquare
// 		this.dashPattern = dashPattern
// 		this.color = color
// 	}
// 	pixelSize() {
// 		return this.gridSize * this.currentSquare
// 	}
// 	fillContents() {
// 		for (let r = 0; r < this.gridSize; r++) {
// 			this.contents.push([])
// 			for (let c = 0; c < this.gridSize; c++) {
// 				this.contents[r].push(
// 					[
// 						{
// 							x: c * this.currentSquare,
// 							y: r * this.currentSquare,
// 							w: this.currentSquare,
// 							h: this.currentSquare,
// 							m: false
// 						}
// 					]
// 				)
// 			}
// 		}
// 		return this
// 	}
// 	redraw() {
// 		DrawGrid(this)
// 		for (let r = 0; r < this.gridSize; r++) {
// 			for (let c = 0; c < this.gridSize; c++) {
// 				this.contents[r][c].x = c * this.currentSquare
// 				this.contents[r][c].y = r * this.currentSquare
// 				this.contents[r][c].w = this.currentSquare
// 				this.contents[r][c].h = this.currentSquare
// 				this.contents[r][c].m = false
// 			}
// 		}
// 		return this
// 	}
// 	init(canvas) {
// 		this.canvas = canvas || null
// 		this.context = this.canvas.getContext('2d') || null
// 		this.canvas.width = this.pixelSize() || null
// 		this.canvas.height = this.pixelSize() || null
// 		if (canvas) DrawGrid(this)
// 		this.fillContents()
// 		return this
// 	}
// 	mark(r, c) {
// 		this.contents[r][c].m =! this.contents[r][c].m
// 		return this
// 	}
// }