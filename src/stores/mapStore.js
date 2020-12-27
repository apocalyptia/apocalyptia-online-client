import { writable } from 'svelte/store'
import DrawGrid from 'utils/drawing/DrawGrid.js'

class MapStore {
	constructor(
		canvas = null,
		ctx = null,
		contents = [],
		mag = 1,
		gridSize = 50,
		square = 50,
		dashPattern = [2,2],
		color = 'rgb(0,255,0)'
	) {
		this.canvas = canvas
		this.ctx = ctx
		this.contents = contents
		this.mag = mag
		this.gridSize = gridSize
		this.square = square
		this.dashPattern = dashPattern
		this.color = color
	}
	pixelSize() {
		return this.gridSize * this.square
	}
	fillContents() {
		for (let r = 0; r < this.gridSize; r++) {
			this.contents.push([])
			for (let c = 0; c < this.gridSize; c++) {
				this.contents[r].push([0])
			}
		}
	}
	redraw() {
		DrawGrid(this)
		return this
	}
	init(canvas) {
		this.canvas = canvas || null
		this.ctx = this.canvas.getContext('2d') || null
		this.canvas.width = this.pixelSize() || null
		this.canvas.height = this.pixelSize() || null
		if (canvas) DrawGrid(this)
		this.fillContents()
		return this
	}
}

export const mapStore = writable(new MapStore())