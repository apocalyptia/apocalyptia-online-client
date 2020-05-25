import Stat from '../Stat'

export default class Specialty extends Stat {
	constructor({
		id,
		name,
		desc,
		base,
		mods,
		score
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