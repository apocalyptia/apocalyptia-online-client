import Gear from '../../Gear'

export default class Electronic extends Gear {
	constructor ({
		id,
		name,
		hrs,
		desc,
		sz
	}) {
		super({
			id,
			name,
			desc,
			sz
		})
		this.hrs = hrs
	}
}