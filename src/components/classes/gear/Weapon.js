import CombatGear from './CombatGear'

export default class Weapon extends CombatGear {
	constructor({
		name,
		description,
		sz,
		attributes,
		dmg,
		rng
	}) {
		super({
			name,
			description,
			sz,
			attributes
		})
		this.dmg = dmg
		this.rng = rng
	}
}