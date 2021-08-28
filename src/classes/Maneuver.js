import Rule from '/src/classes/Rule.js'

export default class Maneuver extends Rule {
	constructor({
		description,
		mode = ``,
		name,
		subrules,
		type = `Maneuver`,
		url
	}) {
		url = `/maneuvers/${name}`
		super({
			description,
			name,
			subrules,
			type,
			url
		})
		this.mode = mode
	}
}
