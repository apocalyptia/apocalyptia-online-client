import Rule from '$classes/Rule.js'

export default class CreationStep extends Rule {
	constructor({
		description,
		name,
		step,
		subrules,
		type = `CreationStep`,
		url
	}) {
		url = `/creation/${name}`
		super({
			description,
			name,
			subrules,
			type,
			url
		})
		this.step = step
	}
}
