import Stat from './Stat'

export default class Trait extends Stat {
	constructor({
		name,
		description,
		base=1,
		mods,
		score=1
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