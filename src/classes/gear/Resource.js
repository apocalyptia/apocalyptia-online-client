import Gear from '/src/classes/Gear.js'

export default class Resource extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Resource`,
		url
	}) {
		url = `/resources/${name}`
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
