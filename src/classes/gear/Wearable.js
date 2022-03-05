import Gear from '$classes/Gear.js'

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
