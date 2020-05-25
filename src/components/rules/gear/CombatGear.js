import Gear from './Gear'

export default class CombatGear extends Gear {
	constructor({
		id,
		name,
		desc,
		sz,
		attr=[]
	}) {
		super({
			id,
			name,
			desc,
			sz
		})
		this.attr = attr
	}
}