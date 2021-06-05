import urlFormat from '/src/utils/text/urlFormat.js'

export default class Rule {
	constructor({
		description = [],
		id = ``,
		name = ``,
		type = `Rule`,
		url = ``
	}) {
		this.description = description
		this.id = id
		this.name = name
		this.type = type
		this.url = urlFormat(`/manual${url}`)
	}
}
