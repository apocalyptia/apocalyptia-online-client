import Gear from './Gear'

export default class CombatGear extends Gear {
	constructor({
		id,
		name,
		desc,
		sz,
		qty,
		attr=[]
	}) {
		super({
			id,
			name,
			desc,
			sz,
			qty
		})
		this.attr = attr
	}
}