import Gear from '../../Gear'

export default class Storage extends Gear {
	constructor({
		id,
		name,
		desc,
		sz,
		qty,
		slots
	}) {
		super({
			id,
			name,
			desc,
			sz,
			qty
		})
		this.slots = slots
	}
}