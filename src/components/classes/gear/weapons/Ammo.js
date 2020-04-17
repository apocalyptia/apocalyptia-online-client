import CombatGear from '../CombatGear'

export default class Ammo extends CombatGear {
	constructor({
		name,
		desc,
		sz,
		attr,
		cal=``,
		qty=0
	}) {
		super({
			name,
			desc,
			sz,
			attr
		})
		this.cal = cal
		this.qty = qty
	}
}