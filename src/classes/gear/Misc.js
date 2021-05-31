import Gear from '/src/classes/Gear.js'

export default class Misc extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Misc`,
		url
	}) {
		url = `/misc/${name}`
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
