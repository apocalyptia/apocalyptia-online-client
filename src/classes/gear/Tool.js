import Gear from '$classes/Gear.js'

export default class Tool extends Gear {
	constructor({
		attributes,
		description,
		id,
		name,
		quantity,
		size,
		type = `Tool`,
		url
	}) {
		url = `/tools/${name}`
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
