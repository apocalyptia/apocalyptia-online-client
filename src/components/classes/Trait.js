import Stat from './Stat'

export default class Trait extends Stat {
	constructor({
		name,
		desc,
		base=1,
		mods,
		score=1
	}) {
		super({
			name,
			desc,
			base,
			mods,
			score
		})
	}
}