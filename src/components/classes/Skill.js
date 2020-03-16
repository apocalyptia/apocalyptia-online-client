import Stat from './Stat'

export default class Skill extends Stat {
	constructor({
		name,
		description,
		base,
		mods,
		score,
		difficulty,
		specialties=[],
		parent=``
	}) {
		super({
			name,
			description,
			base,
			mods,
			score
		})
		this.difficulty = difficulty
		this.specialties = specialties
		this.parent = parent
	}
}