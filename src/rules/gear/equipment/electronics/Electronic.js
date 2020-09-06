import Gear from '../../Gear'

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