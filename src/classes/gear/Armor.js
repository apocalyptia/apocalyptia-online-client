import Gear from '/src/classes/Gear.js'

export default class Armor extends Gear {
	constructor({
		absorption,
		attributes,
		description,
		id,
		location,
		name,
		quantity,
		size,
		type = `Armor`,
		url
	}) {
		url = `/armor/${name}`
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
		this.absorption = absorption
		this.location = location
	}
}
