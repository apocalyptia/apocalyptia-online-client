import Rule from '/src/classes/Rule.js'

export default class Creation extends Rule {
	constructor({
		desc,
		name,
		step,
		type = `Creation`,
		url,
		visible
	}) {
		url = `/creation/${name}`
		super({
			desc,
			name,
			type,
			url,
			visible
		})
		this.step = step
	}
}
