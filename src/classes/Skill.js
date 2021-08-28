import Rule from '/src/classes/Rule.js'

export default class Skill extends Rule {
	constructor({
		description,
		difficulty = null,
		name,
		parent = ``,
		subrules,
		specialties = {},
		type = `Skill`,
		url
	}) {
		url = `/skills/${name}`
		super({
			description,
			name,
			subrules,
			type,
			url
		})
		this.difficulty = difficulty
		this.parent = parent
		this.specialties = specialties
	}
}
