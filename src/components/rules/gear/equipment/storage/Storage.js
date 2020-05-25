import Gear from '../../Gear'

export default class Storage extends Gear {
	constructor({
		id,
		name,
		desc,
		sz,
		slots
	}) {
		super({
			id,
			name,
			desc,
			sz
		})
		this.slots = slots
	}
}