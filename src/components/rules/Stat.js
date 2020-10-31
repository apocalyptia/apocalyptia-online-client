import Rule from 'rules/Rule.js'

export default class Stat extends Rule {
	constructor({
		desc,
		formula,
		id,
		name,
		score=0,
		type=`Stat`
	}) {
		super({
			id,
			name,
			desc,
			formula,
			type
		})
		this.score = score
	}
}