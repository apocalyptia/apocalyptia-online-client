import Gear from '../../Gear'

export default class Document extends Gear {
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