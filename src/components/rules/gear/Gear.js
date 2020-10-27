import Rule from 'rules/Rule.js'

export default class Gear extends Rule {
	constructor({
		id,
		name,
		desc,
		attr=[],
		qty=0,
		sz=0,
		type='Gear'
	}) {
		super({
			id,
			name,
			desc
		})
		this.attr = attr
		this.qty = qty
		this.sz = sz
		this.type = type
	}
}