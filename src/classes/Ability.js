import Rule from './Rule.js'

export default class Ability extends Rule {
	constructor({
		desc,
		experience,
		formula = null,
		max = 1,
		name,
		notes = ``,
		options = [],
		selection = null,
		type = `Ability`,
		visible
	}) {
		super({
			desc,
			name,
			type,
			visible
		})
		this.experience = experience
		this.formula = formula
		this.max = max
		this.notes = notes
		this.options = options
		this.selection = selection
	}
}
