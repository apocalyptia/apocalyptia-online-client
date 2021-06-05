import Rule from '/src/classes/Rule.js'

export default class Property extends Rule {
	constructor({
		description,
		formula = [],
		name,
		type = `Property`,
		url
	}) {
		url = `/properties/${name}`
		super({
			description,
			name,
			type,
			url
		})
		this.formula = formula
	}
}
