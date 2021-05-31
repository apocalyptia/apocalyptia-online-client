import Gear from '/src/classes/Gear.js'

export default class Accessory extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Accessory`,
		url,
		visibility
	}) {
		url = `/accessories/${name}`
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
