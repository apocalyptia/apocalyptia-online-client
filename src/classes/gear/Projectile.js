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
		url
	}) {
		url = `/projectile/${name}`
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
