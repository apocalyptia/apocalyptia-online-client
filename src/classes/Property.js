import Rule from '/src/classes/Rule.js'

export default class Property extends Rule {
	constructor({
		desc,
		formula = [],
		name,
		type = `Property`,
		url,
		visible
	}) {
		url = `/properties/${name}`
		super({
			desc,
			name,
			type,
			visible,
			url
		})
		this.formula = formula
	}
}
