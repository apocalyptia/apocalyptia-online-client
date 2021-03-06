import Rule from '/src/classes/Rule.js'

export default class Maneuver extends Rule {
	constructor({
		description,
		mode = ``,
		name,
		type = `Maneuver`,
		url
	}) {
		url = `/maneuver/${name}`
		super({
			description,
			name,
			type,
			url
		})
		this.mode = mode
	}
}
