import Gear from './Gear'

export default class CombatGear extends Gear {
	constructor({
		name,
		desc,
		sz,
		attr=[]
	}) {
		super({
			name,
			desc,
			sz
		})
		this.attr = attr
	}
}