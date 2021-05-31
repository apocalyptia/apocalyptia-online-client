import Gear from '/src/classes/Gear.js'

export default class Medical extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Medical`,
		url,
		visibility
	}) {
		url = `/medical/${name}`
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
