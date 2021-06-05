import Gear from '/src/classes/Gear.js'

export default class Misc extends Gear {
	constructor({
		attributes,
		description,
		id,
		name,
		quantity,
		size,
		type = `Misc`,
		url
	}) {
		url = `/misc/${name}`
		super({
			attributes,
			description,
			id,
			name,
			quantity,
			size,
			type,
			url
		})
	}
}
