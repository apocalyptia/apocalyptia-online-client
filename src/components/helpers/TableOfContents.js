import * as sapper from '@sapper/app'

class TableOfContents {
	constructor(name='', root='/', chapters=[], modules=[]) {
		this.name = name,
		this.root = root,
		this.chapters = chapters,
		this.modules = modules,
		this.starting = -1,
		this.current = this.starting
	}
	go(index) {
		this.current = index
		sapper.goto(`${this.root}/${this.chapters[index].toLowerCase()}`)
	}
	home() {
		this.reset()
		sapper.goto(this.root)
	}
	back() {
		this.current--
		if (this.current >= 0) {
			this.go(this.current)
		}
		else {
			this.reset()
			sapper.goto(this.root)
		}
	}
	next() {
		this.current++
		if (this.current < this.chapters.length) {
			this.go(this.current)
		}
		else {
			this.home()
			this.reset()
		}
	}
	reset() {
		this.current = this.starting
	}
}

export default TableOfContents