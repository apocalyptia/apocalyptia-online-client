import capitalize from '/src/utils/text/capitalize.js'
import searchEngine from '/src/utils/searching/searchEngine.js'
import urlFormat from '/src/utils/text/urlFormat.js'
import { writable } from 'svelte/store'

class SearchStore {
	constructor() {
		;(this.term = ''),
			(this.list = {}),
			(this.baseUrl = ''),
			(this.defaultResults = () => {
				const resultsList = Object.entries(this.list).map((rule) => {
					let result = {}
					if (rule[1].name !== undefined) {
						result.name = rule[1].name
					} else {
						result.name = capitalize(rule[0])
					}
					if (rule[1].url !== undefined) {
						result.url = rule[1].url
					} else if (Object.values(rule[1])[0].url !== undefined) {
						result.url = Object.values(rule[1])[0].url.slice(0, Object.values(rule[1])[0].url.lastIndexOf('/'))
					} else {
						result.url = urlFormat(`/manual/${rule[0]}`)
					}
					return result
				})
				return resultsList
			}),
			(this.results = this.defaultResults()),
			(this.query = () => {
				this.results = searchEngine({
					term: this.term,
					list: this.list,
				})
				if (this.term.length === 0 && this.results.length === 0) {
					this.results = this.defaultResults()
				}
			})
	}
}

const searchStore = new SearchStore()

export default writable(searchStore)
