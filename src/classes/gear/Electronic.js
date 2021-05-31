import Gear from '/src/classes/Gear.js'

export default class Electronic extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Electronic`,
		url
	}) {
		url = `/electronics/${name}`
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
