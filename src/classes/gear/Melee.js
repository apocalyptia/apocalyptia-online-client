import Gear from '/src/classes/Gear.js'

export default class Melee extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Melee`,
		url
	}) {
		url = `/melee/${name}`
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
