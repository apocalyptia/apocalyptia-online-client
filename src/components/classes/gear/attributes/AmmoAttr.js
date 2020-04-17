import Attribute from './Attribute'

export default class AmmoAttr extends Attribute {
	constructor({
		name,
		desc,
		cal
	}) {
		super({
			name,
			desc
		})
		this.cal = cal
	}
}