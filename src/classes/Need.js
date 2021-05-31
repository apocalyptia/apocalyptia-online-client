import Rule from '/src/classes/Rule.js'

export default class Need extends Rule {
	constructor({
		desc,
		name,
		type = `Need`,
		url,
		visible
	}) {
		url = `/need/${name}`
		super({
			desc,
			name,
			type,
			url,
			visible
		})
	}
}
