import Stat from './Stat'

export default class Specialty extends Stat {
	constructor({
		name,
		description,
		base,
		mods,
		score
	}) {
		super({
			name,
			description,
			base,
			mods,
			score
		})
	}
}