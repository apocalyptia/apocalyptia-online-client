import Rule from '$classes/Rule.js'

export default class Status extends Rule {
	constructor({
		description,
		name,
		subrules,
		type = `Status`,
		url
	}) {
		url = `/status/${name}`
		super({
			description,
			name,
			subrules,
			type,
			url
		})
	}
}
