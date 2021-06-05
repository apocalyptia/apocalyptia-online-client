import Rule from '/src/classes/Rule.js'

export default class Creation extends Rule {
	constructor({
		description,
		name,
		step,
		type = `Creation`,
		url
	}) {
		url = `/creation/${name}`
		super({
			description,
			name,
			type,
			url
		})
		this.step = step
	}
}
