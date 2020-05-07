import Rule from './Rule'

export default class Stat extends Rule {
	constructor({
		name,
		desc,
		formula,
		score=0
	}) {
		super({
			name,
			desc,
			formula
		})
		this.score = score
	}
}