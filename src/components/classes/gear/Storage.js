import Gear from './Gear'

export default class Storage extends Gear {
	constructor({
		name,
		desc,
		sz,
		slots
	}) {
		super({
			name,
			desc,
			sz
		})
		this.slots = slots
	}
}