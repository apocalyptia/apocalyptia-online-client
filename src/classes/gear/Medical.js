import Gear from '/src/classes/Gear.js'

export default class Medical extends Gear {
	constructor({
		attributes,
		description,
		id,
		name,
		quantity,
		size,
		type = `Medical`,
		url
	}) {
		url = `/medical/${name}`
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
