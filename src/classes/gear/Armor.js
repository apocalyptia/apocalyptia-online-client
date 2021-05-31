import Gear from '/src/classes/Gear.js'

export default class Armor extends Gear {
	constructor({
		attr,
		desc,
		id,
		name,
		qty,
		sz,
		type = `Armor`,
		url
	}) {
		url = `/armor/${name}`
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
