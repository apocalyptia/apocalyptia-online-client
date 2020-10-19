import Gear from 'gear/CombatGear.js'

export default class Accessory extends Gear {
	constructor({
		id,
		name,
		desc,
		sz,
		qty
	}) {
		super({
			id,
			name,
			desc,
			sz,
			qty
		})
	}
}