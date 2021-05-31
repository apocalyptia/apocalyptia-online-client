import Gear from '/src/classes/Gear.js'

export default class Medical extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Medical`,
		url
	}) {
		url = `/medical/${name}`
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
