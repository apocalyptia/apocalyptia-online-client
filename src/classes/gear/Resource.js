import Gear from '$classes/Gear.js'

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
