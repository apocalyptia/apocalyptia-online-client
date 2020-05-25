import Gear from '../../Gear'

export default class Medical extends Gear {
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