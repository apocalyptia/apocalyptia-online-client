import Rule from '/src/classes/Rule.js'

export default class Gear extends Rule {
	constructor({
		attributes = [],
		description,
		id,
		name,
		quantity = 0,
		size = 0,
		subrules,
		type = `Gear`,
		url
	}) {
		url = `/gear${url}`
		super({
			description,
			id,
			name,
			subrules,
			type,
			url
		})
		this.attributes = attributes
		this.quantity = quantity
		this.size = size
	}
}
