import Rule from '$classes/Rule.js'

export default class Ability extends Rule {
	constructor({
		description,
		experience,
		formula = null,
		max = 1,
		name,
		notes = ``,
		open = false,
		options = [],
		selectedOption = 0,
		subrules,
		type = `Ability`,
		url
	}) {
		url = `/abilities/${name}`
		super({
			description,
			name,
			subrules,
			type,
			url
		})
		this.experience = experience
		this.formula = formula
		this.max = max
		this.notes = notes
		this.open = open
		this.options = options
		this.selectedOption = selectedOption
	}
}
