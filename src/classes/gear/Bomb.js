import Gear from '/src/classes/Gear.js'

export default class Bomb extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Bomb`,
		url
	}) {
		url = `/bombs/${name}`
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
