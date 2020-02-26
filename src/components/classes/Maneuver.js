import Rule from './Rule'

export default class Maneuver extends Rule {
	constructor({
		name,
		description,
		formula,
		category
	}) {
		super({
			name,
			description,
			formula
		})
		this.category = category
	}
}