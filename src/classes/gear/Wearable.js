import Gear from '/src/classes/Gear.js'

export default class Wearable extends Gear {
	constructor({
		attributes,
		description,
		id,
		name,
		quantity,
		size,
		type = `Wearable`,
		url
	}) {
		url = `/wearables/${name}`
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
