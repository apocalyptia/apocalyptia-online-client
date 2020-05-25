import Stat from '../Stat'

export default class Skill extends Stat {
	constructor({
		id,
		name,
		desc,
		base,
		mods,
		score,
		diff,
		specs={},
		parent=``
	}) {
		super({
			id,
			name,
			desc,
			base,
			mods,
			score
		})
		this.diff = diff
		this.specs = specs
		this.parent = parent
	}
}