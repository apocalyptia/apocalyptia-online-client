import Rule from '/src/classes/Rule.js'

export default class Combat extends Rule {
	constructor({
		description,
		name,
		subrules,
		type = `Combat`,
		url
	}) {
		url = `/combat/${name}`
		super({
			description,
			name,
			subrules,
			type,
			url
		})
	}
}
