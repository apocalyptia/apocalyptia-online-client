import Gear from '/src/classes/Gear.js'

export default class Projectile extends Gear {
	constructor({
		accuracy = 0,
		attributes,
		caliber,
		capacity,
		category,
		description,
		damage,
		id,
		name,
		quantity,
		rate = 1,
		range,
		specialty,
		size,
		type = `Projectile`,
		url
	}) {
		url = `/projectile/${name}`
		super({
			attributes,
			description,
			id,
			name,
			quantity,
			specialty,
			size,
			type,
			url
		})
		this.accuracy = accuracy
		this.caliber = caliber
		this.capacity = capacity
		this.category = category
		this.damage = damage
		this.rate = rate
		this.range = range,
		this.specialty = specialty
	}
}
