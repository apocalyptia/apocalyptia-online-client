import Gear from '/src/classes/Gear.js'

export default class Misc extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Misc`,
		url,
		visibility
	}) {
		url = `/misc/${name}`
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
