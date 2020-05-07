import Stat from '../Stat'

export default class Specialty extends Stat {
	constructor({
		name,
		desc,
		base,
		mods,
		score
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