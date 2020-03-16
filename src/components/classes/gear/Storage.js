import Gear from './Gear'

export default class Storage extends Gear {
	constructor({
		name,
		description,
		sz,
		slots
	}) {
		super({
			name,
			description,
			sz
		})
		this.slots = slots
	}
}