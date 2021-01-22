import Rule from '$classes/Rule.js'

export default class Gear extends Rule {
	constructor({
		attr=[],
		desc,
		id,
		name,
		qty=0,
		sz=0,
		type=`Gear`
	}) {
		super({
			desc,
			id,
			name,
			type
		})
		this.attr = attr
		this.qty = qty
		this.sz = sz
	}
}