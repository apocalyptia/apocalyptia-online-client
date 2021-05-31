import Rule from '/src/classes/Rule.js'

export default class Trait extends Rule {
	constructor({
		desc,
		name,
		skills = [],
		type = `Trait`,
		url
	}) {
		url = `/traits/${name}`
		super({
			desc,
			name,
			type,
			url
		})
		this.skills = skills
	}
}
