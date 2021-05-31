import Gear from '/src/classes/Gear.js'

export default class Wearable extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Wearable`,
		url
	}) {
		url = `/wearables/${name}`
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
