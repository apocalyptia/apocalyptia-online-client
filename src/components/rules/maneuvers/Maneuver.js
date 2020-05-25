import Rule from '../Rule'

export default class Maneuver extends Rule {
	constructor({
		id,
		name,
		desc,
		formula,
		cat
	}) {
		super({
			id,
			name,
			desc,
			formula
		})
		this.cat = cat
	}
}