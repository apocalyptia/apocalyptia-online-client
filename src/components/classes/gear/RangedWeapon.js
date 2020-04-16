import Weapon from './Weapon'

export default class RangedWeapon extends Weapon {
	constructor({
		name,
		description,
		sz,
		dmg,
		rng,
		attributes,
		cap,
		cal
	}) {
		super({
			name,
			description,
			sz,
			dmg,
			rng,
			attributes
		})
		this.cap = cap
		this.cal = cal
	}
}