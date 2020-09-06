import Attribute from '../Attribute'

export default class AmmoAttr extends Attribute {
	constructor({
		id,
		name,
		desc,
		cal
	}) {
		super({
			id,
			name,
			desc
		})
		this.cal = cal
	}
}