import Gear from '$classes/Gear.js'

export default class Storage extends Gear {
	constructor({
		attributes,
		description,
		id,
		name,
		quantity,
		size,
		slots = 1,
		subrules,
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
			subrules,
			type,
			url
		})
		this.slots = slots
	}
}