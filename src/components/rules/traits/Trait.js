import Stat from '../Stat'

export default class Trait extends Stat {
	constructor({
		id,
		name,
		desc,
		base=1,
		mods,
		score=1
	}) {
		super({
			id,
			name,
			desc,
			base,
			mods,
			score
		})
	}
}