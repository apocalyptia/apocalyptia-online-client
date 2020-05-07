import Gear from '../../Gear'

export default class Electronic extends Gear {
	constructor ({
		name,
		hrs,
		desc,
		sz
	}) {
		super({
			name,
			desc,
			sz
		})
		this.hrs = hrs
	}
}