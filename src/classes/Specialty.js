import Rule from '/src/classes/Rule.js'

export default class Specialty extends Rule {
	constructor({
		description,
		difficulty = null,
		name,
		parent = ``,
		subrules,
		type = `Specialty`
	}) {
		super({
			description,
			name,
			subrules,
			type
		})
		this.difficulty = difficulty
		this.parent = parent
	}
}
