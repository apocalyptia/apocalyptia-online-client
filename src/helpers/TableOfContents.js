import * as sapper from '@sapper/app'

export class TableOfContents {
	constructor(root='', chapters=[]) {
		this.root = root,
		this.current = -1,
		this.chapters = chapters
	}
	go(index) {
		this.current = index
		sapper.goto(`/${this.root}/${this.chapters[index].toLowerCase()}`)
	}
	home() {
		sapper.goto(`/${this.root}`)
	}
	back() {
		this.current--
		if (this.current >= 0) {
			this.go(this.current)
		}
		else {
			this.reset()
			sapper.goto('/')
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
		this.current = -1
	}
}