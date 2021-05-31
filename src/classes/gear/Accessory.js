import Gear from '/src/classes/Gear.js'

export default class Accessory extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Accessory`,
		url
	}) {
		url = `/accessories/${name}`
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
