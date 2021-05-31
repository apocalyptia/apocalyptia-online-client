import Gear from '/src/classes/Gear.js'

export default class Melee extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Melee`,
		url,
		visibility
	}) {
		url = `/melee/${name}`
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
