import Weapon from './Weapon'

export default class MeleeWeapon extends Weapon {
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
			sz,
			dmg,
			rng,
			attributes
		})
	}
}