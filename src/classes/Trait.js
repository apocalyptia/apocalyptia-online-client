import Rule from '/src/classes/Rule.js'

export default class Trait extends Rule {
	constructor({
		description,
		name,
		skills = [],
		type = `Trait`,
		url
	}) {
		url = `/traits/${name}`
		super({
			description,
			name,
			type,
			url
		})
		this.skills = skills
	}
}
