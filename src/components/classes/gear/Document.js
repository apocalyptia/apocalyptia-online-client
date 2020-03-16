import Gear from './Gear'

export default class Document extends Gear {
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