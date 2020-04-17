import Gear from './Gear'

export default class Equipment extends Gear {
	constructor({
		name,
		desc,
		sz
	}) {
		super({
			name,
			desc,
			sz
		})
	}
}