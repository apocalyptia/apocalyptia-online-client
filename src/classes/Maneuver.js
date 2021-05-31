import Rule from '/src/classes/Rule.js'

export default class Maneuver extends Rule {
	constructor({
		desc,
		mode = ``,
		name,
		type = `Maneuver`,
		url,
		visible
	}) {
		url = `/maneuver/${name}`
		super({
			desc,
			name,
			type,
			url,
			visible
		})
		this.mode = mode
	}
}
