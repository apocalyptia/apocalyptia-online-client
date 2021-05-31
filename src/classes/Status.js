import Rule from '/src/classes/Rule.js'

export default class Status extends Rule {
	constructor({
		desc,
		name,
		type = `Status`,
		url
	}) {
		url = `/status/${name}`
		super({
			desc,
			name,
			type,
			url
		})
	}
}
