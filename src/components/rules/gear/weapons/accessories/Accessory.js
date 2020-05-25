import Gear from '../../Gear'

export default class Accessory extends Gear {
	constructor({
		id,
		name,
		desc,
		sz
	}) {
		super({
			id,
			name,
			desc,
			sz
		})
	}
}