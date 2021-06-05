import Gear from '/src/classes/Gear.js'

export default class Electronic extends Gear {
	constructor({
		attributes,
		description,
		duration,
		id,
		name,
		quantity,
		size,
		type = `Electronic`,
		url
	}) {
		url = `/electronics/${name}`
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
		this.duration = duration
	}
}
