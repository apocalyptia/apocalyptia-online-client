import CombatGear from '../CombatGear'

export default class Weapon extends CombatGear {
	constructor({
		id,
		name,
		desc,
		sz,
		attr,
		dmg,
		rng
	}) {
		super({
			id,
			name,
			desc,
			sz,
			attr
		})
		this.dmg = dmg
		this.rng = rng
	}
}