import Gear from '/src/classes/Gear.js'

export default class Document extends Gear {
	constructor({
		attributes,
		description,
		id,
		name,
		quantity,
		size,
		type = `Document`,
		url
	}) {
		url = `/documents/${name}`
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
