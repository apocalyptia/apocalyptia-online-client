import Gear from './Gear'

export default class Ammo extends Gear {
	constructor({
		name,
		description,
		sz,
		cal,
		type
	}) {
		super({
			name,
			description,
			sz
		})
		this.cal = cal
		this.type = type
	}
}