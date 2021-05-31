import Rule from '/src/classes/Rule.js'

export default class Creation extends Rule {
	constructor({
		desc,
		name,
		step,
		type = `Creation`,
		url
	}) {
		url = `/creation/${name}`
		super({
			desc,
			name,
			type,
			url
		})
		this.step = step
	}
}
