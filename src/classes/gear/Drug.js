import Gear from '/src/classes/Gear.js'

export default class Drug extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Drug`,
		url,
		visibility
	}) {
		url = `/drugs/${name}`
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
