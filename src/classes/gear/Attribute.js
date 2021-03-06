import Rule from '/src/classes/Rule.js'

export default class Attribute extends Rule {
	constructor({
		description,
		id,
		name,
		type = `Attribute`,
		url
	}) {
		url = `/attributes/${name}`
		super({
			description,
			id,
			name,
			type,
			url
		})
	}
}
