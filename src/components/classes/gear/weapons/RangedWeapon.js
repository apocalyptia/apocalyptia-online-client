import Weapon from './Weapon'

export default class RangedWeapon extends Weapon {
	constructor({
		name,
		desc,
		sz,
		dmg,
		rng,
		attr,
		cap,
		cal
	}) {
		super({
			name,
			desc,
			sz,
			dmg,
			rng,
			attr
		})
		this.cap = cap
		this.cal = cal
	}
}