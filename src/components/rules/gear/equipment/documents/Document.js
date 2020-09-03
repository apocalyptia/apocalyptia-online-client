import Gear from '../../Gear'

export default class Document extends Gear {
	constructor({
		id,
		name,
		desc,
		sz,
		qty
	}) {
		super({
			id,
			name,
			desc,
			sz,
			qty
		})
	}
}