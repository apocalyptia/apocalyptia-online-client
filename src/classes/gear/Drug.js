import Gear from '/src/classes/Gear.js'

export default class Drug extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Drug`,
		url
	}) {
		url = `/drugs/${name}`
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
