import Gear from './Gear'

export default class Accessory extends Gear {
	constructor({
		name,
		description,
		sz
	}) {
		super({
			name,
			description,
			sz
		})
	}
}