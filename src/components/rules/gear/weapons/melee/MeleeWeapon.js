import Weapon from 'gear/weapons/Weapon.js'

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