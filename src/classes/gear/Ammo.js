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
		url
	}) {
		url = `/ammo/${swapOrder(name)}`
		super({
			attr,
			desc,
			id,
			name,
			qty,
			sz,
			type,
			url
		})
	}
}
