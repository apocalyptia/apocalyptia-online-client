import Rule from '/src/classes/Rule.js'

export default class Property extends Rule {
	constructor({
		desc,
		formula = [],
		name,
		type = `Property`,
		url
	}) {
		url = `/properties/${name}`
		super({
			desc,
			name,
			type,
			url
		})
		this.formula = formula
	}
}
