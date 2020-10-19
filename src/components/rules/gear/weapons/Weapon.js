import CombatGear from 'gear/CombatGear.js'

export default class Weapon extends CombatGear {
	constructor({
		id,
		name,
		desc,
		sz,
		qty,
		attr,
		dmg,
		rng
	}) {
		super({
			id,
			name,
			desc,
			sz,
			qty,
			attr
		})
		this.dmg = dmg
		this.rng = rng
	}
}