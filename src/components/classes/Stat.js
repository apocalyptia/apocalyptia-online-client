import Rule from './Rule'

export default class Stat extends Rule {
	constructor({
		name,
		description,
		formula,
		score=0
	}) {
		super({
			name,
			description,
			formula
		})
		this.score = score
	}
}