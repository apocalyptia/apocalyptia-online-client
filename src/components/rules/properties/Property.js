import Stat from '../Stat'

export default class Property extends Stat {
	constructor({
		name,
		desc,
		formula,
		score,
		parent=``
	}) {
		super({
			name,
			desc,
			formula,
		})
		this.score = score
		this.parent = parent
	}
}