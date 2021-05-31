import Rule from '/src/classes/Rule.js'

export default class Combat extends Rule {
	constructor({
		desc,
		name,
		type = `Combat`,
		url,
		visible
	}) {
		url = `/combat/${name}`
		super({
			desc,
			name,
			type,
			url,
			visible
		})
	}
}
