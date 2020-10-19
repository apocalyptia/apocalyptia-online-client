import Stat from 'rules/Stat.js'

export default class Property extends Stat {
	constructor({
		id,
		name,
		desc,
		formula,
		score,
		parent=``
	}) {
		super({
			id,
			name,
			desc,
			formula,
		})
		this.score = score
		this.parent = parent
	}
}