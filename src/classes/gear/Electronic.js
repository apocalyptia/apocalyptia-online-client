import Gear from '/src/classes/Gear.js'

export default class Electronic extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Electronic`,
		url,
		visibility
	}) {
		url = `/electronics/${name}`
		super({
			desc,
			id,
			name,
			type,
			url,
			visibility
		})
		this.attr = attr
		this.qty = qty
		this.sz = sz
	}
}
