import Gear from '/src/classes/Gear.js'

export default class Storage extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Storage`,
		url
	}) {
		url = `/storage/${name}`
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
