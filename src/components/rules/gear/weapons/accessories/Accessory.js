import Gear from '../../Gear'

export default class Accessory extends Gear {
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