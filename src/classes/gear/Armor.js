import Gear from '/src/classes/Gear.js'

export default class Armor extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Armor`,
		url,
		visibility
	}) {
		url = `/armor/${name}`
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
