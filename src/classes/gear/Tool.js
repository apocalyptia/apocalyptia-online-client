import Gear from '/src/classes/Gear.js'

export default class Tool extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Tool`,
		url
	}) {
		url = `/tools/${name}`
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
