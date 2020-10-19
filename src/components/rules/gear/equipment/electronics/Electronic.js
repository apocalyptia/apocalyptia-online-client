import Gear from 'gear/Gear.js'

export default class Electronic extends Gear {
	constructor ({
		id,
		name,
		hrs,
		desc,
		sz,
		qty
	}) {
		super({
			id,
			name,
			desc,
			sz,
			qty
		})
		this.hrs = hrs
	}
}