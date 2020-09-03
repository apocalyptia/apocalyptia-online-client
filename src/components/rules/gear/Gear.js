import Rule from '../Rule'

export default class Gear extends Rule {
	constructor({
		id,
		name,
		desc,
		sz,
		qty=0
	}) {
		super({
			id,
			name,
			desc
		})
		this.sz = sz
		this.qty = qty
	}
}