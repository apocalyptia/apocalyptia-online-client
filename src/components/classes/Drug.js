import Gear from './Gear'

export default class Drug extends Gear {
	constructor({
		name,
		description,
		sz,
		mix,
		overdose
	}) {
		super({
			name,
			description,
			sz
		})
		this.mix = mix
		this.overdose = overdose
	}
}