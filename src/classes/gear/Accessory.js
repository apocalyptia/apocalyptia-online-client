import Gear from '/src/classes/Gear.js'

export default class Accessory extends Gear {
	constructor({
		attributes,
		description,
		id,
		name,
		quantity,
		size,
		type = `Accessory`,
		url
	}) {
		url = `/accessories/${name}`
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
