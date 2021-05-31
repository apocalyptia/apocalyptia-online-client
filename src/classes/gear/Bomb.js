import Gear from '/src/classes/Gear.js'

export default class Bomb extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Bomb`,
		url,
		visibility
	}) {
		url = `/bombs/${name}`
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
