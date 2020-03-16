import Gear from './Gear'

export default class Equipment extends Gear {
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