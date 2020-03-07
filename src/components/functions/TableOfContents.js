import * as sapper from '@sapper/app'

export default class TableOfContents {
	constructor({
		currentIndex=0,
		endAddress='/',
		label='',
		pages=[],
		pageNames=[],
		startAddress='/',
		startIndex=0
	}) {
		this.currentIndex = currentIndex
		this.endAddress = endAddress
		this.label = label
		this.pages = pages
		this.pageNames = pageNames
		this.startAddress = startAddress
		this.startIndex = startIndex
	}
	back() {
		this.currentIndex--
		if (
			this.currentIndex >= this.startIndex &&
			this.currentIndex < this.pages.length
		) {
			this.go(this.currentIndex)
		}
		if (this.currentIndex < this.startIndex) {
			this.currentIndex = this.startIndex
			sapper.goto('/')
		}
		if (this.currentIndex > this.pages.length) {
			this.go(this.endAddress)
		}
	}
	go(index) {
		this.currentIndex = index
		let destination = this.pageNames[index]
		if (destination.includes('_1')) destination = destination.slice(0, -2)
		sapper.goto(`${this.startAddress}/${destination}`)
	}
	home() {
		this.reset()
		sapper.goto(this.endAddress)
	}
	next() {
		this.currentIndex++
		if (this.currentIndex < this.pages.length) this.go(this.currentIndex)
		else this.home()
	}
	reset() {
		this.currentIndex = this.startIndex
	}
	translate(slug) {
		console.log(slug)
		console.log(this)
		for(let i = 0; i < this.pages.length; i++) {
			if (this.pageNames[i] == slug) {
				this.currentIndex = i
				break
			}
			else {
				this.currentIndex = 0
			}
		}
		console.log(this.pagesNames[this.currentIndex])
	}
}