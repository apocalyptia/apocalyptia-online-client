import Rule from '/src/classes/Rule.js'

export default class Need extends Rule {
	constructor({
		description,
		name,
		type = `Need`,
		url
	}) {
		url = `/need/${name}`
		super({
			description,
			name,
			type,
			url
		})
	}
}
