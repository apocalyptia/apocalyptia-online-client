import Gear from '/src/classes/Gear.js'
import swapOrder from '/src/utils/text/swapOrder.js'

export default class Ammo extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Ammo`,
		url,
		visible
	}) {
		url = `/ammo/${swapOrder(name)}`
		super({
			desc,
			id,
			name,
			type,
			url,
			visible
		})
		this.attr = attr
		this.qty = qty
		this.sz = sz
	}
}
