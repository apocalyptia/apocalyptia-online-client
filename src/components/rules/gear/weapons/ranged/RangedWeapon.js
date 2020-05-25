import Weapon from '../Weapon'

export default class RangedWeapon extends Weapon {
	constructor({
		id,
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
			id,
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