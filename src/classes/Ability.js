import Rule from '/src/classes/Rule.js'

export default class Ability extends Rule {
	constructor({
		description,
		experience,
		formula = null,
		max = 1,
		name,
		notes = ``,
		options = [],
		selection = null,
		type = `Ability`,
		url
	}) {
		url = `/abilities/${name}`
		super({
			description,
			name,
			type,
			url
		})
		this.experience = experience
		this.formula = formula
		this.max = max
		this.notes = notes
		this.options = options
		this.selection = selection
	}
}
