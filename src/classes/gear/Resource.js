import Gear from '/src/classes/Gear.js'

export default class Resource extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Resource`,
		url,
		visibility
	}) {
		url = `/resources/${name}`
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
