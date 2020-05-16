import Gear from '../../GearList'

export default class Drug extends Gear {
	constructor({
		name,
		desc,
		sz,
		mix,
		od
	}) {
		super({
			name,
			desc,
			sz
		})
		this.mix = mix
		this.od = od
	}
}