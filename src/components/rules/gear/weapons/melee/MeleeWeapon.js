import Weapon from '../Weapon'

export default class MeleeWeapon extends Weapon {
	constructor({
		name,
		desc,
		sz,
		dmg,
		rng,
		attr
	}) {
		super({
			name,
			desc,
			sz,
			dmg,
			rng,
			attr
		})
	}
}