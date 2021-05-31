import Rule from '/src/classes/Rule.js'

export default class Hazard extends Rule {
	constructor({
		desc,
		name,
		type = `Hazard`,
		url,
		visible
	}) {
		url = `/hazard/${name}`
		super({
			desc,
			name,
			type,
			url,
			visible
		})
	}
}
