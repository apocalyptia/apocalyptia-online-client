import Weapon from './Weapon'

export default class RangedWeapon extends Weapon {
	constructor({
		name,
		description,
		sz,
		dmg,
		rng,
		attributes,
		mag,
		cal,
		reg
	}) {
		super({
			name,
			description,
			sz,
			dmg,
			rng,
			attributes
		})
		this.mag = mag
		this.cal = cal
		this.reg = reg
	}
}