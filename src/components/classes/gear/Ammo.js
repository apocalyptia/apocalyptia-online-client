import CombatGear from './CombatGear'

export default class Ammo extends CombatGear {
	constructor({
		name,
		description,
		sz,
		attributes,
		cal=``,
		qty=0
	}) {
		super({
			name,
			description,
			sz,
			attributes
		})
		this.cal = cal
		this.qty = qty
	}
}