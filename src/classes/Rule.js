import urlFormat from '/src/utils/text/urlFormat.js'

export default class Rule {
	constructor({
		desc = [],
		id = ``,
		name = ``,
		type = `Rule`,
		url = ``,
		visible = false
	}) {
		this.desc = desc
		this.id = id
		this.name = name
		this.type = type
		this.visible = visible
		this.url = urlFormat(`/manual${url}`)
	}
}
