import Gear from '../../Gear'

export default class Drug extends Gear {
	constructor({
		id,
		name,
		desc,
		sz,
		qty,
		mix,
		od
	}) {
		super({
			id,
			name,
			desc,
			sz,
			qty
		})
		this.mix = mix
		this.od = od
	}
}