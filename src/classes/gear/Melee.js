import Gear from '$classes/Gear.js'

export default class Melee extends Gear {
	constructor({
		accuracy = 0,
		attributes,
		description,
		damage,
		id,
		name,
		quantity,
		range,
		size,
		type = `Melee`,
		url
	}) {
		url = `/melee/${name}`
		super({
			attributes,
			description,
			id,
			name,
			quantity,
			size,
			type,
			url
		})
		this.accuracy = accuracy
		this.damage = damage
		this.range = range
	}
}
