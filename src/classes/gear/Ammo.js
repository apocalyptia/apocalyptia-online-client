import Gear from '/src/classes/Gear.js'
import swapOrder from '/src/utils/text/swapOrder.js'

export default class Ammo extends Gear {
	constructor({
		accuracy = 0,
		attributes,
		caliber,
		description,
		id,
		name,
		penetration = 0,
		quantity,
		size,
		type = `Ammo`,
		url
	}) {
		url = `/ammo/${swapOrder(name)}`
		super({
			attributes,
			caliber,
			description,
			id,
			name,
			quantity,
			size,
			type,
			url
		})
		this.accuracy = accuracy
		this.caliber = caliber
		this.penetration = penetration
	}
}
