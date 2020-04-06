import Stat from './Stat'

export default class Property extends Stat {
	constructor({
		name,
		description,
		formula,
		score,
		parent=``
	}) {
		super({
			name,
			description,
			formula,
		})
		this.score = score
		this.parent = parent
	}
}