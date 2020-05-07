import Rule from '../Rule'

export default class Maneuver extends Rule {
	constructor({
		name,
		desc,
		formula,
		cat
	}) {
		super({
			name,
			desc,
			formula
		})
		this.cat = cat
	}
}