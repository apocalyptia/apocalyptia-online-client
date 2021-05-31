import Gear from '/src/classes/Gear.js'

export default class Projectile extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Projectile`,
		url,
		visibility
	}) {
		url = `/projectile/${name}`
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
