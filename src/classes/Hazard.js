import Rule from '/src/classes/Rule.js'

export default class Hazard extends Rule {
	constructor({
		description,
		name,
		subrules,
		type = `Hazard`,
		url
	}) {
		url = `/hazard/${name}`
		super({
			description,
			name,
			subrules,
			type,
			url
		})
	}
}
