import Rule from '/src/classes/Rule.js'

export default class Core extends Rule {
	constructor({
		desc,
		name,
		type = `Core`,
		url,
		visible
	}) {
		url = `/core/${name}`
		super({
			desc,
			name,
			type,
			url,
			visible
		})
	}
}
