import Stat from './Stat'

export default class Skill extends Stat {
	constructor({
		name,
		description,
		base,
		mods,
		score,
		parent,
		difficulty,
		specialties=[]
	}) {
		super({
			name,
			description,
			base,
			mods,
			score,
			parent
		})
		this.difficulty = difficulty
		this.specialties = specialties
	}
}