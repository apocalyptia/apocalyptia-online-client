import Rule from '/src/classes/Rule.js'

export default class Status extends Rule {
	constructor({
		description,
		name,
		type = `Status`,
		url
	}) {
		url = `/status/${name}`
		super({
			description,
			name,
			type,
			url
		})
	}
}
