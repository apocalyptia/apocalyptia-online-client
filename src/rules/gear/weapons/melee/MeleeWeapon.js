import Weapon from '../Weapon'

export default class MeleeWeapon extends Weapon {
	constructor({
		id,
		name,
		desc,
		sz,
		qty,
		dmg,
		rng,
		attr
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
	}
}