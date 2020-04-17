import Stat from './Stat'

export default class Skill extends Stat {
	constructor({
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