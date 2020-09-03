import Weapon from '../Weapon'

export default class RangedWeapon extends Weapon {
	constructor({
		id,
		name,
		desc,
		sz,
		qty,
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
			qty,
			dmg,
			rng,
			attr
		})
		this.cap = cap
		this.cal = cal
	}
}