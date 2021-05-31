import Gear from '/src/classes/Gear.js'

export default class Document extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Document`,
		url
	}) {
		url = `/documents/${name}`
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
