import Rule from '$classes/Rule.js'

export default class Property extends Rule {
	constructor({
		description,
		formula = [],
		name,
		subrules,
		type = `Property`,
		url
	}) {
		url = `/properties/${name}`
		super({
			description,
			name,
			subrules,
			type,
			url
		})
		this.formula = formula
	}
}
