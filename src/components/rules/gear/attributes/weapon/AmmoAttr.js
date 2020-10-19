import Attribute from 'gear/attributes/Attribute.js'

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