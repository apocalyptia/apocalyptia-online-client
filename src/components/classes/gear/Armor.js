import CombatGear from './CombatGear'

export default class Armor extends CombatGear {
	constructor({
		name,
		desc,
		sz,
		attr,
		dr,
		loc
	}) {
		super({
			name,
			desc,
			sz,
			attr
		})
		this.dr = dr
		this.loc = loc
	}
}