import { writable } from 'svelte/store'

const createMatrix = map => {
	for (let r = 0; r < map.rows; r++) {
		map.contents.push([])
		for (let c = 0; c < map.cols; c++) {
			map.contents[r].push([])
		}
	}
	map.ready = true
	return map
}

export const mapStore = writable({
	ctx: null,
	contents: [],
	rows: 50,
	cols: 50,
	x: 0,
	y: 0,
	w: 2000,
	h: 2000,
	width: 2000,
	height: 2000,
	ready: false,
	magnification: 100,
	create() {
		return createMatrix(this)
	},
	squareW() {
		return this.w / this.cols
	},
	squareH() {
		return this.h / this.rows
	},
	zoom() {
		// this.w = this.width * (this.magnification * 0.01)
		// this.h = this.height * (this.magnification * 0.01)
		this.ctx.scale(this.magnification * 0.01, this.magnification * 0.01)
		return this
	}
})