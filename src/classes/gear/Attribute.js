import Rule from '/src/classes/Rule.js'

export default class Attribute extends Rule {
	constructor({
		desc,
		id,
		name,
		type = `Attribute`,
		url,
		visible
	}) {
		url = `/attributes/${name}`
		super({
			desc,
			id,
			name,
			type,
			url,
			visible
		})
	}
}
