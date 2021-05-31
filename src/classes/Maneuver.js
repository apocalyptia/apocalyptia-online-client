import Rule from '/src/classes/Rule.js'

export default class Maneuver extends Rule {
	constructor({
		desc,
		mode = ``,
		name,
		type = `Maneuver`,
		url
	}) {
		url = `/maneuver/${name}`
		super({
			desc,
			name,
			type,
			url
		})
		this.mode = mode
	}
}
