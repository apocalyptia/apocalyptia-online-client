import Rule from 'rules/Rule.js'

export default class Attribute extends Rule {
	constructor({
		id,
		name,
		desc
	}) {
		super({
			id,
			name,
			desc
		})
	}
}