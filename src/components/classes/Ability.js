import Rule from './Rule'

export default class Ability extends Rule {
	constructor({
		name,
		description,
		visible,
		formula,
		max,
		xp,
		taken=0,
		options=[``],
		selection=0,
		notes=``,
		id=null
	}) {
		super({
			name,
			description,
			visible,
			formula
		})
		this.max = max
		this.xp = xp
		this.taken = taken
		this.options = options
		this.selection = selection,
		this.notes = notes,
		this.id = id
	}
}