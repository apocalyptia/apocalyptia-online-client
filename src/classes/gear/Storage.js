import Gear from '$classes/Gear.js'

export default class Storage extends Gear {
	constructor({
		attributes,
		description,
		id,
		name,
		quantity,
		size,
		slots,
		type = `Storage`,
		url
	}) {
		url = `/storage/${name}`
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
		this.slots = slots
	}
}
