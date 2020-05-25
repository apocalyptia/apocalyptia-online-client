import Gear from '../../Gear'

export default class Drug extends Gear {
	constructor({
		id,
		name,
		desc,
		sz,
		mix,
		od
	}) {
		super({
			id,
			name,
			desc,
			sz
		})
		this.mix = mix
		this.od = od
	}
}