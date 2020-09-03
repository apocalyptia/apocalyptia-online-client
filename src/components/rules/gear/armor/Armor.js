import CombatGear from '../CombatGear'

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