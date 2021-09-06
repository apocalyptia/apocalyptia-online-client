import Rule from '/src/classes/Rule.js'

export default class Need extends Rule {
	constructor({
		description,
		name,
		subrules,
		type = `Need`,
		url
	}) {
		url = `/needs/${name}`
		super({
			description,
			name,
			subrules,
			type,
			url
		})
	}
}
