import Rule from '/src/classes/Rule.js'

export default class Trait extends Rule {
	constructor({
		description,
		name,
		skills = [],
		subrules,
		type = `Trait`,
		url
	}) {
		url = `/traits/${name}`
		super({
			description,
			name,
			subrules,
			type,
			url
		})
		this.skills = skills
	}
}
