import Rule from './Rule'

export default class Stat extends Rule {
	constructor({
		id,
		name,
		desc,
		formula,
		score=0
	}) {
		super({
			id,
			name,
			desc,
			formula
		})
		this.score = score
	}
}