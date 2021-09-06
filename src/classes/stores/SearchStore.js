import query from '/src/classes/methods/search/query.js'
import defaultResults from '/src/classes/methods/search/defaultResults.js'

export default class {
	constructor() {
		this.term = ''
		this.list = {}
		this.baseUrl = ''
		this.defaultResults = defaultResults
		this.results = []
		this.query = query
	}
}