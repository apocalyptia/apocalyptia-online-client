import Gear from '/src/classes/Gear.js'

export default class Wearable extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Wearable`,
		url,
		visibility
	}) {
		url = `/wearables/${name}`
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
