import Rule from '/src/classes/Rule.js'

export default class Specialty extends Rule {
	constructor({
		desc,
		diff = null,
		name,
		parent = ``,
		type = `Specialty`
	}) {
		super({
			desc,
			name,
			type
		})
		this.diff = diff
		this.parent = parent
	}
}
