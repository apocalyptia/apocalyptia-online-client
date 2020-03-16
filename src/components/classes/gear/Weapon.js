import Gear from './Gear'

export default class Weapon extends Gear {
	constructor({
		name,
		description,
		sz,
		dmg,
		rng,
		attributes
	}) {
		super({
			name,
			description,
			sz
		})
		this.dmg = dmg
		this.rng = rng
		this.attributes = attributes
	}
}