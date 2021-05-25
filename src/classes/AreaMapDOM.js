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
				if (this.contents[r][c].name === term) {
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