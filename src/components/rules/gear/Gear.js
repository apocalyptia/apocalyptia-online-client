import Rule from 'rules/Rule.js'

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