import Rule from '/src/classes/Rule.js'

export default class Core extends Rule {
	constructor({
		description,
		name,
		type = `Core`,
		url
	}) {
		url = `/core/${name}`
		super({
			description,
			name,
			type,
			url
		})
	}
}
