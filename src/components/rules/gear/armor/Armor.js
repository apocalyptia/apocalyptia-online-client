import CombatGear from 'gear/CombatGear.js'

export default class Armor extends CombatGear {
	constructor({
		name,
		desc,
		sz,
		qty,
		attr,
		dr,
		loc
	}) {
		super({
			name,
			desc,
			sz,
			qty,
			attr
		})
		this.dr = dr
		this.loc = loc
	}
}