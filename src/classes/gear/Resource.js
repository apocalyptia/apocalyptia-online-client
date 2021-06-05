import Gear from '/src/classes/Gear.js'

export default class Resource extends Gear {
	constructor({
		attributes,
		description,
		id,
		name,
		quantity,
		size,
		type = `Resource`,
		url
	}) {
		url = `/resources/${name}`
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
