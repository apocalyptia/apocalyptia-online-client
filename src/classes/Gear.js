import Rule from '/src/classes/Rule.js'

export default class Gear extends Rule {
	constructor({
		attributes = [],
		description,
		id,
		name,
		quantity = 0,
		size = 0,
		type = `Gear`,
		url
	}) {
		url = `/gear${url}`
		super({
			description,
			id,
			name,
			type,
			url
		})
		this.attributes = attributes
		this.quantity = quantity
		this.size = size
	}
}
