import CombatGear from '../CombatGear'

export default class Weapon extends CombatGear {
	constructor({
		name,
		desc,
		sz,
		attr,
		dmg,
		rng
	}) {
		super({
			name,
			desc,
			sz,
			attr
		})
		this.dmg = dmg
		this.rng = rng
	}
}