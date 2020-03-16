import Stat from './Stat'

export default class Property extends Stat {
	constructor({
		name,
		description,
		formula,
		base,
		mods,
		score,
		parent=``
	}) {
		super({
			name,
			description,
			formula,
			mods
		})
		this.base = base
		this.score = score
		this.parent = parent
	}
}