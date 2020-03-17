import Weapon from './Weapon'

export default class RangedWeapon extends Weapon {
	constructor({
		name,
		description,
		sz,
		dmg,
		rng,
		attributes,
		cal,
		mag
	}) {
		super({
			name,
			description,
			sz,
			dmg,
			rng,
			attributes
		})
		this.cal = cal
		this.mag = mag
	}
}