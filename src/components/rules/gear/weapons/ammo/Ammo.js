import CombatGear from '../../CombatGear'

export default class Ammo extends CombatGear {
	constructor({
		id,
		name,
		desc,
		sz,
		attr,
		cal=``,
		qty=null
	}) {
		super({
			id,
			name,
			desc,
			sz,
			attr
		})
		this.cal = cal
		this.qty = qty
	}
}