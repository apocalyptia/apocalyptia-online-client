import Gear from '/src/classes/Gear.js'

export default class Tool extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Tool`,
		url,
		visibility
	}) {
		url = `/tools/${name}`
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
