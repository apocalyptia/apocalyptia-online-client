import CombatGear from './CombatGear'

export default class Armor extends CombatGear {
	constructor({
		name,
		description,
		sz,
		attributes,
		dr,
		location
	}) {
		super({
			name,
			description,
			sz,
			attributes
		})
		this.dr = dr
		this.location = location
	}
}