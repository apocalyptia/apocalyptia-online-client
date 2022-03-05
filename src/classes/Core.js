import Rule from '$classes/Rule.js'

export default class Core extends Rule {
	constructor({
		description,
		name,
		subrules,
		type = `Core`,
		url
	}) {
		url = `/core/${name}`
		super({
			description,
			name,
			subrules,
			type,
			url
		})
	}
}
