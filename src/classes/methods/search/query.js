import searchEngine from '/src/utils/searching/searchEngine.js'

export default function() {
	this.results = searchEngine({
		term: this.term,
		list: this.list,
	})
	if (this.term.length === 0 && this.results.length === 0) {
		this.results = this.defaultResults()
	}
	return this
}