import Gear from './Gear'

export default class Electronic extends Gear {
	constructor ({
		name,
		hours,
		description,
		sz
	}) {
		super({
			name,
			description,
			sz
		})
		this.hours = hours
	}
}